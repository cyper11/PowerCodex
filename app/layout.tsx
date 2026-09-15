import type { Metadata } from 'next';
import './globals.css';
import './features.css';
import { Shell } from './ui';
export const metadata: Metadata={ title:{default:'The Power Codex',template:'%s · The Power Codex'}, description:'Taglish na companion sa The 48 Laws of Power. Unawain ang laws, subukan ang judgment mo, at i-save ang lessons mo.',icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="fil" className="dark"><body><Shell>{children}</Shell></body></html>}
