export type RoleId = 'student' | 'recruiter' | 'organizer';
export type LoginRole = RoleId | 'admin';

export type RegistrationRole = RoleId;

export interface RoleOption {
  id: RoleId;
  label: string;
  description: string;
  icon: string;
  accent: string;
}

export const roleOptions: RoleOption[] = [
  { id: 'student', label: 'Student / Professional', description: 'Build skills, join hackathons and get discovered.', icon: 'UserRound', accent: 'from-brand-500 to-brand-700' },
  { id: 'recruiter', label: 'HR / Recruiter', description: 'Discover proven talent based on real skills and projects.', icon: 'Briefcase', accent: 'from-success-500 to-success-700' },
  { id: 'organizer', label: 'Organizer / Organization', description: 'Companies, colleges, clubs & communities that create hackathons.', icon: 'Rocket', accent: 'from-cyan-500 to-cyan-700' },
];

export const studentSteps = ['Account', 'Personal', 'Education', 'Experience', 'Skills', 'Projects', 'Profiles', 'Resume', 'Hackathons', 'Review'];
export const recruiterSteps = ['Account', 'Personal', 'Company', 'Employment Proof', 'Verification', 'Review'];
export const organizerSteps = ['Account', 'Organization', 'Representative', 'Organization Proof', 'Verification', 'Review'];

export function getSteps(role: RoleId): string[] {
  switch (role) {
    case 'student': return studentSteps;
    case 'recruiter': return recruiterSteps;
    case 'organizer': return organizerSteps;
  }
}
