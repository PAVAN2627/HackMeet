import {
  Trophy, Users, Github, Star, ShieldCheck, FileText, Target,
  Send, Code2, Rocket, Award, Sparkles, Briefcase, Mail,
  CheckCircle2, Zap, TrendingUp, GitBranch, Medal,
} from 'lucide-react';
import type { RoleId } from './types';

type FloatCard = {
  icon: typeof Trophy;
  label: string;
  sublabel?: string;
  gradient: string;
  iconColor: string;
  top: string;
  left: string;
  delay: string;
  duration: string;
  size?: 'sm' | 'md' | 'lg';
  rotate?: boolean;
};

const cardsByRole: Record<RoleId, FloatCard[]> = {
  student: [
    { icon: Trophy, label: 'Smart India Hackathon', sublabel: 'Winner · International', gradient: 'from-warning-400 to-warning-600', iconColor: 'text-warning-300', top: '6%', left: '8%', delay: '0s', duration: '7s', size: 'lg' },
    { icon: Users, label: 'AI Team Match', sublabel: '97% Compatibility', gradient: 'from-brand-400 to-brand-600', iconColor: 'text-brand-200', top: '24%', left: '52%', delay: '0.6s', duration: '6s', size: 'md' },
    { icon: Github, label: 'GitHub Connected', sublabel: '1,247 commits this year', gradient: 'from-ink-600 to-ink-800', iconColor: 'text-cyan-300', top: '42%', left: '12%', delay: '1.2s', duration: '8s', size: 'lg', rotate: true },
    { icon: Star, label: 'Reputation Score', sublabel: '92 / 100', gradient: 'from-success-400 to-success-600', iconColor: 'text-success-200', top: '58%', left: '48%', delay: '1.8s', duration: '6.5s', size: 'md' },
    { icon: ShieldCheck, label: 'Verified Skill', sublabel: 'React · Node.js · AWS', gradient: 'from-cyan-400 to-cyan-600', iconColor: 'text-cyan-200', top: '76%', left: '18%', delay: '0.3s', duration: '7.5s', size: 'sm' },
    { icon: Mail, label: 'Recruiter Interested', sublabel: 'Microsoft · 96% match', gradient: 'from-success-400 to-success-600', iconColor: 'text-success-200', top: '12%', left: '66%', delay: '0.9s', duration: '6s', size: 'sm' },
    { icon: Zap, label: 'ATS Resume Score', sublabel: '86 / 100', gradient: 'from-brand-400 to-cyan-500', iconColor: 'text-cyan-200', top: '82%', left: '55%', delay: '1.5s', duration: '7s', size: 'sm' },
  ],
  recruiter: [
    { icon: Briefcase, label: 'Software Developer Intern', sublabel: 'Active Job Description', gradient: 'from-success-400 to-success-600', iconColor: 'text-success-200', top: '6%', left: '10%', delay: '0s', duration: '7s', size: 'lg' },
    { icon: Sparkles, label: 'AI Skill Extraction', sublabel: 'React · Node · MongoDB · AWS', gradient: 'from-brand-400 to-brand-600', iconColor: 'text-brand-200', top: '22%', left: '50%', delay: '0.5s', duration: '6s', size: 'md' },
    { icon: Target, label: 'Candidate Ranking', sublabel: '96% Role Match', gradient: 'from-cyan-400 to-cyan-600', iconColor: 'text-cyan-200', top: '40%', left: '14%', delay: '1s', duration: '8s', size: 'lg', rotate: true },
    { icon: Trophy, label: 'Hackathon Winner', sublabel: 'International Level', gradient: 'from-warning-400 to-warning-600', iconColor: 'text-warning-200', top: '58%', left: '52%', delay: '1.5s', duration: '6.5s', size: 'md' },
    { icon: GitBranch, label: 'GitHub Activity', sublabel: '342 repos · Active coder', gradient: 'from-ink-600 to-ink-800', iconColor: 'text-cyan-300', top: '76%', left: '20%', delay: '0.3s', duration: '7.5s', size: 'sm' },
    { icon: Send, label: 'Candidate Invitation', sublabel: 'Sent to 10 candidates', gradient: 'from-success-400 to-success-600', iconColor: 'text-success-200', top: '10%', left: '64%', delay: '0.8s', duration: '6s', size: 'sm' },
    { icon: TrendingUp, label: 'Hiring Pipeline', sublabel: '38 accepted · 142 invited', gradient: 'from-brand-400 to-cyan-500', iconColor: 'text-cyan-200', top: '84%', left: '50%', delay: '1.3s', duration: '7s', size: 'sm' },
  ],
  organizer: [
    { icon: Rocket, label: 'AI for Bharat 2026', sublabel: 'Hackathon Created', gradient: 'from-brand-400 to-brand-600', iconColor: 'text-brand-200', top: '6%', left: '10%', delay: '0s', duration: '7s', size: 'lg' },
    { icon: Users, label: 'Registrations', sublabel: '427 / 500', gradient: 'from-cyan-400 to-cyan-600', iconColor: 'text-cyan-200', top: '22%', left: '52%', delay: '0.5s', duration: '6s', size: 'md' },
    { icon: Code2, label: 'Team Formation', sublabel: '85 teams formed', gradient: 'from-success-400 to-success-600', iconColor: 'text-success-200', top: '40%', left: '14%', delay: '1s', duration: '8s', size: 'lg', rotate: true },
    { icon: FileText, label: 'Submissions', sublabel: '42 projects submitted', gradient: 'from-warning-400 to-warning-600', iconColor: 'text-warning-200', top: '58%', left: '50%', delay: '1.5s', duration: '6.5s', size: 'md' },
    { icon: Medal, label: 'Winner Podium', sublabel: '1st · 2nd · 3rd', gradient: 'from-warning-400 to-warning-600', iconColor: 'text-warning-200', top: '76%', left: '20%', delay: '0.3s', duration: '7.5s', size: 'sm' },
    { icon: ShieldCheck, label: 'Verified Organization', sublabel: 'TechNova Solutions', gradient: 'from-brand-400 to-brand-600', iconColor: 'text-brand-200', top: '10%', left: '64%', delay: '0.8s', duration: '6s', size: 'sm' },
    { icon: Award, label: 'Judging Score', sublabel: '9.4 / 10 average', gradient: 'from-success-400 to-cyan-500', iconColor: 'text-cyan-200', top: '84%', left: '50%', delay: '1.3s', duration: '7s', size: 'sm' },
  ],
};

