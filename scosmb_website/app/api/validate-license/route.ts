import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { licenseKey, platform, version } = await request.json();
    
    console.log('[License Validation] Checking key:', licenseKey?.substring(0, 8) + '...');
    
    // Validate format
    if (!licenseKey || !/^SCO-.+-.+-.+$/.test(licenseKey)) {
      console.log('[License Validation] Invalid format');
      return NextResponse.json({ 
        valid: false, 
        error: 'Invalid license key format. Expected format: SCO-XXXX-XXXX-XXXX' 
      }, { status: 400 });
    }
    
    // Check database - always fetch fresh data from DB (no caching)
    const result = await query(
      'SELECT * FROM license_keys WHERE key_code = $1',
      [licenseKey]
    );
    
    console.log('[License Validation] Database query completed, rows found:', result.rows.length);
    
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
    
    // Valid! Update database with current timestamp
    if (key.status === 'unused') {
      await query(
        'UPDATE license_keys SET status = $1, activated_at = NOW(), updated_at = NOW() WHERE id = $2',
        ['active', key.id]
      );
      console.log('[License Validation] Key activated:', key.key_code?.substring(0, 8) + '...');
    }
    
    await query(
      'UPDATE license_keys SET download_count = download_count + 1, last_used = NOW(), updated_at = NOW() WHERE id = $1',
      [key.id]
    );
    console.log('[License Validation] Download count incremented for key:', key.key_code?.substring(0, 8) + '...');
    
    // Log download
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    await query(
      `INSERT INTO download_logs (license_key_id, platform, version, ip_address, user_agent) 
       VALUES ($1, $2, $3, $4, $5)`,
      [key.id, platform || 'unknown', version || 'unknown', ip, userAgent]
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
