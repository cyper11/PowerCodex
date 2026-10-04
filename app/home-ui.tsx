'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, BookmarkCheck, CheckCheck, Shuffle } from 'lucide-react';
import { laws } from './data';
import { lawOfTheDay, randomLaw, useProgress } from './progress';

export function DailyLaw() {
  const [id, setId] = useState<number | null>(null);
  const [daily, setDaily] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setId(lawOfTheDay()), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const law = laws[(id ?? 29) - 1];

  return (
    <section className="home-thought" aria-live="polite">
      <span className="eyebrow">{daily ? 'LAW OF THE DAY' : 'A RANDOM PRINCIPLE'}</span>
      <h2 key={law.id} className="fade-in">“{law.title}.”</h2>
      <p className="daily-summary">{law.summary}</p>
      <div className="home-thought-actions">
        <a href={`/laws/${law.id}`}>
          LAW {law.id} <ArrowRight size={16} />
        </a>
        <button
          onClick={() => {
            setId(randomLaw(law.id));
            setDaily(false);
          }}
        >
          <Shuffle size={15} /> IBANG LAW
        </button>
      </div>
    </section>
  );
}

export function HomeProgress() {
  const progress = useProgress();
  const percent = Math.round((progress.read.length / 48) * 100);
  const nextUnread =
    laws.find(law => law.id > (progress.last ?? 0) && !progress.read.includes(law.id))?.id ??
    laws.find(law => !progress.read.includes(law.id))?.id;

  return (
    <div className="home-progress">
      <div className="home-progress-stats">
        <div>
          <CheckCheck size={18} />
          <strong>{progress.read.length}</strong>
          <span>/48 nabasa</span>
        </div>
        <div>
          <BookmarkCheck size={18} />
          <strong>{progress.saved.length}</strong>
          <span>saved</span>
        </div>
      </div>
      <div className="meter" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Reading progress">
        <span style={{ width: `${percent}%` }} />
      </div>
      <div className="home-progress-links">
        {progress.last ? (
          <a href={`/laws/${progress.last}`}>
            Balikan ang Law {progress.last} <ArrowRight size={15} />
          </a>
        ) : null}
        {nextUnread ? (
          <a href={`/laws/${nextUnread}`}>
            {progress.read.length ? 'Susunod na hindi pa nababasa' : 'Magsimula'}: Law {nextUnread}
            <ArrowRight size={15} />
          </a>
        ) : (
          <span className="gold">Natapos mo na ang lahat ng 48 laws.</span>
        )}
      </div>
    </div>
  );
}
