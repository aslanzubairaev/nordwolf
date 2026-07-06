# NORDWOLF

NORDWOLF is a Telegram bot and Telegram Mini App project managed through the official SDD-GEN workflow.

This repository was previously named `Forma Prime`. That name is legacy context only; accepted SDD specifications now define the product and migration direction.

The repository has exited initial SDD bootstrap mode. Product and repository work must follow accepted specs declared in `specs/accepted/manifest.json`.

## Application

- Runtime: Node.js and TypeScript.
- Bot framework: grammY.
- Database: Prisma with PostgreSQL.
- Bot source: `src/`.
- Telegram Mini App prototype/static UI: `miniapp/`.
- Prisma schema and migrations: `prisma/`.
- Tests: `tests/`.

## SDD Workflow

- Active raw knowledge: `project-knowledge/raw/RAW_PROJECT_KNOWLEDGE_CLIENT.md`.
- Draft specs: `specs/draft/`.
- Accepted specs: `specs/accepted/`.
- Change Requests: `specs/change-requests/`.
- Plans: `plans/active/` and `plans/done/`.
- Changelogs: `changelogs/`.

The legacy `sdd/` directory is historical and non-authoritative for the official workflow.

## Commands

```bash
npm run build
npm test
npm run validate
npm run validate:pre-commit
npm run validate:pre-push
npm run validate:ci
npm run review:hook
npm run hooks:install
```

## Current Next Step

Follow the active plan in `plans/active/` when one exists. Do not treat raw knowledge or legacy SDD documents as accepted product requirements.
