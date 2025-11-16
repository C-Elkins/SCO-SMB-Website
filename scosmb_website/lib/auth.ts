import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
const ADMIN_JWT_COOKIE = 'scosmb_admin_jwt';
const PORTAL_COOKIE = 'scosmb_portal_auth';

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export function generateToken(payload: any): string {
  return sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

export function verifyToken(token: string): any {
  try {
    return verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function generatePortalToken(): string {
  return sign({ portal: true }, JWT_SECRET, { expiresIn: '7d' });
}

export interface AdminTokenPayload { userId: string; username: string; }

export function signAdminJWT(payload: AdminTokenPayload) {
  return sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

export function verifyAdminJWT(token: string): AdminTokenPayload | null {
  try { return verify(token, JWT_SECRET) as AdminTokenPayload; } catch { return null; }
}

export async function getAdminSession(): Promise<AdminTokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_JWT_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminJWT(token);
}

export function setAdminSession(response: NextResponse, payload: AdminTokenPayload) {
  const token = signAdminJWT(payload);
  response.cookies.set(ADMIN_JWT_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}

export function clearAdminSession(response: NextResponse) {
  response.cookies.delete(ADMIN_JWT_COOKIE);
  return response;
}

export async function validatePortalPassword(input: string) {
  const expected = process.env.PORTAL_PASSWORD; if (!expected) throw new Error('PORTAL_PASSWORD not set');
  if (expected.startsWith('$2a$') || expected.startsWith('$2b$')) { return compare(input, expected); }
  return input === expected;
}

export function setPortalSession(response: NextResponse) {
  response.cookies.set(PORTAL_COOKIE, 'true', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return response;
}

export async function hasPortalSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return !!cookieStore.get(PORTAL_COOKIE);
}
