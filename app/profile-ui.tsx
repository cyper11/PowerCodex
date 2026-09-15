'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Compass, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { api } from './client';
import {
  archetypes,
  quizOptions,
  quizQuestions,
  scoreProfile,
} from './data';
import { Eyebrow, PageHead } from './ui';

function needsAccount(message: string): boolean {
  return /sign[ -]in/i.test(message);
}

export function Profile() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [selection, setSelection] = useState('');
  const [result, setResult] = useState<ReturnType<typeof scoreProfile> | null>(null);
  const [quiz, setQuiz] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [sessions, setSessions] = useState(0);

  async function load() {
    setError('');
    setLoading(true);
    try {
      const data = await api<{
        profile: { answers: number[] } | null;
        sessions: number;
      }>('profile');
      if (data.profile) setResult(scoreProfile(data.profile.answers));
      setSessions(data.sessions || 0);
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    api<{
      profile: { answers: number[] } | null;
      sessions: number;
    }>('profile')
      .then(data => {
        if (!active) return;
        if (data.profile) setResult(scoreProfile(data.profile.answers));
        setSessions(data.sessions || 0);
      })
      .catch(caught => {
        if (active) setError((caught as Error).message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function save(nextAnswers: number[]) {
    setSaving(true);
    setStatus('');
    setError('');
    try {
      await api('profile', 'PUT', { answers: nextAnswers });
      setStatus('Naka-save na ang profile.');
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function next() {
    const updated = [...answers, Number(selection)];
    setAnswers(updated);
    setSelection('');
    if (updated.length === 6) {
      const scored = scoreProfile(updated);
      setResult(scored);
      setQuiz(false);
      void save(updated);
    }
  }

  const type = result ? archetypes[result.dominant] : null;

  return (
    <div className="page narrow">
      <PageHead
        kicker="KNOW YOUR APPROACH"
        title="Your Power Profile"
        description="Kilalanin ang tendencies mo at palakasin ang strengths mo."
        action={
          result && !quiz ? (
            <button
              className="button"
              onClick={() => {
                setAnswers([]);
                setSelection('');
                setQuiz(true);
                setStatus('');
              }}
            >
              <RotateCcw size={16} /> Retake reflection
            </button>
          ) : undefined
        }
      />
      {loading ? (
        <p role="status">Kinukuha ang profile mo…</p>
      ) : quiz ? (
        <div className="panel quiz-panel">
          <div className="row spread">
            <span className="eyebrow">A MOMENT OF SELF-REFLECTION</span>
            <span className="note">{answers.length + 1} / 6</span>
          </div>
          <Progress
            value={(answers.length / 6) * 100}
            className="session-progress"
            aria-label="Reflection progress"
          />
          <h2>{quizQuestions[answers.length]}</h2>
          <p>Piliin ang natural mong ginagawa, hindi lang ang magandang pakinggan.</p>
          <RadioGroup
            value={selection}
            onValueChange={setSelection}
            aria-label="Choose your tendency"
            className="choices"
          >
            {quizOptions[answers.length].map((option, index) => (
              <label
                htmlFor={`profile-${index}`}
                key={option}
                className={`choice ${selection === String(index) ? 'chosen' : ''}`}
              >
                <span>{option}</span>
                <RadioGroupItem id={`profile-${index}`} value={String(index)} />
              </label>
            ))}
          </RadioGroup>
          <button
            className="button primary wide"
            disabled={selection === ''}
            onClick={next}
          >
            {answers.length === 5 ? 'Discover your approach' : 'Continue'}
            <ArrowRight size={17} />
          </button>
          <button className="text-link" onClick={() => setQuiz(false)}>Cancel reflection</button>
        </div>
      ) : result && type ? (
        <>
          <div className="profile-grid">
            <div className="profile-card">
              <Image
                src="/roman-thinker-bust.png"
                alt="Classical marble thinker"
                width={640}
                height={900}
              />
              <div>
                <Eyebrow>YOUR CURRENT ARCHETYPE</Eyebrow>
                <h2>{type.name}</h2>
                <p>{type.line}</p>
              </div>
            </div>
            <div className="panel profile-metrics">
              <h3>Patterns ng mga sagot mo</h3>
              {['Strategy', 'Connection', 'Initiative', 'Observation'].map(
                (label, index) => (
                  <div className="metric" key={label}>
                    <div className="row spread">
                      <span>{label}</span>
                      <span className="gold">{result.counts[index]} / 6</span>
                    </div>
                    <Progress
                      value={(result.counts[index] / 6) * 100}
                      aria-label={label}
                    />
                  </div>
                ),
              )}
              <p className="note">
                Bawat sagot ay may katumbas na tendency.
                {result.tied
                  ? ' Tabla ang highest tendencies mo; ang unang lumabas ang ipinapakita bilang starting lens.'
                  : ''}
              </p>
            </div>
          </div>
          <div className="profile-bottom">
            <div className="panel">
              <Eyebrow>STRENGTHS TO BUILD ON</Eyebrow>
              <ul>{type.strengths.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="panel">
              <Eyebrow>WATCH FOR</Eyebrow>
              <ul>{type.weaknesses.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="panel">
              <Eyebrow>ONE SMALL PRACTICE</Eyebrow>
              <p>{type.practice}</p>
              <a className="text-link" href="/simulator">
                Practice a decision <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="row spread profile-reading">
            <div>
              <span className="eyebrow">READ NEXT</span>
              <div className="row">
                {type.laws.map(law => (
                  <a href={`/laws/${law}`} key={law}>
                    Law {law} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
            <span className="note">
              {sessions} practice {sessions === 1 ? 'session' : 'sessions'} completed
            </span>
          </div>
          <p className="note">
            Informal reflection ito base sa anim mong sagot. Hindi ito validated na
            personality o ability assessment.
          </p>
        </>
      ) : (
        <div className="empty profile-empty">
          <Compass size={40} className="gold" />
          <h2>Nagsisimula sa pagkilala sa sarili.</h2>
          <p>
            Anim na tanong tungkol sa paraan mo ng pagplano, pakikisama, pagkilos,
            at pag-observe.<br />Walang tama o maling sagot dito.
          </p>
          <button
            className="button primary"
            onClick={() => {
              setAnswers([]);
              setSelection('');
              setQuiz(true);
            }}
          >
            Discover your approach <ArrowRight size={17} />
          </button>
          <p className="note" style={{ marginTop: 20 }}>
            Mga 2 minuto · Informal na self-reflection
          </p>
        </div>
      )}
      {saving && <p className="note" role="status">Sine-save ang profile…</p>}
      {status && <p className="success" role="status">{status}</p>}
      {error && (
        <div className="error" role="alert">
          {error}{' '}
          <button
            className="button"
            disabled={saving}
            onClick={() => (result ? save(result.answers) : load())}
          >
            Retry
          </button>
          {needsAccount(error) && (
            <a className="button primary" href="/account?returnTo=/profile">Sign in</a>
          )}
        </div>
      )}
    </div>
  );
}
