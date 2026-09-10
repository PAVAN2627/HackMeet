import { useState } from 'react';
import {
  Trophy, Check, Search, SlidersHorizontal, MapPin, Users, Clock,
  ArrowRight, Sparkles, UserPlus, Github, FolderGit2, Award, Calendar,
  ExternalLink, Plus, MessageSquare, MoreHorizontal, CheckCircle2, Circle,
  Send, Paperclip, Smile, Hash, Pin, Shield, Flag, Ban, Lock, Mail,
  Briefcase, TrendingUp, Eye, Star, Handshake, Globe, Code2, Settings,
  Bell, User, CreditCard, Palette, ShieldCheck, ChevronDown, X, Crown,
} from 'lucide-react';
import { recommendedHackathons, recommendedTeammates, myTeams, pendingInvites, projects, currentUser, recruiterInvitations, notifications, userSkills, externalProfiles, hackathonHistory, userBadges, initialKanbanTasks, teamMembers, milestones } from '@/dashboard/data';
import type { KanbanTask, Milestone } from '@/dashboard/data';
import type { PageId } from '@/dashboard/Layout';
import { Avatar, SkillChip, MatchRow, PageHeader, EmptyState } from '@/dashboard/components';

export function DiscoverPage({ setPage }: { setPage: (p: PageId) => void }) {
  const [query, setQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'AI & ML', 'Web3', 'FinTech', 'Climate', 'Healthcare'];
  const filtered = recommendedHackathons.filter((h) => {
    const matchesQuery = h.title.toLowerCase().includes(query.toLowerCase()) || h.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesFilter = activeFilter === 'All' || h.tags.some((t) => t.toLowerCase().includes(activeFilter.split(' ')[0].toLowerCase()));
    return matchesQuery && matchesFilter && (!verifiedOnly || h.verified);
  });

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Discover Hackathons" subtitle="Find your next challenge and build something that matters.">
        <button className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 rounded-xl shadow-soft hover:shadow-float transition-all"><SlidersHorizontal className="w-4 h-4" /> Advanced Filters</button>
      </PageHeader>
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title, technology, or domain..." className="w-full bg-card border border-default rounded-xl pl-10 pr-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-brand-400" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`whitespace-nowrap px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeFilter === filter ? 'bg-brand-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{filter}</button>)}
          <button onClick={() => setVerifiedOnly(!verifiedOnly)} className={`whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${verifiedOnly ? 'border-success-400 bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300' : 'border-default bg-card text-muted'}`}><Check className="w-3.5 h-3.5" /> Verified Only</button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((h) => <HackathonCard key={h.title} hackathon={h} onViewDetails={() => setPage('hackathon-details')} />)}
      </div>
    </div>
  );
}

function HackathonCard({ hackathon: h, onViewDetails }: { hackathon: typeof recommendedHackathons[number]; onViewDetails: () => void }) {
  return (
    <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all group">
      <div className={`relative h-36 bg-gradient-to-br ${h.gradient} p-5 flex flex-col justify-between`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="flex items-center justify-between relative"><div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"><Trophy className="w-5 h-5 text-white" /></div>{h.verified && <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success-700 bg-white/90 px-2 py-1 rounded-full"><Check className="w-3 h-3" /> Verified</span>}</div>
        <div className="relative text-white"><div className="text-xl font-bold">{h.prize}</div><div className="text-xs text-white/75">Prize pool</div></div>
      </div>
      <div className="p-5"><h3 className="text-base font-bold text-body">{h.title}</h3><p className="text-xs text-muted mt-1">by {h.organizer}</p><div className="grid grid-cols-2 gap-3 mt-4"><div className="flex items-center gap-2 text-xs text-muted"><MapPin className="w-3.5 h-3.5 text-brand-500" />{h.mode}</div><div className="flex items-center gap-2 text-xs text-muted"><Clock className="w-3.5 h-3.5 text-warning-500" />{h.deadline}</div><div className="flex items-center gap-2 text-xs text-muted"><Users className="w-3.5 h-3.5 text-cyan-500" />{h.teamSize} members</div><div className="flex items-center gap-2 text-xs text-muted"><UserPlus className="w-3.5 h-3.5 text-success-500" />{h.registration} joined</div></div><div className="flex flex-wrap gap-1.5 mt-4">{h.tags.map((tag) => <SkillChip key={tag} label={tag} color={tag === 'AI' || tag === 'GenAI' ? 'brand' : 'neutral'} />)}</div>{h.relevance && <div className="flex items-center gap-2 mt-4 p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950/30"><Sparkles className="w-3.5 h-3.5 text-brand-500" /><span className="text-xs font-semibold text-brand-700 dark:text-brand-300">{h.relevance}% relevant to you</span></div>}<div className="flex gap-2 mt-5"><button onClick={onViewDetails} className="flex-1 text-xs font-semibold text-body border border-default rounded-lg py-2.5 hover:border-brand-400 transition-colors">View Details</button><button className="flex-1 text-xs font-semibold text-white bg-brand-500 rounded-lg py-2.5 hover:bg-brand-600 transition-colors">Register</button></div></div>
    </div>
  );
}

