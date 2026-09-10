export interface Teammate {
  name: string;
  initials: string;
  gradient: string;
  compatibility: number;
  skillComplement: number;
  domainMatch: number;
  availability: number;
  commitment: number;
  skills: string[];
  githubActivity: string;
  projects: number;
  hackathons: number;
  wins: number;
  badges: string[];
  availabilityStatus: string;
}

export type HackathonLevel = 'National' | 'International' | 'State' | 'Inter-College';
export type HackathonEligibility = 'Students Only' | 'Working Professionals Only' | 'Both';

export interface Hackathon {
  title: string;
  organizer: string;
  prize: string;
  mode: string;
  deadline: string;
  registration: number;
  maxRegistration: number;
  teamSize: string;
  tags: string[];
  verified: boolean;
  gradient: string;
  relevance?: number;
  status?: string;
  level?: HackathonLevel;
  eligibility?: HackathonEligibility;
}

export interface Project {
  name: string;
  description: string;
  team: string;
  techStack: string[];
  github: string;
  liveDemo?: string;
  status: 'Active' | 'Completed';
  progress: number;
  winner?: boolean;
  gradient: string;
}

export interface RecruiterInvitation {
  role: string;
  company: string;
  match: number;
  skillMatch: number;
  projectMatch: number;
  reputationMatch: number;
  message: string;
  premium?: boolean;
  locked?: boolean;
}

