import { Code2, Github, Linkedin, Twitter } from 'lucide-react';

const columns = [
  {
    title: 'Platform',
    links: ['Hackathons', 'Find Teammates', 'Projects', 'Talent Discovery'],
  },
  {
    title: 'For Organizers',
    links: ['Host Hackathon', 'Manage Teams', 'Judging', 'Analytics'],
  },
  {
    title: 'For Recruiters',
    links: ['Find Talent', 'AI Matching', 'Candidate Groups', 'Hiring'],
  },
  {
    title: 'Company',
    links: ['About', 'Contact', 'Privacy', 'Terms', 'Safety'],
  },
];

const socials = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'X' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-default bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow">
                <Code2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-white dark:ring-ink-950" />
              </div>
              <span className="text-lg font-bold tracking-tight text-body">
                Hack<span className="text-gradient">Meet</span>
              </span>
            </a>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Where Hackathons Meet Talent &amp; Opportunity
            </p>
            <div className="flex items-center gap-2 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-body bg-card border border-default hover:border-strong transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-body mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted hover:text-body transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-default flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            © 2026 Hack-Meet. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <a href="#" className="hover:text-body transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-body transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-body transition-colors">Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
