# DevLog Product Roadmap

## Product Direction

DevLog should evolve from a generic developer social network into a **proof-of-work and progress platform for developers**.

> **GitHub shows the code. DevLog shows the journey behind it.**

DevLog should help developers set goals, break projects into milestones, document progress, explain technical decisions and challenges, show evidence through screenshots/links/GitHub activity, build a chronological proof-of-work profile, and discover other developers.

### Primary target users

Focus first on:
- university students
- junior developers
- self-taught developers
- internship/job seekers
- developers building portfolio projects
- hackathon/side-project builders

Avoid positioning DevLog as a platform for “all developers” at the beginning.

---

# Core Product Loop

```text
SET A PROJECT GOAL
        ↓
DEFINE MILESTONES
        ↓
BUILD
        ↓
LOG PROGRESS
        ↓
COMPLETE MILESTONES
        ↓
SHOW EVIDENCE
        ↓
BUILD A PROJECT HISTORY
        ↓
SHARE / GET FEEDBACK
        ↓
CONTINUE BUILDING
```

The product should remain useful even if a user has zero followers.

---

# Current Foundation

The existing platform already provides:
- authentication
- onboarding
- developer profiles
- projects
- posts
- project timelines
- screenshots/images
- tech stacks
- GitHub repository links
- live project links
- feed
- likes
- comments
- follows
- developer search
- live search suggestions
- suggested developers
- public/private projects
- responsive web UI
- light/dark themes
- global toast system

Treat these as the social/presentation layer around the proof-of-work system.

---

# Phase 1 — Project Goals and Milestones

**Highest-priority product feature.**

Each project should become something a developer actively manages, not just a container for posts.

## Project Goal

Example:

> Ship the first usable DevLog MVP and deploy it publicly.

Suggested fields:

```ts
goal: string
targetDate?: Date
```

## Milestones

Example:

```text
✓ Authentication
✓ Project management
✓ Social feed
✓ Developer search
○ Mobile responsiveness
○ Production deployment
```

Suggested structure:

```ts
{
  id: string
  title: string
  completed: boolean
  completedAt?: Date
}
```

## Progress

Initially calculate progress automatically:

```text
completed milestones / total milestones
```

Example:

```text
Progress
██████████████░░░░ 72%
```

Avoid arbitrary manual percentages if milestone progress can determine it.

---

# Phase 2 — Connect Posts to Progress

Posts should become evidence of project progress.

When creating a post:

```text
Related milestone
[ Developer Search ▼ ]

☐ Mark this milestone as completed
```

Then the project journey can show:

```text
✓ Authentication
  Sep 12 — Implemented Google and GitHub authentication

✓ Developer Search
  Sep 18 — Added live developer autocomplete

○ Mobile Responsiveness
```

This connects:

**Project → Goal → Milestone → Post → Evidence**

---

# Phase 3 — Better Project Dashboard

The project detail page should eventually become the main working view for a project.

```text
DEVLOG

Goal
Ship the first usable MVP

Target
15 June

Progress
██████████████░░░░ 72%

MILESTONES
✓ Authentication
✓ Projects
✓ Feed
✓ Search
○ Mobile
○ Deployment

CURRENT WORK
Mobile responsiveness

RECENT POSTS
...
```

Useful sections:
- goal
- target date
- progress
- milestones
- current milestone
- GitHub link
- live demo
- tech stack
- chronological posts
- project statistics

---

# Phase 4 — GitHub Integration

GitHub should complement DevLog rather than compete with it.

## Initial integration

Connect a GitHub repository to a project and show:

```text
GitHub Activity

12 commits this week
3 pull requests
Latest commit: fix auth redirect

View Repository →
```

## Later

DevLog could detect activity and prompt:

```text
You made 7 commits to DevLog this week.

Want to document what changed?
```

Workflow:

```text
CODE ON GITHUB
      ↓
DEVLOG DETECTS ACTIVITY
      ↓
DEVELOPER EXPLAINS THE WORK
      ↓
PROJECT JOURNEY GROWS
```

Do not auto-publish posts from commits without the developer choosing to publish them.

---

# Phase 5 — Weekly Developer Check-In

A recurring check-in can create retention and personal utility.

```text
WEEKLY CHECK-IN

What did you complete?
What blocked you?
What did you learn?
What are you working on next?
```

Example result:

```text
WEEK 6

Completed
✓ Live developer search
✓ Project card redesign

Learned
MongoDB SRV DNS resolution can cause intermittent latency.

Blocked by
Mobile navigation decisions

Next
Responsive feed layout
```

This should be useful even when the developer does not want to publish a normal social post.

---

# Phase 6 — Proof-of-Work Profile

Move the profile away from vanity metrics and toward evidence of work.

Prioritize:

```text
3 active projects
18 milestones completed
42 progress posts
2 deployed projects
```

Example:

```text
Alisha

Currently Building

DevLog
72% complete

SkillBridge
48% complete

Recent Work
...

Completed Milestones
18

Projects Shipped
2
```

Followers/following can remain, but should not be the core value.

---

# Phase 7 — Project Proof-of-Work Summary

