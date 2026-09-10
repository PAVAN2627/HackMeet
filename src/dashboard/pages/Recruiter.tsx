import { Target, Check, X, Lock, Sparkles, Briefcase, TrendingUp, Eye } from 'lucide-react';
import { recruiterInvitations, currentUser } from '@/dashboard/data';
import { Avatar, MatchRow, PageHeader } from '@/dashboard/components';

export function RecruiterPage() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Recruiter Invitations" subtitle="Companies that are interested in your proven skills." />

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-[50px] pointer-events-none" />
          <div className="relative">
            <div className="text-xs text-white/70 uppercase tracking-wider">Your Profile Strength</div>
            <div className="text-4xl font-extrabold mt-1">{currentUser.reputation}<span className="text-sm text-white/60">/100</span></div>
            <p className="text-xs text-white/70 mt-2">Higher reputation = more recruiter visibility</p>
          </div>
        </div>
        <div className="bg-card border border-default rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3"><Eye className="w-4 h-4 text-cyan-500" /><span className="text-sm font-bold text-body">Profile Views</span></div>
          <div className="text-3xl font-bold text-body">47</div>
          <div className="text-xs text-success-600 dark:text-success-400 mt-1">+12 this week</div>
        </div>
        <div className="bg-card border border-default rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3"><Briefcase className="w-4 h-4 text-brand-500" /><span className="text-sm font-bold text-body">Active Invitations</span></div>
          <div className="text-3xl font-bold text-body">{recruiterInvitations.length}</div>
          <div className="text-xs text-muted mt-1">2 new this week</div>
        </div>
      </div>

      <h2 className="text-lg font-bold text-body mb-4">Open Invitations</h2>
      <div className="grid lg:grid-cols-2 gap-5">
        {recruiterInvitations.filter((inv) => !inv.locked).map((inv) => (
          <div key={inv.role} className="bg-card border border-default rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-body">{inv.role}</h3>
                <p className="text-sm text-muted mt-0.5">{inv.company}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-gradient">{inv.match}%</div>
                <div className="text-[10px] text-muted">role match</div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <MatchRow label="Skills Match" value={inv.skillMatch} />
              <MatchRow label="Project Match" value={inv.projectMatch} />
              <MatchRow label="Hackathon Reputation" value={inv.reputationMatch} />
            </div>
            <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-default mb-4">
              <p className="text-xs text-muted italic">"{inv.message}"</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 text-xs font-semibold text-body border border-default rounded-lg py-2.5 hover:border-brand-400 transition-colors">View Opportunity</button>
              <button className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold text-white bg-success-500 rounded-lg py-2.5 hover:bg-success-600 transition-colors"><Check className="w-3.5 h-3.5" /> Accept</button>
              <button className="px-3 text-xs font-semibold text-muted border border-default rounded-lg py-2.5 hover:text-error-500 hover:border-error-300 transition-colors"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Premium locked invitation */}
      <h2 className="text-lg font-bold text-body mt-8 mb-4">Premium Invitations</h2>
      {recruiterInvitations.filter((inv) => inv.locked).map((inv) => (
        <div key={inv.role} className="relative bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-warning-500" />
                <span className="text-xs font-semibold text-warning-600 dark:text-warning-400 uppercase tracking-wider">Premium Invitation</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-gradient">{inv.match}%</div>
                <div className="text-[10px] text-muted">match</div>
              </div>
            </div>
            <div className="blur-sm select-none pointer-events-none">
              <h3 className="text-base font-bold text-body">{inv.role}</h3>
              <p className="text-sm text-muted mt-0.5">{inv.company}</p>
              <div className="space-y-2 mt-4 mb-4">
                <MatchRow label="Skills Match" value={inv.skillMatch} />
                <MatchRow label="Project Match" value={inv.projectMatch} />
              </div>
              <p className="text-xs text-muted italic">"{inv.message}"</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-sm">
            <div className="text-center max-w-sm px-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-warning-400 to-warning-600 flex items-center justify-center mx-auto mb-4 shadow-float">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base font-bold text-body mb-1">Unlock Premium Invitations</h3>
              <p className="text-sm text-muted mb-4">Get access to exclusive recruiter invitations from top companies.</p>
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-warning-500 to-warning-600 px-5 py-2.5 rounded-xl shadow-soft hover:shadow-float transition-all">
                <Sparkles className="w-4 h-4" />
                Unlock with Hack-Meet Premium — ₹49 / 3 Months
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
