# System Design

## Overview

DevLog is a full-stack web application built with Next.js. The application follows a monolithic architecture for the MVP, allowing the frontend, backend, authentication, and API routes to exist within a single codebase.

This architecture minimizes complexity while providing a strong foundation for future scaling.

---

# Technology Stack

## Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

## Backend

* Next.js Route Handlers
* Server Actions

## Database

* MongoDB Atlas
* Mongoose

## Authentication

* Auth.js (NextAuth)

Authentication Providers:

* GitHub
* Google

## Storage

* Cloudinary

## Deployment

* Vercel
* MongoDB Atlas
* Cloudinary

---

# High-Level Architecture

```text
                Browser
                    │
                    ▼
         Next.js Application
      (Frontend + Backend)
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
Auth.js      Route Handlers   Server Actions
     │              │              │
     └──────────────┼──────────────┘
                    ▼
            Business Logic
                    │
                    ▼
              Mongoose ODM
                    │
                    ▼
             MongoDB Atlas

        Cloudinary (Images)
```

---

# Authentication Flow

```text
User

↓

GitHub / Google Login

↓

Auth.js

↓

Session Created

↓

Protected Routes

↓

Authorized Requests
```

---

# Image Upload Flow

```text
Client

↓

Cloudinary Upload

↓

Image URL Returned

↓

URL Stored in MongoDB

↓

Image Rendered in UI
```

---

# Request Lifecycle

```text
Client Request

↓

Route Handler / Server Action

↓

Validation

↓

Authentication

↓

Business Logic

↓

Database

↓

Response
```

---

# Folder Architecture

```text
app/
components/
lib/
models/
hooks/
types/
public/
docs/
```

---

# Future Scalability

As DevLog grows, the architecture can evolve incrementally.

Potential improvements include:

* Redis caching
* Background jobs using queues
* Search indexing
* CDN optimization
* Object storage for large assets
* Dedicated backend service if required
* Real-time updates
* Analytics pipeline

The MVP intentionally avoids unnecessary complexity while keeping future expansion straightforward.
