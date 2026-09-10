import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/context/ThemeContext';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { Problem } from '@/components/sections/Problem';
import { CoreInnovation } from '@/components/sections/CoreInnovation';
import { TeamMatch } from '@/components/sections/TeamMatch';
import { Collaboration } from '@/components/sections/Collaboration';
import { Reputation } from '@/components/sections/Reputation';
import { Recruiter } from '@/components/sections/Recruiter';
import { Differentiator } from '@/components/sections/Differentiator';
import { Organizer } from '@/components/sections/Organizer';
import { VerifiedEcosystem } from '@/components/sections/VerifiedEcosystem';
import { HackathonDiscovery } from '@/components/sections/HackathonDiscovery';
import { ThreeSidedEcosystem } from '@/components/sections/ThreeSidedEcosystem';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { useEffect, useState } from 'react';
import { Footer } from '@/components/sections/Footer';
import { Dashboard } from '@/dashboard/Dashboard';
import { OrganizerDashboard } from '@/dashboard/OrganizerDashboard';
import { RecruiterDashboard } from '@/dashboard/RecruiterDashboard';
import { AdminDashboard } from '@/dashboard/AdminDashboard';
import { LoginPage, type UserRole } from '@/components/LoginPage';
import { RegistrationPage } from '@/components/auth/RegistrationPage';
import type { RoleId } from '@/components/auth/types';

type View = 'landing' | 'login' | 'register' | 'dashboard' | 'organizer' | 'recruiter' | 'admin';

function LandingPage({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  return (
    <div className="min-h-screen bg-app text-body overflow-x-hidden">
      <Navbar onLogin={onLogin} onRegister={onRegister} />
      <main className="landing-sections">
        <Hero />
        <TrustStrip />
        <Problem />
        <CoreInnovation />
        <TeamMatch />
        <Collaboration />
        <Reputation />
        <Recruiter />
        <Differentiator />
        <Organizer />
        <VerifiedEcosystem />
        <HackathonDiscovery />
        <ThreeSidedEcosystem />
        <HowItWorks />
        <FinalCTA onRegister={onRegister} />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [view, setView] = useState<View>('landing');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const openDashboard = (role: UserRole) => {
    if (role === 'organizer') setView('organizer');
    else if (role === 'recruiter') setView('recruiter');
    else if (role === 'admin') setView('admin');
    else setView('dashboard');
  };

  return (
    <ThemeProvider>
      {view === 'landing' && <LandingPage onLogin={() => setView('login')} onRegister={() => setView('register')} />}
      {view === 'login' && <LoginPage onBack={() => setView('landing')} onOpenDashboard={openDashboard} onRegister={() => setView('register')} />}
      {view === 'register' && <RegistrationPage onBack={() => setView('landing')} onLogin={() => setView('login')} onComplete={(role: RoleId) => openDashboard(role)} />}
      {view === 'dashboard' && <Dashboard onLogout={() => setView('landing')} />}
      {view === 'organizer' && <OrganizerDashboard onLogout={() => setView('landing')} />}
      {view === 'recruiter' && <RecruiterDashboard onLogout={() => setView('landing')} />}
      {view === 'admin' && <AdminDashboard onLogout={() => setView('landing')} />}
    </ThemeProvider>
  );
}

export default App;
