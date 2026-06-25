# Forma Prime

Forma Prime is an existing Telegram bot project migrated into the official SDD-GEN structure after the application had already been built.

The repository is in SDD bootstrap mode. No accepted client specifications exist yet, and product implementation work should wait until the first client Global Spec is created, reviewed, accepted, and declared in `specs/accepted/manifest.json`.

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

## Bootstrap Next Step

Use the raw knowledge file to prepare the first client Global Spec. Do not treat raw knowledge or legacy SDD documents as accepted product requirements.
