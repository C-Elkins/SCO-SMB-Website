import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { customers, license_keys } from '@/lib/schema';
import { eq, desc, sql } from 'drizzle-orm';

// GET - Fetch all customers with their license keys
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getDb();

    // Get all customers
    const customerList = await db
      .select()
      .from(customers)
      .orderBy(desc(customers.created_at));

    // Get license keys for each customer
    const customersWithKeys = await Promise.all(
      customerList.map(async (customer) => {
        const keys = await db
          .select({ key_code: license_keys.key_code })
          .from(license_keys)
          .where(eq(license_keys.customer_email, customer.email));

        return {
          ...customer,
          license_keys: keys.map(k => k.key_code),
        };
      })
    );

    return NextResponse.json({ customers: customersWithKeys });
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
    const db = getDb();
    const body = await request.json();

    const { company, email, phone, point_of_contact, address, notes, status, monthly_rate, num_computers, num_keys_needed } = body;

    if (!company || !email) {
      return NextResponse.json(
        { error: 'Company and email are required' },
        { status: 400 }
      );
    }

    // Check if customer with email already exists
    const existing = await db
      .select()
      .from(customers)
      .where(eq(customers.email, email));

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Customer with this email already exists' },
        { status: 400 }
      );
    }

    // Create customer
    const [newCustomer] = await db
      .insert(customers)
      .values({
        company: company,
        email: email,
        phone: phone || null,
        point_of_contact: point_of_contact || null,
        address: address || null,
        notes: notes || null,
        status: status || 'active',
        total_spent: 0,
        monthly_rate: monthly_rate || 0,
        num_computers: num_computers || 0,
        num_keys_needed: num_keys_needed || 0,
      } as any)
      .returning();

    return NextResponse.json({ customer: newCustomer });
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
    const db = getDb();
    const body = await request.json();

    const { id, company, email, phone, point_of_contact, address, notes, status, total_spent, monthly_rate, num_computers, num_keys_needed } = body;

    if (!id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    const [updatedCustomer] = await db
      .update(customers)
      .set({
        company: company,
        email: email,
        phone: phone,
        point_of_contact: point_of_contact,
        address: address,
        notes: notes,
        status: status,
        total_spent: total_spent,
        monthly_rate: monthly_rate,
        num_computers: num_computers,
        num_keys_needed: num_keys_needed,
        last_activity: sql`CURRENT_TIMESTAMP`,
      } as any)
      .where(eq(customers.id, id))
      .returning();

    return NextResponse.json({ customer: updatedCustomer });
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
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    await db.delete(customers).where(eq(customers.id, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete customer:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
