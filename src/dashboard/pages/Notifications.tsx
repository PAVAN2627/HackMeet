import { useState } from 'react';
import {
  Bell, Trophy, Users, Target, Settings as SettingsIcon, Check,
} from 'lucide-react';
import { notifications } from '@/dashboard/data';
import { Avatar, PageHeader, EmptyState } from '@/dashboard/components';

const categoryConfig = {
  Hackathons: { icon: Trophy, color: 'text-warning-500', bg: 'bg-warning-50 dark:bg-warning-950/40' },
  Teams: { icon: Users, color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-950/40' },
  Recruiters: { icon: Target, color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-950/40' },
  System: { icon: SettingsIcon, color: 'text-muted', bg: 'bg-ink-100 dark:bg-ink-800/50' },
};

export function NotificationsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Hackathons', 'Teams', 'Recruiters', 'System'];
  const filtered = activeCategory === 'All' ? notifications : notifications.filter((n) => n.category === activeCategory);

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Notifications" subtitle="Stay updated on everything that matters." />

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeCategory === cat ? 'bg-brand-500 text-white' : 'bg-card border border-default text-muted hover:text-body'
            }`}
          >
            {cat}
            {cat !== 'All' && (
              <span className="ml-1.5 text-[10px] text-muted">
                {notifications.filter((n) => n.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card border border-default rounded-2xl">
          <EmptyState icon={Bell} title="No notifications" description="You are all caught up. Check back later for updates." />
        </div>
      ) : (
        <div className="bg-card border border-default rounded-2xl overflow-hidden">
          {filtered.map((notif, i) => {
            const config = categoryConfig[notif.category];
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-4 ${
                  i !== filtered.length - 1 ? 'border-b border-default' : ''
                } ${notif.unread ? 'bg-brand-50/30 dark:bg-brand-950/10' : ''} hover:bg-ink-50/50 dark:hover:bg-ink-800/20 transition-colors`}
              >
                <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <config.icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-body">{notif.title}</h3>
                    {notif.unread && <span className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-muted mt-0.5 leading-relaxed">{notif.description}</p>
                  <span className="text-[10px] text-muted mt-1 inline-block">{notif.time}</span>
                </div>
                <button className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors flex-shrink-0">
                  View
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
