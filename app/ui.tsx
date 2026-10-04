'use client';
/* eslint-disable @next/next/no-location-assign-relative-destination -- Preserve full-page navigation, matching the rest of the app. */
/* eslint-disable @next/next/no-html-link-for-pages -- Preserve the existing full-page navigation behavior. */

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  CircleUserRound,
  Landmark,
  Menu,
  Search,
  Settings,
  UserRound,
  X,
} from 'lucide-react';

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    try {
      document.documentElement.classList.toggle(
        'large-text',
        localStorage.getItem('codex-large-text') === 'true',
      );
    } catch {}
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName || '');
      if (event.key === 'Escape') setOpen(false);
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === '/') {
        const search = document.querySelector<HTMLInputElement>('.searchbox input');
        event.preventDefault();
        if (search) search.focus();
        else window.location.assign('/laws?focus=search');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const items = [
    ['/', 'Home'],
    ['/laws', 'The 48 Laws'],
    ['/analyzer', 'Analyzer'],
    ['/simulator', 'Simulator'],
  ];

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={scrolled ? 'header scrolled' : 'header'}>
        <a className="brand" href="/" aria-label="The Power Codex home">
          <Landmark size={27} />
          <span>
            POWER CODEX
            <small>KNOWLEDGE · STRATEGY · INFLUENCE</small>
          </span>
        </a>
        <nav className={open ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          {items.map(([url, label]) => (
            <a
              key={url}
              className={
                pathname === url || (url !== '/' && pathname.startsWith(url))
                  ? 'active'
                  : ''
              }
              href={url}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a className="mobile-only" href="/journal" onClick={() => setOpen(false)}>
            Journal
          </a>
          <a className="mobile-only" href="/profile" onClick={() => setOpen(false)}>
            Power profile
          </a>
          <a className="mobile-only" href="/settings" onClick={() => setOpen(false)}>
            Settings
          </a>
          <a className="mobile-only" href="/account" onClick={() => setOpen(false)}>
            Account
          </a>
        </nav>
        <div className="nav-tools">
          <a href="/laws?focus=search" aria-label="Search laws (press /)" title="Search laws ( / )">
            <Search size={18} />
          </a>
          <a
            href="/journal"
            className={pathname === '/journal' ? 'active' : ''}
            aria-label="Power journal"
          >
            <BookOpen size={18} />
          </a>
          <a
            href="/profile"
            className={pathname === '/profile' ? 'active' : ''}
            aria-label="Power profile"
          >
            <UserRound size={18} />
          </a>
          <a
            href="/settings"
            className={pathname === '/settings' ? 'active' : ''}
            aria-label="Settings and about"
          >
            <Settings size={18} />
          </a>
          <a
            href="/account"
            className={pathname === '/account' ? 'active' : ''}
            aria-label="PowerCodex account"
          >
            <CircleUserRound size={18} />
          </a>
        </div>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main">{children}</main>
      <button
        className={scrolled ? 'to-top visible' : 'to-top'}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={scrolled ? 0 : -1}
      >
        <ArrowUp size={18} />
      </button>
      <footer>
        <a className="footer-brand" href="/">THE POWER CODEX</a>
        <p className="footer-disclaimer">
          Power Codex is an independent educational project. Inspired by concepts
          explored in Robert Greene&apos;s <i>The 48 Laws of Power</i>. Not affiliated
          with or endorsed by Robert Greene or his publishers.
          <span className="gold">Powered by c1</span>
        </p>
        <a href="/settings">About the project <ArrowUpRight size={14} /></a>
      </footer>
    </>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow"><span />{children}</div>;
}

export function PageHead({
  kicker,
  title,
  description,
  action,
}: {
  kicker: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        <Eyebrow>{kicker}</Eyebrow>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}
