# DevLog — Project Interview Questions & Architecture Decisions

This document is a placement/interview preparation guide for explaining the engineering decisions behind **DevLog**.

The goal is not to memorize answers word-for-word. Use these as talking points so you can explain what you built, why you built it that way, what trade-offs you accepted, and when you would change the design.

---

## 1. Give me a quick overview of DevLog.

**Answer:**

DevLog is a full-stack social platform for developers to document their development journey, showcase projects, publish project-linked DevLogs, and discover what other developers are building.

The application currently uses:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- MongoDB Atlas
- Mongoose
- Auth.js
- Zod

The application is structured as a feature-first modular monolith. Next.js handles both frontend and backend responsibilities using Server Components, Server Actions, and Route Handlers.

Core features include:

- OAuth authentication with Google and GitHub
- onboarding and unique usernames
- developer profiles
- project CRUD
- DevLog CRUD
- public/private visibility
- resource-level authorization
- public cross-user feed
- cursor pagination

---

# Architecture Questions

## 2. Why did you choose Next.js?

I chose Next.js because DevLog needed both a frontend and backend, and Next.js allows me to build both in one application.

For the MVP, this gave me:

- file-based routing
- Server Components
- Server Actions
- API Route Handlers
- SSR capabilities
- authentication integration
- simpler deployment
- shared TypeScript types
- less infrastructure overhead

Because I am the only developer, a full-stack Next.js application lets me iterate faster without maintaining separate frontend and backend deployments.

### Trade-off

The frontend and backend are coupled into one deployment. If the backend later needs independent scaling, multiple clients, or long-running services, I may extract parts of it.

---

## 3. Why didn't you use Express?

A separate Express backend would have added complexity before DevLog needed it.

I would have needed to manage:

- a second server
- CORS
- independent deployment
- API client code
- authentication across services
- duplicated configuration
- additional CI/CD
- extra request/response type management

For the MVP, Server Actions and Route Handlers already provide a backend.

I would introduce a separate backend only if there is a clear technical requirement, such as:

- mobile clients
- third-party API consumers
- WebSocket-heavy services
- independently scaled backend workloads
- long-running jobs
- larger engineering teams

---

## 4. Is DevLog a monolith?

Yes. DevLog is currently a **modular monolith**.

That means the system runs as one deployable application, but the internal code is organized by feature boundaries such as:

- onboarding
- profile
- projects
- DevLogs
- feed

This gives me the simplicity of a monolith while keeping domain boundaries clear.

---

## 5. Why not microservices?

Microservices solve problems related to independent scaling, deployment boundaries, large teams, and operational isolation.

DevLog does not currently have those problems.

Using microservices now would introduce:

- network calls
- distributed authentication
- service discovery
- multiple deployments
- distributed tracing
- more failure modes
- eventual consistency problems
- significantly more DevOps work

For an MVP, that would be overengineering.

If a specific subsystem later develops independent scaling requirements, I can extract that service.

---

## 6. What is your folder architecture and why?

DevLog uses a feature-first structure.

```text
src/
├── app/
├── features/
├── components/
├── lib/
├── models/
├── types/
└── auth.ts
```

### Responsibilities

`app/`
- routing and page composition

`features/`
- product/domain-specific logic

`components/`
- reusable UI and layout components

`lib/`
- infrastructure and shared helpers

`models/`
- Mongoose persistence models

`types/`
- global TypeScript declarations

This keeps feature-specific code together and reduces coupling as the project grows.

---

# Database Questions

## 7. Why did you choose MongoDB?

I chose MongoDB as a pragmatic MVP database.

DevLog has document-oriented entities such as:

- users
- projects
- DevLogs

Their structures are still evolving, and MongoDB gives flexibility while Mongoose provides schema enforcement, indexes, validation, and references.

MongoDB Atlas also made infrastructure setup simple for an MVP.

### Alternative considered

PostgreSQL.

PostgreSQL would be particularly attractive for highly relational features such as:

- follows
- likes
- comments
- analytics
- complex joins

MongoDB is not universally better. It was the practical choice for the current stage of DevLog.

---

## 8. Why Mongoose if MongoDB is schemaless?

MongoDB itself allows flexible documents, but application-level structure is still important.

Mongoose provides:

- schemas
- required fields
- enums
- defaults
- validation
- indexes
- model relationships
- middleware
- TypeScript-friendly model access

