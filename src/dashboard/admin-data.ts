export type AdminPageId =
  | 'admin-home' | 'admin-users' | 'admin-organizations' | 'admin-recruiters'
  | 'admin-hackathons' | 'admin-verification' | 'admin-reports' | 'admin-suspended'
  | 'admin-messages' | 'admin-payments' | 'admin-analytics' | 'admin-audit'
  | 'admin-settings';

export type VerificationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Request Changes';
export type HackathonApprovalStatus = 'Pending Approval' | 'Approved' | 'Rejected' | 'Needs Changes' | 'Completed';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type ReportCategory = 'Harassment' | 'Spam' | 'Fake recruiter' | 'Fake hackathon' | 'Fraud/scam' | 'Inappropriate content' | 'Suspicious account' | 'Other';
export type ReportStatus = 'Open' | 'Under Review' | 'Warned' | 'Restricted' | 'Suspended' | 'Banned' | 'Dismissed';

export interface HRVerification {
  id: string;
  name: string;
  initials: string;
  gradient: string;
  role: string;
  company: string;
  email: string;
  companyDomain: string;
  linkedin: string;
  companyWebsite: string;
  location: string;
  accountCreated: string;
  submittedDate: string;
  status: VerificationStatus;
  documents: VerificationDocument[];
  aiFlags: AIFlag[];
  aiConfidence: number;
  riskLevel: RiskLevel;
}

export interface VerificationDocument {
  id: string;
  name: string;
  type: 'Employee ID' | 'Authorization Letter' | 'Business Proof' | 'Email Verification' | 'LinkedIn Profile';
  status: 'Uploaded' | 'Verified' | 'Submitted' | 'Pending';
  filename: string;
  uploadDate: string;
  submittedBy: string;
}

export interface AIFlag {
  type: 'success' | 'warning' | 'error';
  text: string;
}

export interface OrganizationVerification {
  id: string;
  name: string;
  initials: string;
  gradient: string;
  type: 'Company' | 'College' | 'College Club' | 'Community' | 'NGO' | 'Developer Community';
  representative: string;
  website: string;
  emailDomain: string;
  hackathonsHosted: number;
  status: VerificationStatus;
  submittedDate: string;
  documents: VerificationDocument[];
  aiFlags: AIFlag[];
  aiConfidence: number;
  riskLevel: RiskLevel;
}

export interface HackathonApproval {
  id: string;
  name: string;
  gradient: string;
  organizer: string;
  organizerVerified: boolean;
  mode: string;
  startDate: string;
  endDate: string;
  registrations: number;
  registrationLimit: number;
  prizePool: string;
  status: HackathonApprovalStatus;
  submittedDate: string;
  domain: string;
  eligibility: string;
  teamSize: string;
  timeline: { label: string; date: string }[];
  problemStatements: { title: string; description: string }[];
  rules: string[];
  rewards: string[];
  communitySetup: string[];
  safetyFlags: AIFlag[];
  riskLevel: RiskLevel;
}

export interface Report {
  id: string;
  reporter: string;
  reportedUser: string;
  category: ReportCategory;
  reason: string;
  timestamp: string;
  status: ReportStatus;
  previousReports: number;
  evidence: string;
}

export interface AuditLog {
  id: string;
  admin: string;
  action: string;
  entity: string;
  previousStatus: string;
  newStatus: string;
  reason: string;
  timestamp: string;
}

export interface PlatformUser {
  id: string;
  name: string;
  initials: string;
  gradient: string;
  email: string;
  role: 'Student' | 'Organizer' | 'Recruiter' | 'Admin';
  status: 'Active' | 'Suspended' | 'Banned';
  joinedDate: string;
  hackathons: number;
  reputation: number;
  verified: boolean;
}

export const adminProfile = {
  name: 'Arjun Nair',
  initials: 'AN',
  role: 'Platform Administrator',
  gradient: 'from-warning-500 to-warning-700',
  email: 'arjun.nair@hackmeet.io',
};

