import { Send, Check, Clock, Loader2, MessageSquare, GitBranch } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

function Avatar({ initials, gradient, size = 'sm' }: { initials: string; gradient: string; size?: 'sm' | 'xs' }) {
  const sz = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-5 h-5 text-[8px]';
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-semibold ring-2 ring-white dark:ring-ink-900`}>
      {initials}
    </div>
  );
}

const columns = [
  { title: 'To Do', color: 'text-ink-500', tasks: ['API Development', 'Dashboard'] },
  { title: 'In Progress', color: 'text-warning-500', tasks: ['ML Model'], icon: Loader2 },
  { title: 'Completed', color: 'text-success-500', tasks: ['Deployment'], icon: Check },
];

const chatMessages = [
  { initials: 'PM', gradient: 'from-brand-500 to-brand-700', name: 'Pavan', text: 'Pushed the API routes. Can someone review?', time: '2m' },
  { initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', name: 'Rahul', text: 'On it. The dashboard is almost done too.', time: '1m' },
  { initials: 'AK', gradient: 'from-success-500 to-success-700', name: 'Ananya', text: 'ML model accuracy is at 92% now!', time: 'now' },
];

export function Collaboration() {
  return (
    <section className="relative py-20 lg:py-28 bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
              Collaboration
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-body leading-tight">
              From "We're a team" to
              <br />
              <span className="text-gradient">"Here's what we built."</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="max-w-6xl mx-auto">
            <div className="bg-card border border-default rounded-3xl shadow-float overflow-hidden">
              {/* Workspace header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 lg:p-6 border-b border-default bg-gradient-to-r from-brand-50/50 to-transparent dark:from-brand-950/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                    <GitBranch className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-body">Team Alpha</h3>
                    <p className="text-xs text-muted">AI Crop Disease Detection</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted">Members:</span>
                    <div className="flex -space-x-2">
                      <Avatar initials="PM" gradient="from-brand-500 to-brand-700" />
                      <Avatar initials="RS" gradient="from-cyan-500 to-cyan-700" />
                      <Avatar initials="AK" gradient="from-success-500 to-success-700" />
                      <Avatar initials="NS" gradient="from-warning-500 to-warning-700" />
                    </div>
                    <span className="text-body font-semibold ml-1">4</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted">Stack:</span>
                    <span className="text-body font-medium">React · Node.js · Python · TensorFlow</span>
                  </div>
                </div>
              </div>

              {/* Body: Kanban + Chat */}
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Kanban */}
                <div className="lg:col-span-2 p-5 lg:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-bold text-body">Kanban Board</span>
                    <span className="text-xs text-muted">· 4 tasks</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {columns.map((col) => (
                      <div key={col.title} className="rounded-xl bg-ink-50 dark:bg-ink-800/30 p-3">
                        <div className="flex items-center gap-1.5 mb-3">
                          {col.icon ? <col.icon className={`w-3 h-3 ${col.color} ${col.title === 'In Progress' ? 'animate-spin' : ''}`} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                          <span className={`text-xs font-semibold ${col.color}`}>{col.title}</span>
                          <span className="text-xs text-muted ml-auto">{col.tasks.length}</span>
                        </div>
                        <div className="space-y-2">
                          {col.tasks.map((task) => (
                            <div key={task} className="bg-card border border-default rounded-lg p-2.5 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer">
                              <div className="text-xs font-medium text-body mb-1.5">{task}</div>
                              <div className="flex items-center gap-1">
                                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
                                <span className="text-[10px] text-muted">2 days</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-muted">Project Progress</span>
                      <span className="text-xs font-semibold text-body">65%</span>
                    </div>
                    <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: '65%' }} />
                    </div>
                  </div>
                </div>

                {/* Chat */}
                <div className="border-t lg:border-t-0 lg:border-l border-default p-5 lg:p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-4 h-4 text-brand-500" />
                    <span className="text-sm font-bold text-body">Team Chat</span>
                  </div>
                  <div className="flex-1 space-y-3 mb-4">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className="flex gap-2.5">
                        <Avatar initials={msg.initials} gradient={msg.gradient} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs font-semibold text-body">{msg.name}</span>
                            <span className="text-[10px] text-muted">{msg.time}</span>
                          </div>
                          <p className="text-xs text-body mt-0.5 leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl border border-default bg-ink-50 dark:bg-ink-800/30">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent text-xs text-body placeholder:text-muted outline-none px-1"
                      readOnly
                    />
                    <button className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center hover:bg-brand-600 transition-colors">
                      <Send className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
