# Hack-Meet Implementation Plan

> Product goal: turn the current front-end prototype into a reliable, role-based hackathon-to-hiring platform.
>
> Core loop: **Discover -> Match -> Build -> Submit -> Verify -> Reputation -> Recruiter Discovery -> Hiring**

## 1. Current State

The repository is a Vite + React + TypeScript front-end prototype.

### Already working locally

- Landing page, login, registration, and role selection
- Student, recruiter, organizer, and admin dashboard switching
- Theme switching and responsive layouts
- Student hackathon search, category filters, and verified-only filter
- Student message request accept/reject and local chat sending
- Team workspace Kanban task creation, assignment, and completion
- Organizer tabs, onboarding steps, document upload previews, and local filters
- Recruiter candidate selection, filters, shortlist state, and local invitation modals
- Admin review modals and dashboard navigation

### Not production-ready yet

- No real authentication or authorization
- No persistent database state
- No shared state between student, recruiter, organizer, and admin views
- Most fixture data is read-only
- Many buttons show intended actions but do not mutate data
- File uploads and resume analysis are simulated
- AI matching and extraction are represented by static results
- Billing and notifications are not connected

## 2. Delivery Rules

1. Finish one vertical workflow at a time from UI to database.
2. Keep the current fixture data until the equivalent Supabase query is working.
3. Every visible action must either work, be disabled with a reason, or be removed.
4. Validate permissions on the server/database, not only in React.
5. Store files in object storage and file metadata in PostgreSQL.
6. Do not build advanced AI or billing before the core data model and permissions are stable.
7. Add loading, empty, success, error, and permission-denied states for every async workflow.

## 3. Priority Roadmap

## Phase 0: Stabilize the Prototype

**Priority: P0 | Goal: make the existing demo honest and predictable**

### Tasks

- [ ] Add a clear `src` module boundary for shared types, data access, and UI.
- [ ] Remove or wire every no-op button and placeholder `href="#"`.
- [ ] Add `aria-label`, disabled, loading, and error states to icon/action buttons.
- [ ] Fix existing unused imports and lint errors.
- [ ] Add a simple error boundary and a not-found/fallback state.
- [ ] Add a lightweight test strategy for critical workflows.
- [ ] Keep fixture data behind a data-access interface so Supabase can replace it without rewriting page components.

### Known button backlog

#### Student dashboard

- [ ] `DiscoverPage`: Advanced Filters should open a real filter drawer.
- [ ] `HackathonCard`: Register should update registration state and show registered status.
- [ ] `TeammateCard`: View Profile should open the candidate profile.
- [ ] `TeammateCard`: Invite should create a team invitation.
- [ ] `TeamsPage`: Create Team should open a creation flow.
- [ ] `TeamsPage`: Accept and Decline invitation buttons must update invitation state.
- [ ] `WorkspacePage`: Submit Project should open and validate a submission form.
- [ ] `CommunityPage`: Send, Report, Block, Pin, and moderation controls need handlers.
- [ ] `MessagesPage`: phone, video, and more-menu buttons need either real behavior or removal.
- [ ] Profile: Edit, Share, external profile, and proof links need handlers or working links.

#### Organizer dashboard

- [ ] Dashboard: View Public Page should navigate to a public preview.
- [ ] Hackathon menu: Edit, Duplicate, and Delete must update shared hackathon state.
- [ ] Create Hackathon: save draft, publish, upload banner, and step validation must work.
- [ ] Review rows: Edit buttons should return to the correct form section.
- [ ] Registrations, announcements, submissions, judging, and results actions must mutate data.
- [ ] Organizer community send/report/moderation actions need handlers.

#### Recruiter dashboard

- [ ] Job description extraction should update editable requirements.
- [ ] Create Role should save a draft or active role.
- [ ] Shortlist should persist candidate status.
- [ ] Invite should create an invitation visible to the student.
- [ ] Bulk invite and group creation should persist selected candidates.
- [ ] Group messaging should create messages and track delivery/status.
- [ ] Recruiter Send and Report actions need shared conversation/report state.
- [ ] Saved searches, sorting, and custom match weights should persist.

#### Admin dashboard

- [ ] Approve, Request Changes, Reject, Warn, Restrict, Suspend, and Ban must update records.
- [ ] Every decision must create an audit log entry.
- [ ] Document preview zoom/page controls should work or be removed from the mock.
- [ ] Admin queues and KPI counts must refresh after a decision.
- [ ] Payments, analytics, and platform settings need persistence.

### Exit criteria

- `npm run typecheck` passes.
- `npm run build` passes.
- No important visible button is a no-op.
- Fixture mode can still run without Supabase credentials.

