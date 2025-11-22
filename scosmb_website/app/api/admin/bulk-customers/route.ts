import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { customers, audit_logs } from '@/lib/schema';
import { verifyAdmin } from '@/lib/auth';
import { inArray } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, ids } = await request.json();

    if (!action || !ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: action and ids required' },
        { status: 400 }
      );
    }

    let result;
    
    switch (action) {
      case 'email':
        // Get customer emails
        const customerList = await db
          .select()
          .from(customers)
          .where(inArray(customers.id, ids));

        const emails = customerList.map(c => c.email);

        // Log the action (actual email sending would happen here)
        await db.insert(audit_logs).values({
          admin_email: adminCheck.email || 'system',
          action: 'bulk_email_customers',
          details: `Prepared email for ${ids.length} customers`,
          metadata: { count: ids.length, emails },
          created_at: new Date().toISOString()
        });

        return NextResponse.json({ 
          success: true,
          message: `Email prepared for ${ids.length} customers`,
          emails,
          note: 'Email integration required for sending'
        });

      case 'delete':
        result = await db
          .delete(customers)
          .where(inArray(customers.id, ids));
        
        await db.insert(audit_logs).values({
          admin_email: adminCheck.email || 'system',
          action: 'bulk_delete_customers',
          details: `Deleted ${ids.length} customers`,
          metadata: { count: ids.length },
          created_at: new Date().toISOString()
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ 
      success: true,
      message: `Successfully ${action}ed ${ids.length} customers`,
      count: ids.length
    });

  } catch (error) {
    console.error('Bulk customers action error:', error);
    return NextResponse.json(
      { error: 'Failed to perform bulk action' },
      { status: 500 }
    );
  }
}
