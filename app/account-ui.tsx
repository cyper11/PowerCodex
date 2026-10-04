'use client';

import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, LogOut, ShieldCheck } from 'lucide-react';
import { api } from './client';
import { Eyebrow, PageHead } from './ui';

type AccountUser = { userId: string; email: string };

function safeReturnPath(): string {
  const value = new URLSearchParams(window.location.search).get('returnTo') ?? '/';
  return value.startsWith('/') && !value.startsWith('//') ? value : '/';
}

export function AccountPage() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  useEffect(() => {
    api<{ user: AccountUser | null }>('auth/session')
      .then(result => setUser(result.user))
      .catch(caught => setError((caught as Error).message))
      .finally(() => setLoading(false));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === 'register' && password !== confirmPassword) {
      setError('Hindi magkapareho ang dalawang password.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const result = await api<{ user: AccountUser }>(
        `auth/${mode}`,
        'POST',
        { email, password },
      );
      setUser(result.user);
      window.location.assign(safeReturnPath());
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    setBusy(true);
    setError('');
    try {
      await api('auth/signout', 'POST', {});
      setUser(null);
      setPassword('');
      setConfirmPassword('');
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page narrow">
      <PageHead
        kicker="YOUR PRIVATE SPACE"
        title="PowerCodex Account"
        description="Sariling account ito para sa journal, notes, profile, at practice history mo."
      />
      <div className="account-layout">
        <section className="panel account-card">
          {loading ? (
            <p role="status">Tinitingnan ang account mo…</p>
          ) : user ? (
            <div className="stack">
              <ShieldCheck size={36} className="gold" />
              <Eyebrow>SIGNED IN</Eyebrow>
              <h2>Welcome back.</h2>
              <p>{user.email}</p>
              <p className="note">
                Sa PowerCodex account lang naka-link ang saved data mo.
              </p>
              <button className="button" onClick={signOut} disabled={busy}>
                <LogOut size={17} />
                {busy ? 'Signing out…' : 'Sign out'}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="stack">
              <div className="account-tabs" role="tablist" aria-label="Account action">
                <button
                  type="button"
                  className={mode === 'signin' ? 'active' : ''}
                  onClick={() => {
                    setMode('signin');
                    setError('');
                  }}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  className={mode === 'register' ? 'active' : ''}
                  onClick={() => {
                    setMode('register');
                    setError('');
                  }}
                >
                  Create account
                </button>
              </div>
              <div>
                <label className="form-label" htmlFor="account-email">Email</label>
                <input
                  className="field"
                  id="account-email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <label className="form-label" htmlFor="account-password">Password</label>
                <div className="password-field">
                <input
                  className="field"
                  id="account-password"
                  type={showPassword ? 'text' : 'password'}
                  onKeyUp={event => setCapsLock(event.getModifierState('CapsLock'))}
                  autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                  minLength={10}
                  maxLength={128}
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setShowPassword(value => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
                </div>
                {capsLock && <p className="note warn">Naka-on ang Caps Lock.</p>}
                {mode === 'register' && password.length > 0 && (
                  <div className="strength" aria-live="polite">
                    <div className="meter">
                      <span
                        style={{ width: `${Math.min(100, (password.length / 16) * 100)}%` }}
                        className={password.length < 10 ? 'weak' : password.length < 14 ? 'ok' : 'strong'}
                      />
                    </div>
                    <span className="note">
                      {password.length < 10
                        ? `${10 - password.length} pang character`
                        : password.length < 14
                          ? 'Pwede na'
                          : 'Matibay'}
                    </span>
                  </div>
                )}
                {mode === 'register' && (
                  <p className="note">Gumamit ng 10–128 characters.</p>
                )}
              </div>
              {mode === 'register' && (
                <div>
                  <label className="form-label" htmlFor="account-confirm">Confirm password</label>
                  <input
                    className="field"
                    id="account-confirm"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    minLength={10}
                    maxLength={128}
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                    required
                  />
                  {confirmPassword && confirmPassword !== password && (
                    <p className="note warn">Hindi pa tugma sa password.</p>
                  )}
                </div>
              )}
              {error && <p className="error" role="alert">{error}</p>}
              <button className="button primary wide" disabled={busy}>
                {busy
                  ? 'Please wait…'
                  : mode === 'register'
                    ? 'Create my account'
                    : 'Sign in'}
                {!busy && <ArrowRight size={17} />}
              </button>
            </form>
          )}
          {user && error && <p className="error" role="alert">{error}</p>}
        </section>
        <aside className="account-aside">
          <LockKeyhole size={32} className="gold" />
          <h2>Isang identity para sa sarili mong codex.</h2>
          <p>
            Email mo ang ginagamit para mahanap ang account. Ang password ay
            ini-store bilang salted hash, at hiwalay ang records ng bawat user.
          </p>
          <ul>
            <li>Private journal at law notes</li>
            <li>Saved simulation history</li>
            <li>Personal power profile</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
