import { Code2, Building2, UserCheck, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const sides = [
  {
    icon: Code2,
    label: 'Builders',
    emoji: '👨‍💻',
    steps: ['Discover', 'Team Up', 'Build', 'Prove'],
    color: 'from-brand-500 to-brand-700',
    text: 'text-brand-600 dark:text-brand-400',
  },
  {
    icon: Building2,
    label: 'Organizers',
    emoji: '🏫',
    steps: ['Create', 'Manage', 'Judge', 'Showcase'],
    color: 'from-cyan-500 to-cyan-700',
    text: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    icon: UserCheck,
    label: 'Recruiters',
    emoji: '🧑‍💼',
    steps: ['Discover', 'Match', 'Invite', 'Hire'],
    color: 'from-success-500 to-success-700',
    text: 'text-success-600 dark:text-success-400',
  },
];

export function TrustStrip() {
  return (
    <section className="relative py-12 lg:py-16 border-y border-default bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-semibold text-muted uppercase tracking-wider mb-10">
            One platform. Three sides. One talent ecosystem.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {sides.map((side, i) => (
            <Reveal key={side.label} delay={i * 100}>
              <div className="bg-card border border-default rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${side.color} flex items-center justify-center shadow-soft`}>
                    <side.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted">{side.emoji}</div>
                    <div className={`text-lg font-bold ${side.text}`}>{side.label}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {side.steps.map((step, j) => (
                    <div key={step} className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-body px-2.5 py-1 rounded-lg bg-ink-50 dark:bg-ink-800/50">
                        {step}
                      </span>
                      {j < side.steps.length - 1 && <ArrowRight className="w-3 h-3 text-ink-300 dark:text-ink-600" />}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
