import { useEffect, useState } from 'react';
import { RecruiterSidebar, RecruiterTopNav } from '@/dashboard/RecruiterLayout';
import type { RecruiterPageId } from '@/dashboard/recruiter-data';
import {
  RecruiterHome, RecruiterCreateRole, RecruiterAIMatch, RecruiterDiscover,
  RecruiterShortlisted, RecruiterInvitations, RecruiterGroups, RecruiterMessages,
  RecruiterActivity, RecruiterSavedSearches, RecruiterCompany, RecruiterSettings,
} from '@/dashboard/RecruiterPages';

export function RecruiterDashboard({ onLogout }: { onLogout: () => void }) {
  const [page, setPage] = useState<RecruiterPageId>('rec-home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'rec-home': return <RecruiterHome setPage={setPage} />;
      case 'rec-create-role': return <RecruiterCreateRole setPage={setPage} />;
      case 'rec-ai-match': return <RecruiterAIMatch />;
      case 'rec-discover': return <RecruiterDiscover />;
      case 'rec-shortlisted': return <RecruiterShortlisted />;
      case 'rec-invitations': return <RecruiterInvitations />;
      case 'rec-groups': return <RecruiterGroups />;
      case 'rec-messages': return <RecruiterMessages />;
      case 'rec-activity': return <RecruiterActivity />;
      case 'rec-saved-searches': return <RecruiterSavedSearches />;
      case 'rec-company': return <RecruiterCompany onLogout={onLogout} />;
      case 'rec-settings': return <RecruiterSettings />;
      default: return <RecruiterHome setPage={setPage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-app">
      <RecruiterSidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <RecruiterTopNav setMobileOpen={setMobileOpen} setPage={setPage} onLogout={onLogout} />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
