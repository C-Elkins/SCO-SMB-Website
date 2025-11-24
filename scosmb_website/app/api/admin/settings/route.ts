import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';

export const revalidate = 0;

// Simplified settings endpoint - returns default settings
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const defaultSettings = {
      licenseKeySettings: {
        defaultKeyFormat: 'SCO-XXXX-XXXX',
        defaultMaxDownloads: 3,
        defaultExpiration: 'never',
        requireEmailVerification: false,
        autoRevokeExpired: true
      },
      securitySettings: {
        sessionTimeoutHours: 8,
        requireStrongPasswords: true,
        allowMultipleSessions: false,
        enableAuditLogging: true
      },
      portalSettings: {
        enableDownloadLogging: true,
        enableEmailNotifications: true,
        adminEmail: 'admin@southcoastoffice.com',
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

    return NextResponse.json(defaultSettings);
  } catch (error: unknown) {
    console.error('Settings fetch error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await request.json(); // Read body but don't save anywhere yet

    return NextResponse.json({ 
      success: true, 
      message: 'Settings saved successfully (mock implementation)',
      updatedBy: session.username,
      updatedAt: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Settings update error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
