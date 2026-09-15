import { getPowerCodexUser } from '../../auth';
import { db } from '@/db/raw';
import { attempts, journal, notes, profiles } from '@/db/schema';
import { and, count, desc, eq } from 'drizzle-orm';
import { scenarios, scoreProfile } from '../../data';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const journalFields = {
  id: journal.id, situation: journal.situation, lesson: journal.lesson,
  law: journal.law, createdAt: journal.createdAt,
};

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
            .delete(journal)
            .where(and(eq(journal.id, entryId), eq(journal.owner, owner)))
            .returning({ id: journal.id });
          if (!deleted.length) {
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
          const [existing] = await db().select(journalFields).from(journal)
            .where(and(eq(journal.id, entryId), eq(journal.owner, owner))).limit(1);
          if (existing) return json({ entry: existing });
          await db().insert(journal).values({
            id: entryId, owner, situation, lesson, law, createdAt: now,
          });
        } else {
          const result = await db()
            .update(journal).set({ situation, lesson, law })
            .where(and(eq(journal.id, entryId), eq(journal.owner, owner)))
            .returning({ id: journal.id });
          if (!result.length) {
            return json({ error: 'Hindi nahanap ang entry na iyon.' }, 404);
          }
        }

        const [entry] = await db().select(journalFields).from(journal)
          .where(and(eq(journal.id, entryId), eq(journal.owner, owner))).limit(1);
        return json({ entry: entry ?? null });
      }

      if (resource === 'notes' && method === 'PUT') {
        const law = lawId(data.law);
        if (typeof data.body !== 'string' || data.body.length > 5_000) {
          throw new InputError('Hanggang 5,000 characters lang ang notes.');
        }
        const updatedAt = new Date().toISOString();
        await db().insert(notes).values({ owner, law, body: data.body, updatedAt })
          .onConflictDoUpdate({
            target: [notes.owner, notes.law], set: { body: data.body, updatedAt },
          });
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
        const answers = JSON.stringify(data.answers);
        const updatedAt = new Date().toISOString();
        await db().insert(profiles).values({ owner, answers, updatedAt })
          .onConflictDoUpdate({ target: profiles.owner, set: { answers, updatedAt } });
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

        await db().insert(attempts).values({
          id: attempt, owner, answers: JSON.stringify(data.answers), score,
          createdAt: new Date().toISOString(),
        }).onConflictDoNothing({ target: attempts.id });
        return json({ ok: true, score });
      }

      return json({ error: 'Not found.' }, 404);
    }

    if (resource === 'journal') {
      const entries = await db().select(journalFields).from(journal)
        .where(eq(journal.owner, owner)).orderBy(desc(journal.createdAt));
      return json({ entries });
    }

    if (resource === 'notes') {
      const law = lawId(Number(url.searchParams.get('law')));
      const [note] = await db().select({ body: notes.body, updatedAt: notes.updatedAt })
        .from(notes).where(and(eq(notes.owner, owner), eq(notes.law, law))).limit(1);
      return json({ note: note ?? null });
    }

    if (resource === 'profile') {
      const [profile] = await db().select({ answers: profiles.answers }).from(profiles)
        .where(eq(profiles.owner, owner)).limit(1);
      const [practiceCount] = await db().select({ total: count() }).from(attempts)
        .where(eq(attempts.owner, owner));
      return json({
        profile: profile ? { answers: JSON.parse(profile.answers) } : null,
        sessions: practiceCount?.total || 0,
      });
    }

    if (resource === 'export') {
      // Keep the export's original snake_case keys and a consistent read snapshot.
      const result = await db().transaction(async transaction => {
        const journalRows = await transaction.select({
          id: journal.id, situation: journal.situation, lesson: journal.lesson,
          law: journal.law, created_at: journal.createdAt,
        }).from(journal).where(eq(journal.owner, owner));
        const noteRows = await transaction.select({
          law: notes.law, body: notes.body, updated_at: notes.updatedAt,
        }).from(notes).where(eq(notes.owner, owner));
        const profileRows = await transaction.select({
          answers: profiles.answers, updated_at: profiles.updatedAt,
        }).from(profiles).where(eq(profiles.owner, owner));
        const practiceRows = await transaction.select({
          answers: attempts.answers, score: attempts.score, created_at: attempts.createdAt,
        }).from(attempts).where(eq(attempts.owner, owner));
        return { journal: journalRows, notes: noteRows, profile: profileRows, practice: practiceRows };
      }, { isolationLevel: 'repeatable read', accessMode: 'read only' });
      return json({
        exportedAt: new Date().toISOString(),
        ...result,
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
