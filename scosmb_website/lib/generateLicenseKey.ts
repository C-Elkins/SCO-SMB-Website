import crypto from 'crypto';

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
