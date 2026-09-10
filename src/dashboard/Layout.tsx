import { useState } from 'react';
import {
  LayoutDashboard, Rocket, Calendar, Handshake, Users, FolderGit2,
  MessageSquare, Target, User, Bell, Settings, Moon, Sun, Code2,
  X, Menu, LogOut, ChevronDown,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { currentUser } from '@/dashboard/data';
import { Avatar } from '@/dashboard/components';

export type PageId =
  | 'home' | 'discover' | 'my-hackathons' | 'teammates' | 'teams'
  | 'workspace' | 'projects' | 'hackathon-details' | 'recruiter' | 'profile'
  | 'messages' | 'notifications' | 'settings';

const navItems: { id: PageId; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
  { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'discover', label: 'Discover Hackathons', icon: Rocket },
  { id: 'my-hackathons', label: 'My Hackathons', icon: Calendar },
  { id: 'teammates', label: 'Find Teammates', icon: Handshake },
  { id: 'teams', label: 'My Teams', icon: Users },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 2 },
  { id: 'recruiter', label: 'Recruiter Invitations', icon: Target, badge: 3 },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: 5 },
];

export function Sidebar({
  page,
  setPage,
  mobileOpen,
  setMobileOpen,
}: {
  page: PageId;
  setPage: (p: PageId) => void;
  mobileOpen: boolean;
  setMobileOpen: (o: boolean) => void;
}) {
  const { theme, toggle } = useTheme();

  const handleNav = (p: PageId) => {
    setPage(p);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-30 h-screen w-64 flex-shrink-0 bg-card border-r border-default flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-default flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow">
              <Code2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-white dark:ring-ink-900" />
            </div>
            <span className="text-lg font-bold tracking-tight text-body">
              Hack<span className="text-gradient">Meet</span>
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-ink-50 dark:hover:bg-ink-800/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-soft'
                    : 'text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50'
                }`}
              >
                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    active ? 'bg-white/25 text-white' : 'bg-brand-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 mt-3 border-t border-default space-y-0.5">
            <button
              onClick={() => handleNav('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                page === 'settings'
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-soft'
                  : 'text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50'
              }`}
            >
              <Settings className="w-[18px] h-[18px]" />
              Settings
            </button>
            <button
              onClick={toggle}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </nav>

        {/* User card */}
        <div className="p-3 border-t border-default flex-shrink-0">
          <button
            onClick={() => handleNav('profile')}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
          >
            <Avatar initials={currentUser.initials} gradient={currentUser.gradient} size="md" />
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-semibold text-body truncate">{currentUser.name}</div>
              <div className="text-xs text-muted truncate">{currentUser.role}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-bold text-gradient">{currentUser.reputation}</div>
              <div className="text-[10px] text-muted">/ 100</div>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}

export function TopNav({
  setMobileOpen,
  setPage,
  onLogout,
}: {
  setMobileOpen: (o: boolean) => void;
  setPage: (p: PageId) => void;
  onLogout: () => void;
}) {
  const { theme, toggle } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-default flex items-center gap-3 px-4 lg:px-6">
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search hackathons, teammates, projects, technologies..."
            className="w-full text-sm bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl pl-4 pr-4 py-2.5 text-body placeholder:text-muted outline-none focus:border-brand-400 dark:focus:border-brand-600 transition-colors"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
        </button>
        <button
          onClick={() => setPage('messages')}
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
          aria-label="Messages"
        >
          <MessageSquare className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-500" />
        </button>
        <button
          onClick={() => setPage('notifications')}
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1 right-1 text-[9px] font-bold text-white bg-error-500 rounded-full px-1">5</span>
        </button>
        <div className="relative ml-1 flex-shrink-0">
          <button onClick={() => setProfileOpen((open) => !open)} className="inline-flex items-center gap-1.5 rounded-lg p-1 hover:bg-ink-50 dark:hover:bg-ink-800/50" aria-label="Open profile menu" aria-expanded={profileOpen}>
            <Avatar initials={currentUser.initials} gradient={currentUser.gradient} size="sm" ring={false} />
            <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-default bg-card p-1.5 shadow-float z-50">
              <button onClick={() => { setPage('profile'); setProfileOpen(false); }} className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"><User className="w-4 h-4 text-muted" /> Profile</button>
              <button onClick={onLogout} className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950/30"><LogOut className="w-4 h-4" /> Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
