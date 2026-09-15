import { getPowerCodexUser } from '../../auth';
import { db } from '@/db/raw';
import { scenarios, scoreProfile } from '../../data';

export const dynamic = 'force-dynamic';

const json = (data: unknown, status = 200) =>
  Response.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });

class InputError extends Error {}

function string(value: unknown, max: number) {
  if (typeof value !== 'string' || !value.trim() || value.length > max) {
    throw new InputError('Maglagay ng valid na text na pasok sa allowed length.');
  }
  return value.trim();
}

function lawId(value: unknown) {
  if (!Number.isInteger(value) || Number(value) < 1 || Number(value) > 48) {
    throw new InputError('Pumili ng valid na law.');
  }
  return Number(value);
}

function id(value: unknown) {
  if (typeof value !== 'string' || !/^[0-9a-f-]{36}$/i.test(value)) {
    throw new InputError('Invalid entry identifier.');
  }
  return value;
}

async function handler(
  request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  try {
    const user = await getPowerCodexUser(request);
    if (!user) {
      return json(
        { error: 'Mag-sign in sa PowerCodex para makita o ma-save ang personal mong data.' },
        401,
      );
    }

    const owner = user.userId;
    const { resource } = await context.params;
    const url = new URL(request.url);
    const method = request.method;

    if (method !== 'GET') {
      const origin = request.headers.get('origin');
      if (origin && origin !== url.origin) {
        return json({ error: 'Request origin is not allowed.' }, 403);
      }

      const raw = await request.text();
      if (raw.length > 20_000) {
        return json({ error: 'Masyadong mahaba ang entry.' }, 413);
      }

      let data: Record<string, unknown>;
      try {
        data = JSON.parse(raw) as Record<string, unknown>;
      } catch {
        return json({ error: 'Invalid request.' }, 400);
      }
      if (!data || typeof data !== 'object') {
        return json({ error: 'Invalid request.' }, 400);
      }

      if (resource === 'journal') {
        if (method === 'DELETE') {
          const entryId = id(data.id);
          const deleted = await db()
            .prepare('DELETE FROM journal WHERE id=? AND owner=?')
            .bind(entryId, owner)
            .run();
          if (!deleted.meta.changes) {
            return json({ error: 'Hindi nahanap ang entry na iyon.' }, 404);
          }
          return json({ ok: true });
        }

        if (method !== 'POST' && method !== 'PUT') {
          return json({ error: 'Method not allowed.' }, 405);
        }
        const entryId = id(data.id);
        const situation = string(data.situation, 3_000);
        const lesson = string(data.lesson, 3_000);
        const law = data.law === null ? null : lawId(data.law);
        const now = new Date().toISOString();

        if (method === 'POST') {
          const existing = await db()
            .prepare(
              'SELECT id, situation, lesson, law, created_at AS createdAt FROM journal WHERE id=? AND owner=?',
            )
            .bind(entryId, owner)
            .first();
          if (existing) return json({ entry: existing });
          await db()
            .prepare(
              'INSERT INTO journal (id,owner,situation,lesson,law,created_at) VALUES (?,?,?,?,?,?)',
            )
            .bind(entryId, owner, situation, lesson, law, now)
            .run();
        } else {
          const result = await db()
            .prepare(
              'UPDATE journal SET situation=?,lesson=?,law=? WHERE id=? AND owner=?',
            )
            .bind(situation, lesson, law, entryId, owner)
            .run();
          if (!result.meta.changes) {
            return json({ error: 'Hindi nahanap ang entry na iyon.' }, 404);
          }
        }

        const entry = await db()
          .prepare(
            'SELECT id, situation, lesson, law, created_at AS createdAt FROM journal WHERE id=? AND owner=?',
          )
          .bind(entryId, owner)
          .first();
        return json({ entry });
      }

      if (resource === 'notes' && method === 'PUT') {
        const law = lawId(data.law);
        if (typeof data.body !== 'string' || data.body.length > 5_000) {
          throw new InputError('Hanggang 5,000 characters lang ang notes.');
        }
        await db()
          .prepare(
            'INSERT INTO notes (owner,law,body,updated_at) VALUES (?,?,?,?) ON CONFLICT(owner,law) DO UPDATE SET body=excluded.body,updated_at=excluded.updated_at',
          )
          .bind(owner, law, data.body, new Date().toISOString())
          .run();
        return json({ ok: true });
      }

      if (resource === 'profile' && method === 'PUT') {
        if (
          !Array.isArray(data.answers) ||
          data.answers.length !== 6 ||
          data.answers.some(
            (value: unknown) =>
              !Number.isInteger(value) || Number(value) < 0 || Number(value) > 3,
          )
        ) {
          throw new InputError('Sagutin ang lahat ng anim na reflection questions.');
        }
        await db()
          .prepare(
            'INSERT INTO profiles (owner,answers,updated_at) VALUES (?,?,?) ON CONFLICT(owner) DO UPDATE SET answers=excluded.answers,updated_at=excluded.updated_at',
          )
          .bind(owner, JSON.stringify(data.answers), new Date().toISOString())
          .run();
        return json({ profile: scoreProfile(data.answers) });
      }

      if (resource === 'attempts' && method === 'POST') {
        const attempt = id(data.id);
        if (!Array.isArray(data.answers) || data.answers.length !== 5) {
          throw new InputError('Tapusin ang lahat ng limang scenarios.');
        }

        const ids = new Set<number>();
        let score = 0;
        for (const answer of data.answers) {
          const item = answer as Record<string, unknown> | null;
          if (
            !item ||
            typeof item.id !== 'number' ||
            typeof item.choice !== 'number' ||
            !Number.isInteger(item.id) ||
            !Number.isInteger(item.choice) ||
            item.choice < 0 ||
            item.choice > 2 ||
            ids.has(item.id)
          ) {
            throw new InputError('Invalid scenario answers.');
          }
          const scenario = scenarios.find(scenario => scenario.id === item.id);
          if (!scenario) throw new InputError('Invalid scenario.');
          ids.add(item.id);
          score += scenario.choices[item.choice][1];
        }

        await db()
          .prepare(
            'INSERT INTO attempts (id,owner,answers,score,created_at) VALUES (?,?,?,?,?) ON CONFLICT(id) DO NOTHING',
          )
          .bind(
            attempt,
            owner,
            JSON.stringify(data.answers),
            score,
            new Date().toISOString(),
          )
          .run();
        return json({ ok: true, score });
      }

      return json({ error: 'Not found.' }, 404);
    }

    if (resource === 'journal') {
      const { results } = await db()
        .prepare(
          'SELECT id,situation,lesson,law,created_at AS createdAt FROM journal WHERE owner=? ORDER BY created_at DESC',
        )
        .bind(owner)
        .all();
      return json({ entries: results });
    }

    if (resource === 'notes') {
      const law = lawId(Number(url.searchParams.get('law')));
      const note = await db()
        .prepare(
          'SELECT body,updated_at AS updatedAt FROM notes WHERE owner=? AND law=?',
        )
        .bind(owner, law)
        .first();
      return json({ note });
    }

    if (resource === 'profile') {
      const profile = await db()
        .prepare('SELECT answers FROM profiles WHERE owner=?')
        .bind(owner)
        .first<{ answers: string }>();
      const count = await db()
        .prepare('SELECT count(*) AS total FROM attempts WHERE owner=?')
        .bind(owner)
        .first<{ total: number }>();
      return json({
        profile: profile ? { answers: JSON.parse(profile.answers) } : null,
        sessions: count?.total || 0,
      });
    }

    if (resource === 'export') {
      const result = await db().batch([
        db()
          .prepare(
            'SELECT id,situation,lesson,law,created_at FROM journal WHERE owner=?',
          )
          .bind(owner),
        db()
          .prepare('SELECT law,body,updated_at FROM notes WHERE owner=?')
          .bind(owner),
        db()
          .prepare('SELECT answers,updated_at FROM profiles WHERE owner=?')
          .bind(owner),
        db()
          .prepare('SELECT answers,score,created_at FROM attempts WHERE owner=?')
          .bind(owner),
      ]);
      return json({
        exportedAt: new Date().toISOString(),
        journal: result[0].results,
        notes: result[1].results,
        profile: result[2].results,
        practice: result[3].results,
      });
    }

    return json({ error: 'Not found.' }, 404);
  } catch (error) {
    if (error instanceof InputError) return json({ error: error.message }, 400);
    console.error('PowerCodex data request failed', error);
    return json(
      {
        error:
          'Hindi available ang saved data ngayon. Nandito pa ang input mo; subukan ulit.',
      },
      503,
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
