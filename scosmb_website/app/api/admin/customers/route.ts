import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const revalidate = 0;

// GET - Fetch all customers with their license keys
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sql = getSql();

    // Get all customers
    const customerList = await sql`
      SELECT * FROM customers
      ORDER BY created_at DESC
    ` as any[];

    // Get license keys for each customer
    const customersWithKeys = await Promise.all(
      customerList.map(async (customer: any) => {
        const keys = await sql`
          SELECT key_code FROM license_keys
          WHERE customer_email = ${customer.email}
        ` as any[];

        return {
          ...customer,
          license_keys: keys.map((k: any) => k.key_code),
        };
      })
    );

    return NextResponse.json({ customers: customersWithKeys }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, private, max-age=0',
      }
    });
  } catch (error: any) {
    console.error('Failed to fetch customers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create a new customer
export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sql = getSql();
    const body = await request.json();

    const { company, email, phone, point_of_contact, address, notes, status, monthly_rate, num_computers, num_keys_needed } = body;

    if (!company || !email) {
      return NextResponse.json(
        { error: 'Company and email are required' },
        { status: 400 }
      );
    }

    // Check if customer with email already exists
    const existing = await sql`
      SELECT id FROM customers WHERE email = ${email}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Customer with this email already exists' },
        { status: 400 }
      );
    }

    // Create customer
    const newCustomer = await sql`
      INSERT INTO customers (
        company, email, phone, point_of_contact, address, notes, status,
        total_spent, monthly_rate, num_computers, num_keys_needed
      ) VALUES (
        ${company}, ${email}, ${phone || null}, ${point_of_contact || null},
        ${address || null}, ${notes || null}, ${status || 'active'},
        0, ${monthly_rate || 0}, ${num_computers || 0}, ${num_keys_needed || 0}
      ) RETURNING *
    `;

    return NextResponse.json({ customer: newCustomer[0] });
  } catch (error: any) {
    console.error('Failed to create customer:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Update a customer
export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sql = getSql();
    const body = await request.json();

    const { id, company, email, phone, point_of_contact, address, notes, status, total_spent, monthly_rate, num_computers, num_keys_needed } = body;

    if (!id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    const updatedCustomer = await sql`
      UPDATE customers SET
        company = ${company},
        email = ${email},
        phone = ${phone},
        point_of_contact = ${point_of_contact},
        address = ${address},
        notes = ${notes},
        status = ${status},
        total_spent = ${total_spent},
        monthly_rate = ${monthly_rate},
        num_computers = ${num_computers},
        num_keys_needed = ${num_keys_needed},
        last_activity = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({ customer: updatedCustomer[0] });
  } catch (error: any) {
    console.error('Failed to update customer:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Delete a customer
export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sql = getSql();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    await sql`DELETE FROM customers WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete customer:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