export const adminKPIs = [
  { label: 'Total Users', value: 14823, trend: '+342 today', trendUp: true, icon: 'Users' },
  { label: 'Verified HR Accounts', value: 142, trend: '+8 this week', trendUp: true, icon: 'ShieldCheck' },
  { label: 'Pending HR Verification', value: 12, trend: '3 urgent', trendUp: false, icon: 'Clock' },
  { label: 'Verified Organizations', value: 86, trend: '+4 this week', trendUp: true, icon: 'Building2' },
  { label: 'Pending Org Verification', value: 8, trend: '2 urgent', trendUp: false, icon: 'Clock' },
  { label: 'Active Hackathons', value: 34, trend: '+3 this month', trendUp: true, icon: 'Rocket' },
  { label: 'Pending Hackathon Approval', value: 17, trend: '5 urgent', trendUp: false, icon: 'AlertTriangle' },
  { label: 'Reports Requiring Review', value: 23, trend: '+6 today', trendUp: false, icon: 'Flag' },
];

export const platformActivity = [
  { id: '1', text: 'TCS recruiter verification submitted', time: '12m ago', type: 'hr' as const },
  { id: '2', text: 'TechFest 2026 hackathon submitted for approval', time: '45m ago', type: 'hackathon' as const },
  { id: '3', text: 'Organizer document updated by GreenTech Org', time: '1h ago', type: 'org' as const },
  { id: '4', text: 'HR account approved — Rahul Mehta (Microsoft)', time: '2h ago', type: 'approved' as const },
  { id: '5', text: 'Report filed: suspicious account flagged', time: '3h ago', type: 'report' as const },
  { id: '6', text: 'Organization verified — ABC Developer Community', time: '4h ago', type: 'approved' as const },
  { id: '7', text: 'Hackathon rejected — SmartCode Challenge 2026', time: '5h ago', type: 'rejected' as const },
  { id: '8', text: 'Account suspended — fake recruiter detected', time: '6h ago', type: 'suspended' as const },
];

