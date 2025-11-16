import { NextRequest } from 'next/server';
import { getDb } from '@/lib/db';
import { license_keys } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json();
    if (typeof key !== 'string') {
      return new Response(JSON.stringify({ valid: false, error: 'Invalid payload' }), { status: 400 });
    }
    const db = getDb();
    const rows = await db.select().from(license_keys).where(eq(license_keys.key_code, key));
    const record = rows[0];
    if (!record) {
      return new Response(JSON.stringify({ valid: false, error: 'License key not found' }), { status: 404 });
    }
    if (record.status === 'revoked') {
      return new Response(JSON.stringify({ valid: false, error: 'License revoked' }), { status: 403 });
    }
    if (record.expires_at && new Date(record.expires_at) < new Date()) {
      return new Response(JSON.stringify({ valid: false, error: 'License expired' }), { status: 403 });
    }
    const downloadCount = record.download_count ?? 0;
    const maxDownloads = record.max_downloads;
    if (maxDownloads !== null && maxDownloads !== undefined && downloadCount >= maxDownloads) {
      return new Response(JSON.stringify({ valid: false, error: 'Download limit reached' }), { status: 429 });
    }
    const remaining = maxDownloads !== null && maxDownloads !== undefined ? maxDownloads - downloadCount : null;
    return new Response(JSON.stringify({ valid: true, remaining }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ valid: false, error: e.message }), { status: 500 });
  }
}
