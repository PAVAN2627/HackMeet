import { FileText, User, Mail, Check, Sparkles, TrendingUp } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

function Avatar({ initials, gradient, size = 'lg' }: { initials: string; gradient: string; size?: 'lg' | 'sm' }) {
  const sz = size === 'lg' ? 'w-14 h-14 text-lg' : 'w-8 h-8 text-[10px]';
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold ring-2 ring-white dark:ring-ink-900`}>
      {initials}
    </div>
  );
}

const matchMetrics = [
  { label: 'ATS Resume Score', value: 86, suffix: '/100' },
  { label: 'Skill Match', value: 97, suffix: '%' },
  { label: 'Project Match', value: 93, suffix: '%' },
  { label: 'Hackathon Evidence', value: 91, suffix: '%' },
];

const bgCandidates = [
  { initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', name: 'Rahul S.', score: 88 },
  { initials: 'AG', gradient: 'from-success-500 to-success-700', name: 'Ananya G.', score: 84 },
  { initials: 'KR', gradient: 'from-warning-500 to-warning-700', name: 'Karthik R.', score: 79 },
];

export function Recruiter() {
  return (
    <section id="recruiters" className="relative py-20 lg:py-28 bg-ink-900 dark:bg-ink-950 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">
              For Recruiters
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Stop waiting for candidates
              <br />
              to <span className="text-gradient-cyan">apply.</span>
            </h2>
            <p className="mt-5 text-base lg:text-lg text-ink-400 max-w-2xl mx-auto">
              Discover people who have already demonstrated the skills you need.
            </p>
          </div>
        </Reveal>

        <div className="relative max-w-5xl mx-auto">
          {/* Background candidate cards */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 scale-95 opacity-40 blur-[1px] pointer-events-none">
            {bgCandidates.map((c, i) => (
              <div
                key={c.name}
                className="bg-ink-800/60 border border-ink-700 rounded-2xl p-5 w-56"
                style={{ transform: `translateY(${i % 2 === 0 ? -20 : 20}px) rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Avatar initials={c.initials} gradient={c.gradient} size="sm" />
                  <span className="text-sm font-medium text-ink-300">{c.name}</span>
                </div>
                <div className="text-2xl font-bold text-ink-400">{c.score}%</div>
              </div>
            ))}
          </div>

          {/* Main recruiter card */}
          <Reveal delay={100}>
            <div className="relative bg-ink-800/80 backdrop-blur-sm border border-ink-700 rounded-3xl p-6 lg:p-8 shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: candidate info */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">AI Talent Match</span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar initials="PM" gradient="from-brand-500 to-brand-700" />
                    <div>
                      <h3 className="text-lg font-bold text-white">Pavan Mali</h3>
                      <p className="text-sm text-ink-400">Software Developer Intern</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-4xl font-extrabold text-gradient-cyan">
                      <AnimatedNumber value={94} suffix="%" />
                    </span>
                    <span className="text-xs text-success-400 font-medium">Match</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-md bg-success-500/15 text-success-400">Active</span>
                    <span className="text-xs font-medium px-2 py-1 rounded-md bg-brand-500/15 text-brand-300">Open to offers</span>
                  </div>
                </div>

                {/* Right: metrics */}
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white mb-4">Match Breakdown</h4>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {matchMetrics.map((m) => (
                      <div key={m.label} className="bg-ink-900/50 border border-ink-700 rounded-xl p-3">
                        <div className="text-xs text-ink-400 mb-1">{m.label}</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold text-white tabular-nums">
                            <AnimatedNumber value={m.value} />
                          </span>
                          <span className="text-xs text-ink-500">{m.suffix}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-ink-700 overflow-hidden mt-2">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400"
                            style={{ width: '0%', transition: 'width 1.2s ease' }}
                            ref={(el) => { if (el) setTimeout(() => el.style.width = `${m.value}%`, 200); }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-ink-900/50 border border-ink-700 mb-5">
                    <TrendingUp className="w-4 h-4 text-success-400" />
                    <span className="text-xs text-ink-300">GitHub Activity: <span className="text-success-400 font-semibold">Active</span></span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 rounded-xl hover:from-brand-700 hover:to-brand-600 transition-all">
                      <FileText className="w-4 h-4" /> View Resume
                    </button>
                    <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-ink-700 border border-ink-600 px-4 py-2.5 rounded-xl hover:bg-ink-600 transition-all">
                      <User className="w-4 h-4" /> View Profile
                    </button>
                    <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 bg-cyan-400 px-4 py-2.5 rounded-xl hover:bg-cyan-300 transition-all">
                      <Mail className="w-4 h-4" /> Invite Candidate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
