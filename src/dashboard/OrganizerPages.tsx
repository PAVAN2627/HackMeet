import { useState } from 'react';
import {
  Rocket, Users, FolderGit2, TrendingUp, Trophy, Check, MapPin, Clock,
  UserPlus, Plus, Search, MoreVertical, Eye, Pencil, Copy, Trash2,
  Megaphone, Send, Calendar, Pin, Shield, Flag, Ban, ArrowRight, X,
  Star, Award, BarChart3, Building2, Globe, ChevronDown, CheckCircle2,
  Circle, AlertTriangle, FileText, Video, Github, ExternalLink, Scale,
  Sparkles, UserCheck, Settings as SettingsIcon, CreditCard, Bell,
  ShieldCheck, LogOut,
} from 'lucide-react';
import {
  orgHackathons, orgParticipants, orgTeams, orgAnnouncements,
  orgSubmissions, orgJudges, judgingCriteria, orgWinners, orgSpecialAwards,
  registrationTrend, orgRecentActivity, orgKPIs, orgUpcomingDeadlines,
  orgCommunityChannels, orgCommunityMessages, orgCommunityMembers,
} from '@/dashboard/organizer-data';
import type { OrganizerPageId, OrgHackathon } from '@/dashboard/organizer-data';
import { Avatar, SkillChip, PageHeader } from '@/dashboard/components';

