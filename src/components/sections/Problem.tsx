import { FileText, Users, FolderGit2, Upload, ScatterChart, Link2, Check, X } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const todaySteps = [
  { icon: FileText, label: 'Hackathon listing' },
  { icon: Users, label: 'Team formation' },
  { icon: FolderGit2, label: 'Project' },
  { icon: Upload, label: 'Submission' },
];

const hackMeetSteps = [
  { icon: FileText, label: 'Hackathon' },
  { icon: Users, label: 'AI Team Match' },
  { icon: Link2, label: 'Collaboration' },
  { icon: FolderGit2, label: 'Verified Project' },
  { icon: Check, label: 'Reputation' },
  { icon: Users, label: 'Recruiter Discovery' },
  { icon: Check, label: 'Interview' },
];

export function Problem() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-body leading-tight">
              Hackathons create talent.
              <br />
              <span className="text-muted">But talent gets lost after the hackathon.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* TODAY */}
          <Reveal>
            <div className="bg-card border border-default rounded-2xl p-6 lg:p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-error-50 dark:bg-error-950/40 flex items-center justify-center">
                  <X className="w-4 h-4 text-error-500" />
                </div>
                <h3 className="text-lg font-bold text-body">Today</h3>
              </div>
              <div className="space-y-3">
                {todaySteps.map((step, i) => (
                  <div key={step.label}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-dashed border-default opacity-70">
                      <step.icon className="w-4 h-4 text-ink-400 dark:text-ink-500" />
                      <span className="text-sm font-medium text-muted">{step.label}</span>
                    </div>
                    {i < todaySteps.length - 1 && (
                      <div className="flex justify-center py-1">
                        <div className="w-px h-4 bg-ink-200 dark:bg-ink-700 border-l-2 border-dashed border-error-300 dark:border-error-800" />
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-error-300 dark:border-error-800">
                  <ScatterChart className="w-4 h-4 text-error-500" />
                  <span className="text-sm font-semibold text-error-600 dark:text-error-400">Everything gets scattered</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* WITH HACK-MEET */}
          <Reveal delay={150}>
            <div className="bg-gradient-to-br from-brand-50 to-cyan-50 dark:from-brand-950/30 dark:to-cyan-950/20 border border-brand-200 dark:border-brand-800/50 rounded-2xl p-6 lg:p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-500/10 blur-[60px] pointer-events-none" />
              <div className="flex items-center gap-2 mb-6 relative">
                <div className="w-8 h-8 rounded-lg bg-success-50 dark:bg-success-950/40 flex items-center justify-center">
                  <Check className="w-4 h-4 text-success-500" />
                </div>
                <h3 className="text-lg font-bold text-body">With Hack-Meet</h3>
              </div>
              <div className="space-y-2.5 relative">
                {hackMeetSteps.map((step, i) => (
                  <div key={step.label}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-brand-200 dark:border-brand-800/50 shadow-soft">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                        <step.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-body">{step.label}</span>
                    </div>
                    {i < hackMeetSteps.length - 1 && (
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
