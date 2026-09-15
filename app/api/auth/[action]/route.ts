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
import { accounts, sessions } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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
        await db().delete(sessions)
          .where(eq(sessions.id, await hashSessionToken(token)));
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
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
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
      const owner = crypto.randomUUID();
      const token = createSessionToken();
      const now = new Date().toISOString();
      const passwordHash = await hashPassword(password);
      const sessionId = await hashSessionToken(token);
      const created = await db().transaction(async transaction => {
        const [account] = await transaction.insert(accounts)
          .values({ id: owner, email, passwordHash, createdAt: now })
          .onConflictDoNothing({ target: accounts.email })
          .returning({ id: accounts.id });
        if (!account) return false;
        await transaction.insert(sessions).values({
          id: sessionId, owner, expiresAt: sessionExpiry(), createdAt: now,
        });
        return true;
      });
      if (!created) {
        return json({ error: 'May PowerCodex account na para sa email na ito.' }, 409);
      }

      return json(
        { user: { userId: owner, email } },
        201,
        { 'Set-Cookie': sessionCookie(token, request) },
      );
    }

    if (action === 'signin') {
      const [account] = await db().select({
        id: accounts.id, email: accounts.email, passwordHash: accounts.passwordHash,
      }).from(accounts).where(eq(accounts.email, email)).limit(1);
      if (!account || !(await verifyPassword(password, account.passwordHash))) {
        return json({ error: 'Mali ang email o password.' }, 401);
      }

      const token = createSessionToken();
      const now = new Date().toISOString();
      await db().insert(sessions).values({
        id: await hashSessionToken(token), owner: account.id,
        expiresAt: sessionExpiry(), createdAt: now,
      });

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
