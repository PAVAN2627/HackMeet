import { Code2, Building2, UserCheck, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const cards = [
  {
    icon: Code2,
    emoji: '👨‍💻',
    title: 'Builders',
    desc: 'Build your proof of skill.',
    sub: 'Find hackathons, teammates and opportunities.',
    cta: 'Join as Builder',
    color: 'from-brand-500 to-brand-700',
    bg: 'from-brand-50 to-brand-100 dark:from-brand-950/30 dark:to-brand-900/10',
    border: 'border-brand-200 dark:border-brand-800/50',
    text: 'text-brand-600 dark:text-brand-400',
  },
  {
    icon: Building2,
    emoji: '🏫',
    title: 'Organizers',
    desc: 'Turn ideas into communities.',
    sub: 'Create, manage and run hackathons.',
    cta: 'Host a Hackathon',
    color: 'from-cyan-500 to-cyan-700',
    bg: 'from-cyan-50 to-cyan-100 dark:from-cyan-950/30 dark:to-cyan-900/10',
    border: 'border-cyan-200 dark:border-cyan-800/50',
    text: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    icon: UserCheck,
    emoji: '🧑‍💼',
    title: 'Recruiters',
    desc: 'Discover proven talent.',
    sub: 'Find candidates through skills, projects and real hackathon evidence.',
    cta: 'Find Talent',
    color: 'from-success-500 to-success-700',
    bg: 'from-success-50 to-success-100 dark:from-success-950/30 dark:to-success-900/10',
    border: 'border-success-200 dark:border-success-800/50',
    text: 'text-success-600 dark:text-success-400',
  },
];

export function ThreeSidedEcosystem() {
  return (
    <section className="relative py-20 lg:py-28 bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
              Three-Sided Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-body leading-tight">
              One platform. <span className="text-gradient">Three sides.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 100}>
              <div className={`relative bg-gradient-to-br ${card.bg} border ${card.border} rounded-3xl p-8 h-full overflow-hidden group hover:-translate-y-1 transition-transform`}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 dark:bg-white/5 blur-[40px] pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-float group-hover:scale-110 transition-transform`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-muted">{card.emoji}</div>
                      <h3 className={`text-xl font-bold ${card.text}`}>{card.title}</h3>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-body mb-2">{card.desc}</p>
                  <p className="text-sm text-muted mb-6 leading-relaxed">{card.sub}</p>
                  <a
                    href="#"
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r ${card.color} px-5 py-2.5 rounded-xl shadow-soft hover:shadow-float transition-all group/btn`}
                  >
                    {card.cta}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
