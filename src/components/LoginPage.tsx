import { useState } from 'react';
import { ArrowLeft, ArrowRight, Code2, Lock, Eye, Mail, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { AuthVisual } from './auth/AuthVisual';
import type { LoginRole } from './auth/types';

export type UserRole = LoginRole;

const roles: { id: UserRole; label: string; description: string }[] = [
  { id: 'student', label: 'Student / Professional', description: 'Build skills, join hackathons, get discovered.' },
  { id: 'recruiter', label: 'HR / Recruiter', description: 'Discover proven talent with real proof.' },
  { id: 'organizer', label: 'Organizer / Organization', description: 'Companies, colleges, clubs & communities.' },
  { id: 'admin', label: 'Admin', description: 'Manage the platform and verified ecosystem.' },
];

export function LoginPage({ onBack, onOpenDashboard, onRegister }: { onBack: () => void; onOpenDashboard: (role: UserRole) => void; onRegister: () => void }) {
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenDashboard(role);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-subtle flex items-center justify-center px-4 py-4 lg:py-3 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-cyan-400/10 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 bg-card border border-default rounded-3xl shadow-float overflow-hidden">
        <AuthVisual role={role === 'admin' ? 'student' : role as Exclude<typeof role, 'admin'>} />

        <div className="p-6 sm:p-8 lg:p-7 xl:p-8">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-muted hover:text-body mb-5 lg:mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Hack-Meet
          </button>

          <div className="mb-6 lg:mb-5">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <span className="text-xl font-bold text-body">Hack<span className="text-cyan-500">Meet</span></span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-body">Welcome back.</h2>
            <p className="text-sm text-muted mt-1.5">Continue building, proving and discovering opportunities.</p>
          </div>

          <div className="mb-5 lg:mb-4">
            <p className="text-xs font-semibold text-muted mb-2">Sign in as</p>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`text-left p-2.5 rounded-xl border-2 transition-all ${role === r.id ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/30' : 'border-default hover:border-strong'}`}
                >
                  <div className="text-xs font-bold text-body">{r.label}</div>
                  {role === r.id && <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 mt-1.5" />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 lg:space-y-2.5">
            <div>
              <label className="text-xs font-semibold text-body mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl pl-10 pr-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-brand-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-body mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl pl-10 pr-11 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-brand-400 transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-body transition-colors">
                  {showPassword ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-default text-brand-500 focus:ring-brand-400" />
                Remember me
              </label>
              <button className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Forgot password?</button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs font-medium text-error-600 dark:text-error-400 bg-error-50 dark:bg-error-950/40 px-3 py-2.5 rounded-xl">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3 rounded-xl shadow-soft hover:shadow-float transition-all disabled:opacity-70"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
              ) : (
                <>Login <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          <div className="relative flex items-center gap-3 my-4 lg:my-3">
            <div className="h-px bg-default flex-1" />
            <span className="text-xs text-muted">OR</span>
            <div className="h-px bg-default flex-1" />
          </div>

          <div className="space-y-2.5">
            <button className="w-full inline-flex items-center justify-center gap-2.5 text-sm font-semibold text-body border border-default rounded-xl py-3 hover:border-strong hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
            <button className="w-full inline-flex items-center justify-center gap-2.5 text-sm font-semibold text-body border border-default rounded-xl py-3 hover:border-strong hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">
              <svg className="w-4 h-4" fill="#0A66C2" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.13-.92 2.06-2.06 2.06zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
              Continue with LinkedIn
            </button>
          </div>

          <p className="text-center text-xs text-muted mt-5 lg:mt-4">
            Don&apos;t have an account?{' '}
            <button onClick={onRegister} className="inline-flex items-center justify-center font-semibold text-brand-600 dark:text-brand-400 border border-brand-300 dark:border-brand-700 rounded-lg px-3 py-1.5 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
