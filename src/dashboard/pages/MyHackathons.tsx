import { useState } from 'react';
import { CalendarDays, Trophy, Check, Clock, Users, ArrowRight } from 'lucide-react';
import { recommendedHackathons, hackathonHistory } from '@/dashboard/data';
import type { PageId } from '@/dashboard/Layout';
import { Avatar, SkillChip, PageHeader, EmptyState } from '@/dashboard/components';

export function MyHackathonsPage({ setPage }: { setPage: (p: PageId) => void }) {
  const [tab, setTab] = useState('Active');
  const active = recommendedHackathons.slice(0, 2);
  const completed = hackathonHistory.filter((h) => h.result !== 'In Progress');

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="My Hackathons" subtitle="Track your hackathon journey from registration to results." />

      <div className="flex items-center gap-2 mb-6">
        {['Active', 'Completed', 'All'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === t ? 'bg-brand-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{t}</button>
        ))}
      </div>

      {(tab === 'Active' || tab === 'All') && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-body mb-4">Active Hackathons</h2>
          <div className="grid lg:grid-cols-2 gap-5">
            {active.map((h) => (
              <div key={h.title} className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-shadow">
                <div className={`h-28 bg-gradient-to-br ${h.gradient} p-5 flex items-end justify-between`}>
                  <div className="text-white"><div className="text-xl font-bold">{h.prize}</div><div className="text-xs text-white/75">Prize pool</div></div>
                  {h.verified && <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success-700 bg-white/90 px-2 py-1 rounded-full"><Check className="w-3 h-3" /> Verified</span>}
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-body">{h.title}</h3>
                  <p className="text-xs text-muted mt-1">{h.organizer}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    <div className="flex items-center gap-2 text-xs text-muted"><Clock className="w-3.5 h-3.5 text-warning-500" />{h.deadline}</div>
                    <div className="flex items-center gap-2 text-xs text-muted"><Users className="w-3.5 h-3.5 text-cyan-500" />{h.teamSize}</div>
                    <div className="flex items-center gap-2 text-xs text-muted"><CalendarDays className="w-3.5 h-3.5 text-brand-500" />{h.mode}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4">{h.tags.map((tag) => <SkillChip key={tag} label={tag} size="sm" />)}</div>
                  <div className="flex gap-2 mt-5">
                    <button onClick={() => setPage('workspace')} className="flex-1 text-xs font-semibold text-white bg-brand-500 rounded-lg py-2.5 hover:bg-brand-600 transition-colors">Open Workspace</button>
                    <button onClick={() => setPage('hackathon-details')} className="flex-1 text-xs font-semibold text-body border border-default rounded-lg py-2.5 hover:border-brand-400 transition-colors">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(tab === 'Completed' || tab === 'All') && (
        <div>
          <h2 className="text-lg font-bold text-body mb-4">Completed Hackathons</h2>
          <div className="bg-card border border-default rounded-2xl overflow-hidden">
            {completed.map((h, i) => (
                <div className={`flex items-center gap-3 p-4 ${i !== completed.length - 1 ? 'border-b border-default' : ''} hover:bg-ink-50/50 dark:hover:bg-ink-800/20 transition-colors`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${h.winner ? 'bg-warning-50 dark:bg-warning-950/40' : 'bg-ink-50 dark:bg-ink-800/40'}`}>
                  <Trophy className={`w-5 h-5 ${h.winner ? 'text-warning-500' : 'text-ink-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-body">{h.name}</h3>
                  <span className="text-xs text-muted">{h.date}</span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${h.winner ? 'text-warning-700 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-300' : 'text-muted bg-ink-100 dark:bg-ink-800'}`}>{h.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Active' && active.length === 0 && (
        <div className="bg-card border border-default rounded-2xl"><EmptyState icon={CalendarDays} title="No active hackathons" description="Browse hackathons and register for your next challenge." /></div>
      )}
    </div>
  );
}
