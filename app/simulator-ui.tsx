'use client';
/* eslint-disable @next/next/no-location-assign-relative-destination -- Preserve browser navigation to the journal draft. */

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  NotebookPen,
  RotateCcw,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { api, stageReflection } from './client';
import { laws, scenarios, type Scenario } from './data';
import { Eyebrow, PageHead } from './ui';

const SESSION_SIZE = 5;

function pickScenarios(exclude: number[] = []): Scenario[] {
  const fresh = scenarios.filter(scenario => !exclude.includes(scenario.id));
  const pool = fresh.length >= SESSION_SIZE ? fresh : scenarios;
  const shuffled = [...pool];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled.slice(0, SESSION_SIZE);
}

function needsAccount(message: string): boolean {
  return /sign[ -]in/i.test(message);
}

export function Simulator() {
  const [session, setSession] = useState<Scenario[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [answers, setAnswers] = useState<{ id: number; choice: number }[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [complete, setComplete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [attemptId, setAttemptId] = useState('');

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSession(pickScenarios());
      setAttemptId(crypto.randomUUID());
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const current = session[index];
  const choice =
    current && selected !== '' ? current.choices[Number(selected)] : null;
  const total = answers.reduce((score, answer) => {
    const scenario = scenarios.find(item => item.id === answer.id);
    return score + (scenario?.choices[answer.choice][1] ?? 0);
  }, 0);
  const strongChoices = answers.filter(answer => {
    const scenario = scenarios.find(item => item.id === answer.id);
    return scenario?.choices[answer.choice][1] === 2;
  }).length;

  async function persist(list = answers) {
    setSaving(true);
    setError('');
    try {
      await api('attempts', 'POST', { id: attemptId, answers: list });
      setStatus('Naka-save na ang practice session.');
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function reveal() {
    if (!choice || !current) return;
    setAnswers(previous => [
      ...previous,
      { id: current.id, choice: Number(selected) },
    ]);
    setRevealed(true);
  }

  function next() {
    window.scrollTo(0, 0);
    if (index === session.length - 1) {
      setComplete(true);
      void persist();
    } else {
      setIndex(previous => previous + 1);
      setSelected('');
      setRevealed(false);
    }
  }

  function restart(useNewMix: boolean) {
    window.scrollTo(0, 0);
    if (useNewMix) setSession(pickScenarios(session.map(item => item.id)));
    setIndex(0);
    setSelected('');
    setAnswers([]);
    setRevealed(false);
    setComplete(false);
    setStatus('');
    setError('');
    setAttemptId(crypto.randomUUID());
  }

  if (!current) {
    return (
      <div className="page narrow">
        <PageHead
          kicker="HASAIN ANG JUDGMENT MO"
          title="Situation Simulator"
          description="May epekto ang bawat choice. Mag-isip muna bago kumilos."
        />
        <div className="panel" role="status">Naghahanda ng bagong scenario mix…</div>
      </div>
    );
  }

  return (
    <div className="page narrow">
      <PageHead
        kicker="HASAIN ANG JUDGMENT MO"
        title="Situation Simulator"
        description="May epekto ang bawat choice. Mag-isip muna bago kumilos."
      />
      {complete ? (
        <section className="session-results">
          <div className="panel result-summary">
            <CheckCircle2 size={35} className="gold" />
            <Eyebrow>TAPOS NA ANG SESSION</Eyebrow>
            <h2>May lima kang bagong perspectives.</h2>
            <p>
              {total}/{SESSION_SIZE * 2} practice points · {strongChoices} strong choices
            </p>
            <p className="note">
              Practice score lang ito para sa mga scenario; hindi sukatan ng actual mong ability.
            </p>
            <div className="row result-actions">
              <button className="button primary" onClick={() => restart(true)}>
                New random five <ArrowRight size={17} />
              </button>
              <button className="button" onClick={() => restart(false)}>
                <RotateCcw size={16} /> Repeat this mix
              </button>
            </div>
            {saving && <p role="status" className="note">Sine-save ang session…</p>}
            {status && <p role="status" className="success">{status}</p>}
            {error && (
              <div role="alert" className="error">
                {error}{' '}
                <button className="button" onClick={() => persist()} disabled={saving}>
                  Retry saving
                </button>
                {needsAccount(error) && (
                  <a className="button primary" href="/account?returnTo=/simulator">
                    Sign in
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="session-review">
            <h2>Baunin ang lesson</h2>
            {answers.map(answer => {
              const scenario = scenarios.find(item => item.id === answer.id)!;
              return (
                <a key={answer.id} href={`/laws/${scenario.law}`}>
                  <span className="law-num">{String(scenario.law).padStart(2, '0')}</span>
                  <div>
                    <h3>{scenario.title}</h3>
                    <p>{scenario.choices[answer.choice][2]}</p>
                  </div>
                  <ArrowUpRight size={18} />
                </a>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="simulation-layout">
          <section className="panel scenario-panel">
            <div className="row spread small">
              <span className="gold">Scenario {index + 1} of {SESSION_SIZE}</span>
              <span className="muted">{current.setting}</span>
            </div>
            <Progress
              className="session-progress"
              value={((index + (revealed ? 1 : 0)) / SESSION_SIZE) * 100}
              aria-label="Session progress"
            />
            <h2>{current.title}</h2>
            <p className="scenario-description">{current.text}</p>
            <RadioGroup
              value={selected}
              onValueChange={setSelected}
              disabled={revealed}
              aria-label="Choose your strategy"
              className="choices"
            >
              {current.choices.map((item, choiceIndex) => (
                <label
                  key={choiceIndex}
                  htmlFor={`choice-${choiceIndex}`}
                  className={
                    `choice ${selected === String(choiceIndex) ? 'chosen' : ''}` +
                    (revealed && item[1] === 2 ? ' strongest' : '')
                  }
                >
                  <span className="choice-letter">
                    {String.fromCharCode(65 + choiceIndex)}
                  </span>
                  <span>{item[0]}</span>
                  <RadioGroupItem id={`choice-${choiceIndex}`} value={String(choiceIndex)} />
                </label>
              ))}
            </RadioGroup>
            {!revealed ? (
              <button
                className="button primary wide"
                disabled={selected === ''}
                onClick={reveal}
              >
                Tingnan ang outcome <ArrowRight size={17} />
              </button>
            ) : (
              <div className="outcome" aria-live="polite">
                <span className="eyebrow">
                  {choice?.[1] === 2 ? 'MAGANDANG CHOICE' : 'MAY TRADEOFF DITO'}
                </span>
                <h3>Posibleng mangyari</h3>
                <p>{choice?.[2]}</p>
                {choice?.[1] !== 2 && (
                  <p className="stronger-answer">
                    <strong>Mas magandang approach:</strong>{' '}
                    {current.choices.find(item => item[1] === 2)?.[0]}
                  </p>
                )}
                <a href={`/laws/${current.law}`} className="outcome-law">
                  Law {current.law}: {laws[current.law - 1].title}
                  <ArrowUpRight size={16} />
                </a>
                <button className="button primary wide" onClick={next}>
                  {index === SESSION_SIZE - 1 ? 'View session results' : 'Next scenario'}
                  <ArrowRight size={17} />
                </button>
              </div>
            )}
          </section>
          <aside className="simulation-aside">
            <div className="practice-mark"><Compass size={38} /></div>
            <Eyebrow>MAG-ISIP BAGO KUMILOS</Eyebrow>
            <h2>Bago mag-react, <br />mag-isip muna.</h2>
            <p>
              Isipin ang goal, ang mga taong involved, at kung anong puwedeng mangyari
              pagkatapos ng choice mo.
            </p>
            <div className="divider" />
            <span className="eyebrow">HOW THIS WORKS</span>
            <ul>
              <li>Random na lima mula sa {scenarios.length} varied scenarios.</li>
              <li>Piliin ang response na gagawin mo.</li>
              <li>Alamin ang epekto at kaugnay na law.</li>
            </ul>
            <p className="note">
              Original practice scenarios ito, base sa supplied edition ng{' '}
              <i>The 48 Laws of Power</i>. Illustration lang ang outcomes, hindi garantiya.
            </p>
            {revealed && (
              <button
                className="text-link"
                onClick={() => {
                  try {
                    stageReflection(current.text, choice?.[2] || '', current.law);
                    window.location.assign('/journal?new=1');
                  } catch (caught) {
                    setError((caught as Error).message);
                  }
                }}
              >
                <NotebookPen size={16} /> I-reflect ang choice na ito
              </button>
            )}
            {!complete && error && <p role="alert" className="error">{error}</p>}
          </aside>
        </div>
      )}
    </div>
  );
}
