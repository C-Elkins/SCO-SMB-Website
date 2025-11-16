import { NextRequest } from 'next/server';
import { getDb } from '@/lib/db';
import { license_keys } from '@/lib/schema';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest) {
  try {
    const db = getDb();
    const rows = await db.select().from(license_keys).limit(200);
    return new Response(JSON.stringify({ items: rows }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
