import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { license_keys } from '@/lib/schema';
import { getAdminSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { 
      count = 1, 
      max_downloads = 3, 
      expires_at,
      customer_name,
      customer_email,
      customer_company
    } = body;

    const db = getDb();
    const keys = [];

    // Generate random key codes
    function generateKeyCode(): string {
      return 'SCO-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + 
             Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    for (let i = 0; i < Math.min(count, 100); i++) {
      const key_code = generateKeyCode();
      
      const keyData = {
        key_code,
        status: 'unused',
        max_downloads,
        customer_name,
        customer_email,
        customer_company,
        created_by: session.username,
        expires_at: expires_at ? new Date(expires_at) : null
      };

      await db.insert(license_keys).values(keyData);
      keys.push({ ...keyData, id: key_code });
    }

    return NextResponse.json({ 
      success: true,
      keys, 
      count: keys.length,
      message: `Generated ${keys.length} license key(s) successfully`
    });
  } catch (error: any) {
    console.error('Error generating keys:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}