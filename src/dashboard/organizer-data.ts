export type OrganizerPageId =
  | 'org-home' | 'org-my-hackathons' | 'org-create' | 'org-registrations'
  | 'org-teams' | 'org-announcements' | 'org-community' | 'org-submissions'
  | 'org-judging' | 'org-winners' | 'org-analytics' | 'org-profile' | 'org-settings';

export interface OrgHackathon {
  id: string;
  title: string;
  status: 'Draft' | 'Registration Open' | 'Registration Closed' | 'Hackathon Started' | 'Submission Open' | 'Submission Closed' | 'Judging' | 'Results' | 'Completed';
  organizer: string;
  domain: string;
  prize: string;
  participants: number;
  maxParticipants: number;
  teams: number;
  submissions: number;
  deadline: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  level: 'National' | 'International' | 'State' | 'Inter-College';
  eligibility: 'Students Only' | 'Working Professionals Only' | 'Both';
  gradient: string;
}

export const orgHackathons: OrgHackathon[] = [
  {
    id: 'h1',
    title: 'AI Innovation Hackathon 2026',
    status: 'Registration Open',
    organizer: 'TechNova Community',
    domain: 'AI / GenAI',
    prize: '₹2,00,000',
    participants: 427,
    maxParticipants: 500,
    teams: 96,
    submissions: 0,
    deadline: '4 Days 12 Hours',
    mode: 'Online',
    level: 'National',
    eligibility: 'Both',
    gradient: 'from-brand-500 to-brand-700',
  },
  {
    id: 'h2',
    title: 'FinTech Buildathon 2026',
    status: 'Registration Open',
    organizer: 'TechNova Community',
    domain: 'FinTech',
    prize: '₹1,50,000',
    participants: 198,
    maxParticipants: 300,
    teams: 48,
    submissions: 0,
    deadline: '8 Days',
    mode: 'Online',
    level: 'National',
    eligibility: 'Both',
    gradient: 'from-cyan-500 to-cyan-700',
  },
  {
    id: 'h3',
    title: 'GreenTech Innovation Challenge',
    status: 'Hackathon Started',
    organizer: 'TechNova Community',
    domain: 'Climate / Sustainability',
    prize: '₹1,00,000',
    participants: 145,
    maxParticipants: 250,
    teams: 36,
    submissions: 18,
    deadline: '2 Days',
    mode: 'Hybrid',
    level: 'International',
    eligibility: 'Both',
    gradient: 'from-success-500 to-success-700',
  },
  {
    id: 'h4',
    title: 'Smart India Hackathon 2025',
    status: 'Completed',
    organizer: 'TechNova Community',
    domain: 'Govt / Innovation',
    prize: '₹5,00,000',
    participants: 892,
    maxParticipants: 1000,
    teams: 220,
    submissions: 198,
    deadline: 'Completed',
    mode: 'Hybrid',
    level: 'National',
    eligibility: 'Students Only',
    gradient: 'from-success-600 to-brand-600',
  },
  {
    id: 'h5',
    title: 'Web3 Build Sprint',
    status: 'Draft',
    organizer: 'TechNova Community',
    domain: 'Blockchain / Web3',
    prize: '₹3,00,000',
    participants: 0,
    maxParticipants: 600,
    teams: 0,
    submissions: 0,
    deadline: 'Not published',
    mode: 'Online',
    level: 'National',
    eligibility: 'Both',
    gradient: 'from-warning-500 to-warning-700',
  },
];

export interface OrgParticipant {
  id: string;
  name: string;
  initials: string;
  gradient: string;
  skills: string[];
  domain: string;
  experience: string;
  registrationDate: string;
  team: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Waitlisted';
  hackathonId: string;
}

