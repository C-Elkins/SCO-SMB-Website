import { NextRequest } from 'next/server';
import { getSql } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest) {
  try {
    const sql = getSql();
    // Simple aggregated metrics (can be replaced with more detailed analytics)
    const totalResult = await sql`SELECT COUNT(*)::int as count FROM download_logs` as Array<{count: number}>;
    const byPlatform = await sql`SELECT platform, COUNT(*)::int as count FROM download_logs GROUP BY platform ORDER BY count DESC LIMIT 10` as Array<{platform: string, count: number}>;
    const byVersion = await sql`SELECT version, COUNT(*)::int as count FROM download_logs GROUP BY version ORDER BY count DESC LIMIT 10` as Array<{version: string, count: number}>;
    
    return new Response(JSON.stringify({
      total: totalResult[0]?.count || 0,
      platform: byPlatform,
      version: byVersion,
    }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
