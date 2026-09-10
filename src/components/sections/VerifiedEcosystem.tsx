import { ShieldCheck, Building2, Briefcase, Trophy, FolderGit2, Flag, Lock, Github, Linkedin } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const trustItems = [
  { icon: Building2, label: 'Verified Organizers' },
  { icon: Briefcase, label: 'Verified Recruiters' },
  { icon: Trophy, label: 'Verified Hackathon Results' },
  { icon: FolderGit2, label: 'Verified Project Submissions' },
  { icon: Flag, label: 'Report & Flag System' },
  { icon: ShieldCheck, label: 'Moderated Communication' },
];

const professionalProfiles = [
  { icon: Github, label: 'GitHub' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Trophy, label: 'LeetCode' },
  { icon: Trophy, label: 'CodeChef' },
  { icon: Briefcase, label: 'Portfolio' },
];

export function VerifiedEcosystem() {
  return (
    <section className="relative py-20 lg:py-28 bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
              Verified Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-body leading-tight">
              Trust matters when
              <br />
              people <span className="text-gradient">meet online.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Trust items */}
          <Reveal>
            <div className="bg-card border border-default rounded-2xl p-6 lg:p-8 h-full">
              <div className="grid sm:grid-cols-2 gap-3">
                {trustItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3.5 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-default hover:border-strong transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-success-400 to-success-600 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-body">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Privacy + Professional profiles */}
          <Reveal delay={150}>
            <div className="space-y-6">
              {/* Privacy */}
              <div className="bg-gradient-to-br from-brand-50 to-cyan-50 dark:from-brand-950/30 dark:to-cyan-950/20 border border-brand-200 dark:border-brand-800/50 rounded-2xl p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-500/10 blur-[50px] pointer-events-none" />
                <div className="flex items-center gap-2.5 mb-3 relative">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-body">Private by Default</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed relative">
                  Personal phone numbers and email addresses remain private between students and professionals. Only you decide when to share contact details.
                </p>
              </div>

              {/* Professional profiles */}
              <div className="bg-card border border-default rounded-2xl p-6 lg:p-8">
                <h3 className="text-sm font-bold text-body mb-4">Professional Profiles (Visible)</h3>
                <div className="flex flex-wrap gap-2.5">
                  {professionalProfiles.map((p) => (
                    <div key={p.label} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-default hover:border-strong hover:-translate-y-0.5 transition-all cursor-default">
                      <p.icon className="w-4 h-4 text-brand-500" />
                      <span className="text-xs font-medium text-body">{p.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted mt-4">
                  Displayed according to your profile visibility settings.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
