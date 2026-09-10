import { useState } from 'react';
import { CheckCircle2, Clock, ShieldCheck, AlertCircle, Building2, GraduationCap, Users, HeartHandshake, Code2, Landmark, Building } from 'lucide-react';
import { ProgressBar, NavButtons, Field, Input, Select, TextArea, PasswordInput, OtpInput, SectionCard, DocumentUploader } from './FormComponents';
import { organizerSteps } from './types';

const orgTypes = [
  { value: 'Company', icon: Building2, desc: 'Tech company or corporation' },
  { value: 'College', icon: GraduationCap, desc: 'Educational institution' },
  { value: 'College Club', icon: Users, desc: 'Student-run tech club' },
  { value: 'Developer Community', icon: Code2, desc: 'Online or offline dev community' },
  { value: 'NGO', icon: HeartHandshake, desc: 'Non-profit organization' },
  { value: 'Student Organization', icon: Landmark, desc: 'Campus student body' },
];

export function OrganizerRegistration({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [docs, setDocs] = useState<{ id: string; name: string; type: string; status: 'Uploaded' | 'Verified' }[]>([]);
  const [orgType, setOrgType] = useState('');

  const accent = 'bg-cyan-500 hover:bg-cyan-600';
  const next = () => setStep((s) => Math.min(s + 1, organizerSteps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div>
      <ProgressBar steps={organizerSteps} current={step} accentColor="bg-cyan-500" />

      {step === 0 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Create your account</h2>
          <p className="text-xs text-muted mb-5">Verify your email and mobile number.</p>
          <div className="space-y-4">
            <Field label="Full Name" required><Input placeholder="Ananya Iyer" /></Field>
            <Field label="Email" required><Input type="email" placeholder="ananya@vit.ac.in" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Password" required><PasswordInput value="" onChange={() => {}} placeholder="Create password" /></Field>
              <Field label="Confirm Password" required><PasswordInput value="" onChange={() => {}} placeholder="Re-enter" /></Field>
            </div>
            <Field label="Mobile Number" required><div className="flex gap-2"><Input value="+91" onChange={() => {}} /><Input placeholder="98765 43210" /></div></Field>
            {!otpSent ? (
              <button onClick={() => setOtpSent(true)} className="w-full text-sm font-semibold text-white bg-cyan-500 rounded-xl py-2.5 hover:bg-cyan-600 transition-colors">Send OTP</button>
            ) : !otpVerified ? (
              <Field label="Enter OTP" required><OtpInput onComplete={() => setOtpVerified(true)} /></Field>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-950/40 px-3 py-2 rounded-xl"><CheckCircle2 className="w-4 h-4" /> Verified</div>
            )}
          </div>
          <NavButtons onBack={back} onNext={next} nextDisabled={!otpVerified} accentColor={accent} />
        </SectionCard>
      )}

      {step === 1 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Organization details</h2>
          <p className="text-xs text-muted mb-5">Tell us about your organization — company, college, club, or community.</p>
          <div className="space-y-4">
            <Field label="Organization Name" required><Input placeholder="VIT Tech Club" /></Field>
            <div>
              <label className="text-xs font-semibold text-body mb-2 block">Organization Type <span className="text-error-500">*</span></label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {orgTypes.map((t) => {
                  const Icon = t.icon;
                  const selected = orgType === t.value;
                  return (
                    <button
                      key={t.value}
                      onClick={() => setOrgType(t.value)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${selected ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/30' : 'border-default hover:border-strong'}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${selected ? 'bg-cyan-500' : 'bg-ink-100 dark:bg-ink-800'}`}>
                        <Icon className={`w-4 h-4 ${selected ? 'text-white' : 'text-muted'}`} />
                      </div>
                      <div className="text-xs font-bold text-body">{t.value}</div>
                      <div className="text-[10px] text-muted mt-0.5">{t.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            <Field label="Official Website" required><Input placeholder="vit.ac.in/techclub" /></Field>
            <Field label="Official Email" required><Input type="email" placeholder="techclub@vit.ac.in" /></Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Country" required><Input placeholder="India" /></Field>
              <Field label="State" required><Input placeholder="Tamil Nadu" /></Field>
              <Field label="City" required><Input placeholder="Vellore" /></Field>
            </div>
            <Field label="Organization Description" optional><TextArea rows={3} placeholder="Tell us about your organization..." /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Industry / Sector" optional><Input placeholder="Education" /></Field>
              <Field label="Organization Size" optional><Input placeholder="50+ members" /></Field>
            </div>
            <Field label="Social Links" optional>
              <div className="space-y-2">
                <Input placeholder="linkedin.com/company/vit-techclub" />
                <Input placeholder="twitter.com/vit_techclub" />
              </div>
            </Field>
          </div>
          <NavButtons onBack={back} onNext={next} nextDisabled={!orgType} accentColor={accent} />
        </SectionCard>
      )}

      {step === 2 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Authorized representative</h2>
          <p className="text-xs text-muted mb-5">Confirm you are authorized to represent this organization.</p>
          <div className="space-y-4">
            <Field label="Representative Name" required><Input placeholder="Ananya Iyer" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Designation" required><Input placeholder="Club Secretary" /></Field>
              <Field label="LinkedIn" required><Input placeholder="linkedin.com/in/ananya" /></Field>
            </div>
            <Field label="Official Organization Email" required><Input type="email" placeholder="ananya@vit.ac.in" /></Field>
            <Field label="Are you authorized to create events on behalf of this organization?" required>
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl border-2 border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-sm font-semibold text-cyan-700 dark:text-cyan-300">Yes</button>
                <button className="flex-1 py-3 rounded-xl border-2 border-default text-sm font-semibold text-muted hover:border-strong transition-colors">No</button>
              </div>
            </Field>
          </div>
          <NavButtons onBack={back} onNext={next} accentColor={accent} />
        </SectionCard>
      )}

      {step === 3 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Organization proof</h2>
          <p className="text-xs text-muted mb-5">Upload verification documents based on your organization type.</p>
          <div className="space-y-4">
            <DocumentUploader label="Organization Registration / Business Proof" required documents={docs} onAdd={(d) => setDocs([...docs, { ...d, status: 'Uploaded' }])} onRemove={(id) => setDocs(docs.filter((d) => d.id !== id))} />
            <DocumentUploader label="Authorized Representative Proof" documents={docs} onAdd={(d) => setDocs([...docs, { ...d, status: 'Uploaded' }])} onRemove={(id) => setDocs(docs.filter((d) => d.id !== id))} />
            <DocumentUploader label="Official Email Verification" documents={docs} onAdd={(d) => setDocs([...docs, { ...d, status: 'Uploaded' }])} onRemove={(id) => setDocs(docs.filter((d) => d.id !== id))} />
            <DocumentUploader label="Additional Supporting Documents" documents={docs} onAdd={(d) => setDocs([...docs, { ...d, status: 'Uploaded' }])} onRemove={(id) => setDocs(docs.filter((d) => d.id !== id))} />
            {docs.length === 0 && <div className="flex items-center gap-2 text-[10px] text-error-500"><AlertCircle className="w-3 h-3" /> Please upload at least one proof document.</div>}
          </div>
          <NavButtons onBack={back} onNext={next} nextDisabled={docs.length === 0} accentColor={accent} />
        </SectionCard>
      )}

      {step === 4 && (
        <SectionCard>
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-warning-50 dark:bg-warning-950/40 flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-warning-500" /></div>
            <h2 className="text-lg font-bold text-body">Organization verification required</h2>
            <p className="text-sm text-muted mt-3 max-w-md mx-auto">To keep Hack-Meet free from fake hackathons, fraudulent organizations and misleading opportunities.</p>
            <div className="mt-6 p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40 text-left">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-body">Verification Status</span>
                <span className="text-xs font-bold text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-950/40 px-3 py-1 rounded-full">Pending Admin Review</span>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-success-50 dark:bg-success-950/40 opacity-60">
              <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-success-500" /><span className="text-sm font-semibold text-success-700 dark:text-success-400">After approval: Verified Organization</span></div>
              <p className="text-xs text-muted mt-1">You can start preparing your hackathon while verification is pending.</p>
            </div>
          </div>
          <NavButtons onBack={back} onNext={next} nextLabel="Continue to Review" accentColor={accent} />
        </SectionCard>
      )}

      {step === 5 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Review your application</h2>
          <div className="space-y-3 mb-5">
            {[['Organization', `VIT Tech Club · ${orgType || 'Organization'}`], ['Representative', 'Ananya Iyer · Club Secretary'], ['Proof Documents', `${docs.length} document${docs.length !== 1 ? 's' : ''} uploaded`], ['Contact', 'techclub@vit.ac.in · Vellore']].map(([section, info]) => (
              <div key={section} className="flex items-center justify-between p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                <div><div className="text-sm font-semibold text-body">{section}</div><div className="text-xs text-muted">{info}</div></div>
                <button className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">Edit</button>
              </div>
            ))}
          </div>
          <label className="flex items-start gap-2.5 cursor-pointer mb-4">
            <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-0.5 rounded border-default text-cyan-500 focus:ring-cyan-400" />
            <span className="text-xs text-muted">I confirm that the information is accurate and that I am authorized to represent this organization.</span>
          </label>
          <NavButtons onBack={back} onNext={onComplete} nextLabel="Submit for Verification" nextDisabled={!confirmed} accentColor="bg-cyan-500 hover:bg-cyan-600" />
        </SectionCard>
      )}
    </div>
  );
}
