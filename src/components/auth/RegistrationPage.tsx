import { useState } from 'react';
import { ArrowLeft, ArrowRight, UserRound, Briefcase, Rocket, Code2, CheckCircle2 } from 'lucide-react';
import { AuthVisual } from './AuthVisual';
import { roleOptions, type RoleId } from './types';
import { StudentRegistration } from './StudentRegistration';
import { RecruiterRegistration } from './RecruiterRegistration';
import { OrganizerRegistration } from './OrganizerRegistration';

const iconMap: Record<string, typeof UserRound> = {
  UserRound, Briefcase, Rocket,
};

export function RegistrationPage({ onBack, onLogin, onComplete }: { onBack: () => void; onLogin: () => void; onComplete: (role: RoleId) => void }) {
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  if (showSuccess && selectedRole) {
    const successMessages: Record<RoleId, { title: string; subtitle: string }> = {
      student: { title: 'Welcome to Hack-Meet!', subtitle: 'Your Hack-Meet profile is ready. Let\'s build something amazing.' },
      recruiter: { title: 'Verification Submitted!', subtitle: 'Your account will become a Verified Recruiter after admin approval.' },
      organizer: { title: 'Verification Submitted!', subtitle: 'You can start preparing your hackathon while verification is pending.' },
    };
    const msg = successMessages[selectedRole];
    return (
      <div className="min-h-screen bg-subtle flex items-center justify-center px-4 py-4 lg:py-3">
        <div className="relative w-full max-w-5xl grid lg:grid-cols-2 bg-card border border-default rounded-3xl shadow-float overflow-hidden lg:max-h-[calc(100vh-1.5rem)]">
          <AuthVisual role={selectedRole} />
          <div className="p-6 sm:p-8 lg:p-7 xl:p-8 flex flex-col justify-center">
            <div className="text-center animate-scale-in">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-body mb-3">{msg.title}</h1>
              <p className="text-sm text-muted mb-8 max-w-sm mx-auto">{msg.subtitle}</p>
              <button onClick={() => onComplete(selectedRole)} className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3 rounded-xl shadow-soft hover:shadow-float transition-all">
                Continue to Dashboard <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={onBack} className="mt-3 text-xs font-semibold text-muted hover:text-body">Back to home</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-subtle flex items-center justify-center px-4 py-10">
        <div className="relative w-full max-w-5xl grid lg:grid-cols-2 bg-card border border-default rounded-3xl shadow-float overflow-hidden">
          <AuthVisual role={selectedRole} />
          <div className="p-6 sm:p-10 overflow-y-auto max-h-screen">
            <button onClick={() => setSelectedRole(null)} className="inline-flex items-center gap-2 text-sm text-muted hover:text-body mb-4">
              <ArrowLeft className="w-4 h-4" /> Change role
            </button>
            {selectedRole === 'student' && <StudentRegistration onComplete={() => setShowSuccess(true)} />}
            {selectedRole === 'recruiter' && <RecruiterRegistration onComplete={() => setShowSuccess(true)} />}
            {selectedRole === 'organizer' && <OrganizerRegistration onComplete={() => setShowSuccess(true)} />}
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-subtle flex items-center justify-center px-4 py-4 lg:py-3">
        <div className="relative w-full max-w-5xl grid lg:grid-cols-2 bg-card border border-default rounded-3xl shadow-float overflow-hidden lg:max-h-[calc(100vh-1.5rem)]">
        <AuthVisual role="student" />
        <div className="p-6 sm:p-8 lg:p-7 xl:p-8">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-muted hover:text-body mb-5 lg:mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Hack-Meet
          </button>
          <div className="mb-6 lg:mb-5">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <span className="text-xl font-bold text-body">Hack<span className="text-cyan-500">Meet</span></span>
            </div>
            <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-2">Join Hack-Meet</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-body">Choose how you want to use Hack-Meet</h2>
            <p className="text-sm text-muted mt-1.5">Select your role to begin your journey.</p>
          </div>

          <div className="space-y-3">
            {roleOptions.map((r) => {
              const Icon = iconMap[r.icon];
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className="w-full text-left p-3.5 rounded-2xl border-2 border-default hover:border-brand-400 hover:shadow-soft transition-all group flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.accent} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-body">{r.label}</div>
                    <div className="text-xs text-muted mt-0.5">{r.description}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted group-hover:text-brand-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
              );
            })}
          </div>

          <p className="text-center text-xs text-muted mt-5 lg:mt-4">
            Already have an account?{' '}
            <button onClick={onLogin} className="font-semibold text-brand-600 dark:text-brand-400">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}
