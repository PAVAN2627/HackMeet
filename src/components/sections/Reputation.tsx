import { Trophy, Rocket, Handshake, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

const metrics = [
  { label: 'Team Reliability', value: 94, color: 'from-brand-500 to-brand-600' },
  { label: 'Project Contribution', value: 89, color: 'from-cyan-400 to-cyan-500' },
  { label: 'Communication', value: 92, color: 'from-success-400 to-success-500' },
  { label: 'Submission Reliability', value: 96, color: 'from-brand-500 to-cyan-400' },
];

const badges = [
  { icon: Trophy, label: 'Hackathon Winner', color: 'from-warning-400 to-warning-600', bg: 'bg-warning-50 dark:bg-warning-950/30' },
  { icon: Rocket, label: 'Consistent Builder', color: 'from-brand-500 to-brand-700', bg: 'bg-brand-50 dark:bg-brand-950/30' },
  { icon: Handshake, label: 'Reliable Teammate', color: 'from-success-400 to-success-600', bg: 'bg-success-50 dark:bg-success-950/30' },
];

export function Reputation() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
              Reputation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-body leading-tight">
              Your work should build
              <br />
              your <span className="text-gradient">reputation.</span>
            </h2>
            <p className="mt-5 text-base lg:text-lg text-muted max-w-2xl mx-auto">
              Completed hackathons, verified submissions, teamwork, and peer reviews create a persistent reputation that follows you everywhere.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Big score */}
          <Reveal>
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 text-white text-center h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-[50px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-cyan-400/20 blur-[40px] pointer-events-none" />
              <div className="relative">
                <div className="text-xs font-medium text-white/70 uppercase tracking-wider mb-3">Hack-Meet Reputation</div>
                <div className="text-7xl font-extrabold tabular-nums">
                  <AnimatedNumber value={91} />
                </div>
                <div className="text-sm text-white/70 mt-1">out of 100</div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium bg-white/15 px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Reputation
                </div>
              </div>
            </div>
          </Reveal>

          {/* Metrics */}
          <Reveal delay={150} className="lg:col-span-2">
            <div className="bg-card border border-default rounded-3xl p-6 lg:p-8 h-full">
              <h3 className="text-sm font-bold text-body mb-5">Reputation Breakdown</h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {metrics.map((m, i) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-body">{m.label}</span>
                      <span className="text-sm font-bold text-body tabular-nums">
                        <AnimatedNumber value={m.value} suffix="%" />
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${m.color}`}
                        style={{ width: '0%', transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)', transitionDelay: `${i * 100 + 200}ms` }}
                        ref={(el) => {
                          if (el) setTimeout(() => (el.style.width = `${m.value}%`), 100);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="mt-7 pt-6 border-t border-default">
                <p className="text-xs text-muted mb-3">
                  Earned through verified activity — not manually claimed.
                </p>
                <div className="flex flex-wrap gap-3">
                  {badges.map((b) => (
                    <div key={b.label} className={`flex items-center gap-2.5 ${b.bg} px-3.5 py-2.5 rounded-xl border border-default hover:-translate-y-0.5 transition-transform cursor-default`}>
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${b.color} flex items-center justify-center`}>
                        <b.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-body">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