function HackathonSelector({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  const activeHackathons = orgHackathons.filter((h) => h.status !== 'Draft');
  return (
    <div className="relative mb-5">
      <select
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full sm:w-auto bg-card border border-default rounded-xl px-4 py-2.5 text-sm font-semibold text-body outline-none focus:border-cyan-400 cursor-pointer"
      >
        {activeHackathons.map((h) => <option key={h.id} value={h.id}>{h.title}</option>)}
      </select>
    </div>
  );
}

const kpiIcons: Record<string, React.ComponentType<{ className?: string }>> = { Rocket, Users, FolderGit2, Trophy };

function KPICard({ kpi }: { kpi: typeof orgKPIs[number] }) {
  const Icon = kpiIcons[kpi.icon] || Rocket;
  return (
    <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 flex items-center justify-center"><Icon className="w-5 h-5 text-cyan-500" /></div>
        <span className={`text-xs font-semibold flex items-center gap-1 ${kpi.trendUp ? 'text-success-600 dark:text-success-400' : 'text-error-500'}`}><TrendingUp className="w-3 h-3" />{kpi.change}</span>
      </div>
      <div className="text-2xl font-extrabold text-body">{kpi.value.toLocaleString()}</div>
      <div className="text-xs text-muted mt-0.5">{kpi.label}</div>
    </div>
  );
}

export function OrganizerHome({ setPage }: { setPage: (p: OrganizerPageId) => void }) {
  const featured = orgHackathons[0];
  const pct = Math.round((featured.participants / featured.maxParticipants) * 100);
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Good afternoon, TechNova" subtitle="Manage your hackathons, teams, participants and projects from one place.">
        <button onClick={() => setPage('org-create')} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 px-4 py-2.5 rounded-xl shadow-soft hover:shadow-float transition-all"><Plus className="w-4 h-4" /> Create Hackathon</button>
        <button onClick={() => setPage('org-my-hackathons')} className="inline-flex items-center gap-2 text-sm font-semibold text-body border border-default bg-card px-4 py-2.5 rounded-xl hover:border-cyan-400 transition-colors">View Active Hackathons</button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">{orgKPIs.map((k) => <KPICard key={k.label} kpi={k} />)}</div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        {/* Featured hackathon */}
        <div className="lg:col-span-2 bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
          <div className={`h-32 bg-gradient-to-br ${featured.gradient} p-5 flex flex-col justify-between relative`}>
            <div className="absolute inset-0 bg-black/10" />
            <div className="flex items-center justify-between relative">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"><Trophy className="w-5 h-5 text-white" /></div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success-700 bg-white/90 px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-success-500" /> Registration Open</span>
            </div>
            <div className="relative text-white">
              <div className="text-xl font-bold">{featured.title}</div>
              <div className="text-xs text-white/75 mt-0.5">{featured.organizer} · {featured.domain} · {featured.mode}</div>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div><div className="text-xs text-muted">Prize</div><div className="text-lg font-bold text-body">{featured.prize}</div></div>
              <div><div className="text-xs text-muted">Participants</div><div className="text-lg font-bold text-body">{featured.participants} / {featured.maxParticipants}</div></div>
              <div><div className="text-xs text-muted">Teams</div><div className="text-lg font-bold text-body">{featured.teams}</div></div>
              <div><div className="text-xs text-muted">Deadline</div><div className="text-lg font-bold text-warning-600 dark:text-warning-400">{featured.deadline}</div></div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5"><span className="text-muted">Registration capacity</span><span className="font-semibold text-body">{pct}%</span></div>
              <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-brand-500" style={{ width: `${pct}%` }} /></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPage('org-registrations')} className="flex-1 text-sm font-semibold text-white bg-cyan-500 rounded-xl py-2.5 hover:bg-cyan-600 transition-colors">Manage Hackathon</button>
              <button className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-2.5 hover:border-cyan-400 transition-colors">View Public Page</button>
            </div>
          </div>
        </div>

        {/* Registration analytics */}
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Registrations Over Time</h3>
          <div className="flex items-end gap-1 h-32 mb-3">
            {registrationTrend.map((v, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500 to-cyan-300 dark:from-cyan-600 dark:to-cyan-400" style={{ height: `${(v / registrationTrend[registrationTrend.length - 1]) * 100}%` }} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-default">
            <div><div className="text-lg font-bold text-body">427</div><div className="text-[10px] text-muted">Total registrations</div></div>
            <div><div className="text-lg font-bold text-success-600 dark:text-success-400">+12</div><div className="text-[10px] text-muted">Today</div></div>
            <div><div className="text-lg font-bold text-body">85%</div><div className="text-[10px] text-muted">Conversion rate</div></div>
            <div><div className="text-lg font-bold text-success-600 dark:text-success-400">+18%</div><div className="text-[10px] text-muted">Growth</div></div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Upcoming deadlines */}
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {orgUpcomingDeadlines.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${d.status === 'urgent' ? 'bg-error-500' : d.status === 'upcoming' ? 'bg-warning-500' : 'bg-ink-300'}`} />
                <div className="flex-1"><div className="text-sm font-medium text-body">{d.label}</div></div>
                <span className="text-sm font-semibold text-muted">{d.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {orgRecentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-ink-50 dark:bg-ink-800/40 flex items-center justify-center flex-shrink-0"><Circle className="w-3.5 h-3.5 text-cyan-500" /></div>
                <div className="flex-1 min-w-0"><p className="text-sm text-body">{a.text}</p><span className="text-[10px] text-muted">{a.time}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrganizerMyHackathons({ setPage }: { setPage: (p: OrganizerPageId) => void }) {
  const [tab, setTab] = useState('Active');
  const tabs = ['Active', 'Upcoming', 'Completed', 'Draft'];
  const filtered = orgHackathons.filter((h) => {
    if (tab === 'Active') return ['Registration Open', 'Hackathon Started', 'Submission Open'].includes(h.status);
    if (tab === 'Completed') return h.status === 'Completed';
    if (tab === 'Draft') return h.status === 'Draft';
    return true;
  });

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="My Hackathons" subtitle="Manage all your hackathons from one place.">
        <button onClick={() => setPage('org-create')} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-cyan-500 px-4 py-2.5 rounded-xl hover:bg-cyan-600 transition-colors"><Plus className="w-4 h-4" /> Create Hackathon</button>
      </PageHeader>
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === t ? 'bg-cyan-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{t}</button>)}
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((h) => <HackathonManageCard key={h.id} hackathon={h} setPage={setPage} />)}
      </div>
    </div>
  );
}

function HackathonManageCard({ hackathon: h, setPage }: { hackathon: OrgHackathon; setPage: (p: OrganizerPageId) => void }) {
  const [showMenu, setShowMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const statusColors: Record<string, string> = {
    'Registration Open': 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300',
    'Hackathon Started': 'text-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 dark:text-cyan-300',
    'Completed': 'text-muted bg-ink-100 dark:bg-ink-800',
    'Draft': 'text-warning-700 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-300',
  };
  return (
    <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-shadow">
      <div className={`h-20 bg-gradient-to-br ${h.gradient} p-4 flex items-end justify-between relative`}>
        <div className="absolute inset-0 bg-black/10" />
        <span className="text-white font-bold text-sm relative">{h.title}</span>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"><MoreVertical className="w-4 h-4" /></button>
          {showMenu && (
            <div className="absolute right-0 top-8 z-10 bg-card border border-default rounded-lg shadow-float p-1 min-w-[140px]">
              <button onClick={() => { setPage('org-registrations'); setShowMenu(false); }} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-ink-50 dark:hover:bg-ink-800/50 text-xs text-body text-left"><Eye className="w-3.5 h-3.5" /> Manage</button>
              <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-ink-50 dark:hover:bg-ink-800/50 text-xs text-body text-left"><Pencil className="w-3.5 h-3.5" /> Edit</button>
              <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-ink-50 dark:hover:bg-ink-800/50 text-xs text-body text-left"><Copy className="w-3.5 h-3.5" /> Duplicate</button>
              <button onClick={() => setConfirmDelete(true)} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-error-50 dark:hover:bg-error-950/30 text-xs text-error-500 text-left"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${statusColors[h.status] || 'text-muted bg-ink-100'}`}>{h.status}</span>
          <span className="text-[10px] font-medium text-muted px-2 py-1 rounded-full bg-ink-50 dark:bg-ink-800/40">{h.level}</span>
          <span className="text-[10px] font-medium text-muted px-2 py-1 rounded-full bg-ink-50 dark:bg-ink-800/40">{h.eligibility}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div><div className="text-muted">Participants</div><div className="font-bold text-body">{h.participants}/{h.maxParticipants}</div></div>
          <div><div className="text-muted">Teams</div><div className="font-bold text-body">{h.teams}</div></div>
          <div><div className="text-muted">Submissions</div><div className="font-bold text-body">{h.submissions}</div></div>
        </div>
        <div className="flex items-center gap-3 mt-3 text-xs text-muted">
          <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> {h.prize}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {h.mode}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {h.deadline}</span>
        </div>
        <button onClick={() => setPage('org-registrations')} className="w-full mt-4 text-sm font-semibold text-white bg-cyan-500 rounded-xl py-2.5 hover:bg-cyan-600 transition-colors">Manage</button>
      </div>
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setConfirmDelete(false)}>
          <div className="bg-card border border-default rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-error-50 dark:bg-error-950/30 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-error-500" /></div><h3 className="text-base font-bold text-body">Delete hackathon?</h3></div>
            <p className="text-sm text-muted mb-5">This action cannot be undone. All registrations, teams, and submissions will be permanently removed.</p>
            <div className="flex gap-2"><button onClick={() => setConfirmDelete(false)} className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-2.5 hover:bg-ink-50 dark:hover:bg-ink-800/40">Cancel</button><button onClick={() => setConfirmDelete(false)} className="flex-1 text-sm font-semibold text-white bg-error-500 rounded-xl py-2.5 hover:bg-error-600">Delete</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

export function OrganizerCreateHackathon() {
  const [step, setStep] = useState(1);
  const steps = ['Basic Info', 'Eligibility', 'Schedule', 'Rewards', 'Rules', 'Community', 'Publish'];
  const [eligibility, setEligibility] = useState('Both');
  const [level, setLevel] = useState('National');
  const [teamMode, setTeamMode] = useState('2-4');
  const [isSolo, setIsSolo] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Create Hackathon" subtitle="Set up your hackathon in a few guided steps." />
      {/* Progress */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i + 1 === step ? 'bg-cyan-500 text-white' : i + 1 < step ? 'bg-success-500 text-white' : 'bg-ink-100 dark:bg-ink-800 text-muted'}`}>{i + 1 < step ? <Check className="w-3.5 h-3.5" /> : i + 1}</div>
            <span className={`ml-2 text-xs font-medium hidden sm:inline ${i + 1 === step ? 'text-body' : 'text-muted'}`}>{s}</span>
            {i < steps.length - 1 && <div className={`w-6 sm:w-12 h-px mx-2 ${i + 1 < step ? 'bg-success-500' : 'bg-ink-200 dark:bg-ink-700'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-card border border-default rounded-2xl p-6 shadow-soft">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-body">Basic Information</h2>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Hackathon Title</label><input placeholder="AI Innovation Hackathon 2026" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Description</label><textarea rows={3} placeholder="Describe your hackathon..." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Poster / Banner Upload</label><div className="border-2 border-dashed border-default rounded-xl p-6 text-center hover:border-cyan-400 transition-colors cursor-pointer"><Plus className="w-8 h-8 text-muted mx-auto mb-2" /><p className="text-xs text-muted">Click to upload or drag and drop</p></div></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-xs font-semibold text-muted mb-1.5 block">Organizer</label><input defaultValue="TechNova Community" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-cyan-400" /></div>
              <div><label className="text-xs font-semibold text-muted mb-1.5 block">Domain</label><input placeholder="AI / GenAI" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
            </div>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Technologies</label><input placeholder="React, Python, TensorFlow..." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Level</label><div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{(['National', 'International', 'State', 'Inter-College'] as const).map((l) => <button key={l} onClick={() => setLevel(l)} className={`text-xs font-semibold px-3 py-2.5 rounded-xl border transition-colors ${level === l ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300' : 'border-default text-muted hover:text-body'}`}>{l}</button>)}</div></div>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Mode</label><div className="grid grid-cols-3 gap-2">{['Online', 'Offline', 'Hybrid'].map((m) => <button key={m} className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-default text-muted hover:text-body hover:border-cyan-400 transition-colors">{m}</button>)}</div></div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-body">Eligibility</h2>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Who can participate?</label><div className="grid grid-cols-3 gap-2">{(['Students Only', 'Working Professionals Only', 'Both'] as const).map((e) => <button key={e} onClick={() => setEligibility(e)} className={`text-xs font-semibold px-3 py-2.5 rounded-xl border transition-colors ${eligibility === e ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300' : 'border-default text-muted hover:text-body'}`}>{e}</button>)}</div></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-xs font-semibold text-muted mb-1.5 block">Graduation Year</label><input placeholder="2020-2026" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
              <div><label className="text-xs font-semibold text-muted mb-1.5 block">Experience Range</label><input placeholder="0-5 years" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
            </div>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Team Size</label><div className="grid grid-cols-3 sm:grid-cols-6 gap-2">{['Solo', '2', '3', '4', 'Custom'].map((t) => <button key={t} onClick={() => { setTeamMode(t); setIsSolo(t === 'Solo'); }} className={`text-xs font-semibold px-3 py-2.5 rounded-xl border transition-colors ${teamMode === t ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300' : 'border-default text-muted hover:text-body'}`}>{t}</button>)}</div></div>
            {isSolo && <div className="p-4 rounded-xl bg-warning-50 dark:bg-warning-950/30 border border-warning-200 dark:border-warning-800"><div className="flex items-center gap-2 text-xs font-semibold text-warning-700 dark:text-warning-300"><AlertTriangle className="w-4 h-4" /> Solo Hackathon Mode</div><p className="text-xs text-muted mt-1.5">Team formation, Find Teammates, and Team Invitations are automatically disabled. Only FAQ and General Discussion channels will be available.</p></div>}
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Location Restrictions</label><input placeholder="India only, or open globally..." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-body">Schedule</h2>
            <p className="text-sm text-muted">Configure the timeline for your hackathon. Dates will be shown visually as you set them.</p>
            {['Registration opens', 'Registration closes', 'Team formation deadline', 'Hackathon start', 'Submission deadline', 'Judging', 'Results'].map((label) => (
              <div key={label} className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" /><div className="flex-1"><label className="text-xs font-semibold text-body">{label}</label></div><input type="date" className="bg-ink-50 dark:bg-ink-800/40 border border-default rounded-lg px-3 py-2 text-sm text-body outline-none focus:border-cyan-400" /></div>
            ))}
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-body">Rewards</h2>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Prize Pool</label><input defaultValue="₹2,00,000" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-cyan-400" /></div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div><label className="text-xs font-semibold text-muted mb-1.5 block">1st Prize</label><input placeholder="₹1,00,000" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
              <div><label className="text-xs font-semibold text-muted mb-1.5 block">2nd Prize</label><input placeholder="₹50,000" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
              <div><label className="text-xs font-semibold text-muted mb-1.5 block">3rd Prize</label><input placeholder="₹25,000" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
            </div>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Special Awards</label><input placeholder="Best UI/UX, Best Innovation, People's Choice..." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Opportunities</label><div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{['Internship', 'PPO', 'Job Interview', 'Certificate'].map((o) => <label key={o} className="flex items-center gap-2 text-xs font-medium text-body cursor-pointer"><input type="checkbox" className="rounded border-default text-cyan-500 focus:ring-cyan-400" /> {o}</label>)}</div></div>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Opportunity Description</label><textarea rows={2} placeholder="Describe the opportunities winners will receive..." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
          </div>
        )}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-body">Rules & Guidelines</h2>
            {['Rules', 'Problem Statements', 'Submission Requirements', 'Judging Criteria', 'Code of Conduct', 'FAQs'].map((label) => (
              <div key={label}><label className="text-xs font-semibold text-muted mb-1.5 block">{label}</label><textarea rows={3} placeholder={`Enter ${label.toLowerCase()}...`} className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
            ))}
          </div>
        )}
        {step === 6 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-body">Community</h2>
            <p className="text-sm text-muted">Default groups are created automatically. You can add custom groups below.</p>
            <div className="space-y-2">
              {['# General', '# FAQ', '# Find Members', '# Team Formation'].map((g) => (
                <div key={g} className="flex items-center gap-2 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-default"><span className="text-sm font-medium text-body">{g}</span><span className="text-[10px] text-muted ml-auto">Default</span></div>
              ))}
            </div>
            <div className="flex gap-2"><input placeholder="Custom group name..." className="flex-1 bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /><button className="text-sm font-semibold text-white bg-cyan-500 rounded-xl px-4 py-3 hover:bg-cyan-600 transition-colors"><Plus className="w-4 h-4" /></button></div>
            <div className="flex flex-wrap gap-2">{['# AI-ML Discussion', '# Blockchain', '# Design'].map((g) => <span key={g} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">{g}<X className="w-3 h-3 cursor-pointer" /></span>)}</div>
          </div>
        )}
        {step === 7 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-body">Publish</h2>
            <p className="text-sm text-muted">Review your hackathon before publishing. This is how participants will see it.</p>
            <div className="border border-default rounded-2xl overflow-hidden">
              <div className="h-24 bg-gradient-to-br from-cyan-500 to-brand-700 p-4 flex items-end"><span className="text-white font-bold">AI Innovation Hackathon 2026</span></div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-success-600 dark:text-success-400"><ShieldCheck className="w-4 h-4" /> Verified Organizer</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div><div className="text-xs text-muted">Prize</div><div className="font-bold text-body">₹2,00,000</div></div>
                  <div><div className="text-xs text-muted">Domain</div><div className="font-bold text-body">AI / GenAI</div></div>
                  <div><div className="text-xs text-muted">Mode</div><div className="font-bold text-body">Online</div></div>
                  <div><div className="text-xs text-muted">Team Size</div><div className="font-bold text-body">{isSolo ? 'Solo' : '2-4 Members'}</div></div>
                  <div><div className="text-xs text-muted">Level</div><div className="font-bold text-body">{level}</div></div>
                  <div><div className="text-xs text-muted">Eligibility</div><div className="font-bold text-body">{eligibility}</div></div>
                  <div><div className="text-xs text-muted">Capacity</div><div className="font-bold text-body">500</div></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-default">
          <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="text-sm font-semibold text-muted border border-default rounded-xl px-4 py-2.5 hover:text-body disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Back</button>
          {step < 7 ? <button onClick={() => setStep(step + 1)} className="text-sm font-semibold text-white bg-cyan-500 rounded-xl px-4 py-2.5 hover:bg-cyan-600 transition-colors">Next</button> : <div className="flex gap-2"><button className="text-sm font-semibold text-body border border-default rounded-xl px-4 py-2.5 hover:bg-ink-50 dark:hover:bg-ink-800/40">Save Draft</button><button className="text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-xl px-4 py-2.5 hover:shadow-float transition-all">Publish Hackathon</button></div>}
        </div>
      </div>
    </div>
  );
}

export function OrganizerRegistrations() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedHackathon, setSelectedHackathon] = useState('h1');
  const filters = ['All', 'Pending', 'Accepted', 'Rejected', 'Waitlisted'];
  const hackathon = orgHackathons.find((h) => h.id === selectedHackathon) ?? orgHackathons[0];
  const hackathonParticipants = orgParticipants.filter((p) => p.hackathonId === selectedHackathon);
  const filtered = hackathonParticipants.filter((p) => (filter === 'All' || p.status === filter) && (!search || p.name.toLowerCase().includes(search.toLowerCase())));
  const totalReg = hackathon.participants;
  const maxReg = hackathon.maxParticipants;
  const pct = Math.round((totalReg / maxReg) * 100);

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Registrations" subtitle={`Manage participant registrations for ${hackathon.title}.`} />
      <HackathonSelector selectedId={selectedHackathon} onSelect={setSelectedHackathon} />
      {/* Capacity */}
      <div className="bg-card border border-default rounded-2xl p-5 mb-6 shadow-soft">
        <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-body">Registration Capacity</h3><span className="text-lg font-bold text-body">{totalReg} / {maxReg}</span></div>
        <div className="h-3 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden mb-2"><div className={`h-full rounded-full ${pct >= 90 ? 'bg-error-500' : pct >= 80 ? 'bg-warning-500' : 'bg-gradient-to-r from-cyan-500 to-brand-500'}`} style={{ width: `${pct}%` }} /></div>
        {pct >= 90 ? <p className="text-xs text-error-600 dark:text-error-400 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Only {maxReg - totalReg} registration slots remaining.</p> : pct >= 80 ? <p className="text-xs text-warning-600 dark:text-warning-400 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Registration capacity approaching.</p> : <p className="text-xs text-muted">{maxReg - totalReg} slots remaining.</p>}
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search participants..." className="w-full bg-card border border-default rounded-xl pl-10 pr-4 py-2.5 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" /></div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">{filters.map((f) => <button key={f} onClick={() => setFilter(f)} className={`whitespace-nowrap px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${filter === f ? 'bg-cyan-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{f}</button>)}</div>
      </div>
      {/* Table */}
      <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 dark:bg-ink-800/40 text-xs text-muted">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Participant</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Skills</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Domain</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Experience</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Team</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-ink-50/50 dark:hover:bg-ink-800/20">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar initials={p.initials} gradient={p.gradient} size="sm" ring={false} /><div><div className="font-semibold text-body text-sm">{p.name}</div><div className="text-[10px] text-muted">{p.registrationDate}</div></div></div></td>
                  <td className="px-4 py-3 hidden md:table-cell"><div className="flex flex-wrap gap-1">{p.skills.slice(0, 3).map((s) => <SkillChip key={s} label={s} size="sm" />)}</div></td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted">{p.domain}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted">{p.experience}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted">{p.team}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${p.status === 'Accepted' ? 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300' : p.status === 'Pending' ? 'text-warning-700 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-300' : p.status === 'Rejected' ? 'text-error-700 bg-error-50 dark:bg-error-950/40 dark:text-error-300' : 'text-muted bg-ink-100 dark:bg-ink-800'}`}>{p.status}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center justify-end gap-1"><button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"><Eye className="w-3.5 h-3.5" /></button>{p.status === 'Pending' && <><button className="w-7 h-7 rounded-lg flex items-center justify-center text-success-500 hover:bg-success-50 dark:hover:bg-success-950/40"><Check className="w-3.5 h-3.5" /></button><button className="w-7 h-7 rounded-lg flex items-center justify-center text-error-500 hover:bg-error-50 dark:hover:bg-error-950/30"><X className="w-3.5 h-3.5" /></button></>}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function OrganizerTeams() {
  const [selectedHackathon, setSelectedHackathon] = useState('h1');
  const filteredTeams = orgTeams.filter((t) => t.hackathonId === selectedHackathon);
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Teams" subtitle="Manage teams, their projects, and progress." />
      <HackathonSelector selectedId={selectedHackathon} onSelect={setSelectedHackathon} />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredTeams.map((t) => (
          <div key={t.id} className="bg-card border border-default rounded-2xl p-5 shadow-soft hover:shadow-card transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-body">{t.name}</h3>
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${t.status === 'Active' ? 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300' : 'text-muted bg-ink-100 dark:bg-ink-800'}`}>{t.status}</span>
            </div>
            <div className="text-sm text-body font-medium mb-2">{t.project}</div>
            <div className="flex flex-wrap gap-1.5 mb-3">{t.skills.map((s) => <SkillChip key={s} label={s} size="sm" />)}</div>
            <div className="flex -space-x-2 mb-4">{t.members.map((m) => <Avatar key={m.initials} initials={m.initials} gradient={m.gradient} size="sm" />)}</div>
            <div className="flex items-center justify-between text-xs mb-2"><span className="text-muted">Progress</span><span className="font-bold text-body">{t.progress}%</span></div>
            <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden mb-3"><div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-brand-500" style={{ width: `${t.progress}%` }} /></div>
            <div className="flex items-center justify-between text-xs"><span className="text-muted">Submission: {t.submissionStatus}</span><div className="flex gap-1"><button className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">View Team</button><button className="text-xs font-semibold text-muted">View Project</button></div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrganizerAnnouncements() {
  const [showComposer, setShowComposer] = useState(false);
  const [tab, setTab] = useState('Sent');
  const tabs = ['Sent', 'Scheduled', 'Draft'];
  const filtered = orgAnnouncements.filter((a) => a.status === tab.charAt(0).toUpperCase() + tab.slice(1));

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Announcements" subtitle="Communicate with your participants.">
        <button onClick={() => setShowComposer(!showComposer)} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-cyan-500 px-4 py-2.5 rounded-xl hover:bg-cyan-600 transition-colors"><Plus className="w-4 h-4" /> New Announcement</button>
      </PageHeader>
      {showComposer && (
        <div className="bg-card border border-default rounded-2xl p-5 mb-6 shadow-soft">
          <div className="space-y-3">
            <input placeholder="Announcement title..." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" />
            <textarea rows={3} placeholder="Write your announcement..." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-cyan-400" />
            <div className="grid sm:grid-cols-2 gap-3">
              <select className="bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-cyan-400"><option>All registered participants</option><option>Specific teams</option><option>Specific group</option><option>Specific participants</option></select>
              <select className="bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-cyan-400"><option>Send now</option><option>Schedule for later</option></select>
            </div>
            <div className="flex gap-2"><button className="text-sm font-semibold text-white bg-cyan-500 rounded-xl px-4 py-2.5 hover:bg-cyan-600 transition-colors">Send Announcement</button><button onClick={() => setShowComposer(false)} className="text-sm font-semibold text-muted border border-default rounded-xl px-4 py-2.5 hover:text-body">Cancel</button></div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">{tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === t ? 'bg-cyan-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{t}</button>)}</div>
      <div className="space-y-4">
        {filtered.map((a) => (
          <div key={a.id} className="bg-card border border-default rounded-2xl p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2"><Megaphone className="w-4 h-4 text-cyan-500" /><h3 className="text-sm font-bold text-body">{a.title}</h3></div>
              <span className="text-[10px] text-muted">{a.sentTime}</span>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-3">{a.message}</p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted pt-3 border-t border-default">
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {a.views} views</span>
              <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> {a.readPercentage}% read</span>
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5" /> {a.audience}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrganizerCommunity() {
  const [activeChannel, setActiveChannel] = useState('general');
  const [members, setMembers] = useState(orgCommunityMembers);

  const toggleModerator = (name: string) => {
    setMembers((prev) => prev.map((m) => m.name === name ? { ...m, role: m.role === 'Moderator' ? 'Member' : 'Moderator' } : m));
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Community" subtitle="Manage your hackathon community workspace." />
      <div className="grid lg:grid-cols-[220px_1fr_240px] gap-4 lg:h-[calc(100vh-220px)] min-h-[400px] lg:min-h-[500px] flex flex-col lg:grid">
        {/* Channels */}
        <div className="hidden lg:flex flex-col bg-card border border-default rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-default"><div className="flex items-center justify-between"><span className="text-sm font-bold text-body">Channels</span><button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"><Plus className="w-4 h-4" /></button></div></div>
          <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {orgCommunityChannels.map((c) => <button key={c.name} onClick={() => setActiveChannel(c.name)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeChannel === c.name ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300' : 'text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50'}`}><span className="text-muted">#</span>{c.name}</button>)}
          </div>
        </div>
        {/* Chat */}
        <div className="flex flex-col bg-card border border-default rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-default"><div className="flex items-center gap-2"><span className="text-muted">#</span><span className="text-sm font-bold text-body">{activeChannel}</span></div><div className="flex items-center gap-1"><button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"><Pin className="w-4 h-4" /></button><button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"><Shield className="w-4 h-4" /></button></div></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {orgCommunityMessages.map((m, i) => (
              <div key={i} className="group flex gap-3 hover:bg-ink-50/50 dark:hover:bg-ink-800/20 -mx-2 px-2 py-1 rounded-lg">
                <Avatar initials={m.initials} gradient={m.gradient} size="sm" />
                <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="text-sm font-semibold text-body">{m.name}</span>{m.role === 'moderator' && <span className="text-[9px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-1.5 py-0.5 rounded">MOD</span>}<span className="text-[10px] text-muted">{m.time}</span></div><p className="text-sm text-body mt-0.5">{m.text}</p></div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 flex-shrink-0"><button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-950/30" title="Report"><Flag className="w-3.5 h-3.5" /></button><button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-950/30" title="Ban"><Ban className="w-3.5 h-3.5" /></button></div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-default"><div className="flex items-center gap-2 bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-3 py-2"><input placeholder={`Message #${activeChannel}...`} className="flex-1 min-w-0 bg-transparent text-sm text-body placeholder:text-muted outline-none" /><button className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition-colors"><Send className="w-3.5 h-3.5 text-white" /></button></div></div>
        </div>
        {/* Members */}
        <div className="hidden lg:flex flex-col bg-card border border-default rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-default"><span className="text-sm font-bold text-body">Members</span></div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {members.map((m) => (
              <div key={m.name} className="group flex items-center gap-2.5">
                <div className="relative"><Avatar initials={m.initials} gradient={m.gradient} size="sm" ring={false} /><span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-ink-900 ${m.status === 'online' ? 'bg-success-500' : m.status === 'idle' ? 'bg-warning-500' : 'bg-ink-400'}`} /></div>
                <div className="flex-1 min-w-0"><div className="text-xs font-semibold text-body truncate">{m.name}</div><div className="text-[10px] text-muted">{m.role}</div></div>
                <button onClick={() => toggleModerator(m.name)} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${m.role === 'Moderator' ? 'text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/40' : 'text-muted opacity-0 group-hover:opacity-100 hover:text-cyan-500 hover:bg-ink-50 dark:hover:bg-ink-800/50'}`} title={m.role === 'Moderator' ? 'Demote to Member' : 'Promote to Moderator'}><Shield className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrganizerSubmissions() {
  const [filter, setFilter] = useState('All');
  const [selectedHackathon, setSelectedHackathon] = useState('h1');
  const filters = ['All', 'Submitted', 'Pending', 'Late', 'Reviewed'];
  const hackathonSubmissions = orgSubmissions.filter((s) => s.hackathonId === selectedHackathon);
  const filtered = filter === 'All' ? hackathonSubmissions : hackathonSubmissions.filter((s) => s.status === filter);
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Submissions" subtitle="Review and manage project submissions." />
      <HackathonSelector selectedId={selectedHackathon} onSelect={setSelectedHackathon} />
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">{filters.map((f) => <button key={f} onClick={() => setFilter(f)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === f ? 'bg-cyan-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{f}</button>)}</div>
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((s) => (
          <div key={s.id} className="bg-card border border-default rounded-2xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3"><h3 className="text-base font-bold text-body">{s.team}</h3><span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${s.status === 'Reviewed' ? 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300' : s.status === 'Submitted' ? 'text-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 dark:text-cyan-300' : s.status === 'Late' ? 'text-error-700 bg-error-50 dark:bg-error-950/40 dark:text-error-300' : 'text-warning-700 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-300'}`}>{s.status}</span></div>
            <p className="text-sm font-medium text-body mb-2">{s.projectName}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">{s.techStack.map((t) => <SkillChip key={t} label={t} size="sm" />)}</div>
            <div className="flex items-center gap-3 text-xs text-muted mb-4"><span className="flex items-center gap-1"><Github className="w-3.5 h-3.5" /> GitHub</span>{s.liveDemo && <span className="flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5" /> Live Demo</span>}<span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" /> Video</span><span className="ml-auto">{s.submittedAt}</span></div>
            {s.score && <div className="flex items-center gap-2 mb-3 p-2.5 rounded-lg bg-success-50 dark:bg-success-950/30"><Trophy className="w-4 h-4 text-warning-500" /><span className="text-sm font-bold text-body">Score: {s.score}/100</span><span className="text-xs text-muted">by {s.assignedJudge}</span></div>}
            <div className="flex gap-2"><button className="flex-1 text-xs font-semibold text-body border border-default rounded-lg py-2.5 hover:border-cyan-400">View Project</button><button className="flex-1 text-xs font-semibold text-white bg-cyan-500 rounded-lg py-2.5 hover:bg-cyan-600">Assign Judge</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrganizerJudging() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Judging" subtitle="Manage judges, assignments, and scoring." />
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* Judge assignment */}
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Judge Assignments</h3>
          <div className="space-y-3">
            {orgJudges.map((j) => (
              <div key={j.id} className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                <Avatar initials={j.initials} gradient={j.gradient} size="md" />
                <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-body">{j.name}</div><div className="text-xs text-muted">{j.assignedTeams} teams assigned</div></div>
                <div className="text-right"><div className="text-sm font-bold text-success-600 dark:text-success-400">{j.completedEvaluations}</div><div className="text-[10px] text-muted">completed</div></div>
                <div className="text-right"><div className="text-sm font-bold text-warning-600 dark:text-warning-400">{j.pendingEvaluations}</div><div className="text-[10px] text-muted">pending</div></div>
              </div>
            ))}
          </div>
        </div>
        {/* Scoring rubric */}
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Scoring Rubric</h3>
          <div className="space-y-3">
            {judgingCriteria.map((c) => (
              <div key={c.criteria}><div className="flex items-center justify-between text-sm mb-1"><span className="text-body font-medium">{c.criteria}</span><span className="text-muted font-semibold">{c.weight}%</span></div><div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-brand-500" style={{ width: `${c.weight * 3.33}%` }} /></div></div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-default flex items-center justify-between"><span className="text-sm font-bold text-body">Total Score</span><span className="text-lg font-extrabold text-gradient">91/100</span></div>
        </div>
      </div>
      {/* Scored submissions */}
      <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
        <h3 className="text-sm font-bold text-body mb-4">Scored Submissions</h3>
        <div className="space-y-3">
          {orgSubmissions.filter((s) => s.score).map((s) => (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
              <Scale className="w-4 h-4 text-cyan-500" />
              <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-body">{s.team} — {s.projectName}</div><div className="text-xs text-muted">Judge: {s.assignedJudge}</div></div>
              <div className="text-lg font-extrabold text-gradient">{s.score}/100</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OrganizerWinners() {
  const [selectedHackathon, setSelectedHackathon] = useState('h1');
  const hackathonWinners = orgWinners.filter((w) => w.hackathonId === selectedHackathon);
  const hackathonAwards = orgSpecialAwards.filter((a) => a.hackathonId === selectedHackathon);
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Winners & Results" subtitle="Celebrate and publish your hackathon results." />
      <HackathonSelector selectedId={selectedHackathon} onSelect={setSelectedHackathon} />
      <div className="grid sm:grid-cols-3 gap-5 mb-6">
        {hackathonWinners.map((w) => (
          <div key={w.place} className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
            <div className={`h-24 bg-gradient-to-br ${w.gradient} p-4 flex items-center justify-center`}><Trophy className="w-8 h-8 text-white" /></div>
            <div className="p-5 text-center">
              <div className="text-xs font-bold text-muted uppercase tracking-wider">{w.place} Place</div>
              <div className="text-lg font-bold text-body mt-1">{w.team}</div>
              <div className="text-xs text-muted mt-1">{w.project}</div>
              <div className="text-2xl font-extrabold text-gradient mt-3">{w.score}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-default rounded-2xl p-5 shadow-soft mb-6">
        <h3 className="text-sm font-bold text-body mb-4">Special Awards</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {hackathonAwards.map((a) => (
            <div key={a.award} className="flex items-center gap-3 p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-warning-400 to-warning-600 flex items-center justify-center"><Star className="w-5 h-5 text-white" /></div>
              <div><div className="text-sm font-bold text-body">{a.award}</div><div className="text-xs text-muted">{a.team} — {a.project}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
        <h3 className="text-sm font-bold text-body mb-2">Publish Results</h3>
        <p className="text-sm text-muted mb-4">When you publish results, winner badges are automatically awarded, projects become publicly visible, and hackathon participation is added to each participant's profile.</p>
        <button className="text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-xl px-4 py-2.5 hover:shadow-float transition-all">Publish Results</button>
      </div>
    </div>
  );
}

export function OrganizerAnalytics() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Analytics" subtitle="Deep insights into your hackathon performance." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[{ label: 'Registration Growth', value: '+18%', icon: TrendingUp }, { label: 'Submission Rate', value: '72%', icon: FolderGit2 }, { label: 'Engagement', value: '85%', icon: BarChart3 }, { label: 'Judging Completion', value: '55%', icon: Scale }].map((m) => {
          const Icon = m.icon;
          return <div key={m.label} className="bg-card border border-default rounded-2xl p-5 shadow-soft"><div className="flex items-center justify-between mb-2"><div className="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 flex items-center justify-center"><Icon className="w-4.5 h-4.5 text-cyan-500" /></div></div><div className="text-xl font-extrabold text-body">{m.value}</div><div className="text-xs text-muted">{m.label}</div></div>;
        })}
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Registration Trend</h3>
          <div className="flex items-end gap-1 h-40">{registrationTrend.map((v, i) => <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500 to-cyan-300 dark:from-cyan-600 dark:to-cyan-400" style={{ height: `${(v / registrationTrend[registrationTrend.length - 1]) * 100}%` }} />)}</div>
        </div>
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Skill Distribution</h3>
          <div className="space-y-3">{['React', 'Node.js', 'Python', 'TypeScript', 'ML/AI', 'UI/UX'].map((s, i) => <div key={s}><div className="flex items-center justify-between text-xs mb-1"><span className="text-body font-medium">{s}</span><span className="text-muted">{[42, 38, 35, 28, 22, 18][i]}%</span></div><div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-brand-500" style={{ width: `${[42, 38, 35, 28, 22, 18][i]}%` }} /></div></div>)}</div>
        </div>
      </div>
    </div>
  );
}

export function OrganizerProfile({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Organization Profile" subtitle="Manage your organization's public profile.">
        <button onClick={onLogout} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-error-500 px-4 py-2.5 rounded-xl hover:bg-error-600 transition-colors"><LogOut className="w-4 h-4" /> Logout</button>
      </PageHeader>
      <div className="bg-gradient-to-r from-cyan-50 to-brand-50 dark:from-cyan-950/30 dark:to-brand-950/20 border border-default rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-cyan-500/10 blur-[60px] pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start gap-5 relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center flex-shrink-0"><Building2 className="w-8 h-8 text-white" /></div>
          <div className="flex-1"><h2 className="text-2xl font-bold text-body">TechNova Community</h2><div className="flex items-center gap-2 mt-2"><span className="inline-flex items-center gap-1 text-xs font-medium text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/50 px-2 py-1 rounded-md"><ShieldCheck className="w-3 h-3" /> Verified Organizer</span></div><p className="text-sm text-muted mt-3 max-w-lg">TechNova Community is a developer community focused on organizing hackathons that bring together students and professionals to build innovative solutions.</p></div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted"><Globe className="w-4 h-4" /><span>technova.community</span></div>
            <div className="flex items-center gap-2 text-muted"><Building2 className="w-4 h-4" /><span>Mumbai, India</span></div>
            <div className="flex items-center gap-2 text-muted"><Users className="w-4 h-4" /><span>15K+ community members</span></div>
          </div>
        </div>
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-lg font-bold text-body">12</div><div className="text-[10px] text-muted">Hackathons</div></div>
            <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-lg font-bold text-body">8,500+</div><div className="text-[10px] text-muted">Participants</div></div>
            <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-lg font-bold text-body">94</div><div className="text-[10px] text-muted">Reputation</div></div>
            <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-lg font-bold text-body">3</div><div className="text-[10px] text-muted">Upcoming</div></div>
          </div>
        </div>
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Previous Hackathons</h3>
          <div className="space-y-2">{orgHackathons.filter((h) => h.status === 'Completed').map((h) => <div key={h.id} className="text-sm text-body font-medium">{h.title}</div>)}</div>
        </div>
      </div>
    </div>
  );
}

export function OrganizerSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Settings" subtitle="Manage your organizer account and preferences." />
      <div className="space-y-5">
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4 flex items-center gap-2"><SettingsIcon className="w-4 h-4 text-cyan-500" /> Account</h3>
          <div className="space-y-3"><div><label className="text-xs font-semibold text-muted mb-1.5 block">Organizer Name</label><input defaultValue="TechNova Community" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-cyan-400" /></div><div><label className="text-xs font-semibold text-muted mb-1.5 block">Email</label><input defaultValue="contact@technova.community" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-cyan-400" /></div><div><label className="text-xs font-semibold text-muted mb-1.5 block">Password</label><input type="password" defaultValue="password" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-cyan-400" /></div></div>
        </div>
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-cyan-500" /> Notifications</h3>
          <div className="space-y-3">{['Email notifications', 'Push notifications', 'Announcement read receipts'].map((n) => <label key={n} className="flex items-center justify-between text-sm text-body"><span>{n}</span><input type="checkbox" defaultChecked className="rounded border-default text-cyan-500 focus:ring-cyan-400" /></label>)}</div>
        </div>
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4 text-cyan-500" /> Billing</h3>
          <div className="flex items-center justify-between mb-4"><div><div className="text-sm font-semibold text-body">Free Plan</div><div className="text-xs text-muted">Up to 500 participants</div></div><div className="text-right"><div className="text-sm font-bold text-body">427 / 500</div><div className="text-xs text-muted">Current usage</div></div></div>
          <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden mb-4"><div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-brand-500" style={{ width: '85.4%' }} /></div>
          <button className="text-sm font-semibold text-white bg-cyan-500 rounded-xl px-4 py-2.5 hover:bg-cyan-600 transition-colors">Upgrade Plan</button>
        </div>
      </div>
    </div>
  );
}
