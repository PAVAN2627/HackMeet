import { Trophy, Award, Rocket, Users, FileText, Activity, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SkillBar } from '@/components/ui/SkillBar';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

function Avatar({ initials, gradient, size = 'lg' }: { initials: string; gradient: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'w-16 h-16 text-xl' : size === 'md' ? 'w-9 h-9 text-xs' : 'w-7 h-7 text-[10px]';
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold ring-2 ring-white dark:ring-ink-900`}>
      {initials}
    </div>
  );
}

export function CoreInnovation() {
  return (
    <section className="relative py-20 lg:py-28 bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
              Core Innovation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-body leading-tight">
              From Hackathon Participation
              <br />
              to <span className="text-gradient">Proof of Skill</span>
            </h2>
            <p className="mt-5 text-base lg:text-lg text-muted max-w-2xl mx-auto">
              A resume tells recruiters what someone says they can do.
              <br className="hidden sm:block" />
              Hack-Meet shows what they have actually built.
            </p>
          </div>
        </Reveal>

        {/* Proof-of-Skill Profile */}
        <Reveal delay={100}>
          <div className="max-w-5xl mx-auto">
            <div className="bg-card border border-default rounded-3xl shadow-float overflow-hidden">
              {/* Profile header */}
              <div className="relative p-6 lg:p-8 bg-gradient-to-r from-brand-50 via-white to-cyan-50 dark:from-brand-950/30 dark:via-ink-900 dark:to-cyan-950/20 border-b border-default">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-brand-500/10 blur-[60px] pointer-events-none" />
                <div className="flex flex-col sm:flex-row items-start gap-5 relative">
                  <Avatar initials="PM" gradient="from-brand-500 to-brand-700" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-body">Pavan Mali</h3>
                    <p className="text-sm text-muted">Software Developer</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/50 px-2 py-1 rounded-md">
                        <Check className="w-3 h-3" /> Verified Builder
                      </span>
                      <span className="text-xs font-medium text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 px-2 py-1 rounded-md">
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted mb-1">Reputation</div>
                    <div className="text-3xl font-extrabold text-gradient">
                      <AnimatedNumber value={91} />/100
                    </div>
                  </div>
                </div>
              </div>

              {/* Body grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 lg:p-8">
                {/* Skills */}
                <div>
                  <h4 className="text-sm font-bold text-body mb-4">Skills</h4>
                  <div className="space-y-3">
                    <SkillBar label="React" value={96} color="brand" />
                    <SkillBar label="Node.js" value={91} color="success" delay={100} />
                    <SkillBar label="Python" value={87} color="cyan" delay={200} />
                    <SkillBar label="AWS" value={78} color="brand" delay={300} />
                  </div>
                </div>

                {/* Verified Evidence */}
                <div>
                  <h4 className="text-sm font-bold text-body mb-4">Verified Evidence</h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { icon: Trophy, val: '6', label: 'Hackathons', color: 'text-warning-500' },
                      { icon: Award, val: '2', label: 'Wins', color: 'text-warning-500' },
                      { icon: Rocket, val: '8', label: 'Projects', color: 'text-brand-500' },
                      { icon: Users, val: '18', label: 'Collaborations', color: 'text-cyan-500' },
                    ].map((e) => (
                      <div key={e.label} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                        <e.icon className={`w-4 h-4 ${e.color}`} />
                        <div>
                          <div className="text-base font-bold text-body leading-none">{e.val}</div>
                          <div className="text-[10px] text-muted">{e.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity + Resume */}
                <div className="md:col-span-2 lg:col-span-1">
                  <h4 className="text-sm font-bold text-body mb-4">Activity</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-success-500" />
                    <span className="text-xs font-medium text-muted">GitHub activity — Last 3 Months</span>
                  </div>
                  {/* GitHub-style contribution grid */}
                  <div className="grid grid-cols-[repeat(13,1fr)] gap-1 mb-5">
                    {Array.from({ length: 52 }).map((_, i) => {
                      const intensity = Math.floor(Math.sin(i * 0.5) * 2 + Math.random() * 3);
                      const colors = ['bg-ink-100 dark:bg-ink-800', 'bg-brand-200 dark:bg-brand-900', 'bg-brand-400 dark:bg-brand-700', 'bg-brand-600 dark:bg-brand-500'];
                      return <div key={i} className={`w-full aspect-square rounded-sm ${colors[Math.min(intensity, 3)]}`} />;
                    })}
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-default">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-500" />
                      <span className="text-xs font-medium text-body">Resume</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-muted">ATS Score</div>
                      <div className="text-sm font-bold text-success-600 dark:text-success-400">
                        <AnimatedNumber value={86} />/100
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
