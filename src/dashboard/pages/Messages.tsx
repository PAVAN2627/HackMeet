import { useState } from 'react';
import {
  Search, Send, Check, X, MessageSquarePlus, ArrowLeft, Phone, Video,
  MoreVertical, Paperclip, Smile, CheckCheck, UserPlus,
} from 'lucide-react';
import { initialChatConversations, initialMessageRequests } from '@/dashboard/data';
import type { ChatConversation, MessageRequest, ChatMessage } from '@/dashboard/data';
import { Avatar, PageHeader } from '@/dashboard/components';

export function MessagesPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>(initialChatConversations);
  const [requests, setRequests] = useState<MessageRequest[]>(initialMessageRequests);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'chats' | 'requests'>('chats');

  const currentChat = conversations.find((c) => c.id === activeChat);

  const sendMessage = () => {
    if (!message.trim() || !currentChat) return;
    const newMsg: ChatMessage = { id: `m${Date.now()}`, sender: 'Me', text: message, time: 'now', isMe: true };
    setConversations((prev) => prev.map((c) => c.id === activeChat ? { ...c, messages: [...c.messages, newMsg], lastMessageTime: 'now' } : c));
    setMessage('');
  };

  const acceptRequest = (id: string) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'accepted' } : r));
    setConversations((prev) => [...prev, {
      id: `c-${id}`,
      name: req.name,
      initials: req.initials,
      gradient: req.gradient,
      status: 'online',
      lastMessageTime: 'now',
      messages: [{ id: `m${Date.now()}`, sender: 'Me', text: `Hi ${req.name.split(' ')[0]}! Thanks for connecting. How can I help?`, time: 'now', isMe: true }],
    }]);
    setView('chats');
    setActiveChat(`c-${id}`);
  };

  const rejectRequest = (id: string) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'rejected' } : r));
  };

  const pendingRequests = requests.filter((r) => r.status === 'pending');

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Messages" subtitle="Connect with builders through personal chat. Send a request with a note — chat begins when they accept." />

      <div className="grid lg:grid-cols-[340px_1fr] gap-4 lg:h-[calc(100vh-220px)] min-h-[400px] lg:min-h-[500px] flex flex-col lg:grid">
        {/* Sidebar: conversations + requests — hidden on mobile when a chat is open */}
        <div className={`flex flex-col bg-card border border-default rounded-2xl overflow-hidden ${activeChat ? 'hidden lg:flex' : 'flex'}`}>
          {/* Tabs */}
          <div className="flex border-b border-default">
            <button
              onClick={() => setView('chats')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${view === 'chats' ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-500' : 'text-muted hover:text-body'}`}
            >
              Chats
            </button>
            <button
              onClick={() => setView('requests')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${view === 'requests' ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-500' : 'text-muted hover:text-body'}`}
            >
              Requests
              {pendingRequests.length > 0 && <span className="text-[10px] font-bold text-white bg-brand-500 px-1.5 py-0.5 rounded-full">{pendingRequests.length}</span>}
            </button>
          </div>

          {/* Search */}
          {view === 'chats' && (
            <div className="p-3 border-b border-default">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full text-sm bg-ink-50 dark:bg-ink-800/40 border border-default rounded-lg pl-9 pr-3 py-2 text-body placeholder:text-muted outline-none focus:border-brand-400"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {view === 'chats' && (
              <div className="p-2 space-y-0.5">
                {conversations.length === 0 && (
                  <div className="text-center py-12 px-4">
                    <MessageSquarePlus className="w-10 h-10 text-ink-300 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-body">No conversations yet</p>
                    <p className="text-xs text-muted mt-1">Visit a teammate's profile and send a message request to start chatting.</p>
                  </div>
                )}
                {conversations
                  .filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase()))
                  .map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveChat(c.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${activeChat === c.id ? 'bg-brand-50 dark:bg-brand-950/40' : 'hover:bg-ink-50 dark:hover:bg-ink-800/50'}`}
                    >
                      <div className="relative flex-shrink-0">
                        <Avatar initials={c.initials} gradient={c.gradient} size="md" ring={false} />
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white dark:ring-ink-900 ${c.status === 'online' ? 'bg-success-500' : 'bg-ink-400'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-body truncate">{c.name}</span>
                          <span className="text-[10px] text-muted flex-shrink-0">{c.lastMessageTime}</span>
                        </div>
                        <p className="text-xs text-muted truncate mt-0.5">
                          {c.messages[c.messages.length - 1]?.isMe && 'You: '}
                          {c.messages[c.messages.length - 1]?.text}
                        </p>
                      </div>
                    </button>
                  ))}
              </div>
            )}

            {view === 'requests' && (
              <div className="p-3 space-y-3">
                {pendingRequests.length === 0 && (
                  <div className="text-center py-12 px-4">
                    <UserPlus className="w-10 h-10 text-ink-300 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-body">No pending requests</p>
                    <p className="text-xs text-muted mt-1">When someone sends you a message request, it will appear here.</p>
                  </div>
                )}
                {pendingRequests.map((req) => (
                  <div key={req.id} className="border border-default rounded-xl p-4 hover:shadow-soft transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar initials={req.initials} gradient={req.gradient} size="md" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-body">{req.name}</span>
                          <span className="text-[10px] text-muted">{req.time}</span>
                        </div>
                        <p className="text-xs text-muted mt-1 leading-relaxed">{req.note}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => acceptRequest(req.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-success-500 rounded-lg py-2.5 hover:bg-success-600 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept
                      </button>
                      <button
                        onClick={() => rejectRequest(req.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-muted border border-default rounded-lg py-2.5 hover:text-error-500 hover:border-error-300 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat panel — hidden on mobile when no chat is selected */}
        <div className={`flex flex-col bg-card border border-default rounded-2xl overflow-hidden ${activeChat ? 'flex' : 'hidden lg:flex'}`}>
          {!currentChat ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-ink-50 dark:bg-ink-800/50 flex items-center justify-center mb-4">
                <MessageSquarePlus className="w-8 h-8 text-ink-400" />
              </div>
              <h3 className="text-base font-semibold text-body mb-1">Select a conversation</h3>
              <p className="text-sm text-muted max-w-xs">Choose a chat from the left, or accept a message request to start a new conversation.</p>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between p-4 border-b border-default">
                <div className="flex items-center gap-3 min-w-0">
                  <button onClick={() => setActiveChat(null)} className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-ink-50 dark:hover:bg-ink-800/50 flex-shrink-0">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="relative flex-shrink-0">
                    <Avatar initials={currentChat.initials} gradient={currentChat.gradient} size="md" ring={false} />
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white dark:ring-ink-900 ${currentChat.status === 'online' ? 'bg-success-500' : 'bg-ink-400'}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-body truncate">{currentChat.name}</div>
                    <div className="text-[10px] text-success-600 dark:text-success-400">{currentChat.status === 'online' ? 'Online' : 'Offline'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"><Phone className="w-4 h-4" /></button>
                  <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"><Video className="w-4 h-4" /></button>
                  <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-body hover:bg-ink-50 dark:hover:bg-ink-800/50"><MoreVertical className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 bg-ink-50/30 dark:bg-ink-800/10">
                {currentChat.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    {!msg.isMe && <Avatar initials={currentChat.initials} gradient={currentChat.gradient} size="xs" ring={false} />}
                    <div className={`max-w-[75%] ${msg.isMe ? 'ml-2' : 'ml-2'}`}>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
                        msg.isMe
                          ? 'bg-brand-500 text-white rounded-br-md'
                          : 'bg-card border border-default text-body rounded-bl-md'
                      }`}>
                        {msg.text}
                      </div>
                      <div className={`flex items-center gap-1 mt-1 text-[10px] text-muted ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                        <span>{msg.time}</span>
                        {msg.isMe && <CheckCheck className="w-3 h-3 text-cyan-500" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-default">
                <div className="flex items-center gap-2 bg-ink-50 dark:bg-ink-800/40 border border-default rounded-2xl px-3 py-2">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-body flex-shrink-0"><Paperclip className="w-4 h-4" /></button>
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 min-w-0 bg-transparent text-sm text-body placeholder:text-muted outline-none"
                  />
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-body flex-shrink-0"><Smile className="w-4 h-4" /></button>
                  <button onClick={sendMessage} className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center hover:bg-brand-600 transition-colors flex-shrink-0">
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
