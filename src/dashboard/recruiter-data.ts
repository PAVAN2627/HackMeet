export type RecruiterPageId =
  | 'rec-home' | 'rec-create-role' | 'rec-ai-match' | 'rec-discover'
  | 'rec-shortlisted' | 'rec-invitations' | 'rec-groups' | 'rec-messages'
  | 'rec-activity' | 'rec-saved-searches' | 'rec-company' | 'rec-settings';

export type HackathonLevel = 'International' | 'National' | 'State' | 'Inter-College' | 'College';
export type HackathonResult = 'Winner' | 'Finalist' | 'Participant';
export type WorkType = 'Remote' | 'Hybrid' | 'On-site';
export type InvitationStatus = 'Sent' | 'Pending' | 'Accepted' | 'Declined';

export interface CandidateProject {
  name: string;
  description: string;
  techStack: string[];
  github: string;
  demo?: string;
  contribution: string;
}

export interface CandidateHackathon {
  name: string;
  level: HackathonLevel;
  result: HackathonResult;
  verified: boolean;
  date: string;
}

export interface MatchBreakdown {
  skillMatch: number;
  projectRelevance: number;
  hackathonEvidence: number;
  hackathonLevel: number;
  experienceMatch: number;
  githubActivity: number;
  reputation: number;
}

export interface Candidate {
  id: string;
  name: string;
  username: string;
  initials: string;
  gradient: string;
  role: string;
  domain: string;
  skills: string[];
  requiredSkillsMatch: { skill: string; matched: boolean }[];
  overallMatch: number;
  matchBreakdown: MatchBreakdown;
  projects: CandidateProject[];
  hackathons: CandidateHackathon[];
  atsScore: number;
  githubCommits: number;
  githubRepos: number;
  githubActivity: 'Active' | 'Moderate' | 'Low';
  reputation: number;
  reputationBreakdown: { teamReliability: number; projectContribution: number; communication: number; submissionReliability: number };
  graduationYear: number;
  experience: string;
  location: string;
  availability: string;
  workPreference: WorkType;
  externalProfiles: { name: string; handle: string }[];
  matchReasons: string[];
  shortlisted?: boolean;
}

export interface Role {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  domain: string;
  experience: string;
  graduationYear: number;
  location: string;
  workType: WorkType;
  mustHave: string[];
  niceToHave: string[];
  createdDate: string;
  matchedCandidates: number;
  avgTopMatch: number;
  status: 'Active' | 'Draft' | 'Closed';
}

export interface Invitation {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateInitials: string;
  candidateGradient: string;
  role: string;
  match: number;
  sentDate: string;
  status: InvitationStatus;
  message: string;
}

export interface CandidateGroup {
  id: string;
  name: string;
  role: string;
  candidateCount: number;
  createdDate: string;
  status: 'Invitation Pending' | 'Invitation Sent' | 'Active' | 'Archived';
  message: string;
  candidateIds: string[];
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: { label: string; value: string }[];
  createdDate: string;
  resultsCount: number;
}

export interface HiringActivityItem {
  id: string;
  text: string;
  time: string;
  type: 'accepted' | 'matched' | 'shortlisted' | 'responded' | 'invited';
}

export const recruiterCompany = {
  name: 'TechNova Pvt. Ltd.',
  verified: true,
  description: 'TechNova is a leading SaaS company building developer-first tools and cloud infrastructure. We hire builders who prove their skills through real projects.',
  website: 'technova.io',
  industry: 'Software Development / SaaS',
  size: '201-500',
  location: 'Pune, India',
  logoGradient: 'from-success-500 to-success-700',
  activeRoles: 4,
  totalHires: 38,
};

export const recruiterProfile = {
  name: 'Priya Deshmukh',
  username: 'priyadeshmukh',
  initials: 'PD',
  role: 'Senior Technical Recruiter',
  gradient: 'from-success-500 to-success-700',
  email: 'priya.deshmukh@technova.io',
};

