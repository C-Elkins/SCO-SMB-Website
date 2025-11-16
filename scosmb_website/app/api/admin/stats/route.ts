import { NextRequest } from 'next/server';
import { getDb } from '@/lib/db';
import { license_keys, admin_users } from '@/lib/schema';
import { eq, count, sum, gte } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    
    // Get current date for monthly stats
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Fetch all stats in parallel
    const [
      totalKeysResult,
      activeKeysResult,
      revokedKeysResult,
      totalDownloadsResult,
      monthlyDownloadsResult,
      activeAdminsResult
    ] = await Promise.all([
      // Total keys
      db.select({ count: count() }).from(license_keys),
      
      // Active keys (unused or active status)
      db.select({ count: count() })
        .from(license_keys)
        .where(eq(license_keys.status, 'active')),
      
      // Revoked keys
      db.select({ count: count() })
        .from(license_keys)
        .where(eq(license_keys.status, 'revoked')),
      
      // Total downloads (sum of all download_count)
      db.select({ total: sum(license_keys.download_count) }).from(license_keys),
      
      // Monthly downloads (this would need download_logs table for accurate monthly data)
      // For now, we'll use a simple approximation
      db.select({ count: count() })
        .from(license_keys)
        .where(gte(license_keys.created_at, startOfMonth)),
      
      // Active admin users
      db.select({ count: count() })
        .from(admin_users)
        .where(eq(admin_users.is_active, true))
    ]);

    const stats = {
      totalKeys: totalKeysResult[0]?.count || 0,
      activeKeys: activeKeysResult[0]?.count || 0,
      revokedKeys: revokedKeysResult[0]?.count || 0,
      totalDownloads: totalDownloadsResult[0]?.total || 0,
      monthlyDownloads: monthlyDownloadsResult[0]?.count || 0,
      activeAdmins: activeAdminsResult[0]?.count || 0
    };

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Stats fetch error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}