export function TeammatesPage() {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Find Teammates" subtitle="Build your next team with people who complement your skills."><button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center gap-2 text-sm font-semibold text-body border border-default bg-card px-4 py-2.5 rounded-xl hover:border-brand-400"><SlidersHorizontal className="w-4 h-4" /> Filters</button></PageHeader>
      <div className="grid lg:grid-cols-3 gap-5 mb-6"><div className="lg:col-span-2 bg-card border border-default rounded-2xl p-5"><div className="grid sm:grid-cols-2 gap-5"><div><h3 className="text-sm font-bold text-body mb-3">My Skills</h3><div className="flex flex-wrap gap-2">{['Node.js', 'Python', 'MongoDB', 'AWS'].map((s) => <SkillChip key={s} label={s} color="brand" />)}</div></div><div><h3 className="text-sm font-bold text-body mb-3">Looking For</h3><div className="flex flex-wrap gap-2">{['Frontend', 'UI/UX', 'Machine Learning'].map((s) => <span key={s} className="text-xs font-medium px-2 py-1 rounded-md border border-dashed border-strong text-muted">{s}</span>)}</div></div></div></div><div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-5 text-white"><div className="text-xs text-white/70 uppercase tracking-wider">Your team match profile</div><div className="text-3xl font-extrabold mt-1">94<span className="text-sm text-white/60">% optimized</span></div><p className="text-xs text-white/70 mt-2">Add more skills to improve your recommendations.</p></div></div>
      <div className="flex items-center justify-between mb-4"><div><h2 className="text-lg font-bold text-body">Recommended Teammates</h2><p className="text-xs text-muted mt-0.5">Ranked by compatibility with your team profile</p></div><span className="text-xs text-muted">{recommendedTeammates.length} matches</span></div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">{recommendedTeammates.map((person) => <TeammateCard key={person.name} person={person} />)}</div>
      {showFilters && <div className="mt-5 bg-card border border-default rounded-2xl p-5"><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{['Skill Match', 'Skill Complementarity', 'Domain', 'Availability', 'Commitment Hours', 'Experience', 'Reputation'].map((filter) => <label key={filter} className="text-xs font-medium text-muted">{filter}<select className="w-full mt-1.5 bg-ink-50 dark:bg-ink-800/40 border border-default rounded-lg px-3 py-2 text-sm text-body outline-none"><option>Any</option><option>High</option><option>Medium</option></select></label>)}</div></div>}
    </div>
  );
}

