# API Design

## Authentication

POST /api/auth/signup

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/session

---

## Users

GET /api/users

GET /api/users/:id

PATCH /api/users/:id

DELETE /api/users/:id

---

## Projects

POST /api/projects

GET /api/projects

GET /api/projects/:id

PATCH /api/projects/:id

DELETE /api/projects/:id

---

## DevLogs

POST /api/devlogs

GET /api/devlogs

GET /api/devlogs/:id

PATCH /api/devlogs/:id

DELETE /api/devlogs/:id

---

## Comments

POST /api/comments

PATCH /api/comments/:id

DELETE /api/comments/:id

---

## Likes

POST /api/likes

DELETE /api/likes/:id

---

## Follow

POST /api/follow

DELETE /api/follow

---

## Notifications

GET /api/notifications

PATCH /api/notifications/read

---

## Search

GET /api/search/users

GET /api/search/projects

GET /api/search/devlogs