export const hrVerifications: HRVerification[] = [
  {
    id: 'hr1',
    name: 'Rahul Mehta',
    initials: 'RM',
    gradient: 'from-brand-500 to-brand-700',
    role: 'Senior Talent Acquisition',
    company: 'Microsoft',
    email: 'rahul.mehta@microsoft.com',
    companyDomain: 'microsoft.com',
    linkedin: 'linkedin.com/in/rahulmehta',
    companyWebsite: 'microsoft.com',
    location: 'Hyderabad, India',
    accountCreated: '01 Sep 2026',
    submittedDate: '2 hours ago',
    status: 'Pending',
    documents: [
      { id: 'd1', name: 'Company ID / Employee ID', type: 'Employee ID', status: 'Uploaded', filename: 'msft_employee_id.pdf', uploadDate: '10 Sep 2026', submittedBy: 'Rahul Mehta' },
      { id: 'd2', name: 'Company Authorization Letter', type: 'Authorization Letter', status: 'Uploaded', filename: 'msft_auth_letter.pdf', uploadDate: '10 Sep 2026', submittedBy: 'Rahul Mehta' },
      { id: 'd3', name: 'Company Registration / Business Proof', type: 'Business Proof', status: 'Uploaded', filename: 'msft_business_proof.pdf', uploadDate: '10 Sep 2026', submittedBy: 'Rahul Mehta' },
      { id: 'd4', name: 'Official Work Email Verification', type: 'Email Verification', status: 'Verified', filename: 'email_verification.log', uploadDate: '10 Sep 2026', submittedBy: 'System' },
      { id: 'd5', name: 'LinkedIn / Professional Profile', type: 'LinkedIn Profile', status: 'Submitted', filename: 'linkedin.com/in/rahulmehta', uploadDate: '10 Sep 2026', submittedBy: 'Rahul Mehta' },
    ],
    aiFlags: [
      { type: 'success', text: 'Company domain matches organization' },
      { type: 'success', text: 'Name appears consistent across documents' },
      { type: 'success', text: 'Document appears readable' },
      { type: 'success', text: 'Company information is consistent' },
      { type: 'warning', text: 'Authorization letter needs review' },
    ],
    aiConfidence: 92,
    riskLevel: 'Low',
  },
  {
    id: 'hr2',
    name: 'Sneha Reddy',
    initials: 'SR',
    gradient: 'from-cyan-500 to-cyan-700',
    role: 'Technical Recruiter',
    company: 'Google India',
    email: 'sneha.reddy@google.com',
    companyDomain: 'google.com',
    linkedin: 'linkedin.com/in/snehareddy',
    companyWebsite: 'google.com',
    location: 'Bangalore, India',
    accountCreated: '05 Sep 2026',
    submittedDate: '5 hours ago',
    status: 'Pending',
    documents: [
      { id: 'd6', name: 'Company ID / Employee ID', type: 'Employee ID', status: 'Uploaded', filename: 'google_emp_id.pdf', uploadDate: '10 Sep 2026', submittedBy: 'Sneha Reddy' },
      { id: 'd7', name: 'Company Authorization Letter', type: 'Authorization Letter', status: 'Uploaded', filename: 'google_auth.pdf', uploadDate: '10 Sep 2026', submittedBy: 'Sneha Reddy' },
      { id: 'd8', name: 'Official Work Email Verification', type: 'Email Verification', status: 'Verified', filename: 'email_verification.log', uploadDate: '10 Sep 2026', submittedBy: 'System' },
      { id: 'd9', name: 'LinkedIn / Professional Profile', type: 'LinkedIn Profile', status: 'Submitted', filename: 'linkedin.com/in/snehareddy', uploadDate: '10 Sep 2026', submittedBy: 'Sneha Reddy' },
    ],
    aiFlags: [
      { type: 'success', text: 'Company domain matches organization' },
      { type: 'success', text: 'Name appears consistent across documents' },
      { type: 'warning', text: 'Authorization letter needs review' },
      { type: 'warning', text: 'Company details mismatch on registration proof' },
    ],
    aiConfidence: 78,
    riskLevel: 'Medium',
  },
  {
    id: 'hr3',
    name: 'Vikram Joshi',
    initials: 'VJ',
    gradient: 'from-success-500 to-success-700',
    role: 'HR Manager',
    company: 'Infosys',
    email: 'vikram.j@infosys.com',
    companyDomain: 'infosys.com',
    linkedin: 'linkedin.com/in/vikramjoshi',
    companyWebsite: 'infosys.com',
    location: 'Pune, India',
    accountCreated: '10 Sep 2026',
    submittedDate: '1 hour ago',
    status: 'Pending',
    documents: [
      { id: 'd10', name: 'Company ID / Employee ID', type: 'Employee ID', status: 'Uploaded', filename: 'infosys_id.pdf', uploadDate: '10 Sep 2026', submittedBy: 'Vikram Joshi' },
      { id: 'd11', name: 'Company Authorization Letter', type: 'Authorization Letter', status: 'Uploaded', filename: 'infosys_auth.pdf', uploadDate: '10 Sep 2026', submittedBy: 'Vikram Joshi' },
      { id: 'd12', name: 'Company Registration / Business Proof', type: 'Business Proof', status: 'Uploaded', filename: 'infosys_reg.pdf', uploadDate: '10 Sep 2026', submittedBy: 'Vikram Joshi' },
      { id: 'd13', name: 'Official Work Email Verification', type: 'Email Verification', status: 'Verified', filename: 'email_verification.log', uploadDate: '10 Sep 2026', submittedBy: 'System' },
    ],
    aiFlags: [
      { type: 'success', text: 'Company domain matches organization' },
      { type: 'success', text: 'Name appears consistent across documents' },
      { type: 'success', text: 'Document appears readable' },
      { type: 'success', text: 'Company information is consistent' },
    ],
    aiConfidence: 96,
    riskLevel: 'Low',
  },
  {
    id: 'hr4',
    name: 'Priya Sharma',
    initials: 'PS',
    gradient: 'from-warning-500 to-warning-700',
    role: 'Talent Acquisition Lead',
    company: 'TCS',
    email: 'priya.s@tcs.com',
    companyDomain: 'tcs.com',
    linkedin: 'linkedin.com/in/priyasharma',
    companyWebsite: 'tcs.com',
    location: 'Mumbai, India',
    accountCreated: '15 Aug 2026',
    submittedDate: '1 day ago',
    status: 'Approved',
    documents: [
      { id: 'd14', name: 'Company ID / Employee ID', type: 'Employee ID', status: 'Verified', filename: 'tcs_id.pdf', uploadDate: '09 Sep 2026', submittedBy: 'Priya Sharma' },
      { id: 'd15', name: 'Company Authorization Letter', type: 'Authorization Letter', status: 'Verified', filename: 'tcs_auth.pdf', uploadDate: '09 Sep 2026', submittedBy: 'Priya Sharma' },
      { id: 'd16', name: 'Official Work Email Verification', type: 'Email Verification', status: 'Verified', filename: 'email_verification.log', uploadDate: '09 Sep 2026', submittedBy: 'System' },
    ],
    aiFlags: [
      { type: 'success', text: 'Company domain matches organization' },
      { type: 'success', text: 'All documents verified' },
    ],
    aiConfidence: 98,
    riskLevel: 'Low',
  },
  {
    id: 'hr5',
    name: 'Amit Patel',
    initials: 'AP',
    gradient: 'from-error-500 to-error-700',
    role: 'Recruiter',
    company: 'Unknown Startup',
    email: 'amit@unknown-startup.io',
    companyDomain: 'unknown-startup.io',
    linkedin: 'linkedin.com/in/amitpatel',
    companyWebsite: 'unknown-startup.io',
    location: 'Remote',
    accountCreated: '08 Sep 2026',
    submittedDate: '2 days ago',
    status: 'Rejected',
    documents: [
      { id: 'd17', name: 'Company ID / Employee ID', type: 'Employee ID', status: 'Uploaded', filename: 'suspicious_id.pdf', uploadDate: '08 Sep 2026', submittedBy: 'Amit Patel' },
    ],
    aiFlags: [
      { type: 'error', text: 'Company domain does not match established organization' },
      { type: 'error', text: 'Document appears altered' },
      { type: 'warning', text: 'Company information is inconsistent' },
    ],
    aiConfidence: 34,
    riskLevel: 'High',
  },
];

