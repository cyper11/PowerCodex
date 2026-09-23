'use client';
/* eslint-disable @next/next/no-html-link-for-pages -- Preserve the existing full-page navigation behavior. */

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
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

  useEffect(() => {
    try {
      document.documentElement.classList.toggle(
        'large-text',
        localStorage.getItem('codex-large-text') === 'true',
      );
    } catch {}
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
      <header className="header">
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
          <a href="/laws?focus=search" aria-label="Search laws"><Search size={18} /></a>
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