export interface NotificationItem {
  id: string;
  category: 'Hackathons' | 'Teams' | 'Recruiters' | 'System';
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

export const currentUser = {
  name: 'Pavan Mali',
  initials: 'PM',
  role: 'Software Developer',
  reputation: 91,
  atsScore: 86,
  gradient: 'from-brand-500 to-brand-700',
};

export const stats = [
  { label: 'Hackathons Completed', value: 6, trend: '+2 this year', trendUp: true, icon: 'Trophy', color: 'from-warning-400 to-warning-600' },
  { label: 'Wins', value: 2, trend: '+1 this year', trendUp: true, icon: 'Star', color: 'from-brand-500 to-brand-700' },
  { label: 'Projects', value: 8, trend: '+3 this year', trendUp: true, icon: 'Rocket', color: 'from-cyan-400 to-cyan-600' },
  { label: 'Reputation', value: 91, suffix: '/100', trend: '+5 pts', trendUp: true, icon: 'Award', color: 'from-success-400 to-success-600' },
];

export const currentHackathon = {
  title: 'AI Innovation Hackathon 2026',
  status: 'Active',
  team: 'Team Alpha',
  progress: 72,
  deadline: '4 Days Remaining',
  project: 'AI Crop Disease Detection',
  milestone: 'ML Model Integration',
  members: [
    { initials: 'PM', gradient: 'from-brand-500 to-brand-700', name: 'Pavan Mali' },
    { initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', name: 'Rahul Sharma' },
    { initials: 'AK', gradient: 'from-success-500 to-success-700', name: 'Ananya Gupta' },
    { initials: 'NS', gradient: 'from-warning-500 to-warning-700', name: 'Neha Singh' },
  ],
};

export const recommendedHackathons: Hackathon[] = [
  {
    title: 'AI Innovation Challenge',
    organizer: 'Tech University Mumbai',
    prize: '₹2,00,000',
    mode: 'Online',
    deadline: '12 days left',
    registration: 312,
    maxRegistration: 500,
    teamSize: '2–4',
    tags: ['AI', 'GenAI', 'ML'],
    verified: true,
    gradient: 'from-brand-500 to-brand-700',
    relevance: 94,
    level: 'National',
    eligibility: 'Both',
  },
  {
    title: 'FinTech Buildathon',
    organizer: 'FinTech Society India',
    prize: '₹1,50,000',
    mode: 'Online',
    deadline: '8 days left',
    registration: 198,
    maxRegistration: 300,
    teamSize: '2–4',
    tags: ['FinTech', 'Payments', 'API'],
    verified: true,
    gradient: 'from-cyan-500 to-cyan-700',
    relevance: 88,
    level: 'National',
    eligibility: 'Both',
  },
  {
    title: 'GreenTech Hack',
    organizer: 'Climate Action Org',
    prize: '₹1,00,000',
    mode: 'Hybrid',
    deadline: '20 days left',
    registration: 145,
    maxRegistration: 250,
    teamSize: '1–5',
    tags: ['Climate', 'Sustainability', 'IoT'],
    verified: true,
    gradient: 'from-success-500 to-success-700',
    relevance: 82,
    level: 'International',
    eligibility: 'Both',
  },
  {
    title: 'Web3 Build Sprint',
    organizer: 'Blockchain Dev Community',
    prize: '₹3,00,000',
    mode: 'Online',
    deadline: '5 days left',
    registration: 421,
    maxRegistration: 600,
    teamSize: '1–5',
    tags: ['Blockchain', 'Web3', 'Solidity'],
    verified: false,
    gradient: 'from-warning-500 to-warning-700',
    relevance: 76,
    level: 'National',
    eligibility: 'Both',
  },
  {
    title: 'HealthTech Innovation',
    organizer: 'MedTech Foundation',
    prize: '₹2,50,000',
    mode: 'Hybrid',
    deadline: '15 days left',
    registration: 267,
    maxRegistration: 400,
    teamSize: '2–4',
    tags: ['Healthcare', 'AI', 'Data'],
    verified: true,
    gradient: 'from-brand-600 to-cyan-600',
    relevance: 90,
    level: 'State',
    eligibility: 'Students Only',
  },
  {
    title: 'Smart India Hackathon',
    organizer: 'Govt of India',
    prize: '₹5,00,000',
    mode: 'Hybrid',
    deadline: '25 days left',
    registration: 892,
    maxRegistration: 1000,
    teamSize: '4–6',
    tags: ['Govt', 'Innovation', 'PSUs'],
    verified: true,
    gradient: 'from-success-600 to-brand-600',
    relevance: 85,
    level: 'National',
    eligibility: 'Both',
  },
];

export const recommendedTeammates: Teammate[] = [
  {
    name: 'Rahul Sharma',
    initials: 'RS',
    gradient: 'from-cyan-500 to-cyan-700',
    compatibility: 94,
    skillComplement: 96,
    domainMatch: 91,
    availability: 95,
    commitment: 100,
    skills: ['React', 'Next.js', 'TypeScript', 'Figma'],
    githubActivity: 'Active',
    projects: 12,
    hackathons: 8,
    wins: 3,
    badges: ['Consistent Builder', 'Reliable Teammate'],
    availabilityStatus: 'Available now',
  },
  {
    name: 'Ananya Gupta',
    initials: 'AG',
    gradient: 'from-success-500 to-success-700',
    compatibility: 88,
    skillComplement: 89,
    domainMatch: 85,
    availability: 92,
    commitment: 90,
    skills: ['UI/UX', 'Figma', 'Tailwind', 'React'],
    githubActivity: 'Moderate',
    projects: 9,
    hackathons: 5,
    wins: 1,
    badges: ['Top Collaborator'],
    availabilityStatus: 'Available weekends',
  },
  {
    name: 'Karthik Rao',
    initials: 'KR',
    gradient: 'from-warning-500 to-warning-700',
    compatibility: 82,
    skillComplement: 78,
    domainMatch: 80,
    availability: 85,
    commitment: 88,
    skills: ['ML', 'Python', 'TensorFlow', 'PyTorch'],
    githubActivity: 'Active',
    projects: 15,
    hackathons: 7,
    wins: 2,
    badges: ['Hackathon Winner', 'Consistent Builder'],
    availabilityStatus: 'Available evenings',
  },
  {
    name: 'Neha Singh',
    initials: 'NS',
    gradient: 'from-brand-500 to-brand-700',
    compatibility: 79,
    skillComplement: 82,
    domainMatch: 75,
    availability: 80,
    commitment: 85,
    skills: ['React', 'Redux', 'Node.js', 'MongoDB'],
    githubActivity: 'Moderate',
    projects: 7,
    hackathons: 4,
    wins: 0,
    badges: ['Reliable Teammate'],
    availabilityStatus: 'Available now',
  },
];

export const recruiterInvitations: RecruiterInvitation[] = [
  {
    role: 'Software Developer Intern',
    company: 'ABC Technologies',
    match: 94,
    skillMatch: 97,
    projectMatch: 93,
    reputationMatch: 91,
    message: 'We would like to invite you for an interview. Your hackathon projects align perfectly with what we are building.',
  },
  {
    role: 'Full Stack Developer',
    company: 'TechCorp Solutions',
    match: 89,
    skillMatch: 92,
    projectMatch: 87,
    reputationMatch: 88,
    message: 'Your proof-of-skill profile stood out to us. We would love to discuss an opportunity with our team.',
  },
  {
    role: 'AI Engineer',
    company: 'Premium Company',
    match: 96,
    skillMatch: 95,
    projectMatch: 94,
    reputationMatch: 93,
    message: 'We have an exciting role that matches your skills perfectly.',
    premium: true,
    locked: true,
  },
];

export const projects: Project[] = [
  {
    name: 'AI Crop Disease Detection',
    description: 'ML-powered app that detects crop diseases from photos and suggests treatments.',
    team: 'Team Alpha',
    techStack: ['React', 'Node.js', 'Python', 'TensorFlow'],
    github: 'github.com/teamalpha/crop-disease',
    liveDemo: 'crop-disease-demo.app',
    status: 'Active',
    progress: 72,
    gradient: 'from-brand-500 to-brand-700',
  },
  {
    name: 'FinFlow Dashboard',
    description: 'Real-time financial analytics dashboard with predictive insights.',
    team: 'Team Beta',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    github: 'github.com/teambeta/finflow',
    liveDemo: 'finflow-demo.app',
    status: 'Completed',
    progress: 100,
    winner: true,
    gradient: 'from-cyan-500 to-cyan-700',
  },
  {
    name: 'GreenTrack IoT',
    description: 'IoT-based carbon footprint tracker for smart buildings.',
    team: 'Team Gamma',
    techStack: ['React', 'Node.js', 'MongoDB', 'MQTT'],
    github: 'github.com/teamgamma/greentrack',
    status: 'Completed',
    progress: 100,
    gradient: 'from-success-500 to-success-700',
  },
  {
    name: 'MedSync Portal',
    description: 'Healthcare appointment scheduling with AI triage.',
    team: 'Team Delta',
    techStack: ['React', 'Python', 'FastAPI', 'PostgreSQL'],
    github: 'github.com/teamdelta/medsync',
    liveDemo: 'medsync-demo.app',
    status: 'Active',
    progress: 45,
    gradient: 'from-warning-500 to-warning-700',
  },
  {
    name: 'EduChain Cert',
    description: 'Blockchain-based certificate verification for colleges.',
    team: 'Team Beta',
    techStack: ['Next.js', 'Solidity', 'Web3.js', 'Node.js'],
    github: 'github.com/teambeta/educhain',
    status: 'Completed',
    progress: 100,
    winner: true,
    gradient: 'from-brand-600 to-cyan-600',
  },
  {
    name: 'Smart Traffic AI',
    description: 'Computer vision traffic optimization system for urban intersections.',
    team: 'Team Alpha',
    techStack: ['Python', 'OpenCV', 'TensorFlow', 'Flask'],
    github: 'github.com/teamalpha/smart-traffic',
    status: 'Completed',
    progress: 100,
    gradient: 'from-success-600 to-brand-600',
  },
];

export const myTeams = [
  {
    name: 'Team Alpha',
    project: 'AI Crop Disease Detection',
    members: 4,
    maxMembers: 4,
    progress: 72,
    techStack: ['React', 'Node.js', 'Python', 'TensorFlow'],
    gradient: 'from-brand-500 to-brand-700',
    hackathon: 'AI Innovation Hackathon 2026',
    status: 'Active',
  },
  {
    name: 'Team Delta',
    project: 'MedSync Portal',
    members: 3,
    maxMembers: 4,
    progress: 45,
    techStack: ['React', 'Python', 'FastAPI', 'PostgreSQL'],
    gradient: 'from-warning-500 to-warning-700',
    hackathon: 'HealthTech Innovation',
    status: 'Active',
  },
];

export const pendingInvites = [
  { team: 'Team Beta', project: 'FinFlow Dashboard', from: 'Rahul Sharma', time: '2h ago' },
  { team: 'Team Gamma', project: 'GreenTrack IoT', from: 'Ananya Gupta', time: '5h ago' },
];

export const notifications: NotificationItem[] = [
  { id: '1', category: 'Hackathons', title: 'New announcement', description: 'AI Innovation Hackathon 2026 posted a new announcement: "Submission deadline extended by 2 days"', time: '15m ago', unread: true },
  { id: '2', category: 'Teams', title: 'Team invitation accepted', description: 'Neha Singh accepted your invitation to join Team Alpha', time: '1h ago', unread: true },
  { id: '3', category: 'Hackathons', title: 'Submission deadline reminder', description: 'AI Innovation Hackathon 2026 submission due in 4 days', time: '3h ago', unread: true },
  { id: '4', category: 'Recruiters', title: 'Recruiter viewed your profile', description: 'A recruiter from ABC Technologies viewed your profile', time: '5h ago', unread: true },
  { id: '5', category: 'Recruiters', title: 'Interview invitation', description: 'ABC Technologies invited you for an interview — Software Developer Intern', time: '8h ago', unread: true },
  { id: '6', category: 'System', title: 'Reputation updated', description: 'Your reputation score increased by 2 points', time: '1d ago', unread: false },
  { id: '7', category: 'Teams', title: 'New team invitation', description: 'Rahul Sharma invited you to join Team Beta for FinFlow Dashboard', time: '2d ago', unread: false },
  { id: '8', category: 'Hackathons', title: 'Hackathon result published', description: 'FinTech Buildathon results are out — your team placed 2nd', time: '3d ago', unread: false },
];

export const userSkills = [
  { name: 'React', proficiency: 96 },
  { name: 'Node.js', proficiency: 91 },
  { name: 'Python', proficiency: 87 },
  { name: 'AWS', proficiency: 78 },
  { name: 'MongoDB', proficiency: 84 },
  { name: 'TypeScript', proficiency: 89 },
];

export const externalProfiles = [
  { name: 'GitHub', handle: 'pavanmali', icon: 'Github' },
  { name: 'LinkedIn', handle: 'pavanmali', icon: 'Linkedin' },
  { name: 'LeetCode', handle: 'pavanmali', icon: 'Code' },
  { name: 'CodeChef', handle: 'pavanmali', icon: 'Trophy' },
  { name: 'Portfolio', handle: 'pavanmali.dev', icon: 'Globe' },
];

export const hackathonHistory = [
  { name: 'AI Innovation Hackathon 2026', date: 'Jan 2026', result: 'In Progress', winner: false },
  { name: 'FinTech Buildathon 2025', date: 'Nov 2025', result: '2nd Place', winner: true },
  { name: 'GreenTech Hack 2025', date: 'Sep 2025', result: 'Participated', winner: false },
  { name: 'Smart India Hackathon 2025', date: 'Jul 2025', result: 'Winner', winner: true },
  { name: 'HealthTech Innovation 2025', date: 'May 2025', result: 'Participated', winner: false },
  { name: 'Web3 Build Sprint 2024', date: 'Dec 2024', result: 'Participated', winner: false },
];

export const userBadges = [
  { name: 'Hackathon Winner', icon: 'Trophy', color: 'from-warning-400 to-warning-600' },
  { name: 'Consistent Builder', icon: 'Rocket', color: 'from-brand-500 to-brand-700' },
  { name: 'Reliable Teammate', icon: 'Handshake', color: 'from-success-400 to-success-600' },
  { name: 'Top Collaborator', icon: 'Users', color: 'from-cyan-400 to-cyan-600' },
];

export const communityChannels = [
  { name: 'general', type: 'text', active: true },
  { name: 'faq', type: 'text' },
  { name: 'find-members', type: 'text' },
  { name: 'team-formation', type: 'text' },
  { name: 'ai-discussion', type: 'text' },
  { name: 'frontend-discussion', type: 'text' },
];

export const communityMessages = [
  { initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', name: 'Rahul Sharma', time: '10:32 AM', text: 'Hey everyone! Looking for a frontend dev for the AI Innovation Challenge. Anyone interested?', role: 'member' },
  { initials: 'AG', gradient: 'from-success-500 to-success-700', name: 'Ananya Gupta', time: '10:35 AM', text: 'I am! I have been working with React and Tailwind for the last 2 years.', role: 'member' },
  { initials: 'PM', gradient: 'from-brand-500 to-brand-700', name: 'Pavan Mali', time: '10:38 AM', text: 'We could use a backend person too. Our team needs someone with Node.js experience.', role: 'member' },
  { initials: 'KR', gradient: 'from-warning-500 to-warning-700', name: 'Karthik Rao', time: '10:42 AM', text: 'I can help with ML side of things. Working on a crop disease detection model right now.', role: 'moderator' },
  { initials: 'NS', gradient: 'from-brand-500 to-brand-700', name: 'Neha Singh', time: '10:45 AM', text: 'Just joined the platform. This community looks really active!', role: 'member' },
  { initials: 'KR', gradient: 'from-warning-500 to-warning-700', name: 'Karthik Rao', time: '10:48 AM', text: 'Welcome Neha! Check out the find-members channel for team opportunities.', role: 'moderator' },
];

export const communityMembers = [
  { initials: 'KR', gradient: 'from-warning-500 to-warning-700', name: 'Karthik Rao', role: 'Moderator', status: 'online' },
  { initials: 'PM', gradient: 'from-brand-500 to-brand-700', name: 'Pavan Mali', role: 'Member', status: 'online' },
  { initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', name: 'Rahul Sharma', role: 'Member', status: 'online' },
  { initials: 'AG', gradient: 'from-success-500 to-success-700', name: 'Ananya Gupta', role: 'Member', status: 'online' },
  { initials: 'NS', gradient: 'from-brand-500 to-brand-700', name: 'Neha Singh', role: 'Member', status: 'idle' },
  { initials: 'VK', gradient: 'from-cyan-500 to-cyan-700', name: 'Vikram Kumar', role: 'Member', status: 'offline' },
];

export interface KanbanTask {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  assignee: string;
  gradient: string;
}

export const initialKanbanTasks: KanbanTask[] = [
  { id: 't1', title: 'API Development', status: 'To Do', assignee: 'PM', gradient: 'from-brand-500 to-brand-700' },
  { id: 't2', title: 'Dashboard UI', status: 'To Do', assignee: 'AG', gradient: 'from-success-500 to-success-700' },
  { id: 't3', title: 'ML Model Training', status: 'In Progress', assignee: 'KR', gradient: 'from-warning-500 to-warning-700' },
  { id: 't4', title: 'Frontend Integration', status: 'In Progress', assignee: 'RS', gradient: 'from-cyan-500 to-cyan-700' },
  { id: 't5', title: 'Deployment Setup', status: 'Completed', assignee: 'NS', gradient: 'from-brand-500 to-brand-700' },
  { id: 't6', title: 'Database Schema', status: 'Completed', assignee: 'PM', gradient: 'from-brand-500 to-brand-700' },
];

export const teamMembers = [
  { initials: 'PM', name: 'Pavan Mali', role: 'Full Stack Lead', gradient: 'from-brand-500 to-brand-700', isLeader: true, contribution: 32 },
  { initials: 'RS', name: 'Rahul Sharma', role: 'Frontend Developer', gradient: 'from-cyan-500 to-cyan-700', isLeader: false, contribution: 28 },
  { initials: 'AG', name: 'Ananya Gupta', role: 'ML Engineer', gradient: 'from-success-500 to-success-700', isLeader: false, contribution: 25 },
  { initials: 'NS', name: 'Neha Singh', role: 'Product Designer', gradient: 'from-warning-500 to-warning-700', isLeader: false, contribution: 15 },
];

export const hackathonFAQ = [
  { q: 'What is the submission deadline?', a: 'The final submission deadline is January 25, 2026, 11:59 PM IST. Late submissions will not be accepted.' },
  { q: 'How many members can a team have?', a: 'Each team can have 2 to 4 members. Solo participation is not allowed for this hackathon.' },
  { q: 'What technologies are allowed?', a: 'You may use any technology stack. Pre-trained models are allowed if properly attributed in your submission.' },
  { q: 'Will there be mentors available?', a: 'Yes, mentors will be available throughout the hackathon via the discussion channels. Tag @mentor for help.' },
  { q: 'How are projects judged?', a: 'Projects are judged on innovation (30%), technical complexity (25%), impact (25%), and presentation (20%).' },
  { q: 'Is there a participation certificate?', a: 'Yes, all participants who submit a project will receive a digital certificate of participation.' },
];

export const hackathonDiscussions = [
  { initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', name: 'Rahul Sharma', time: '2h ago', text: 'Has anyone found a good dataset for crop disease images? Looking for suggestions.', replies: 3 },
  { initials: 'KR', gradient: 'from-warning-500 to-warning-700', name: 'Karthik Rao', time: '1h ago', text: 'Check out the PlantVillage dataset on Kaggle — 50K+ labeled leaf images across 14 crop species.', replies: 1 },
  { initials: 'AG', gradient: 'from-success-500 to-success-700', name: 'Ananya Gupta', time: '30m ago', text: 'What is everyone using for the frontend? React or Next.js for this one?', replies: 2 },
];

export interface HackathonGroup {
  id: string;
  name: string;
  icon: 'faq' | 'users' | 'chat' | 'feedback' | 'custom';
  isDefault: boolean;
  description: string;
  createdBy: string;
}

export const hackathonGroups: HackathonGroup[] = [
  { id: 'g-faq', name: 'FAQ', icon: 'faq', isDefault: true, description: 'Frequently asked questions and answers about this hackathon.', createdBy: 'Organizer' },
  { id: 'g-find-team', name: 'Find Team Member', icon: 'users', isDefault: true, description: 'Looking for teammates? Post your skills and availability here.', createdBy: 'Organizer' },
  { id: 'g-general', name: 'General Chat', icon: 'chat', isDefault: true, description: 'General discussion about the hackathon, ideas, and announcements.', createdBy: 'Organizer' },
  { id: 'g-feedback', name: 'Feedback', icon: 'feedback', isDefault: true, description: 'Share feedback about the hackathon, judging, or organization.', createdBy: 'Organizer' },
  { id: 'g-ai-ml', name: 'AI & ML Discussion', icon: 'custom', isDefault: false, description: 'Discuss AI/ML approaches, datasets, and model architectures.', createdBy: 'Tech University Mumbai' },
  { id: 'g-mentors', name: 'Mentor Q&A', icon: 'custom', isDefault: false, description: 'Ask mentors questions and get guidance on your project.', createdBy: 'Tech University Mumbai' },
];

export const groupMessages: Record<string, { initials: string; gradient: string; name: string; time: string; text: string; role?: string }[]> = {
  'g-faq': [
    { initials: 'PM', gradient: 'from-brand-500 to-brand-700', name: 'Pavan Mali', time: '10:30 AM', text: 'Can we use pre-trained models for the submission?', role: 'member' },
    { initials: 'ORG', gradient: 'from-warning-500 to-warning-700', name: 'Organizer', time: '10:45 AM', text: 'Yes, pre-trained models are allowed if properly attributed in your submission README.', role: 'organizer' },
    { initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', name: 'Rahul Sharma', time: '11:00 AM', text: 'Is there a limit on the number of API endpoints in our project?', role: 'member' },
    { initials: 'ORG', gradient: 'from-warning-500 to-warning-700', name: 'Organizer', time: '11:10 AM', text: 'No hard limit, but keep your demo focused. Judges have 10 minutes per project.', role: 'organizer' },
  ],
  'g-find-team': [
    { initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', name: 'Rahul Sharma', time: '9:15 AM', text: 'Looking for a frontend dev! I am a backend person with Node.js and Python experience. DM me if interested.', role: 'member' },
    { initials: 'AG', gradient: 'from-success-500 to-success-700', name: 'Ananya Gupta', time: '9:30 AM', text: 'I am a UI/UX designer with Figma and React skills. Need a team of 3-4 people. Anyone?', role: 'member' },
    { initials: 'KR', gradient: 'from-warning-500 to-warning-700', name: 'Karthik Rao', time: '9:45 AM', text: 'ML engineer here — TensorFlow, PyTorch, scikit-learn. Already have a crop disease model ready. Need frontend + backend.', role: 'member' },
    { initials: 'NS', gradient: 'from-brand-500 to-brand-700', name: 'Neha Singh', time: '10:00 AM', text: 'Full stack developer, React + Node.js. Looking to join a team working on an AI project.', role: 'member' },
  ],
  'g-general': [
    { initials: 'PM', gradient: 'from-brand-500 to-brand-700', name: 'Pavan Mali', time: '8:00 AM', text: 'Morning everyone! Excited for this hackathon. What is everyone building?', role: 'member' },
    { initials: 'ORG', gradient: 'from-warning-500 to-warning-700', name: 'Organizer', time: '8:15 AM', text: 'Welcome all! Reminder: kickoff session starts at 10 AM IST on the main stage. Join early!', role: 'organizer' },
    { initials: 'AG', gradient: 'from-success-500 to-success-700', name: 'Ananya Gupta', time: '8:30 AM', text: 'Working on a crop disease detection app. Would love to hear what others are planning.', role: 'member' },
    { initials: 'KR', gradient: 'from-warning-500 to-warning-700', name: 'Karthik Rao', time: '8:45 AM', text: 'Same here! Are we allowed to use external APIs during the build phase?', role: 'member' },
    { initials: 'ORG', gradient: 'from-warning-500 to-warning-700', name: 'Organizer', time: '9:00 AM', text: 'Yes, external APIs are fine. Just list all third-party services in your submission.', role: 'organizer' },
  ],
  'g-feedback': [
    { initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', name: 'Rahul Sharma', time: '12:00 PM', text: 'The submission portal was a bit slow yesterday. Could the team look into it?', role: 'member' },
    { initials: 'ORG', gradient: 'from-warning-500 to-warning-700', name: 'Organizer', time: '12:15 PM', text: 'Thanks for flagging! We have upgraded the server capacity. Should be smooth now.', role: 'organizer' },
  ],
  'g-ai-ml': [
    { initials: 'KR', gradient: 'from-warning-500 to-warning-700', name: 'Karthik Rao', time: '11:30 AM', text: 'For crop disease detection, the PlantVillage dataset has 50K+ labeled images. ResNet50 gives ~95% accuracy.', role: 'member' },
    { initials: 'AG', gradient: 'from-success-500 to-success-700', name: 'Ananya Gupta', time: '11:45 AM', text: 'Has anyone tried transfer learning with EfficientNet? Curious about the accuracy comparison.', role: 'member' },
    { initials: 'KR', gradient: 'from-warning-500 to-warning-700', name: 'Karthik Rao', time: '12:00 PM', text: 'EfficientNet-B3 slightly outperforms ResNet50 on this dataset but is heavier to deploy. Trade-off depends on your target device.', role: 'member' },
  ],
  'g-mentors': [
    { initials: 'PM', gradient: 'from-brand-500 to-brand-700', name: 'Pavan Mali', time: '2:00 PM', text: 'Mentor question: what is the best way to structure a 10-minute demo pitch for a technical project?', role: 'member' },
    { initials: 'MT', gradient: 'from-success-500 to-success-700', name: 'Mentor (Dr. Mehta)', time: '2:20 PM', text: 'Spend 2 min on problem, 3 min on solution + architecture, 3 min on live demo, 2 min on impact + future scope. Practice the transitions!', role: 'mentor' },
  ],
};

export interface Milestone {
  name: string;
  done: boolean;
  linkedTaskKeywords: string[];
}

export const milestones: Milestone[] = [
  { name: 'Project Setup', done: true, linkedTaskKeywords: ['setup'] },
  { name: 'Database Design', done: true, linkedTaskKeywords: ['database'] },
  { name: 'API Development', done: false, linkedTaskKeywords: ['api'] },
  { name: 'ML Model Integration', done: false, linkedTaskKeywords: ['ml', 'model'] },
  { name: 'Frontend Complete', done: false, linkedTaskKeywords: ['frontend', 'dashboard', 'ui'] },
  { name: 'Testing & Deployment', done: false, linkedTaskKeywords: ['deployment', 'testing'] },
];

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

export interface ChatConversation {
  id: string;
  name: string;
  initials: string;
  gradient: string;
  status: string;
  messages: ChatMessage[];
  lastMessageTime: string;
}

export interface MessageRequest {
  id: string;
  name: string;
  initials: string;
  gradient: string;
  note: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export const initialChatConversations: ChatConversation[] = [
  {
    id: 'c1',
    name: 'Rahul Sharma',
    initials: 'RS',
    gradient: 'from-cyan-500 to-cyan-700',
    status: 'online',
    lastMessageTime: '2m ago',
    messages: [
      { id: 'm1', sender: 'Rahul Sharma', text: 'Hey Pavan! Are you joining the AI Innovation Challenge?', time: '10:30 AM', isMe: false },
      { id: 'm2', sender: 'Me', text: 'Yes! Already registered. Are you looking for a team?', time: '10:32 AM', isMe: true },
      { id: 'm3', sender: 'Rahul Sharma', text: 'Yeah, I need a backend person. Want to team up?', time: '10:33 AM', isMe: false },
      { id: 'm4', sender: 'Me', text: 'Sounds great! Let me check with my team and get back to you.', time: '10:35 AM', isMe: true },
    ],
  },
  {
    id: 'c2',
    name: 'Ananya Gupta',
    initials: 'AG',
    gradient: 'from-success-500 to-success-700',
    status: 'online',
    lastMessageTime: '1h ago',
    messages: [
      { id: 'm5', sender: 'Ananya Gupta', text: 'Hi Pavan! I saw your project on crop disease detection. Impressive work!', time: '9:15 AM', isMe: false },
      { id: 'm6', sender: 'Me', text: 'Thanks Ananya! Are you interested in collaborating?', time: '9:20 AM', isMe: true },
      { id: 'm7', sender: 'Ananya Gupta', text: 'Definitely! I can help with the UI/UX and frontend. Let me know the details.', time: '9:25 AM', isMe: false },
    ],
  },
];

export const initialMessageRequests: MessageRequest[] = [
  {
    id: 'r1',
    name: 'Karthik Rao',
    initials: 'KR',
    gradient: 'from-warning-500 to-warning-700',
    note: 'Hi Pavan, I saw your profile and was impressed by your ML projects. I am looking for a teammate for the AI Innovation Challenge. Would love to connect!',
    time: '30m ago',
    status: 'pending',
  },
  {
    id: 'r2',
    name: 'Neha Singh',
    initials: 'NS',
    gradient: 'from-brand-500 to-brand-700',
    note: 'Hello! I am a product designer and saw your team is looking for a designer. Can we chat about joining Team Alpha?',
    time: '2h ago',
    status: 'pending',
  },
];
