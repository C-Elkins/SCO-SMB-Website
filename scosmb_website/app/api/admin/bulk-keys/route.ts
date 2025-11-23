import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { license_keys } from '@/lib/schema';
import { getAdminSession } from '@/lib/auth';
import { inArray, eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const db = getDb();

    const { action, ids } = await request.json();

    if (!action || !ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: action and ids required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'revoke':
        await db
          .update(license_keys)
          .set({ 
            [license_keys.status.name]: 'revoked'
          })
          .where(inArray(license_keys.id, ids));
        
        console.log('[Bulk Action] Revoked keys:', ids.length);
        break;

      case 'delete':
        await db
          .delete(license_keys)
          .where(inArray(license_keys.id, ids));
        
        console.log('[Bulk Action] Deleted keys:', ids.length);
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
              [license_keys.expires_at.name]: currentExpiry
            })
            .where(eq(license_keys.id, key.id));
        }

        console.log('[Bulk Action] Extended keys:', ids.length);
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
