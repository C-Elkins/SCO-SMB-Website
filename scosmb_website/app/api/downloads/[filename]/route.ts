import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { query } from '@/lib/db';

const downloadsDir = path.join(process.cwd(), 'public', 'downloads');

function getContentType(fileName: string) {
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.pkg')) return 'application/octet-stream';
  if (lower.endsWith('.dmg')) return 'application/x-apple-diskimage';
  if (lower.endsWith('.exe')) return 'application/vnd.microsoft.portable-executable';
  if (lower.endsWith('.zip')) return 'application/zip';
  return 'application/octet-stream';
}

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ filename: string }> }
) {
  // Await the params Promise
  const { filename } = await params;
  const safeName = path.basename(filename);
  const filePath = path.join(downloadsDir, safeName);

  try {
    const data = await fs.readFile(filePath);
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Log technician downloads without tying them to a license
    if (process.env.DATABASE_URL) {
      try {
        await query(
          `INSERT INTO download_logs (license_key_id, platform, version, ip_address, user_agent, asset_name)
           VALUES (NULL, $1, $2, $3, $4, $5)`,
          ['technician_portal', 'portal-direct', ip, userAgent, safeName]
        );
      } catch (logError) {
        console.error('Failed to record download log', logError);
      }
    }

    return new NextResponse(data, {
      headers: {
        'Content-Type': getContentType(safeName),
        'Content-Disposition': `attachment; filename="${safeName}"`,
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}