export const organizationVerifications: OrganizationVerification[] = [
  {
    id: 'org1',
    name: 'ABC Developer Community',
    initials: 'AB',
    gradient: 'from-brand-500 to-brand-700',
    type: 'Developer Community',
    representative: 'Rajesh Kumar',
    website: 'abcdc.dev',
    emailDomain: 'abcdc.dev',
    hackathonsHosted: 3,
    status: 'Pending',
    submittedDate: '3 hours ago',
    documents: [
      { id: 'od1', name: 'Organization Registration Proof', type: 'Business Proof', status: 'Uploaded', filename: 'abcdc_reg.pdf', uploadDate: '10 Sep 2026', submittedBy: 'Rajesh Kumar' },
      { id: 'od2', name: 'Authorized Representative Proof', type: 'Authorization Letter', status: 'Uploaded', filename: 'abcdc_auth.pdf', uploadDate: '10 Sep 2026', submittedBy: 'Rajesh Kumar' },
      { id: 'od3', name: 'Official Website Verification', type: 'Email Verification', status: 'Verified', filename: 'dns_verification.log', uploadDate: '10 Sep 2026', submittedBy: 'System' },
    ],
    aiFlags: [
      { type: 'success', text: 'Website is live and accessible' },
      { type: 'success', text: 'Email domain matches website' },
      { type: 'warning', text: 'Organization registration needs manual verification' },
    ],
    aiConfidence: 85,
    riskLevel: 'Low',
  },
  {
    id: 'org2',
    name: 'VIT Tech Club',
    initials: 'VT',
    gradient: 'from-cyan-500 to-cyan-700',
    type: 'College Club',
    representative: 'Ananya Iyer',
    website: 'vit.ac.in/techclub',
    emailDomain: 'vit.ac.in',
    hackathonsHosted: 7,
    status: 'Pending',
    submittedDate: '6 hours ago',
    documents: [
      { id: 'od4', name: 'College Authorization', type: 'Authorization Letter', status: 'Uploaded', filename: 'vit_auth_letter.pdf', uploadDate: '10 Sep 2026', submittedBy: 'Ananya Iyer' },
      { id: 'od5', name: 'Official Email Verification', type: 'Email Verification', status: 'Verified', filename: 'email_verification.log', uploadDate: '10 Sep 2026', submittedBy: 'System' },
      { id: 'od6', name: 'Supporting Documents', type: 'Business Proof', status: 'Uploaded', filename: 'vit_techclub_proof.pdf', uploadDate: '10 Sep 2026', submittedBy: 'Ananya Iyer' },
    ],
    aiFlags: [
      { type: 'success', text: 'College domain verified (.ac.in)' },
      { type: 'success', text: 'Representative email matches college domain' },
      { type: 'success', text: 'Authorization letter is readable' },
    ],
    aiConfidence: 94,
    riskLevel: 'Low',
  },
  {
    id: 'org3',
    name: 'TechNova Solutions',
    initials: 'TN',
    gradient: 'from-success-500 to-success-700',
    type: 'Company',
    representative: 'Karan Malhotra',
    website: 'technova.io',
    emailDomain: 'technova.io',
    hackathonsHosted: 2,
    status: 'Approved',
    submittedDate: '2 days ago',
    documents: [
      { id: 'od7', name: 'Company Registration Proof', type: 'Business Proof', status: 'Verified', filename: 'technova_reg.pdf', uploadDate: '08 Sep 2026', submittedBy: 'Karan Malhotra' },
      { id: 'od8', name: 'Authorized Representative Proof', type: 'Authorization Letter', status: 'Verified', filename: 'technova_auth.pdf', uploadDate: '08 Sep 2026', submittedBy: 'Karan Malhotra' },
    ],
    aiFlags: [
      { type: 'success', text: 'All documents verified' },
      { type: 'success', text: 'Company registration confirmed' },
    ],
    aiConfidence: 97,
    riskLevel: 'Low',
  },
  {
    id: 'org4',
    name: 'CodeFreeze Community',
    initials: 'CF',
    gradient: 'from-warning-500 to-warning-700',
    type: 'Community',
    representative: 'Sahil Verma',
    website: 'codefreeze.dev',
    emailDomain: 'codefreeze.dev',
    hackathonsHosted: 0,
    status: 'Pending',
    submittedDate: '1 day ago',
    documents: [
      { id: 'od9', name: 'Organization Registration Proof', type: 'Business Proof', status: 'Uploaded', filename: 'codefreeze_reg.pdf', uploadDate: '09 Sep 2026', submittedBy: 'Sahil Verma' },
    ],
    aiFlags: [
      { type: 'warning', text: 'No previous hackathons hosted' },
      { type: 'warning', text: 'Website is recently registered (3 months old)' },
      { type: 'warning', text: 'Limited online presence' },
    ],
    aiConfidence: 62,
    riskLevel: 'Medium',
  },
];

