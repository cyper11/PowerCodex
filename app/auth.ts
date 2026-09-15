import { db } from '@/db/raw';
import { accounts, sessions } from '@/db/schema';
import { and, eq, gt } from 'drizzle-orm';

export type PowerCodexUser = {
  userId: string;
  email: string;
};

const SESSION_COOKIE = 'powercodex_session';
const SESSION_AGE_SECONDS = 60 * 60 * 24 * 30;
const PASSWORD_ITERATIONS = 210_000;
const encoder = new TextEncoder();

export function normalizeEmail(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPassword(value: unknown): value is string {
  return typeof value === 'string' && value.length >= 10 && value.length <= 128;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivePassword(password, salt, PASSWORD_ITERATIONS);
  return `pbkdf2-sha256.${PASSWORD_ITERATIONS}.${toBase64Url(salt)}.${toBase64Url(hash)}`;
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [algorithm, iterationText, saltText, expectedText] = stored.split('.');
  const iterations = Number(iterationText);
  if (
    algorithm !== 'pbkdf2-sha256' ||
    !Number.isInteger(iterations) ||
    iterations < 100_000 ||
    !saltText ||
    !expectedText
  ) {
    return false;
  }

  try {
    const actual = await derivePassword(
      password,
      fromBase64Url(saltText),
      iterations,
    );
    const expected = fromBase64Url(expectedText);
    return constantTimeEqual(actual, expected);
  } catch {
    return false;
  }
}

export async function getPowerCodexUser(
  request: Request,
): Promise<PowerCodexUser | null> {
  const token = readCookie(request.headers.get('cookie'), SESSION_COOKIE);
  if (!token) return null;

  const sessionId = await hashSessionToken(token);
  const now = new Date().toISOString();
  const [user] = await db()
    .select({ userId: accounts.id, email: accounts.email })
    .from(sessions)
    .innerJoin(accounts, eq(accounts.id, sessions.owner))
    .where(and(eq(sessions.id, sessionId), gt(sessions.expiresAt, now)))
    .limit(1);

  return user ?? null;
}

export function createSessionToken(): string {
  return toBase64Url(crypto.getRandomValues(new Uint8Array(32)));
}

export async function hashSessionToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(token));
  return toBase64Url(new Uint8Array(digest));
}

export function sessionExpiry(): string {
  return new Date(Date.now() + SESSION_AGE_SECONDS * 1000).toISOString();
}

export function sessionCookie(token: string, request: Request): string {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_AGE_SECONDS}${secure}`;
}

export function clearSessionCookie(request: Request): string {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

export function requestSessionToken(request: Request): string | null {
  return readCookie(request.headers.get('cookie'), SESSION_COOKIE);
}

async function derivePassword(
  password: string,
  salt: Uint8Array,
  iterations: number,
): Promise<Uint8Array> {
  const normalizedSalt = Uint8Array.from(salt);
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: normalizedSalt, iterations },
    key,
    256,
  );
  return new Uint8Array(bits);
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left[index] ^ right[index];
  }
  return difference === 0;
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(';')) {
    const [key, ...valueParts] = part.trim().split('=');
    if (key === name) return valueParts.join('=') || null;
  }
  return null;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}