## Phase 1: Foundation and Supabase Setup

**Priority: P0 | Goal: establish the production data and security boundary**

### Modules

```text
src/lib/
  supabase.ts
  auth.ts
  storage.ts
  errors.ts
  permissions.ts
src/services/
  users.ts
  hackathons.ts
  teams.ts
  messages.ts
  recruiter.ts
  admin.ts
src/types/
  database.ts
  domain.ts
src/hooks/
  useCurrentUser.ts
  useQueryState.ts
```

### Database entities

- `profiles`
- `roles` or role fields with explicit authorization checks
- `organizations`
- `organization_members`
- `organization_verifications`
- `recruiter_verifications`
- `verification_documents`
- `hackathons`
- `hackathon_stages`
- `hackathon_registrations`
- `teams`
- `team_members`
- `team_invitations`
- `projects`
- `project_members`
- `submissions`
- `judges`
- `judging_criteria`
- `judging_scores`
- `results`
- `skills`
- `profile_skills`
- `experiences`
- `educations`
- `resumes`
- `projects` and `project_links`
- `achievements`
- `reputation_events`
- `recruiter_roles`
- `candidate_shortlists`
- `recruiter_invitations`
- `candidate_groups`
- `group_members`
- `conversations`
- `conversation_members`
- `messages`
- `reports`
- `moderation_actions`
- `notifications`
- `audit_logs`
- `subscriptions`
- `usage_counters`

### Storage buckets

- `avatars`: public or signed access depending on privacy requirements
- `resumes`: private
- `project-assets`: public only when the owner publishes them
- `verification-documents`: private and admin-only
- `hackathon-banners`: public after approval

### Security requirements

- Enable Supabase Row Level Security on every user-owned table.
- Never expose a service-role key in the browser.
- Use signed URLs for resumes and verification documents.
- Enforce role permissions in database policies and server-side functions.
- Keep personal phone numbers, private email addresses, and verification files private.
- Add audit records for approval, moderation, billing, and permission changes.

### Exit criteria

- Supabase project and migrations exist.
- Local `.env.example` is documented.
- Authenticated session loads into the app.
- A user can sign up, sign in, sign out, and load their profile.
- RLS policy tests cover student, recruiter, organizer, and admin access.

## Phase 2: Authentication, Profiles, and Onboarding

**Priority: P0 | Goal: replace simulated login/registration with real identity**

### Files to evolve

- `src/App.tsx`
- `src/components/LoginPage.tsx`
- `src/components/auth/RegistrationPage.tsx`
- `src/components/auth/StudentRegistration.tsx`
- `src/components/auth/RecruiterRegistration.tsx`
- `src/components/auth/OrganizerRegistration.tsx`
- `src/context/ThemeContext.tsx`

### Tasks

- [ ] Replace timeout-based login with Supabase Auth.
- [ ] Add session loading and protected dashboard routes/views.
- [ ] Create role-aware onboarding records.
- [ ] Persist student profile, education, experience, skills, projects, and links.
- [ ] Persist recruiter employment verification submissions.
- [ ] Persist organization and representative verification submissions.
- [ ] Replace fake OTP success with an actual email/phone verification provider or explicitly label it demo-only.
- [ ] Connect profile photo, resume, and verification document upload to Storage.
- [ ] Add resume metadata and analysis status.
- [ ] Add account deletion and sign-out behavior.

### Exit criteria

- A new account survives reload and can sign in again.
- Role access is enforced.
- Registration data appears in the correct dashboard.
- Private documents cannot be downloaded by another user.

## Phase 3: Student Core Workflow

**Priority: P0 | Goal: deliver the central Hack-Meet value loop for builders**

### Workflow

```text
Discover Hackathon -> Register -> Find Teammates -> Invite
  -> Accept/Reject -> Team Workspace -> Submit Project
```

### Tasks

- [ ] Connect `DiscoverPage` to `hackathons`, filters, sorting, and pagination.
- [ ] Implement hackathon registration with capacity and eligibility checks.
- [ ] Create persistent team invitations with `pending`, `accepted`, and `rejected` states.
- [ ] Make Accept/Reject on `TeamsPage` update the database and notification list.
- [ ] Create teams and membership records.
- [ ] Connect teammate profiles to the full student profile page.
- [ ] Persist workspace tasks, assignees, status changes, comments, and milestones.
- [ ] Add project submission form with GitHub, demo, technology, description, and screenshots.
- [ ] Enforce submission windows from hackathon stage.
- [ ] Add registration, invitation, task, deadline, and result notifications.

### Exit criteria

- Two test users can register, invite one another, accept an invitation, work in a team, and submit a project.
- Data survives refresh and appears consistently in each relevant dashboard.

