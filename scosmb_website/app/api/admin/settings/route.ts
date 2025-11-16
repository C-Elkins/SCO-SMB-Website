import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { portal_settings, system_settings } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getDb();
    
    // Get settings from database
    const savedSettings = await db
      .select()
      .from(system_settings)
      .where(eq(system_settings.key, 'enterprise_settings'));
    
    let currentSettings = {
      licenseKeySettings: {
        defaultKeyFormat: 'SCO-XXXX-XXXX',
        defaultMaxDownloads: 3,
        defaultExpiration: 'never',
        requireEmailVerification: false,
        autoRevokeExpired: true
      },
      securitySettings: {
        sessionTimeoutHours: parseInt(process.env.SESSION_TIMEOUT_HOURS || '8'),
        requireStrongPasswords: true,
        allowMultipleSessions: false,
        enableAuditLogging: true
      },
      portalSettings: {
        enableDownloadLogging: true,
        enableEmailNotifications: true,
        adminEmail: process.env.ADMIN_EMAIL || 'admin@southcoastoffice.com',
        maxDailyDownloads: 1000,
        enableRateLimiting: true
      },
      systemSettings: {
        maintenanceMode: false,
        enableAnalytics: true,
        retentionPolicyDays: 365,
        enableBackups: true,
        backupFrequency: 'daily'
      }
    };

    // Merge with saved settings if available
    if (savedSettings.length > 0) {
      try {
        const saved = JSON.parse(savedSettings[0].value);
        currentSettings = { ...currentSettings, ...saved };
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }

    return NextResponse.json(currentSettings);
  } catch (error: any) {
    console.error('Settings fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const settings = await request.json();
    const db = getDb();

    // Save settings to database
    const settingsJson = JSON.stringify(settings);
    
    const existingSettings = await db
      .select()
      .from(system_settings)
      .where(eq(system_settings.key, 'enterprise_settings'));
    
    if (existingSettings.length > 0) {
      await db
        .update(system_settings)
        .set({ 
          value: settingsJson,
          updated_by: session.username,
          updated_at: new Date()
        })
        .where(eq(system_settings.key, 'enterprise_settings'));
    } else {
      await db.insert(system_settings).values({
        key: 'enterprise_settings',
        value: settingsJson,
        updated_by: session.username
      });
    }
    
    // Handle portal password update if provided
    if (settings.portalSettings?.newPortalPassword) {
      const hashedPassword = await bcrypt.hash(settings.portalSettings.newPortalPassword, 12);
      
      // Update or insert portal settings
      const existingSettings = await db.select().from(portal_settings).limit(1);
      
      if (existingSettings.length > 0) {
        await db
          .update(portal_settings)
          .set({ 
            tech_portal_password_hash: hashedPassword,
            updated_at: new Date()
          })
          .where(eq(portal_settings.id, existingSettings[0].id));
      } else {
        await db.insert(portal_settings).values({
          tech_portal_password_hash: hashedPassword
        });
      }
    }

    // Log the settings change for audit purposes
    console.log(`Settings updated by ${session.username} at ${new Date().toISOString()}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Settings updated successfully',
      updatedBy: session.username,
      updatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}