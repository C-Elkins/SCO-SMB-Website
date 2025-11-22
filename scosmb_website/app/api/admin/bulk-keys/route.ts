import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { license_keys, audit_logs } from '@/lib/schema';
import { verifyAdmin } from '@/lib/auth';
import { inArray, eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, ids } = await request.json();

    if (!action || !ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: action and ids required' },
        { status: 400 }
      );
    }

    let result;
    
    switch (action) {
      case 'revoke':
        result = await db
          .update(license_keys)
          .set({ 
            status: 'revoked',
            updated_at: new Date().toISOString()
          })
          .where(inArray(license_keys.id, ids));
        
        // Log audit
        await db.insert(audit_logs).values({
          admin_email: adminCheck.email || 'system',
          action: 'bulk_revoke_keys',
          details: `Revoked ${ids.length} license keys`,
          metadata: { count: ids.length, keyIds: ids },
          created_at: new Date().toISOString()
        });
        break;

      case 'delete':
        result = await db
          .delete(license_keys)
          .where(inArray(license_keys.id, ids));
        
        await db.insert(audit_logs).values({
          admin_email: adminCheck.email || 'system',
          action: 'bulk_delete_keys',
          details: `Deleted ${ids.length} license keys`,
          metadata: { count: ids.length },
          created_at: new Date().toISOString()
        });
        break;

      case 'extend':
        // Extend expiry by 30 days
        const keysToExtend = await db
          .select()
          .from(license_keys)
          .where(inArray(license_keys.id, ids));

        for (const key of keysToExtend) {
          const currentExpiry = key.expires_at ? new Date(key.expires_at) : new Date();
          currentExpiry.setDate(currentExpiry.getDate() + 30);
          
          await db
            .update(license_keys)
            .set({ 
              expires_at: currentExpiry.toISOString(),
              updated_at: new Date().toISOString()
            })
            .where(eq(license_keys.id, key.id));
        }

        await db.insert(audit_logs).values({
          admin_email: adminCheck.email || 'system',
          action: 'bulk_extend_keys',
          details: `Extended ${ids.length} license keys by 30 days`,
          metadata: { count: ids.length, days: 30 },
          created_at: new Date().toISOString()
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ 
      success: true,
      message: `Successfully ${action}ed ${ids.length} keys`,
      count: ids.length
    });

  } catch (error) {
    console.error('Bulk keys action error:', error);
    return NextResponse.json(
      { error: 'Failed to perform bulk action' },
      { status: 500 }
    );
  }
}