## Phase 4: Organizer Operations and Lifecycle

**Priority: P0 | Goal: make an organizer able to run an actual event**

### Tasks

- [ ] Persist hackathon creation drafts.
- [ ] Validate required fields before saving or publishing.
- [ ] Upload and publish approved banners.
- [ ] Implement the lifecycle state machine:

```text
+-------------------+
| Draft             |
+-------------------+
          |
          v
+-------------------+     +-------------------+
| Registration Open | --> | Registration Closed|
+-------------------+     +-------------------+
                                  |
                                  v
+-------------------+ --> +-------------------+ --> +-------------------+
| Hackathon Started |     | Submission Open   |     | Submission Closed |
+-------------------+     +-------------------+     +-------------------+
                                                            |
                                                            v
+-------------------+ --> +-------------------+ --> +-------------------+
| Judging           |     | Results           |     | Completed         |
+-------------------+     +-------------------+     +-------------------+
```

- [ ] Restrict invalid stage transitions.
- [ ] Lock registration/team changes after the configured deadline.
- [ ] Connect registrations and teams to the selected hackathon.
- [ ] Persist announcements and community channels.
- [ ] Persist submissions and reviewer access.
- [ ] Persist judges, rubrics, scores, and leaderboard calculations.
- [ ] Publish winners and create verified achievement/reputation events.
- [ ] Add organizer analytics from real records.

### Exit criteria

- An organizer can create a draft, publish registration, close registration, open submissions, judge projects, publish results, and complete the event.
- Participants see the correct stage and available actions at every step.

## Phase 5: Recruiter Discovery and Hiring Workflow

**Priority: P1 | Goal: make proof-of-skill discoverable and actionable for recruiters**

### Tasks

- [ ] Persist recruiter roles and drafts.
- [ ] Store editable job requirements and matching weights.
- [ ] Implement deterministic baseline matching before adding an LLM.
- [ ] Rank candidates using required skills first, then project relevance, achievement, level, experience, GitHub activity, and reputation.
- [ ] Persist filters, sorting, saved searches, and shortlist state.
- [ ] Persist individual and bulk invitations.
- [ ] Persist candidate groups and membership.
- [ ] Add student invitation inbox with Accept/Decline/Maybe status.
- [ ] Connect recruiter and student conversations to the same conversation records.
- [ ] Add privacy-safe candidate contact flow; never expose private contact fields.
- [ ] Add invitation limits and premium entitlement checks.

### Exit criteria

- Recruiter creates a role, sees ranked candidates, shortlists them, sends an invitation, and receives a student response.
- Candidate and recruiter see the same invitation/message status.

## Phase 6: Messaging, Community, and Safety

**Priority: P1 | Goal: make communication useful and moderatable**

### Tasks

- [ ] Create conversation and message tables with participant authorization.
- [ ] Connect `MessagesPage` to persistent 1-to-1 conversations.
- [ ] Add realtime updates using Supabase Realtime only after authorization policies are tested.
- [ ] Connect community channels to hackathons and organizer groups.
- [ ] Implement send, edit/delete policy, unread counts, and notifications.
- [ ] Implement Report, Flag, Block, and mute actions.
- [ ] Add report evidence upload to private Storage.
- [ ] Add rate limits, spam controls, and message size limits.
- [ ] Keep moderation visibility separate from user privacy.

### Exit criteria

- A student and recruiter can exchange messages.
- A user can report a message or account.
- The report appears in the admin queue with evidence and audit history.

## Phase 7: Admin Verification and Moderation

**Priority: P1 | Goal: make trust decisions real and auditable**

### Tasks

- [ ] Connect HR and organization queues to verification records.
- [ ] Connect document preview to signed Storage URLs.
- [ ] Implement Approve, Request Changes, and Reject with required reasons.
- [ ] Implement hackathon approval and public discoverability rules.
- [ ] Implement Warn, Restrict, Suspend, and Ban actions.
- [ ] Write an audit log for every decision.
- [ ] Recalculate queue counts after decisions.
- [ ] Add admin permission checks and optional multi-admin review for high-risk actions.
- [ ] Add immutable decision timestamps and actor IDs.

### Exit criteria

- Admin decisions change the user/organization/hackathon status.
- Public and private screens reflect those decisions.
- Every important action is visible in audit logs.

## Phase 8: Files, AI, Notifications, and Billing

**Priority: P1/P2 | Goal: add automation after core workflows are reliable**

### Files

- [ ] Validate file type, size, ownership, and malware scanning.
- [ ] Compress and resize images.
- [ ] Generate signed URLs for private files.
- [ ] Add retention and deletion policies for verification documents.

