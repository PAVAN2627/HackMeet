import { useEffect, useState } from 'react';
import { Sidebar, TopNav, type PageId } from '@/dashboard/Layout';
import { DashboardHome } from '@/dashboard/pages/Home';
import { DiscoverPage, TeammatesPage, TeamsPage, WorkspacePage, ProjectsPage } from '@/dashboard/pages/Workspace';
import { HackathonDetailsPage } from '@/dashboard/pages/HackathonDetails';
import { MyHackathonsPage } from '@/dashboard/pages/MyHackathons';
import { RecruiterPage } from '@/dashboard/pages/Recruiter';
import { ProfilePage } from '@/dashboard/pages/Profile';
import { NotificationsPage } from '@/dashboard/pages/Notifications';
import { SettingsPage } from '@/dashboard/pages/Settings';
import { MessagesPage } from '@/dashboard/pages/Messages';

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [page, setPage] = useState<PageId>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home': return <DashboardHome setPage={setPage} />;
      case 'discover': return <DiscoverPage setPage={setPage} />;
      case 'my-hackathons': return <MyHackathonsPage setPage={setPage} />;
      case 'teammates': return <TeammatesPage />;
      case 'teams': return <TeamsPage setPage={setPage} />;
      case 'workspace': return <WorkspacePage />;
      case 'projects': return <ProjectsPage />;
      case 'hackathon-details': return <HackathonDetailsPage />;
      case 'recruiter': return <RecruiterPage />;
      case 'profile': return <ProfilePage onLogout={onLogout} />;
      case 'messages': return <MessagesPage />;
      case 'notifications': return <NotificationsPage />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardHome setPage={setPage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-app">
      <Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav setMobileOpen={setMobileOpen} setPage={setPage} onLogout={onLogout} />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