It lets me use MongoDB's flexibility without having completely uncontrolled data.

---

## 9. Why not PostgreSQL?

PostgreSQL is a strong alternative.

I chose MongoDB because:

- the MVP entities are naturally document-oriented
- schema requirements were evolving
- MongoDB Atlas integration was fast
- I wanted rapid iteration

However, as DevLog becomes more social and relational, PostgreSQL may become attractive.

I would reconsider if the system develops:

- complex relational queries
- graph-heavy social relationships
- strong transactional requirements across many entities
- advanced analytics/reporting needs

---

## 10. How do you model relationships in MongoDB?

I store referenced document IDs using MongoDB ObjectIds.

For example:

```text
DevLog
├── author  → User ObjectId
└── project → Project ObjectId
```

The DevLog does not copy the entire user or project document.

This avoids duplicating mutable data such as usernames or project titles across many DevLogs.

---

## 11. What is Mongoose populate?

`populate()` resolves an ObjectId reference into selected fields from the referenced document.

For example, a DevLog stores:

```text
author: ObjectId(...)
project: ObjectId(...)
```

For the feed I need:

- author name
- username
- avatar
- project title

So I use:

```ts
.populate("author", "name username image")
.populate("project", "title")
```

I select only the fields needed by the feed instead of loading entire documents.

---

## 12. What indexes do you use and why?

Indexes are based on known query patterns.

Examples include:

### Projects

```text
owner + slug
```

Used for unique project slugs per owner.

### DevLogs

```text
project + createdAt
author + createdAt
isPublic + createdAt
```

These support:

- project timelines
- developer timelines
- public feed queries

Indexes improve reads but increase storage and write cost, so I only add indexes for actual query patterns.

---

# Data Modeling Questions

## 13. Why did you remove `projectsCount` from the User model?

`projectsCount` can be derived from the Projects collection:

```ts
Project.countDocuments({ owner: userId })
```

Storing it separately would duplicate state.

If project creation succeeded but the counter update failed, the database could say:

```text
Actual projects: 4
projectsCount: 3
```

For the MVP, I prefer correctness and simplicity.

If counting becomes a performance bottleneck later, I can denormalize the counter and maintain it transactionally.

---

## 14. What is denormalization?

Denormalization means storing redundant data to make reads faster.

For example:

```text
projectsCount: 10
```

is redundant because the real project count can be calculated from the Projects collection.

Denormalization can improve performance, but it introduces consistency problems.

I prefer normalized/source-of-truth data first and denormalize only when performance measurements justify it.

---

# Authentication Questions

## 15. Why Auth.js?

Authentication is security-sensitive and easy to get wrong.

Auth.js provides:

- OAuth integration
- sessions
- provider callbacks
- secure authentication flows
- Next.js integration

Using a proven authentication library reduced the amount of security-critical code I needed to write myself.

---

## 16. Why OAuth-only?

For the MVP I support Google and GitHub OAuth.

This avoids storing passwords and reduces the authentication security surface.

It means DevLog does not need to implement:

- password hashing
- forgot-password flows
- reset tokens
- password strength policies
- email verification

This was a deliberate MVP simplification.

---

## 17. How does onboarding work?

The flow is:

```text
OAuth
→ DevLog User created/upserted
→ session checks username
→ username missing
→ /onboarding
→ choose username
→ Zod validation
→ uniqueness check
→ save
→ /feed
```

Currently, the existence of a username represents completed onboarding.

---

## 18. How are protected routes implemented?

Authenticated application routes live under a shared `(app)` route group.

The shared layout checks:

- whether a session exists
- whether onboarding is complete

This avoids repeating authentication logic on every page.

---

# Validation & Security

## 19. Why Zod?

TypeScript only checks types during development/build time.

It does not validate data submitted by users at runtime.

Zod validates incoming form data on the server.

I use it for:

- usernames
- profiles
- projects
- DevLogs
- URLs
- field lengths
- enums
- arrays such as tags and tech stacks

This creates a runtime validation boundary before data reaches MongoDB.

---

## 20. Why validate on the server if the form already has HTML validation?

Client-side validation is only UX.

Users can bypass the UI and manually send requests.

The server must treat all client input as untrusted.

So validation happens server-side using Zod even if the browser also validates fields.

---

## 21. How do you prevent users from editing another user's project?

Ownership is checked inside the database mutation itself.

Instead of:

```ts
Project.findByIdAndUpdate(projectId)
```

