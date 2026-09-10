import { useState } from 'react';
import {
  Trophy, Check, MapPin, Clock, Users, UserPlus, HelpCircle,
  MessageSquare, Send, ChevronDown, Hash, Pin, Shield, Flag, Ban,
  Search, Plus, UserCircle2, Megaphone, Lightbulb, Sparkles, X,
} from 'lucide-react';
import { recommendedHackathons, hackathonGroups, groupMessages, hackathonFAQ } from '@/dashboard/data';
import type { HackathonGroup } from '@/dashboard/data';
import { Avatar, SkillChip, PageHeader } from '@/dashboard/components';

const groupIconMap: Record<HackathonGroup['icon'], React.ComponentType<{ className?: string }>> = {
  faq: HelpCircle,
  users: UserCircle2,
  chat: MessageSquare,
  feedback: Lightbulb,
  custom: Hash,
};

export function HackathonDetailsPage() {
  const [activeGroup, setActiveGroup] = useState('g-general');
  const [message, setMessage] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [groups, setGroups] = useState<HackathonGroup[]>(hackathonGroups);
  const [localMessages, setLocalMessages] = useState(groupMessages);
  const [searchQuery, setSearchQuery] = useState('');

  const hackathon = recommendedHackathons[0];
  const currentGroup = groups.find((g) => g.id === activeGroup) ?? groups[0];
  const messages = localMessages[activeGroup] ?? [];
  const filteredMessages = searchQuery
    ? messages.filter((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()) || m.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  const defaultGroups = groups.filter((g) => g.isDefault);
  const customGroups = groups.filter((g) => !g.isDefault);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg = { initials: 'PM', gradient: 'from-brand-500 to-brand-700', name: 'Pavan Mali', time: 'now', text: message, role: 'member' };
    setLocalMessages((prev) => ({ ...prev, [activeGroup]: [...(prev[activeGroup] ?? []), newMsg] }));
    setMessage('');
  };

  const createGroup = () => {
    if (!newGroupName.trim()) return;
    const newGroup: HackathonGroup = {
      id: `g-custom-${Date.now()}`,
      name: newGroupName,
      icon: 'custom',
      isDefault: false,
      description: newGroupDesc || 'A discussion group for this hackathon.',
      createdBy: 'You',
    };
    setGroups((prev) => [...prev, newGroup]);
    setLocalMessages((prev) => ({ ...prev, [newGroup.id]: [] }));
    setActiveGroup(newGroup.id);
    setNewGroupName('');
    setNewGroupDesc('');
    setShowCreateGroup(false);
  };

  const renderGroupButton = (g: HackathonGroup) => {
    const Icon = groupIconMap[g.icon];
    const count = (localMessages[g.id] ?? []).length;
    return (
      <button
        key={g.id}
        onClick={() => setActiveGroup(g.id)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeGroup === g.id
            ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
            : 'text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50'
        }`}
      >
        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="flex-1 text-left truncate">{g.name}</span>
        {count > 0 && <span className="text-[10px] text-muted bg-card px-1.5 py-0.5 rounded">{count}</span>}
      </button>
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title={hackathon.title} subtitle={`by ${hackathon.organizer}`}>
        <button className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-500 px-4 py-2.5 rounded-xl hover:bg-brand-600 transition-colors">Register</button>
      </PageHeader>

      {/* Hackathon overview banner */}
      <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft mb-6">
        <div className={`relative h-28 bg-gradient-to-br ${hackathon.gradient} p-5 flex flex-col justify-between`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="flex items-center justify-between relative">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"><Trophy className="w-5 h-5 text-white" /></div>
            {hackathon.verified && <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success-700 bg-white/90 px-2 py-1 rounded-full"><Check className="w-3 h-3" /> Verified</span>}
          </div>
          <div className="relative text-white"><div className="text-xl font-bold">{hackathon.prize}</div><div className="text-xs text-white/75">Prize pool</div></div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm text-muted"><MapPin className="w-4 h-4 text-brand-500" />{hackathon.mode}</div>
            <div className="flex items-center gap-2 text-sm text-muted"><Clock className="w-4 h-4 text-warning-500" />{hackathon.deadline}</div>
            <div className="flex items-center gap-2 text-sm text-muted"><Users className="w-4 h-4 text-cyan-500" />{hackathon.teamSize} members</div>
            <div className="flex items-center gap-2 text-sm text-muted"><UserPlus className="w-4 h-4 text-success-500" />{hackathon.registration} joined</div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">{hackathon.tags.map((tag) => <SkillChip key={tag} label={tag} color={tag === 'AI' || tag === 'GenAI' ? 'brand' : 'neutral'} />)}</div>
        </div>
      </div>

      {/* Groups + Chat layout */}
      <div className="grid lg:grid-cols-[240px_1fr] gap-4 lg:h-[calc(100vh-340px)] min-h-[400px] lg:min-h-[500px] flex flex-col lg:grid">
        {/* Groups sidebar */}
        <div className="flex flex-col bg-card border border-default rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-default">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-body">
                <MessageSquare className="w-4 h-4 text-brand-500" />
                Groups
              </div>
              <button
                onClick={() => setShowCreateGroup(!showCreateGroup)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"
                title="Create new group"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Create group form */}
          {showCreateGroup && (
            <div className="p-3 border-b border-default bg-ink-50/50 dark:bg-ink-800/20">
              <div className="space-y-2">
                <input
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Group name..."
                  className="w-full bg-card border border-default rounded-lg px-3 py-2 text-sm text-body placeholder:text-muted outline-none focus:border-brand-400"
                />
                <input
                  value={newGroupDesc}
                  onChange={(e) => setNewGroupDesc(e.target.value)}
                  placeholder="Description (optional)..."
                  className="w-full bg-card border border-default rounded-lg px-3 py-2 text-xs text-body placeholder:text-muted outline-none focus:border-brand-400"
                />
                <div className="flex gap-2">
                  <button onClick={createGroup} className="flex-1 text-xs font-semibold text-white bg-brand-500 rounded-lg py-2 hover:bg-brand-600 transition-colors">Create</button>
                  <button onClick={() => setShowCreateGroup(false)} className="text-xs font-semibold text-muted border border-default rounded-lg px-3 py-2 hover:text-body"><X className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-2 space-y-3">
            {/* Default groups */}
            <div>
              <div className="text-[10px] font-bold text-muted uppercase tracking-wider px-3 mb-1">Default Groups</div>
              <div className="space-y-0.5">{defaultGroups.map(renderGroupButton)}</div>
            </div>
            {/* Organizer-created groups */}
            {customGroups.length > 0 && (
              <div>
                <div className="text-[10px] font-bold text-muted uppercase tracking-wider px-3 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Organizer Groups
                </div>
                <div className="space-y-0.5">{customGroups.map(renderGroupButton)}</div>
              </div>
            )}
          </div>
        </div>

        {/* Chat panel */}
        <div className="flex flex-col bg-card border border-default rounded-2xl overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b border-default">
            <div className="flex items-center gap-2 min-w-0">
              {(() => {
                const Icon = groupIconMap[currentGroup.icon];
                return <Icon className="w-4 h-4 text-brand-500 flex-shrink-0" />;
              })()}
              <div className="min-w-0">
                <span className="text-sm font-bold text-body block truncate">{currentGroup.name}</span>
                <span className="text-[10px] text-muted truncate">{currentGroup.description}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="text-xs bg-ink-50 dark:bg-ink-800/40 border border-default rounded-lg pl-8 pr-3 py-1.5 text-body placeholder:text-muted outline-none focus:border-brand-400 w-32"
                />
              </div>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50" title="Pinned"><Pin className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50" title="Rules"><Shield className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-center">
              <span className="text-xs text-muted bg-ink-50 dark:bg-ink-800/40 px-3 py-1 rounded-full">Today</span>
            </div>
            {filteredMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <MessageSquare className="w-10 h-10 text-ink-300 mb-3" />
                <p className="text-sm font-semibold text-body">No messages yet</p>
                <p className="text-xs text-muted mt-1">Be the first to start the conversation in {currentGroup.name}.</p>
              </div>
            )}
            {filteredMessages.map((msg, i) => (
              <div key={i} className="group flex gap-3 hover:bg-ink-50/50 dark:hover:bg-ink-800/20 -mx-2 px-2 py-1 rounded-lg">
                <Avatar initials={msg.initials} gradient={msg.gradient} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-body">{msg.name}</span>
                    {msg.role === 'organizer' && <span className="text-[9px] font-bold text-warning-700 dark:text-warning-400 bg-warning-50 dark:bg-warning-950/40 px-1.5 py-0.5 rounded inline-flex items-center gap-0.5"><Megaphone className="w-2.5 h-2.5" /> ORG</span>}
                    {msg.role === 'mentor' && <span className="text-[9px] font-bold text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-950/40 px-1.5 py-0.5 rounded">MENTOR</span>}
                    {msg.role === 'moderator' && <span className="text-[9px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-1.5 py-0.5 rounded">MOD</span>}
                    <span className="text-[10px] text-muted">{msg.time}</span>
                  </div>
                  <p className="text-sm text-body mt-0.5 leading-relaxed">{msg.text}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 flex-shrink-0">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-950/30" title="Report"><Flag className="w-3.5 h-3.5" /></button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-950/30" title="Block"><Ban className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-default">
            <div className="flex items-center gap-2 bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-3 py-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={`Message ${currentGroup.name}...`}
                className="flex-1 min-w-0 bg-transparent text-sm text-body placeholder:text-muted outline-none"
              />
              <button onClick={sendMessage} className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center hover:bg-brand-600 transition-colors flex-shrink-0">
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <p className="text-[10px] text-muted mt-1.5 px-1">Messages are visible to all registered participants. Be respectful and stay on topic.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section (always visible below the groups) */}
      <div className="bg-card border border-default rounded-2xl p-5 lg:p-6 mt-6">
        <div className="flex items-center gap-2 mb-5">
          <HelpCircle className="w-5 h-5 text-brand-500" />
          <h2 className="text-base font-bold text-body">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-2 max-w-3xl">
          {hackathonFAQ.map((faq, i) => (
            <div key={i} className="border border-default rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-ink-50/50 dark:hover:bg-ink-800/20 transition-colors"
              >
                <span className="text-sm font-semibold text-body">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-muted flex-shrink-0 transition-transform ${openFAQ === i ? 'rotate-180' : ''}`} />
              </button>
              {openFAQ === i && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
