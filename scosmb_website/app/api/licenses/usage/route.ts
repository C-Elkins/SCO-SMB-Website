import { NextRequest } from 'next/server';
import { getDb } from '@/lib/db';
import { license_keys, download_logs } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { key, platform, version } = await req.json();
    if (!key) return new Response(JSON.stringify({ error: 'Missing key' }), { status: 400 });
    const db = getDb();
    const rows = await db.select().from(license_keys).where(eq(license_keys.key_code, key));
    const record = rows[0];
    if (!record) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    if (record.status === 'revoked') return new Response(JSON.stringify({ error: 'Revoked' }), { status: 403 });
    if (record.expires_at && new Date(record.expires_at) < new Date()) return new Response(JSON.stringify({ error: 'Expired' }), { status: 403 });

    const updatedCount = (record.download_count || 0) + 1;
    await db.update(license_keys).set({ download_count: updatedCount, status: record.status === 'unused' ? 'active' : record.status }).where(eq(license_keys.id, record.id));
    await db.insert(download_logs).values({
      license_key_id: record.id,
      platform,
      version,
      user_agent: '',
      success: true,
    });
    return new Response(JSON.stringify({ ok: true, remaining: (record.max_downloads || 0) - updatedCount }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
