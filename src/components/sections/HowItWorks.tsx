import { Search, Users, Code2, Award, Eye, Briefcase } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const steps = [
  { num: '01', icon: Search, title: 'Discover', desc: 'Find verified hackathons.', color: 'from-brand-500 to-brand-700' },
  { num: '02', icon: Users, title: 'Match', desc: 'Find compatible teammates.', color: 'from-cyan-500 to-cyan-700' },
  { num: '03', icon: Code2, title: 'Build', desc: 'Collaborate and track your project.', color: 'from-success-500 to-success-700' },
  { num: '04', icon: Award, title: 'Prove', desc: 'Submit projects and earn reputation.', color: 'from-brand-500 to-cyan-500' },
  { num: '05', icon: Eye, title: 'Get Discovered', desc: 'Recruiters find you based on evidence.', color: 'from-warning-500 to-warning-700' },
  { num: '06', icon: Briefcase, title: 'Get Hired', desc: 'Receive direct opportunities.', color: 'from-brand-600 to-brand-800' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-body leading-tight">
              From discovery to <span className="text-gradient">getting hired.</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-brand-200 via-cyan-200 to-brand-200 dark:from-brand-800/50 dark:via-cyan-800/50 dark:to-brand-800/50" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-3">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="relative text-center group">
                  <div className="relative inline-flex mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-float group-hover:scale-110 transition-transform relative z-10`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-20 blur-lg group-hover:opacity-40 transition-opacity`} />
                  </div>
                  <div className="text-xs font-bold text-muted mb-1">{step.num}</div>
                  <h3 className="text-sm font-bold text-body mb-1">{step.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