function TeammateCard({ person }: { person: typeof recommendedTeammates[number] }) {
  return <div className="bg-card border border-default rounded-2xl p-5 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all"><div className="flex items-start gap-3"><Avatar initials={person.initials} gradient={person.gradient} size="lg" /><div className="min-w-0 flex-1"><h3 className="text-sm font-bold text-body">{person.name}</h3><span className="inline-flex items-center gap-1 text-[10px] text-success-600 dark:text-success-400 mt-1"><span className="w-1.5 h-1.5 rounded-full bg-success-500" />{person.availabilityStatus}</span></div><div className="text-right"><div className="text-2xl font-extrabold text-gradient">{person.compatibility}%</div><div className="text-[9px] text-muted">compatibility</div></div></div><div className="grid grid-cols-3 gap-2 mt-5"><div className="text-center p-2 rounded-lg bg-ink-50 dark:bg-ink-800/40"><div className="text-sm font-bold text-body">{person.projects}</div><div className="text-[9px] text-muted">Projects</div></div><div className="text-center p-2 rounded-lg bg-ink-50 dark:bg-ink-800/40"><div className="text-sm font-bold text-body">{person.hackathons}</div><div className="text-[9px] text-muted">Hackathons</div></div><div className="text-center p-2 rounded-lg bg-ink-50 dark:bg-ink-800/40"><div className="text-sm font-bold text-body">{person.wins}</div><div className="text-[9px] text-muted">Wins</div></div></div><div className="space-y-2 mt-4"><MatchRow label="Skill Complementarity" value={person.skillComplement} /><MatchRow label="Domain Match" value={person.domainMatch} /><MatchRow label="Commitment" value={person.commitment} /></div><div className="flex flex-wrap gap-1.5 mt-4">{person.skills.map((skill) => <SkillChip key={skill} label={skill} size="sm" />)}</div><div className="flex gap-2 mt-5"><button className="flex-1 text-xs font-semibold text-body border border-default rounded-lg py-2.5 hover:border-brand-400">View Profile</button><button className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold text-white bg-brand-500 rounded-lg py-2.5 hover:bg-brand-600"><UserPlus className="w-3.5 h-3.5" /> Invite</button></div></div>;
}

export function TeamsPage({ setPage }: { setPage: (p: PageId) => void }) {
  return <div className="max-w-[1600px] mx-auto"><PageHeader title="My Teams" subtitle="Your active collaborations and project spaces."><button className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-500 px-4 py-2.5 rounded-xl hover:bg-brand-600"><Plus className="w-4 h-4" /> Create Team</button></PageHeader><div className="grid lg:grid-cols-2 gap-5 mb-8">{myTeams.map((team) => <div key={team.name} className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft"><div className={`h-24 bg-gradient-to-r ${team.gradient} p-5 flex items-end justify-between`}><div className="text-white"><div className="text-xs text-white/70">{team.hackathon}</div><h2 className="text-xl font-bold">{team.name}</h2></div><span className="text-xs font-semibold text-success-800 bg-white/90 px-2 py-1 rounded-full">{team.status}</span></div><div className="p-5"><h3 className="text-base font-bold text-body">{team.project}</h3><div className="flex flex-wrap gap-1.5 mt-3">{team.techStack.map((s) => <SkillChip key={s} label={s} />)}</div><div className="flex items-center justify-between mt-5 mb-2"><span className="text-xs text-muted">Progress</span><span className="text-sm font-bold text-body">{team.progress}%</span></div><div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: `${team.progress}%` }} /></div><div className="flex items-center justify-between mt-4"><div className="flex items-center gap-2 text-xs text-muted"><Users className="w-4 h-4 text-cyan-500" />{team.members}/{team.maxMembers} members</div><button onClick={() => setPage('workspace')} className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400">Open Workspace <ArrowRight className="w-3.5 h-3.5" /></button></div></div></div>)}</div><h2 className="text-lg font-bold text-body mb-4">Pending Invitations</h2><div className="grid md:grid-cols-2 gap-4">{pendingInvites.map((invite) => <div key={invite.team} className="bg-card border border-default rounded-2xl p-5 flex items-center gap-4"><div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center"><Users className="w-5 h-5 text-brand-500" /></div><div className="flex-1"><h3 className="text-sm font-bold text-body">{invite.team}</h3><p className="text-xs text-muted">{invite.project} · invited by {invite.from}</p><span className="text-[10px] text-muted">{invite.time}</span></div><div className="flex gap-2"><button className="text-xs font-semibold text-muted border border-default rounded-lg px-3 py-2">Decline</button><button className="text-xs font-semibold text-white bg-brand-500 rounded-lg px-3 py-2">Accept</button></div></div>)}</div></div>;
}

