import { UserPlus, Check, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

function Avatar({ initials, gradient, size = 'md' }: { initials: string; gradient: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'w-14 h-14 text-lg' : size === 'md' ? 'w-10 h-10 text-sm' : 'w-7 h-7 text-[10px]';
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold ring-2 ring-white dark:ring-ink-900`}>
      {initials}
    </div>
  );
}

function MatchRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted">{label}</span>
      <div className="flex items-center gap-2 flex-1 max-w-[120px]">
        <div className="h-1.5 flex-1 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: `${value}%` }} />
        </div>
        <span className="text-xs font-semibold text-body tabular-nums w-8 text-right">{value}%</span>
      </div>
    </div>
  );
}

const candidates = [
  { name: 'Rahul Sharma', initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', score: 94, skills: ['React', 'Next.js', 'TypeScript', 'Figma'] },
  { name: 'Ananya Gupta', initials: 'AG', gradient: 'from-success-500 to-success-700', score: 88, skills: ['UI/UX', 'Figma', 'Tailwind'] },
  { name: 'Karthik Rao', initials: 'KR', gradient: 'from-warning-500 to-warning-700', score: 82, skills: ['ML', 'Python', 'TensorFlow'] },
  { name: 'Neha Singh', initials: 'NS', gradient: 'from-brand-500 to-brand-700', score: 79, skills: ['React', 'Redux', 'Node.js'] },
];

export function TeamMatch() {
  return (
    <section id="team-match" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
              AI Team Matching
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-body leading-tight">
              Don't build a team by luck.
              <br />
              <span className="text-gradient">Build it by compatibility.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Your Skills */}
          <Reveal className="lg:col-span-2">
            <div className="bg-card border border-default rounded-2xl p-6 lg:p-8 h-full">
              <h3 className="text-sm font-bold text-body mb-5">Your Skills</h3>
              <div className="space-y-2 mb-6">
                {['Backend', 'Node.js', 'Python', 'MongoDB'].map((s) => (
                  <div key={s} className="flex items-center gap-2 p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950/30">
                    <Check className="w-4 h-4 text-brand-500" />
                    <span className="text-sm font-medium text-body">{s}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-sm font-bold text-body mb-3">Looking for:</h3>
              <div className="flex flex-wrap gap-2">
                {['Frontend', 'UI/UX', 'ML'].map((s) => (
                  <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-lg border border-dashed border-strong text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: Recommended Teammate */}
          <Reveal delay={150} className="lg:col-span-3">
            <div className="bg-gradient-to-br from-brand-50 to-cyan-50 dark:from-brand-950/30 dark:to-cyan-950/20 border border-brand-200 dark:border-brand-800/50 rounded-2xl p-6 lg:p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-500/15 blur-[60px] pointer-events-none" />
              <div className="flex items-center gap-2 mb-5 relative">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Recommended Teammate</span>
              </div>
              <div className="flex items-center gap-4 mb-6 relative">
                <Avatar initials="RS" gradient="from-cyan-500 to-cyan-700" size="lg" />
                <div>
                  <h3 className="text-lg font-bold text-body">Rahul Sharma</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-gradient">
                      <AnimatedNumber value={94} suffix="%" />
                    </span>
                    <span className="text-xs text-success-600 dark:text-success-400 font-medium">Compatibility</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5 mb-5 relative">
                <MatchRow label="Skill Complementarity" value={96} />
                <MatchRow label="Domain Match" value={91} />
                <MatchRow label="Availability" value={95} />
                <MatchRow label="Commitment" value={100} />
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5 relative">
                {candidates[0].skills.map((s) => (
                  <span key={s} className="text-xs font-medium px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                    {s}
                  </span>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 px-5 py-2.5 rounded-xl shadow-soft hover:shadow-float transition-all relative">
                <UserPlus className="w-4 h-4" />
                Invite to Team
              </button>
            </div>
          </Reveal>
        </div>

        {/* Candidate cards */}
        <Reveal delay={200}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {candidates.map((c, i) => (
              <div key={c.name} className="bg-card border border-default rounded-2xl p-5 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar initials={c.initials} gradient={c.gradient} />
                  <div>
                    <div className="text-sm font-bold text-body">{c.name}</div>
                    <div className="text-xs text-muted">{c.score}% compatible</div>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400"
                    style={{ width: `${c.score}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {c.skills.map((s) => (
                    <span key={s} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-ink-50 dark:bg-ink-800/50 text-muted">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
