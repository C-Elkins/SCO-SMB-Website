import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const revalidate = 0;

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

    const sql = getSql();
    
    // Validate sort column and direction for SQL injection prevention
    const validSortColumns = ['key_code', 'status', 'customer_name', 'customer_email', 'expires_at', 'created_at'];
    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'created_at';
    const sortDirection = sortOrder === 'asc' ? 'ASC' : 'DESC';
    
    // Build query with proper parameterization
    let keys: any[];
    
    if (search && status !== 'all') {
      // Both search and status filter
      const searchPattern = `%${search}%`;
      keys = await sql`
        SELECT * FROM license_keys
        WHERE (key_code ILIKE ${searchPattern} OR customer_email ILIKE ${searchPattern} 
               OR customer_name ILIKE ${searchPattern} OR customer_company ILIKE ${searchPattern})
          AND status = ${status}
        ORDER BY ${sql(sortColumn)} ${sql.unsafe(sortDirection)}
        LIMIT ${limit} OFFSET ${offset}
      ` as any[];
    } else if (search) {
      // Only search filter
      const searchPattern = `%${search}%`;
      keys = await sql`
        SELECT * FROM license_keys
        WHERE key_code ILIKE ${searchPattern} OR customer_email ILIKE ${searchPattern}
              OR customer_name ILIKE ${searchPattern} OR customer_company ILIKE ${searchPattern}
        ORDER BY ${sql(sortColumn)} ${sql.unsafe(sortDirection)}
        LIMIT ${limit} OFFSET ${offset}
      ` as any[];
    } else if (status !== 'all') {
      // Only status filter
      keys = await sql`
        SELECT * FROM license_keys
        WHERE status = ${status}
        ORDER BY ${sql(sortColumn)} ${sql.unsafe(sortDirection)}
        LIMIT ${limit} OFFSET ${offset}
      ` as any[];
    } else {
      // No filters
      keys = await sql`
        SELECT * FROM license_keys
        ORDER BY ${sql(sortColumn)} ${sql.unsafe(sortDirection)}
        LIMIT ${limit} OFFSET ${offset}
      ` as any[];
    }

    return NextResponse.json({ 
      keys,
      total: keys.length,
      hasMore: keys.length === limit 
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, private, max-age=0',
      }
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

    const sql = getSql();
    const keys = [];

    // Generate random key codes in format SCO-XXXX-XXXX-XXXX
    function generateKeyCode(): string {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const generateSegment = () => {
        let segment = '';
        for (let i = 0; i < 4; i++) {
          segment += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return segment;
      };
      return `SCO-${generateSegment()}-${generateSegment()}-${generateSegment()}`;
    }

    for (let i = 0; i < Math.min(count, 100); i++) {
      const key_code = generateKeyCode();
      
      const result = await sql`
        INSERT INTO license_keys (
          key_code, status, max_downloads, customer_name, customer_email, 
          customer_company, notes, created_by, expires_at
        ) VALUES (
          ${key_code}, 'unused', ${max_downloads}, ${customer_name || null}, 
          ${customer_email || null}, ${customer_company || null}, ${notes || null}, 
          ${session.username}, ${expires_at ? new Date(expires_at) : null}
        ) RETURNING *
      `;
      
      keys.push(result[0]);
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

// DELETE license key
export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'License key ID is required' }, { status: 400 });
    }

    const sql = getSql();
    await sql`DELETE FROM license_keys WHERE id = ${id}`;

    return NextResponse.json({ success: true, message: 'License key deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete license key:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
