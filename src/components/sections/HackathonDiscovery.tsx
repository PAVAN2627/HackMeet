import { Trophy, Check, ArrowRight, MapPin, Users } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const hackathons = [
  {
    title: 'AI Innovation Challenge',
    prize: '₹2L Prize',
    category: 'AI / GenAI',
    members: '2–4 Members',
    badge: 'Verified',
    gradient: 'from-brand-500 to-brand-700',
    bgGradient: 'from-brand-50 to-brand-100 dark:from-brand-950/40 dark:to-brand-900/20',
  },
  {
    title: 'FinTech Buildathon',
    prize: '₹1.5L Prize',
    category: 'FinTech',
    members: 'Online',
    badge: 'Trending',
    gradient: 'from-cyan-500 to-cyan-700',
    bgGradient: 'from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20',
  },
  {
    title: 'GreenTech Hack',
    prize: '₹1L Prize',
    category: 'Climate Tech',
    members: 'Hybrid',
    badge: 'New',
    gradient: 'from-success-500 to-success-700',
    bgGradient: 'from-success-50 to-success-100 dark:from-success-950/40 dark:to-success-900/20',
  },
  {
    title: 'Web3 Build Sprint',
    prize: '₹3L Prize',
    category: 'Blockchain',
    members: '1–5 Members',
    badge: 'Featured',
    gradient: 'from-warning-500 to-warning-700',
    bgGradient: 'from-warning-50 to-warning-100 dark:from-warning-950/40 dark:to-warning-900/20',
  },
];

export function HackathonDiscovery() {
  return (
    <section id="hackathons" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
                Discover Hackathons
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-body">
                Find your next <span className="text-gradient">challenge.</span>
              </h2>
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2.5 transition-all">
              View All Hackathons <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {hackathons.map((h) => (
              <div
                key={h.title}
                className="group bg-card border border-default rounded-2xl overflow-hidden shadow-soft hover:shadow-float hover:-translate-y-1 transition-all cursor-pointer"
              >
                {/* Card top */}
                <div className={`relative h-28 bg-gradient-to-br ${h.bgGradient} flex items-center justify-center overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${h.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${h.gradient} flex items-center justify-center shadow-float group-hover:scale-110 transition-transform`}>
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-semibold text-success-700 dark:text-success-400 bg-white/80 dark:bg-ink-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    {h.badge === 'Verified' && <Check className="w-3 h-3" />}
                    {h.badge}
                  </span>
                </div>
                {/* Card body */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-body mb-2">{h.title}</h3>
                  <div className="text-lg font-bold text-gradient mb-3">{h.prize}</div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-ink-50 dark:bg-ink-800/50 text-muted">{h.category}</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-ink-50 dark:bg-ink-800/50 text-muted">{h.members}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-default">
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <Users className="w-3.5 h-3.5" />
                      312 joined
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-500 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