export const recruiterKPIs = [
  { label: 'Active Roles', value: 4, trend: '+1 this week', trendUp: true, icon: 'Briefcase' },
  { label: 'AI Matched Candidates', value: 1284, trend: '+312 this week', trendUp: true, icon: 'Sparkles' },
  { label: 'Shortlisted', value: 86, trend: '+12 today', trendUp: true, icon: 'Star' },
  { label: 'Invitations Sent', value: 142, trend: '+8 today', trendUp: true, icon: 'Send' },
  { label: 'Accepted', value: 38, trend: '+5 this week', trendUp: true, icon: 'UserCheck' },
];

export const hiringPipeline = [
  { stage: 'Matched', count: 1284, color: 'from-brand-500 to-brand-600' },
  { stage: 'Shortlisted', count: 86, color: 'from-cyan-500 to-cyan-600' },
  { stage: 'Invited', count: 42, color: 'from-warning-500 to-warning-600' },
  { stage: 'Accepted', count: 18, color: 'from-success-500 to-success-600' },
  { stage: 'Interviewed', count: 12, color: 'from-success-600 to-success-700' },
  { stage: 'Selected', count: 4, color: 'from-ink-700 to-ink-900' },
];

export const hiringActivity: HiringActivityItem[] = [
  { id: 'a1', text: '5 candidates accepted your invitation.', time: '2h ago', type: 'accepted' },
  { id: 'a2', text: '12 new candidates matched your Software Developer role.', time: '5h ago', type: 'matched' },
  { id: 'a3', text: '3 candidates moved to shortlist.', time: '8h ago', type: 'shortlisted' },
  { id: 'a4', text: 'Candidate responded to invitation.', time: '1d ago', type: 'responded' },
  { id: 'a5', text: '8 invitations sent to 2027 graduates.', time: '2d ago', type: 'invited' },
  { id: 'a6', text: '2 candidates accepted interview invitations.', time: '3d ago', type: 'accepted' },
];

export const roles: Role[] = [
  {
    id: 'r1',
    title: 'Software Developer Intern',
    description: 'We are looking for a Software Developer Intern to join our team. You will work on building and scaling our SaaS platform using React, Node.js, and MongoDB. Experience with REST APIs is required. AWS and Docker are a plus.',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    preferredSkills: ['AWS', 'Docker', 'TypeScript'],
    domain: 'Software Development / SaaS',
    experience: '0-2 years',
    graduationYear: 2027,
    location: 'India',
    workType: 'Remote',
    mustHave: ['React', 'Node.js', 'MongoDB'],
    niceToHave: ['AWS', 'Docker'],
    createdDate: '08 Sep 2026',
    matchedCandidates: 1284,
    avgTopMatch: 96,
    status: 'Active',
  },
  {
    id: 'r2',
    title: 'Full Stack Developer',
    description: 'Seeking a Full Stack Developer to build end-to-end features across our platform. Strong React and Node.js skills required. PostgreSQL and Redis experience preferred.',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    preferredSkills: ['Redis', 'Docker', 'AWS'],
    domain: 'Web Development',
    experience: '2-4 years',
    graduationYear: 2024,
    location: 'Pune, India',
    workType: 'Hybrid',
    mustHave: ['React', 'Node.js', 'PostgreSQL'],
    niceToHave: ['Redis', 'Docker'],
    createdDate: '01 Sep 2026',
    matchedCandidates: 856,
    avgTopMatch: 92,
    status: 'Active',
  },
  {
    id: 'r3',
    title: 'ML Engineer',
    description: 'Looking for an ML Engineer to build and deploy ML models. Python, TensorFlow, and PyTorch experience required. Experience with model deployment is a strong plus.',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch'],
    preferredSkills: ['AWS', 'Docker', 'Kubernetes'],
    domain: 'AI/ML',
    experience: '1-3 years',
    graduationYear: 2025,
    location: 'India',
    workType: 'Remote',
    mustHave: ['Python', 'TensorFlow'],
    niceToHave: ['AWS', 'Kubernetes'],
    createdDate: '28 Aug 2026',
    matchedCandidates: 412,
    avgTopMatch: 88,
    status: 'Active',
  },
  {
    id: 'r4',
    title: 'Frontend Engineer',
    description: 'We need a Frontend Engineer passionate about building beautiful, responsive UIs. React and TypeScript required. Tailwind and Figma experience preferred.',
    requiredSkills: ['React', 'TypeScript', 'Tailwind'],
    preferredSkills: ['Figma', 'Next.js'],
    domain: 'Web Development',
    experience: '1-3 years',
    graduationYear: 2025,
    location: 'India',
    workType: 'Hybrid',
    mustHave: ['React', 'TypeScript'],
    niceToHave: ['Figma', 'Next.js'],
    createdDate: '20 Aug 2026',
    matchedCandidates: 634,
    avgTopMatch: 90,
    status: 'Draft',
  },
];

