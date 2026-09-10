import { useState } from 'react';
import {
  Users, ShieldCheck, Clock, Building2, Rocket, AlertTriangle, Flag,
  TrendingUp, TrendingDown, Check, X, Eye, FileText, ExternalLink,
  Search, Filter, ArrowUpDown, ChevronDown, ScrollText, CreditCard,
  MessageSquare, UserX, BarChart3, Scale, Zap, Globe, MapPin,
  Calendar, Star, Award, AlertCircle, CheckCircle2, Ban,
  ArrowRight, Download, Lock,
} from 'lucide-react';
import {
  adminKPIs, platformActivity, hrVerifications, organizationVerifications,
  hackathonApprovals, reports, auditLogs, platformUsers, revenueData,
  paymentHistory, adminProfile,
} from '@/dashboard/admin-data';
import type { AdminPageId, VerificationStatus, HackathonApprovalStatus, RiskLevel } from '@/dashboard/admin-data';
import { Avatar, SkillChip, PageHeader } from '@/dashboard/components';

/* ── Shared helpers ── */

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Pending': 'text-warning-700 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-300',
    'Pending Approval': 'text-warning-700 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-300',
    'Approved': 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300',
    'Verified': 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300',
    'Rejected': 'text-error-700 bg-error-50 dark:bg-error-950/40 dark:text-error-300',
    'Request Changes': 'text-brand-700 bg-brand-50 dark:bg-brand-950/40 dark:text-brand-300',
    'Needs Changes': 'text-brand-700 bg-brand-50 dark:bg-brand-950/40 dark:text-brand-300',
    'Completed': 'text-muted bg-ink-100 dark:bg-ink-800',
    'Active': 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300',
    'Suspended': 'text-error-700 bg-error-50 dark:bg-error-950/40 dark:text-error-300',
    'Banned': 'text-error-700 bg-error-50 dark:bg-error-950/40 dark:text-error-300',
    'Open': 'text-warning-700 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-300',
    'Under Review': 'text-brand-700 bg-brand-50 dark:bg-brand-950/40 dark:text-brand-300',
    'Warned': 'text-warning-700 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-300',
    'Restricted': 'text-error-700 bg-error-50 dark:bg-error-950/40 dark:text-error-300',
    'Dismissed': 'text-muted bg-ink-100 dark:bg-ink-800',
    'Paid': 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300',
  };
  return <span className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${map[status] || 'text-muted bg-ink-100 dark:bg-ink-800'}`}>{status}</span>;
}

function RiskBadge({ level }: { level: RiskLevel }) {
  const map = { Low: 'text-success-700 bg-success-50 dark:bg-success-950/40 dark:text-success-300', Medium: 'text-warning-700 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-300', High: 'text-error-700 bg-error-50 dark:bg-error-950/40 dark:text-error-300' };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${map[level]}`}>{level} Risk</span>;
}

function AIFlagItem({ flag }: { flag: { type: string; text: string } }) {
  const icons = { success: CheckCircle2, warning: AlertCircle, error: AlertTriangle };
  const colors = { success: 'text-success-500', warning: 'text-warning-500', error: 'text-error-500' };
  const Icon = icons[flag.type as keyof typeof icons] || AlertCircle;
  return (
    <div className="flex items-start gap-2 text-xs">
      <Icon className={`w-3.5 h-3.5 ${colors[flag.type as keyof typeof colors]} flex-shrink-0 mt-0.5`} />
      <span className="text-body">{flag.text}</span>
    </div>
  );
}

function DecisionPanel({ onApprove, onRequestChanges, onReject, approveLabel }: { onApprove: () => void; onRequestChanges: () => void; onReject: () => void; approveLabel: string }) {
  return (
    <div className="bg-card border border-default rounded-2xl p-5 shadow-soft sticky top-20">
      <h3 className="text-sm font-bold text-body mb-4">Verification Decision</h3>
      <div className="space-y-2">
        <button onClick={onApprove} className="w-full text-sm font-semibold text-white bg-success-500 rounded-xl py-3 hover:bg-success-600 transition-colors inline-flex items-center justify-center gap-2"><Check className="w-4 h-4" /> {approveLabel}</button>
        <button onClick={onRequestChanges} className="w-full text-sm font-semibold text-body border border-default rounded-xl py-3 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/20 transition-colors inline-flex items-center justify-center gap-2"><AlertCircle className="w-4 h-4" /> Request Changes</button>
        <button onClick={onReject} className="w-full text-sm font-semibold text-error-600 dark:text-error-400 border border-error-200 dark:border-error-800 rounded-xl py-3 hover:bg-error-50 dark:hover:bg-error-950/20 transition-colors inline-flex items-center justify-center gap-2"><X className="w-4 h-4" /> Reject Verification</button>
      </div>
      <div className="mt-4 pt-4 border-t border-default">
        <p className="text-[10px] text-muted flex items-center gap-1.5"><Lock className="w-3 h-3" /> All decisions are logged in the audit trail</p>
      </div>
    </div>
  );
}

function ConfirmModal({ open, onClose, onConfirm, title, message }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-default rounded-2xl p-6 max-w-sm w-full shadow-float" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-success-50 dark:bg-success-950/30 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-success-500" /></div><h3 className="text-base font-bold text-body">{title}</h3></div>
        <p className="text-sm text-muted mb-5">{message}</p>
        <div className="flex gap-2"><button onClick={onClose} className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-2.5 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">Cancel</button><button onClick={onConfirm} className="flex-1 text-sm font-semibold text-white bg-success-500 rounded-xl py-2.5 hover:bg-success-600 transition-colors">Confirm</button></div>
      </div>
    </div>
  );
}

function RejectModal({ open, onClose, onConfirm, title }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string }) {
  const [reason, setReason] = useState('');
  const reasons = ['Invalid documents', 'Company affiliation could not be verified', 'Information mismatch', 'Suspicious submission', 'Other'];
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-default rounded-2xl p-6 max-w-md w-full shadow-float" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-error-50 dark:bg-error-950/30 flex items-center justify-center"><X className="w-5 h-5 text-error-500" /></div><h3 className="text-base font-bold text-body">{title}</h3></div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted mb-1.5 block">Rejection Reason</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-2.5 text-sm text-body outline-none focus:border-error-400">
              <option value="">Select a reason...</option>
              {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted mb-1.5 block">Explain the reason for rejection</label>
            <textarea rows={3} placeholder="Provide detailed explanation..." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-error-400 resize-none" />
          </div>
        </div>
        <div className="flex gap-2 mt-5"><button onClick={onClose} className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-2.5 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">Cancel</button><button onClick={onConfirm} className="flex-1 text-sm font-semibold text-white bg-error-500 rounded-xl py-2.5 hover:bg-error-600 transition-colors">Reject</button></div>
      </div>
    </div>
  );
}

function RequestChangesModal({ open, onClose, onConfirm, title }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-default rounded-2xl p-6 max-w-md w-full shadow-float" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center"><AlertCircle className="w-5 h-5 text-brand-500" /></div><h3 className="text-base font-bold text-body">{title}</h3></div>
        <div>
          <label className="text-xs font-semibold text-muted mb-1.5 block">Describe the issue and what changes are needed</label>
          <textarea rows={4} defaultValue="Please upload a valid employee ID showing your current company affiliation." className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-brand-400 resize-none" />
        </div>
        <div className="flex gap-2 mt-5"><button onClick={onClose} className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-2.5 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">Cancel</button><button onClick={onConfirm} className="flex-1 text-sm font-semibold text-white bg-brand-500 rounded-xl py-2.5 hover:bg-brand-600 transition-colors">Send Request</button></div>
      </div>
    </div>
  );
}

