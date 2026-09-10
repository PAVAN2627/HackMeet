import {
  Trophy, Star, Rocket, Award, ArrowRight, Clock, Check, Users,
  ExternalLink, CalendarDays, Target, ChevronRight,
} from 'lucide-react';
import { currentUser, stats, currentHackathon, recommendedHackathons, recommendedTeammates } from '@/dashboard/data';
import type { PageId } from '@/dashboard/Layout';
import { Avatar, SkillChip, MatchRow, PageHeader } from '@/dashboard/components';

const iconMap = { Trophy, Star, Rocket, Award };

export function DashboardHome({ setPage }: { setPage: (p: PageId) => void }) {
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader
        title={`Good Afternoon, ${currentUser.name.split(' ')[0]}`}
        subtitle="Ready to build something great today?"
      >
        <button
          onClick={() => setPage('discover')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 px-4 py-2.5 rounded-xl shadow-soft hover:shadow-float transition-all"
        >
          <Rocket className="w-4 h-4" />
          Discover Hackathons
        </button>
      </PageHeader>

      {/* Stats overview */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon as keyof typeof iconMap];
          return (
            <div key={stat.label} className="bg-card border border-default rounded-2xl p-4 lg:p-5 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-soft`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-950/40 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-body tabular-nums">
                {stat.value}{stat.suffix || ''}
              </div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid xl:grid-cols-5 gap-6 mb-6">
        {/* Current hackathon */}
        <div className="xl:col-span-3 bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
          <div className="relative p-5 lg:p-6 bg-gradient-to-r from-brand-50 to-cyan-50 dark:from-brand-950/30 dark:to-cyan-950/20 border-b border-default">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-brand-500/10 blur-[60px] pointer-events-none" />
            <div className="flex items-start justify-between relative">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/50 px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
                    {currentHackathon.status}
                  </span>
                  <span className="text-xs text-muted">Current Hackathon</span>
                </div>
                <h2 className="text-lg lg:text-xl font-bold text-body">{currentHackathon.title}</h2>
                <p className="text-sm text-muted mt-1">{currentHackathon.project}</p>
              </div>
              <Trophy className="w-7 h-7 text-warning-500" />
            </div>
          </div>
          <div className="p-5 lg:p-6">
            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              <div>
                <div className="text-xs text-muted mb-1">Team</div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {currentHackathon.members.map((m) => <Avatar key={m.name} initials={m.initials} gradient={m.gradient} size="sm" />)}
                  </div>
                  <span className="text-sm font-semibold text-body">{currentHackathon.team}</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted mb-1">Progress</div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 max-w-[100px] rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: `${currentHackathon.progress}%` }} />
                  </div>
                  <span className="text-sm font-bold text-body">{currentHackathon.progress}%</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted mb-1">Deadline</div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-warning-600 dark:text-warning-400">
                  <Clock className="w-4 h-4" />
                  {currentHackathon.deadline}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-default">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-500" />
                <div>
                  <div className="text-[10px] text-muted">Next milestone</div>
                  <div className="text-sm font-semibold text-body">{currentHackathon.milestone}</div>
                </div>
              </div>
              <button onClick={() => setPage('workspace')} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 rounded-xl hover:from-brand-700 hover:to-brand-600 transition-all">
                Open Workspace <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Reputation panel */}
        <div className="xl:col-span-2 bg-gradient-to-br from-ink-900 to-brand-950 dark:from-ink-800 dark:to-brand-950 rounded-2xl p-6 text-white relative overflow-hidden shadow-soft">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-brand-500/20 blur-[60px] pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs text-ink-400 uppercase tracking-wider font-semibold">Your Reputation</div>
                <div className="text-4xl font-extrabold mt-1">{currentUser.reputation}<span className="text-base text-ink-400">/100</span></div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-warning-400" />
              </div>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden mb-5">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-brand-400" style={{ width: `${currentUser.reputation}%` }} />
            </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <Trophy className="w-4 h-4 text-warning-400 mx-auto mb-1" />
                <div className="text-lg font-bold">6</div>
                <div className="text-[10px] text-ink-400">Hackathons</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <Star className="w-4 h-4 text-warning-400 mx-auto mb-1" />
                <div className="text-lg font-bold">2</div>
                <div className="text-[10px] text-ink-400">Wins</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <Users className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <div className="text-lg font-bold">18</div>
                <div className="text-[10px] text-ink-400">Collaborations</div>
              </div>
            </div>
            <button onClick={() => setPage('profile')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-white transition-colors">
              View your proof-of-skill profile <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recommended hackathons */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-body">Recommended Hackathons</h2>
            <p className="text-xs text-muted mt-0.5">Based on your skills and interests</p>
          </div>
          <button onClick={() => setPage('discover')} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2 transition-all">View all <ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {recommendedHackathons.slice(0, 4).map((h) => (
            <div key={h.title} className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all group">
              <div className={`relative h-24 bg-gradient-to-br ${h.gradient} p-4 flex items-end`}>
                <div className="absolute inset-0 bg-black/10" />
                <Trophy className="w-7 h-7 text-white relative" />
                {h.verified && <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-semibold text-success-700 bg-white/90 px-2 py-1 rounded-full"><Check className="w-3 h-3" /> Verified</span>}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-body truncate">{h.title}</h3>
                <p className="text-xs text-muted mt-1 truncate">{h.organizer}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-base font-bold text-gradient">{h.prize}</span>
                  <span className="text-xs text-muted">{h.mode}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {h.tags.map((tag) => <SkillChip key={tag} label={tag} size="sm" color={tag === 'AI' || tag === 'GenAI' ? 'brand' : 'neutral'} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Team Match */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-body">AI Team Match</h2>
            <p className="text-xs text-muted mt-0.5">Find the most compatible teammates for your next hackathon</p>
          </div>
          <button onClick={() => setPage('teammates')} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2 transition-all">Explore matches <ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {recommendedTeammates.map((person) => (
            <div key={person.name} className="bg-card border border-default rounded-2xl p-4 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Avatar initials={person.initials} gradient={person.gradient} />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-body truncate">{person.name}</h3>
                  <span className="text-xs text-success-600 dark:text-success-400 font-medium">{person.availabilityStatus}</span>
                </div>
                <div className="ml-auto text-right flex-shrink-0">
                  <div className="text-xl font-extrabold text-gradient">{person.compatibility}%</div>
                  <div className="text-[9px] text-muted">match</div>
                </div>
              </div>
              <div className="space-y-1.5 mb-3">
                <MatchRow label="Skill Complement" value={person.skillComplement} />
                <MatchRow label="Domain Match" value={person.domainMatch} />
              </div>
              <div className="flex flex-wrap gap-1">
                {person.skills.map((skill) => <SkillChip key={skill} label={skill} size="sm" color="neutral" />)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