export const orgParticipants: OrgParticipant[] = [
  { id: 'p1', name: 'Pavan Mali', initials: 'PM', gradient: 'from-brand-500 to-brand-700', skills: ['React', 'Node.js', 'Python'], domain: 'Full Stack', experience: '3 years', registrationDate: '12 Sep', team: 'Team Alpha', status: 'Accepted', hackathonId: 'h1' },
  { id: 'p2', name: 'Rahul Sharma', initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', skills: ['React', 'Next.js', 'TypeScript'], domain: 'Frontend', experience: '2 years', registrationDate: '12 Sep', team: 'Team Alpha', status: 'Accepted', hackathonId: 'h1' },
  { id: 'p3', name: 'Ananya Gupta', initials: 'AG', gradient: 'from-success-500 to-success-700', skills: ['UI/UX', 'Figma', 'React'], domain: 'Design', experience: '4 years', registrationDate: '11 Sep', team: 'Team Alpha', status: 'Accepted', hackathonId: 'h1' },
  { id: 'p4', name: 'Karthik Rao', initials: 'KR', gradient: 'from-warning-500 to-warning-700', skills: ['ML', 'Python', 'TensorFlow'], domain: 'ML/AI', experience: '5 years', registrationDate: '11 Sep', team: 'Team Beta', status: 'Accepted', hackathonId: 'h1' },
  { id: 'p5', name: 'Neha Singh', initials: 'NS', gradient: 'from-brand-500 to-brand-700', skills: ['React', 'Redux', 'Node.js'], domain: 'Full Stack', experience: '1 year', registrationDate: '10 Sep', team: 'Unassigned', status: 'Pending', hackathonId: 'h1' },
  { id: 'p6', name: 'Vikram Kumar', initials: 'VK', gradient: 'from-cyan-500 to-cyan-700', skills: ['Solidity', 'Web3.js', 'Node.js'], domain: 'Blockchain', experience: '3 years', registrationDate: '10 Sep', team: 'Team Gamma', status: 'Accepted', hackathonId: 'h3' },
  { id: 'p7', name: 'Priya Nair', initials: 'PN', gradient: 'from-success-500 to-success-700', skills: ['Python', 'Data Science', 'SQL'], domain: 'Data', experience: '2 years', registrationDate: '09 Sep', team: 'Unassigned', status: 'Waitlisted', hackathonId: 'h3' },
  { id: 'p8', name: 'Arjun Mehta', initials: 'AM', gradient: 'from-warning-500 to-warning-700', skills: ['Java', 'Spring Boot', 'AWS'], domain: 'Backend', experience: '6 years', registrationDate: '09 Sep', team: 'Team Delta', status: 'Accepted', hackathonId: 'h3' },
];

export interface OrgTeam {
  id: string;
  name: string;
  members: { name: string; initials: string; gradient: string; role: string }[];
  skills: string[];
  project: string;
  progress: number;
  status: 'Active' | 'Inactive' | 'Completed';
  submissionStatus: 'Not Submitted' | 'Submitted' | 'Late' | 'Reviewed';
  hackathonId: string;
}

export const orgTeams: OrgTeam[] = [
  {
    id: 't1',
    name: 'Team Alpha',
    members: [
      { name: 'Pavan Mali', initials: 'PM', gradient: 'from-brand-500 to-brand-700', role: 'Backend' },
      { name: 'Rahul Sharma', initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', role: 'Frontend' },
      { name: 'Ananya Gupta', initials: 'AG', gradient: 'from-success-500 to-success-700', role: 'ML' },
      { name: 'Neha Singh', initials: 'NS', gradient: 'from-warning-500 to-warning-700', role: 'UI/UX' },
    ],
    skills: ['React', 'Node.js', 'Python', 'TensorFlow'],
    project: 'AI Crop Disease Detection',
    progress: 72,
    status: 'Active',
    submissionStatus: 'Not Submitted',
    hackathonId: 'h1',
  },
  {
    id: 't2',
    name: 'Team Beta',
    members: [
      { name: 'Karthik Rao', initials: 'KR', gradient: 'from-warning-500 to-warning-700', role: 'ML Lead' },
      { name: 'Vikram Kumar', initials: 'VK', gradient: 'from-cyan-500 to-cyan-700', role: 'Backend' },
    ],
    skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    project: 'FinFlow Dashboard',
    progress: 100,
    status: 'Completed',
    submissionStatus: 'Reviewed',
    hackathonId: 'h1',
  },
  {
    id: 't3',
    name: 'Team Gamma',
    members: [
      { name: 'Arjun Mehta', initials: 'AM', gradient: 'from-warning-500 to-warning-700', role: 'Backend' },
      { name: 'Priya Nair', initials: 'PN', gradient: 'from-success-500 to-success-700', role: 'Data' },
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'MQTT'],
    project: 'GreenTrack IoT',
    progress: 45,
    status: 'Active',
    submissionStatus: 'Not Submitted',
    hackathonId: 'h3',
  },
];

export interface OrgAnnouncement {
  id: string;
  title: string;
  message: string;
  audience: string;
  sentTime: string;
  views: number;
  readPercentage: number;
  status: 'Sent' | 'Scheduled' | 'Draft';
}

export const orgAnnouncements: OrgAnnouncement[] = [
  { id: 'a1', title: 'Submission Deadline Updated', message: 'The submission deadline has been extended to 8 PM IST on September 17. Use the extra time wisely!', audience: 'All registered participants', sentTime: '2h ago', views: 389, readPercentage: 82, status: 'Sent' },
  { id: 'a2', title: 'Mentor Session Schedule', message: 'Mentor sessions are now available from 2 PM to 6 PM IST. Book your slot in the community channel.', audience: 'All registered participants', sentTime: '5h ago', views: 401, readPercentage: 91, status: 'Sent' },
  { id: 'a3', title: 'Kickoff Session Reminder', message: 'Join the kickoff session at 10 AM IST on the main stage. Do not be late!', audience: 'All registered participants', sentTime: '1d ago', views: 420, readPercentage: 95, status: 'Sent' },
  { id: 'a4', title: 'Judging Criteria Update', message: 'Updated judging criteria: Innovation 25%, Technical 30%, Impact 20%, UX 15%, Presentation 10%.', audience: 'Specific teams', sentTime: 'Scheduled for 15 Sep', views: 0, readPercentage: 0, status: 'Scheduled' },
];

export interface OrgSubmission {
  id: string;
  team: string;
  projectName: string;
  techStack: string[];
  github: string;
  liveDemo?: string;
  submittedAt: string;
  status: 'Submitted' | 'Pending' | 'Late' | 'Reviewed';
  assignedJudge?: string;
  score?: number;
  hackathonId: string;
}

export const orgSubmissions: OrgSubmission[] = [
  { id: 's1', team: 'Team Beta', projectName: 'FinFlow Dashboard', techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis'], github: 'github.com/teambeta/finflow', liveDemo: 'finflow-demo.app', submittedAt: '17 Sep, 6:42 PM', status: 'Reviewed', assignedJudge: 'Dr. Mehta', score: 91, hackathonId: 'h1' },
  { id: 's2', team: 'Team Alpha', projectName: 'AI Crop Disease Detection', techStack: ['React', 'Node.js', 'Python', 'TensorFlow'], github: 'github.com/teamalpha/crop-disease', liveDemo: 'crop-disease-demo.app', submittedAt: '17 Sep, 7:15 PM', status: 'Submitted', assignedJudge: 'Dr. Mehta', hackathonId: 'h1' },
  { id: 's3', team: 'Team Gamma', projectName: 'GreenTrack IoT', techStack: ['React', 'Node.js', 'MongoDB', 'MQTT'], github: 'github.com/teamgamma/greentrack', submittedAt: '17 Sep, 9:30 PM', status: 'Late', assignedJudge: 'Unassigned', hackathonId: 'h3' },
  { id: 's4', team: 'Team Delta', projectName: 'MedSync Portal', techStack: ['React', 'Python', 'FastAPI', 'PostgreSQL'], github: 'github.com/teamdelta/medsync', submittedAt: '17 Sep, 5:50 PM', status: 'Submitted', assignedJudge: 'Prof. Iyer', hackathonId: 'h3' },
];

export interface OrgJudge {
  id: string;
  name: string;
  initials: string;
  gradient: string;
  assignedTeams: number;
  completedEvaluations: number;
  pendingEvaluations: number;
}

export const orgJudges: OrgJudge[] = [
  { id: 'j1', name: 'Dr. Mehta', initials: 'DM', gradient: 'from-success-500 to-success-700', assignedTeams: 8, completedEvaluations: 5, pendingEvaluations: 3 },
  { id: 'j2', name: 'Prof. Iyer', initials: 'PI', gradient: 'from-cyan-500 to-cyan-700', assignedTeams: 6, completedEvaluations: 4, pendingEvaluations: 2 },
  { id: 'j3', name: 'Dr. Sharma', initials: 'DS', gradient: 'from-warning-500 to-warning-700', assignedTeams: 5, completedEvaluations: 2, pendingEvaluations: 3 },
];

export const judgingCriteria = [
  { criteria: 'Innovation', weight: 25 },
  { criteria: 'Technical Implementation', weight: 30 },
  { criteria: 'Impact', weight: 20 },
  { criteria: 'UX/Design', weight: 15 },
  { criteria: 'Presentation', weight: 10 },
];

export const orgWinners = [
  { place: '1st', team: 'Team Alpha', project: 'AI Crop Disease Detection', score: 94.5, gradient: 'from-warning-400 to-warning-600', hackathonId: 'h1' },
  { place: '2nd', team: 'Team Beta', project: 'FinFlow Dashboard', score: 89.0, gradient: 'from-ink-400 to-ink-600', hackathonId: 'h1' },
  { place: '3rd', team: 'Team Gamma', project: 'GreenTrack IoT', score: 85.5, gradient: 'from-orange-400 to-orange-600', hackathonId: 'h1' },
];

export const orgSpecialAwards = [
  { award: 'Best UI/UX', team: 'Team Delta', project: 'MedSync Portal', hackathonId: 'h1' },
  { award: 'Best Innovation', team: 'Team Alpha', project: 'AI Crop Disease Detection', hackathonId: 'h1' },
  { award: "People's Choice", team: 'Team Beta', project: 'FinFlow Dashboard', hackathonId: 'h1' },
];

export const registrationTrend = [
  12, 18, 25, 34, 42, 58, 72, 89, 115, 142, 178, 210, 245, 280, 310, 345, 380, 410, 427,
];

export const orgRecentActivity = [
  { text: 'Rahul Sharma joined the hackathon.', time: '5m ago', icon: 'user' },
  { text: 'Team Alpha created a team.', time: '20m ago', icon: 'team' },
  { text: 'New project submitted by Team Beta.', time: '45m ago', icon: 'project' },
  { text: 'Announcement "Submission Deadline Updated" viewed by 82% participants.', time: '2h ago', icon: 'announcement' },
  { text: 'Dr. Mehta completed evaluation of Team Beta.', time: '3h ago', icon: 'judge' },
];

export const orgKPIs = [
  { label: 'Active Hackathons', value: 3, change: '+1', trendUp: true, icon: 'Rocket' },
  { label: 'Total Participants', value: 2847, change: '+427', trendUp: true, icon: 'Users' },
  { label: 'Teams', value: 624, change: '+96', trendUp: true, icon: 'Users' },
  { label: 'Submissions', value: 418, change: '+18', trendUp: true, icon: 'FolderGit2' },
];

export const orgUpcomingDeadlines = [
  { label: 'Registration closes', date: '12 Sep', status: 'urgent' },
  { label: 'Hackathon starts', date: '15 Sep', status: 'upcoming' },
  { label: 'Submission closes', date: '17 Sep', status: 'upcoming' },
  { label: 'Results', date: '20 Sep', status: 'later' },
];

export const orgCommunityChannels = [
  { name: 'general', type: 'text', active: true },
  { name: 'faq', type: 'text' },
  { name: 'find-members', type: 'text' },
  { name: 'team-formation', type: 'text' },
  { name: 'ai-discussion', type: 'text' },
  { name: 'frontend-discussion', type: 'text' },
];

export const orgCommunityMessages = [
  { initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', name: 'Rahul Sharma', time: '10:32 AM', text: 'Hey everyone! Looking for a frontend dev for the AI Innovation Challenge.', role: 'member' },
  { initials: 'AG', gradient: 'from-success-500 to-success-700', name: 'Ananya Gupta', time: '10:35 AM', text: 'I am! I have been working with React and Tailwind for 2 years.', role: 'member' },
  { initials: 'PM', gradient: 'from-brand-500 to-brand-700', name: 'Pavan Mali', time: '10:38 AM', text: 'We could use a backend person too. Our team needs Node.js experience.', role: 'member' },
  { initials: 'KR', gradient: 'from-warning-500 to-warning-700', name: 'Karthik Rao', time: '10:42 AM', text: 'I can help with ML. Working on a crop disease detection model right now.', role: 'moderator' },
];

export const orgCommunityMembers = [
  { initials: 'KR', gradient: 'from-warning-500 to-warning-700', name: 'Karthik Rao', role: 'Moderator', status: 'online' },
  { initials: 'PM', gradient: 'from-brand-500 to-brand-700', name: 'Pavan Mali', role: 'Member', status: 'online' },
  { initials: 'RS', gradient: 'from-cyan-500 to-cyan-700', name: 'Rahul Sharma', role: 'Member', status: 'online' },
  { initials: 'AG', gradient: 'from-success-500 to-success-700', name: 'Ananya Gupta', role: 'Member', status: 'online' },
  { initials: 'NS', gradient: 'from-brand-500 to-brand-700', name: 'Neha Singh', role: 'Member', status: 'idle' },
  { initials: 'VK', gradient: 'from-cyan-500 to-cyan-700', name: 'Vikram Kumar', role: 'Member', status: 'offline' },
];
