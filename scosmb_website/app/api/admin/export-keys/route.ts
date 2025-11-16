import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { license_keys } from '@/lib/schema';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'csv';

    const db = getDb();
    const keys = await db.select().from(license_keys);

    if (format === 'csv') {
      // Generate CSV
      const headers = [
        'Key Code',
        'Status',
        'Downloads',
        'Max Downloads',
        'Customer Name',
        'Customer Email',
        'Customer Company',
        'Created At',
        'Expires At',
        'Notes'
      ];

      const csvRows = keys.map(key => [
        key.key_code,
        key.status,
        key.download_count || 0,
        key.max_downloads || 0,
        key.customer_name || '',
        key.customer_email || '',
        key.customer_company || '',
        key.created_at ? new Date(key.created_at).toISOString() : '',
        key.expires_at ? new Date(key.expires_at).toISOString() : '',
        key.notes || ''
      ]);

      const csvContent = [headers, ...csvRows]
        .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="license-keys.csv"'
        }
      });
    } else {
      // Return JSON for other formats (could add Excel support later)
      return NextResponse.json({ keys });
    }
  } catch (error: any) {
    console.error('Export error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}