export const hackathonApprovals: HackathonApproval[] = [
  {
    id: 'ha1',
    name: 'AI for Bharat Hackathon 2026',
    gradient: 'from-brand-500 to-brand-700',
    organizer: 'ABC Developer Community',
    organizerVerified: false,
    mode: 'Online',
    startDate: '15 Oct 2026',
    endDate: '17 Oct 2026',
    registrations: 0,
    registrationLimit: 500,
    prizePool: '₹2,00,000',
    status: 'Pending Approval',
    submittedDate: '2 hours ago',
    domain: 'AI / Social Impact',
    eligibility: 'Both',
    teamSize: '2-4',
    timeline: [
      { label: 'Registration Opens', date: '20 Sep 2026' },
      { label: 'Registration Closes', date: '10 Oct 2026' },
      { label: 'Hackathon Start', date: '15 Oct 2026' },
      { label: 'Submission Deadline', date: '17 Oct 2026, 11:59 PM' },
      { label: 'Judging', date: '18 Oct 2026' },
      { label: 'Results', date: '20 Oct 2026' },
    ],
    problemStatements: [
      { title: 'AI for Agriculture', description: 'Build AI solutions for crop disease detection, yield prediction, or farmer assistance.' },
      { title: 'AI for Healthcare', description: 'Create AI-powered healthcare solutions for rural India.' },
      { title: 'AI for Education', description: 'Develop AI tools to improve learning outcomes in underserved communities.' },
    ],
    rules: ['Teams of 2-4 members', 'All code must be written during the hackathon', 'Use of pre-trained models is allowed with attribution', 'No external API keys without prior approval', 'Submission must include a demo video (max 3 min)'],
    rewards: ['₹1,00,000 for 1st prize', '₹50,000 for 2nd prize', '₹25,000 for 3rd prize', 'Internship opportunities at partner companies', 'Certificates for all participants'],
    communitySetup: ['General Chat', 'FAQ', 'Find Members', 'Team Formation'],
    safetyFlags: [
      { type: 'warning', text: 'Organizer is not yet verified' },
      { type: 'success', text: 'Prize pool is reasonable for scale' },
      { type: 'success', text: 'No suspicious links detected' },
    ],
    riskLevel: 'Medium',
  },
  {
    id: 'ha2',
    name: 'FinTech Buildathon 2026',
    gradient: 'from-cyan-500 to-cyan-700',
    organizer: 'TechNova Solutions',
    organizerVerified: true,
    mode: 'Hybrid',
    startDate: '01 Nov 2026',
    endDate: '03 Nov 2026',
    registrations: 0,
    registrationLimit: 300,
    prizePool: '₹1,50,000',
    status: 'Pending Approval',
    submittedDate: '5 hours ago',
    domain: 'FinTech',
    eligibility: 'Both',
    teamSize: '2-4',
    timeline: [
      { label: 'Registration Opens', date: '25 Sep 2026' },
      { label: 'Registration Closes', date: '28 Oct 2026' },
      { label: 'Hackathon Start', date: '01 Nov 2026' },
      { label: 'Submission Deadline', date: '03 Nov 2026, 11:59 PM' },
      { label: 'Judging', date: '04 Nov 2026' },
      { label: 'Results', date: '06 Nov 2026' },
    ],
    problemStatements: [
      { title: 'Financial Inclusion', description: 'Build solutions that bring banking and financial services to underserved populations.' },
      { title: 'Payment Innovation', description: 'Create next-gen payment solutions using UPI, blockchain, or AI.' },
    ],
    rules: ['Teams of 2-4 members', 'All code must be written during the hackathon', 'Mentors available throughout', 'Top 10 teams get internship interviews'],
    rewards: ['₹75,000 for 1st prize', '₹40,000 for 2nd prize', '₹20,000 for 3rd prize', 'PPO opportunities', 'Certificates'],
    communitySetup: ['General Chat', 'FAQ', 'Find Members', 'Team Formation', 'FinTech Discussion'],
    safetyFlags: [
      { type: 'success', text: 'Organizer is verified' },
      { type: 'success', text: 'Prize pool is reasonable' },
      { type: 'success', text: 'No suspicious content detected' },
    ],
    riskLevel: 'Low',
  },
  {
    id: 'ha3',
    name: 'SmartCode Challenge 2026',
    gradient: 'from-error-500 to-error-700',
    organizer: 'CodeFreeze Community',
    organizerVerified: false,
    mode: 'Online',
    startDate: '20 Sep 2026',
    endDate: '22 Sep 2026',
    registrations: 0,
    registrationLimit: 1000,
    prizePool: '₹10,00,000',
    status: 'Rejected',
    submittedDate: '3 days ago',
    domain: 'General',
    eligibility: 'Both',
    teamSize: '1-5',
    timeline: [
      { label: 'Registration Opens', date: '15 Sep 2026' },
      { label: 'Hackathon Start', date: '20 Sep 2026' },
      { label: 'Submission Deadline', date: '22 Sep 2026' },
    ],
    problemStatements: [
      { title: 'Open Innovation', description: 'Build anything innovative.' },
    ],
    rules: ['Teams of 1-5 members'],
    rewards: ['₹5,00,000 for 1st prize', '₹3,00,000 for 2nd prize', '₹2,00,000 for 3rd prize'],
    communitySetup: ['General Chat'],
    safetyFlags: [
      { type: 'error', text: 'Prize pool seems disproportionately high for organizer profile' },
      { type: 'error', text: 'Organizer is not verified' },
      { type: 'warning', text: 'Suspicious external links in description' },
      { type: 'warning', text: 'Inappropriate content detected in problem statement' },
    ],
    riskLevel: 'High',
  },
  {
    id: 'ha4',
    name: 'GreenTech Innovation Hack',
    gradient: 'from-success-500 to-success-700',
    organizer: 'Climate Action Org',
    organizerVerified: true,
    mode: 'Hybrid',
    startDate: '10 Nov 2026',
    endDate: '12 Nov 2026',
    registrations: 145,
    registrationLimit: 250,
    prizePool: '₹1,00,000',
    status: 'Approved',
    submittedDate: '1 week ago',
    domain: 'Climate / Sustainability',
    eligibility: 'Both',
    teamSize: '1-5',
    timeline: [
      { label: 'Registration Opens', date: '01 Oct 2026' },
      { label: 'Registration Closes', date: '05 Nov 2026' },
      { label: 'Hackathon Start', date: '10 Nov 2026' },
      { label: 'Submission Deadline', date: '12 Nov 2026' },
      { label: 'Results', date: '15 Nov 2026' },
    ],
    problemStatements: [
      { title: 'Carbon Tracking', description: 'Build tools to track and reduce carbon footprint.' },
      { title: 'Smart Waste Management', description: 'Create IoT solutions for efficient waste management.' },
    ],
    rules: ['Teams of 1-5 members', 'All code must be written during the hackathon', 'Pre-trained models allowed with attribution'],
    rewards: ['₹50,000 for 1st prize', '₹30,000 for 2nd prize', '₹20,000 for 3rd prize', 'Certificates'],
    communitySetup: ['General Chat', 'FAQ', 'Find Members', 'Team Formation', 'GreenTech Discussion'],
    safetyFlags: [
      { type: 'success', text: 'Organizer is verified' },
      { type: 'success', text: 'All content is appropriate' },
    ],
    riskLevel: 'Low',
  },
];

