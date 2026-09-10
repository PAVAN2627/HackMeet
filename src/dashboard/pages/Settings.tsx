import { useState } from 'react';
import {
  User, Lock, Bell, Shield, CreditCard, Palette, Globe,
  Eye, ShieldCheck, Moon, Sun, Check,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { PageHeader } from '@/dashboard/components';

const sections = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'privacy', label: 'Privacy', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'premium', label: 'Premium', icon: CreditCard },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'appearance', label: 'Theme', icon: Palette },
];

function Toggle({ on, onChange }: { on: boolean; onChange?: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
        on ? 'bg-brand-500' : 'bg-ink-200 dark:bg-ink-700'
      }`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-soft transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  );
}

export function SettingsPage() {
  const { theme, toggle } = useTheme();
  const [activeSection, setActiveSection] = useState('account');
  const [profileVisible, setProfileVisible] = useState(true);
  const [recruiterVisible, setRecruiterVisible] = useState(true);
  const [linksVisible, setLinksVisible] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [notifHackathons, setNotifHackathons] = useState(true);
  const [notifTeams, setNotifTeams] = useState(true);
  const [notifRecruiters, setNotifRecruiters] = useState(true);
  const [notifSystem, setNotifSystem] = useState(false);

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Settings" subtitle="Manage your account, privacy, and preferences." />

      <div className="grid lg:grid-cols-[220px_1fr] gap-5 flex flex-col lg:grid">
        {/* Section nav */}
        <div className="bg-card border border-default rounded-2xl p-2 h-fit lg:sticky lg:top-20 overflow-x-auto lg:overflow-x-visible">
          <div className="flex lg:flex-col gap-1 min-w-max lg:min-w-0">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                activeSection === s.id
                  ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                  : 'text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50'
              }`}
            >
              <s.icon className="w-[18px] h-[18px]" />
              {s.label}
            </button>
          ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5">
          {activeSection === 'account' && (
            <div className="bg-card border border-default rounded-2xl p-6">
              <h3 className="text-base font-bold text-body mb-5">Account Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="text-sm"><span className="font-medium text-body block mb-1.5">Full Name</span><input type="text" defaultValue="Pavan Mali" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-lg px-3 py-2.5 text-sm text-body outline-none focus:border-brand-400" /></label>
                <label className="text-sm"><span className="font-medium text-body block mb-1.5">Role</span><input type="text" defaultValue="Software Developer" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-lg px-3 py-2.5 text-sm text-body outline-none focus:border-brand-400" /></label>
                <label className="text-sm"><span className="font-medium text-body block mb-1.5">Email</span><input type="email" defaultValue="pavan@example.com" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-lg px-3 py-2.5 text-sm text-body outline-none focus:border-brand-400" /></label>
                <label className="text-sm"><span className="font-medium text-body block mb-1.5">Location</span><input type="text" defaultValue="Mumbai, India" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-lg px-3 py-2.5 text-sm text-body outline-none focus:border-brand-400" /></label>
              </div>
              <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-500 px-4 py-2.5 rounded-xl hover:bg-brand-600 transition-colors"><Check className="w-4 h-4" /> Save Changes</button>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="bg-card border border-default rounded-2xl p-6">
              <h3 className="text-base font-bold text-body mb-5">Privacy Settings</h3>
              <div className="space-y-1">
                {[
                  { label: 'Profile Visibility', desc: 'Allow other users to view your profile', on: profileVisible, set: setProfileVisible, icon: Eye },
                  { label: 'Recruiter Visibility', desc: 'Allow recruiters to discover and contact you', on: recruiterVisible, set: setRecruiterVisible, icon: User },
                  { label: 'Professional Links Visibility', desc: 'Show GitHub, LinkedIn, LeetCode and portfolio links', on: linksVisible, set: setLinksVisible, icon: Globe },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-xl hover:bg-ink-50/50 dark:hover:bg-ink-800/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-ink-50 dark:bg-ink-800/40 flex items-center justify-center"><item.icon className="w-4 h-4 text-brand-500" /></div>
                      <div><div className="text-sm font-semibold text-body">{item.label}</div><div className="text-xs text-muted">{item.desc}</div></div>
                    </div>
                    <Toggle on={item.on} onChange={() => item.set(!item.on)} />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted mt-4 p-3 rounded-lg bg-ink-50 dark:bg-ink-800/40">Personal phone numbers and email addresses are always private. Only you decide when to share contact details.</p>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-card border border-default rounded-2xl p-6">
              <h3 className="text-base font-bold text-body mb-5">Notification Preferences</h3>
              <div className="space-y-1">
                {[
                  { label: 'Hackathon Updates', desc: 'Announcements, deadlines, and results', on: notifHackathons, set: setNotifHackathons, icon: Bell },
                  { label: 'Team Activity', desc: 'Invitations, messages, and progress', on: notifTeams, set: setNotifTeams, icon: User },
                  { label: 'Recruiter Interest', desc: 'Profile views and interview invitations', on: notifRecruiters, set: setNotifRecruiters, icon: Shield },
                  { label: 'System Notifications', desc: 'Platform updates and maintenance', on: notifSystem, set: setNotifSystem, icon: ShieldCheck },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-xl hover:bg-ink-50/50 dark:hover:bg-ink-800/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-ink-50 dark:bg-ink-800/40 flex items-center justify-center"><item.icon className="w-4 h-4 text-brand-500" /></div>
                      <div><div className="text-sm font-semibold text-body">{item.label}</div><div className="text-xs text-muted">{item.desc}</div></div>
                    </div>
                    <Toggle on={item.on} onChange={() => item.set(!item.on)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-card border border-default rounded-2xl p-6">
              <h3 className="text-base font-bold text-body mb-5">Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-default">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-ink-50 dark:bg-ink-800/40 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-brand-500" /></div>
                    <div><div className="text-sm font-semibold text-body">Two-Factor Authentication</div><div className="text-xs text-muted">Add an extra layer of security to your account</div></div>
                  </div>
                  <Toggle on={twoFA} onChange={() => setTwoFA(!twoFA)} />
                </div>
                <button className="w-full text-left p-4 rounded-xl border border-default hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                  <div className="text-sm font-semibold text-body">Change Password</div>
                  <div className="text-xs text-muted mt-0.5">Last changed 3 months ago</div>
                </button>
                <button className="w-full text-left p-4 rounded-xl border border-default hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                  <div className="text-sm font-semibold text-body">Active Sessions</div>
                  <div className="text-xs text-muted mt-0.5">2 active sessions on different devices</div>
                </button>
              </div>
            </div>
          )}

          {activeSection === 'premium' && (
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 blur-[60px] pointer-events-none" />
              <div className="relative">
                <h3 className="text-lg font-bold mb-2">Hack-Meet Premium</h3>
                <p className="text-sm text-white/70 mb-5">Unlock premium recruiter invitations, advanced analytics, and priority support.</p>
                <div className="flex items-baseline gap-2 mb-5"><span className="text-4xl font-extrabold">₹49</span><span className="text-sm text-white/60">/ 3 months</span></div>
                <ul className="space-y-2 mb-6">
                  {['Premium recruiter invitations', 'Advanced profile analytics', 'Priority support', 'Unlimited team invitations'].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/90"><Check className="w-4 h-4 text-cyan-300" /> {f}</li>
                  ))}
                </ul>
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 bg-white px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors">Upgrade to Premium</button>
              </div>
            </div>
          )}

          {activeSection === 'billing' && (
            <div className="bg-card border border-default rounded-2xl p-6">
              <h3 className="text-base font-bold text-body mb-5">Billing</h3>
              <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-default mb-4">
                <div className="flex items-center justify-between">
                  <div><div className="text-sm font-semibold text-body">Free Plan</div><div className="text-xs text-muted">Current plan</div></div>
                  <span className="text-xs font-semibold text-muted px-2 py-1 rounded-full bg-ink-100 dark:bg-ink-800">₹0/month</span>
                </div>
              </div>
              <p className="text-xs text-muted">No billing history yet. Upgrade to Premium to unlock more features.</p>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="bg-card border border-default rounded-2xl p-6">
              <h3 className="text-base font-bold text-body mb-5">Theme</h3>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => { if (theme === 'dark') toggle(); }} className={`p-4 rounded-xl border-2 transition-colors ${theme === 'light' ? 'border-brand-500 bg-brand-50/30 dark:bg-brand-950/20' : 'border-default hover:border-strong'}`}>
                  <div className="flex items-center gap-3 mb-3"><Sun className="w-5 h-5 text-warning-500" /><span className="text-sm font-semibold text-body">Light Mode</span>{theme === 'light' && <Check className="w-4 h-4 text-brand-500 ml-auto" />}</div>
                  <div className="h-16 rounded-lg bg-white border border-ink-200 p-2"><div className="h-2 w-12 rounded-full bg-brand-500 mb-1.5" /><div className="h-1.5 w-20 rounded-full bg-ink-200" /></div>
                </button>
                <button onClick={() => { if (theme === 'light') toggle(); }} className={`p-4 rounded-xl border-2 transition-colors ${theme === 'dark' ? 'border-brand-500 bg-brand-50/30 dark:bg-brand-950/20' : 'border-default hover:border-strong'}`}>
                  <div className="flex items-center gap-3 mb-3"><Moon className="w-5 h-5 text-brand-400" /><span className="text-sm font-semibold text-body">Dark Mode</span>{theme === 'dark' && <Check className="w-4 h-4 text-brand-500 ml-auto" />}</div>
                  <div className="h-16 rounded-lg bg-ink-900 border border-ink-700 p-2"><div className="h-2 w-12 rounded-full bg-brand-500 mb-1.5" /><div className="h-1.5 w-20 rounded-full bg-ink-700" /></div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
