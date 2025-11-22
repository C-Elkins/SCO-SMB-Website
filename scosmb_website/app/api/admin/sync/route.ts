import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { license_keys, customers } from '@/lib/schema';
import { desc, gte } from 'drizzle-orm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Server-Sent Events endpoint for real-time admin updates
 * Provides live notifications of database changes
 */
export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const db = getDb();

  const searchParams = request.nextUrl.searchParams;
  const since = searchParams.get('since');
  const sinceDate = since ? new Date(since) : new Date(Date.now() - 60000); // Last minute

  try {
    // Get recent changes
    const [recentKeys, recentCustomers] = await Promise.all([
      db
        .select()
        .from(license_keys)
        .where(gte(license_keys.created_at, sinceDate))
        .orderBy(desc(license_keys.created_at))
        .limit(10),
      
      db
        .select()
        .from(customers)
        .where(gte(customers.created_at, sinceDate))
        .orderBy(desc(customers.created_at))
        .limit(10)
    ]);
    
    const recentLogs: Array<{ action: string; created_at: Date | null }> = [];

    const updates = {
      timestamp: new Date().toISOString(),
      keys: {
        count: recentKeys.length,
        items: recentKeys.map(k => ({
          id: k.id,
          key: k.key_code?.substring(0, 12) + '...',
          status: k.status,
          updated: k.created_at
        }))
      },
      customers: {
        count: recentCustomers.length,
        items: recentCustomers.map(c => ({
          id: c.id,
          name: c.point_of_contact || c.company,
          company: c.company,
          created: c.created_at
        }))
      },
      activity: {
        count: recentLogs.length,
        items: recentLogs
      },
      hasUpdates: recentKeys.length > 0 || recentCustomers.length > 0 || recentLogs.length > 0
    };

    return NextResponse.json(updates, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    console.error('[Sync] Error fetching updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch updates' },
      { status: 500 }
    );
  }
}

/**
 * Webhook endpoint for external systems to trigger data refresh
 */
export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { event, data } = await request.json();
    
    console.log(`[Webhook] Received event: ${event}`, data);
    console.log(`[Webhook] Triggered by: ${session.username || 'webhook'}`);

    return NextResponse.json({ 
      success: true,
      message: 'Webhook processed',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Webhook] Error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
