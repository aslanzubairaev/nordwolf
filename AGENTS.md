# Repository Agent Rules

This repository uses the official SDD-GEN workflow in bootstrap mode.

The live SDD-GEN structure is:

- `project-knowledge/raw/`
- `specs/draft/`
- `specs/accepted/`
- `specs/change-requests/`
- `plans/active/`
- `plans/done/`
- `changelogs/`
- `templates/`
- `docs/`
- `scripts/`
- `hooks/`
- `.agents/`, `.codex/`, and `.claude/`

## Bootstrap State

This is an existing Telegram bot repository migrated into SDD-GEN after the application was already built.

The project is still in bootstrap mode:

- `specs/accepted/manifest.json` must contain an empty `specs` array.
- No accepted client specs exist yet.
- No normal product implementation work may start until the first client Global Spec is created, reviewed, accepted, and declared in the manifest.
- First-spec preparation may be planless or may use a controlled bootstrap `OFFSPEC` plan only with explicit human approval.
- Do not create Draft specs, accepted specs, Change Requests, active plans, commits, branches, or pushes unless the human explicitly asks for that work.

## Legacy SDD Directory

The existing `sdd/` directory is legacy documentation from before the official SDD-GEN migration.

It is non-authoritative for the official SDD-GEN workflow.

Do not delete, move, rewrite, normalize, or otherwise modify `sdd/` unless the human explicitly asks for a legacy-doc migration task.

When legacy context is useful, treat `sdd/` as raw historical input only. Any product requirement inferred from it must be moved through the official workflow before it becomes authority.

## Authority Model

In generated or migrated client repositories, copied operational files are SDD process authority:

- `AGENTS.md`
- `docs/conventions.md`
- `docs/agent-review-hooks.md`
- templates
- hooks
- validation scripts
- package commands
- agent and skill files

Product and project behavior becomes authoritative only after client-local specs are accepted and declared in `specs/accepted/manifest.json`.

Draft specs and raw knowledge are not implementation authority. They may be incomplete, unreviewed, or stale.

## Required Reading Before Product Or Code Changes

Before making product or application-code changes:

1. Read this file.
2. Read `docs/conventions.md`.
3. Read `docs/agent-review-hooks.md`.
4. Inspect `specs/accepted/manifest.json`.
5. If the manifest is empty, stop before product implementation unless the human explicitly approves first-spec preparation or a controlled bootstrap `OFFSPEC` plan.
6. Review relevant raw knowledge in `project-knowledge/raw/` only as non-authoritative context.

For historical context only, you may inspect `sdd/README.md`, `sdd/method.md`, and `sdd/project-context.md`, but those files do not override the official workflow.

## Specification Rules

- Draft ordinary specs live in `specs/draft/`.
- Accepted ordinary specs live in `specs/accepted/`.
- All live Change Requests live in `specs/change-requests/`.
- The accepted manifest is `specs/accepted/manifest.json`.
- Only accepted specs declared in the manifest are specification authority.
- Accepted specs must not contain unresolved `agent-review` blocks.
- Accepted specs must contain a `review_resolution` block.
- Do not directly edit an accepted spec to change its meaning. Use a Change Request.

## Isolated Review

Never write `agent-review` notes from the same agent turn that created or edited the specification or Change Request.

After creating or modifying any `specs/draft/SPEC-*.md` document, or any `specs/change-requests/CR-*.md` document with `status: Draft` or `status: Review`, use an isolated subagent to review it.

The isolated reviewer must:

- read the target document;
- inspect `specs/accepted/manifest.json`;
- inspect directly referenced accepted specs when they exist;
- inspect `docs/conventions.md` and `docs/agent-review-hooks.md`;
- inspect related raw knowledge, templates, scripts, hooks, and code when needed;
- append or replace exactly one `agent-review` block at the very end of the target document.

Do not accept a spec or Change Request until the current isolated review has been read and every finding has been resolved, explicitly ignored, or deferred.

## Plans And Branches

Only one active plan is allowed.

Active plans live in `plans/active/`. Completed plans live in `plans/done/`.

A plan must be a focused implementation task, not a backlog.

A plan branch is created only after explicit human approval.

`main` is production. `dev` is shared development and the team source of truth.

Plans must reference accepted specs through `spec_refs` and inline `[SPEC: SPEC-*]` work items. Work not covered by accepted specs must use an explicit `[OFFSPEC: OFFSPEC-*]` item and a matching `Offspec Exceptions` section.

Pre-push and CI validation must fail while any active plan exists.

## Changelogs

Changelogs are organized by technical work area in `changelogs/`.

Update relevant changelog files when:

- a plan is completed;
- an accepted spec is added, changed, deprecated, or moved;
- the accepted manifest changes;
- a Change Request is accepted, rejected, superseded, or applied;
- bootstrap raw knowledge is classified, archived, or deleted;
- a migration, rollback, or manual operation changes project state.

Routine Draft edits do not require changelog entries unless they prepare acceptance or are part of a tracked plan.

## Validation Commands

Use the deterministic commands provided by `package.json`:

```bash
npm run validate
npm run validate:pre-commit
npm run validate:pre-push
npm run validate:ci
npm run review:hook
```

Application validation remains available through the existing project commands:

```bash
npm run build
npm test
```

## Application Preservation

Do not refactor, rename, move, or clean up application code as part of SDD process work.

Preserve existing Telegram bot behavior, dependencies, configuration, database files, environment files, migrations, tests, and application structure unless an accepted client spec or explicitly approved bootstrap exception authorizes a change.
