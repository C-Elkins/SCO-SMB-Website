import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { customers } from '@/lib/schema';
import { getAdminSession } from '@/lib/auth';
import { inArray } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const db = getDb();

    const { action, ids } = await request.json();

    if (!action || !ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: action and ids required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'email':
        // Get customer emails
        const customerList = await db
          .select()
          .from(customers)
          .where(inArray(customers.id, ids));

        const emails = customerList.map(c => c.email);

        // Log the action (actual email sending would happen here)
        console.log('[Bulk Action] Email prepared for customers:', emails);

        return NextResponse.json({ 
          success: true,
          message: `Email prepared for ${ids.length} customers`,
          emails,
          note: 'Email integration required for sending'
        });

      case 'delete':
        await db
          .delete(customers)
          .where(inArray(customers.id, ids));
        
        console.log('[Bulk Action] Deleted customers:', ids.length);
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
