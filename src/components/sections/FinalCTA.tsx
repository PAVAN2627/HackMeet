import { ArrowRight, Rocket, Trophy, Users, Briefcase } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function FinalCTA({ onRegister }: { onRegister?: () => void }) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow + grid */}
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-30 dark:opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-brand-500/15 dark:bg-brand-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none" />

      {/* Floating mini cards in background */}
      <div className="absolute top-12 left-8 w-32 h-20 rounded-xl bg-card/60 border border-default shadow-float rotate-[-8deg] hidden lg:flex items-center justify-center opacity-50">
        <Trophy className="w-6 h-6 text-warning-500" />
      </div>
      <div className="absolute bottom-16 right-12 w-32 h-20 rounded-xl bg-card/60 border border-default shadow-float rotate-[6deg] hidden lg:flex items-center justify-center opacity-50">
        <Users className="w-6 h-6 text-brand-500" />
      </div>
      <div className="absolute top-20 right-16 w-28 h-16 rounded-xl bg-card/60 border border-default shadow-float rotate-[3deg] hidden lg:flex items-center justify-center opacity-40">
        <Briefcase className="w-5 h-5 text-cyan-500" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-default bg-card text-xs font-medium text-muted mb-6 shadow-soft">
            <Rocket className="w-3.5 h-3.5 text-brand-500" />
            Start building your proof of skill today
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-body leading-[1.1]">
            Your next opportunity could
            <br />
            start with your <span className="text-gradient">next project.</span>
          </h2>
          <p className="mt-6 text-base lg:text-lg text-muted max-w-2xl mx-auto">
            Build something real. Prove what you can do. Let the right people find you.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onRegister}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 px-7 py-3.5 rounded-xl shadow-float hover:shadow-glow transition-all group"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <a
              href="#hackathons"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-body bg-card border border-default hover:border-strong px-7 py-3.5 rounded-xl shadow-soft transition-all"
            >
              Explore Hackathons
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
