import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { licenseKey, platform } = await request.json();
    
    // Validate format
    if (!licenseKey || !/^SCO-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(licenseKey)) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Invalid license key format. Expected format: SCO-XXXX-XXXX-XXXX' 
      }, { status: 400 });
    }
    
    // Check database
    const result = await query(
      'SELECT * FROM license_keys WHERE key = $1',
      [licenseKey]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json({ 
        valid: false, 
        error: 'License key not found. Please check the key and try again.' 
      }, { status: 404 });
    }
    
    const key = result.rows[0];
    
    // Check status
    if (key.status === 'revoked') {
      return NextResponse.json({ 
        valid: false, 
        error: 'This license key has been revoked. Please contact support.' 
      }, { status: 403 });
    }
    
    if (key.status === 'expired') {
      return NextResponse.json({ 
        valid: false, 
        error: 'This license key has expired. Please contact support for a new key.' 
      }, { status: 403 });
    }
    
    // Check expiration date
    if (key.expires_at && new Date(key.expires_at) < new Date()) {
      await query(
        'UPDATE license_keys SET status = $1 WHERE id = $2',
        ['expired', key.id]
      );
      return NextResponse.json({ 
        valid: false, 
        error: 'This license key has expired. Please contact support for a new key.' 
      }, { status: 403 });
    }
    
    // Check download limit
    if (key.download_count >= key.max_downloads) {
      return NextResponse.json({ 
        valid: false, 
        error: `Download limit reached (${key.max_downloads} maximum downloads). Please contact support.` 
      }, { status: 403 });
    }
    
    // Valid! Update database
    if (key.status === 'unused') {
      await query(
        'UPDATE license_keys SET status = $1, activated_at = NOW() WHERE id = $2',
        ['active', key.id]
      );
    }
    
    await query(
      'UPDATE license_keys SET download_count = download_count + 1 WHERE id = $1',
      [key.id]
    );
    
    // Log download
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    await query(
      `INSERT INTO download_logs (license_key_id, platform, ip_address, user_agent) 
       VALUES ($1, $2, $3, $4)`,
      [key.id, platform || 'unknown', ip, userAgent]
    );
    
    return NextResponse.json({ 
      valid: true,
      message: 'License key validated successfully!',
      downloadsRemaining: key.max_downloads - key.download_count - 1
    });
  } catch (error) {
    console.error('License validation error:', error);
    return NextResponse.json({ 
      valid: false, 
      error: 'An error occurred while validating your license key. Please try again.' 
    }, { status: 500 });
  }
}
