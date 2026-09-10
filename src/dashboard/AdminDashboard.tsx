import { useEffect, useState } from 'react';
import { AdminSidebar, AdminTopNav } from '@/dashboard/AdminLayout';
import type { AdminPageId } from '@/dashboard/admin-data';
import {
  AdminHome, AdminUsers, AdminOrganizations, AdminRecruiters,
  AdminHackathons, AdminVerification, AdminReports, AdminSuspended,
  AdminMessages, AdminPayments, AdminAnalytics, AdminAudit, AdminSettings,
} from '@/dashboard/AdminPages';

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [page, setPage] = useState<AdminPageId>('admin-home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'admin-home': return <AdminHome setPage={setPage} />;
      case 'admin-users': return <AdminUsers />;
      case 'admin-organizations': return <AdminOrganizations />;
      case 'admin-recruiters': return <AdminRecruiters />;
      case 'admin-hackathons': return <AdminHackathons />;
      case 'admin-verification': return <AdminVerification />;
      case 'admin-reports': return <AdminReports />;
      case 'admin-suspended': return <AdminSuspended />;
      case 'admin-messages': return <AdminMessages />;
      case 'admin-payments': return <AdminPayments />;
      case 'admin-analytics': return <AdminAnalytics />;
      case 'admin-audit': return <AdminAudit />;
      case 'admin-settings': return <AdminSettings onLogout={onLogout} />;
      default: return <AdminHome setPage={setPage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-app">
      <AdminSidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopNav setMobileOpen={setMobileOpen} onLogout={onLogout} onProfile={() => setPage('admin-settings')} />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
