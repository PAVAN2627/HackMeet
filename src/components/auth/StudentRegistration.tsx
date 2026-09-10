import { useState } from 'react';
import { CheckCircle2, AlertCircle, Upload, Sparkles, ShieldCheck, Trophy, Star, X, Eye, FileText } from 'lucide-react';
import { ProgressBar, NavButtons, Field, Input, Select, TextArea, PasswordInput, OtpInput, SectionCard, AddButton, RemoveButton, SkillSelector } from './FormComponents';
import { studentSteps } from './types';

const allSkills = ['React', 'Next.js', 'Node.js', 'Python', 'Java', 'C++', 'MongoDB', 'PostgreSQL', 'AWS', 'AI/ML', 'Cybersecurity', 'Docker', 'Kubernetes', 'TypeScript', 'Go', 'Rust', 'GraphQL', 'Redis', 'TensorFlow', 'PyTorch'];

interface EducationEntry { id: string; institution: string; degree: string; field: string; startYear: string; endYear: string; current: boolean; cgpa: string; achievements: string; }
interface ExperienceEntry { id: string; company: string; title: string; type: string; startDate: string; endDate: string; current: boolean; description: string; tech: string; }
interface ProjectEntry { id: string; name: string; description: string; role: string; tech: string; url: string; demo: string; }
interface HackathonEntry { id: string; name: string; organizer: string; date: string; role: string; result: string; level: string; proof: string; }