### AI

- [ ] Resume parsing into reviewable draft fields.
- [ ] ATS scoring with transparent scoring signals.
- [ ] Job description extraction into editable requirements.
- [ ] Matching explanations and model/version tracking.
- [ ] Team compatibility recommendations.
- [ ] Never allow AI to make final verification, suspension, or ban decisions.

### Notifications

- [ ] In-app notifications for invitations, approvals, stage changes, messages, and results.
- [ ] Email notifications with user preferences.
- [ ] Read/unread state and notification retention.

### Billing

- [ ] Track invitation and registration usage counters.
- [ ] Add Stripe/Razorpay subscription/payment integration.
- [ ] Implement student premium entitlement.
- [ ] Implement organizer and recruiter usage limits.
- [ ] Process payment webhooks in a trusted server-side function.
- [ ] Add receipts, failed-payment states, and refund handling.

## Phase 9: Production Readiness

**Priority: P2 | Goal: launch safely**

- [ ] Add automated unit, integration, and end-to-end tests.
- [ ] Test all role permissions and RLS policies.
- [ ] Add API and Storage rate limiting.
- [ ] Add monitoring, error tracking, structured logs, and alerts.
- [ ] Add database backups and migration procedures.
- [ ] Add accessibility checks and keyboard navigation.
- [ ] Verify mobile, tablet, desktop, and slow-network behavior.
- [ ] Add privacy policy, terms, data deletion, and document retention rules.
- [ ] Configure CI/CD for typecheck, lint, tests, and build.
- [ ] Deploy frontend and Supabase independently with environment-specific secrets.
- [ ] Run a staging launch with seeded test accounts for every role.

## 4. Recommended Module Ownership

| Module | Current location | Future responsibility |
| --- | --- | --- |
| App shell | `src/App.tsx` | Session bootstrap, protected views, global error/loading states |
| Auth | `src/components/LoginPage.tsx`, `src/components/auth/` | Supabase Auth, onboarding, verification status |
| Student | `src/dashboard/Dashboard.tsx`, `src/dashboard/pages/` | Profile, discovery, teams, workspace, messages |
| Organizer | `src/dashboard/OrganizerDashboard.tsx`, `OrganizerPages.tsx` | Event lifecycle, registrations, judging, results |
| Recruiter | `src/dashboard/RecruiterDashboard.tsx`, `RecruiterPages.tsx` | Roles, matching, candidates, invitations, groups |
| Admin | `src/dashboard/AdminDashboard.tsx`, `AdminPages.tsx` | Verification, moderation, approvals, audit |
| Data | `src/dashboard/*-data.ts` | Replace fixtures with typed service/repository interfaces |
| Shared UI | `src/dashboard/components.tsx`, `src/components/ui/` | Loading, empty, error, modal, table, form, and permission states |

## 5. First Development Sprint

Start with the smallest valuable vertical slice:

1. Create Supabase project, migrations, environment variables, and RLS baseline.
2. Implement sign-up, sign-in, sign-out, and current-user profile loading.
3. Persist one student profile and one recruiter profile.
4. Persist hackathons and student registration.
5. Persist team invitations and wire Accept/Reject.
6. Persist one project submission.
7. Add one end-to-end test covering the flow.
8. Remove or disable unrelated no-op buttons until their module is scheduled.

Do not start with AI, payments, or a full chat rewrite. The first proof that the architecture works is a real user completing the core Hack-Meet loop with data that survives refresh.

## 6. Definition Of Done

A module is complete only when:

- Its data model and permissions are defined.
- Its primary buttons mutate real state.
- Refreshing the page preserves the result.
- Loading, empty, error, and denied states exist.
- The action creates any required notification and audit event.
- Related roles see the correct updated state.
- Typecheck, tests, and production build pass.
- The README and database migration notes are updated.

## 7. Suggested Immediate Backlog

### P0 now

- [ ] Supabase schema and RLS foundation
- [ ] Real authentication/session state
- [ ] Persistent profile onboarding
- [ ] Hackathon registration
- [ ] Team invitation Accept/Reject
- [ ] Project submission
- [ ] Remove or wire no-op buttons in those flows

### P1 next

- [ ] Organizer lifecycle state machine
- [ ] Recruiter role and candidate invitation persistence
- [ ] Shared recruiter/student messaging
- [ ] Admin verification decisions and audit logs
- [ ] Reports and moderation actions

### P2 after workflows stabilize

- [ ] Realtime community/chat
- [ ] Resume/JD AI processing
- [ ] GitHub integrations
- [ ] Billing and usage limits
- [ ] Analytics, notifications, and production hardening

## Developed By

**Team HackMates**
