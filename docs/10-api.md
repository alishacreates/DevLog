# API Design

DevLog uses Next.js App Router, Route Handlers, and Server Actions.

Authentication is handled by Auth.js and is not implemented through custom DevLog signup/login endpoints.

---

# Authentication

## Authentication System

Use Auth.js with OAuth providers.

MVP providers:

* GitHub
* Google

Auth.js manages:

* OAuth authentication
* Session creation
* Session validation
* Sign-in
* Sign-out
* Authentication callbacks

DevLog will not implement custom endpoints such as:

```text
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
```

DevLog does not store user passwords in the MVP.

After first authentication, users may be redirected to onboarding if their DevLog profile is incomplete.

---

# Users

```text
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id
```

Responsibilities:

* Retrieve user profiles
* Update DevLog-specific profile information
* Retrieve public developer profiles
* Delete user accounts when supported

Authentication credentials are not modified through these endpoints.

---

# Projects

```text
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
```

Responsibilities:

* Create projects
* Retrieve projects
* Update projects
* Delete projects

Only the project owner should be allowed to modify or delete a project.

---

# DevLogs

```text
POST   /api/devlogs
GET    /api/devlogs
GET    /api/devlogs/:id
PATCH  /api/devlogs/:id
DELETE /api/devlogs/:id
```

Responsibilities:

* Create DevLogs
* Retrieve DevLogs
* Update DevLogs
* Delete DevLogs
* Power the developer feed

Only the DevLog author should be allowed to modify or delete a DevLog.

---

# Comments

```text
POST   /api/comments
PATCH  /api/comments/:id
DELETE /api/comments/:id
```

Responsibilities:

* Add comments to DevLogs
* Edit comments
* Delete comments

Only the comment author should be allowed to modify or delete their comment.

---

# Likes

```text
POST   /api/likes
DELETE /api/likes/:id
```

Responsibilities:

* Like a DevLog
* Remove a like

A user may only like a given DevLog once.

---

# Follow

```text
POST   /api/follow
DELETE /api/follow
```

Responsibilities:

* Follow another developer
* Unfollow another developer

A user cannot follow themselves.

A user may only follow another user once.

---

# Search

```text
GET /api/search/users
GET /api/search/projects
GET /api/search/devlogs
```

Responsibilities:

* Find developers
* Find projects
* Find DevLogs

Search behavior may initially use simple MongoDB queries and can be upgraded later if needed.

---

# Notifications

Notifications are not part of the MVP API.

They may be introduced in a future release.

---

# API Principles

* Authentication is handled by Auth.js.
* Authorization is enforced by DevLog application logic.
* All write operations require an authenticated user.
* Server-side validation is required for incoming data.
* Users may only modify resources they own.
* API responses should use consistent error handling.
* Route Handlers should be used when HTTP endpoints are required.
* Server Actions may be preferred for application-internal mutations where appropriate.
