import { NextRequest, NextResponse } from 'next/server';
import { getAllLicenseKeys, createLicenseKey, updateLicenseKey, deleteLicenseKey, getDownloadStats, generateBulkKeys } from '@/lib/license';

// Simple auth check (replace with proper JWT auth in production)
function checkAuth(request: NextRequest): boolean {
  const authCookie = request.cookies.get('admin_auth');
  return authCookie?.value === 'authenticated';
}

// GET all license keys
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const keys = getAllLicenseKeys();
    const stats = getDownloadStats();

    return NextResponse.json({ keys, stats });
  } catch (error) {
    console.error('Error fetching keys:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new license key(s)
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { count, maxDownloads, expiresAt, customerName, customerEmail, customerCompany, notes } = body;

    if (count && count > 1) {
      // Bulk generation
      const keyCodes = generateBulkKeys(count);
      const keys = keyCodes.map((code) => {
        const key = createLicenseKey({
          maxDownloads: maxDownloads || 3,
          expiresAt: expiresAt ? new Date(expiresAt) : undefined,
          customerName,
          customerEmail,
          customerCompany,
          notes,
          createdBy: 'admin',
        });
        return key;
      });

      return NextResponse.json({ keys, count: keys.length });
    } else {
      // Single key generation
      const key = createLicenseKey({
        maxDownloads: maxDownloads || 3,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
        customerName,
        customerEmail,
        customerCompany,
        notes,
        createdBy: 'admin',
      });

      return NextResponse.json({ key });
    }
  } catch (error) {
    console.error('Error creating key:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH update license key
export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Key ID is required' }, { status: 400 });
    }

    const updatedKey = updateLicenseKey(id, updates);

    if (!updatedKey) {
      return NextResponse.json({ error: 'Key not found' }, { status: 404 });
    }

    return NextResponse.json({ key: updatedKey });
  } catch (error) {
    console.error('Error updating key:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE license key
export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Key ID is required' }, { status: 400 });
    }

    const success = deleteLicenseKey(id);

    if (!success) {
      return NextResponse.json({ error: 'Key not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting key:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
