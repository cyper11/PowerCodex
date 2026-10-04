'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Download, Keyboard, Lock, RotateCcw, Sun, TrendingUp } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { api } from './client';
import { Eyebrow, PageHead } from './ui';
import { resetProgress, useProgress } from './progress';

function needsAccount(message: string): boolean {
  return /sign[ -]in/i.test(message);
}

export function SettingsPage() {
  const [large, setLarge] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const progress = useProgress();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        setLarge(localStorage.getItem('codex-large-text') === 'true');
      } catch {}
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  function resize(value: boolean) {
    setLarge(value);
    document.documentElement.classList.toggle('large-text', value);
    try {
      localStorage.setItem('codex-large-text', String(value));
    } catch {
      setError(
        'Applied na ngayon ang preference, pero hindi ito na-save ng browser.',
      );
    }
  }

  async function download() {
    setBusy(true);
    setError('');
    try {
      const data = await api('export');
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'power-codex-journal.json';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1_000);
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page narrow">
      <PageHead
        kicker="MAKE IT YOUR OWN"
        title="Settings & About"
        description="Isang space para sa mas maingat na pagkatuto at reflection."
      />
      <div className="settings-layout">
        <div className="stack">
          <section className="panel">
            <div className="settings-title">
              <Sun size={20} />
              <h2>Appearance</h2>
            </div>
            <div className="row spread">
              <div>
                <label className="form-label" htmlFor="larger-text">
                  Larger reading text
                </label>
                <p className="note">Mas malaking text para mas madaling basahin.</p>
              </div>
              <Switch id="larger-text" checked={large} onCheckedChange={resize} />
            </div>
          </section>
          <section className="panel">
            <div className="settings-title">
              <TrendingUp size={20} />
              <h2>Reading progress</h2>
            </div>
            <div className="stat-row">
              <div><strong>{progress.read.length}</strong><span>nabasang laws</span></div>
              <div><strong>{progress.saved.length}</strong><span>saved laws</span></div>
              <div><strong>{48 - progress.read.length}</strong><span>natitira</span></div>
            </div>
            <p className="note">Naka-save lang ito sa browser na ito; hindi kailangan ng account.</p>
            <div className="row wrap" style={{ marginTop: 16 }}>
              <Link className="button" href="/laws?view=saved">Tingnan ang saved</Link>
              {confirmReset ? (
                <>
                  <button
                    className="button danger"
                    onClick={() => {
                      resetProgress();
                      setConfirmReset(false);
                    }}
                  >
                    Oo, i-reset
                  </button>
                  <button className="button" onClick={() => setConfirmReset(false)}>Cancel</button>
                </>
              ) : (
                <button
                  className="button"
                  disabled={!progress.read.length && !progress.saved.length}
                  onClick={() => setConfirmReset(true)}
                >
                  <RotateCcw size={16} /> Reset progress
                </button>
              )}
            </div>
          </section>
          <section className="panel">
            <div className="settings-title">
              <Keyboard size={20} />
              <h2>Keyboard shortcuts</h2>
            </div>
            <dl className="shortcuts">
              <div><dt><kbd className="kbd-hint">/</kbd></dt><dd>Search laws</dd></div>
              <div><dt><kbd className="kbd-hint">←</kbd> <kbd className="kbd-hint">→</kbd></dt><dd>Previous / next law</dd></div>
              <div><dt><kbd className="kbd-hint">A</kbd> <kbd className="kbd-hint">B</kbd> <kbd className="kbd-hint">C</kbd></dt><dd>Pumili sa simulator</dd></div>
              <div><dt><kbd className="kbd-hint">Ctrl</kbd> + <kbd className="kbd-hint">Enter</kbd></dt><dd>I-analyze o i-save ang reflection</dd></div>
              <div><dt><kbd className="kbd-hint">Esc</kbd></dt><dd>Isara ang menu o i-clear ang search</dd></div>
            </dl>
          </section>
          <section className="panel">
            <div className="settings-title">
              <Lock size={20} />
              <h2>Your data</h2>
            </div>
            <p>
              Naka-save sa sarili mong PowerCodex account ang journal, law notes,
              practice sessions, at profile.
            </p>
            <div className="divider" />
            <div className="row spread settings-export">
              <p className="note">Mag-download ng kopya ng reflections at progress mo.</p>
              <button className="button" onClick={download} disabled={busy}>
                <Download size={16} />
                {busy ? 'Preparing…' : 'Export my data'}
              </button>
            </div>
            {error && (
              <p className="error" role="alert">
                {error}
                {needsAccount(error) && (
                  <a href="/account?returnTo=/settings"> Sign in</a>
                )}
              </p>
            )}
          </section>
        </div>
        <section className="panel about-panel">
          <BookOpen size={26} className="gold" />
          <Eyebrow>ABOUT THE POWER CODEX</Eyebrow>
          <h2>Knowledge.<br />Judgment.<br /><em>Perspective.</em></h2>
          <p>
            Isang independent na personal project na inspired sa{' '}
            <i>The 48 Laws of Power</i> by Robert Greene.
          </p>
          <p>
            Sinusunod ng law titles ang libro. Original commentary ang Taglish
            summaries, modern examples, at {30} varied simulation scenarios na base
            sa supplied edition.
          </p>
          <p>
            Theme matching ang gamit ng analyzer para mag-suggest ng babasahin.
            Maikling self-reflection ang profile; hindi ito scientific assessment.
          </p>
          <p className="note">
            Hindi affiliated kay Robert Greene o sa publisher. Nasa libro ang buong
            arguments at historical accounts.
          </p>
        </section>
      </div>
    </div>
  );
}
