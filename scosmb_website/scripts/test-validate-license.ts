import { config } from 'dotenv';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/validate-license/route';

config({ path: '.env.local' });

async function main() {
  const licenseKey = process.argv[2];

  if (!licenseKey) {
    console.error('Usage: tsx scripts/test-validate-license.ts <LICENSE_KEY>');
    process.exit(1);
  }

  const request = new NextRequest('http://localhost/api/validate-license', {
    method: 'POST',
    body: JSON.stringify({
      licenseKey,
      platform: 'macOS',
      version: '1.0.0'
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': '127.0.0.1',
      'user-agent': 'schema-align-test'
    }
  });

  const response = await POST(request);
  const data = await response.json();

  console.log('Status:', response.status);
  console.log('Response:', data);
}

main().catch((error) => {
  console.error('Test run failed:', error);
  process.exit(1);
});
