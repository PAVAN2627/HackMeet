import { useState, useRef, type ReactNode } from 'react';
import {
  Upload, FileText, X, CheckCircle2, AlertCircle, Eye,
  ChevronLeft, ChevronRight, Check, Lock,
} from 'lucide-react';

export function ProgressBar({ steps, current, accentColor = 'bg-brand-500' }: { steps: string[]; current: number; accentColor?: string }) {
  const pct = Math.round(((current + 1) / steps.length) * 100);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-muted">Step {current + 1} of {steps.length}</span>
        <span className="text-xs font-semibold text-body">{pct}% complete</span>
      </div>
      <div className="h-1.5 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden mb-3">
        <div className={`h-full rounded-full ${accentColor} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-shrink-0">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${i === current ? 'text-white ' + accentColor : i < current ? 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-950/40' : 'text-muted bg-ink-50 dark:bg-ink-800/40'}`}>
              {i < current ? <Check className="w-3 h-3" /> : <span className="w-3 h-3 flex items-center justify-center text-[8px]">{i + 1}</span>}
              <span className="whitespace-nowrap hidden sm:inline">{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`w-3 h-px ${i < current ? 'bg-success-400' : 'bg-ink-200 dark:bg-ink-700'}`} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function NavButtons({
  onBack, onNext, onSkip, nextLabel = 'Next', showSkip = false, nextDisabled = false, accentColor = 'bg-brand-500 hover:bg-brand-600',
}: {
  onBack: () => void; onNext: () => void; onSkip?: () => void; nextLabel?: string; showSkip?: boolean; nextDisabled?: boolean; accentColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 mt-6">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-body px-4 py-2.5 rounded-xl transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex-1" />
      {showSkip && <button onClick={onSkip} className="text-sm font-semibold text-muted hover:text-body px-4 py-2.5 rounded-xl transition-colors">Skip for now</button>}
      <button onClick={onNext} disabled={nextDisabled} className={`inline-flex items-center gap-1.5 text-sm font-semibold text-white ${accentColor} px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed`}>
        {nextLabel} <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export function Field({ label, required, optional, error, children }: { label: string; required?: boolean; optional?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-body mb-1.5 block flex items-center gap-1.5">
        {label}
        {required && <span className="text-error-500">*</span>}
        {optional && <span className="text-[10px] font-normal text-muted">(Optional)</span>}
      </label>
      {children}
      {error && <p className="text-[10px] text-error-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
    </div>
  );
}

export function Input({ value, onChange, placeholder, type = 'text', defaultValue }: { value?: string; onChange?: (v: string) => void; placeholder?: string; type?: string; defaultValue?: string }) {
  return (
    <input
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      placeholder={placeholder}
      className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-brand-400 transition-colors"
    />
  );
}

export function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body outline-none focus:border-brand-400 transition-colors cursor-pointer"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export function TextArea({ value, onChange, placeholder, rows = 4 }: { value?: string; onChange?: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 text-sm text-body placeholder:text-muted outline-none focus:border-brand-400 transition-colors resize-none"
    />
  );
}

export function PasswordInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-3 pr-11 text-sm text-body placeholder:text-muted outline-none focus:border-brand-400 transition-colors"
      />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-body transition-colors">
        {show ? <Lock className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

export function OtpInput({ length = 6, onComplete }: { length?: number; onComplete?: (code: string) => void }) {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, val: string) => {
    if (val.length > 1) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < length - 1) refs.current[i + 1]?.focus();
    if (next.every((d) => d) && onComplete) onComplete(next.join(''));
  };

  return (
    <div className="flex items-center gap-2">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          value={d}
          onChange={(e) => handleChange(i, e.target.value.replace(/\D/g, ''))}
          maxLength={1}
          inputMode="numeric"
          className="w-11 h-12 text-center text-lg font-bold bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl text-body outline-none focus:border-brand-400 transition-colors"
        />
      ))}
    </div>
  );
}

export function DocumentUploader({
  label, required, documents, onAdd, onRemove,
}: {
  label: string; required?: boolean;
  documents: { id: string; name: string; type: string; status: 'Uploaded' | 'Verified' }[];
  onAdd: (doc: { id: string; name: string; type: string }) => void;
  onRemove: (id: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = (file: File) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      onAdd({ id: `doc-${Date.now()}`, name: file.name, type: label });
    }, 1200);
  };

  return (
    <div>
      <label className="text-xs font-semibold text-body mb-1.5 block flex items-center gap-1.5">
        {label} {required && <span className="text-error-500">*</span>}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        className="border-2 border-dashed border-default rounded-xl p-5 text-center cursor-pointer hover:border-brand-400 transition-colors"
      >
        <input ref={inputRef} type="file" accept=".pdf,.jpg,.png,.doc,.docx" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
            <p className="text-xs text-muted">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center"><Upload className="w-5 h-5 text-brand-500" /></div>
            <p className="text-xs text-muted">Drag &amp; drop or <span className="text-brand-600 dark:text-brand-400 font-semibold">browse files</span></p>
            <p className="text-[10px] text-muted">PDF, JPG, PNG, DOC, DOCX</p>
          </div>
        )}
      </div>

      {documents.length > 0 && (
        <div className="space-y-2 mt-3">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-ink-50 dark:bg-ink-800/40">
              <div className="w-8 h-8 rounded-lg bg-success-50 dark:bg-success-950/40 flex items-center justify-center flex-shrink-0"><FileText className="w-4 h-4 text-success-500" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-body truncate">{doc.name}</div>
                <div className="text-[10px] text-success-600 dark:text-success-400 flex items-center gap-1"><CheckCircle2 className="w-2.5 h-2.5" /> {doc.status}</div>
              </div>
              <button onClick={() => onRemove(doc.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-950/30 transition-colors flex-shrink-0"><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-muted mt-2 flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> Your verification documents are private and only accessible to authorized administrators.</p>
    </div>
  );
}

export function SectionCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-card border border-default rounded-2xl p-6 shadow-soft ${className}`}>{children}</div>;
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full border-2 border-dashed border-default rounded-xl py-3 text-xs font-semibold text-muted hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
      + {label}
    </button>
  );
}

export function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-xs font-semibold text-error-500 hover:text-error-600 transition-colors">Remove</button>
  );
}

export function SkillSelector({ skills, onAdd, onRemove, suggestions }: { skills: { name: string; level: string }[]; onAdd: (skill: string) => void; onRemove: (skill: string) => void; suggestions: string[] }) {
  const [search, setSearch] = useState('');
  const filtered = suggestions.filter((s) => s.toLowerCase().includes(search.toLowerCase()) && !skills.find((sk) => sk.name === s));
  return (
    <div>
      <div className="relative mb-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills..."
          className="w-full bg-ink-50 dark:bg-ink-800/40 border border-default rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-muted outline-none focus:border-brand-400"
        />
      </div>
      {filtered.length > 0 && search && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {filtered.slice(0, 8).map((s) => (
            <button key={s} onClick={() => { onAdd(s); setSearch(''); }} className="text-xs font-medium px-3 py-1.5 rounded-lg border border-default text-muted hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">+ {s}</button>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s.name} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300">
              {s.name}
              {s.level && <span className="text-[9px] text-muted">· {s.level}</span>}
              <button onClick={() => onRemove(s.name)} className="hover:text-error-500"><X className="w-3 h-3" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
