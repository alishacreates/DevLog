# Database Design

## Database

MongoDB Atlas

---

# Collections

* Users
* Projects
* DevLogs
* Comments
* Likes
* Follows
* Notifications
* Tags

---

# User Schema

```ts
{
  _id: ObjectId,

  username: String,

  name: String,

  email: String,

  password: String,

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

  createdAt: Date
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

# Notification Schema

```ts
{
  _id: ObjectId,

  receiver: ObjectId,

  sender: ObjectId,

  type: String,

  referenceId: ObjectId,

  isRead: Boolean,

  createdAt: Date
}
```

---

# Relationships

User

↓

owns

↓

Projects

↓

contains

↓

DevLogs

↓

receive

↓

Comments

↓

receive

↓

Likes
