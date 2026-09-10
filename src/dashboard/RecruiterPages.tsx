import { useState } from 'react';
import {
  Sparkles, Star, Send, UserCheck, Briefcase, Search, Plus, X,
  Check, Trophy, Github, ExternalLink, FileText, Eye, Users,
  Filter, ArrowUpDown, Bookmark, Building2, ShieldCheck, Globe,
  Calendar, MapPin, Clock, TrendingUp, AlertTriangle, Flag,
  MessageSquare, ChevronDown, Rocket, Award, Target, Mail,
  CheckCircle2, Circle, ArrowRight, Layers, Zap, Download,
} from 'lucide-react';
import {
  candidates, roles, invitations, candidateGroups, savedSearches,
  recruiterKPIs, hiringPipeline, hiringActivity, recruiterCompany,
  recruiterProfile, defaultMatchWeights, allFilterSkills, allFilterDomains,
  recruiterMessages, isUsernameAvailable,
} from '@/dashboard/recruiter-data';
import type { RecruiterPageId, Candidate, MatchBreakdown, CandidateGroup } from '@/dashboard/recruiter-data';
import { Avatar, SkillChip, PageHeader } from '@/dashboard/components';

/* ── Helpers ── */

function MatchScoreRing({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 'w-12 h-12 text-sm', md: 'w-16 h-16 text-lg', lg: 'w-20 h-20 text-xl' };
  const stroke = size === 'sm' ? 4 : 6;
  const r = 42;
  const circ = 2 * Math.PI * r;
  const color = score >= 90 ? 'text-success-500' : score >= 80 ? 'text-brand-500' : 'text-warning-500';
  return (
    <div className={`relative ${dims[size]} flex items-center justify-center`}>
      <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-ink-100 dark:text-ink-800" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${circ * score / 100} ${circ}`} className={color} />
      </svg>
      <span className="relative font-extrabold text-body">{score}<span className="text-[10px] text-muted">%</span></span>
    </div>
  );
}

function MatchBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted whitespace-nowrap">{label}</span>
      <div className="flex items-center gap-2 flex-1 max-w-[160px]">
        <div className="h-1.5 flex-1 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-success-500 to-cyan-400" style={{ width: `${value}%` }} />
        </div>
        <span className="text-xs font-semibold text-body tabular-nums w-8 text-right">{value}%</span>
      </div>
    </div>
  );
}

function getHackathonIcon(level: string, result: string) {
  if (result === 'Winner') {
    if (level === 'International') return { icon: Trophy, color: 'text-warning-500', label: 'International Hackathon Winner' };
    if (level === 'National') return { icon: Award, color: 'text-warning-600', label: 'National Hackathon Winner' };
    if (level === 'State') return { icon: Award, color: 'text-brand-500', label: 'State Hackathon Winner' };
    return { icon: Award, color: 'text-cyan-500', label: `${level} Hackathon Winner` };
  }
  if (result === 'Finalist') return { icon: Star, color: 'text-brand-500', label: `${level} Hackathon Finalist` };
  return { icon: CheckCircle2, color: 'text-success-500', label: `${level} Hackathon Participant` };
}

