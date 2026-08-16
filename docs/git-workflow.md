# Git Workflow

This document defines the Git workflow used for DevLog.

The goal is to keep development simple, maintain a clean history, and ensure `main` is always stable and deployable.

---

# Branch Strategy

DevLog uses a simple trunk-based workflow with short-lived branches.

```text
main
├── feature/*
├── fix/*
├── docs/*
└── refactor/*
```

There is no permanent `develop` branch. Since DevLog is currently developed by a single developer, feature branches are merged directly into `main` after testing.

## `main`

`main` is the production branch.

* Always stable and deployable.
* Contains tested code.
* Used for production deployments.
* Features are merged into `main` only when complete.

## `feature/*`

Used for new functionality.

Examples:

```text
feature/auth
feature/profile-onboarding
feature/projects
feature/devlogs
feature/feed
feature/comments
feature/follow
feature/search
```

Keep each branch focused on one feature or milestone.

## `fix/*`

Used for bug fixes.

Examples:

```text
fix/session
fix/navbar
fix/feed-pagination
```

## `docs/*`

Used for documentation-only changes.

Examples:

```text
docs/auth-architecture
docs/api
docs/mvp
```

## `refactor/*`

Used for internal code improvements that do not intentionally change functionality.

Examples:

```text
refactor/models
refactor/components
```

---

# Commit Convention

Use Conventional Commits.

Examples:

```text
feat(auth): add GitHub authentication

feat(profile): create onboarding flow

feat(projects): add project creation

feat(devlogs): add DevLog creation

feat(feed): render latest DevLogs

fix(auth): resolve session redirect issue

refactor(feed): simplify DevLog card

docs(auth): update authentication architecture

style(theme): refine typography
```

Avoid vague commit messages such as:

```text
updated
changes
fixed stuff
final
```

Commits should describe what changed and remain reasonably small and focused.

---

# Development Workflow

For each feature:

1. Make sure `main` is up to date.
2. Create a short-lived branch from `main`.
3. Implement the feature.
4. Commit meaningful units of work.
5. Run linting, tests, and the production build where applicable.
6. Push the branch.
7. Open a Pull Request into `main`.
8. Review the diff and verify the feature.
9. Merge into `main`.
10. Delete the completed branch.

Example:

```bash
git switch main
git pull

git switch -c feature/auth

# develop and commit

git push -u origin feature/auth
```

After the feature is verified, merge it into `main`.

---

# Releases

Tag meaningful product milestones rather than every small change.

```text
v0.1  Landing + Design System
v0.2  Authentication
v0.3  Profile + Onboarding
v0.4  Projects
v0.5  DevLogs
v0.6  Feed + Social Interactions
v0.7  Search
v1.0  MVP
```

---

# Principles

* Keep `main` deployable.
* Use short-lived branches.
* Build one focused feature at a time.
* Keep commits small and meaningful.
* Test before merging.
* Delete branches after they are merged.
* Avoid unnecessary Git complexity for a solo project.
* Treat Git history as part of the project's engineering documentation.
