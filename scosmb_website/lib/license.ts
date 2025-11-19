import crypto from 'crypto';
import { query } from './db';

export interface LicenseKey {
  id: string;
  key_code: string;
  status: 'unused' | 'active' | 'expired' | 'revoked';
  created_at: Date;
  created_by: string;
  activated_at?: Date;
  expires_at?: Date;
  download_count: number;
  max_downloads: number;
  notes?: string;
  customer_email?: string;
  customer_name?: string;
  customer_company?: string;
}

export interface DownloadLog {
  id: string;
  license_key_id: string;
  download_date: Date;
  platform: string;
  version: string;
  ip_address?: string;
  user_agent?: string;
  success: boolean;
}

export function generateLicenseKey(): string {
  const segments = 4;
  const segmentLength = 4;
  
  let key = 'SCO';
  
  for (let i = 0; i < segments; i++) {
    const randomBytes = crypto.randomBytes(2);
    const segment = randomBytes.toString('hex').toUpperCase().slice(0, segmentLength);
    key += `-${segment}`;
  }
  
  return key;
}

export function generateBulkKeys(count: number): string[] {
  const keys = new Set<string>();
  
  while (keys.size < count) {
    keys.add(generateLicenseKey());
  }
  
  return Array.from(keys);
}

export function createLicenseKey(data: {
  maxDownloads?: number;
  expiresAt?: Date;
  customerName?: string;
  customerEmail?: string;
  customerCompany?: string;
  notes?: string;
  createdBy: string;
}): LicenseKey {
  const key: LicenseKey = {
    id: crypto.randomUUID(),
    key_code: generateLicenseKey(),
    status: 'unused',
    created_at: new Date(),
    created_by: data.createdBy,
    download_count: 0,
    max_downloads: data.maxDownloads || 3,
    expires_at: data.expiresAt,
    customer_email: data.customerEmail,
    customer_name: data.customerName,
    customer_company: data.customerCompany,
    notes: data.notes,
  };

  // Insert into database
  query(
    `INSERT INTO license_keys (id, key_code, status, created_by, max_downloads, expires_at, customer_name, customer_email, customer_company, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [key.id, key.key_code, key.status, key.created_by, key.max_downloads, key.expires_at, key.customer_name, key.customer_email, key.customer_company, key.notes]
  ).catch(err => console.error('Error creating license key:', err));

  return key;
}

export async function findLicenseKeyByCode(code: string): Promise<LicenseKey | undefined> {
  try {
    const result = await query('SELECT * FROM license_keys WHERE key_code = $1', [code]);
    return result.rows[0] as LicenseKey | undefined;
  } catch (error) {
    console.error('Error finding license key:', error);
    return undefined;
  }
}

export async function getAllLicenseKeys(): Promise<LicenseKey[]> {
  try {
    const result = await query('SELECT * FROM license_keys ORDER BY created_at DESC');
    return result.rows as LicenseKey[];
  } catch (error) {
    console.error('Error getting all license keys:', error);
    return [];
  }
}

export async function updateLicenseKey(id: string, updates: Partial<LicenseKey>): Promise<LicenseKey | null> {
  try {
    const fields = Object.keys(updates).filter(k => k !== 'id');
    const values = fields.map(k => updates[k as keyof LicenseKey]);
    const setClause = fields.map((f, i) => `${f} = $${i + 2}`).join(', ');
    
    const result = await query(
      `UPDATE license_keys SET ${setClause} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    
    return result.rows[0] as LicenseKey || null;
  } catch (error) {
    console.error('Error updating license key:', error);
    return null;
  }
}

export async function deleteLicenseKey(id: string): Promise<boolean> {
  try {
    await query('DELETE FROM license_keys WHERE id = $1', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting license key:', error);
    return false;
  }
}

export async function validateLicenseKey(code: string): Promise<{
  valid: boolean;
  error?: string;
  key?: LicenseKey;
}> {
  // Check format
  if (!/^SCO-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)) {
    return { valid: false, error: 'Invalid license key format' };
  }

  const key = await findLicenseKeyByCode(code);

  if (!key) {
    return { valid: false, error: 'License key not found' };
  }

  if (key.status === 'revoked') {
    return { valid: false, error: 'This license key has been revoked' };
  }

  if (key.status === 'expired') {
    return { valid: false, error: 'This license key has expired' };
  }

  if (key.expires_at && new Date(key.expires_at) < new Date()) {
    await updateLicenseKey(key.id, { status: 'expired' });
    return { valid: false, error: 'This license key has expired' };
  }

  if (key.download_count >= key.max_downloads) {
    return { valid: false, error: `Download limit reached (${key.max_downloads} max)` };
  }

  return { valid: true, key };
}

export async function recordDownload(
  keyId: string,
  platform: string,
  version: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  try {
    // Insert download log
    await query(
      `INSERT INTO download_logs (license_key_id, platform, version, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
      [keyId, platform, version || 'unknown', ipAddress, userAgent]
    );

    // Update license key
    const result = await query('SELECT status FROM license_keys WHERE id = $1', [keyId]);
    const currentStatus = result.rows[0]?.status;

    if (currentStatus === 'unused') {
      await query(
        `UPDATE license_keys 
         SET download_count = download_count + 1, status = 'active', activated_at = NOW()
         WHERE id = $1`,
        [keyId]
      );
    } else {
      await query(
        `UPDATE license_keys SET download_count = download_count + 1 WHERE id = $1`,
        [keyId]
      );
    }
  } catch (error) {
    console.error('Error recording download:', error);
  }
}

export async function getDownloadLogs(keyId?: string): Promise<DownloadLog[]> {
  try {
    if (keyId) {
      const result = await query(
        'SELECT * FROM download_logs WHERE license_key_id = $1 ORDER BY download_date DESC',
        [keyId]
      );
      return result.rows as DownloadLog[];
    }
    const result = await query('SELECT * FROM download_logs ORDER BY download_date DESC');
    return result.rows as DownloadLog[];
  } catch (error) {
    console.error('Error getting download logs:', error);
    return [];
  }
}

export async function getDownloadStats() {
  try {
    const keysResult = await query('SELECT COUNT(*) as count, status FROM license_keys GROUP BY status');
    const logsResult = await query('SELECT COUNT(*) as count FROM download_logs');

    const stats = {
      totalDownloads: parseInt(logsResult.rows[0]?.count || '0'),
      totalKeys: 0,
      activeKeys: 0,
      unusedKeys: 0,
      expiredKeys: 0,
      revokedKeys: 0,
    };

    keysResult.rows.forEach((row: { status: string; count: string }) => {
      const count = parseInt(row.count);
      stats.totalKeys += count;
      if (row.status === 'active') stats.activeKeys = count;
      if (row.status === 'unused') stats.unusedKeys = count;
      if (row.status === 'expired') stats.expiredKeys = count;
      if (row.status === 'revoked') stats.revokedKeys = count;
    });

    return stats;
  } catch (error) {
    console.error('Error getting download stats:', error);
    return {
      totalDownloads: 0,
      totalKeys: 0,
      activeKeys: 0,
      unusedKeys: 0,
      expiredKeys: 0,
      revokedKeys: 0,
    };
  }
}
