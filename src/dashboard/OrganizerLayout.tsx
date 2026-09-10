import { useState } from 'react';
import {
  LayoutDashboard, Rocket, PlusCircle, UserCheck, Users, Megaphone,
  MessageSquare, FolderGit2, Scale, Trophy, BarChart3, Building2,
  Settings, Moon, Sun, Code2, X, Menu, Search, Bell, HelpCircle,
  ShieldCheck, User, LogOut, ChevronDown,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Avatar } from '@/dashboard/components';
import type { OrganizerPageId } from '@/dashboard/organizer-data';

const navItems: { id: OrganizerPageId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'org-home', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'org-my-hackathons', label: 'My Hackathons', icon: Rocket },
  { id: 'org-create', label: 'Create Hackathon', icon: PlusCircle },
  { id: 'org-registrations', label: 'Registrations', icon: UserCheck },
  { id: 'org-teams', label: 'Teams', icon: Users },
  { id: 'org-announcements', label: 'Announcements', icon: Megaphone },
  { id: 'org-community', label: 'Community', icon: MessageSquare },
  { id: 'org-submissions', label: 'Submissions', icon: FolderGit2 },
  { id: 'org-judging', label: 'Judging', icon: Scale },
  { id: 'org-winners', label: 'Winners & Results', icon: Trophy },
  { id: 'org-analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'org-profile', label: 'Organization Profile', icon: Building2 },
];

export function OrganizerSidebar({
  page,
  setPage,
  mobileOpen,
  setMobileOpen,
}: {
  page: OrganizerPageId;
  setPage: (p: OrganizerPageId) => void;
  mobileOpen: boolean;
  setMobileOpen: (o: boolean) => void;
}) {
  const { theme, toggle } = useTheme();

  const handleNav = (p: OrganizerPageId) => {
    setPage(p);
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 lg:z-30 h-screen w-64 flex-shrink-0 bg-card border-r border-default flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-default flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center shadow-glow">
              <Code2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-brand-400 ring-2 ring-white dark:ring-ink-900" />
            </div>
            <span className="text-lg font-bold tracking-tight text-body">Hack<span className="text-gradient">Meet</span></span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-ink-50 dark:hover:bg-ink-800/50"><X className="w-5 h-5" /></button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <div className="text-[10px] font-bold text-muted uppercase tracking-wider px-3 mb-2">Organizer</div>
          {navItems.map((item) => {
            const active = page === item.id;
            return (
              <button key={item.id} onClick={() => handleNav(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-soft' : 'text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50'}`}>
                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 mt-3 border-t border-default space-y-0.5">
            <button onClick={() => handleNav('org-settings')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${page === 'org-settings' ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-soft' : 'text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50'}`}><Settings className="w-[18px] h-[18px]" />Settings</button>
            <button onClick={toggle} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors">{theme === 'light' ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
          </div>
        </nav>

        <div className="p-3 border-t border-default flex-shrink-0">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-ink-50 dark:bg-ink-800/40">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center flex-shrink-0"><Building2 className="w-4.5 h-4.5 text-white" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-body truncate">TechNova Community</div>
              <div className="text-[10px] text-success-600 dark:text-success-400 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified Organizer</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export function OrganizerTopNav({ setMobileOpen, setPage, onLogout }: { setMobileOpen: (o: boolean) => void; setPage: (p: OrganizerPageId) => void; onLogout: () => void }) {
  const { theme, toggle } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-default flex items-center gap-3 px-4 lg:px-6">
      <button onClick={() => setMobileOpen(true)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"><Menu className="w-5 h-5" /></button>
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input type="text" placeholder="Search hackathons, teams, participants..." className="w-full text-sm bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl pl-10 pr-4 py-2.5 text-body placeholder:text-muted outline-none focus:border-cyan-400 transition-colors" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 ml-auto">
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors" aria-label="Help"><HelpCircle className="w-[18px] h-[18px]" /></button>
        <button onClick={toggle} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors" aria-label="Toggle theme">{theme === 'light' ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}</button>
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors" aria-label="Notifications"><Bell className="w-[18px] h-[18px]" /><span className="absolute top-1 right-1 text-[9px] font-bold text-white bg-error-500 rounded-full px-1">3</span></button>
        <div className="relative ml-1 flex-shrink-0">
          <button onClick={() => setProfileOpen((open) => !open)} className="inline-flex items-center gap-1.5 rounded-lg p-1 hover:bg-ink-50 dark:hover:bg-ink-800/50" aria-label="Open profile menu" aria-expanded={profileOpen}>
            <Avatar initials="TN" gradient="from-cyan-500 to-cyan-700" size="sm" ring={false} />
            <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>
          {profileOpen && <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-default bg-card p-1.5 shadow-float z-50">
            <button onClick={() => { setPage('org-profile'); setProfileOpen(false); }} className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"><User className="w-4 h-4 text-muted" /> Profile</button>
            <button onClick={onLogout} className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950/30"><LogOut className="w-4 h-4" /> Logout</button>
          </div>}
        </div>
      </div>
    </header>
  );
}