const sizeMap = { sm: 'w-44', md: 'w-52', lg: 'w-56' };

export function AuthVisual({ role }: { role: RoleId }) {
  const cards = cardsByRole[role];
  return (
    <div className="hidden lg:flex flex-col justify-between p-10 xl:p-12 bg-gradient-to-br from-ink-900 via-brand-950 to-ink-900 text-white relative overflow-hidden min-h-full">
      {/* Animated background layers */}
      <div className="absolute inset-0 grid-bg opacity-[0.04]" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-500/20 blur-[120px] pointer-events-none" style={{ animation: 'glowPulse 5s ease-in-out infinite' }} />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none" style={{ animation: 'glowPulse 6s ease-in-out infinite', animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-success-500/8 blur-[90px] pointer-events-none" style={{ animation: 'glowPulse 7s ease-in-out infinite', animationDelay: '2s' }} />

      {/* Pulse rings emanating from center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-32 h-32 rounded-full border border-brand-400/20" style={{ animation: 'pulseRing 4s ease-out infinite' }} />
        <div className="w-32 h-32 rounded-full border border-cyan-400/20 absolute top-0 left-0" style={{ animation: 'pulseRing 4s ease-out infinite', animationDelay: '1.3s' }} />
        <div className="w-32 h-32 rounded-full border border-success-400/15 absolute top-0 left-0" style={{ animation: 'pulseRing 4s ease-out infinite', animationDelay: '2.6s' }} />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/30 pointer-events-none"
          style={{
            top: `${(i * 37) % 90 + 5}%`,
            left: `${(i * 53) % 85 + 8}%`,
            animation: `floatCard ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="relative w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400" style={{ animation: 'glowPulse 2s ease-in-out infinite' }} />
          </div>
          <span className="text-xl font-bold">Hack<span className="text-cyan-300">Meet</span></span>
        </div>
        <p className="text-xs text-white/40 mt-1">Where Hackathons Meet Talent &amp; Opportunity</p>
      </div>

      {/* Floating cards ecosystem */}
      <div className="relative flex-1 my-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          const animName = card.rotate ? 'floatCardLarge' : 'floatCard';
          return (
            <div
              key={`${role}-${i}`}
              className="absolute z-10"
              style={{
                top: card.top,
                left: card.left,
                animation: `${animName} ${card.duration} ease-in-out infinite`,
                animationDelay: card.delay,
              }}
            >
              <div className={`relative ${sizeMap[card.size ?? 'md']} bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 shadow-2xl overflow-hidden`}>
                {/* Shimmer overlay */}
                <div className="absolute inset-0 animate-shimmer pointer-events-none rounded-2xl" />

                <div className="relative flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">{card.label}</div>
                    {card.sublabel && <div className={`text-[10px] truncate ${card.iconColor} font-medium`}>{card.sublabel}</div>}
                  </div>
                </div>

                {card.size !== 'sm' && (
                  <div className="relative mt-2.5 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${card.gradient}`}
                      style={{
                        width: `${55 + i * 7}%`,
                        animation: `shimmer 2s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  </div>
                )}

                {/* Verified badge for some cards */}
                {i === 0 && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 rounded-full bg-success-500/20 border border-success-400/40 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-success-300" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Animated connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.2 }}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <g stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" filter="url(#glow)">
            <line x1="18%" y1="12%" x2="60%" y2="30%" strokeDasharray="5 5" style={{ animation: 'dashFlow 1.5s linear infinite' }} />
            <line x1="60%" y1="30%" x2="22%" y2="48%" strokeDasharray="5 5" style={{ animation: 'dashFlow 2s linear infinite' }} />
            <line x1="22%" y1="48%" x2="58%" y2="64%" strokeDasharray="5 5" style={{ animation: 'dashFlow 1.8s linear infinite' }} />
            <line x1="58%" y1="64%" x2="28%" y2="82%" strokeDasharray="5 5" style={{ animation: 'dashFlow 2.2s linear infinite' }} />
            <line x1="70%" y1="16%" x2="58%" y2="64%" strokeDasharray="5 5" style={{ animation: 'dashFlow 2.5s linear infinite' }} />
          </g>

          {/* Connection nodes */}
          <g fill="#06b6d4">
            <circle cx="18%" cy="12%" r="3" opacity="0.6"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" /></circle>
            <circle cx="60%" cy="30%" r="3" opacity="0.6"><animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" /></circle>
            <circle cx="22%" cy="48%" r="3" opacity="0.6"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" begin="1s" /></circle>
            <circle cx="58%" cy="64%" r="3" opacity="0.6"><animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" begin="1s" /></circle>
            <circle cx="28%" cy="82%" r="3" opacity="0.6"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" begin="2s" /></circle>
          </g>
        </svg>
      </div>

      {/* Stats footer */}
      <div className="relative z-10 grid grid-cols-3 gap-3">
        {[['120+', 'Hackathons'], ['15K+', 'Builders'], ['91/100', 'Avg. proof']].map(([value, label], i) => (
          <div key={label} className="p-3 rounded-xl bg-white/8 border border-white/10 backdrop-blur-sm relative overflow-hidden" style={{ animation: 'floatCard 5s ease-in-out infinite', animationDelay: `${i * 0.5}s` }}>
            <div className="text-lg font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{value}</div>
            <div className="text-[10px] text-white/40 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
