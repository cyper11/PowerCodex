'use client';
/* eslint-disable @next/next/no-html-link-for-pages -- Native links avoid the current vinext client navigation/prefetch runtime failure. */

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Bookmark, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from './client';
import { type Law } from './data';
import { Eyebrow } from './ui';

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
