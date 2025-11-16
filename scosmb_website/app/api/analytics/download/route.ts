import { NextRequest } from 'next/server';
import { getDb } from '@/lib/db';
import { download_logs } from '@/lib/schema';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { license_key_id, platform, version, user_agent, success = true } = await req.json();
    if (!license_key_id) return new Response(JSON.stringify({ error: 'Missing license_key_id' }), { status: 400 });
    const db = getDb();
    await db.insert(download_logs).values({ license_key_id, platform, version, user_agent, success });
    return new Response(JSON.stringify({ logged: true }), { status: 201 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
