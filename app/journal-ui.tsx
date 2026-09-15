'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, NotebookPen, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { api } from './client';
import { laws } from './data';
import { Eyebrow, PageHead } from './ui';

type Entry = {
  id: string;
  situation: string;
  lesson: string;
  law: number | null;
  createdAt: string;
};

function needsAccount(message: string): boolean {
  return /sign[ -]in/i.test(message);
}

export function Journal() {
  const [newId, setNewId] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [situation, setSituation] = useState('');
  const [lesson, setLesson] = useState('');
  const [law, setLaw] = useState('none');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setLoadError('');
    try {
      const data = await api<{ entries: Entry[] }>('journal');
      setEntries(data.entries);
    } catch (caught) {
      setLoadError((caught as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setNewId(crypto.randomUUID());
      void load();

      if (new URLSearchParams(location.search).has('new')) {
        try {
          const raw = sessionStorage.getItem('codex-reflection-draft');
          if (raw) {
            const draft = JSON.parse(raw) as {
              situation?: unknown;
              lesson?: unknown;
              law?: unknown;
            };
            setSituation(
              typeof draft.situation === 'string'
                ? draft.situation.slice(0, 3_000)
                : '',
            );
            setLesson(
              typeof draft.lesson === 'string' ? draft.lesson.slice(0, 3_000) : '',
            );
            setLaw(
              Number.isInteger(draft.law) && Number(draft.law) >= 1 && Number(draft.law) <= 48
                ? String(draft.law)
                : 'none',
            );
          }
        } catch {}
        setOpen(true);
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  function create() {
    setNewId(crypto.randomUUID());
    setEditing(null);
    setSituation('');
    setLesson('');
    setLaw('none');
    setError('');
    setOpen(true);
  }

  function edit(entry: Entry) {
    setEditing(entry.id);
    setSituation(entry.situation);
    setLesson(entry.lesson);
    setLaw(entry.law ? String(entry.law) : 'none');
    setError('');
    setOpen(true);
  }

  async function save() {
    if (!situation.trim() || !lesson.trim()) {
      setError('Ilagay ang sitwasyon at kung ano ang natutuhan mo.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const data = await api<{ entry: Entry }>(
        'journal',
        editing ? 'PUT' : 'POST',
        {
          id: editing || newId,
          situation: situation.trim(),
          lesson: lesson.trim(),
          law: law === 'none' ? null : Number(law),
        },
      );
      setEntries(previous =>
        [data.entry, ...previous.filter(entry => entry.id !== data.entry.id)].sort(
          (left, right) => right.createdAt.localeCompare(left.createdAt),
        ),
      );
      setOpen(false);
      setStatus(editing ? 'Na-update na ang entry.' : 'Naka-save na ang reflection.');
      setLoadError('');
      try {
        sessionStorage.removeItem('codex-reflection-draft');
      } catch {}
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!deleting) return;
    setBusy(true);
    setError('');
    try {
      await api('journal', 'DELETE', { id: deleting });
      setEntries(previous => previous.filter(entry => entry.id !== deleting));
      setDeleting(null);
      setStatus('Na-delete na ang entry.');
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function saveDraft() {
    try {
      sessionStorage.setItem(
        'codex-reflection-draft',
        JSON.stringify({
          situation,
          lesson,
          law: law === 'none' ? null : Number(law),
        }),
      );
    } catch {}
  }

  return (
    <div className="page narrow">
      <PageHead
        kicker="REFLECT. LEARN. GROW."
        title="Power Journal"
        description="Experiences mo, lessons mo, at pananaw na patuloy na lumalawak."
        action={
          <button className="button primary" onClick={create}>
            <Plus size={17} /> New entry
          </button>
        }
      />
      {status && <p className="success" role="status">{status}</p>}
      {loading ? (
        <p role="status">Kinukuha ang reflections mo…</p>
      ) : loadError ? (
        <div className="panel stack">
          <p className="error" role="alert">{loadError}</p>
          <button className="button" onClick={load}>Retry loading</button>
          {needsAccount(loadError) && (
            <a className="button primary" href="/account?returnTo=/journal">Sign in</a>
          )}
        </div>
      ) : !entries.length ? (
        <div className="empty journal-empty">
          <NotebookPen size={40} className="gold" />
          <Eyebrow>YOUR FIRST PAGE IS WAITING</Eyebrow>
          <h2>Mas nagiging malinaw ang experience<br />kapag binabalikan mo.</h2>
          <p>
            Magsimula sa sitwasyong tumatak sa iyo.<br />Ano ang nangyari, at ano ang
            babaguhin mo next time?
          </p>
          <button className="button primary" onClick={create}>
            <Plus size={16} /> Isulat ang unang reflection mo
          </button>
        </div>
      ) : (
        <>
          <div className="archive-count">
            {entries.length} {entries.length === 1 ? 'reflection' : 'reflections'}
            <span>A RECORD OF YOUR OWN THINKING</span>
          </div>
          <div className="journal-grid">
            {entries.map(entry => (
              <article className="journal-card panel" key={entry.id}>
                <div className="row spread">
                  <time dateTime={entry.createdAt}>
                    {new Date(entry.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <span className="journal-actions">
                    <button aria-label="Edit entry" onClick={() => edit(entry)}>
                      <Pencil size={16} />
                    </button>
                    <button
                      aria-label="Delete entry"
                      onClick={() => {
                        setError('');
                        setDeleting(entry.id);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </span>
                </div>
                <div className="journal-section">
                  <span className="eyebrow">SITUATION</span>
                  <p>{entry.situation}</p>
                </div>
                <div className="journal-section">
                  <span className="eyebrow">LESSON LEARNED</span>
                  <p>{entry.lesson}</p>
                </div>
                {entry.law && (
                  <a className="journal-law" href={`/laws/${entry.law}`}>
                    <span>Law {entry.law} · {laws[entry.law - 1].title}</span>
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </>
      )}

      <Dialog
        open={open}
        onOpenChange={value => {
          if (!busy) setOpen(value);
        }}
      >
        <DialogContent className="journal-dialog">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit reflection' : 'A new reflection'}</DialogTitle>
            <DialogDescription>
              Isulat ang sitwasyon at ang lesson na gusto mong baunin.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={event => {
              event.preventDefault();
              void save();
            }}
            className="stack"
          >
            <div>
              <label className="form-label" htmlFor="entry-situation">Situation</label>
              <textarea
                id="entry-situation"
                className="field"
                value={situation}
                onChange={event => setSituation(event.target.value)}
                placeholder="Ano ang nangyari?"
                required
                maxLength={3_000}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="entry-lesson">Lesson learned</label>
              <textarea
                id="entry-lesson"
                className="field"
                value={lesson}
                onChange={event => setLesson(event.target.value)}
                placeholder="Ano ang natutuhan mo? Ano ang babaguhin mo?"
                required
                maxLength={3_000}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="entry-law">
                Related law <span className="muted">(optional)</span>
              </label>
              <Select value={law} onValueChange={setLaw}>
                <SelectTrigger id="entry-law" className="w-full h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No related law</SelectItem>
                  {laws.map(item => (
                    <SelectItem value={String(item.id)} key={item.id}>
                      {item.id}. {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && (
              <p className="error" role="alert">
                {error}
                {needsAccount(error) && (
                  <a
                    href="/account?returnTo=/journal%3Fnew%3D1"
                    onClick={saveDraft}
                  >
                    {' '}Sign in
                  </a>
                )}
              </p>
            )}
            <DialogFooter>
              <button
                type="button"
                className="button"
                disabled={busy}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button className="button primary" disabled={busy} type="submit">
                {busy ? 'Saving…' : 'Save reflection'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(deleting)}
        onOpenChange={value => {
          if (!busy && !value) setDeleting(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>I-delete ang reflection na ito?</AlertDialogTitle>
            <AlertDialogDescription>
              Mawawala ang entry sa journal mo. Hindi na ito mare-restore.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && <p className="error" role="alert">{error}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy}>Keep entry</AlertDialogCancel>
            <AlertDialogAction
              disabled={busy}
              onClick={event => {
                event.preventDefault();
                void remove();
              }}
            >
              {busy ? 'Deleting…' : 'Delete entry'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
