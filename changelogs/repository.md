# Changelog - Repository

## 2026-07-06 - PLAN-0001 - NORDWOLF repository naming migration

- Branch/PR: `plan-0001-chore-repository-naming-migration`
- Work area: `repository`
- Impacted areas: `specs`, `docs`
- Spec refs: `SPEC-FEATURE-001`
- Change request refs: None
- Summary: Updated repository identity after the GitHub rename, set the local `origin` URL to `https://github.com/aslanzubairaev/nordwolf.git`, verified the local folder at `C:\dev\NordWolf`, and created/pushed the shared `dev` branch from `main`.
- Tests/validations: `npm.cmd run validate`, `npm.cmd run build`, `npm.cmd test`, `npm.cmd run review:hook`
- Human verification: Human confirmed the local folder and GitHub repository had been renamed, then approved creating and pushing `dev`.
- Manual operations: Human renamed the local folder and GitHub repository; Git remote and `dev` branch setup were completed locally.
