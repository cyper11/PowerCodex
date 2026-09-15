import {
  clearSessionCookie,
  createSessionToken,
  getPowerCodexUser,
  hashPassword,
  hashSessionToken,
  isValidEmail,
  isValidPassword,
  normalizeEmail,
  requestSessionToken,
  sessionCookie,
  sessionExpiry,
  verifyPassword,
} from '../../../auth';
import { db } from '@/db/raw';

export const dynamic = 'force-dynamic';

const json = (data: unknown, status = 200, headers?: Record<string, string>) =>
  Response.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  });

async function handler(
  request: Request,
  context: { params: Promise<{ action: string }> },
) {
  try {
    const { action } = await context.params;

    if (request.method === 'GET' && action === 'session') {
      const user = await getPowerCodexUser(request);
      return json({ user });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed.' }, 405);
    }

    const url = new URL(request.url);
    const origin = request.headers.get('origin');
    if (origin && origin !== url.origin) {
      return json({ error: 'Request origin is not allowed.' }, 403);
    }

    if (action === 'signout') {
      const token = requestSessionToken(request);
      if (token) {
        await db()
          .prepare('DELETE FROM sessions WHERE id = ?')
          .bind(await hashSessionToken(token))
          .run();
      }
      return json(
        { ok: true },
        200,
        { 'Set-Cookie': clearSessionCookie(request) },
      );
    }

    const raw = await request.text();
    if (raw.length > 4_000) return json({ error: 'Invalid request.' }, 413);

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return json({ error: 'Invalid request.' }, 400);
    }

    const email = normalizeEmail(data.email);
    const password = data.password;
    if (!isValidEmail(email)) {
      return json({ error: 'Maglagay ng valid na email address.' }, 400);
    }
    if (!isValidPassword(password)) {
      return json(
        { error: 'Gumamit ng password na 10–128 characters.' },
        400,
      );
    }

    if (action === 'register') {
      const existing = await db()
        .prepare('SELECT id FROM accounts WHERE email = ?')
        .bind(email)
        .first();
      if (existing) {
        return json({ error: 'May PowerCodex account na para sa email na ito.' }, 409);
      }

      const owner = crypto.randomUUID();
      const token = createSessionToken();
      const now = new Date().toISOString();
      await db().batch([
        db()
          .prepare(
            'INSERT INTO accounts (id,email,password_hash,created_at) VALUES (?,?,?,?)',
          )
          .bind(owner, email, await hashPassword(password), now),
        db()
          .prepare(
            'INSERT INTO sessions (id,owner,expires_at,created_at) VALUES (?,?,?,?)',
          )
          .bind(await hashSessionToken(token), owner, sessionExpiry(), now),
      ]);

      return json(
        { user: { userId: owner, email } },
        201,
        { 'Set-Cookie': sessionCookie(token, request) },
      );
    }

    if (action === 'signin') {
      const account = await db()
        .prepare(
          'SELECT id, email, password_hash AS passwordHash FROM accounts WHERE email = ?',
        )
        .bind(email)
        .first<{ id: string; email: string; passwordHash: string }>();
      if (!account || !(await verifyPassword(password, account.passwordHash))) {
        return json({ error: 'Mali ang email o password.' }, 401);
      }

      const token = createSessionToken();
      const now = new Date().toISOString();
      await db()
        .prepare(
          'INSERT INTO sessions (id,owner,expires_at,created_at) VALUES (?,?,?,?)',
        )
        .bind(await hashSessionToken(token), account.id, sessionExpiry(), now)
        .run();

      return json(
        { user: { userId: account.id, email: account.email } },
        200,
        { 'Set-Cookie': sessionCookie(token, request) },
      );
    }

    return json({ error: 'Not found.' }, 404);
  } catch (error) {
    console.error('PowerCodex account request failed', error);
    return json(
      { error: 'Hindi available ang account service ngayon. Subukan ulit.' },
      503,
    );
  }
}

export const GET = handler;
export const POST = handler;