export function StudentRegistration({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeAnalyzing, setResumeAnalyzing] = useState(false);
  const [resumeAnalyzed, setResumeAnalyzed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const [education, setEducation] = useState<EducationEntry[]>([{ id: 'e1', institution: '', degree: '', field: '', startYear: '', endYear: '', current: false, cgpa: '', achievements: '' }]);
  const [experience, setExperience] = useState<ExperienceEntry[]>([]);
  const [skills, setSkills] = useState<{ name: string; level: string }[]>([]);
  const [projects, setProjects] = useState<ProjectEntry[]>([{ id: 'p1', name: '', description: '', role: '', tech: '', url: '', demo: '' }]);
  const [hackathons, setHackathons] = useState<HackathonEntry[]>([]);

  const accent = 'bg-brand-500 hover:bg-brand-600';

  const next = () => setStep((s) => Math.min(s + 1, studentSteps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const completion = [
    { label: 'Account', done: true },
    { label: 'Education', done: education[0].institution !== '' },
    { label: 'Skills', done: skills.length > 0 },
    { label: 'Projects', done: projects[0].name !== '' },
    { label: 'Resume', done: resumeUploaded },
    { label: 'GitHub', done: false },
    { label: 'Experience', done: experience.length > 0, optional: true },
    { label: 'Hackathon History', done: hackathons.length > 0, optional: true },
  ];
  const completionPct = Math.round((completion.filter((c) => c.done).length / completion.length) * 100);

  return (
    <div>
      <ProgressBar steps={studentSteps} current={step} accentColor="bg-brand-500" />

      {step === 0 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Create your account</h2>
          <p className="text-xs text-muted mb-5">Verify your email and mobile to get started.</p>
          <div className="space-y-4">
            <Field label="Full Name" required><Input placeholder="Pavan Mali" /></Field>
            <Field label="Email" required><Input type="email" placeholder="pavan@example.com" /></Field>
            <Field label="Password" required><PasswordInput value="" onChange={() => {}} placeholder="Create a strong password" /></Field>
            <Field label="Confirm Password" required><PasswordInput value="" onChange={() => {}} placeholder="Re-enter password" /></Field>
            <Field label="Mobile Number" required>
              <div className="flex gap-2">
                <Input value="+91" onChange={() => {}} />
                <Input placeholder="98765 43210" />
              </div>
            </Field>
            {!otpSent ? (
              <button onClick={() => setOtpSent(true)} className="w-full text-sm font-semibold text-white bg-brand-500 rounded-xl py-2.5 hover:bg-brand-600 transition-colors">Send OTP</button>
            ) : !otpVerified ? (
              <Field label="Enter OTP sent to your mobile" required>
                <OtpInput onComplete={() => setOtpVerified(true)} />
                <button className="text-[10px] text-brand-600 dark:text-brand-400 mt-2">Resend OTP</button>
              </Field>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-950/40 px-3 py-2 rounded-xl"><CheckCircle2 className="w-4 h-4" /> Mobile verified successfully</div>
            )}
          </div>
          <NavButtons onBack={back} onNext={next} nextDisabled={!otpVerified} accentColor={accent} />
        </SectionCard>
      )}

      {step === 1 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Personal profile</h2>
          <p className="text-xs text-muted mb-5">Tell us about yourself.</p>
          <div className="space-y-4">
            <Field label="Full Name" required><Input placeholder="Pavan Mali" /></Field>
            <Field label="Profile Photo" required>
              <div className="border-2 border-dashed border-default rounded-xl p-5 text-center cursor-pointer hover:border-brand-400 transition-colors">
                <Upload className="w-6 h-6 text-muted mx-auto mb-2" />
                <p className="text-xs text-muted">Upload a profile photo</p>
              </div>
            </Field>
            <Field label="Headline" required><Input placeholder="Full Stack Developer & Hackathon Winner" /></Field>
            <Field label="Current Status" required><Select value="" onChange={() => {}} options={['Student', 'Working Professional', 'Freelancer', 'Job Seeker']} placeholder="Select status" /></Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Country" required><Input placeholder="India" /></Field>
              <Field label="State" required><Input placeholder="Maharashtra" /></Field>
              <Field label="City" required><Input placeholder="Pune" /></Field>
            </div>
            <Field label="Short Bio" optional><TextArea placeholder="Tell us about yourself..." /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Portfolio URL" optional><Input placeholder="pavan.dev" /></Field>
              <Field label="LinkedIn URL" optional><Input placeholder="linkedin.com/in/pavan" /></Field>
            </div>
          </div>
          <NavButtons onBack={back} onNext={next} accentColor={accent} />
        </SectionCard>
      )}

      {step === 2 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Education</h2>
          <p className="text-xs text-muted mb-5">Add your educational background.</p>
          <div className="space-y-4">
            {education.map((e, i) => (
              <div key={e.id} className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40 space-y-3">
                {i > 0 && <div className="flex justify-end"><RemoveButton onClick={() => setEducation(education.filter((x) => x.id !== e.id))} /></div>}
                <Field label="Institution Name" required><Input placeholder="VIT University, Pune" /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Degree" required><Input placeholder="B.Tech" /></Field>
                  <Field label="Field of Study" required><Input placeholder="Computer Science" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start Year" required><Input placeholder="2023" /></Field>
                  <Field label="Graduation Year" required>
                    <Input placeholder="2027" />
                  </Field>
                </div>
                <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
                  <input type="checkbox" className="rounded border-default text-brand-500 focus:ring-brand-400" />
                  Currently studying here
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="CGPA / Percentage" optional><Input placeholder="8.5 CGPA" /></Field>
                  <Field label="Achievements" optional><Input placeholder="Class representative" /></Field>
                </div>
              </div>
            ))}
            <AddButton label="Add Education" onClick={() => setEducation([...education, { id: `e${Date.now()}`, institution: '', degree: '', field: '', startYear: '', endYear: '', current: false, cgpa: '', achievements: '' }])} />
          </div>
          <NavButtons onBack={back} onNext={next} accentColor={accent} />
        </SectionCard>
      )}

      {step === 3 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Experience</h2>
          <p className="text-xs text-muted mb-5">Add your professional experience. You can skip this if you're a student.</p>
          {experience.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted mb-4">No experience added yet.</p>
              <AddButton label="Add Experience" onClick={() => setExperience([{ id: 'x1', company: '', title: '', type: 'Full-time', startDate: '', endDate: '', current: false, description: '', tech: '' }])} />
            </div>
          ) : (
            <div className="space-y-4">
              {experience.map((e, i) => (
                <div key={e.id} className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40 space-y-3">
                  {i > 0 && <div className="flex justify-end"><RemoveButton onClick={() => setExperience(experience.filter((x) => x.id !== e.id))} /></div>}
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Company" required><Input placeholder="Google" /></Field>
                    <Field label="Job Title" required><Input placeholder="Software Engineer Intern" /></Field>
                  </div>
                  <Field label="Employment Type" required><Select value="" onChange={() => {}} options={['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance']} placeholder="Select type" /></Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Start Date" required><Input type="month" placeholder="" /></Field>
                    <Field label="End Date" required><Input type="month" placeholder="" /></Field>
                  </div>
                  <Field label="Description" optional><TextArea rows={3} placeholder="What did you work on?" /></Field>
                  <Field label="Technologies Used" optional><Input placeholder="React, Node.js, MongoDB" /></Field>
                </div>
              ))}
              <AddButton label="Add Experience" onClick={() => setExperience([...experience, { id: `x${Date.now()}`, company: '', title: '', type: 'Full-time', startDate: '', endDate: '', current: false, description: '', tech: '' }])} />
            </div>
          )}
          <NavButtons onBack={back} onNext={next} onSkip={next} showSkip accentColor={accent} />
        </SectionCard>
      )}

      {step === 4 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Skills</h2>
          <p className="text-xs text-muted mb-5">Add your technical skills and domains.</p>
          <div className="space-y-4">
            <Field label="Primary Skills" required>
              <SkillSelector skills={skills} onAdd={(s) => setSkills([...skills, { name: s, level: '' }])} onRemove={(s) => setSkills(skills.filter((sk) => sk.name !== s))} suggestions={allSkills} />
            </Field>
            <Field label="Preferred Domains" optional>
              <SkillSelector skills={[]} onAdd={() => {}} onRemove={() => {}} suggestions={['Web Development', 'Mobile Development', 'AI/ML', 'Cloud Computing', 'Cybersecurity', 'Data Science', 'DevOps', 'Blockchain']} />
            </Field>
            <Field label="Preferred Hackathon Categories" optional>
              <SkillSelector skills={[]} onAdd={() => {}} onRemove={() => {}} suggestions={['AI/ML', 'Web3', 'IoT', 'FinTech', 'HealthTech', 'EdTech', 'Climate Tech', 'Gaming']} />
            </Field>
            <button className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl py-2.5 hover:shadow-soft transition-all">
              <Sparkles className="w-4 h-4" /> Analyze My Skills
            </button>
          </div>
          <NavButtons onBack={back} onNext={next} accentColor={accent} />
        </SectionCard>
      )}

      {step === 5 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Projects</h2>
          <p className="text-xs text-muted mb-5">Showcase what you've built. Add at least one project.</p>
          <div className="space-y-4">
            {projects.map((p, i) => (
              <div key={p.id} className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40 space-y-3">
                {i > 0 && <div className="flex justify-end"><RemoveButton onClick={() => setProjects(projects.filter((x) => x.id !== p.id))} /></div>}
                <Field label="Project Name" required><Input placeholder="AI-Powered Resume Analyzer" /></Field>
                <Field label="Description" required><TextArea rows={3} placeholder="What does it do?" /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Your Role" required><Input placeholder="Full Stack Developer" /></Field>
                  <Field label="Technologies" required><Input placeholder="React, Node.js, OpenAI" /></Field>
                </div>
                <Field label="Project URL or GitHub URL" required><Input placeholder="github.com/pavan/resume-analyzer" /></Field>
                <Field label="Demo URL" optional><Input placeholder="resume-analyzer.vercel.app" /></Field>
              </div>
            ))}
            <AddButton label="Add Project" onClick={() => setProjects([...projects, { id: `p${Date.now()}`, name: '', description: '', role: '', tech: '', url: '', demo: '' }])} />
          </div>
          <NavButtons onBack={back} onNext={next} accentColor={accent} />
        </SectionCard>
      )}

      {step === 6 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Professional Profiles</h2>
          <p className="text-xs text-muted mb-5">Connect your coding profiles. Strongly recommended.</p>
          <div className="space-y-3">
            {['GitHub', 'LinkedIn', 'LeetCode', 'CodeChef', 'Portfolio', 'Kaggle'].map((platform) => (
              <div key={platform} className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center flex-shrink-0"><FileText className="w-4 h-4 text-brand-500" /></div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-body">{platform}</div>
                  <input placeholder={`your ${platform.toLowerCase()} handle or URL`} className="w-full bg-transparent text-xs text-muted outline-none mt-0.5" />
                </div>
                {platform === 'GitHub' && <button className="text-xs font-semibold text-white bg-brand-500 rounded-lg px-3 py-1.5 hover:bg-brand-600 transition-colors">Connect</button>}
              </div>
            ))}
          </div>
          <NavButtons onBack={back} onNext={next} accentColor={accent} />
        </SectionCard>
      )}

      {step === 7 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Resume</h2>
          <p className="text-xs text-muted mb-5">Upload your resume for AI-powered ATS analysis.</p>
          {!resumeUploaded ? (
            <div onClick={() => { setResumeUploaded(true); setResumeAnalyzing(true); setTimeout(() => setResumeAnalyzing(false), 2000); }} className="border-2 border-dashed border-default rounded-xl p-8 text-center cursor-pointer hover:border-brand-400 transition-colors">
              <Upload className="w-10 h-10 text-muted mx-auto mb-3" />
              <p className="text-sm font-semibold text-body">Upload Resume</p>
              <p className="text-xs text-muted mt-1">PDF, DOC, or DOCX</p>
            </div>
          ) : resumeAnalyzing ? (
            <div className="text-center py-8">
              <div className="w-10 h-10 rounded-full border-2 border-brand-500 border-t-transparent animate-spin mx-auto mb-3" />
              <p className="text-sm font-semibold text-body">Analyzing your resume...</p>
              <p className="text-xs text-muted mt-1">Extracting skills, experience, and education</p>
            </div>
          ) : (
            <div className="animate-scale-in">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-success-50 dark:bg-success-950/40 mb-4">
                <CheckCircle2 className="w-5 h-5 text-success-500" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-body">resume_pavan.pdf</div>
                  <div className="text-[10px] text-muted">Uploaded successfully</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-body">ATS Resume Score</span>
                  <span className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">86<span className="text-sm text-muted">/100</span></span>
                </div>
                <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: '86%' }} /></div>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-body mb-2">Detected Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript', 'Docker'].map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-success-50 dark:bg-success-950/40 text-success-700 dark:text-success-300"><CheckCircle2 className="w-3 h-3" /> {s}</span>
                  ))}
                </div>
              </div>
              <button className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Review &amp; Edit Extracted Information</button>
            </div>
          )}
          <NavButtons onBack={back} onNext={next} accentColor={accent} />
        </SectionCard>
      )}

      {step === 8 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Hackathon History</h2>
          <p className="text-xs text-muted mb-5">Add hackathons you've participated in. Manually entered wins are not automatically verified.</p>
          <div className="space-y-4">
            {hackathons.map((h, i) => (
              <div key={h.id} className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/40 space-y-3">
                <div className="flex justify-end"><RemoveButton onClick={() => setHackathons(hackathons.filter((x) => x.id !== h.id))} /></div>
                <Field label="Hackathon Name" required><Input placeholder="Smart India Hackathon 2025" /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Organizer" required><Input placeholder="Government of India" /></Field>
                  <Field label="Date" required><Input type="date" placeholder="" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Your Role" required><Input placeholder="Team Lead" /></Field>
                  <Field label="Result" required><Select value="" onChange={() => {}} options={['Participant', 'Finalist', 'Winner']} placeholder="Select result" /></Field>
                </div>
                <Field label="Level" required><Select value="" onChange={() => {}} options={['College', 'Inter-College', 'State', 'National', 'International']} placeholder="Select level" /></Field>
                <Field label="Supporting Proof (Certificate / Result Link)" optional><Input placeholder="Link to certificate or results page" /></Field>
                <div className="flex items-center gap-2 text-[10px] text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-950/40 px-3 py-2 rounded-lg">
                  <AlertCircle className="w-3 h-3" /> Verification pending — manually entered wins require proof.
                </div>
              </div>
            ))}
            <AddButton label="Add Hackathon" onClick={() => setHackathons([...hackathons, { id: `h${Date.now()}`, name: '', organizer: '', date: '', role: '', result: '', level: '', proof: '' }])} />
          </div>
          <NavButtons onBack={back} onNext={next} onSkip={next} showSkip accentColor={accent} />
        </SectionCard>
      )}

      {step === 9 && (
        <SectionCard>
          <h2 className="text-lg font-bold text-body mb-1">Review your profile</h2>
          <div className="p-4 rounded-xl bg-gradient-to-r from-brand-50 to-cyan-50 dark:from-brand-950/30 dark:to-cyan-950/20 mb-5">
            <div className="text-sm font-bold text-body mb-1">Your Hack-Meet Profile is {completionPct}% complete.</div>
            <div className="h-2 rounded-full bg-white/50 dark:bg-ink-800/40 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: `${completionPct}%` }} /></div>
          </div>
          <div className="space-y-2 mb-5">
            {completion.map((c) => (
              <div key={c.label} className="flex items-center justify-between p-2.5 rounded-xl bg-ink-50 dark:bg-ink-800/40">
                <div className="flex items-center gap-2">
                  {c.done ? <CheckCircle2 className="w-4 h-4 text-success-500" /> : <AlertCircle className="w-4 h-4 text-warning-500" />}
                  <span className="text-sm text-body">{c.label}</span>
                  {c.optional && <span className="text-[10px] text-muted">Optional</span>}
                </div>
                <button className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Edit</button>
              </div>
            ))}
          </div>
          <label className="flex items-start gap-2.5 cursor-pointer mb-4">
            <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-0.5 rounded border-default text-brand-500 focus:ring-brand-400" />
            <span className="text-xs text-muted">I confirm that the information provided is accurate.</span>
          </label>
          <NavButtons onBack={back} onNext={onComplete} nextLabel="Create My Profile" nextDisabled={!confirmed} accentColor="bg-success-500 hover:bg-success-600" />
        </SectionCard>
      )}
    </div>
  );
}
