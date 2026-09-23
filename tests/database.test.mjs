import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema.ts';
import { GET as authGet, POST as authPost } from '../app/api/auth/[action]/route.ts';
import { GET, POST, PUT, DELETE } from '../app/api/[resource]/route.ts';
import { hashSessionToken } from '../app/auth.ts';
import { scenarios } from '../app/data.ts';

// Test-only in-memory PostgreSQL. The production postgres-js driver is unchanged.
const client = new PGlite();
const database = drizzle(client, { schema });
const origin = 'https://powercodex.test';

before(async () => {
  await migrate(database, { migrationsFolder: './drizzle' });
  // Applying the baseline twice must be safe.
  await migrate(database, { migrationsFolder: './drizzle' });
  globalThis.powerCodexDb = database;
});

after(async () => {
  delete globalThis.powerCodexDb;
  await client.close();
});

async function call(resource, { method = 'GET', cookie, body, query = '', requestOrigin = origin } = {}) {
  const auth = resource.startsWith('auth/');
  const handler = auth ? (method === 'GET' ? authGet : authPost) : { GET, POST, PUT, DELETE }[method];
  const headers = { origin: requestOrigin };
  if (cookie) headers.cookie = cookie;
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const request = new Request(`${origin}/api/${resource}${query}`, {
    method, headers, ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const params = auth ? { action: resource.slice(5) } : { resource };
  const response = await handler(request, { params: Promise.resolve(params) });
  return {
    status: response.status,
    body: await response.json(),
    cookie: response.headers.get('Set-Cookie')?.split(';')[0],
    headers: response.headers,
  };
}

async function register() {
  const email = `${crypto.randomUUID()}@example.test`;
  const result = await call('auth/register', {
    method: 'POST', body: { email, password: 'test-password-123' },
  });
  assert.equal(result.status, 201);
  assert.match(result.headers.get('Set-Cookie'), /HttpOnly; SameSite=Lax;.*Secure/);
  return { ...result, email };
}

test('account registration, password verification, session expiry and signout', async () => {
  const user = await register();
  const [stored] = await database.select().from(schema.accounts)
    .where(eq(schema.accounts.id, user.body.user.userId));
  assert.match(stored.passwordHash, /^pbkdf2-sha256\./);
  assert.notEqual(stored.passwordHash, 'test-password-123');
  const duplicate = await call('auth/register', {
    method: 'POST', body: { email: ` ${user.email.toUpperCase()} `, password: 'test-password-123' },
  });
  assert.equal(duplicate.status, 409);
  assert.equal((await call('auth/signin', {
    method: 'POST', body: { email: user.email, password: 'incorrect-password' },
  })).status, 401);
  const signedIn = await call('auth/signin', {
    method: 'POST', body: { email: user.email, password: 'test-password-123' },
  });
  assert.equal(signedIn.status, 200);
  assert.deepEqual((await call('auth/session', { cookie: signedIn.cookie })).body, user.body);
  const sessionId = await hashSessionToken(signedIn.cookie.split('=')[1]);
  await database.update(schema.sessions).set({ expiresAt: '2000-01-01T00:00:00.000Z' })
    .where(eq(schema.sessions.id, sessionId));
  assert.deepEqual((await call('auth/session', { cookie: signedIn.cookie })).body, { user: null });
  assert.equal((await call('auth/signout', { method: 'POST', cookie: user.cookie })).status, 200);
  assert.deepEqual((await call('auth/session', { cookie: user.cookie })).body, { user: null });
  assert.equal((await call('journal')).status, 401);
  assert.equal((await call('auth/register', { method: 'POST', body: null })).status, 400);
});

test('journal CRUD keeps response formats, idempotency, and owner isolation', async () => {
  const a = await register();
  const b = await register();
  const entry = { id: crypto.randomUUID(), situation: 'A situation', lesson: 'A lesson', law: null };
  const created = await call('journal', { method: 'POST', cookie: a.cookie, body: entry });
  assert.equal(created.status, 200);
  assert.deepEqual(Object.keys(created.body.entry).sort(), ['createdAt', 'id', 'law', 'lesson', 'situation']);
  assert.equal((await call('journal', { method: 'POST', cookie: a.cookie, body: entry })).body.entry.createdAt,
    created.body.entry.createdAt);
  assert.deepEqual((await call('journal', { cookie: b.cookie })).body, { entries: [] });
  assert.equal((await call('journal', { method: 'PUT', cookie: b.cookie, body: entry })).status, 404);
  assert.equal((await call('journal', { method: 'DELETE', cookie: b.cookie, body: { id: entry.id } })).status, 404);
  const edited = await call('journal', {
    method: 'PUT', cookie: a.cookie, body: { ...entry, lesson: 'Updated', law: 12 },
  });
  assert.equal(edited.body.entry.lesson, 'Updated');
  assert.equal(edited.body.entry.createdAt, created.body.entry.createdAt);
  assert.equal((await call('journal', { cookie: a.cookie })).body.entries.length, 1);
  assert.equal((await call('journal', { method: 'DELETE', cookie: a.cookie, body: { id: entry.id } })).status, 200);
  assert.deepEqual((await call('journal', { cookie: a.cookie })).body, { entries: [] });
});

test('notes, profiles, attempts, and export retain their contracts and owner scopes', async () => {
  const a = await register();
  const b = await register();
  assert.deepEqual((await call('notes', { cookie: a.cookie, query: '?law=1' })).body, { note: null });
  for (const body of ['first', 'updated']) {
    assert.equal((await call('notes', { method: 'PUT', cookie: a.cookie, body: { law: 1, body } })).status, 200);
  }
  assert.equal((await call('notes', { cookie: a.cookie, query: '?law=1' })).body.note.body, 'updated');
  assert.deepEqual((await call('notes', { cookie: b.cookie, query: '?law=1' })).body, { note: null });
  const profileAnswers = [0, 1, 2, 3, 0, 1];
  assert.equal((await call('profile', { method: 'PUT', cookie: a.cookie, body: { answers: profileAnswers } })).status, 200);
  assert.equal((await call('profile', { method: 'PUT', cookie: a.cookie, body: { answers: [1] } })).status, 400);
  const answers = scenarios.slice(0, 5).map(scenario => ({ id: scenario.id, choice: 0 }));
  const attempt = { id: crypto.randomUUID(), answers };
  const expectedScore = scenarios.slice(0, 5).reduce((score, scenario) => score + scenario.choices[0][1], 0);
  for (let retry = 0; retry < 2; retry++) {
    const result = await call('attempts', { method: 'POST', cookie: a.cookie, body: attempt });
    assert.deepEqual(result.body, { ok: true, score: expectedScore });
  }
  assert.equal((await call('attempts', {
    method: 'POST', cookie: a.cookie, body: { ...attempt, answers: Array(5).fill(answers[0]) },
  })).status, 400);
  assert.deepEqual((await call('profile', { cookie: a.cookie })).body,
    { profile: { answers: profileAnswers }, sessions: 1 });
  assert.deepEqual((await call('profile', { cookie: b.cookie })).body, { profile: null, sessions: 0 });
  const exported = await call('export', { cookie: a.cookie });
  assert.equal(exported.status, 200);
  assert.equal(exported.body.notes.length, 1);
  assert.equal(exported.body.practice.length, 1);
  assert.equal(exported.body.profile.length, 1);
  assert.ok(exported.body.notes[0].updated_at);
  assert.ok(exported.body.practice[0].created_at);
  assert.equal(exported.body.practice[0].answers, JSON.stringify(answers));
  const otherExport = (await call('export', { cookie: b.cookie })).body;
  for (const key of ['journal', 'notes', 'profile', 'practice']) assert.deepEqual(otherExport[key], []);
  assert.equal((await call('notes', {
    method: 'PUT', cookie: a.cookie, requestOrigin: 'https://other.test', body: { law: 1, body: 'blocked' },
  })).status, 403);
});
