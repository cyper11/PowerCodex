'use client';

import { useSyncExternalStore } from 'react';

// Browser-only reading progress: works without an account and never leaves the device.
const KEY = 'codex-progress';
const EVENT = 'codex-progress-change';

export type CodexProgress = { read: number[]; saved: number[]; last: number | null };

const EMPTY: CodexProgress = { read: [], saved: [], last: null };
let cache: CodexProgress = EMPTY;
let cacheRaw: string | null = null;

function validIds(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter(id => Number.isInteger(id) && id >= 1 && id <= 48))].sort(
    (left, right) => left - right,
  );
}

export function readProgress(): CodexProgress {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return cache;
  }
  if (raw === cacheRaw) return cache;
  cacheRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as Partial<CodexProgress>) : {};
    const last = Number.isInteger(parsed.last) && Number(parsed.last) >= 1 && Number(parsed.last) <= 48
      ? Number(parsed.last)
      : null;
    cache = { read: validIds(parsed.read), saved: validIds(parsed.saved), last };
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function writeProgress(next: CodexProgress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    cache = next;
    cacheRaw = null;
  }
  window.dispatchEvent(new Event(EVENT));
}

function toggle(list: number[], id: number, on?: boolean) {
  const has = list.includes(id);
  const want = on ?? !has;
  if (want === has) return list;
  return want ? [...list, id].sort((left, right) => left - right) : list.filter(item => item !== id);
}

export function markRead(id: number, on?: boolean) {
  const current = readProgress();
  writeProgress({ ...current, read: toggle(current.read, id, on), last: id });
}

export function toggleSaved(id: number) {
  const current = readProgress();
  writeProgress({ ...current, saved: toggle(current.saved, id) });
}

export function resetProgress() {
  writeProgress(EMPTY);
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export function useProgress(): CodexProgress {
  return useSyncExternalStore(subscribe, readProgress, () => EMPTY);
}

/** Same law for everyone on a given calendar day. */
export function lawOfTheDay(date = new Date()): number {
  const day = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000,
  );
  return (((day * 17) % 48) + 48) % 48 + 1;
}

export function randomLaw(exclude?: number): number {
  let id = Math.floor(Math.random() * 48) + 1;
  if (id === exclude) id = (id % 48) + 1;
  return id;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
