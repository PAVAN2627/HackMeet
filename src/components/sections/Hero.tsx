import { Trophy, Users, Briefcase, Award, Rocket, ArrowRight, Check, Zap, Star } from 'lucide-react';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

function Avatar({ initials, gradient, size = 'md' }: { initials: string; gradient: string; size?: 'sm' | 'md' }) {
  const sz = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-9 h-9 text-xs';
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-semibold ring-2 ring-white dark:ring-ink-900`}>
      {initials}
    </div>
  );
}

function SkillChip({ label, color = 'brand' }: { label: string; color?: 'brand' | 'cyan' | 'success' | 'neutral' }) {
  const map = {
    brand: 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300',
    cyan: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300',
    success: 'bg-success-50 text-success-700 dark:bg-success-950/50 dark:text-success-300',
    neutral: 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300',
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${map[color]} transition-transform hover:scale-105 cursor-default`}>
      {label}
    </span>
  );
}

function MatchRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted">{label}</span>
      <div className="flex items-center gap-2 flex-1 max-w-[100px]">
        <div className="h-1.5 flex-1 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: `${value}%` }} />
        </div>
        <span className="text-xs font-semibold text-body tabular-nums w-8 text-right">{value}%</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-28 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background grid + glow */}
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-50 dark:opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-500/10 dark:bg-brand-500/15 blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-400/10 dark:bg-cyan-500/10 blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-default bg-card text-xs font-medium text-muted mb-6 shadow-soft">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              One platform. Three sides. One talent ecosystem.
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-body">
              Build. Prove.
              <br />
              <span className="text-gradient">Get Discovered.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
              Hack-Meet connects builders with the right hackathons, teammates, projects, and opportunities — turning real-world work into verified proof of skill that recruiters can discover.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#hackathons"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 px-6 py-3.5 rounded-xl shadow-float hover:shadow-glow transition-all group"
              >
                Explore Hackathons
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#recruiters"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-body bg-card border border-default hover:border-strong px-6 py-3.5 rounded-xl shadow-soft transition-all"
              >
                Find Talent
              </a>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
              {[
                { v: 120, s: '+', l: 'Hackathons' },
                { v: 15, s: 'K+', l: 'Builders' },
                { v: 500, s: '+', l: 'Recruiters' },
              ].map((s) => (
                <div key={s.l} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-body tabular-nums">
                    <AnimatedNumber value={s.v} suffix={s.s} />
                  </div>
                  <div className="text-xs text-muted">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product composition */}
          {/* Mobile stacked layout */}
          <div className="sm:hidden mt-10 space-y-4">
            <div className="bg-card border border-default rounded-2xl p-5 shadow-float">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/50 px-2 py-1 rounded-full">
                  <Check className="w-3 h-3" /> Verified
                </span>
              </div>
              <h3 className="text-sm font-bold text-body leading-tight mb-1">AI Innovation Hackathon 2026</h3>
              <div className="text-lg font-bold text-gradient mb-3">₹2,00,000 Prize</div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <SkillChip label="AI / GenAI" color="brand" />
                <SkillChip label="2–4 Members" color="neutral" />
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-default">
                <div className="flex -space-x-2">
                  <Avatar initials="PM" gradient="from-brand-500 to-brand-700" size="sm" />
                  <Avatar initials="RS" gradient="from-cyan-500 to-cyan-700" size="sm" />
                  <Avatar initials="AK" gradient="from-success-500 to-success-700" size="sm" />
                </div>
                <span className="text-xs text-muted">427 registered</span>
              </div>
            </div>

            <div className="bg-card border border-default rounded-2xl p-5 shadow-float">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted">Team Compatibility</span>
                <Users className="w-4 h-4 text-brand-500" />
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-gradient">
                  <AnimatedNumber value={94} suffix="%" />
                </span>
                <span className="text-xs text-success-600 dark:text-success-400 font-medium">High match</span>
              </div>
              <div className="space-y-2.5 mb-4">
                <MatchRow label="Skill Match" value={96} />
                <MatchRow label="Domain Match" value={91} />
                <MatchRow label="Availability" value={95} />
                <MatchRow label="Commitment" value={100} />
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-default">
                <div className="flex -space-x-2">
                  <Avatar initials="PM" gradient="from-brand-500 to-brand-700" />
                  <Avatar initials="RS" gradient="from-cyan-500 to-cyan-700" />
                  <Avatar initials="AK" gradient="from-success-500 to-success-700" />
                  <Avatar initials="NS" gradient="from-warning-500 to-warning-700" />
                </div>
                <div className="flex flex-wrap gap-1 ml-1">
                  <SkillChip label="React" color="cyan" />
                  <SkillChip label="Node" color="success" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-default rounded-2xl p-4 shadow-float">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted">Role Match</span>
                  <Briefcase className="w-4 h-4 text-cyan-500" />
                </div>
                <div className="text-3xl font-extrabold text-gradient-cyan mb-1">
                  <AnimatedNumber value={96} suffix="%" />
                </div>
                <p className="text-xs font-semibold text-body mb-2">Software Developer Intern</p>
                <div className="space-y-1">
                  {['React', 'Node.js', 'MongoDB'].map((s) => (
                    <div key={s} className="flex items-center gap-1.5 text-[11px] text-body">
                      <Check className="w-3 h-3 text-success-500" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-default rounded-2xl p-4 shadow-float">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted">Reputation</span>
                  <Award className="w-4 h-4 text-warning-500" />
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-extrabold text-body">
                    <AnimatedNumber value={91} />
                  </span>
                  <span className="text-xs text-muted">/ 100</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div>
                    <Trophy className="w-3.5 h-3.5 text-warning-500 mx-auto mb-0.5" />
                    <div className="text-xs font-bold text-body">6</div>
                    <div className="text-[9px] text-muted">Hack</div>
                  </div>
                  <div>
                    <Star className="w-3.5 h-3.5 text-warning-500 mx-auto mb-0.5" />
                    <div className="text-xs font-bold text-body">2</div>
                    <div className="text-[9px] text-muted">Wins</div>
                  </div>
                  <div>
                    <Rocket className="w-3.5 h-3.5 text-brand-500 mx-auto mb-0.5" />
                    <div className="text-xs font-bold text-body">8</div>
                    <div className="text-[9px] text-muted">Proj</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop floating composition */}
          <div className="relative h-[520px] sm:h-[560px] lg:h-[600px] hidden sm:block">
            {/* Gradient glow behind cards */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-500/20 dark:bg-brand-500/25 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-cyan-400/15 dark:bg-cyan-500/20 blur-[70px] pointer-events-none" />

            {/* Hackathon Card - top left */}
            <div className="absolute top-0 left-0 w-64 animate-float-slow">
              <div className="bg-card border border-default rounded-2xl p-5 shadow-float">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/50 px-2 py-1 rounded-full">
                    <Check className="w-3 h-3" /> Verified
                  </span>
                </div>
                <h3 className="text-sm font-bold text-body leading-tight mb-1">AI Innovation Hackathon 2026</h3>
                <div className="text-lg font-bold text-gradient mb-3">₹2,00,000 Prize</div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <SkillChip label="AI / GenAI" color="brand" />
                  <SkillChip label="2–4 Members" color="neutral" />
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-default">
                  <div className="flex -space-x-2">
                    <Avatar initials="PM" gradient="from-brand-500 to-brand-700" size="sm" />
                    <Avatar initials="RS" gradient="from-cyan-500 to-cyan-700" size="sm" />
                    <Avatar initials="AK" gradient="from-success-500 to-success-700" size="sm" />
                  </div>
                  <span className="text-xs text-muted">427 registered</span>
                </div>
              </div>
            </div>

            {/* Team Match Card - center right */}
            <div className="absolute top-16 right-0 w-72 animate-float-slower">
              <div className="bg-card border border-default rounded-2xl p-5 shadow-float">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted">Team Compatibility</span>
                  <Users className="w-4 h-4 text-brand-500" />
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-extrabold text-gradient">
                    <AnimatedNumber value={94} suffix="%" />
                  </span>
                  <span className="text-xs text-success-600 dark:text-success-400 font-medium">High match</span>
                </div>
                <div className="space-y-2.5 mb-4">
                  <MatchRow label="Skill Match" value={96} />
                  <MatchRow label="Domain Match" value={91} />
                  <MatchRow label="Availability" value={95} />
                  <MatchRow label="Commitment" value={100} />
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-default">
                  <div className="flex -space-x-2">
                    <Avatar initials="PM" gradient="from-brand-500 to-brand-700" />
                    <Avatar initials="RS" gradient="from-cyan-500 to-cyan-700" />
                    <Avatar initials="AK" gradient="from-success-500 to-success-700" />
                    <Avatar initials="NS" gradient="from-warning-500 to-warning-700" />
                  </div>
                  <div className="flex flex-wrap gap-1 ml-1">
                    <SkillChip label="React" color="cyan" />
                    <SkillChip label="Node" color="success" />
                  </div>
                </div>
              </div>
            </div>

            {/* Talent Match Card - bottom left */}
            <div className="absolute bottom-8 left-4 w-64 animate-float-medium">
              <div className="bg-card border border-default rounded-2xl p-5 shadow-float">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted">Role Match</span>
                  <Briefcase className="w-4 h-4 text-cyan-500" />
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-extrabold text-gradient-cyan">
                    <AnimatedNumber value={96} suffix="%" />
                  </span>
                </div>
                <p className="text-sm font-semibold text-body mb-3">Software Developer Intern</p>
                <div className="space-y-1.5 mb-3">
                  {['React', 'Node.js', 'MongoDB'].map((s) => (
                    <div key={s} className="flex items-center gap-2 text-xs text-body">
                      <Check className="w-3.5 h-3.5 text-success-500" />
                      {s}
                    </div>
                  ))}
                </div>
                <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:gap-2 transition-all">
                  View Profile <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Reputation Card - bottom right */}
            <div className="absolute bottom-0 right-2 w-60 animate-float-slow animate-delay-500">
              <div className="bg-card border border-default rounded-2xl p-5 shadow-float">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted">Hack-Meet Reputation</span>
                  <Award className="w-4 h-4 text-warning-500" />
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-body">
                    <AnimatedNumber value={91} />
                  </span>
                  <span className="text-sm text-muted">/ 100</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <Trophy className="w-4 h-4 text-warning-500 mx-auto mb-1" />
                    <div className="text-xs font-bold text-body">6</div>
                    <div className="text-[10px] text-muted">Hackathons</div>
                  </div>
                  <div>
                    <Star className="w-4 h-4 text-warning-500 mx-auto mb-1" />
                    <div className="text-xs font-bold text-body">2</div>
                    <div className="text-[10px] text-muted">Wins</div>
                  </div>
                  <div>
                    <Rocket className="w-4 h-4 text-brand-500 mx-auto mb-1" />
                    <div className="text-xs font-bold text-body">8</div>
                    <div className="text-[10px] text-muted">Projects</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating connection indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center shadow-glow z-10">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