export const reports: Report[] = [
  { id: 'r1', reporter: 'Pavan Mali', reportedUser: 'Amit Patel', category: 'Fake recruiter', reason: 'This recruiter contacted me with a job offer but the company does not seem to exist. They asked for personal information.', timestamp: '1h ago', status: 'Open', previousReports: 3, evidence: 'Screenshot of chat conversation' },
  { id: 'r2', reporter: 'Rahul Sharma', reportedUser: 'CodeFreeze Community', category: 'Fake hackathon', reason: 'Prize pool seems suspicious. ₹10 lakh for a community with no track record.', timestamp: '3h ago', status: 'Under Review', previousReports: 1, evidence: 'Hackathon page screenshot' },
  { id: 'r3', reporter: 'Ananya Gupta', reportedUser: 'user_8472', category: 'Harassment', reason: 'This user is sending inappropriate messages in the community channel.', timestamp: '5h ago', status: 'Open', previousReports: 0, evidence: 'Chat logs (3 messages)' },
  { id: 'r4', reporter: 'Karthik Rao', reportedUser: 'recruiter_xyz', category: 'Fraud/scam', reason: 'Asked me to pay a fee for an interview opportunity. This is a scam.', timestamp: '8h ago', status: 'Open', previousReports: 5, evidence: 'Email screenshot, payment link' },
  { id: 'r5', reporter: 'Neha Singh', reportedUser: 'user_3921', category: 'Spam', reason: 'Posting promotional links repeatedly in general chat.', timestamp: '1d ago', status: 'Warned', previousReports: 2, evidence: 'Chat logs (8 messages)' },
  { id: 'r6', reporter: 'Vikram Kumar', reportedUser: 'SmartCode Challenge', category: 'Fake hackathon', reason: 'Suspicious links in hackathon description leading to phishing site.', timestamp: '2d ago', status: 'Suspended', previousReports: 4, evidence: 'URL analysis report' },
];

