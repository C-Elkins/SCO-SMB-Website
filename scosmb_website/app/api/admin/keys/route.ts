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
    
    // Build WHERE clause dynamically
    let whereClause = 'WHERE 1=1';
    const params: any[] = [];
    
    // Search filter
    if (search) {
      whereClause += ` AND (key_code ILIKE $${params.length + 1} OR customer_email ILIKE $${params.length + 1} OR customer_name ILIKE $${params.length + 1} OR customer_company ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }

    // Status filter
    if (status !== 'all') {
      whereClause += ` AND status = $${params.length + 1}`;
      params.push(status);
    }

    // Validate and build ORDER BY clause
    const validSortColumns = ['key_code', 'status', 'customer_name', 'customer_email', 'expires_at', 'created_at'];
    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'created_at';
    const sortDirection = sortOrder === 'asc' ? 'ASC' : 'DESC';
    
    // Build the query
    const query = `
      SELECT * FROM license_keys
      ${whereClause}
      ORDER BY ${sortColumn} ${sortDirection}
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
    params.push(limit, offset);

    const keys = await sql.unsafe(query, params);

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
