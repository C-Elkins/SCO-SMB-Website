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
    
    // Build where conditions
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

    // Build sorting - explicitly handle sort fields
    const orderByFn = sortOrder === 'desc' ? desc : asc;
    let orderByField;
    
    switch (sortBy) {
      case 'key_code':
        orderByField = orderByFn(license_keys.key_code);
        break;
      case 'status':
        orderByField = orderByFn(license_keys.status);
        break;
      case 'customer_name':
        orderByField = orderByFn(license_keys.customer_name);
        break;
      case 'customer_email':
        orderByField = orderByFn(license_keys.customer_email);
        break;
      case 'expires_at':
        orderByField = orderByFn(license_keys.expires_at);
        break;
      default:
        orderByField = orderByFn(license_keys.created_at);
    }

    // Execute query with all conditions
    const keys = await db
      .select()
      .from(license_keys)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(orderByField)
      .limit(limit)
      .offset(offset);

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

    // Generate random key codes in format SCO-XXXX-XXXX-XXXX-XXXX
    function generateKeyCode(): string {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const generateSegment = () => {
        let segment = '';
        for (let i = 0; i < 4; i++) {
          segment += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return segment;
      };
      return `SCO-${generateSegment()}-${generateSegment()}-${generateSegment()}-${generateSegment()}`;
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
