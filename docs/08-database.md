# Database Design

## Database

MongoDB Atlas

---

# MVP Collections

* Users
* Projects
* DevLogs
* Comments
* Likes
* Follows

> Notifications are intentionally excluded from the MVP scope.
>
> Tags are stored directly on DevLogs as an array of strings for the MVP instead of using a separate Tags collection.

---

# User Schema

```ts
{
  _id: ObjectId,

  username: String, // unique

  name: String,

  email: String, // unique

  avatar: String,

  bio: String,

  university: String,

  location: String,

  skills: [String],

  techStack: [String],

  github: String,

  portfolio: String,

  followersCount: Number,

  followingCount: Number,

  projectsCount: Number,

  createdAt: Date,

  updatedAt: Date
}
```

## Authentication Notes

DevLog uses Auth.js with OAuth providers for authentication.

MVP providers:

* GitHub
* Google

DevLog does not store user passwords in the MVP.

Authentication identity and session handling are managed by Auth.js.

DevLog-specific profile information such as username, bio, skills, university, and portfolio information is managed separately by the application.

A newly authenticated user may be required to complete onboarding before accessing the main application.

---

# Project Schema

```ts
{
  _id: ObjectId,

  owner: ObjectId,

  title: String,

  description: String,

  techStack: [String],

  githubUrl: String,

  liveUrl: String,

  status: String,

  contributors: [ObjectId],

  createdAt: Date,

  updatedAt: Date
}
```

---

# DevLog Schema

```ts
{
  _id: ObjectId,

  author: ObjectId,

  project: ObjectId,

  title: String,

  content: String,

  images: [String],

  tags: [String],

  likesCount: Number,

  commentsCount: Number,

  createdAt: Date,

  updatedAt: Date
}
```

---

# Comment Schema

```ts
{
  _id: ObjectId,

  post: ObjectId,

  author: ObjectId,

  content: String,

  createdAt: Date,

  updatedAt: Date
}
```

---

# Like Schema

```ts
{
  _id: ObjectId,

  user: ObjectId,

  post: ObjectId,

  createdAt: Date
}
```

---

# Follow Schema

```ts
{
  _id: ObjectId,

  follower: ObjectId,

  following: ObjectId,

  createdAt: Date
}
```

---

# Relationships

```text
User
 ├── owns ───────► Projects
 ├── writes ─────► DevLogs
 ├── writes ─────► Comments
 ├── likes ──────► DevLogs
 └── follows ────► Users

Project
 └── contains ───► DevLogs

DevLog
 ├── receives ───► Comments
 └── receives ───► Likes
```

---

# MVP Data Constraints

## User

* `email` must be unique.
* `username` must be unique.
* `username` is selected during DevLog onboarding.
* A user must be authenticated before creating or modifying application data.

## Like

A user should only be able to like a specific DevLog once.

A compound unique index should eventually enforce:

```ts
{
  user: 1,
  post: 1
}
```

## Follow

A user should only be able to follow another user once.

A compound unique index should eventually enforce:

```ts
{
  follower: 1,
  following: 1
}
```

A user cannot follow themselves.
