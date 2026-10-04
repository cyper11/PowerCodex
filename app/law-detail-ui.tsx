'use client';
/* eslint-disable @next/next/no-location-assign-relative-destination -- Preserve full-page navigation, matching the rest of the app. */
/* eslint-disable @next/next/no-html-link-for-pages -- Preserve the existing full-page navigation behavior. */

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCheck,
  Link2,
  Shuffle,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from './client';
import { type Law } from './data';
import { Eyebrow } from './ui';
import { copyText, markRead, randomLaw, toggleSaved, useProgress } from './progress';

function needsAccount(message: string): boolean {
  return /sign[ -]in/i.test(message);
}

export function LawDetail({ law }: { law: Law }) {
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [shared, setShared] = useState('');
  const progress = useProgress();
  const isSaved = progress.saved.includes(law.id);
  const isRead = progress.read.includes(law.id);

  useEffect(() => {
    markRead(law.id, true);
  }, [law.id]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName || '') || target?.isContentEditable) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === 'ArrowLeft' && law.id > 1) window.location.assign(`/laws/${law.id - 1}`);
      if (event.key === 'ArrowRight' && law.id < 48) window.location.assign(`/laws/${law.id + 1}`);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [law.id]);

  async function share() {
    const url = window.location.href;
    const title = `Law ${law.id}: ${law.title}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, text: law.summary, url });
        return;
      } catch (caught) {
        if ((caught as Error).name === 'AbortError') return;
      }
    }
    setShared((await copyText(`${title}\n${url}`)) ? 'Nakopya ang link.' : 'Hindi ma-copy ang link.');
    window.setTimeout(() => setShared(''), 2_500);
  }

  const load = useCallback(async () => {
    setError('');
    setReady(false);
    try {
      const data = await api<{ note: { body: string } | null }>(`notes?law=${law.id}`);
      setNote(data.note?.body || '');
      setReady(true);
    } catch (caught) {
      setError((caught as Error).message);
    }
  }, [law.id]);

  useEffect(() => {
    const timeout = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timeout);
  }, [load]);

  async function save() {
    setBusy(true);
    setStatus('');
    setError('');
    try {
      await api('notes', 'PUT', { law: law.id, body: note });
      setSaved(true);
      setStatus('Naka-save na ang note sa account mo.');
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page narrow">
      <a className="back" href="/laws"><ArrowLeft size={16} /> Balik sa lahat ng laws</a>
      <div className="law-intro">
        <div>
          <Eyebrow>LAW {String(law.id).padStart(2, '0')} / 48</Eyebrow>
          <h1>{law.title}</h1>
          <span className="badge">{law.category}</span>
          <div className="law-actions">
            <button
              className={isSaved ? 'chip-button on' : 'chip-button'}
              aria-pressed={isSaved}
              onClick={() => toggleSaved(law.id)}
            >
              {isSaved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
              {isSaved ? 'Saved' : 'Save law'}
            </button>
            <button
              className={isRead ? 'chip-button on' : 'chip-button'}
              aria-pressed={isRead}
              onClick={() => markRead(law.id, !isRead)}
            >
              <CheckCheck size={15} />
              {isRead ? 'Nabasa na' : 'Mark as read'}
            </button>
            <button className="chip-button" onClick={share}>
              <Link2 size={15} /> Share
            </button>
            <button
              className="chip-button"
              onClick={() => window.location.assign(`/laws/${randomLaw(law.id)}`)}
            >
              <Shuffle size={15} /> Random
            </button>
          </div>
          {shared && <p className="success" role="status">{shared}</p>}
          <div className="principle">
            <span className="eyebrow">CORE PRINCIPLE</span>
            <p>{law.summary}</p>
          </div>
        </div>
        <Image
          src="/roman-thinker-bust.png"
          alt="Classical marble thinker"
          width={900}
          height={1_000}
        />
      </div>
      <Tabs defaultValue="overview" className="law-tabs">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="example">Example</TabsTrigger>
          <TabsTrigger value="apply">When to apply</TabsTrigger>
          <TabsTrigger value="notes">My notes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="detail-content">
            <h2>Mula sa idea, papunta sa judgment</h2>
            <p>{law.application}</p>
            <div className="consideration">
              <span className="eyebrow">THE OTHER SIDE</span>
              <p>{law.caution}</p>
            </div>
            <p className="note">
              Source: Robert Greene, <i>The 48 Laws of Power</i>, Law {law.id}.
              Original commentary ang paliwanag na ito; hindi ito direct quote mula
              sa libro.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="example">
          <div className="detail-content">
            <span className="eyebrow">AN ORIGINAL MODERN SCENARIO</span>
            <h2>Ganito ito puwedeng mangyari</h2>
            <p>{law.example}</p>
            <div className="consideration">
              <p>
                Tingnan ang incentives, ang relationship, at ang posibleng kapalit
                ng next move. {law.caution}
              </p>
            </div>
            <a className="text-link" href="/simulator">
              Practice a decision <ArrowRight size={17} />
            </a>
          </div>
        </TabsContent>
        <TabsContent value="apply">
          <div className="detail-content">
            <h2>I-apply nang may context</h2>
            <p>{law.application}</p>
            <div className="consideration">
              <span className="eyebrow">BEFORE YOU ACT</span>
              <p>{law.caution}</p>
            </div>
            <h3>Balikan ang sitwasyon mo</h3>
            <p>
              Anong outcome ang mahalaga rito? Anong impormasyon ang kulang? Ano ang
              puwedeng magpabago sa napili mong approach?
            </p>
            <a className="text-link" href="/analyzer">
              Explore a situation <ArrowRight size={17} />
            </a>
          </div>
        </TabsContent>
        <TabsContent value="notes">
          <div className="detail-content">
            <h2>Pananaw mo sa Law {law.id}</h2>
            <p>Isulat ang observation, tanong, o sitwasyong gusto mong balikan.</p>
            <label className="form-label" htmlFor="law-note">Personal note</label>
            <textarea
              id="law-note"
              className="field"
              maxLength={5_000}
              disabled={!ready}
              value={note}
              onChange={event => {
                setNote(event.target.value);
                setSaved(false);
                setStatus('');
              }}
              placeholder={
                ready
                  ? 'Anong experience o idea ang naaalala mo sa law na ito?'
                  : 'Kinukuha ang note mo…'
              }
            />
            <div className="row spread" style={{ marginTop: 14 }}>
              <span className="note">{note.length}/5,000</span>
              <button className="button primary" disabled={!ready || busy} onClick={save}>
                {saved ? <Check size={16} /> : <Bookmark size={16} />}
                {busy ? 'Saving…' : 'Save note'}
              </button>
            </div>
            {error && (
              <div role="alert" className="error">
                {error}{' '}
                {!ready && <button onClick={load}>Retry loading</button>}
                {needsAccount(error) && (
                  <a href={`/account?returnTo=/laws/${law.id}`}> Sign in</a>
                )}
              </div>
            )}
            {status && <p role="status" className="success">{status}</p>}
          </div>
        </TabsContent>
      </Tabs>
      <p className="note keyboard-tip">
        Tip: gamitin ang <kbd className="kbd-hint">←</kbd> <kbd className="kbd-hint">→</kbd> para lumipat ng law.
      </p>
      <div className="law-pagination">
        {law.id > 1 ? (
          <a href={`/laws/${law.id - 1}`}>
            <ArrowLeft size={16} /> Law {String(law.id - 1).padStart(2, '0')}
          </a>
        ) : <span />}
        {law.id < 48 ? (
          <a href={`/laws/${law.id + 1}`}>
            Law {String(law.id + 1).padStart(2, '0')} <ArrowRight size={16} />
          </a>
        ) : (
          <a href="/laws">Return to archive <ArrowRight size={16} /></a>
        )}
      </div>
    </div>
  );
}