export const auditLogs: AuditLog[] = [
  { id: 'al1', admin: 'Arjun Nair', action: 'Approved recruiter verification', entity: 'Priya Sharma (TCS)', previousStatus: 'Pending', newStatus: 'Approved', reason: 'All documents verified', timestamp: '2h ago' },
  { id: 'al2', admin: 'Arjun Nair', action: 'Rejected hackathon', entity: 'SmartCode Challenge 2026', previousStatus: 'Pending Approval', newStatus: 'Rejected', reason: 'Suspicious prize pool and unverified organizer', timestamp: '5h ago' },
  { id: 'al3', admin: 'Arjun Nair', action: 'Requested organization documents', entity: 'CodeFreeze Community', previousStatus: 'Pending', newStatus: 'Request Changes', reason: 'Website recently registered, needs additional proof', timestamp: '6h ago' },
  { id: 'al4', admin: 'Arjun Nair', action: 'Suspended account', entity: 'user_8472', previousStatus: 'Active', newStatus: 'Suspended', reason: 'Harassment reports confirmed', timestamp: '8h ago' },
  { id: 'al5', admin: 'Arjun Nair', action: 'Approved organization verification', entity: 'TechNova Solutions', previousStatus: 'Pending', newStatus: 'Approved', reason: 'All documents verified', timestamp: '2d ago' },
  { id: 'al6', admin: 'Arjun Nair', action: 'Rejected recruiter verification', entity: 'Amit Patel (Unknown Startup)', previousStatus: 'Pending', newStatus: 'Rejected', reason: 'Invalid documents, company affiliation could not be verified', timestamp: '2d ago' },
  { id: 'al7', admin: 'Arjun Nair', action: 'Banned account', entity: 'recruiter_xyz', previousStatus: 'Suspended', newStatus: 'Banned', reason: 'Confirmed fraud — charging candidates for interviews', timestamp: '3d ago' },
  { id: 'al8', admin: 'Arjun Nair', action: 'Approved hackathon', entity: 'GreenTech Innovation Hack', previousStatus: 'Pending Approval', newStatus: 'Approved', reason: 'Organizer verified, content reviewed', timestamp: '1w ago' },
];