export const candidates: Candidate[] = [
  {
    id: 'c1',
    name: 'Pavan Mali',
    username: 'pavanmali',
    initials: 'PM',
    gradient: 'from-brand-500 to-brand-700',
    role: 'Software Developer',
    domain: 'Web Development',
    skills: ['React', 'Node.js', 'MongoDB', 'Python', 'AWS', 'TypeScript'],
    requiredSkillsMatch: [
      { skill: 'React', matched: true },
      { skill: 'Node.js', matched: true },
      { skill: 'MongoDB', matched: true },
      { skill: 'REST APIs', matched: true },
    ],
    overallMatch: 96,
    matchBreakdown: { skillMatch: 97, projectRelevance: 94, hackathonEvidence: 91, hackathonLevel: 95, experienceMatch: 90, githubActivity: 88, reputation: 92 },
    projects: [
      { name: 'AI Crop Disease Detection', description: 'ML-powered app that detects crop diseases from photos and suggests treatments.', techStack: ['React', 'Node.js', 'Python', 'TensorFlow'], github: 'github.com/teamalpha/crop-disease', demo: 'crop-disease-demo.app', contribution: 'Full Stack Lead' },
      { name: 'FinFlow Dashboard', description: 'Real-time financial analytics dashboard with predictive insights.', techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis'], github: 'github.com/teambeta/finflow', demo: 'finflow-demo.app', contribution: 'Backend Developer' },
      { name: 'Smart Traffic AI', description: 'Computer vision traffic optimization system for urban intersections.', techStack: ['Python', 'OpenCV', 'TensorFlow', 'Flask'], github: 'github.com/teamalpha/smart-traffic', contribution: 'ML Engineer' },
    ],
    hackathons: [
      { name: 'GreenTech Hack 2025', level: 'International', result: 'Winner', verified: true, date: 'Sep 2025' },
      { name: 'Smart India Hackathon 2025', level: 'National', result: 'Winner', verified: true, date: 'Jul 2025' },
      { name: 'FinTech Buildathon 2025', level: 'National', result: 'Finalist', verified: true, date: 'Nov 2025' },
      { name: 'HealthTech Innovation 2025', level: 'State', result: 'Participant', verified: true, date: 'May 2025' },
    ],
    atsScore: 86,
    githubCommits: 847,
    githubRepos: 12,
    githubActivity: 'Active',
    reputation: 91,
    reputationBreakdown: { teamReliability: 93, projectContribution: 92, communication: 88, submissionReliability: 91 },
    graduationYear: 2027,
    experience: '0-1 years',
    location: 'Pune, India',
    availability: 'Available immediately',
    workPreference: 'Remote',
    externalProfiles: [
      { name: 'GitHub', handle: 'pavanmali' },
      { name: 'LinkedIn', handle: 'pavanmali' },
      { name: 'LeetCode', handle: 'pavanmali' },
      { name: 'Portfolio', handle: 'pavanmali.dev' },
    ],
    matchReasons: ['Matches all required skills', '3 relevant projects', 'International hackathon winner', 'Active GitHub profile', 'Strong team reputation'],
  },
  {
    id: 'c2',
    name: 'Rahul Sharma',
    username: 'rahulsharma',
    initials: 'RS',
    gradient: 'from-cyan-500 to-cyan-700',
    role: 'Frontend Developer',
    domain: 'Web Development',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Figma'],
    requiredSkillsMatch: [
      { skill: 'React', matched: true },
      { skill: 'Node.js', matched: true },
      { skill: 'MongoDB', matched: false },
      { skill: 'REST APIs', matched: true },
    ],
    overallMatch: 94,
    matchBreakdown: { skillMatch: 92, projectRelevance: 96, hackathonEvidence: 88, hackathonLevel: 90, experienceMatch: 93, githubActivity: 95, reputation: 89 },
    projects: [
      { name: 'FinFlow Dashboard', description: 'Real-time financial analytics dashboard with predictive insights.', techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis'], github: 'github.com/teambeta/finflow', demo: 'finflow-demo.app', contribution: 'Frontend Lead' },
      { name: 'EduChain Cert', description: 'Blockchain-based certificate verification for colleges.', techStack: ['Next.js', 'Solidity', 'Web3.js', 'Node.js'], github: 'github.com/teambeta/educhain', contribution: 'Frontend Developer' },
      { name: 'DevConnect', description: 'Social platform for developers to showcase projects.', techStack: ['React', 'TypeScript', 'Tailwind', 'Firebase'], github: 'github.com/rahulsharma/devconnect', demo: 'devconnect.app', contribution: 'Solo Developer' },
    ],
    hackathons: [
      { name: 'FinTech Buildathon 2025', level: 'National', result: 'Winner', verified: true, date: 'Nov 2025' },
      { name: 'Web3 Build Sprint 2024', level: 'National', result: 'Finalist', verified: true, date: 'Dec 2024' },
      { name: 'AI Innovation Challenge', level: 'National', result: 'Participant', verified: true, date: 'Jan 2026' },
    ],
    atsScore: 89,
    githubCommits: 1023,
    githubRepos: 18,
    githubActivity: 'Active',
    reputation: 89,
    reputationBreakdown: { teamReliability: 90, projectContribution: 91, communication: 87, submissionReliability: 88 },
    graduationYear: 2027,
    experience: '1-2 years',
    location: 'Mumbai, India',
    availability: 'Available in 2 weeks',
    workPreference: 'Hybrid',
    externalProfiles: [
      { name: 'GitHub', handle: 'rahulsharma' },
      { name: 'LinkedIn', handle: 'rahulsharma' },
      { name: 'CodeChef', handle: 'rahulsharma' },
      { name: 'Portfolio', handle: 'rahulsharma.dev' },
    ],
    matchReasons: ['Matches 3 of 4 required skills', '3 highly relevant projects', 'National hackathon winner', 'Very active GitHub profile', 'Strong frontend expertise'],
  },
  {
    id: 'c3',
    name: 'Sneha Patil',
    username: 'snehapatil',
    initials: 'SP',
    gradient: 'from-success-500 to-success-700',
    role: 'Full Stack Developer',
    domain: 'Web Development',
    skills: ['React', 'Node.js', 'MongoDB', 'Python', 'Docker', 'AWS'],
    requiredSkillsMatch: [
      { skill: 'React', matched: true },
      { skill: 'Node.js', matched: true },
      { skill: 'MongoDB', matched: true },
      { skill: 'REST APIs', matched: true },
    ],
    overallMatch: 92,
    matchBreakdown: { skillMatch: 95, projectRelevance: 90, hackathonEvidence: 86, hackathonLevel: 85, experienceMatch: 92, githubActivity: 84, reputation: 87 },
    projects: [
      { name: 'MedSync Portal', description: 'Healthcare appointment scheduling with AI triage.', techStack: ['React', 'Python', 'FastAPI', 'PostgreSQL'], github: 'github.com/sneha/medsync', demo: 'medsync-demo.app', contribution: 'Full Stack Developer' },
      { name: 'CloudDeploy', description: 'One-click cloud deployment platform for static sites.', techStack: ['React', 'Node.js', 'Docker', 'AWS'], github: 'github.com/sneha/clouddeploy', contribution: 'Solo Developer' },
    ],
    hackathons: [
      { name: 'Smart India Hackathon 2025', level: 'National', result: 'Finalist', verified: true, date: 'Jul 2025' },
      { name: 'HealthTech Innovation 2025', level: 'State', result: 'Winner', verified: true, date: 'May 2025' },
      { name: 'AI Innovation Challenge', level: 'National', result: 'Participant', verified: true, date: 'Jan 2026' },
    ],
    atsScore: 84,
    githubCommits: 612,
    githubRepos: 9,
    githubActivity: 'Active',
    reputation: 87,
    reputationBreakdown: { teamReliability: 88, projectContribution: 86, communication: 85, submissionReliability: 89 },
    graduationYear: 2026,
    experience: '1-2 years',
    location: 'Bangalore, India',
    availability: 'Available immediately',
    workPreference: 'Remote',
    externalProfiles: [
      { name: 'GitHub', handle: 'snehapatil' },
      { name: 'LinkedIn', handle: 'snehapatil' },
      { name: 'LeetCode', handle: 'snehapatil' },
    ],
    matchReasons: ['Matches all required skills', '2 relevant full-stack projects', 'State hackathon winner', 'AWS and Docker experience', 'Available immediately'],
  },
  {
    id: 'c4',
    name: 'Amit Kulkarni',
    username: 'amitkulkarni',
    initials: 'AK',
    gradient: 'from-warning-500 to-warning-700',
    role: 'Backend Developer',
    domain: 'Web Development',
    skills: ['Node.js', 'MongoDB', 'Python', 'Java', 'Spring Boot', 'AWS'],
    requiredSkillsMatch: [
      { skill: 'React', matched: false },
      { skill: 'Node.js', matched: true },
      { skill: 'MongoDB', matched: true },
      { skill: 'REST APIs', matched: true },
    ],
    overallMatch: 90,
    matchBreakdown: { skillMatch: 88, projectRelevance: 89, hackathonEvidence: 84, hackathonLevel: 82, experienceMatch: 91, githubActivity: 80, reputation: 85 },
    projects: [
      { name: 'API Gateway Pro', description: 'High-performance API gateway with rate limiting and auth.', techStack: ['Node.js', 'Redis', 'Docker', 'AWS'], github: 'github.com/amit/api-gateway-pro', contribution: 'Solo Developer' },
      { name: 'MedSync Portal', description: 'Healthcare appointment scheduling with AI triage.', techStack: ['React', 'Python', 'FastAPI', 'PostgreSQL'], github: 'github.com/teamdelta/medsync', contribution: 'Backend Developer' },
    ],
    hackathons: [
      { name: 'Smart India Hackathon 2025', level: 'National', result: 'Participant', verified: true, date: 'Jul 2025' },
      { name: 'FinTech Buildathon 2025', level: 'National', result: 'Participant', verified: true, date: 'Nov 2025' },
      { name: 'Inter-College CodeFest 2024', level: 'Inter-College', result: 'Winner', verified: true, date: 'Mar 2024' },
    ],
    atsScore: 81,
    githubCommits: 445,
    githubRepos: 7,
    githubActivity: 'Moderate',
    reputation: 85,
    reputationBreakdown: { teamReliability: 86, projectContribution: 84, communication: 82, submissionReliability: 88 },
    graduationYear: 2026,
    experience: '2-3 years',
    location: 'Pune, India',
    availability: 'Available in 1 month',
    workPreference: 'On-site',
    externalProfiles: [
      { name: 'GitHub', handle: 'amitkulkarni' },
      { name: 'LinkedIn', handle: 'amitkulkarni' },
    ],
    matchReasons: ['Matches 3 of 4 required skills', '2 backend-focused projects', 'Inter-college hackathon winner', 'Strong backend and AWS skills', 'Solid reputation'],
  },
  {
    id: 'c5',
    name: 'Neha Joshi',
    username: 'nehajoshi',
    initials: 'NJ',
    gradient: 'from-brand-400 to-brand-600',
    role: 'Software Developer',
    domain: 'FinTech',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
    requiredSkillsMatch: [
      { skill: 'React', matched: true },
      { skill: 'Node.js', matched: true },
      { skill: 'MongoDB', matched: true },
      { skill: 'REST APIs', matched: false },
    ],
    overallMatch: 88,
    matchBreakdown: { skillMatch: 90, projectRelevance: 86, hackathonEvidence: 82, hackathonLevel: 80, experienceMatch: 87, githubActivity: 78, reputation: 83 },
    projects: [
      { name: 'PaySplit', description: 'Split payments app with UPI integration.', techStack: ['React', 'Node.js', 'MongoDB', 'TypeScript'], github: 'github.com/neha/paysplit', demo: 'paysplit.app', contribution: 'Solo Developer' },
      { name: 'BudgetFlow', description: 'Personal finance tracker with ML insights.', techStack: ['React', 'Python', 'FastAPI', 'PostgreSQL'], github: 'github.com/neha/budgetflow', contribution: 'Full Stack Developer' },
    ],
    hackathons: [
      { name: 'FinTech Buildathon 2025', level: 'National', result: 'Finalist', verified: true, date: 'Nov 2025' },
      { name: 'College Hack Day 2024', level: 'College', result: 'Winner', verified: true, date: 'Oct 2024' },
    ],
    atsScore: 83,
    githubCommits: 389,
    githubRepos: 8,
    githubActivity: 'Moderate',
    reputation: 83,
    reputationBreakdown: { teamReliability: 84, projectContribution: 82, communication: 80, submissionReliability: 86 },
    graduationYear: 2027,
    experience: '0-1 years',
    location: 'Hyderabad, India',
    availability: 'Available immediately',
    workPreference: 'Remote',
    externalProfiles: [
      { name: 'GitHub', handle: 'nehajoshi' },
      { name: 'LinkedIn', handle: 'nehajoshi' },
      { name: 'Portfolio', handle: 'nehajoshi.dev' },
    ],
    matchReasons: ['Matches 3 of 4 required skills', '2 FinTech projects', 'National hackathon finalist', 'TypeScript and AWS experience', 'Available immediately'],
  },
  {
    id: 'c6',
    name: 'Karthik Rao',
    username: 'karthikrao',
    initials: 'KR',
    gradient: 'from-warning-500 to-warning-700',
    role: 'ML Engineer',
    domain: 'AI/ML',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Flask', 'Docker'],
    requiredSkillsMatch: [
      { skill: 'React', matched: false },
      { skill: 'Node.js', matched: false },
      { skill: 'MongoDB', matched: false },
      { skill: 'REST APIs', matched: true },
    ],
    overallMatch: 72,
    matchBreakdown: { skillMatch: 65, projectRelevance: 78, hackathonEvidence: 92, hackathonLevel: 94, experienceMatch: 80, githubActivity: 86, reputation: 88 },
    projects: [
      { name: 'AI Crop Disease Detection', description: 'ML-powered app that detects crop diseases from photos.', techStack: ['Python', 'TensorFlow', 'Flask', 'React'], github: 'github.com/teamalpha/crop-disease', contribution: 'ML Engineer' },
      { name: 'Smart Traffic AI', description: 'Computer vision traffic optimization system.', techStack: ['Python', 'OpenCV', 'TensorFlow', 'Flask'], github: 'github.com/teamalpha/smart-traffic', contribution: 'ML Lead' },
    ],
    hackathons: [
      { name: 'GreenTech Hack 2025', level: 'International', result: 'Winner', verified: true, date: 'Sep 2025' },
      { name: 'Smart India Hackathon 2025', level: 'National', result: 'Winner', verified: true, date: 'Jul 2025' },
      { name: 'AI Innovation Challenge', level: 'National', result: 'Finalist', verified: true, date: 'Jan 2026' },
    ],
    atsScore: 79,
    githubCommits: 678,
    githubRepos: 11,
    githubActivity: 'Active',
    reputation: 88,
    reputationBreakdown: { teamReliability: 89, projectContribution: 90, communication: 84, submissionReliability: 89 },
    graduationYear: 2025,
    experience: '2-3 years',
    location: 'Chennai, India',
    availability: 'Available in 2 weeks',
    workPreference: 'Remote',
    externalProfiles: [
      { name: 'GitHub', handle: 'karthikrao' },
      { name: 'LinkedIn', handle: 'karthikrao' },
      { name: 'LeetCode', handle: 'karthikrao' },
    ],
    matchReasons: ['International hackathon winner', '2 ML-focused projects', 'Very active GitHub profile', 'Strong reputation (88/100)', 'Best matched for ML roles'],
  },
];

export const invitations: Invitation[] = [
  { id: 'i1', candidateId: 'c1', candidateName: 'Pavan Mali', candidateInitials: 'PM', candidateGradient: 'from-brand-500 to-brand-700', role: 'Software Developer Intern', match: 96, sentDate: '09 Sep 2026', status: 'Accepted', message: 'We would like to invite you for an interview. Your hackathon projects align perfectly with what we are building.' },
  { id: 'i2', candidateId: 'c2', candidateName: 'Rahul Sharma', candidateInitials: 'RS', candidateGradient: 'from-cyan-500 to-cyan-700', role: 'Software Developer Intern', match: 94, sentDate: '09 Sep 2026', status: 'Pending', message: 'We reviewed your profile on Hack-Meet and believe your skills are a strong match for our Software Developer Intern opportunity.' },
  { id: 'i3', candidateId: 'c3', candidateName: 'Sneha Patil', candidateInitials: 'SP', candidateGradient: 'from-success-500 to-success-700', role: 'Full Stack Developer', match: 92, sentDate: '07 Sep 2026', status: 'Accepted', message: 'Your full-stack experience is impressive. We would love to discuss an opportunity with our team.' },
  { id: 'i4', candidateId: 'c4', candidateName: 'Amit Kulkarni', candidateInitials: 'AK', candidateGradient: 'from-warning-500 to-warning-700', role: 'Software Developer Intern', match: 90, sentDate: '05 Sep 2026', status: 'Declined', message: 'We would like to invite you for an interview for the Software Developer Intern role.' },
  { id: 'i5', candidateId: 'c5', candidateName: 'Neha Joshi', candidateInitials: 'NJ', candidateGradient: 'from-brand-400 to-brand-600', role: 'Software Developer Intern', match: 88, sentDate: '03 Sep 2026', status: 'Sent', message: 'We reviewed your profile and would like to invite you to the next stage of our hiring process.' },
  { id: 'i6', candidateId: 'c6', candidateName: 'Karthik Rao', candidateInitials: 'KR', candidateGradient: 'from-warning-500 to-warning-700', role: 'ML Engineer', match: 88, sentDate: '01 Sep 2026', status: 'Accepted', message: 'Your ML expertise caught our attention. We would love to discuss an ML Engineer role with you.' },
];

export const candidateGroups: CandidateGroup[] = [
  { id: 'g1', name: '2027 Software Developer Intern', role: 'Software Developer Intern', candidateCount: 10, createdDate: '10 Sep 2026', status: 'Invitation Pending', message: 'Hello, we reviewed your profile on Hack-Meet and believe your skills are a strong match for our Software Developer Intern opportunity. We would like to invite you to the next stage of our hiring process.', candidateIds: ['c1', 'c2', 'c3', 'c5'] },
  { id: 'g2', name: 'Full Stack Developers — Pune', role: 'Full Stack Developer', candidateCount: 6, createdDate: '05 Sep 2026', status: 'Active', message: 'We have an exciting Full Stack opportunity that matches your profile. Would love to connect.', candidateIds: ['c3', 'c4'] },
  { id: 'g3', name: 'ML Engineer Shortlist', role: 'ML Engineer', candidateCount: 4, createdDate: '28 Aug 2026', status: 'Invitation Sent', message: 'Your ML expertise stood out to us. We would like to invite you for a technical discussion.', candidateIds: ['c6'] },
];

export const savedSearches: SavedSearch[] = [
  { id: 'ss1', name: '2027 React Developers', filters: [{ label: 'Graduation', value: '2027' }, { label: 'Skills', value: 'React, Node.js' }, { label: 'Hackathon', value: 'Winner' }, { label: 'Reputation', value: '80+' }], createdDate: '08 Sep 2026', resultsCount: 342 },
  { id: 'ss2', name: 'International Winners — India', filters: [{ label: 'Hackathon Level', value: 'International' }, { label: 'Result', value: 'Winner' }, { label: 'Location', value: 'India' }], createdDate: '03 Sep 2026', resultsCount: 56 },
  { id: 'ss3', name: 'High Reputation Full Stack', filters: [{ label: 'Domain', value: 'Web Development' }, { label: 'Reputation', value: '85+' }, { label: 'ATS', value: '80+' }], createdDate: '28 Aug 2026', resultsCount: 128 },
];

export const defaultMatchWeights = [
  { label: 'Required Skills', weight: 40, key: 'skillMatch' },
  { label: 'Project Relevance', weight: 20, key: 'projectRelevance' },
  { label: 'Hackathon Achievement', weight: 15, key: 'hackathonEvidence' },
  { label: 'Hackathon Level', weight: 10, key: 'hackathonLevel' },
  { label: 'Experience', weight: 5, key: 'experienceMatch' },
  { label: 'GitHub Activity', weight: 5, key: 'githubActivity' },
  { label: 'Reputation', weight: 5, key: 'reputation' },
];

export const allFilterSkills = ['React', 'Node.js', 'Python', 'Java', 'AWS', 'MongoDB', 'TypeScript', 'Docker', 'PostgreSQL', 'TensorFlow', 'PyTorch', 'Next.js', 'Tailwind', 'GraphQL', 'Redis', 'Kubernetes'];

export const allFilterDomains = ['AI/ML', 'Web Development', 'FinTech', 'Cybersecurity', 'Cloud', 'Blockchain', 'IoT', 'Healthcare'];

export const recruiterMessages = [
  { id: 'msg1', conversation: 'Pavan Mali', username: 'pavanmali', initials: 'PM', gradient: 'from-brand-500 to-brand-700', lastMessage: 'Thank you for the invitation! I would love to discuss...', time: '1h ago', unread: true, type: 'candidate' as const },
  { id: 'msg2', conversation: 'Rahul Sharma', username: 'rahulsharma', initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', lastMessage: 'Hi Priya, I am available for an interview next week.', time: '3h ago', unread: true, type: 'candidate' as const },
  { id: 'msg3', conversation: '2027 Software Developer Intern', username: '', initials: 'GR', gradient: 'from-success-500 to-success-700', lastMessage: 'Group invitation sent to 10 candidates', time: '5h ago', unread: false, type: 'group' as const },
  { id: 'msg4', conversation: 'Sneha Patil', username: 'snehapatil', initials: 'SP', gradient: 'from-success-500 to-success-700', lastMessage: 'I accept the invitation. Looking forward to the interview!', time: '1d ago', unread: false, type: 'candidate' as const },
  { id: 'msg5', conversation: 'ML Engineer Shortlist', username: '', initials: 'GR', gradient: 'from-warning-500 to-warning-700', lastMessage: 'Group invitation sent to 4 candidates', time: '2d ago', unread: false, type: 'group' as const },
];

export const takenUsernames: string[] = [
  'pavanmali', 'rahulsharma', 'snehapatil', 'amitkulkarni', 'nehajoshi', 'karthikrao',
  'priyadeshmukh', 'techNova', 'arjunnair', 'rajeshkumar', 'ananyaiyer', 'karanmalhotra',
  'sahilverma', 'vikramjoshi', 'snehareddy', 'amitpatel', 'priyasharma',
];

export function isUsernameAvailable(username: string): boolean {
  const normalized = username.toLowerCase().trim();
  if (!normalized || normalized.length < 3) return false;
  return !takenUsernames.some((u) => u.toLowerCase() === normalized);
}
