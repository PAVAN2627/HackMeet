import { Users, Megaphone, FolderGit2, Gavel, Trophy, BarChart3, Settings, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

const dashboardItems = [
  { icon: Users, label: 'Registrations', value: '427', color: 'text-brand-500' },
  { icon: Users, label: 'Teams', value: '89', color: 'text-cyan-500' },
  { icon: Megaphone, label: 'Announcements', value: '12', color: 'text-success-500' },
  { icon: Users, label: 'Community', value: '1.2K', color: 'text-brand-500' },
  { icon: FolderGit2, label: 'Submissions', value: '67', color: 'text-cyan-500' },
  { icon: Gavel, label: 'Judging', value: 'In Progress', color: 'text-warning-500' },
  { icon: Trophy, label: 'Winners', value: 'TBD', color: 'text-warning-500' },
  { icon: BarChart3, label: 'Analytics', value: 'Live', color: 'text-success-500' },
];

export function Organizer() {
  return (
    <section id="organizers" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
              For Organizers
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-body leading-tight">
              Run the entire hackathon
              <br />
              in <span className="text-gradient">one place.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Dashboard mockup */}
          <Reveal className="lg:col-span-3">
            <div className="bg-card border border-default rounded-2xl p-5 lg:p-6 h-full">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-brand-500" />
                  <h3 className="text-sm font-bold text-body">Organizer Dashboard</h3>
                </div>
                <span className="text-xs text-muted">AI Innovation Hackathon 2026</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {dashboardItems.map((item) => (
                  <div key={item.label} className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-default hover:border-strong hover:-translate-y-0.5 transition-all cursor-default">
                    <item.icon className={`w-4 h-4 ${item.color} mb-2`} />
                    <div className="text-lg font-bold text-body leading-tight">{item.value}</div>
                    <div className="text-[10px] text-muted">{item.label}</div>
                  </div>
                ))}
              </div>
              {/* Mini chart */}
              <div className="mt-5 p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-default">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted">Registration Trend</span>
                  <span className="text-xs font-semibold text-success-600 dark:text-success-400">+24% this week</span>
                </div>
                <div className="flex items-end gap-1.5 h-20">
                  {[40, 55, 48, 65, 72, 80, 68, 88, 95, 78, 92, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-brand-500 to-cyan-400 opacity-80 hover:opacity-100 transition-opacity"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Hackathon management card */}
          <Reveal delay={150} className="lg:col-span-2">
            <div className="bg-gradient-to-br from-brand-50 to-cyan-50 dark:from-brand-950/30 dark:to-cyan-950/20 border border-brand-200 dark:border-brand-800/50 rounded-2xl p-6 lg:p-8 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-500/15 blur-[60px] pointer-events-none" />
              <div className="relative flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-warning-500" />
                  <h3 className="text-base font-bold text-body">AI Innovation Hackathon 2026</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted">Registration</span>
                      <span className="text-sm font-bold text-body">
                        <AnimatedNumber value={427} /> / 500
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400"
                        style={{ width: '0%', transition: 'width 1.2s ease' }}
                        ref={(el) => { if (el) setTimeout(() => el.style.width = '85.4%', 200); }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-default">
                    <span className="text-sm text-muted">Status</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-success-600 dark:text-success-400">
                      <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                      Registration Open
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-default">
                    <span className="text-sm text-muted">Prize Pool</span>
                    <span className="text-base font-bold text-gradient">₹2,00,000</span>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 px-5 py-3 rounded-xl shadow-soft hover:shadow-float transition-all relative">
                <Settings className="w-4 h-4" />
                Manage Hackathon
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
