import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, Code2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Find Teammates', href: '#team-match' },
  { label: 'For Organizers', href: '#organizers' },
  { label: 'For Recruiters', href: '#recruiters' },
  { label: 'How It Works', href: '#how-it-works' },
];

export function Navbar({ onLogin, onRegister }: { onLogin?: () => void; onRegister?: () => void }) {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-ink-950/80 backdrop-blur-xl border-b border-default shadow-soft'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-white dark:ring-ink-950 animate-pulse-ring" />
            </div>
            <span className="text-lg font-bold tracking-tight text-body">
              Hack<span className="text-gradient">Meet</span>
            </span>
          </a>

          {/* Center nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-muted hover:text-body rounded-lg hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
            </button>
            <button
              onClick={onLogin}
              className="hidden sm:inline-flex text-sm font-medium text-muted hover:text-body px-3 py-2 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={onRegister}
              className="hidden sm:inline-flex text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 px-4 py-2 rounded-lg shadow-soft hover:shadow-float transition-all"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-body hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-default">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-body hover:bg-ink-50 dark:hover:bg-ink-800/50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 mt-2">
                <button onClick={onLogin} className="flex-1 text-center text-sm font-medium text-body border border-default rounded-lg py-2.5">
                  Log In
                </button>
                <button onClick={() => { onRegister?.(); setMobileOpen(false); }} className="flex-1 text-center text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-lg py-2.5">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
