# Engineering Decisions

This document records important architectural and technical decisions made during the development of DevLog. Each decision includes the reasoning behind it and any notable trade-offs.

---

## 2026-06-30

### Decision 001 — Project Name

**Decision**

Use **DevLog** as the product name.

**Reason**

The platform is centered around documenting a developer's journey of building software. The name is short, memorable, and clearly communicates the core purpose of the product.

---

### Decision 002 — Frontend Framework

**Decision**

Use **Next.js (App Router)**.

**Reason**

* Full-stack React framework
* Server Components for improved performance
* Route Handlers and Server Actions reduce backend boilerplate
* Excellent deployment experience on Vercel
* Strong TypeScript support

**Trade-offs**

* Slightly steeper learning curve than traditional React
* Tighter coupling to the Next.js ecosystem

---

### Decision 003 — Backend Architecture

**Decision**

Use **Next.js Route Handlers and Server Actions** instead of a separate Express.js backend.

**Reason**

Keeping the frontend and backend in a single codebase allows faster iteration, simpler deployment, shared TypeScript types, and less infrastructure to manage during the MVP stage.

**Trade-offs**

* Less separation between frontend and backend
* If the application grows significantly, the backend may later be extracted into a dedicated service

---

### Decision 004 — Database

**Decision**

Use **MongoDB Atlas** with **Mongoose**.

**Reason**

DevLog contains relational but flexible entities such as users, projects, DevLogs, comments, likes, and follows.

MongoDB's document model allows the schema to evolve quickly while Mongoose provides validation, schema modeling, and indexing.

---

### Decision 005 — Authentication

**Decision**

Use **Auth.js (NextAuth)** with OAuth-only authentication for the MVP.

**Authentication Providers**

* GitHub
* Google

**Authentication Model**

Auth.js is responsible for:

* OAuth authentication
* Session creation
* Session validation
* Sign-in
* Sign-out
* Authentication callbacks

DevLog will not implement custom username/password authentication during the MVP.

DevLog will not store user passwords.

Custom endpoints such as the following are not part of the MVP architecture:

```text
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
```

After successful OAuth authentication, DevLog will maintain application-specific user profile information such as:

* username
* bio
* university
* location
* skills
* tech stack
* GitHub profile
* portfolio

New users may be required to complete onboarding after their first successful authentication.

**Reason**

* Secure OAuth implementation
* Strong integration with Next.js
* Built-in support for GitHub and Google
* Session management out of the box
* Avoids building and maintaining password authentication during the MVP
* Reduces security-sensitive code
* Allows faster MVP development

**Trade-offs**

* Users must have a supported OAuth account
* Authentication depends on third-party providers
* Email/password authentication is unavailable initially

Email/password authentication may be considered in a future release if user demand justifies it.

---

### Decision 006 — Styling

**Decision**

Use **Tailwind CSS** with **shadcn/ui**.

**Reason**

Provides a modern, accessible, and highly customizable component system while allowing rapid UI development without sacrificing design consistency.

---

### Decision 007 — Image Storage

**Decision**

Use **Cloudinary**.

**Reason**

Cloudinary simplifies image uploads, optimization, transformations, and CDN delivery while keeping image storage separate from the application server.

---

### Decision 008 — Deployment

**Decision**

Deploy the application on **Vercel**.

**Reason**

* Native support for Next.js
* Automatic deployments from GitHub
* Preview deployments
* Minimal infrastructure management

Supporting services:

* MongoDB Atlas
* Cloudinary

---

### Decision 009 — Development Philosophy

**Decision**

Follow an MVP-first approach.

**Principles**

* Ship small, valuable features quickly.
* Prioritize usability over feature count.
* Validate assumptions through real users.
* Continuously iterate based on feedback.
* Avoid premature optimization.

---

### Decision 010 — Code Quality

**Decision**

Maintain production-quality engineering practices throughout development.

**Standards**

* TypeScript everywhere
* Modular architecture
* Reusable components
* Consistent naming conventions
* Environment variable management
* Clean Git history
* Well-documented code
