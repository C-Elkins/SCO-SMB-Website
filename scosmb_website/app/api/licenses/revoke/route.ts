import { NextRequest } from 'next/server';
import { getDb } from '@/lib/db';
import { license_keys } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json();
    if (!key) return new Response(JSON.stringify({ error: 'Missing key' }), { status: 400 });
    const db = getDb();
    await db.update(license_keys).set({ status: 'revoked' } as any).where(eq(license_keys.key_code, key));
    return new Response(JSON.stringify({ revoked: true }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
