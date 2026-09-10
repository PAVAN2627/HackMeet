import {
  Trophy, Award, Rocket, Users, Star, Github, Linkedin, Globe,
  Code2, ExternalLink, Share2, Pencil, Check, FolderGit2, GitBranch,
  LogOut,
} from 'lucide-react';
import { currentUser, userSkills, externalProfiles, hackathonHistory, userBadges, projects } from '@/dashboard/data';
import { Avatar, SkillChip, PageHeader } from '@/dashboard/components';

const profileIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Github, Linkedin, Code: Code2, Trophy, Globe,
};

const badgeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy, Rocket, Handshake: Users, Users,
};

export function ProfilePage({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="My Profile" subtitle="Your developer reputation and proof-of-skill profile.">
        <button className="inline-flex items-center gap-2 text-sm font-semibold text-body border border-default bg-card px-4 py-2.5 rounded-xl hover:border-brand-400 transition-colors"><Pencil className="w-4 h-4" /> Edit Profile</button>
        <button className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-500 px-4 py-2.5 rounded-xl hover:bg-brand-600 transition-colors"><Share2 className="w-4 h-4" /> Share</button>
        <button onClick={onLogout} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-error-500 px-4 py-2.5 rounded-xl hover:bg-error-600 transition-colors"><LogOut className="w-4 h-4" /> Logout</button>
      </PageHeader>

      {/* Profile header */}
      <div className="bg-gradient-to-r from-brand-50 to-cyan-50 dark:from-brand-950/30 dark:to-cyan-950/20 border border-default rounded-2xl p-6 lg:p-8 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-brand-500/10 blur-[60px] pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start gap-5 relative">
          <Avatar initials={currentUser.initials} gradient={currentUser.gradient} size="xl" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-body">{currentUser.name}</h2>
            <p className="text-sm text-muted mt-1">{currentUser.role}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/50 px-2 py-1 rounded-md"><Check className="w-3 h-3" /> Verified Builder</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 px-2 py-1 rounded-md"><Award className="w-3 h-3" /> Reputation: {currentUser.reputation}/100</span>
            </div>
          </div>
          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0 mt-4 sm:mt-0">
            <div className="text-xs text-muted">Reputation</div>
            <div className="text-4xl font-extrabold text-gradient">{currentUser.reputation}<span className="text-sm text-muted">/100</span></div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        {/* Skills */}
        <div className="bg-card border border-default rounded-2xl p-5">
          <h3 className="text-sm font-bold text-body mb-4">Skills</h3>
          <div className="space-y-3">
            {userSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-body">{skill.name}</span>
                  <span className="text-xs font-semibold text-muted tabular-nums">{skill.proficiency}%</span>
                </div>
                <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: `${skill.proficiency}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ATS Resume */}
        <div className="bg-card border border-default rounded-2xl p-5">
          <h3 className="text-sm font-bold text-body mb-4">ATS Resume Score</h3>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-ink-100 dark:text-ink-800" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#atsGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 42 * currentUser.atsScore / 100} ${2 * Math.PI * 42}`} />
                <defs>
                  <linearGradient id="atsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-body">{currentUser.atsScore}</span>
                <span className="text-[10px] text-muted">/ 100</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted text-center">Separate from reputation. Based on resume formatting and keyword optimization.</p>
        </div>

        {/* Proof of Skill */}
        <div className="bg-card border border-default rounded-2xl p-5">
          <h3 className="text-sm font-bold text-body mb-4">Proof of Skill</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Trophy, val: 6, label: 'Hackathons', color: 'text-warning-500' },
              { icon: Star, val: 2, label: 'Wins', color: 'text-warning-500' },
              { icon: Rocket, val: 8, label: 'Projects', color: 'text-brand-500' },
              { icon: Users, val: 18, label: 'Collaborations', color: 'text-cyan-500' },
            ].map((e) => (
              <div key={e.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                <e.icon className={`w-4 h-4 ${e.color}`} />
                <div>
                  <div className="text-lg font-bold text-body leading-none">{e.val}</div>
                  <div className="text-[10px] text-muted">{e.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GitHub Activity */}
      <div className="bg-card border border-default rounded-2xl p-5 lg:p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-body" />
            <h3 className="text-sm font-bold text-body">GitHub Activity — Last 3 Months</h3>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <span className="text-muted">847 commits</span>
            <span className="text-muted hidden sm:inline">12 repositories</span>
          </div>
        </div>
        {/* Contribution heatmap */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-cols-[repeat(26,1fr)] gap-1 min-w-[600px]">
            {Array.from({ length: 26 * 7 }).map((_, i) => {
              const intensity = Math.floor(Math.sin(i * 0.3) * 2 + Math.random() * 3);
              const colors = ['bg-ink-100 dark:bg-ink-800', 'bg-brand-200 dark:bg-brand-900', 'bg-brand-400 dark:bg-brand-700', 'bg-brand-600 dark:bg-brand-500'];
              return <div key={i} className={`w-full aspect-square rounded-sm ${colors[Math.min(intensity, 3)]}`} />;
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 text-[10px] text-muted">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-ink-100 dark:bg-ink-800" />
          <div className="w-2.5 h-2.5 rounded-sm bg-brand-200 dark:bg-brand-900" />
          <div className="w-2.5 h-2.5 rounded-sm bg-brand-400 dark:bg-brand-700" />
          <div className="w-2.5 h-2.5 rounded-sm bg-brand-600 dark:bg-brand-500" />
          <span>More</span>
        </div>
      </div>

      {/* External Profiles */}
      <div className="bg-card border border-default rounded-2xl p-5 lg:p-6 mb-6">
        <h3 className="text-sm font-bold text-body mb-4">External Profiles</h3>
        <div className="flex flex-wrap gap-3">
          {externalProfiles.map((p) => {
            const Icon = profileIcons[p.icon] || Globe;
            return (
              <div key={p.name} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-default hover:border-strong hover:-translate-y-0.5 transition-all cursor-pointer">
                <Icon className="w-4 h-4 text-brand-500" />
                <div>
                  <div className="text-xs font-semibold text-body">{p.name}</div>
                  <div className="text-[10px] text-muted">{p.handle}</div>
                </div>
                <ExternalLink className="w-3 h-3 text-muted ml-1" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Projects */}
      <div className="bg-card border border-default rounded-2xl p-5 lg:p-6 mb-6">
        <h3 className="text-sm font-bold text-body mb-4">Projects</h3>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.slice(0, 6).map((project) => (
            <div key={project.name} className="border border-default rounded-xl p-4 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-soft transition-all">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-brand-500" />
                  <h4 className="text-sm font-bold text-body">{project.name}</h4>
                </div>
                {project.winner && <Trophy className="w-3.5 h-3.5 text-warning-500" />}
              </div>
              <p className="text-xs text-muted leading-relaxed mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1">{project.techStack.slice(0, 3).map((s) => <SkillChip key={s} label={s} size="sm" />)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hackathon History */}
      <div className="bg-card border border-default rounded-2xl p-5 lg:p-6 mb-6">
        <h3 className="text-sm font-bold text-body mb-4">Hackathon History</h3>
        <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-ink-200 dark:before:bg-ink-700">
          {hackathonHistory.map((h) => (
            <div key={h.name} className="relative">
              <div className={`absolute -left-[18px] top-1.5 w-3 h-3 rounded-full ring-2 ring-white dark:ring-ink-900 ${h.winner ? 'bg-warning-500' : 'bg-brand-500'}`} />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-body">{h.name}</h4>
                  <span className="text-xs text-muted">{h.date}</span>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  h.winner ? 'text-warning-700 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-300' : 'text-muted bg-ink-100 dark:bg-ink-800'
                }`}>{h.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-card border border-default rounded-2xl p-5 lg:p-6">
        <h3 className="text-sm font-bold text-body mb-2">Badges</h3>
        <p className="text-xs text-muted mb-4">Earned through verified activity — not manually claimed.</p>
        <div className="flex flex-wrap gap-3">
          {userBadges.map((b) => {
            const Icon = badgeIcons[b.icon] || Award;
            return (
              <div key={b.name} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-default hover:-translate-y-0.5 transition-transform">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${b.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-body">{b.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
