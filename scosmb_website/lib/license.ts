import crypto from 'crypto';

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

// In-memory storage for development (replace with actual database in production)
let licenseKeys: LicenseKey[] = [];
let downloadLogs: DownloadLog[] = [];

// Initialize with some demo keys
if (licenseKeys.length === 0) {
  licenseKeys = [
    {
      id: crypto.randomUUID(),
      key_code: 'SCO-A1B2-C3D4-E5F6',
      status: 'unused',
      created_at: new Date(),
      created_by: 'admin',
      download_count: 0,
      max_downloads: 3,
    },
    {
      id: crypto.randomUUID(),
      key_code: 'SCO-X9Y8-Z7W6-V5U4',
      status: 'active',
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      created_by: 'admin',
      activated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      download_count: 2,
      max_downloads: 5,
      customer_name: 'John Doe',
      customer_email: 'john@example.com',
    },
  ];
}

export function generateLicenseKey(): string {
  const segments = 3;
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

  licenseKeys.push(key);
  return key;
}

export function findLicenseKeyByCode(code: string): LicenseKey | undefined {
  return licenseKeys.find((k) => k.key_code === code);
}

export function getAllLicenseKeys(): LicenseKey[] {
  return licenseKeys.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
}

export function updateLicenseKey(id: string, updates: Partial<LicenseKey>): LicenseKey | null {
  const index = licenseKeys.findIndex((k) => k.id === id);
  if (index === -1) return null;

  licenseKeys[index] = { ...licenseKeys[index], ...updates };
  return licenseKeys[index];
}

export function deleteLicenseKey(id: string): boolean {
  const index = licenseKeys.findIndex((k) => k.id === id);
  if (index === -1) return false;

  licenseKeys.splice(index, 1);
  return true;
}

export function validateLicenseKey(code: string): {
  valid: boolean;
  error?: string;
  key?: LicenseKey;
} {
  // Check format
  if (!/^SCO-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)) {
    return { valid: false, error: 'Invalid license key format' };
  }

  const key = findLicenseKeyByCode(code);

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
    updateLicenseKey(key.id, { status: 'expired' });
    return { valid: false, error: 'This license key has expired' };
  }

  if (key.download_count >= key.max_downloads) {
    return { valid: false, error: `Download limit reached (${key.max_downloads} max)` };
  }

  return { valid: true, key };
}

export function recordDownload(
  keyId: string,
  platform: string,
  version: string,
  ipAddress?: string,
  userAgent?: string
): void {
  const log: DownloadLog = {
    id: crypto.randomUUID(),
    license_key_id: keyId,
    download_date: new Date(),
    platform,
    version,
    ip_address: ipAddress,
    user_agent: userAgent,
    success: true,
  };

  downloadLogs.push(log);

  // Update download count
  const key = licenseKeys.find((k) => k.id === keyId);
  if (key) {
    key.download_count += 1;
    if (key.status === 'unused') {
      key.status = 'active';
      key.activated_at = new Date();
    }
  }
}

export function getDownloadLogs(keyId?: string): DownloadLog[] {
  if (keyId) {
    return downloadLogs.filter((log) => log.license_key_id === keyId);
  }
  return downloadLogs.sort((a, b) => b.download_date.getTime() - a.download_date.getTime());
}

export function getDownloadStats() {
  return {
    totalDownloads: downloadLogs.length,
    totalKeys: licenseKeys.length,
    activeKeys: licenseKeys.filter((k) => k.status === 'active').length,
    unusedKeys: licenseKeys.filter((k) => k.status === 'unused').length,
    expiredKeys: licenseKeys.filter((k) => k.status === 'expired').length,
    revokedKeys: licenseKeys.filter((k) => k.status === 'revoked').length,
  };
}