I use a query such as:

```ts
Project.findOneAndUpdate({
  _id: projectId,
  owner: session.user.id
})
```

Both conditions must match.

So even if someone manually submits another project's ID, the update fails.

This is object-level authorization.

---

## 22. Why isn't hiding the Edit button enough?

Hiding UI controls is only UX.

A malicious user can manually call endpoints or submit requests.

The real authorization must happen on the server.

Therefore:

```text
Frontend:
hide controls for non-owner

Backend:
verify ownership again
```

---

## 23. How do public/private resources work?

Owners can see their own public and private resources.

Other users can only access public resources.

For example:

```text
Public Project
Owner       → view/manage
Other user  → view

Private Project
Owner       → view/manage
Other user  → 404
```

The same rules apply to DevLogs.

I also check the parent project visibility so a public DevLog cannot accidentally expose a private project.

---

# Server Actions

## 24. What is a Server Action?

A Server Action is a function that executes on the Next.js server.

For example:

```text
Create Project Form
→ Server Action
→ auth()
→ Zod
→ Mongoose
→ MongoDB
```

This lets me perform secure server-side mutations without creating a separate REST endpoint for every form.

---

## 25. Why did `redirect()` cause `NEXT_REDIRECT` earlier?

Next.js implements `redirect()` by throwing a special internal signal.

I originally placed:

```ts
redirect(...)
```

inside a `try/catch`.

My catch block accidentally caught Next.js's redirect signal and logged it as an error.

The fix was to keep only the database operation inside `try/catch` and call `redirect()` afterward.

This lets Next.js handle the redirect normally.

---

# Feed Questions

## 26. How does your feed work?

Feed V1 is reverse chronological.

The query retrieves:

```text
isPublic = true
```

and populates:

```text
author → name, username, image
project → title
```

Results are ordered newest-first and returned using cursor pagination.

---

## 27. Why reverse chronological instead of an algorithm?

For Feed V1, reverse chronological ordering is:

- predictable
- easy to reason about
- easy to debug
- fair
- sufficient for an MVP

Algorithmic ranking would require meaningful signals such as:

- follows
- likes
- comments
- engagement
- interests
- freshness

Those signals do not exist yet.

I would add ranking only after the social features generate enough data.

---

## 28. Why cursor pagination instead of page numbers?

Page-number pagination often uses `skip()`:

```text
page 500
→ skip thousands of records
```

This gets less efficient on large collections.

It can also behave poorly when new feed items are inserted while a user is paging.

Cursor pagination says:

```text
Give me records after this known record.
```

This works naturally with indexes and append-heavy feeds.

---

## 29. Why use `_id` as the cursor?

MongoDB ObjectIds contain a timestamp component and generally increase over time.

For Feed V1, this makes `_id` a convenient cursor.

A more rigorous production solution could use a compound cursor such as:

```text
(createdAt, _id)
```

which ensures deterministic ordering if multiple records share the same timestamp.

---

## 30. Why fetch `PAGE_SIZE + 1` records?

If the page size is 10, I request 11.

If I get:

```text
10 or fewer
→ no guaranteed next page
```

If I get:

```text
11
→ another page definitely exists
```

I display the first 10 and use the extra record only to determine `hasMore`.

---

## 31. How does Load More work?

Initial request:

```text
/feed
→ server gets first page
→ renders first DevLogs
```

When the user clicks Load More:

```text
Client sends cursor
→ Server Action
→ getFeed(cursor)
→ MongoDB
→ next page
→ append to existing React state
```

Existing items remain visible while new items are added.

---

# DTO / Serialization Questions

## 32. Why did you create a `FeedItem` type?

The database returns Mongoose-specific objects such as:

- ObjectId
- Date
- populated Mongoose data

The UI should not depend on Mongoose.

So the feed query transforms database data into a plain DTO:

```text
MongoDB
→ Mongoose
→ getFeed()
→ FeedItem
→ React
```

For example:

```text
ObjectId → string
Date → ISO string
```

This reduces coupling between the persistence layer and UI.

---

## 33. What is a DTO?

DTO means **Data Transfer Object**.

It defines the exact data shape transferred between application layers.

For DevLog, the feed DTO includes only what the feed needs:

- DevLog data
- author name/username/image
- project ID/title

It does not expose the entire User or Project document.

---

# React / Next.js Questions

## 34. What is hydration?