function DocumentPreviewModal({ open, onClose, docName, filename, uploadDate, submittedBy }: { open: boolean; onClose: () => void; docName: string; filename: string; uploadDate: string; submittedBy: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-default rounded-2xl max-w-2xl w-full shadow-float overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-default">
          <div className="flex items-center gap-2"><FileText className="w-5 h-5 text-brand-500" /><h3 className="text-sm font-bold text-body">{docName}</h3></div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-ink-50 dark:hover:bg-ink-800/50"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6">
          <div className="bg-ink-50 dark:bg-ink-800/40 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
            <FileText className="w-16 h-16 text-ink-300 dark:text-ink-600 mb-4" />
            <p className="text-sm font-semibold text-body">{filename}</p>
            <p className="text-xs text-muted mt-1">Secure document preview</p>
            <div className="flex items-center gap-2 mt-4">
              <button className="text-xs font-semibold text-body border border-default rounded-lg px-3 py-1.5 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors">Zoom In</button>
              <button className="text-xs font-semibold text-body border border-default rounded-lg px-3 py-1.5 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors">Zoom Out</button>
              <button className="text-xs font-semibold text-body border border-default rounded-lg px-3 py-1.5 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors">Page 1 / 3</button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div><span className="text-muted">Filename:</span> <span className="font-semibold text-body">{filename}</span></div>
            <div><span className="text-muted">Upload Date:</span> <span className="font-semibold text-body">{uploadDate}</span></div>
            <div><span className="text-muted">Submitted By:</span> <span className="font-semibold text-body">{submittedBy}</span></div>
            <div><span className="text-muted">Access:</span> <span className="font-semibold text-warning-600 dark:text-warning-400">Admin Only</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 1. Dashboard Home ── */

export function AdminHome({ setPage }: { setPage: (p: AdminPageId) => void }) {
  const kpiIcons: Record<string, React.ComponentType<{ className?: string }>> = { Users, ShieldCheck, Clock, Building2, Rocket, AlertTriangle, Flag };
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Platform Dashboard" subtitle="Monitor and verify all activity on Hack-Meet." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {adminKPIs.map((kpi) => {
          const Icon = kpiIcons[kpi.icon] || Users;
          return (
            <div key={kpi.label} className="bg-card border border-default rounded-2xl p-5 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-warning-50 dark:bg-warning-950/40 flex items-center justify-center"><Icon className="w-5 h-5 text-warning-500" /></div>
                <span className={`text-xs font-semibold flex items-center gap-1 ${kpi.trendUp ? 'text-success-600 dark:text-success-400' : 'text-error-500'}`}>{kpi.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.trend}</span>
              </div>
              <div className="text-2xl font-extrabold text-body">{kpi.value.toLocaleString()}</div>
              <div className="text-xs text-muted mt-0.5">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* Pending Verification */}
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Pending Verification</h3>
          <div className="space-y-3">
            {hrVerifications.filter((h) => h.status === 'Pending').slice(0, 3).map((h) => (
              <div key={h.id} className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                <Avatar initials={h.initials} gradient={h.gradient} size="sm" />
                <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-body truncate">{h.name}</div><div className="text-[10px] text-muted">{h.company} · HR Verification · {h.submittedDate}</div></div>
                <RiskBadge level={h.riskLevel} />
                <button onClick={() => setPage('admin-recruiters')} className="text-xs font-semibold text-warning-600 dark:text-warning-400 hover:underline">Review</button>
              </div>
            ))}
            {organizationVerifications.filter((o) => o.status === 'Pending').slice(0, 2).map((o) => (
              <div key={o.id} className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                <Avatar initials={o.initials} gradient={o.gradient} size="sm" />
                <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-body truncate">{o.name}</div><div className="text-[10px] text-muted">{o.type} · Org Verification · {o.submittedDate}</div></div>
                <RiskBadge level={o.riskLevel} />
                <button onClick={() => setPage('admin-organizations')} className="text-xs font-semibold text-warning-600 dark:text-warning-400 hover:underline">Review</button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">Recent Platform Activity</h3>
          <div className="space-y-3">
            {platformActivity.map((a) => {
              const icons = { hr: ShieldCheck, hackathon: Rocket, org: Building2, approved: CheckCircle2, report: Flag, rejected: X, suspended: Ban };
              const colors = { hr: 'text-brand-500', hackathon: 'text-cyan-500', org: 'text-success-500', approved: 'text-success-500', report: 'text-error-500', rejected: 'text-error-500', suspended: 'text-error-500' };
              const Icon = icons[a.type];
              return (
                <div key={a.id} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-ink-50 dark:bg-ink-800/40 flex items-center justify-center flex-shrink-0"><Icon className={`w-3.5 h-3.5 ${colors[a.type]}`} /></div>
                  <div className="flex-1"><p className="text-sm text-body">{a.text}</p><span className="text-[10px] text-muted">{a.time}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Verification Queue */}
      <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-body">Verification Queue</h3>
          <button onClick={() => setPage('admin-verification')} className="text-xs font-semibold text-warning-600 dark:text-warning-400 hover:underline inline-flex items-center gap-1">View All <ArrowRight className="w-3.5 h-3.5" /></button>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/30 cursor-pointer hover:ring-2 hover:ring-brand-400/30 transition-all" onClick={() => setPage('admin-recruiters')}>
            <div className="flex items-center gap-2 mb-2"><ShieldCheck className="w-4 h-4 text-brand-500" /><span className="text-xs font-bold text-body">HR Verification</span></div>
            <div className="text-2xl font-extrabold text-body">12 Pending</div>
            <button className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-400">Review →</button>
          </div>
          <div className="p-4 rounded-xl bg-success-50 dark:bg-success-950/30 cursor-pointer hover:ring-2 hover:ring-success-400/30 transition-all" onClick={() => setPage('admin-organizations')}>
            <div className="flex items-center gap-2 mb-2"><Building2 className="w-4 h-4 text-success-500" /><span className="text-xs font-bold text-body">Organization Verification</span></div>
            <div className="text-2xl font-extrabold text-body">8 Pending</div>
            <button className="mt-2 text-xs font-semibold text-success-600 dark:text-success-400">Review →</button>
          </div>
          <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 cursor-pointer hover:ring-2 hover:ring-cyan-400/30 transition-all" onClick={() => setPage('admin-hackathons')}>
            <div className="flex items-center gap-2 mb-2"><Rocket className="w-4 h-4 text-cyan-500" /><span className="text-xs font-bold text-body">Hackathon Approval</span></div>
            <div className="text-2xl font-extrabold text-body">17 Pending</div>
            <button className="mt-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">Review →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 2. Users ── */

export function AdminUsers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Students', 'Organizers', 'Recruiters', 'Admins'];
  const filtered = platformUsers.filter((u) => (filter === 'All' || (filter === 'Students' && u.role === 'Student') || (filter === 'Organizers' && u.role === 'Organizer') || (filter === 'Recruiters' && u.role === 'Recruiter') || (filter === 'Admins' && u.role === 'Admin')) && (!search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Users" subtitle="Manage all platform users and their account status." />
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full text-sm bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl pl-10 pr-4 py-2.5 text-body placeholder:text-muted outline-none focus:border-warning-400" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
          {filters.map((f) => <button key={f} onClick={() => setFilter(f)} className={`whitespace-nowrap px-3 py-2 rounded-xl text-xs font-medium transition-colors ${filter === f ? 'bg-warning-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{f}</button>)}
        </div>
      </div>
      <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-default text-left">
              <th className="px-4 py-3 text-xs font-semibold text-muted">User</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden md:table-cell">Email</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Role</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden lg:table-cell">Joined</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden md:table-cell">Reputation</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden sm:table-cell">Verified</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-default last:border-0 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar initials={u.initials} gradient={u.gradient} size="sm" /><span className="text-sm font-semibold text-body">{u.name}</span></div></td>
                  <td className="px-4 py-3 text-sm text-muted hidden md:table-cell">{u.email}</td>
                  <td className="px-4 py-3 text-sm text-body">{u.role}</td>
                  <td className="px-4 py-3 text-sm text-muted hidden lg:table-cell">{u.joinedDate}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-body hidden md:table-cell">{u.reputation > 0 ? `${u.reputation}/100` : '—'}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">{u.verified ? <Check className="w-4 h-4 text-success-500" /> : <X className="w-4 h-4 text-muted" />}</td>
                  <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-4 py-3"><button className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Manage</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── 3. Organizations ── */

export function AdminOrganizations() {
  const [tab, setTab] = useState('Pending');
  const tabs = ['Pending', 'Approved', 'Rejected', 'Request Changes'];
  const [reviewOrg, setReviewOrg] = useState<typeof organizationVerifications[0] | null>(null);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showChanges, setShowChanges] = useState(false);
  const filtered = tab === 'Pending' ? organizationVerifications.filter((o) => o.status === 'Pending') : organizationVerifications.filter((o) => o.status === tab);

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Organizations" subtitle="Verify and manage organizations on Hack-Meet." />
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === t ? 'bg-warning-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{t}</button>)}
      </div>
      <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-default text-left">
              <th className="px-4 py-3 text-xs font-semibold text-muted">Organization</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden sm:table-cell">Type</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden lg:table-cell">Representative</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden md:table-cell">Website</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden lg:table-cell">Hackathons</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden md:table-cell">Risk</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-default last:border-0 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar initials={o.initials} gradient={o.gradient} size="sm" /><span className="text-sm font-semibold text-body">{o.name}</span></div></td>
                  <td className="px-4 py-3 text-sm text-body hidden sm:table-cell">{o.type}</td>
                  <td className="px-4 py-3 text-sm text-muted hidden lg:table-cell">{o.representative}</td>
                  <td className="px-4 py-3 text-sm text-cyan-600 dark:text-cyan-400 hidden md:table-cell">{o.website}</td>
                  <td className="px-4 py-3 text-sm text-body hidden lg:table-cell">{o.hackathonsHosted}</td>
                  <td className="px-4 py-3 hidden md:table-cell"><RiskBadge level={o.riskLevel} /></td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3"><button onClick={() => setReviewOrg(o)} className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {reviewOrg && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setReviewOrg(null)}>
          <div className="bg-card border border-default rounded-2xl max-w-4xl w-full shadow-float my-8" onClick={(e) => e.stopPropagation()}>
            <div className={`h-20 bg-gradient-to-r ${reviewOrg.gradient} rounded-t-2xl relative flex items-center px-6`}>
              <button onClick={() => setReviewOrg(null)} className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-start gap-4 -mt-8 relative">
                <Avatar initials={reviewOrg.initials} gradient={reviewOrg.gradient} size="xl" />
                <div className="mt-8 flex-1">
                  <h2 className="text-xl font-bold text-body">{reviewOrg.name}</h2>
                  <p className="text-sm text-muted">{reviewOrg.type} · Representative: {reviewOrg.representative}</p>
                </div>
                <div className="mt-8"><StatusBadge status={reviewOrg.status} /></div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Website</div><div className="text-sm font-semibold text-body">{reviewOrg.website}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Email Domain</div><div className="text-sm font-semibold text-body">{reviewOrg.emailDomain}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Hackathons Hosted</div><div className="text-sm font-semibold text-body">{reviewOrg.hackathonsHosted}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Submitted</div><div className="text-sm font-semibold text-body">{reviewOrg.submittedDate}</div></div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-bold text-body mb-3">Submitted Documents</h3>
                <div className="space-y-2">
                  {reviewOrg.documents.map((d) => (
                    <div key={d.id} className="flex items-center gap-3 p-3 rounded-xl border border-default">
                      <FileText className="w-4 h-4 text-brand-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-body">{d.name}</div><div className="text-[10px] text-muted">{d.filename} · {d.uploadDate}</div></div>
                      <StatusBadge status={d.status} />
                      <button className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">View</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 p-4 rounded-xl bg-brand-50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-800">
                <div className="flex items-center gap-2 mb-3"><Zap className="w-4 h-4 text-brand-500" /><h3 className="text-sm font-bold text-body">AI Verification Assistance</h3><span className="ml-auto text-xs font-bold text-brand-600 dark:text-brand-400">AI confidence: {reviewOrg.aiConfidence}%</span></div>
                <div className="space-y-2">{reviewOrg.aiFlags.map((f, i) => <AIFlagItem key={i} flag={f} />)}</div>
                <p className="text-[10px] text-muted mt-3">AI only assists. Final decision must be made by an authorized admin. Manual review required.</p>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <button onClick={() => setShowApprove(true)} className="flex-1 text-sm font-semibold text-white bg-success-500 rounded-xl py-3 hover:bg-success-600 transition-colors inline-flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Approve</button>
                <button onClick={() => setShowChanges(true)} className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-3 hover:border-brand-400 transition-colors inline-flex items-center justify-center gap-2"><AlertCircle className="w-4 h-4" /> Request Changes</button>
                <button onClick={() => setShowReject(true)} className="flex-1 text-sm font-semibold text-error-600 dark:text-error-400 border border-error-200 dark:border-error-800 rounded-xl py-3 hover:bg-error-50 dark:hover:bg-error-950/20 transition-colors inline-flex items-center justify-center gap-2"><X className="w-4 h-4" /> Reject</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal open={showApprove} onClose={() => setShowApprove(false)} onConfirm={() => { setShowApprove(false); setReviewOrg(null); }} title="Approve organization?" message="This organization will become verified and can publish hackathons. An audit log entry will be created." />
      <RejectModal open={showReject} onClose={() => setShowReject(false)} onConfirm={() => { setShowReject(false); setReviewOrg(null); }} title="Reject Organization Verification" />
      <RequestChangesModal open={showChanges} onClose={() => setShowChanges(false)} onConfirm={() => { setShowChanges(false); setReviewOrg(null); }} title="Request Changes — Organization" />
    </div>
  );
}

/* ── 4. HR / Recruiters ── */

export function AdminRecruiters() {
  const [tab, setTab] = useState('Pending');
  const tabs = ['Pending', 'Approved', 'Rejected', 'Request Changes'];
  const [reviewHr, setReviewHr] = useState<typeof hrVerifications[0] | null>(null);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showChanges, setShowChanges] = useState(false);
  const [docPreview, setDocPreview] = useState<typeof hrVerifications[0]['documents'][0] | null>(null);
  const filtered = tab === 'Pending' ? hrVerifications.filter((h) => h.status === 'Pending') : hrVerifications.filter((h) => h.status === tab);

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="HR / Recruiters" subtitle="Verify HR professionals before they can discover and contact candidates." />
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === t ? 'bg-warning-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{t}</button>)}
      </div>
      <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-default text-left">
              <th className="px-4 py-3 text-xs font-semibold text-muted">Recruiter</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden sm:table-cell">Company</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden lg:table-cell">Role</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden md:table-cell">Domain</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden lg:table-cell">Submitted</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden md:table-cell">Docs</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden lg:table-cell">Risk</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((h) => (
                <tr key={h.id} className="border-b border-default last:border-0 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar initials={h.initials} gradient={h.gradient} size="sm" /><span className="text-sm font-semibold text-body">{h.name}</span></div></td>
                  <td className="px-4 py-3 text-sm text-body hidden sm:table-cell">{h.company}</td>
                  <td className="px-4 py-3 text-sm text-muted hidden lg:table-cell">{h.role}</td>
                  <td className="px-4 py-3 text-sm text-cyan-600 dark:text-cyan-400 hidden md:table-cell">{h.companyDomain}</td>
                  <td className="px-4 py-3 text-sm text-muted hidden lg:table-cell">{h.submittedDate}</td>
                  <td className="px-4 py-3 text-sm text-body hidden md:table-cell">{h.documents.length} docs</td>
                  <td className="px-4 py-3 hidden lg:table-cell"><RiskBadge level={h.riskLevel} /></td>
                  <td className="px-4 py-3"><StatusBadge status={h.status} /></td>
                  <td className="px-4 py-3"><button onClick={() => setReviewHr(h)} className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* HR Verification Detail */}
      {reviewHr && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setReviewHr(null)}>
          <div className="bg-card border border-default rounded-2xl max-w-5xl w-full shadow-float my-8" onClick={(e) => e.stopPropagation()}>
            <div className={`h-20 bg-gradient-to-r ${reviewHr.gradient} rounded-t-2xl relative flex items-center px-6`}>
              <button onClick={() => setReviewHr(null)} className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-start gap-4 -mt-8 relative">
                <Avatar initials={reviewHr.initials} gradient={reviewHr.gradient} size="xl" />
                <div className="mt-8 flex-1">
                  <h2 className="text-xl font-bold text-body">{reviewHr.name}</h2>
                  <p className="text-sm text-muted">{reviewHr.role} · {reviewHr.company}</p>
                </div>
                <div className="mt-8 text-right"><div className="text-[10px] text-muted">Recruiter Verification</div><StatusBadge status={reviewHr.status} /></div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Work Email</div><div className="text-sm font-semibold text-body">{reviewHr.email}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">LinkedIn</div><div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">{reviewHr.linkedin}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Company Website</div><div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">{reviewHr.companyWebsite}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Location</div><div className="text-sm font-semibold text-body">{reviewHr.location}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Account Created</div><div className="text-sm font-semibold text-body">{reviewHr.accountCreated}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Submitted</div><div className="text-sm font-semibold text-body">{reviewHr.submittedDate}</div></div>
              </div>

              {/* Documents */}
              <div className="mt-5">
                <h3 className="text-sm font-bold text-body mb-3 flex items-center gap-2"><FileText className="w-4 h-4 text-brand-500" /> Submitted Proof &amp; Documents</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {reviewHr.documents.map((d) => (
                    <div key={d.id} className="flex items-center gap-3 p-4 rounded-xl border border-default hover:border-strong transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center flex-shrink-0"><FileText className="w-5 h-5 text-brand-500" /></div>
                      <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-body">{d.name}</div><div className="text-[10px] text-muted">Status: {d.status}</div></div>
                      {d.type === 'LinkedIn Profile' ? (
                        <button className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5" /> Open</button>
                      ) : (
                        <button onClick={() => setDocPreview(d)} className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">View Document</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Assistance */}
              <div className="mt-5 p-4 rounded-xl bg-brand-50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-800">
                <div className="flex items-center gap-2 mb-3"><Zap className="w-4 h-4 text-brand-500" /><h3 className="text-sm font-bold text-body">AI Verification Assistance</h3><span className="ml-auto text-xs font-bold text-brand-600 dark:text-brand-400">AI confidence: {reviewHr.aiConfidence}%</span></div>
                <div className="space-y-2">{reviewHr.aiFlags.map((f, i) => <AIFlagItem key={i} flag={f} />)}</div>
                <p className="text-[10px] text-muted mt-3">AI only assists. Final verification decision must be made by an authorized admin. Manual review required.</p>
              </div>

              {/* Decision */}
              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <button onClick={() => setShowApprove(true)} className="flex-1 text-sm font-semibold text-white bg-success-500 rounded-xl py-3 hover:bg-success-600 transition-colors inline-flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Approve Recruiter</button>
                <button onClick={() => setShowChanges(true)} className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-3 hover:border-brand-400 transition-colors inline-flex items-center justify-center gap-2"><AlertCircle className="w-4 h-4" /> Request Changes</button>
                <button onClick={() => setShowReject(true)} className="flex-1 text-sm font-semibold text-error-600 dark:text-error-400 border border-error-200 dark:border-error-800 rounded-xl py-3 hover:bg-error-50 dark:hover:bg-error-950/20 transition-colors inline-flex items-center justify-center gap-2"><X className="w-4 h-4" /> Reject</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DocumentPreviewModal open={!!docPreview} onClose={() => setDocPreview(null)} docName={docPreview?.name || ''} filename={docPreview?.filename || ''} uploadDate={docPreview?.uploadDate || ''} submittedBy={docPreview?.submittedBy || ''} />
      <ConfirmModal open={showApprove} onClose={() => setShowApprove(false)} onConfirm={() => { setShowApprove(false); setReviewHr(null); }} title="Approve this recruiter?" message="The HR account will become Verified. A verification badge will appear. The recruiter can use talent discovery and invitations. An audit-log entry will be created." />
      <RejectModal open={showReject} onClose={() => setShowReject(false)} onConfirm={() => { setShowReject(false); setReviewHr(null); }} title="Reject HR Verification" />
      <RequestChangesModal open={showChanges} onClose={() => setShowChanges(false)} onConfirm={() => { setShowChanges(false); setReviewHr(null); }} title="Request Changes — Recruiter" />
    </div>
  );
}

/* ── 5. Hackathons ── */

export function AdminHackathons() {
  const [tab, setTab] = useState('Pending Approval');
  const tabs = ['Pending Approval', 'Approved', 'Rejected', 'Needs Changes', 'Completed'];
  const [reviewHack, setReviewHack] = useState<typeof hackathonApprovals[0] | null>(null);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showChanges, setShowChanges] = useState(false);
  const filtered = hackathonApprovals.filter((h) => h.status === tab);

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Hackathons" subtitle="Review and approve hackathons before they are publicly listed." />
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === t ? 'bg-warning-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{t}</button>)}
      </div>
      <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-default text-left">
              <th className="px-4 py-3 text-xs font-semibold text-muted">Hackathon</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden sm:table-cell">Organizer</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden md:table-cell">Mode</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden lg:table-cell">Prize</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden md:table-cell">Risk</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((h) => (
                <tr key={h.id} className="border-b border-default last:border-0 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${h.gradient} flex-shrink-0`} /><span className="text-sm font-semibold text-body">{h.name}</span></div></td>
                  <td className="px-4 py-3 hidden sm:table-cell"><div className="flex items-center gap-1.5"><span className="text-sm text-muted">{h.organizer}</span>{h.organizerVerified ? <Check className="w-3 h-3 text-success-500" /> : <X className="w-3 h-3 text-error-500" />}</div></td>
                  <td className="px-4 py-3 text-sm text-body hidden md:table-cell">{h.mode}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-body hidden lg:table-cell">{h.prizePool}</td>
                  <td className="px-4 py-3 hidden md:table-cell"><RiskBadge level={h.riskLevel} /></td>
                  <td className="px-4 py-3"><StatusBadge status={h.status} /></td>
                  <td className="px-4 py-3"><button onClick={() => setReviewHack(h)} className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hackathon Review Detail */}
      {reviewHack && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setReviewHack(null)}>
          <div className="bg-card border border-default rounded-2xl max-w-3xl w-full shadow-float my-8" onClick={(e) => e.stopPropagation()}>
            <div className={`h-24 bg-gradient-to-r ${reviewHack.gradient} rounded-t-2xl relative px-6 flex items-end pb-3`}>
              <button onClick={() => setReviewHack(null)} className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"><X className="w-4 h-4" /></button>
              <h2 className="text-lg font-bold text-white relative">{reviewHack.name}</h2>
            </div>
            <div className="px-6 pb-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Organizer</div><div className="text-sm font-semibold text-body flex items-center gap-1">{reviewHack.organizer}{reviewHack.organizerVerified ? <Check className="w-3 h-3 text-success-500" /> : <X className="w-3 h-3 text-error-500" />}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Domain</div><div className="text-sm font-semibold text-body">{reviewHack.domain}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Mode</div><div className="text-sm font-semibold text-body">{reviewHack.mode}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Eligibility</div><div className="text-sm font-semibold text-body">{reviewHack.eligibility}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Team Size</div><div className="text-sm font-semibold text-body">{reviewHack.teamSize}</div></div>
                <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Prize Pool</div><div className="text-sm font-semibold text-body">{reviewHack.prizePool}</div></div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-bold text-body mb-3">Timeline</h3>
                <div className="relative pl-6 space-y-2 before:absolute before:left-2 before:top-1 before:bottom-1 before:w-px before:bg-ink-200 dark:before:bg-ink-700">
                  {reviewHack.timeline.map((t, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-brand-500 ring-2 ring-white dark:ring-ink-900" />
                      <span className="text-sm font-semibold text-body">{t.label}</span><span className="text-xs text-muted ml-2">{t.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-bold text-body mb-3">Problem Statements</h3>
                <div className="space-y-2">
                  {reviewHack.problemStatements.map((p, i) => (
                    <div key={i} className="p-3 rounded-xl border border-default"><div className="text-sm font-semibold text-body">{p.title}</div><div className="text-xs text-muted mt-1">{p.description}</div></div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-bold text-body mb-3">Rules</h3>
                <ul className="space-y-1">{reviewHack.rules.map((r, i) => <li key={i} className="flex items-start gap-2 text-xs text-body"><Check className="w-3.5 h-3.5 text-success-500 flex-shrink-0 mt-0.5" /> {r}</li>)}</ul>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-bold text-body mb-3">Rewards</h3>
                <ul className="space-y-1">{reviewHack.rewards.map((r, i) => <li key={i} className="flex items-start gap-2 text-xs text-body"><Star className="w-3.5 h-3.5 text-warning-500 flex-shrink-0 mt-0.5" /> {r}</li>)}</ul>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-bold text-body mb-3">Community Setup</h3>
                <div className="flex flex-wrap gap-2">{reviewHack.communitySetup.map((c, i) => <SkillChip key={i} label={c} color="cyan" />)}</div>
              </div>

              <div className="mt-5 p-4 rounded-xl bg-error-50 dark:bg-error-950/20 border border-error-200 dark:border-error-800">
                <h3 className="text-sm font-bold text-body mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-error-500" /> Safety Review</h3>
                <div className="space-y-2">{reviewHack.safetyFlags.map((f, i) => <AIFlagItem key={i} flag={f} />)}</div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <button onClick={() => setShowApprove(true)} className="flex-1 text-sm font-semibold text-white bg-success-500 rounded-xl py-3 hover:bg-success-600 transition-colors inline-flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Approve Hackathon</button>
                <button onClick={() => setShowChanges(true)} className="flex-1 text-sm font-semibold text-body border border-default rounded-xl py-3 hover:border-brand-400 transition-colors inline-flex items-center justify-center gap-2"><AlertCircle className="w-4 h-4" /> Request Changes</button>
                <button onClick={() => setShowReject(true)} className="flex-1 text-sm font-semibold text-error-600 dark:text-error-400 border border-error-200 dark:border-error-800 rounded-xl py-3 hover:bg-error-50 dark:hover:bg-error-950/20 transition-colors inline-flex items-center justify-center gap-2"><X className="w-4 h-4" /> Reject</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal open={showApprove} onClose={() => setShowApprove(false)} onConfirm={() => { setShowApprove(false); setReviewHack(null); }} title="Approve this hackathon?" message="The hackathon will become publicly discoverable. The organizer will receive a notification. An audit log entry will be created." />
      <RejectModal open={showReject} onClose={() => setShowReject(false)} onConfirm={() => { setShowReject(false); setReviewHack(null); }} title="Reject Hackathon" />
      <RequestChangesModal open={showChanges} onClose={() => setShowChanges(false)} onConfirm={() => { setShowChanges(false); setReviewHack(null); }} title="Request Changes — Hackathon" />
    </div>
  );
}

/* ── 6. Verification Center ── */

export function AdminVerification() {
  const [sortBy, setSortBy] = useState('Newest first');
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Verification Center" subtitle="Unified queue for all verification requests." />
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-2xl bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800">
          <div className="flex items-center gap-2 mb-2"><ShieldCheck className="w-5 h-5 text-brand-500" /><span className="text-sm font-bold text-body">HR Verification</span></div>
          <div className="text-3xl font-extrabold text-body">12 Pending</div>
          <button className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-400">Review →</button>
        </div>
        <div className="p-5 rounded-2xl bg-success-50 dark:bg-success-950/30 border border-success-200 dark:border-success-800">
          <div className="flex items-center gap-2 mb-2"><Building2 className="w-5 h-5 text-success-500" /><span className="text-sm font-bold text-body">Organization Verification</span></div>
          <div className="text-3xl font-extrabold text-body">8 Pending</div>
          <button className="mt-2 text-xs font-semibold text-success-600 dark:text-success-400">Review →</button>
        </div>
        <div className="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800">
          <div className="flex items-center gap-2 mb-2"><Rocket className="w-5 h-5 text-cyan-500" /><span className="text-sm font-bold text-body">Hackathon Approval</span></div>
          <div className="text-3xl font-extrabold text-body">17 Pending</div>
          <button className="mt-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">Review →</button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2"><Filter className="w-4 h-4 text-muted" /><span className="text-xs font-semibold text-muted">Filters:</span></div>
        <select className="text-xs font-semibold bg-card border border-default rounded-lg px-3 py-1.5 text-body outline-none cursor-pointer"><option>All Types</option><option>HR</option><option>Organization</option><option>Hackathon</option></select>
        <select className="text-xs font-semibold bg-card border border-default rounded-lg px-3 py-1.5 text-body outline-none cursor-pointer"><option>All Statuses</option><option>Pending</option><option>Approved</option><option>Rejected</option></select>
        <select className="text-xs font-semibold bg-card border border-default rounded-lg px-3 py-1.5 text-body outline-none cursor-pointer"><option>All Risk Levels</option><option>Low</option><option>Medium</option><option>High</option></select>
        <div className="sm:ml-auto flex items-center gap-2"><ArrowUpDown className="w-4 h-4 text-muted" /><select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-xs font-semibold bg-card border border-default rounded-lg px-3 py-1.5 text-body outline-none cursor-pointer"><option>Newest first</option><option>Oldest first</option><option>Highest risk</option><option>Priority</option></select></div>
      </div>

      <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-default text-left">
              <th className="px-4 py-3 text-xs font-semibold text-muted">Name</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Type</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Submitted</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Risk</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Action</th>
            </tr></thead>
            <tbody>
              {hrVerifications.map((h) => (
                <tr key={h.id} className="border-b border-default last:border-0 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar initials={h.initials} gradient={h.gradient} size="sm" /><div><div className="text-sm font-semibold text-body">{h.name}</div><div className="text-[10px] text-muted">{h.company}</div></div></div></td>
                  <td className="px-4 py-3 text-sm text-body">HR Verification</td>
                  <td className="px-4 py-3 text-sm text-muted">{h.submittedDate}</td>
                  <td className="px-4 py-3"><RiskBadge level={h.riskLevel} /></td>
                  <td className="px-4 py-3"><StatusBadge status={h.status} /></td>
                  <td className="px-4 py-3"><button className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Review</button></td>
                </tr>
              ))}
              {organizationVerifications.map((o) => (
                <tr key={o.id} className="border-b border-default last:border-0 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar initials={o.initials} gradient={o.gradient} size="sm" /><div><div className="text-sm font-semibold text-body">{o.name}</div><div className="text-[10px] text-muted">{o.type}</div></div></div></td>
                  <td className="px-4 py-3 text-sm text-body">Organization</td>
                  <td className="px-4 py-3 text-sm text-muted">{o.submittedDate}</td>
                  <td className="px-4 py-3"><RiskBadge level={o.riskLevel} /></td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3"><button className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Review</button></td>
                </tr>
              ))}
              {hackathonApprovals.filter((h) => h.status === 'Pending Approval').map((h) => (
                <tr key={h.id} className="border-b border-default last:border-0 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${h.gradient} flex-shrink-0`} /><div><div className="text-sm font-semibold text-body">{h.name}</div><div className="text-[10px] text-muted">{h.organizer}</div></div></div></td>
                  <td className="px-4 py-3 text-sm text-body">Hackathon</td>
                  <td className="px-4 py-3 text-sm text-muted">{h.submittedDate}</td>
                  <td className="px-4 py-3"><RiskBadge level={h.riskLevel} /></td>
                  <td className="px-4 py-3"><StatusBadge status={h.status} /></td>
                  <td className="px-4 py-3"><button className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── 7. Reports & Safety ── */

export function AdminReports() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Harassment', 'Spam', 'Fake recruiter', 'Fake hackathon', 'Fraud/scam', 'Inappropriate content', 'Suspicious account', 'Other'];
  const filtered = filter === 'All' ? reports : reports.filter((r) => r.category === filter);
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Reports & Safety" subtitle="Moderation queue for reported users and content." />
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {categories.map((c) => <button key={c} onClick={() => setFilter(c)} className={`whitespace-nowrap px-3 py-2 rounded-xl text-xs font-medium transition-colors ${filter === c ? 'bg-warning-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{c}</button>)}
      </div>
      <div className="space-y-4">
        {filtered.map((r) => (
          <div key={r.id} className="bg-card border border-default rounded-2xl p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-error-50 dark:bg-error-950/30 flex items-center justify-center"><Flag className="w-5 h-5 text-error-500" /></div>
                <div>
                  <div className="text-sm font-bold text-body">{r.category}</div>
                  <div className="text-[10px] text-muted">Reported by {r.reporter} · {r.timestamp}</div>
                </div>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Reported User</div><div className="text-sm font-semibold text-body">{r.reportedUser}</div></div>
              <div className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40"><div className="text-[10px] text-muted">Previous Reports</div><div className="text-sm font-semibold text-body">{r.previousReports} reports</div></div>
            </div>
            <p className="text-sm text-body mb-2">{r.reason}</p>
            <div className="text-xs text-muted mb-4">Evidence: {r.evidence}</div>
            <div className="flex flex-wrap gap-2">
              <button className="text-xs font-semibold text-body border border-default rounded-lg px-3 py-1.5 hover:border-brand-400 transition-colors">Review</button>
              <button className="text-xs font-semibold text-warning-700 dark:text-warning-400 bg-warning-50 dark:bg-warning-950/40 rounded-lg px-3 py-1.5 hover:bg-warning-100 dark:hover:bg-warning-950/60 transition-colors">Warn</button>
              <button className="text-xs font-semibold text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 rounded-lg px-3 py-1.5 hover:bg-brand-100 dark:hover:bg-brand-950/60 transition-colors">Restrict</button>
              <button className="text-xs font-semibold text-error-700 dark:text-error-400 bg-error-50 dark:bg-error-950/40 rounded-lg px-3 py-1.5 hover:bg-error-100 dark:hover:bg-error-950/60 transition-colors">Suspend</button>
              <button className="text-xs font-semibold text-white bg-error-500 rounded-lg px-3 py-1.5 hover:bg-error-600 transition-colors inline-flex items-center gap-1"><Ban className="w-3.5 h-3.5" /> Ban</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 8. Suspended Accounts ── */

export function AdminSuspended() {
  const suspended = platformUsers.filter((u) => u.status === 'Suspended' || u.status === 'Banned');
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Suspended Accounts" subtitle="Accounts that have been suspended or banned." />
      <div className="grid md:grid-cols-2 gap-5">
        {suspended.map((u) => (
          <div key={u.id} className="bg-card border border-default rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <Avatar initials={u.initials} gradient={u.gradient} size="md" />
              <div className="flex-1"><div className="text-sm font-bold text-body">{u.name}</div><div className="text-xs text-muted">{u.email} · {u.role}</div></div>
              <StatusBadge status={u.status} />
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 text-xs font-semibold text-white bg-success-500 rounded-lg py-2 hover:bg-success-600 transition-colors">Reactivate</button>
              <button className="flex-1 text-xs font-semibold text-body border border-default rounded-lg py-2 hover:border-error-400 hover:text-error-500 transition-colors">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 9. Messages / Moderation ── */

export function AdminMessages() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Messages / Moderation" subtitle="Monitor and moderate platform conversations." />
      <div className="grid lg:grid-cols-[300px_1fr] gap-4 lg:h-[calc(100vh-280px)] min-h-[400px] flex flex-col lg:flex-row">
        <div className="bg-card border border-default rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-default"><span className="text-sm font-bold text-body">Flagged Conversations</span></div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {reports.filter((r) => r.category === 'Harassment' || r.category === 'Spam').map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-ink-50 dark:hover:bg-ink-800/40 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-error-50 dark:bg-error-950/30 flex items-center justify-center"><Flag className="w-4 h-4 text-error-500" /></div>
                <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-body truncate">{r.reportedUser}</div><div className="text-[10px] text-muted">{r.category} · {r.timestamp}</div></div>
                <Flag className="w-3.5 h-3.5 text-error-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-default rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-default flex items-center justify-between">
            <div className="flex items-center gap-2"><span className="text-sm font-bold text-body">user_8472 — General Chat</span><Flag className="w-4 h-4 text-error-500" /></div>
            <button className="text-xs font-semibold text-error-600 dark:text-error-400 hover:underline inline-flex items-center gap-1"><Flag className="w-3.5 h-3.5" /> Report / Flag</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="flex gap-3"><div className="w-8 h-8 rounded-lg bg-ink-200 dark:bg-ink-700 flex-shrink-0" /><div className="max-w-[70%]"><div className="bg-ink-50 dark:bg-ink-800/40 rounded-2xl rounded-tl-sm px-4 py-2.5"><p className="text-sm text-body">Hey everyone, check out my new project!</p></div><span className="text-[10px] text-muted mt-1 block">10:30 AM</span></div></div>
            <div className="flex gap-3"><div className="w-8 h-8 rounded-lg bg-error-200 dark:bg-error-900 flex-shrink-0" /><div className="max-w-[70%]"><div className="bg-error-50 dark:bg-error-950/30 rounded-2xl rounded-tl-sm px-4 py-2.5 border border-error-200 dark:border-error-800"><p className="text-sm text-body">[FLAGGED] Inappropriate message content...</p></div><span className="text-[10px] text-error-500 mt-1 block">10:32 AM · Flagged by system</span></div></div>
            <div className="flex gap-3"><div className="w-8 h-8 rounded-lg bg-ink-200 dark:bg-ink-700 flex-shrink-0" /><div className="max-w-[70%]"><div className="bg-ink-50 dark:bg-ink-800/40 rounded-2xl rounded-tl-sm px-4 py-2.5"><p className="text-sm text-body">Can someone help me with React?</p></div><span className="text-[10px] text-muted mt-1 block">10:35 AM</span></div></div>
          </div>
          <div className="p-4 border-t border-default flex flex-wrap gap-2">
            <button className="text-xs font-semibold text-white bg-error-500 rounded-lg px-3 py-2 hover:bg-error-600 transition-colors">Suspend User</button>
            <button className="text-xs font-semibold text-body border border-default rounded-lg px-3 py-2 hover:border-brand-400 transition-colors">Warn User</button>
            <button className="text-xs font-semibold text-body border border-default rounded-lg px-3 py-2 hover:border-success-400 transition-colors">Dismiss Flag</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 10. Payments & Revenue ── */

export function AdminPayments() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Payments & Revenue" subtitle="Track platform revenue and subscription payments." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Monthly Revenue', value: '₹4,78,000', trend: '+11%', icon: CreditCard },
          { label: 'Active Subscriptions', value: '74', trend: '+6', icon: Users },
          { label: 'Pending Payments', value: '1', trend: '', icon: Clock },
          { label: 'Total Revenue (YTD)', value: '₹22.5L', trend: '+18%', icon: TrendingUp },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-card border border-default rounded-2xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3"><div className="w-10 h-10 rounded-xl bg-warning-50 dark:bg-warning-950/40 flex items-center justify-center"><kpi.icon className="w-5 h-5 text-warning-500" /></div>{kpi.trend && <span className="text-xs font-semibold text-success-600 dark:text-success-400">{kpi.trend}</span>}</div>
            <div className="text-2xl font-extrabold text-body">{kpi.value}</div><div className="text-xs text-muted mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-default rounded-2xl p-5 shadow-soft mb-5">
        <h3 className="text-sm font-bold text-body mb-4">Revenue Trend</h3>
        <div className="flex items-end gap-3 h-40">
          {revenueData.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full rounded-t-lg bg-gradient-to-t from-warning-500 to-warning-300" style={{ height: `${(d.revenue / revenueData[revenueData.length - 1].revenue) * 100}%` }} />
              <span className="text-[10px] text-muted">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
        <div className="p-4 border-b border-default"><h3 className="text-sm font-bold text-body">Payment History</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-default text-left">
              <th className="px-4 py-3 text-xs font-semibold text-muted">Company</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Plan</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Amount</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Date</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Status</th>
            </tr></thead>
            <tbody>
              {paymentHistory.map((p) => (
                <tr key={p.id} className="border-b border-default last:border-0 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">
                  <td className="px-4 py-3 text-sm font-semibold text-body">{p.company}</td>
                  <td className="px-4 py-3 text-sm text-muted">{p.plan}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-body">{p.amount}</td>
                  <td className="px-4 py-3 text-sm text-muted">{p.date}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── 11. Analytics ── */

export function AdminAnalytics() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Analytics" subtitle="Platform-wide metrics and trends." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Users', value: '14,823', trend: '+342', icon: Users },
          { label: 'Active Hackathons', value: '34', trend: '+3', icon: Rocket },
          { label: 'Total Projects', value: '8,247', trend: '+156', icon: BarChart3 },
          { label: 'Verified Recruiters', value: '142', trend: '+8', icon: ShieldCheck },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-card border border-default rounded-2xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3"><div className="w-10 h-10 rounded-xl bg-warning-50 dark:bg-warning-950/40 flex items-center justify-center"><kpi.icon className="w-5 h-5 text-warning-500" /></div><span className="text-xs font-semibold text-success-600 dark:text-success-400">{kpi.trend}</span></div>
            <div className="text-2xl font-extrabold text-body">{kpi.value}</div><div className="text-xs text-muted mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">User Growth</h3>
          <div className="flex items-end gap-3 h-40">
            {revenueData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-brand-500 to-brand-300" style={{ height: `${(d.subscriptions / revenueData[revenueData.length - 1].subscriptions) * 100}%` }} />
                <span className="text-[10px] text-muted">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-default rounded-2xl p-5 shadow-soft">
          <h3 className="text-sm font-bold text-body mb-4">User Distribution</h3>
          <div className="space-y-3">
            {[
              { label: 'Students', count: 12450, pct: 84, color: 'from-brand-500 to-brand-600' },
              { label: 'Organizers', count: 1240, pct: 8, color: 'from-cyan-500 to-cyan-600' },
              { label: 'Recruiters', count: 980, pct: 7, color: 'from-success-500 to-success-600' },
              { label: 'Admins', count: 153, pct: 1, color: 'from-warning-500 to-warning-600' },
            ].map((d) => (
              <div key={d.label}>
                <div className="flex items-center justify-between mb-1.5"><span className="text-xs font-medium text-body">{d.label}</span><span className="text-xs font-semibold text-muted">{d.count.toLocaleString()}</span></div>
                <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden"><div className={`h-full rounded-full bg-gradient-to-r ${d.color}`} style={{ width: `${d.pct}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 12. Audit Logs ── */

export function AdminAudit() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Approved', 'Rejected', 'Request Changes', 'Suspended', 'Banned'];
  const filtered = auditLogs.filter((l) => (filter === 'All' || l.newStatus === filter) && (!search || l.action.toLowerCase().includes(search.toLowerCase()) || l.entity.toLowerCase().includes(search.toLowerCase()) || l.admin.toLowerCase().includes(search.toLowerCase())));
  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="Audit Logs" subtitle="Every admin action is recorded for accountability." />
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..." className="w-full text-sm bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl pl-10 pr-4 py-2.5 text-body placeholder:text-muted outline-none focus:border-warning-400" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
          {filters.map((f) => <button key={f} onClick={() => setFilter(f)} className={`whitespace-nowrap px-3 py-2 rounded-xl text-xs font-medium transition-colors ${filter === f ? 'bg-warning-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{f}</button>)}
        </div>
      </div>
      <div className="bg-card border border-default rounded-2xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-default text-left">
              <th className="px-4 py-3 text-xs font-semibold text-muted">Admin</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Action</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden md:table-cell">Entity</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden lg:table-cell">Previous Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">New Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted hidden lg:table-cell">Reason</th>
              <th className="px-4 py-3 text-xs font-semibold text-muted">Timestamp</th>
            </tr></thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} className="border-b border-default last:border-0 hover:bg-ink-50 dark:hover:bg-ink-800/40 transition-colors">
                  <td className="px-4 py-3 text-sm font-semibold text-body">{l.admin}</td>
                  <td className="px-4 py-3 text-sm text-body">{l.action}</td>
                  <td className="px-4 py-3 text-sm text-muted hidden md:table-cell">{l.entity}</td>
                  <td className="px-4 py-3 hidden lg:table-cell"><StatusBadge status={l.previousStatus} /></td>
                  <td className="px-4 py-3"><StatusBadge status={l.newStatus} /></td>
                  <td className="px-4 py-3 text-sm text-muted max-w-[200px] truncate hidden lg:table-cell">{l.reason}</td>
                  <td className="px-4 py-3 text-sm text-muted whitespace-nowrap">{l.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── 13. Platform Settings ── */

export function AdminSettings({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState('General');
  const sections = ['General', 'Verification Rules', 'Safety Rules', 'Notifications', 'Admin Roles'];
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Platform Settings" subtitle="Configure platform-wide rules and settings.">
        <button onClick={onLogout} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-error-500 px-4 py-2.5 rounded-xl hover:bg-error-600 transition-colors">Logout</button>
      </PageHeader>
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {sections.map((s) => <button key={s} onClick={() => setSection(s)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${section === s ? 'bg-warning-500 text-white' : 'bg-card border border-default text-muted hover:text-body'}`}>{s}</button>)}
      </div>
      <div className="bg-card border border-default rounded-2xl p-6 shadow-soft">
        {section === 'General' && (
          <div className="space-y-4">
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Platform Name</label><input defaultValue="Hack-Meet" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-warning-400" /></div>
            <div><label className="text-xs font-semibold text-muted mb-1.5 block">Support Email</label><input defaultValue="support@hackmeet.io" className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-warning-400" /></div>
            <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">Allow new registrations</div><div className="text-xs text-muted">New users can create accounts</div></div><input type="checkbox" defaultChecked className="rounded border-default text-warning-500 focus:ring-warning-400" /></label>
            <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">Require email verification</div><div className="text-xs text-muted">New users must verify their email</div></div><input type="checkbox" defaultChecked className="rounded border-default text-warning-500 focus:ring-warning-400" /></label>
            <button className="text-sm font-semibold text-white bg-warning-500 rounded-xl px-4 py-2.5 hover:bg-warning-600 transition-colors">Save Changes</button>
          </div>
        )}
        {section === 'Verification Rules' && (
          <div className="space-y-4">
            <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">Require HR verification before talent discovery</div><div className="text-xs text-muted">HR accounts must be verified before contacting candidates</div></div><input type="checkbox" defaultChecked className="rounded border-default text-warning-500 focus:ring-warning-400" /></label>
            <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">Require organization verification for hackathon publishing</div><div className="text-xs text-muted">Organizations must be verified to publish hackathons</div></div><input type="checkbox" defaultChecked className="rounded border-default text-warning-500 focus:ring-warning-400" /></label>
            <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">AI-assisted verification</div><div className="text-xs text-muted">Use AI to flag potential issues in verification submissions</div></div><input type="checkbox" defaultChecked className="rounded border-default text-warning-500 focus:ring-warning-400" /></label>
            <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">Manual review required for all decisions</div><div className="text-xs text-muted">AI cannot auto-approve any verification</div></div><input type="checkbox" defaultChecked className="rounded border-default text-warning-500 focus:ring-warning-400" /></label>
            <button className="text-sm font-semibold text-white bg-warning-500 rounded-xl px-4 py-2.5 hover:bg-warning-600 transition-colors">Save Changes</button>
          </div>
        )}
        {section === 'Safety Rules' && (
          <div className="space-y-4">
            <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">No end-to-end encryption</div><div className="text-xs text-muted">Platform chat is monitored for safety and moderation</div></div><input type="checkbox" defaultChecked className="rounded border-default text-warning-500 focus:ring-warning-400" /></label>
            <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">Hide personal contact info</div><div className="text-xs text-muted">Phone numbers and personal emails are never exposed between users</div></div><input type="checkbox" defaultChecked className="rounded border-default text-warning-500 focus:ring-warning-400" /></label>
            <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">Require report evidence</div><div className="text-xs text-muted">Reports must include supporting evidence</div></div><input type="checkbox" defaultChecked className="rounded border-default text-warning-500 focus:ring-warning-400" /></label>
            <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">No auto-ban from AI detection</div><div className="text-xs text-muted">Do not permanently ban users solely based on AI detection</div></div><input type="checkbox" defaultChecked className="rounded border-default text-warning-500 focus:ring-warning-400" /></label>
            <button className="text-sm font-semibold text-white bg-warning-500 rounded-xl px-4 py-2.5 hover:bg-warning-600 transition-colors">Save Changes</button>
          </div>
        )}
        {section === 'Notifications' && (
          <div className="space-y-4">
            {[['New verification submitted', 'Get notified when a new verification request is submitted'], ['Report filed', 'Alert when a new report is filed'], ['Hackathon submitted', 'Notify when a hackathon is submitted for approval'], ['Payment received', 'Alert when a payment is received']].map(([label, desc]) => (
              <label key={label} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40 cursor-pointer"><div><div className="text-sm font-semibold text-body">{label}</div><div className="text-xs text-muted">{desc}</div></div><input type="checkbox" defaultChecked className="rounded border-default text-warning-500 focus:ring-warning-400" /></label>
            ))}
          </div>
        )}
        {section === 'Admin Roles' && (
          <div className="space-y-4">
            <p className="text-sm text-muted">Manage admin permissions and roles.</p>
            <div className="space-y-2">
              {[
                { name: 'Arjun Nair', role: 'Super Admin', permissions: 'Full access' },
                { name: 'Sneha Iyer', role: 'Moderator', permissions: 'Reports & Safety, Messages' },
                { name: 'Karan Singh', role: 'Verifier', permissions: 'HR Verification, Organization Verification' },
              ].map((a) => (
                <div key={a.name} className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                  <div className="w-8 h-8 rounded-lg bg-warning-100 dark:bg-warning-950/40 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-warning-500" /></div>
                  <div className="flex-1"><div className="text-sm font-semibold text-body">{a.name}</div><div className="text-[10px] text-muted">{a.role} · {a.permissions}</div></div>
                  <button className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Edit</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
