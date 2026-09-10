import { useEffect, useState } from 'react';
import { OrganizerSidebar, OrganizerTopNav } from '@/dashboard/OrganizerLayout';
import type { OrganizerPageId } from '@/dashboard/organizer-data';
import {
  OrganizerHome, OrganizerMyHackathons, OrganizerCreateHackathon,
  OrganizerRegistrations, OrganizerTeams, OrganizerAnnouncements,
  OrganizerCommunity, OrganizerSubmissions, OrganizerJudging,
  OrganizerWinners, OrganizerAnalytics, OrganizerProfile, OrganizerSettings,
} from '@/dashboard/OrganizerPages';

export function OrganizerDashboard({ onLogout }: { onLogout: () => void }) {
  const [page, setPage] = useState<OrganizerPageId>('org-home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'org-home': return <OrganizerHome setPage={setPage} />;
      case 'org-my-hackathons': return <OrganizerMyHackathons setPage={setPage} />;
      case 'org-create': return <OrganizerCreateHackathon />;
      case 'org-registrations': return <OrganizerRegistrations />;
      case 'org-teams': return <OrganizerTeams />;
      case 'org-announcements': return <OrganizerAnnouncements />;
      case 'org-community': return <OrganizerCommunity />;
      case 'org-submissions': return <OrganizerSubmissions />;
      case 'org-judging': return <OrganizerJudging />;
      case 'org-winners': return <OrganizerWinners />;
      case 'org-analytics': return <OrganizerAnalytics />;
      case 'org-profile': return <OrganizerProfile onLogout={onLogout} />;
      case 'org-settings': return <OrganizerSettings />;
      default: return <OrganizerHome setPage={setPage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-app">
      <OrganizerSidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <OrganizerTopNav setMobileOpen={setMobileOpen} setPage={setPage} onLogout={onLogout} />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