export function WorkspacePage() {
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState<KanbanTask[]>(initialKanbanTasks);
  const [milestoneState, setMilestoneState] = useState<Milestone[]>(milestones);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(teamMembers[0].initials);
  const [assigningFor, setAssigningFor] = useState<string | null>(null);

  const isLeader = true;
  const columns: ('To Do' | 'In Progress' | 'Completed')[] = ['To Do', 'In Progress', 'Completed'];

  const checkMilestones = (updatedTasks: KanbanTask[]) => {
    const completedTaskTitles = updatedTasks.filter((t) => t.status === 'Completed').map((t) => t.title.toLowerCase());
    setMilestoneState((prev) => prev.map((m) => {
      if (m.done) return m;
      const shouldComplete = m.linkedTaskKeywords.some((kw) => completedTaskTitles.some((title) => title.includes(kw)));
      return shouldComplete ? { ...m, done: true } : m;
    }));
  };

  const completeTask = (id: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, status: 'Completed' as const } : t));
      checkMilestones(updated);
      return updated;
    });
  };

  const moveTask = (id: string, direction: 'left' | 'right') => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id);
      if (!task) return prev;
      const idx = columns.indexOf(task.status);
      const newIdx = direction === 'left' ? Math.max(0, idx - 1) : Math.min(columns.length - 1, idx + 1);
      return prev.map((t) => (t.id === id ? { ...t, status: columns[newIdx] as KanbanTask['status'] } : t));
    });
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const member = teamMembers.find((m) => m.initials === newTaskAssignee) ?? teamMembers[0];
    setTasks((prev) => [...prev, { id: `t${Date.now()}`, title: newTaskTitle, status: 'To Do', assignee: member.initials, gradient: member.gradient }]);
    setNewTaskTitle('');
    setShowAddTask(false);
  };

  const assignTask = (taskId: string, assignee: string) => {
    const member = teamMembers.find((m) => m.initials === assignee);
    if (!member) return;
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, assignee: member.initials, gradient: member.gradient } : t)));
    setAssigningFor(null);
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Team Alpha" subtitle="AI Crop Disease Detection · AI Innovation Hackathon 2026">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/40 px-2.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500" /> Active
          </span>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-500 px-4 py-2.5 rounded-xl hover:bg-brand-600 transition-colors">
            <Send className="w-4 h-4" /> Submit Project
          </button>
        </div>
      </PageHeader>

      <div className="grid xl:grid-cols-3 gap-5">
        {/* Left column: project overview + kanban */}
        <div className="xl:col-span-2 space-y-5">
          {/* Project overview */}
          <div className="bg-card border border-default rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-body">AI Crop Disease Detection</h2>
                <p className="text-sm text-muted mt-1">An ML-powered application that detects crop diseases from photos and suggests treatments to farmers.</p>
              </div>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-ink-50 dark:hover:bg-ink-800/50"><MoreHorizontal className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-wrap gap-2">{['React', 'Node.js', 'Python', 'TensorFlow'].map((s) => <SkillChip key={s} label={s} color="brand" />)}</div>
            <div className="grid sm:grid-cols-3 gap-4 mt-5 pt-4 border-t border-default">
              <div><div className="text-xs text-muted">Overall Progress</div><div className="text-xl font-bold text-body mt-1">{Math.round(tasks.filter((t) => t.status === 'Completed').length / tasks.length * 100)}%</div></div>
              <div><div className="text-xs text-muted">Submission Readiness</div><div className="text-xl font-bold text-warning-600 dark:text-warning-400 mt-1">65%</div></div>
              <div><div className="text-xs text-muted">Deadline</div><div className="text-xl font-bold text-warning-600 dark:text-warning-400 mt-1">4 days</div></div>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="bg-card border border-default rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-body">Kanban Board</h2>
                <p className="text-xs text-muted mt-0.5">Track your team's progress — mark tasks complete or assign to teammates</p>
              </div>
              <button onClick={() => setShowAddTask(!showAddTask)} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300">
                <Plus className="w-3.5 h-3.5" /> Add Task
              </button>
            </div>

            {/* Add task form */}
            {showAddTask && (
              <div className="mb-4 p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40 border border-default">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Task title..."
                    className="flex-1 bg-card border border-default rounded-lg px-3 py-2 text-sm text-body placeholder:text-muted outline-none focus:border-brand-400"
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  />
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="bg-card border border-default rounded-lg px-3 py-2 text-sm text-body outline-none focus:border-brand-400"
                  >
                    {teamMembers.map((m) => <option key={m.initials} value={m.initials}>{m.name}</option>)}
                  </select>
                  <button onClick={addTask} className="text-sm font-semibold text-white bg-brand-500 rounded-lg px-4 py-2 hover:bg-brand-600 transition-colors">Add</button>
                  <button onClick={() => setShowAddTask(false)} className="text-sm font-semibold text-muted border border-default rounded-lg px-3 py-2 hover:text-body"><X className="w-4 h-4" /></button>
                </div>
              </div>
            )}

            {/* Board columns */}
            <div className="grid md:grid-cols-3 gap-3">
              {columns.map((column) => {
                const columnTasks = tasks.filter((t) => t.status === column);
                return (
                  <div key={column} className="bg-ink-50 dark:bg-ink-800/30 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-body">{column}</span>
                      <span className="text-[10px] text-muted bg-card px-1.5 py-0.5 rounded">{columnTasks.length}</span>
                    </div>
                    <div className="space-y-2">
                      {columnTasks.map((task) => (
                        <div key={task.id} className="bg-card border border-default rounded-lg p-3 shadow-soft group">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="text-xs font-medium text-body">{task.title}</div>
                            {task.status !== 'Completed' && (
                              <button
                                onClick={() => completeTask(task.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded-md flex items-center justify-center text-success-500 hover:bg-success-50 dark:hover:bg-success-950/40 flex-shrink-0"
                                title="Mark as completed"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          {/* Assignee + assign button */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Avatar initials={task.assignee} gradient={task.gradient} size="xs" />
                              <span className="text-[10px] text-muted">{teamMembers.find((m) => m.initials === task.assignee)?.name?.split(' ')[0] ?? task.assignee}</span>
                            </div>
                            {isLeader && (
                              <div className="relative">
                                <button
                                  onClick={() => setAssigningFor(assigningFor === task.id ? null : task.id)}
                                  className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
                                >
                                  {assigningFor === task.id ? 'Cancel' : 'Assign'}
                                </button>
                                {assigningFor === task.id && (
                                  <div className="absolute right-0 top-6 z-10 bg-card border border-default rounded-lg shadow-float p-1 min-w-[140px]">
                                    {teamMembers.map((m) => (
                                      <button
                                        key={m.initials}
                                        onClick={() => assignTask(task.id, m.initials)}
                                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors text-left"
                                      >
                                        <Avatar initials={m.initials} gradient={m.gradient} size="xs" />
                                        <span className="text-xs text-body">{m.name}</span>
                                        {m.isLeader && <Crown className="w-3 h-3 text-warning-500 ml-auto" />}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Move buttons */}
                          {task.status !== 'Completed' && (
                            <div className="flex gap-1 mt-2 pt-2 border-t border-default">
                              {task.status !== 'To Do' && (
                                <button onClick={() => moveTask(task.id, 'left')} className="text-[10px] text-muted hover:text-body px-1.5 py-0.5 rounded hover:bg-ink-50 dark:hover:bg-ink-800/50">← Move back</button>
                              )}
                              {task.status !== 'In Progress' && (
                                <button onClick={() => moveTask(task.id, 'right')} className="text-[10px] text-muted hover:text-body px-1.5 py-0.5 rounded hover:bg-ink-50 dark:hover:bg-ink-800/50 ml-auto">Move forward →</button>
                              )}
                            </div>
                          )}
                          {task.status === 'Completed' && (
                            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-default">
                              <CheckCircle2 className="w-3 h-3 text-success-500" />
                              <span className="text-[10px] text-success-600 dark:text-success-400">Completed</span>
                            </div>
                          )}
                        </div>
                      ))}
                      {columnTasks.length === 0 && <div className="text-center text-[10px] text-muted py-4">No tasks</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: members, milestones, chat */}
        <div className="space-y-5">
          {/* Team Members */}
          <div className="bg-card border border-default rounded-2xl p-5">
            <h2 className="text-base font-bold text-body mb-4">Team Members <span className="text-xs font-normal text-muted">· {teamMembers.length} members</span></h2>
            <div className="space-y-3">
              {teamMembers.map((m) => (
                <div key={m.initials} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar initials={m.initials} gradient={m.gradient} size="sm" />
                    {m.isLeader && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-warning-500 flex items-center justify-center ring-2 ring-white dark:ring-ink-900"><Crown className="w-2.5 h-2.5 text-white" /></span>}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-body">{m.name}</div>
                    <div className="text-[10px] text-muted">{m.role}{m.isLeader && ' · Team Leader'}</div>
                  </div>
                  <span className="text-xs font-semibold text-success-600">{m.contribution}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-card border border-default rounded-2xl p-5">
            <h2 className="text-base font-bold text-body mb-4">Milestones</h2>
            <div className="space-y-3">
              {milestoneState.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  {m.done ? <CheckCircle2 className="w-4 h-4 text-success-500" /> : <Circle className="w-4 h-4 text-ink-300" />}
                  <span className={`text-sm ${m.done ? 'text-muted line-through' : 'text-body font-medium'}`}>{m.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Chat */}
          <div className="bg-card border border-default rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-brand-500" />
              <h2 className="text-base font-bold text-body">Team Chat</h2>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex gap-2">
                <Avatar initials="RS" gradient="from-cyan-500 to-cyan-700" size="xs" />
                <p className="text-xs text-body"><span className="font-semibold">Rahul</span> pushed the API routes. Can someone review?</p>
              </div>
              <div className="flex gap-2">
                <Avatar initials="AG" gradient="from-success-500 to-success-700" size="xs" />
                <p className="text-xs text-body"><span className="font-semibold">Ananya</span> ML model accuracy is at 92% now!</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message team..." className="flex-1 min-w-0 text-xs bg-ink-50 dark:bg-ink-800/40 border border-default rounded-lg px-3 py-2 text-body placeholder:text-muted outline-none" />
              <button className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center hover:bg-brand-600 transition-colors"><Send className="w-3.5 h-3.5 text-white" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsPage() {
  const [active, setActive] = useState('All Projects');
  const filtered = active === 'All Projects' ? projects : projects.filter((p) => p.status === active);
  return <div className="max-w-[1600px] mx-auto"><PageHeader title="Projects" subtitle="A living portfolio of everything you have built."><button className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-500 px-4 py-2.5 rounded-xl"><Plus className="w-4 h-4" /> New Project</button></PageHeader><div className="flex items-center gap-2 mb-6">{['All Projects', 'Active', 'Completed'].map((tab) => <button key={tab} onClick={() => setActive(tab)} className={`px-4 py-2 rounded-xl text-sm font-medium ${active === tab ? 'bg-brand-500 text-white' : 'bg-card border border-default text-muted'}`}>{tab}</button>)}</div><div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">{filtered.map((project) => <div key={project.name} className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all"><div className={`h-28 bg-gradient-to-br ${project.gradient} p-5 flex items-end justify-between`}><div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"><FolderGit2 className="w-5 h-5 text-white" /></div>{project.winner && <span className="inline-flex items-center gap-1 text-[10px] font-bold text-warning-800 bg-warning-100 px-2 py-1 rounded-full"><Trophy className="w-3 h-3" /> Winner</span>}</div><div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="text-base font-bold text-body">{project.name}</h3><span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${project.status === 'Active' ? 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300' : 'text-muted bg-ink-100 dark:bg-ink-800'}`}>{project.status}</span></div><p className="text-xs text-muted mt-2 leading-relaxed">{project.description}</p><div className="flex flex-wrap gap-1.5 mt-4">{project.techStack.map((s) => <SkillChip key={s} label={s} size="sm" />)}</div><div className="flex items-center justify-between mt-4 pt-4 border-t border-default"><span className="text-xs text-muted">{project.team}</span><span className="text-xs font-bold text-body">{project.progress}% complete</span></div><div className="h-1.5 rounded-full bg-ink-100 dark:bg-ink-800 mt-2 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: `${project.progress}%` }} /></div><div className="flex gap-2 mt-4"><button className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold text-body border border-default rounded-lg py-2"><Github className="w-3.5 h-3.5" /> GitHub</button>{project.liveDemo && <button className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold text-brand-600 border border-brand-200 dark:border-brand-800 rounded-lg py-2"><ExternalLink className="w-3.5 h-3.5" /> Live Demo</button>}</div></div></div>)}</div></div>;
}