function SkillMatchList({ skills }: { skills: { skill: string; matched: boolean }[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {skills.map((s) => (
        <span key={s.skill} className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md ${s.matched ? 'bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300' : 'bg-error-50 text-error-600 dark:bg-error-950/30 dark:text-error-400'}`}>
          {s.matched ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
          {s.skill}
        </span>
      ))}
    </div>
  );
}

function EvidenceBadges({ candidate }: { candidate: Candidate }) {
  const topHackathon = candidate.hackathons.find((h) => h.result === 'Winner' && h.verified);
  const hIcon = topHackathon ? getHackathonIcon(topHackathon.level, topHackathon.result) : null;
  return (
    <div className="flex flex-wrap gap-2">
      {hIcon && (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-warning-700 dark:text-warning-400 bg-warning-50 dark:bg-warning-950/40 px-2 py-1 rounded-md">
          <Trophy className="w-3 h-3" /> {topHackathon!.level} Winner
        </span>
      )}
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 px-2 py-1 rounded-md">
        <Rocket className="w-3 h-3" /> {candidate.projects.length} Projects
      </span>
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-2 py-1 rounded-md">
        <Github className="w-3 h-3" /> {candidate.githubCommits} commits
      </span>
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/40 px-2 py-1 rounded-md">
        <Star className="w-3 h-3" /> Rep {candidate.reputation}/100
      </span>
    </div>
  );
}

/* ── Candidate Card ── */

function CandidateCard({
  candidate,
  rank,
  selected,
  onToggleSelect,
  onViewProfile,
  onShortlist,
  onInvite,
  showRank = true,
}: {
  candidate: Candidate;
  rank?: number;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onViewProfile: (c: Candidate) => void;
  onShortlist: (c: Candidate) => void;
  onInvite: (c: Candidate) => void;
  showRank?: boolean;
}) {
  return (
    <div className={`bg-card border rounded-2xl p-5 shadow-soft transition-all hover:shadow-card ${selected ? 'border-success-400 ring-2 ring-success-400/30' : 'border-default'}`}>
      <div className="flex items-start gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {showRank && rank && (
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${rank === 1 ? 'bg-warning-100 text-warning-700 dark:bg-warning-950/40 dark:text-warning-400' : rank === 2 ? 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300' : rank === 3 ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400' : 'bg-ink-50 text-muted dark:bg-ink-800/50'}`}>
              #{rank}
            </div>
          )}
          <Avatar initials={candidate.initials} gradient={candidate.gradient} size="md" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-body truncate">{candidate.name}</h3>
            <p className="text-xs text-muted">@{candidate.username} · {candidate.role} · {candidate.domain}</p>
          </div>
        </div>
        <MatchScoreRing score={candidate.overallMatch} size="sm" />
      </div>

      <div className="mt-3">
        <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1.5">Required Skills</p>
        <SkillMatchList skills={candidate.requiredSkillsMatch} />
      </div>

      <div className="mt-3">
        <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1.5">Evidence</p>
        <EvidenceBadges candidate={candidate} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
        <MatchBar label="Skill Match" value={candidate.matchBreakdown.skillMatch} />
        <MatchBar label="Project Match" value={candidate.matchBreakdown.projectRelevance} />
        <MatchBar label="Hackathon" value={candidate.matchBreakdown.hackathonEvidence} />
        <MatchBar label="ATS Score" value={candidate.atsScore} />
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-muted">
        <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {candidate.graduationYear}</span>
        <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {candidate.location}</span>
        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {candidate.availability}</span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button onClick={() => onViewProfile(candidate)} className="flex-1 text-xs font-semibold text-body border border-default rounded-lg py-2 hover:border-success-400 transition-colors inline-flex items-center justify-center gap-1.5"><Eye className="w-3.5 h-3.5" /> View Profile</button>
        <button onClick={() => onShortlist(candidate)} className={`text-xs font-semibold rounded-lg py-2 px-3 transition-colors inline-flex items-center gap-1.5 ${candidate.shortlisted ? 'text-warning-600 bg-warning-50 dark:bg-warning-950/40' : 'text-body border border-default hover:border-warning-400'}`}><Star className="w-3.5 h-3.5" /> {candidate.shortlisted ? 'Shortlisted' : 'Shortlist'}</button>
        <button onClick={() => onInvite(candidate)} className="text-xs font-semibold text-white bg-success-500 rounded-lg py-2 px-3 hover:bg-success-600 transition-colors inline-flex items-center gap-1.5"><Send className="w-3.5 h-3.5" /> Invite</button>
      </div>

      <label className="mt-3 flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={selected} onChange={() => onToggleSelect(candidate.id)} className="rounded border-default text-success-500 focus:ring-success-400" />
        <span className="text-xs text-muted">Select candidate</span>
      </label>
    </div>
  );
}

/* ── Bulk Selection Bar ── */

function BulkActionBar({ count, onShortlist, onInvite, onCreateGroup, onClear }: { count: number; onShortlist: () => void; onInvite: () => void; onCreateGroup: () => void; onClear: () => void }) {
  if (count === 0) return null;
  return (
    <div className="sticky top-16 z-20 mb-4 bg-success-50 dark:bg-success-950/30 border border-success-200 dark:border-success-800 rounded-2xl px-4 py-3 flex flex-wrap items-center gap-3 shadow-card">
      <span className="text-sm font-bold text-success-700 dark:text-success-400">{count} candidate{count > 1 ? 's' : ''} selected</span>
      <div className="flex items-center gap-2 ml-auto">
        <button onClick={onShortlist} className="text-xs font-semibold text-body border border-default bg-card rounded-lg px-3 py-1.5 hover:border-warning-400 transition-colors inline-flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> Shortlist</button>
        <button onClick={onInvite} className="text-xs font-semibold text-white bg-success-500 rounded-lg px-3 py-1.5 hover:bg-success-600 transition-colors inline-flex items-center gap-1.5"><Send className="w-3.5 h-3.5" /> Invite</button>
        <button onClick={onCreateGroup} className="text-xs font-semibold text-white bg-brand-500 rounded-lg px-3 py-1.5 hover:bg-brand-600 transition-colors inline-flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Create Group</button>
        <button onClick={onClear} className="text-xs font-semibold text-muted hover:text-error-500 rounded-lg px-3 py-1.5 transition-colors">Clear</button>
      </div>
    </div>
  );
}

/* ── Filter Drawer ── */

function FilterDrawer({ open, onClose, filters, setFilters }: { open: boolean; onClose: () => void; filters: Record<string, string[]>; setFilters: (f: Record<string, string[]>) => void }) {
  const toggle = (key: string, val: string) => {
    const current = filters[key] || [];
    setFilters({ ...filters, [key]: current.includes(val) ? current.filter((v) => v !== val) : [...current, val] });
  };
  const sections = [
    { key: 'skills', label: 'Skills', options: allFilterSkills },
    { key: 'gradYear', label: 'Graduation Year', options: ['2026', '2027', '2028'] },
    { key: 'experience', label: 'Experience', options: ['0-1', '1-2', '2-3', '3+'] },
    { key: 'domain', label: 'Domain', options: allFilterDomains },
    { key: 'hackathonCount', label: 'Hackathon Participation', options: ['Any', '1+', '3+', '5+'] },
    { key: 'hackathonResult', label: 'Hackathon Results', options: ['Winner', 'Finalist', 'Participant'] },
    { key: 'hackathonLevel', label: 'Hackathon Level', options: ['International', 'National', 'State', 'Inter-College', 'College'] },
    { key: 'githubActivity', label: 'GitHub Activity', options: ['Active', 'Moderate', 'Low'] },
    { key: 'workType', label: 'Work Preference', options: ['Remote', 'Hybrid', 'On-site'] },
  ];
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />}
      <div className={`fixed top-0 right-0 z-50 h-screen w-80 max-w-[85vw] bg-card border-l border-default shadow-float transition-transform duration-300 overflow-y-auto ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="sticky top-0 bg-card border-b border-default px-5 py-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-body flex items-center gap-2"><Filter className="w-4 h-4" /> Advanced Filters</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-ink-50 dark:hover:bg-ink-800/50"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <p className="text-xs font-semibold text-muted mb-2">Skill Match</p>
            <div className="flex gap-2">{['70%+', '80%+', '90%+'].map((v) => <button key={v} onClick={() => toggle('skillMatch', v)} className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${(filters.skillMatch || []).includes(v) ? 'border-success-500 bg-success-50 dark:bg-success-950/40 text-success-700 dark:text-success-400' : 'border-default text-muted hover:text-body'}`}>{v}</button>)}</div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted mb-2">Reputation</p>
            <div className="flex gap-2">{['70+', '80+', '85+'].map((v) => <button key={v} onClick={() => toggle('reputation', v)} className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${(filters.reputation || []).includes(v) ? 'border-success-500 bg-success-50 dark:bg-success-950/40 text-success-700 dark:text-success-400' : 'border-default text-muted hover:text-body'}`}>{v}+</button>)}</div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted mb-2">ATS Score</p>
            <div className="flex gap-2">{['70+', '75+', '80+'].map((v) => <button key={v} onClick={() => toggle('atsScore', v)} className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${(filters.atsScore || []).includes(v) ? 'border-success-500 bg-success-50 dark:bg-success-950/40 text-success-700 dark:text-success-400' : 'border-default text-muted hover:text-body'}`}>{v}+</button>)}</div>
          </div>
          {sections.map((s) => (
            <div key={s.key}>
              <p className="text-xs font-semibold text-muted mb-2">{s.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.options.map((opt) => <button key={opt} onClick={() => toggle(s.key, opt)} className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${(filters[s.key] || []).includes(opt) ? 'border-success-500 bg-success-50 dark:bg-success-950/40 text-success-700 dark:text-success-400' : 'border-default text-muted hover:text-body'}`}>{opt}</button>)}
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 bg-card border-t border-default p-4 flex gap-2">
          <button onClick={() => setFilters({})} className="flex-1 text-xs font-semibold text-body border border-default rounded-xl py-2.5 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">Reset</button>
          <button onClick={onClose} className="flex-1 text-xs font-semibold text-white bg-success-500 rounded-xl py-2.5 hover:bg-success-600 transition-colors">Apply Filters</button>
        </div>
      </div>
    </>
  );
}

/* ── Invite Modal ── */

function InviteModal({ candidate, onClose, onSend }: { candidate: Candidate | null; onClose: () => void; onSend: () => void }) {
  const [sent, setSent] = useState(false);
  if (!candidate) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-default rounded-2xl p-6 max-w-md w-full shadow-float" onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-success-50 dark:bg-success-950/40 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-7 h-7 text-success-500" /></div>
            <h3 className="text-lg font-bold text-body">Invitation Sent</h3>
            <p className="text-sm text-muted mt-2">Your invitation has been sent to {candidate.name}.</p>
            <button onClick={onClose} className="mt-5 w-full text-sm font-semibold text-white bg-success-500 rounded-xl py-2.5 hover:bg-success-600 transition-colors">Done</button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <Avatar initials={candidate.initials} gradient={candidate.gradient} size="md" />
              <div>
                <h3 className="text-lg font-bold text-body">Invite {candidate.name}</h3>
                <p className="text-xs text-muted">{candidate.role} · {candidate.overallMatch}% Match</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted mb-1.5 block">Role</label>
                <input defaultValue="Software Developer Intern" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-2.5 text-sm text-body outline-none focus:border-success-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted mb-1.5 block">Message</label>
                <textarea rows={4} defaultValue={`Hi ${candidate.name},\n\nWe reviewed your profile on Hack-Meet and believe your skills are a strong match for our Software Developer Intern opportunity. We would like to invite you to the next stage of our hiring process.\n\nBest regards,\n${recruiterProfile.name}`} className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-success-400 resize-none" />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={onClose} className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-2.5 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">Cancel</button>
              <button onClick={() => { onSend(); setSent(true); }} className="flex-1 text-sm font-semibold text-white bg-success-500 rounded-xl py-2.5 hover:bg-success-600 transition-colors inline-flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Send Invitation</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Create Group Modal ── */

function CreateGroupModal({ open, onClose, selectedCount, onCreate }: { open: boolean; onClose: () => void; selectedCount: number; onCreate: (name: string, message: string) => void }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-default rounded-2xl p-6 max-w-md w-full shadow-float" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-body mb-1">Create Candidate Group</h3>
        <p className="text-xs text-muted mb-5">{selectedCount} candidates selected</p>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted mb-1.5 block">Group Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="2027 Software Developer Intern" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-muted outline-none focus:border-success-400" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted mb-1.5 block">Role</label>
            <input defaultValue="Software Developer Intern" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-2.5 text-sm text-body outline-none focus:border-success-400" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted mb-1.5 block">Message</label>
            <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Hello, we reviewed your profile on Hack-Meet and believe your skills are a strong match..." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-success-400 resize-none" />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-2.5 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">Save Draft</button>
          <button onClick={() => { onCreate(name || 'Untitled Group', message); onClose(); }} className="flex-1 text-sm font-semibold text-white bg-brand-500 rounded-xl py-2.5 hover:bg-brand-600 transition-colors inline-flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Create &amp; Send</button>
        </div>
      </div>
    </div>
  );
}

/* ── Candidate Profile Modal ── */

function CandidateProfileModal({ candidate, onClose, onShortlist, onInvite }: { candidate: Candidate | null; onClose: () => void; onShortlist: (c: Candidate) => void; onInvite: (c: Candidate) => void }) {
  if (!candidate) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-card border border-default rounded-2xl max-w-2xl w-full shadow-float my-8" onClick={(e) => e.stopPropagation()}>
        <div className={`h-24 bg-gradient-to-r ${candidate.gradient} rounded-t-2xl relative flex items-center justify-between px-6`}>
          <div className="absolute inset-0 bg-black/10 rounded-t-2xl" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="px-6 pb-6">
          <div className="flex items-start gap-4 -mt-10 relative">
            <Avatar initials={candidate.initials} gradient={candidate.gradient} size="xl" />
            <div className="flex-1 mt-10">
              <h2 className="text-xl font-bold text-body">{candidate.name}</h2>
              <p className="text-sm text-muted"><span className="text-brand-500 font-medium">@{candidate.username}</span> · {candidate.role} · {candidate.domain}</p>
            </div>
            <div className="mt-10"><MatchScoreRing score={candidate.overallMatch} size="md" /></div>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={() => onShortlist(candidate)} className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-2.5 hover:border-warning-400 transition-colors inline-flex items-center justify-center gap-2"><Star className="w-4 h-4" /> Shortlist</button>
            <button onClick={() => onInvite(candidate)} className="flex-1 text-sm font-semibold text-white bg-success-500 rounded-xl py-2.5 hover:bg-success-600 transition-colors inline-flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Invite</button>
          </div>

          {/* Match Breakdown */}
          <div className="mt-5 bg-ink-50 dark:bg-ink-800/40 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-body mb-3">Match Breakdown — {candidate.overallMatch}% Overall</h3>
            <div className="space-y-2">
              <MatchBar label="Required Skills" value={candidate.matchBreakdown.skillMatch} />
              <MatchBar label="Project Relevance" value={candidate.matchBreakdown.projectRelevance} />
              <MatchBar label="Hackathon Evidence" value={candidate.matchBreakdown.hackathonEvidence} />
              <MatchBar label="Hackathon Level" value={candidate.matchBreakdown.hackathonLevel} />
              <MatchBar label="Experience Match" value={candidate.matchBreakdown.experienceMatch} />
              <MatchBar label="GitHub Activity" value={candidate.matchBreakdown.githubActivity} />
              <MatchBar label="Reputation" value={candidate.matchBreakdown.reputation} />
            </div>
            <div className="mt-4 pt-3 border-t border-default">
              <p className="text-xs font-bold text-body mb-2">Why this candidate ranks high:</p>
              <ul className="space-y-1">
                {candidate.matchReasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted"><Check className="w-3.5 h-3.5 text-success-500 flex-shrink-0 mt-0.5" /> {r}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-5">
            <h3 className="text-sm font-bold text-body mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">{candidate.skills.map((s) => <SkillChip key={s} label={s} color="brand" />)}</div>
          </div>

          {/* ATS Score */}
          <div className="mt-5 flex items-center gap-4 bg-ink-50 dark:bg-ink-800/40 rounded-2xl p-4">
            <div className="flex items-center gap-2"><FileText className="w-5 h-5 text-brand-500" /><span className="text-sm font-bold text-body">ATS Score: {candidate.atsScore}/100</span></div>
            <button className="ml-auto text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5" /> View Resume</button>
          </div>

          {/* Projects */}
          <div className="mt-5">
            <h3 className="text-sm font-bold text-body mb-3">Projects</h3>
            <div className="space-y-3">
              {candidate.projects.map((p) => (
                <div key={p.name} className="border border-default rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-bold text-body">{p.name}</h4>
                    <a href={`https://${p.github}`} target="_blank" rel="noreferrer" className="text-muted hover:text-body flex-shrink-0"><Github className="w-4 h-4" /></a>
                  </div>
                  <p className="text-xs text-muted mb-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">{p.techStack.map((t) => <SkillChip key={t} label={t} size="sm" />)}</div>
                  <div className="flex items-center gap-3 text-[10px] text-muted">
                    <span>Contribution: {p.contribution}</span>
                    {p.demo && <span>· Demo: {p.demo}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathon History */}
          <div className="mt-5">
            <h3 className="text-sm font-bold text-body mb-3">Hackathon History</h3>
            <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-ink-200 dark:before:bg-ink-700">
              {candidate.hackathons.map((h, i) => {
                const hi = getHackathonIcon(h.level, h.result);
                return (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[18px] top-1 w-3 h-3 rounded-full ring-2 ring-white dark:ring-ink-900 ${h.result === 'Winner' ? 'bg-warning-500' : h.result === 'Finalist' ? 'bg-brand-500' : 'bg-success-500'}`} />
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <hi.icon className={`w-3.5 h-3.5 ${hi.color}`} />
                          <span className="text-sm font-semibold text-body">{h.name}</span>
                        </div>
                        <span className="text-[10px] text-muted">{h.date} · {h.level} · {h.result}</span>
                      </div>
                      {h.verified && <span className="text-[10px] font-bold text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-950/40 px-1.5 py-0.5 rounded inline-flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GitHub Activity */}
          <div className="mt-5 bg-ink-50 dark:bg-ink-800/40 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-body flex items-center gap-2"><Github className="w-4 h-4" /> GitHub Activity — Last 3 Months</h3>
              <span className="text-xs text-success-600 dark:text-success-400 font-semibold inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success-500" /> Active Coder</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted mb-3"><span>{candidate.githubCommits} commits</span><span>{candidate.githubRepos} repositories</span></div>
            <div className="grid grid-cols-[repeat(26,1fr)] gap-1 min-w-[500px]">
              {Array.from({ length: 26 * 7 }).map((_, i) => {
                const intensity = Math.floor(Math.sin(i * 0.3) * 2 + Math.random() * 3);
                const colors = ['bg-ink-100 dark:bg-ink-800', 'bg-success-200 dark:bg-success-900', 'bg-success-400 dark:bg-success-700', 'bg-success-600 dark:bg-success-500'];
                return <div key={i} className={`w-full aspect-square rounded-sm ${colors[Math.min(intensity, 3)]}`} />;
              })}
            </div>
          </div>

          {/* Reputation */}
          <div className="mt-5 bg-ink-50 dark:bg-ink-800/40 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-body mb-3">Reputation — {candidate.reputation}/100</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MatchBar label="Team Reliability" value={candidate.reputationBreakdown.teamReliability} />
              <MatchBar label="Project Contribution" value={candidate.reputationBreakdown.projectContribution} />
              <MatchBar label="Communication" value={candidate.reputationBreakdown.communication} />
              <MatchBar label="Submission Reliability" value={candidate.reputationBreakdown.submissionReliability} />
            </div>
          </div>

          {/* External Profiles */}
          <div className="mt-5">
            <h3 className="text-sm font-bold text-body mb-3">Coding Profiles</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.externalProfiles.map((p) => (
                <div key={p.name} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-default hover:border-strong cursor-pointer">
                  {p.name === 'GitHub' && <Github className="w-3.5 h-3.5 text-brand-500" />}
                  {p.name === 'Portfolio' && <Globe className="w-3.5 h-3.5 text-cyan-500" />}
                  {(p.name !== 'GitHub' && p.name !== 'Portfolio') && <ExternalLink className="w-3.5 h-3.5 text-brand-500" />}
                  <span className="text-xs font-semibold text-body">{p.name}</span>
                  <span className="text-[10px] text-muted">{p.handle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 1. Dashboard Home ── */

export function RecruiterHome({ setPage }: { setPage: (p: RecruiterPageId) => void }) {
  const kpiIcons: Record<string, React.ComponentType<{ className?: string }>> = { Briefcase, Sparkles, Star, Send, UserCheck };
  const topMatches = [...candidates].sort((a, b) => b.overallMatch - a.overallMatch).slice(0, 3);
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Good afternoon, Recruiter" subtitle="Discover skilled candidates based on what they can actually build.">
        <button onClick={() => setPage('rec-create-role')} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-success-600 to-success-500 px-4 py-2.5 rounded-xl shadow-soft hover:shadow-float transition-all"><Plus className="w-4 h-4" /> Create Role</button>
        <button onClick={() => setPage('rec-discover')} className="inline-flex items-center gap-2 text-sm font-semibold text-body border border-default bg-card px-4 py-2.5 rounded-xl hover:border-success-400 transition-colors"><Search className="w-4 h-4" /> Discover Talent</button>
      </PageHeader>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {recruiterKPIs.map((kpi) => {
          const Icon = kpiIcons[kpi.icon] || Briefcase;
          return (
            <div key={kpi.label} className="bg-card border border-default rounded-2xl p-5 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-success-50 dark:bg-success-950/40 flex items-center justify-center"><Icon className="w-5 h-5 text-success-500" /></div>
                <span className="text-xs font-semibold text-success-600 dark:text-success-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" />{kpi.trend}</span>
              </div>
              <div className="text-2xl font-extrabold text-body">{kpi.value.toLocaleString()}</div>
              <div className="text-xs text-muted mt-0.5">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Top Matches */}
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-body">Your Top Candidate Matches</h3>
            <button onClick={() => setPage('rec-ai-match')} className="text-xs font-semibold text-success-600 dark:text-success-400 hover:underline inline-flex items-center gap-1">View All Matches <ArrowRight className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-3">
            {topMatches.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 hover:bg-ink-100 dark:hover:bg-ink-800/60 transition-colors cursor-pointer" onClick={() => setPage('rec-ai-match')}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === 0 ? 'bg-warning-100 text-warning-700 dark:bg-warning-950/40 dark:text-warning-400' : 'bg-ink-100 text-muted dark:bg-ink-800'}`}>#{i + 1}</div>
                <Avatar initials={c.initials} gradient={c.gradient} size="sm" />
                <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-body truncate">{c.name}</div><div className="text-[10px] text-muted">{c.role} · {c.domain}</div></div>
                <div className="text-right flex-shrink-0"><div className="text-lg font-extrabold text-success-600 dark:text-success-400">{c.overallMatch}%</div><div className="text-[10px] text-muted">Match</div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Hiring Activity */}
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Hiring Activity</h3>
          <div className="space-y-3">
            {hiringActivity.map((a) => {
              const icons = { accepted: CheckCircle2, matched: Sparkles, shortlisted: Star, responded: MessageSquare, invited: Send };
              const colors = { accepted: 'text-success-500', matched: 'text-brand-500', shortlisted: 'text-warning-500', responded: 'text-cyan-500', invited: 'text-success-500' };
              const Icon = icons[a.type];
              return (
                <div key={a.id} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-ink-50 dark:bg-ink-800/40 flex items-center justify-center flex-shrink-0"><Icon className={`w-3.5 h-3.5 ${colors[a.type]}`} /></div>
                  <div className="flex-1"><p className="text-sm text-body">{a.text}</p><span className="text-[10px] text-muted">{a.time}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hiring Pipeline */}
      <div className="mt-5 bg-card border border-default rounded-2xl p-5 shadow-soft">
        <h3 className="text-sm font-bold text-body mb-4">Hiring Pipeline</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {hiringPipeline.map((p, i) => (
            <div key={p.stage} className="flex items-center gap-2 flex-shrink-0">
              <div className={`px-4 py-3 rounded-xl bg-gradient-to-br ${p.color} text-white min-w-[120px]`}>
                <div className="text-xl font-extrabold">{p.count.toLocaleString()}</div>
                <div className="text-[10px] font-medium opacity-90">{p.stage}</div>
              </div>
              {i < hiringPipeline.length - 1 && <ArrowRight className="w-4 h-4 text-muted flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 2. Create Role ── */

export function RecruiterCreateRole({ setPage }: { setPage: (p: RecruiterPageId) => void }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [mustHave, setMustHave] = useState<string[]>(['React', 'Node.js', 'MongoDB']);
  const [niceToHave, setNiceToHave] = useState<string[]>(['AWS', 'Docker']);
  const [domain, setDomain] = useState('Software Development / SaaS');
  const [experience, setExperience] = useState('0-2 years');
  const [gradYear, setGradYear] = useState('2027');
  const [location, setLocation] = useState('India');
  const [workType, setWorkType] = useState('Remote');

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true); }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Create Role" subtitle="Paste a job description and let AI extract the requirements." />

      <div className="flex items-center justify-between mb-6">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step === s ? 'bg-success-500 text-white' : step > s ? 'bg-success-500 text-white' : 'bg-ink-100 dark:bg-ink-800 text-muted'}`}>
              {step > s ? <Check className="w-3.5 h-3.5" /> : s}
            </div>
            <span className={`ml-2 text-xs font-medium ${step === s ? 'text-body' : 'text-muted'}`}>{s === 1 ? 'Job Description' : 'AI Extraction'}</span>
            {s === 1 && <div className={`flex-1 h-px mx-3 ${step > 1 ? 'bg-success-500' : 'bg-ink-200 dark:bg-ink-700'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-card border border-default rounded-2xl p-6 shadow-soft">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted mb-1.5 block">Role Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Software Developer Intern" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-success-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted mb-1.5 block">Job Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={8} placeholder="Paste the complete job description here..." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-success-400 resize-none" />
            </div>
            <button onClick={handleAnalyze} disabled={analyzing} className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-success-600 to-success-500 px-4 py-3 rounded-xl shadow-soft hover:shadow-float transition-all disabled:opacity-60">
              {analyzing ? <><Sparkles className="w-4 h-4 animate-pulse" /> Analyzing...</> : <><Sparkles className="w-4 h-4" /> Analyze with AI</>}
            </button>
            {analyzed && (
              <div className="p-4 rounded-xl bg-success-50 dark:bg-success-950/30 border border-success-200 dark:border-success-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-success-700 dark:text-success-400"><CheckCircle2 className="w-4 h-4" /> AI analysis complete! Review the extracted requirements below.</div>
                <button onClick={() => setStep(2)} className="mt-3 text-sm font-semibold text-white bg-success-500 rounded-lg px-4 py-2 hover:bg-success-600 transition-colors">Continue to AI Extraction →</button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2"><Sparkles className="w-5 h-5 text-success-500" /><h2 className="text-lg font-bold text-body">AI Extracted Requirements</h2></div>

            <div>
              <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Must Have</p>
              <div className="flex flex-wrap gap-2">
                {mustHave.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300">
                    {s}
                    <button onClick={() => setMustHave(mustHave.filter((m) => m !== s))} className="hover:text-error-500"><X className="w-3 h-3" /></button>
                  </span>
                ))}
                <input placeholder="+ Add skill" className="text-xs bg-transparent border-b border-default outline-none focus:border-success-400 px-1 py-1.5 text-body placeholder:text-muted w-24" onKeyDown={(e) => { if (e.key === 'Enter' && e.currentTarget.value.trim()) { setMustHave([...mustHave, e.currentTarget.value.trim()]); e.currentTarget.value = ''; } }} />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Nice to Have</p>
              <div className="flex flex-wrap gap-2">
                {niceToHave.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
                    {s}
                    <button onClick={() => setNiceToHave(niceToHave.filter((m) => m !== s))} className="hover:text-error-500"><X className="w-3 h-3" /></button>
                  </span>
                ))}
                <input placeholder="+ Add skill" className="text-xs bg-transparent border-b border-default outline-none focus:border-success-400 px-1 py-1.5 text-body placeholder:text-muted w-24" onKeyDown={(e) => { if (e.key === 'Enter' && e.currentTarget.value.trim()) { setNiceToHave([...niceToHave, e.currentTarget.value.trim()]); e.currentTarget.value = ''; } }} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted mb-1.5 block">Domain</label>
                <input value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-2.5 text-sm text-body outline-none focus:border-success-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted mb-1.5 block">Experience</label>
                <input value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-2.5 text-sm text-body outline-none focus:border-success-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted mb-1.5 block">Graduation Year</label>
                <input value={gradYear} onChange={(e) => setGradYear(e.target.value)} className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-2.5 text-sm text-body outline-none focus:border-success-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted mb-1.5 block">Location</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-2.5 text-sm text-body outline-none focus:border-success-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted mb-1.5 block">Work Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Remote', 'Hybrid', 'On-site'] as const).map((w) => (
                  <button key={w} onClick={() => setWorkType(w)} className={`text-xs font-semibold px-3 py-2.5 rounded-xl border transition-colors ${workType === w ? 'border-success-500 bg-success-50 dark:bg-success-950/40 text-success-700 dark:text-success-300' : 'border-default text-muted hover:text-body'}`}>{w}</button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={() => setStep(1)} className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-3 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">Back</button>
              <button onClick={() => setPage('rec-ai-match')} className="flex-1 text-sm font-semibold text-white bg-gradient-to-r from-success-600 to-success-500 rounded-xl py-3 shadow-soft hover:shadow-float transition-all inline-flex items-center justify-center gap-2"><Sparkles className="w-4 h-4" /> Find Matching Talent</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── 3. AI Talent Match ── */

export function RecruiterAIMatch() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('overallMatch');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [profileCandidate, setProfileCandidate] = useState<Candidate | null>(null);
  const [inviteCandidate, setInviteCandidate] = useState<Candidate | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [weights, setWeights] = useState(defaultMatchWeights);
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set());
  const activeRole = roles[0];

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const toggleShortlist = (c: Candidate) => {
    const next = new Set(shortlisted);
    next.has(c.id) ? next.delete(c.id) : next.add(c.id);
    setShortlisted(next);
  };

  const computeScore = (c: Candidate) => {
    const bd = c.matchBreakdown as unknown as Record<string, number>;
    return weights.reduce((sum, w) => sum + (bd[w.key] || 0) * w.weight / 100, 0);
  };

  const sorted = [...candidates].sort((a, b) => computeScore(b) - computeScore(a));
  const sortOptions = [
    { key: 'overallMatch', label: 'Overall Match' },
    { key: 'skillMatch', label: 'Skill Match' },
    { key: 'hackathonEvidence', label: 'Hackathon Achievement' },
    { key: 'hackathonLevel', label: 'Hackathon Level' },
    { key: 'projectRelevance', label: 'Project Relevance' },
    { key: 'atsScore', label: 'ATS Score' },
    { key: 'reputation', label: 'Reputation' },
    { key: 'githubActivity', label: 'GitHub Activity' },
    { key: 'experienceMatch', label: 'Experience' },
  ];

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="AI Talent Match" subtitle="Ranked candidates based on demonstrated skills and verified evidence.">
        <button onClick={() => setShowFilters(true)} className="inline-flex items-center gap-2 text-sm font-semibold text-body border border-default bg-card px-4 py-2.5 rounded-xl hover:border-success-400 transition-colors"><Filter className="w-4 h-4" /> Filters</button>
      </PageHeader>

      {/* Active Role Banner */}
      <div className="bg-gradient-to-r from-success-50 to-cyan-50 dark:from-success-950/30 dark:to-cyan-950/20 border border-default rounded-2xl p-5 mb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-body">{activeRole.title}</h2>
            <p className="text-xs text-muted mt-1">{activeRole.domain} · {activeRole.experience} · {activeRole.location} · {activeRole.workType}</p>
          </div>
          <div className="flex gap-6">
            <div><div className="text-2xl font-extrabold text-success-600 dark:text-success-400">{activeRole.matchedCandidates.toLocaleString()}</div><div className="text-[10px] text-muted">Matching Candidates</div></div>
            <div><div className="text-2xl font-extrabold text-body">{activeRole.avgTopMatch}%</div><div className="text-[10px] text-muted">Avg Top Match</div></div>
          </div>
        </div>
      </div>

      {/* Match Priority Config */}
      <div className="bg-card border border-default rounded-2xl p-5 shadow-soft mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-body flex items-center gap-2"><Layers className="w-4 h-4 text-success-500" /> Matching Priority</h3>
          <button onClick={() => setWeights(defaultMatchWeights)} className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Reset to AI Recommended</button>
        </div>
        <div className="space-y-3">
          {weights.map((w, i) => (
            <div key={w.key} className="flex items-center gap-3">
              <span className="text-xs font-medium text-body w-36 flex-shrink-0">{w.label}</span>
              <input type="range" min={0} max={60} value={w.weight} onChange={(e) => { const next = [...weights]; next[i] = { ...w, weight: parseInt(e.target.value) }; setWeights(next); }} className="flex-1 accent-success-500" />
              <span className="text-xs font-bold text-body w-10 text-right tabular-nums">{w.weight}%</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted mt-3">Changing weights will re-rank candidates. Skills are prioritized highest by default.</p>
      </div>

      {/* Sort + Bulk Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted" />
          <span className="text-xs font-semibold text-muted">Sort by:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-xs font-semibold bg-card border border-default rounded-lg px-3 py-1.5 text-body outline-none cursor-pointer">
            {sortOptions.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </div>
        <span className="text-xs text-muted">· Highest First</span>
      </div>

      <BulkActionBar
        count={selected.size}
        onShortlist={() => { selected.forEach((id) => shortlisted.add(id)); setShortlisted(new Set(shortlisted)); setSelected(new Set()); }}
        onInvite={() => { if (selected.size > 0) setShowCreateGroup(true); }}
        onCreateGroup={() => setShowCreateGroup(true)}
        onClear={() => setSelected(new Set())}
      />

      {/* Candidate Ranking */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {sorted.map((c, i) => (
          <CandidateCard
            key={c.id}
            candidate={{ ...c, shortlisted: shortlisted.has(c.id) }}
            rank={i + 1}
            selected={selected.has(c.id)}
            onToggleSelect={toggleSelect}
            onViewProfile={setProfileCandidate}
            onShortlist={toggleShortlist}
            onInvite={setInviteCandidate}
          />
        ))}
      </div>

      <FilterDrawer open={showFilters} onClose={() => setShowFilters(false)} filters={filters} setFilters={setFilters} />
      <CandidateProfileModal candidate={profileCandidate} onClose={() => setProfileCandidate(null)} onShortlist={toggleShortlist} onInvite={(c) => { setProfileCandidate(null); setInviteCandidate(c); }} />
      <InviteModal candidate={inviteCandidate} onClose={() => setInviteCandidate(null)} onSend={() => {}} />
      <CreateGroupModal open={showCreateGroup} onClose={() => setShowCreateGroup(false)} selectedCount={selected.size} onCreate={() => setSelected(new Set())} />
    </div>
  );
}

/* ── 4. Discover Talent ── */

export function RecruiterDiscover() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [profileCandidate, setProfileCandidate] = useState<Candidate | null>(null);
  const [inviteCandidate, setInviteCandidate] = useState<Candidate | null>(null);

  const toggleSelect = (id: string) => { const next = new Set(selected); next.has(id) ? next.delete(id) : next.add(id); setSelected(next); };
  const filtered = candidates.filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) || c.domain.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Discover Talent" subtitle="Search and filter proven candidates by skills, evidence, and achievements." />
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search skills, names, domains..." className="w-full text-sm bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl pl-10 pr-4 py-2.5 text-body placeholder:text-muted outline-none focus:border-success-400 transition-colors" />
        </div>
        <button onClick={() => setShowFilters(true)} className="inline-flex items-center gap-2 text-sm font-semibold text-body border border-default bg-card px-4 py-2.5 rounded-xl hover:border-success-400 transition-colors w-full sm:w-auto justify-center"><Filter className="w-4 h-4" /> Filters</button>
      </div>

      <BulkActionBar count={selected.size} onShortlist={() => setSelected(new Set())} onInvite={() => {}} onCreateGroup={() => {}} onClear={() => setSelected(new Set())} />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <CandidateCard key={c.id} candidate={c} selected={selected.has(c.id)} onToggleSelect={toggleSelect} onViewProfile={setProfileCandidate} onShortlist={() => {}} onInvite={setInviteCandidate} showRank={false} />
        ))}
      </div>

      <FilterDrawer open={showFilters} onClose={() => setShowFilters(false)} filters={filters} setFilters={setFilters} />
      <CandidateProfileModal candidate={profileCandidate} onClose={() => setProfileCandidate(null)} onShortlist={() => {}} onInvite={(c) => { setProfileCandidate(null); setInviteCandidate(c); }} />
      <InviteModal candidate={inviteCandidate} onClose={() => setInviteCandidate(null)} onSend={() => {}} />
    </div>
  );
}

/* ── 5. Shortlisted ── */

export function RecruiterShortlisted() {
  const [tab, setTab] = useState('All');
  const tabs = ['All', 'By Role', 'Recently Added'];
  const shortlistedCandidates = candidates.filter((c) => c.id === 'c1' || c.id === 'c3');
  const [profileCandidate, setProfileCandidate] = useState<Candidate | null>(null);
  const [inviteCandidate, setInviteCandidate] = useState<Candidate | null>(null);

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Shortlisted" subtitle="Candidates you have shortlisted for further review." />
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === t ? 'bg-success-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{t}</button>)}
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {shortlistedCandidates.map((c) => (
          <CandidateCard key={c.id} candidate={{ ...c, shortlisted: true }} selected={false} onToggleSelect={() => {}} onViewProfile={setProfileCandidate} onShortlist={() => {}} onInvite={setInviteCandidate} showRank={false} />
        ))}
      </div>
      <CandidateProfileModal candidate={profileCandidate} onClose={() => setProfileCandidate(null)} onShortlist={() => {}} onInvite={(c) => { setProfileCandidate(null); setInviteCandidate(c); }} />
      <InviteModal candidate={inviteCandidate} onClose={() => setInviteCandidate(null)} onSend={() => {}} />
    </div>
  );
}

/* ── 6. Invitations ── */

export function RecruiterInvitations() {
  const [tab, setTab] = useState('Sent');
  const tabs: { key: string; label: string }[] = [
    { key: 'Sent', label: 'Sent' }, { key: 'Pending', label: 'Pending' }, { key: 'Accepted', label: 'Accepted' }, { key: 'Declined', label: 'Declined' },
  ];
  const filtered = tab === 'Sent' ? invitations : invitations.filter((i) => i.status === tab);
  const statusColors: Record<string, string> = {
    Sent: 'text-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 dark:text-cyan-300',
    Pending: 'text-warning-700 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-300',
    Accepted: 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300',
    Declined: 'text-error-700 bg-error-50 dark:bg-error-950/40 dark:text-error-300',
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Invitations" subtitle="Track all candidate invitations and their responses." />
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {tabs.map((t) => <button key={t.key} onClick={() => setTab(t.key)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === t.key ? 'bg-success-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{t.label}</button>)}
      </div>
      <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-default text-left">
                <th className="px-4 py-3 text-xs font-semibold text-muted">Candidate</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted hidden sm:table-cell">Role</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted">Match</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted hidden md:table-cell">Sent Date</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id} className="border-b border-default last:border-0 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={inv.candidateInitials} gradient={inv.candidateGradient} size="sm" />
                      <span className="text-sm font-semibold text-body">{inv.candidateName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-body hidden sm:table-cell">{inv.role}</td>
                  <td className="px-4 py-3"><span className="text-sm font-bold text-success-600 dark:text-success-400">{inv.match}%</span></td>
                  <td className="px-4 py-3 text-sm text-muted hidden md:table-cell">{inv.sentDate}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[inv.status]}`}>{inv.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── 7. Candidate Groups ── */

/* ── Group Detail Modal ── */

function GroupDetailModal({ group, onClose }: { group: CandidateGroup | null; onClose: () => void }) {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const [memberIds, setMemberIds] = useState<string[]>(group?.candidateIds ?? []);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');
  if (!group) return null;
  const groupCandidates = candidates.filter((c) => memberIds.includes(c.id));
  const availableToAdd = candidates.filter((c) => !memberIds.includes(c.id) && c.name.toLowerCase().includes(search.toLowerCase()));

  const removeMember = (id: string) => setMemberIds((prev) => prev.filter((m) => m !== id));
  const addMember = (id: string) => { setMemberIds((prev) => [...prev, id]); setShowAdd(false); setSearch(''); };
  const memberCount = memberIds.length;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-card border border-default rounded-2xl max-w-2xl w-full shadow-float my-8" onClick={(e) => e.stopPropagation()}>
        <div className="h-16 bg-gradient-to-r from-brand-500 to-brand-700 rounded-t-2xl relative flex items-center px-6">
          <div className="flex items-center gap-3 relative">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center"><Users className="w-4.5 h-4.5 text-white" /></div>
            <div><h2 className="text-base font-bold text-white">{group.name}</h2><p className="text-[10px] text-white/80">{memberCount} Candidates · {group.role}</p></div>
          </div>
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="px-6 pb-6">
          {sent ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-2xl bg-success-50 dark:bg-success-950/40 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-7 h-7 text-success-500" /></div>
              <h3 className="text-lg font-bold text-body">Message Sent to All Members</h3>
              <p className="text-sm text-muted mt-2">Your message has been delivered to all {memberCount} candidates in this group.</p>
              <button onClick={onClose} className="mt-5 w-full text-sm font-semibold text-white bg-success-500 rounded-xl py-2.5 hover:bg-success-600 transition-colors">Done</button>
            </div>
          ) : showAdd ? (
            <>
              <div className="mt-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-body flex items-center gap-2"><Plus className="w-4 h-4 text-brand-500" /> Add Candidates to Group</h3>
                  <button onClick={() => { setShowAdd(false); setSearch(''); }} className="text-xs font-semibold text-muted hover:text-body">Cancel</button>
                </div>
                <div className="relative mb-3">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search candidates by name..." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl pl-10 pr-4 py-2.5 text-sm text-body placeholder:text-muted outline-none focus:border-brand-400" />
                </div>
                <div className="space-y-2 max-h-[320px] overflow-y-auto">
                  {availableToAdd.length === 0 ? (
                    <p className="text-xs text-muted text-center py-6">No candidates found to add.</p>
                  ) : availableToAdd.map((c) => (
                    <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                      <Avatar initials={c.initials} gradient={c.gradient} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-body truncate">{c.name}</div>
                        <div className="text-[10px] text-muted">@{c.username} · {c.role} · {c.overallMatch}% match</div>
                      </div>
                      <button onClick={() => addMember(c.id)} className="text-xs font-semibold text-white bg-brand-500 rounded-lg px-3 py-1.5 hover:bg-brand-600 transition-colors inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-body flex items-center gap-2"><Users className="w-4 h-4 text-brand-500" /> Candidates in This Group ({memberCount})</h3>
                  <button onClick={() => setShowAdd(true)} className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add Candidates</button>
                </div>
                <div className="space-y-2 max-h-[280px] overflow-y-auto">
                  {groupCandidates.length === 0 ? (
                    <p className="text-xs text-muted text-center py-6">No candidates in this group yet. Click "Add Candidates" to get started.</p>
                  ) : groupCandidates.map((c) => (
                    <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                      <Avatar initials={c.initials} gradient={c.gradient} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-body truncate">{c.name}</div>
                        <div className="text-[10px] text-muted">@{c.username} · {c.role} · {c.overallMatch}% match</div>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.overallMatch >= 90 ? 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300' : 'text-brand-700 bg-brand-50 dark:bg-brand-950/40 dark:text-brand-300'}`}>{c.overallMatch}%</span>
                      <button onClick={() => removeMember(c.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-950/30 transition-colors flex-shrink-0" aria-label="Remove from group"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-bold text-body mb-2 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-success-500" /> Send Message to Group</h3>
                <p className="text-[10px] text-muted mb-2">Everyone in this group will receive your message.</p>
                <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} placeholder="Type your message to all candidates in this group..." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-success-400 resize-none" />
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={onClose} className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-2.5 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">Close</button>
                <button onClick={() => setSent(true)} disabled={!msg.trim() || memberCount === 0} className="flex-1 text-sm font-semibold text-white bg-success-500 rounded-xl py-2.5 hover:bg-success-600 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"><Send className="w-4 h-4" /> Send to All ({memberCount})</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function RecruiterGroups() {
  const [showCreate, setShowCreate] = useState(false);
  const [openGroup, setOpenGroup] = useState<CandidateGroup | null>(null);
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Candidate Groups" subtitle="Manage groups of selected candidates for batch invitations.">
        <button onClick={() => setShowCreate(true)} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-500 px-4 py-2.5 rounded-xl hover:bg-brand-600 transition-colors"><Plus className="w-4 h-4" /> Create Group</button>
      </PageHeader>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {candidateGroups.map((g) => (
          <div key={g.id} className="bg-card border border-default rounded-2xl p-5 shadow-soft hover:shadow-card transition-shadow">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center"><Users className="w-5 h-5 text-white" /></div>
                <div><h3 className="text-sm font-bold text-body">{g.name}</h3><p className="text-[10px] text-muted">{g.candidateCount} Candidates · {g.createdDate}</p></div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-medium text-muted px-2 py-1 rounded-md bg-ink-50 dark:bg-ink-800/40">{g.role}</span>
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${g.status === 'Active' ? 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300' : g.status === 'Invitation Sent' ? 'text-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 dark:text-cyan-300' : 'text-warning-700 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-300'}`}>{g.status}</span>
            </div>
            <p className="text-xs text-muted line-clamp-2 mb-4">{g.message}</p>
            <div className="flex gap-2">
              <button onClick={() => setOpenGroup(g)} className="flex-1 text-xs font-semibold text-white bg-success-500 rounded-lg py-2 hover:bg-success-600 transition-colors">Open Group</button>
              <button onClick={() => setOpenGroup(g)} className="text-xs font-semibold text-body border border-default rounded-lg py-2 px-3 hover:border-success-400 transition-colors"><MessageSquare className="w-3.5 h-3.5" /></button>
              <button onClick={() => setOpenGroup(g)} className="text-xs font-semibold text-body border border-default rounded-lg py-2 px-3 hover:border-success-400 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
      <CreateGroupModal open={showCreate} onClose={() => setShowCreate(false)} selectedCount={0} onCreate={() => {}} />
      <GroupDetailModal group={openGroup} onClose={() => setOpenGroup(null)} />
    </div>
  );
}

/* ── 8. Messages ── */

export function RecruiterMessages() {
  const [activeTab, setActiveTab] = useState('Candidates');
  const [activeConv, setActiveConv] = useState(recruiterMessages[0]);
  const filtered = activeTab === 'Candidates' ? recruiterMessages.filter((m) => m.type === 'candidate') : recruiterMessages.filter((m) => m.type === 'group');

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Messages" subtitle="Communicate with candidates and groups." />
      <div className="flex items-center gap-2 mb-4">
        {['Candidates', 'Groups'].map((t) => <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === t ? 'bg-success-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{t}</button>)}
      </div>
      <div className="grid lg:grid-cols-[300px_1fr] gap-4 lg:h-[calc(100vh-280px)] min-h-[400px] flex flex-col lg:grid">
        {/* Conversation list */}
        <div className="bg-card border border-default rounded-2xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {filtered.map((m) => (
              <button key={m.id} onClick={() => setActiveConv(m)} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${activeConv.id === m.id ? 'bg-success-50 dark:bg-success-950/30' : 'hover:bg-ink-50 dark:hover:bg-ink-800/40'}`}>
                <Avatar initials={m.initials} gradient={m.gradient} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2"><span className="text-sm font-semibold text-body truncate">{m.conversation}</span><span className="text-[10px] text-muted flex-shrink-0">{m.time}</span></div>
                  <p className="text-xs text-muted truncate">{m.lastMessage}</p>
                </div>
                {m.unread && <span className="w-2 h-2 rounded-full bg-success-500 flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="bg-card border border-default rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-default flex items-center gap-3">
            <Avatar initials={activeConv.initials} gradient={activeConv.gradient} size="sm" />
            <div className="flex-1"><div className="text-sm font-bold text-body">{activeConv.conversation}</div><div className="text-[10px] text-muted">{activeConv.type === 'group' ? 'Group conversation' : 'Direct message'}</div></div>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-950/30 transition-colors" aria-label="Report"><Flag className="w-4 h-4" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="flex gap-3"><Avatar initials={activeConv.initials} gradient={activeConv.gradient} size="sm" /><div className="max-w-[70%]"><div className="bg-ink-50 dark:bg-ink-800/40 rounded-2xl rounded-tl-sm px-4 py-2.5"><p className="text-sm text-body">Hi! Thank you for the invitation. I am very interested in the role.</p></div><span className="text-[10px] text-muted mt-1 block">10:30 AM</span></div></div>
            <div className="flex gap-3 flex-row-reverse"><Avatar initials={recruiterProfile.initials} gradient={recruiterProfile.gradient} size="sm" /><div className="max-w-[70%]"><div className="bg-success-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5"><p className="text-sm">Great to hear! Can we schedule a technical interview for next Tuesday?</p></div><span className="text-[10px] text-muted mt-1 block text-right">10:35 AM · Sent</span></div></div>
            <div className="flex gap-3"><Avatar initials={activeConv.initials} gradient={activeConv.gradient} size="sm" /><div className="max-w-[70%]"><div className="bg-ink-50 dark:bg-ink-800/40 rounded-2xl rounded-tl-sm px-4 py-2.5"><p className="text-sm text-body">Tuesday works perfectly. Looking forward to it!</p></div><span className="text-[10px] text-muted mt-1 block">10:38 AM · Read</span></div></div>
          </div>
          <div className="p-4 border-t border-default flex items-center gap-2">
            <input placeholder="Type a message..." className="flex-1 bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-muted outline-none focus:border-success-400" />
            <button className="w-10 h-10 rounded-xl bg-success-500 text-white flex items-center justify-center hover:bg-success-600 transition-colors flex-shrink-0"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 9. Hiring Activity ── */

export function RecruiterActivity() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Hiring Activity" subtitle="Track your hiring pipeline and recent activity." />

      {/* Pipeline */}
      <div className="bg-card border border-default rounded-2xl p-5 shadow-soft mb-5">
        <h3 className="text-sm font-bold text-body mb-4">Hiring Pipeline</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {hiringPipeline.map((p, i) => (
            <div key={p.stage} className="flex items-center gap-2 flex-shrink-0">
              <div className={`px-5 py-4 rounded-xl bg-gradient-to-br ${p.color} text-white min-w-[130px]`}>
                <div className="text-2xl font-extrabold">{p.count.toLocaleString()}</div>
                <div className="text-xs font-medium opacity-90">{p.stage}</div>
              </div>
              {i < hiringPipeline.length - 1 && <ArrowRight className="w-5 h-5 text-muted flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
        <h3 className="text-sm font-bold text-body mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {hiringActivity.map((a) => {
            const icons = { accepted: CheckCircle2, matched: Sparkles, shortlisted: Star, responded: MessageSquare, invited: Send };
            const colors = { accepted: 'text-success-500 bg-success-50 dark:bg-success-950/40', matched: 'text-brand-500 bg-brand-50 dark:bg-brand-950/40', shortlisted: 'text-warning-500 bg-warning-50 dark:bg-warning-950/40', responded: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40', invited: 'text-success-500 bg-success-50 dark:bg-success-950/40' };
            const Icon = icons[a.type];
            return (
              <div key={a.id} className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colors[a.type]}`}><Icon className="w-4 h-4" /></div>
                <div className="flex-1"><p className="text-sm text-body">{a.text}</p><span className="text-[10px] text-muted">{a.time}</span></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── 10. Saved Searches ── */

export function RecruiterSavedSearches() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Saved Searches" subtitle="Quickly re-run your favorite candidate searches." />
      <div className="grid md:grid-cols-2 gap-5">
        {savedSearches.map((s) => (
          <div key={s.id} className="bg-card border border-default rounded-2xl p-5 shadow-soft hover:shadow-card transition-shadow">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center"><Bookmark className="w-5 h-5 text-brand-500" /></div>
                <div><h3 className="text-sm font-bold text-body">{s.name}</h3><p className="text-[10px] text-muted">{s.createdDate} · {s.resultsCount} results</p></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {s.filters.map((f, i) => <span key={i} className="text-[10px] font-medium px-2 py-1 rounded-md bg-ink-50 dark:bg-ink-800/40 text-muted">{f.label}: {f.value}</span>)}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 text-xs font-semibold text-white bg-success-500 rounded-lg py-2 hover:bg-success-600 transition-colors inline-flex items-center justify-center gap-1.5"><Search className="w-3.5 h-3.5" /> Run Search</button>
              <button className="text-xs font-semibold text-body border border-default rounded-lg py-2 px-3 hover:border-success-400 transition-colors"><Target className="w-3.5 h-3.5" /></button>
              <button className="text-xs font-semibold text-muted border border-default rounded-lg py-2 px-3 hover:border-error-400 hover:text-error-500 transition-colors"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 11. Company Profile ── */

export function RecruiterCompany({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Company Profile" subtitle="Manage your company's public profile on Hack-Meet.">
        <button onClick={onLogout} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-error-500 px-4 py-2.5 rounded-xl hover:bg-error-600 transition-colors">Logout</button>
      </PageHeader>

      <div className="bg-gradient-to-r from-success-50 to-cyan-50 dark:from-success-950/30 dark:to-cyan-950/20 border border-default rounded-2xl p-6 lg:p-8 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-success-500/10 blur-[60px] pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start gap-5 relative">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${recruiterCompany.logoGradient} flex items-center justify-center flex-shrink-0`}><Building2 className="w-8 h-8 text-white" /></div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-body">{recruiterCompany.name}</h2>
            <div className="flex items-center gap-2 mt-2"><span className="inline-flex items-center gap-1 text-xs font-medium text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/50 px-2 py-1 rounded-md"><ShieldCheck className="w-3 h-3" /> Verified Company</span></div>
            <p className="text-sm text-muted mt-3 max-w-lg">{recruiterCompany.description}</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Website', value: recruiterCompany.website, icon: Globe },
          { label: 'Industry', value: recruiterCompany.industry, icon: Briefcase },
          { label: 'Company Size', value: recruiterCompany.size, icon: Users },
          { label: 'Location', value: recruiterCompany.location, icon: MapPin },
        ].map((item) => (
          <div key={item.label} className="bg-card border border-default rounded-2xl p-5 shadow-soft">
            <div className="w-9 h-9 rounded-lg bg-ink-50 dark:bg-ink-800/40 flex items-center justify-center mb-3"><item.icon className="w-4 h-4 text-muted" /></div>
            <div className="text-xs text-muted">{item.label}</div>
            <div className="text-sm font-semibold text-body mt-0.5">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Active Roles</h3>
          <div className="space-y-3">
            {roles.filter((r) => r.status === 'Active').map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-2 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                <div><div className="text-sm font-semibold text-body">{r.title}</div><div className="text-[10px] text-muted">{r.matchedCandidates.toLocaleString()} matches · {r.avgTopMatch}% avg</div></div>
                <span className="text-xs font-semibold text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/40 px-2 py-1 rounded-full">Active</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Hiring Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-2xl font-extrabold text-body">{recruiterCompany.activeRoles}</div><div className="text-xs text-muted">Active Roles</div></div>
            <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-2xl font-extrabold text-success-600 dark:text-success-400">{recruiterCompany.totalHires}</div><div className="text-xs text-muted">Total Hires</div></div>
            <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-2xl font-extrabold text-body">142</div><div className="text-xs text-muted">Invitations Sent</div></div>
            <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-2xl font-extrabold text-body">38</div><div className="text-xs text-muted">Accepted</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 12. Settings ── */

function UsernameChecker() {
  const [username, setUsername] = useState(recruiterProfile.username);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<'idle' | 'available' | 'taken' | 'invalid'>('idle');
  const check = (val: string) => {
    setUsername(val);
    setResult('idle');
    if (!val.trim()) return;
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      if (val.trim().length < 3) { setResult('invalid'); return; }
      if (val === recruiterProfile.username) { setResult('idle'); return; }
      setResult(isUsernameAvailable(val) ? 'available' : 'taken');
    }, 500);
  };
  return (
    <div>
      <label className="text-xs font-semibold text-muted mb-1.5 block">Username</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-sm font-medium">@</span>
        <input value={username} onChange={(e) => check(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))} className={`w-full bg-ink-50 dark:bg-ink-800/40 border rounded-xl pl-8 pr-10 py-3 text-sm text-body outline-none transition-colors ${result === 'available' ? 'border-success-400' : result === 'taken' ? 'border-error-400' : result === 'invalid' ? 'border-warning-400' : 'border-default focus:border-success-400'}`} placeholder="yourusername" />
        {checking && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted">Checking...</span>}
        {!checking && result === 'available' && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success-500" />}
        {!checking && result === 'taken' && <X className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-error-500" />}
      </div>
      {result === 'available' && <p className="text-[10px] text-success-600 dark:text-success-400 mt-1.5 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Username is available!</p>}
      {result === 'taken' && <p className="text-[10px] text-error-600 dark:text-error-400 mt-1.5 flex items-center gap-1"><X className="w-3 h-3" /> This username is already taken. Try another.</p>}
      {result === 'invalid' && <p className="text-[10px] text-warning-600 dark:text-warning-400 mt-1.5">Username must be at least 3 characters.</p>}
      {result === 'idle' && <p className="text-[10px] text-muted mt-1.5">Unique username visible to everyone. Letters, numbers, and underscores only.</p>}
    </div>
  );
}

function AccountSection() {
  return (
    <div className="space-y-4">
      <div><label className="text-xs font-semibold text-muted mb-1.5 block">Name</label><input defaultValue={recruiterProfile.name} className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-success-400" /></div>
      <UsernameChecker />
      <div><label className="text-xs font-semibold text-muted mb-1.5 block">Email</label><input defaultValue={recruiterProfile.email} className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-success-400" /></div>
      <div><label className="text-xs font-semibold text-muted mb-1.5 block">Password</label><input type="password" defaultValue="password123" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-success-400" /></div>
      <button className="text-sm font-semibold text-white bg-success-500 rounded-xl px-4 py-2.5 hover:bg-success-600 transition-colors">Save Changes</button>
    </div>
  );
}

export function RecruiterSettings() {
  const [section, setSection] = useState('Account');
  const sections = ['Account', 'Recruiter Profile', 'Notifications', 'Privacy', 'Billing'];
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Settings" subtitle="Manage your recruiter account and preferences." />
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {sections.map((s) => <button key={s} onClick={() => setSection(s)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${section === s ? 'bg-success-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{s}</button>)}
      </div>
      <div className="bg-card border border-default rounded-2xl p-6 shadow-soft">
        {section === 'Account' && <AccountSection />}
        {section === 'Recruiter Profile' && (
          <div className="space-y-4">
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Job Title</label><input defaultValue={recruiterProfile.role} className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-success-400" /></div>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Department</label><input defaultValue="Talent Acquisition" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-success-400" /></div>
            <button className="text-sm font-semibold text-white bg-success-500 rounded-xl px-4 py-2.5 hover:bg-success-600 transition-colors">Save Changes</button>
          </div>
        )}
        {section === 'Notifications' && (
          <div className="space-y-4">
            {[['Email notifications', 'Get notified about candidate responses via email'], ['Platform notifications', 'In-app notifications for new matches and activity'], ['Candidate responses', 'Alert when a candidate accepts or declines an invitation']].map(([label, desc]) => (
              <label key={label} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer">
                <div><div className="text-sm font-semibold text-body">{label}</div><div className="text-xs text-muted">{desc}</div></div>
                <input type="checkbox" defaultChecked className="rounded border-default text-success-500 focus:ring-success-400" />
              </label>
            ))}
          </div>
        )}
        {section === 'Privacy' && (
          <div className="space-y-4">
            <p className="text-sm text-muted">Candidate visibility rules determine what information recruiters can see.</p>
            <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">Show recruiter name to candidates</div><div className="text-xs text-muted">Candidates will see your name and company</div></div><input type="checkbox" defaultChecked className="rounded border-default text-success-500 focus:ring-success-400" /></label>
            <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">Hide personal contact info</div><div className="text-xs text-muted">Phone and personal email are never shown to candidates</div></div><input type="checkbox" defaultChecked className="rounded border-default text-success-500 focus:ring-success-400" /></label>
          </div>
        )}
        {section === 'Billing' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-success-50 to-cyan-50 dark:from-success-950/30 dark:to-cyan-950/20 border border-default">
              <div className="flex items-center justify-between"><div><div className="text-sm font-bold text-body">Pro Plan</div><div className="text-xs text-muted">Unlimited invitations · AI matching · Candidate groups</div></div><span className="text-xs font-bold text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/40 px-2 py-1 rounded-full">Active</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-2xl font-extrabold text-body">142 / 500</div><div className="text-xs text-muted">Invitations used this month</div></div>
              <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-2xl font-extrabold text-body">₹15,000</div><div className="text-xs text-muted">Monthly subscription</div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
