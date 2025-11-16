import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { license_keys } from '@/lib/schema';
import { getAdminSession } from '@/lib/auth';
import { desc, asc, like, eq, or, and } from 'drizzle-orm';

export const runtime = 'nodejs';

// GET all license keys with filtering and sorting
export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const db = getDb();
    
    // Build the base query
    let query = db.select().from(license_keys);

    // Apply filters
    let whereConditions = [];

    // Search filter
    if (search) {
      whereConditions.push(
        or(
          like(license_keys.key_code, `%${search}%`),
          like(license_keys.customer_email, `%${search}%`),
          like(license_keys.customer_name, `%${search}%`),
          like(license_keys.customer_company, `%${search}%`)
        )
      );
    }

    // Status filter
    if (status !== 'all') {
      whereConditions.push(eq(license_keys.status, status));
    }

    // Build the complete query
    let finalQuery = query;
    
    // Apply where conditions
    if (whereConditions.length > 0) {
      finalQuery = finalQuery.where(and(...whereConditions));
    }

    // Apply sorting
    const orderBy = sortOrder === 'desc' ? desc : asc;
    const sortField = license_keys[sortBy as keyof typeof license_keys] || license_keys.created_at;
    finalQuery = finalQuery.orderBy(orderBy(sortField));

    // Apply pagination
    finalQuery = finalQuery.limit(limit).offset(offset);

    const keys = await finalQuery;

    return NextResponse.json({ 
      keys,
      total: keys.length,
      hasMore: keys.length === limit 
    });
  } catch (error: any) {
    console.error('Keys fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create new license key(s)
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
      customer_company,
      notes 
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
        notes,
        created_by: session.username,
        expires_at: expires_at ? new Date(expires_at) : null
      };

      await db.insert(license_keys).values(keyData);
      keys.push({ ...keyData, id: key_code }); // Mock ID for response
    }

    return NextResponse.json({ 
      success: true,
      keys, 
      count: keys.length,
      message: `Generated ${keys.length} license key(s) successfully`
    });
  } catch (error: any) {
    console.error('Error creating keys:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
