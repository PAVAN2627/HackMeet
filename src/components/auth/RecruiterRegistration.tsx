import { useState } from 'react';
import { CheckCircle2, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { ProgressBar, NavButtons, Field, Input, Select, TextArea, PasswordInput, OtpInput, SectionCard, DocumentUploader } from './FormComponents';
import { recruiterSteps } from './types';

export function RecruiterRegistration({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [docs, setDocs] = useState<{ id: string; name: string; type: string; status: 'Uploaded' | 'Verified' }[]>([]);

  const accent = 'bg-success-500 hover:bg-success-600';
  const next = () => setStep((s) => Math.min(s + 1, recruiterSteps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div>
      <ProgressBar steps={recruiterSteps} current={step} accentColor="bg-success-500" />

      {step === 0 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Create your account</h2>
          <p className="text-xs text-muted mb-5">Verify your work email and mobile number.</p>
          <div className="space-y-4">
            <Field label="Full Name" required><Input placeholder="Priya Deshmukh" /></Field>
            <Field label="Work Email" required><Input type="email" placeholder="priya@microsoft.com" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Password" required><PasswordInput value="" onChange={() => {}} placeholder="Create password" /></Field>
              <Field label="Confirm Password" required><PasswordInput value="" onChange={() => {}} placeholder="Re-enter" /></Field>
            </div>
            <Field label="Mobile Number" required>
              <div className="flex gap-2"><Input value="+91" onChange={() => {}} /><Input placeholder="98765 43210" /></div>
            </Field>
            {!otpSent ? (
              <button onClick={() => setOtpSent(true)} className="w-full text-sm font-semibold text-white bg-success-500 rounded-xl py-2.5 hover:bg-success-600 transition-colors">Send OTP</button>
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
          <h2 className="text-lg font-bold text-body mb-1">Personal information</h2>
          <p className="text-xs text-muted mb-5">Tell us about your role.</p>
          <div className="space-y-4">
            <Field label="Full Name" required><Input placeholder="Priya Deshmukh" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Job Title" required><Input placeholder="Senior Technical Recruiter" /></Field>
              <Field label="Department" required><Input placeholder="Talent Acquisition" /></Field>
            </div>
            <Field label="LinkedIn Profile" required><Input placeholder="linkedin.com/in/priya" /></Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Country" required><Input placeholder="India" /></Field>
              <Field label="State" required><Input placeholder="Karnataka" /></Field>
              <Field label="City" required><Input placeholder="Bangalore" /></Field>
            </div>
          </div>
          <NavButtons onBack={back} onNext={next} accentColor={accent} />
        </SectionCard>
      )}

      {step === 2 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Company information</h2>
          <p className="text-xs text-muted mb-5">Tell us about your organization.</p>
          <div className="space-y-4">
            <Field label="Company Name" required><Input placeholder="Microsoft" /></Field>
            <Field label="Company Website" required><Input placeholder="microsoft.com" /></Field>
            <Field label="Official Company Email" required><Input type="email" placeholder="hr@microsoft.com" /></Field>
            <div className="p-3 rounded-xl bg-success-50 dark:bg-success-950/40 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success-500" />
              <span className="text-xs font-semibold text-success-700 dark:text-success-400">Company domain matches your work email</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Industry" required><Select value="" onChange={() => {}} options={['Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Consulting', 'Other']} placeholder="Select industry" /></Field>
              <Field label="Company Size" required><Select value="" onChange={() => {}} options={['1-10', '11-50', '51-200', '201-1000', '1000+']} placeholder="Select size" /></Field>
            </div>
            <Field label="Company Location" required><Input placeholder="Hyderabad, India" /></Field>
          </div>
          <NavButtons onBack={back} onNext={next} accentColor={accent} />
        </SectionCard>
      )}

      {step === 3 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Employment proof</h2>
          <p className="text-xs text-muted mb-5">Upload at least one valid employment proof for HR verification.</p>
          <div className="space-y-4">
            <DocumentUploader label="Employee ID" required documents={docs} onAdd={(d) => setDocs([...docs, { ...d, status: 'Uploaded' }])} onRemove={(id) => setDocs(docs.filter((d) => d.id !== id))} />
            <DocumentUploader label="Company Authorization Letter" documents={docs} onAdd={(d) => setDocs([...docs, { ...d, status: 'Uploaded' }])} onRemove={(id) => setDocs(docs.filter((d) => d.id !== id))} />
            <DocumentUploader label="Official Employment Document" documents={docs} onAdd={(d) => setDocs([...docs, { ...d, status: 'Uploaded' }])} onRemove={(id) => setDocs(docs.filter((d) => d.id !== id))} />
            <DocumentUploader label="Other Accepted Company Proof" documents={docs} onAdd={(d) => setDocs([...docs, { ...d, status: 'Uploaded' }])} onRemove={(id) => setDocs(docs.filter((d) => d.id !== id))} />
            {docs.length === 0 && <div className="flex items-center gap-2 text-[10px] text-error-500"><AlertCircle className="w-3 h-3" /> Please upload at least one employment proof to continue.</div>}
          </div>
          <NavButtons onBack={back} onNext={next} nextDisabled={docs.length === 0} accentColor={accent} />
        </SectionCard>
      )}

      {step === 4 && (
        <SectionCard>
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-warning-50 dark:bg-warning-950/40 flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-warning-500" /></div>
            <h2 className="text-lg font-bold text-body">Your recruiter account is pending verification</h2>
            <p className="text-sm text-muted mt-3 max-w-md mx-auto">Hack-Meet verifies recruiter accounts to protect candidates from fake recruiters and fraudulent opportunities.</p>
            <div className="mt-6 p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40 text-left">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-body">Verification Status</span>
                <span className="text-xs font-bold text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-950/40 px-3 py-1 rounded-full">Pending Admin Review</span>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-success-50 dark:bg-success-950/40 opacity-60">
              <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-success-500" /><span className="text-sm font-semibold text-success-700 dark:text-success-400">After approval: Verified Recruiter</span></div>
              <p className="text-xs text-muted mt-1">Only verified recruiters can access advanced talent discovery and invitation features.</p>
            </div>
          </div>
          <NavButtons onBack={back} onNext={next} nextLabel="Continue to Review" accentColor={accent} />
        </SectionCard>
      )}

      {step === 5 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Review your application</h2>
          <div className="space-y-3 mb-5">
            {[['Personal', 'Priya Deshmukh · Senior Technical Recruiter'], ['Company', 'Microsoft · Technology · 1000+'], ['Employment Proof', `${docs.length} document${docs.length !== 1 ? 's' : ''} uploaded`], ['Professional Profile', 'LinkedIn connected']].map(([section, info]) => (
              <div key={section} className="flex items-center justify-between p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                <div><div className="text-sm font-semibold text-body">{section}</div><div className="text-xs text-muted">{info}</div></div>
                <button className="text-xs font-semibold text-success-600 dark:text-success-400 hover:underline">Edit</button>
              </div>
            ))}
          </div>
          <label className="flex items-start gap-2.5 cursor-pointer mb-4">
            <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-0.5 rounded border-default text-success-500 focus:ring-success-400" />
            <span className="text-xs text-muted">I confirm that I am authorized to represent this organization for recruitment purposes.</span>
          </label>
          <NavButtons onBack={back} onNext={onComplete} nextLabel="Submit for Verification" nextDisabled={!confirmed} accentColor="bg-success-500 hover:bg-success-600" />
        </SectionCard>
      )}
    </div>
  );
}