Create a shareable project summary for internship applications, portfolios, and recruiters.

```text
DEVLOG

Duration
4 months

Status
In Progress

Tech Stack
Next.js · TypeScript · MongoDB

Goal
Build a proof-of-work platform for developers.

Completed
✓ Authentication
✓ Project system
✓ Social feed
✓ Search
✓ Image uploads

Key Challenges
• OAuth redirect architecture
• MongoDB connection latency
• Responsive social feed design

Key Learnings
...

GitHub →
Live Demo →
Project Journey →
```

Possible future outputs:
- shareable public page
- PDF summary
- portfolio embed

---

# Phase 8 — Discovery Improvements

The feed should help users find meaningful developer journeys, not only generic posts.

Possible signals:
- shared technologies
- similar project categories
- recently active projects
- developers working toward similar goals
- followed-by-followed developers

Possible discovery sections:

```text
Developers building with Next.js
Projects shipping this week
Recently completed milestones
New developers documenting consistently
```

Avoid vanity-based leaderboards.

---

# Phase 9 — Notifications

Add notifications after the core progress system works.

Useful notifications:
- someone followed you
- someone commented on your post
- someone liked your post
- milestone target date approaching
- weekly check-in reminder
- GitHub activity available to document

Do not over-notify.

---

# Mobile Strategy

## Do we need a mobile app?

**Eventually, probably yes. Not yet.**

DevLog is social and progress-driven, so mobile will likely matter. Users may want to:
- post quick updates
- upload screenshots/photos
- check comments
- follow developers
- complete milestones
- do weekly check-ins
- receive notifications

But building a separate native app before the web product proves useful would double the product surface too early.

## Recommended sequence

### Step 1 — Finish the mobile-first web MVP

The web app should have:
- single-column feed on mobile
- good touch targets
- responsive forms
- responsive project pages
- mobile navigation
- fast image loading
- no horizontal overflow

### Step 2 — Make DevLog a PWA

A Progressive Web App can provide:
- installable home-screen experience
- standalone window
- app icon
- better mobile feel
- possible offline caching later

### Step 3 — Validate usage

Build a native app once there is evidence that users:
- return regularly
- create posts frequently
- complete milestones
- perform weekly check-ins
- want notifications or camera-first posting

### Step 4 — Native app

A future native app could use:
- Expo
- React Native
- TypeScript

Potential navigation:

```text
Feed
Search
+ New Post
Projects
Profile
```

Mobile-strong features:
- push notifications
- camera/gallery upload
- quick progress posts
- milestone completion
- deep links
- offline drafts

---

# Architecture Note for a Future Mobile App

The current Next.js app uses server actions in several places.

A future React Native app cannot depend on Next.js server actions in the same way.

Over time, important operations should gain reusable API endpoints or a dedicated backend layer.

Examples:

```text
POST   /api/posts
PATCH  /api/posts/:id
DELETE /api/posts/:id

POST   /api/projects
PATCH  /api/projects/:id

POST   /api/follows/:id
DELETE /api/follows/:id

POST   /api/comments
POST   /api/likes

GET    /api/feed
GET    /api/search/users
```

Do not refactor everything immediately just because a native app may exist later.

Instead:
- finish the web product first
- avoid unnecessary coupling
- introduce APIs gradually when features need them
- reuse those APIs later from mobile

---

# Features We Should NOT Prioritize Yet

Avoid turning DevLog into a generic social network.

Do not prioritize:
- direct messages
- stories
- generic communities
- public leaderboards
- points
- meaningless streaks
- events
- video feeds
- endless notification systems
- generic AI chatbot
- complex team collaboration

These increase scope without strengthening the core product.

---

# Recommended Development Order

## Current MVP Completion

1. Finish design-system cleanup
2. Wire global toast feedback
3. Complete responsive/mobile-first pass
4. Improve loading, empty, and error states
5. Security and authorization audit
6. Performance audit
7. Lint/build/audit
8. Production deployment

## Product Utility V2

1. Project goals
2. Milestones
3. Automatic progress
4. Connect posts to milestones
5. Project progress dashboard
6. Weekly check-ins

## Proof-of-Work V3

1. Better proof-of-work profile
2. Shareable project summaries
3. GitHub integration
4. GitHub activity prompts
5. Better discovery/ranking

## Mobile

1. Mobile-first responsive web
2. PWA
3. Validate recurring usage
4. Expo / React Native app if usage justifies it

---

# Product Test

Before adding any major feature, ask:

> Does this help a developer build, document, prove, or understand progress?

If the answer is no, it probably does not belong in DevLog yet.

---

# One-Line Product Positioning

> **DevLog helps developers turn the process of building projects into visible proof of work.**

Alternative:

> **Set goals, document progress, and build a project history that shows more than your commits.**

---

# Long-Term Product Vision

DevLog should become a place where a developer can look back at a project and see:
- what they wanted to build
- what milestones they planned
- what they completed
- how the project evolved
- which technical problems they encountered
- what they learned
- what code they shipped
- what evidence proves the work
- how other developers responded

The social layer should amplify this process.

It should not be the reason the product exists.
