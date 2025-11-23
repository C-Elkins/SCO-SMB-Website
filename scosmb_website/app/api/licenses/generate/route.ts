import { NextRequest } from 'next/server';
import { getDb } from '@/lib/db';
import { license_keys } from '@/lib/schema';
import { randomUUID } from 'crypto';

// Use the Node.js runtime because this route relies on the
// Node Postgres driver and crypto APIs which are not available on edge.
export const runtime = 'nodejs';

function randomKey(): string {
  // Simple segmented key: XXXX-XXXX-XXXX-XXXX
  return Array.from({ length: 4 }, () => Math.random().toString(36).substring(2, 6).toUpperCase()).join('-');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { count = 1, max_downloads = 3, customer_email, customer_name, customer_company } = body;
    const db = getDb();
    const keys: string[] = [];
    for (let i = 0; i < Math.min(count, 50); i++) {
      const key_code = randomKey();
      keys.push(key_code);
      await db.insert(license_keys).values({
        id: randomUUID(),
        key_code: key_code,
        status: 'unused',
        max_downloads: max_downloads,
        customer_email: customer_email,
        customer_name: customer_name,
        customer_company: customer_company,
      } as any);
    }
    return new Response(JSON.stringify({ generated: keys.length, keys }), { status: 201 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
