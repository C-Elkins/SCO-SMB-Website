import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { license_keys } from '@/lib/schema';
import { getAdminSession } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { key_code } = await request.json();
    
    if (!key_code) {
      return NextResponse.json({ error: 'Key code is required' }, { status: 400 });
    }

    const db = getDb();
    
    // Update the key status to revoked
    const result = await db
      .update(license_keys)
      .set({ status: 'revoked' })
      .where(eq(license_keys.key_code, key_code));

    return NextResponse.json({ 
      success: true,
      message: 'License key revoked successfully'
    });
  } catch (error: any) {
    console.error('Error revoking key:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}