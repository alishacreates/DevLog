# Git Workflow

This document defines the Git workflow used for DevLog.

The goal is to maintain a clean, production-ready history while building features incrementally.

---

# Branch Strategy

```
main
│
develop
│
├── feature/auth
├── feature/profile
├── feature/projects
├── feature/updates
├── feature/feed
├── feature/comments
├── feature/follow
├── feature/search
└── feature/landing
```

## Branches

### `main`

* Always stable and deployable.
* Only receives tested code.
* Every merge represents a milestone.

### `develop`

* Integration branch.
* Completed features are merged here first.
* Used for testing before release.

### `feature/*`

* One branch per feature.
* Keep changes focused on a single feature.

Examples:

```
feature/auth
feature/profile
feature/projects
feature/feed
feature/landing
```

### `fix/*`

Bug fixes.

Examples:

```
fix/session
fix/navbar
fix/theme
```

### `docs/*`

Documentation changes.

Examples:

```
docs/readme
docs/api
docs/mvp
```

### `refactor/*`

Code improvements without changing functionality.

Examples:

```
refactor/models
refactor/components
```

---

# Commit Convention

Use Conventional Commits.

Examples:

```
feat(auth): add GitHub authentication

feat(profile): create onboarding flow

feat(feed): render latest updates

feat(projects): create project model

fix(auth): resolve session refresh issue

refactor(feed): simplify update card

docs(mvp): define version one scope

style(theme): update color palette
```

Avoid messages like:

```
updated

changes

fixed stuff

final
```

---

# Development Workflow

1. Pull the latest `develop`.
2. Create a feature branch.
3. Build one feature.
4. Commit frequently with meaningful messages.
5. Push the feature branch.
6. Open a Pull Request into `develop`.
7. Test after merging into `develop`.
8. Merge `develop` into `main`.
9. Deploy from `main`.

---

# Releases

Tag meaningful milestones.

```
v0.1  Landing Page

v0.2  Authentication

v0.3  Projects

v0.4  Updates

v0.5  Feed

v1.0  MVP
```

---

# Principles

* `main` should always be deployable.
* Build one feature at a time.
* Keep commits small and focused.
* Prefer many small commits over one large commit.
* Every merge into `main` should represent visible progress.
* Treat Git history as part of the project's documentation.
