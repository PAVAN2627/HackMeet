import { useState } from 'react';
import { Hash, Pin, Shield, Flag, Ban, Send, Users, Search } from 'lucide-react';
import { communityChannels, communityMessages, communityMembers } from '@/dashboard/data';
import { Avatar, PageHeader } from '@/dashboard/components';

export function CommunityPage() {
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Community" subtitle="Connect, discuss, and find your next team." />

      <div className="grid lg:grid-cols-[200px_1fr_220px] gap-4 lg:h-[calc(100vh-220px)] min-h-[400px] lg:min-h-[500px] flex flex-col lg:grid">
        {/* Channel panel */}
        <div className="hidden lg:flex flex-col bg-card border border-default rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-default">
            <div className="flex items-center gap-2 text-sm font-bold text-body">
              <Hash className="w-4 h-4 text-brand-500" />
              Channels
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {communityChannels.map((ch) => (
              <button
                key={ch.name}
                onClick={() => setActiveChannel(ch.name)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeChannel === ch.name
                    ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                    : 'text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50'
                }`}
              >
                <Hash className="w-3.5 h-3.5" />
                {ch.name}
              </button>
            ))}
          </div>
        </div>

        {/* Messages panel */}
        <div className="flex flex-col bg-card border border-default rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-default">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-brand-500" />
              <span className="text-sm font-bold text-body">{activeChannel}</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"><Pin className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"><Shield className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-center">
              <span className="text-xs text-muted bg-ink-50 dark:bg-ink-800/40 px-3 py-1 rounded-full">Today</span>
            </div>
            {communityMessages.map((msg, i) => (
              <div key={i} className="group flex gap-3 hover:bg-ink-50/50 dark:hover:bg-ink-800/20 -mx-2 px-2 py-1 rounded-lg">
                <Avatar initials={msg.initials} gradient={msg.gradient} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-body">{msg.name}</span>
                    {msg.role === 'moderator' && <span className="text-[9px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-1.5 py-0.5 rounded">MOD</span>}
                    <span className="text-[10px] text-muted">{msg.time}</span>
                  </div>
                  <p className="text-sm text-body mt-0.5 leading-relaxed">{msg.text}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
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
                placeholder={`Message #${activeChannel}...`}
                className="flex-1 min-w-0 bg-transparent text-sm text-body placeholder:text-muted outline-none"
              />
              <button className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center hover:bg-brand-600 transition-colors flex-shrink-0">
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <p className="text-[10px] text-muted mt-1.5 px-1">No personal phone numbers or emails are visible. Be respectful.</p>
          </div>
        </div>

        {/* Members panel */}
        <div className="hidden lg:flex flex-col bg-card border border-default rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-default">
            <div className="flex items-center gap-2 text-sm font-bold text-body">
              <Users className="w-4 h-4 text-brand-500" />
              Members
              <span className="text-xs font-normal text-muted">· {communityMembers.length}</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {communityMembers.map((m) => (
              <div key={m.name} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors">
                <div className="relative flex-shrink-0">
                  <Avatar initials={m.initials} gradient={m.gradient} size="sm" ring={false} />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-ink-900 ${
                    m.status === 'online' ? 'bg-success-500' : m.status === 'idle' ? 'bg-warning-400' : 'bg-ink-400'
                  }`} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-body truncate">{m.name}</div>
                  <div className="text-[10px] text-muted">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