export const platformUsers: PlatformUser[] = [
  { id: 'u1', name: 'Pavan Mali', initials: 'PM', gradient: 'from-brand-500 to-brand-700', email: 'pavan@mali.dev', role: 'Student', status: 'Active', joinedDate: 'Jan 2025', hackathons: 6, reputation: 91, verified: true },
  { id: 'u2', name: 'Rahul Sharma', initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', email: 'rahul@sharma.dev', role: 'Student', status: 'Active', joinedDate: 'Mar 2025', hackathons: 8, reputation: 89, verified: true },
  { id: 'u3', name: 'Priya Sharma', initials: 'PS', gradient: 'from-warning-500 to-warning-700', email: 'priya.s@tcs.com', role: 'Recruiter', status: 'Active', joinedDate: 'Aug 2026', hackathons: 0, reputation: 0, verified: true },
  { id: 'u4', name: 'TechNova Community', initials: 'TN', gradient: 'from-success-500 to-success-700', email: 'admin@technova.io', role: 'Organizer', status: 'Active', joinedDate: 'Jun 2025', hackathons: 5, reputation: 88, verified: true },
  { id: 'u5', name: 'Amit Patel', initials: 'AP', gradient: 'from-error-500 to-error-700', email: 'amit@unknown-startup.io', role: 'Recruiter', status: 'Suspended', joinedDate: 'Sep 2026', hackathons: 0, reputation: 0, verified: false },
  { id: 'u6', name: 'Karthik Rao', initials: 'KR', gradient: 'from-warning-500 to-warning-700', email: 'karthik@rao.dev', role: 'Student', status: 'Active', joinedDate: 'Feb 2025', hackathons: 7, reputation: 88, verified: true },
  { id: 'u7', name: 'recruiter_xyz', initials: 'RX', gradient: 'from-ink-500 to-ink-700', email: 'xyz@scam.com', role: 'Recruiter', status: 'Banned', joinedDate: 'Sep 2026', hackathons: 0, reputation: 0, verified: false },
  { id: 'u8', name: 'ABC Developer Community', initials: 'AB', gradient: 'from-brand-500 to-brand-700', email: 'admin@abcdc.dev', role: 'Organizer', status: 'Active', joinedDate: 'Jul 2025', hackathons: 3, reputation: 75, verified: false },
];

export const revenueData = [
  { month: 'Apr', revenue: 285000, subscriptions: 42 },
  { month: 'May', revenue: 312000, subscriptions: 48 },
  { month: 'Jun', revenue: 348000, subscriptions: 53 },
  { month: 'Jul', revenue: 395000, subscriptions: 61 },
  { month: 'Aug', revenue: 432000, subscriptions: 68 },
  { month: 'Sep', revenue: 478000, subscriptions: 74 },
];

export const paymentHistory = [
  { id: 'p1', company: 'Microsoft', plan: 'Enterprise', amount: '₹50,000', date: '10 Sep 2026', status: 'Paid' },
  { id: 'p2', company: 'Google India', plan: 'Enterprise', amount: '₹50,000', date: '08 Sep 2026', status: 'Paid' },
  { id: 'p3', company: 'Infosys', plan: 'Pro', amount: '₹15,000', date: '05 Sep 2026', status: 'Paid' },
  { id: 'p4', company: 'TCS', plan: 'Pro', amount: '₹15,000', date: '01 Sep 2026', status: 'Paid' },
  { id: 'p5', company: 'TechNova Solutions', plan: 'Starter', amount: '₹5,000', date: '28 Aug 2026', status: 'Paid' },
  { id: 'p6', company: 'ABC Developer Community', plan: 'Starter', amount: '₹5,000', date: '25 Aug 2026', status: 'Pending' },
];
