import { NextRequest } from 'next/server';
import { getDb } from '@/lib/db';
import { download_logs } from '@/lib/schema';
import { sql } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest) {
  try {
    const db = getDb();
    // Simple aggregated metrics (can be replaced with more detailed analytics)
    const total = await db.select({ count: sql`COUNT(*)::int` }).from(download_logs);
    const byPlatform = await db.execute(sql`SELECT platform, COUNT(*)::int as count FROM download_logs GROUP BY platform ORDER BY count DESC LIMIT 10`);
    const byVersion = await db.execute(sql`SELECT version, COUNT(*)::int as count FROM download_logs GROUP BY version ORDER BY count DESC LIMIT 10`);
    return new Response(JSON.stringify({
      total: total[0]?.count || 0,
      platform: byPlatform.rows,
      version: byVersion.rows,
    }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
