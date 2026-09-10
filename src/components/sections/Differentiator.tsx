import { FileText, Send, Search, ClipboardCheck, UserCheck, Briefcase, ArrowRight, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const traditional = [
  { icon: FileText, label: 'Resume' },
  { icon: Send, label: 'Application' },
  { icon: Search, label: 'Screening' },
  { icon: ClipboardCheck, label: 'Assessment' },
  { icon: UserCheck, label: 'Interview' },
];

const hackMeet = [
  { icon: Briefcase, label: 'Hackathon' },
  { icon: FileText, label: 'Real Project' },
  { icon: Check, label: 'Verified Skills' },
  { icon: UserCheck, label: 'Team Reputation' },
  { icon: Search, label: 'AI Role Match' },
  { icon: UserCheck, label: 'Direct Invitation' },
];

export function Differentiator() {
  return (
    <section className="relative py-20 lg:py-28 bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
              Why Hack-Meet
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-body leading-tight">
              <span className="text-gradient">Proof</span> before application.
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Traditional */}
          <Reveal>
            <div className="bg-card border border-default rounded-2xl p-6 lg:p-8 h-full">
              <h3 className="text-lg font-bold text-muted mb-6">Traditional Hiring</h3>
              <div className="space-y-2">
                {traditional.map((step, i) => (
                  <div key={step.label}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 opacity-70">
                      <div className="w-8 h-8 rounded-lg bg-ink-200 dark:bg-ink-700 flex items-center justify-center">
                        <step.icon className="w-4 h-4 text-ink-500 dark:text-ink-400" />
                      </div>
                      <span className="text-sm font-medium text-muted">{step.label}</span>
                    </div>
                    {i < traditional.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <div className="w-px h-3 bg-ink-200 dark:bg-ink-700" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Hack-Meet */}
          <Reveal delay={150}>
            <div className="bg-gradient-to-br from-brand-50 to-cyan-50 dark:from-brand-950/30 dark:to-cyan-950/20 border border-brand-200 dark:border-brand-800/50 rounded-2xl p-6 lg:p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-500/10 blur-[60px] pointer-events-none" />
              <h3 className="text-lg font-bold text-gradient mb-6 relative">Hack-Meet</h3>
              <div className="space-y-2 relative">
                {hackMeet.map((step, i) => (
                  <div key={step.label}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-brand-200 dark:border-brand-800/50 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                        <step.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-body">{step.label}</span>
                      {i === hackMeet.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-success-500 ml-auto" />
                      )}
                    </div>
                    {i < hackMeet.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <div className="w-px h-3 bg-gradient-to-b from-brand-400 to-cyan-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