Next.js can render HTML on the server.

React then hydrates that HTML in the browser by attaching client-side behavior.

The server-rendered output and client-rendered output must match.

---

## 35. Why did you get a hydration mismatch with dates?

I originally used:

```ts
toLocaleDateString()
```

without specifying a locale.

The server and browser formatted the same date differently.

For example:

```text
Server: 03/09/2026
Client: 9/3/2026
```

React detected different HTML.

I fixed it by using deterministic formatting with an explicit locale and timezone.

---

## 36. Server Component vs Client Component?

### Server Components

Useful for:

- database reads
- authentication
- server-side rendering
- keeping server-only dependencies out of client bundles

### Client Components

Useful when the UI needs:

- state
- event handlers
- effects
- browser APIs
- interactive Load More behavior

For example:

```text
/feed page
→ Server Component

FeedList
→ Client Component
```

---

# System Design / Scaling Questions

## 37. How would you scale DevLog to 1 million users?

I would not immediately rewrite the system.

I would first measure bottlenecks and scale incrementally.

Potential steps:

1. Improve database indexes
2. Add query monitoring
3. Introduce Redis caching for hot reads
4. Add CDN/media optimization
5. Add rate limiting
6. Move expensive work to background queues
7. Add horizontal application scaling
8. Add database read replicas/sharding if justified
9. Extract independently scaling services if needed
10. Introduce dedicated search infrastructure

The architecture should evolve based on observed load rather than assumed scale.

---

## 38. Where would Redis help?

Potential uses:

- caching hot public profiles
- caching popular projects
- caching feed pages
- rate limiting
- session-related caching
- distributed locks
- job queues depending on tooling

I would not add Redis until there is a measurable need.

---

## 39. How would you scale the feed?

Possible evolution:

### Current

```text
MongoDB
→ query public DevLogs
→ cursor pagination
```

### Later

```text
Follow Graph
→ candidate generation
→ ranking
→ cached timeline
```

At larger scale, strategies could include:

- fan-out on read
- fan-out on write
- hybrid feed generation
- Redis timelines
- asynchronous feed workers
- ranking services

The appropriate solution depends on the ratio of reads, writes, and follower counts.

---

## 40. What is fan-out on write?

When a user posts, the system immediately pushes the post ID into follower feed timelines.

Advantage:
- very fast feed reads

Disadvantage:
- expensive for users with huge follower counts

---

## 41. What is fan-out on read?

The system stores posts normally.

When someone opens the feed, it fetches recent posts from followed users and merges/ranks them.

Advantage:
- simpler writes

Disadvantage:
- more expensive feed reads

---

## 42. How would you implement notifications?

I would avoid doing notification processing synchronously inside the main request.

For example:

```text
User comments
→ save comment
→ emit event/job
→ background worker
→ create notification
```

This keeps the user's request fast and allows retries if notification processing fails.

---

## 43. When would you introduce a queue?

When DevLog gains work that does not need to complete before returning the user's request.

Examples:

- notification delivery
- emails
- image processing
- analytics events
- feed fan-out
- moderation jobs

Possible tools include BullMQ with Redis or a managed queue service.

---

## 44. How would you implement search?

For an early version, MongoDB text indexes may be sufficient.

For more advanced search, I would consider:

- Atlas Search
- Elasticsearch
- OpenSearch

This would depend on requirements such as:

- typo tolerance
- ranking
- autocomplete
- filters
- scale

---

# Reliability Questions

## 45. What happens if MongoDB fails during a request?

The operation throws and the Server Action returns an error state.

The UI should display a controlled failure rather than crashing.

For operations involving multiple related writes, I would consider transactions if atomicity is required.

---

## 46. When would you use MongoDB transactions?

When multiple database changes must either all succeed or all fail.

For example, if DevLog later maintains denormalized counters:

```text
Create project
+
increment projectsCount
```

those operations might need a transaction.

I avoided this currently by not storing unnecessary derived counters.

---

## 47. What would you log in production?

I would log:

- request failures
- database failures
- authentication failures
- slow queries
- external service failures
- important background job failures

I would avoid logging:

- passwords
- authentication secrets
- OAuth tokens
- sensitive personal information

A production system could use structured logging and observability tools.

---

# Testing Questions

## 48. How would you test DevLog?

I would use multiple layers.

### Unit tests

Examples:

- slug generation
- Zod validation
- utility functions

### Integration tests

Examples:

- project creation
- ownership checks
- DevLog creation
- feed pagination

### End-to-end tests

Examples:

```text
OAuth/login
→ onboarding
→ create project
→ create DevLog
→ feed
```

For browser E2E testing I could use Playwright.

---

## 49. What security tests are important?

Examples:

- user cannot edit another user's project
- user cannot delete another user's DevLog
- private resources return 404
- invalid ObjectIds do not crash routes
- malformed input is rejected
- reserved usernames are blocked
- duplicate usernames are handled safely

---

# Product / Engineering Questions

## 50. What was the hardest bug you encountered?

One good example is the `NEXT_REDIRECT` issue.

Project creation succeeded, but the redirect appeared as an error because Next.js implements redirects using an internal thrown signal.

I had placed the redirect inside a try/catch, so my catch intercepted it.

I fixed it by isolating only the database operation inside the try/catch and moving `redirect()` outside.

Another example is the hydration mismatch caused by locale-dependent date formatting.

---

## 51. What technical decision are you most satisfied with?

Good answers include:

- keeping the MVP as a modular monolith
- introducing feature-first architecture before the codebase grew
- server-side ownership checks
- cursor pagination
- avoiding premature denormalized counters
- creating DTOs at the Server/Client boundary

Pick the one you can explain most deeply.

---

## 52. What would you change if you rebuilt DevLog?

Possible answer:

I would preserve the modular monolith approach but define a few cross-feature conventions slightly earlier, such as DTO boundaries and shared query patterns.

I would not prematurely introduce microservices or a separate Express backend.

As the social graph becomes more complex, I would reevaluate whether MongoDB remains the best database for every domain.

---

## 53. What are the current limitations?

Be honest.

Examples:

- feed is currently reverse chronological
- no algorithmic ranking
- no comments/likes yet
- no follow graph yet
- no notification infrastructure yet
- no media uploads yet
- limited automated testing
- production observability not fully implemented
- no advanced caching layer yet

Being able to identify limitations is stronger than pretending the system is finished.

---

# Rapid-Fire Common Interview Questions

You should be able to answer these in 30–60 seconds each.

1. Why Next.js?
2. Why MongoDB?
3. Why not PostgreSQL?
4. Why Mongoose?
5. Why Auth.js?
6. Why OAuth?
7. Why Zod?
8. Why Server Actions?
9. Why not Express?
10. Why not microservices?
11. Why feature-first architecture?
12. Why MongoDB references instead of embedding?
13. What does `populate()` do?
14. What indexes are in your database?
15. Why cursor pagination?
16. Why not `skip()` pagination?
17. Why `_id` as the cursor?
18. What is a DTO?
19. Why serialize ObjectIds?
20. Server Component vs Client Component?
21. What is hydration?
22. How did you fix the hydration bug?
23. How do you prevent unauthorized updates?
24. How do you handle private resources?
25. Why not store `projectsCount`?
26. What is denormalization?
27. When would you use transactions?
28. How would you add Redis?
29. How would you scale the feed?
30. How would you scale to 1M users?
31. How would you implement notifications?
32. How would you add search?
33. How would you test the system?
34. What happens when MongoDB goes down?
35. What was your hardest bug?
36. What trade-off would you reconsider later?
37. Why should this system stay a monolith right now?
38. When would you split a service out?
39. How would you support a mobile app?
40. How would you migrate to an Express/Nest backend if needed?

---

# How to Answer Project Questions in Interviews

Use this structure:

```text
Requirement
↓
Decision
↓
Reason
↓
Trade-off
↓
When I would reconsider
```

Example:

**Why MongoDB?**

```text
Requirement:
Fast MVP development with evolving project/content schemas.

Decision:
MongoDB Atlas + Mongoose.

Reason:
Document-oriented data, flexible iteration, easy managed infrastructure,
Mongoose schemas and indexes.

Trade-off:
Relational/social queries may become more complex than PostgreSQL.

Reconsider:
If the social graph or transactional relational requirements become dominant.
```

This is much stronger than saying:

> "MongoDB is fast."

---

# Final Rule

Do not memorize DevLog as a list of technologies.

Know it as a collection of engineering decisions.

For every major technology or architecture choice, be ready to explain:

```text
Why did I use it?
What problem did it solve?
What did it cost me?
What alternative existed?
When would I change it?
```

That is what turns DevLog from a college project into something you can defend in a software engineering interview.
