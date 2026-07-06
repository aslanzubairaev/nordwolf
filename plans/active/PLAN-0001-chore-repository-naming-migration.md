---
id: PLAN-0001
status: Active
work_type: chore
work_area: repository
impacted_areas: ["specs", "docs"]
branch: plan-0001-chore-repository-naming-migration
spec_refs: ["SPEC-FEATURE-001"]
has_offspec: false
changelog_refs: ["changelogs/repository.md", "changelogs/docs.md", "changelogs/specs.md"]
human_verification_required: true
---

# PLAN-0001 - NORDWOLF naming migration

## Objective

Execute the accepted NORDWOLF naming migration safely, aligning repository metadata, package identity, current documentation, GitHub repository naming, and local folder naming with `NORDWOLF` / `nordwolf` while preserving application behavior, legacy evidence, environment files, database files, deployment behavior, PM2 behavior, and SDD history.

## Specification Sources

- `SPEC-FEATURE-001` - NORDWOLF naming migration
- `SPEC-GLOBAL-001` - NORDWOLF product vision

## Human Approval

- Approved by: Human
- Approved at: 2026-07-06
- Approval notes: Human agreed to create an active plan for the accepted naming migration spec.
- Scope changes approved: Not applicable

## Offspec Exceptions

None.

## Work Items

- [x] [SPEC: SPEC-FEATURE-001] Inventory current `Forma Prime`, `forma-prime`, `FORMA_PRIME`, `NordWolf`, `NORDWOLF`, and `nordwolf` references, excluding generated dependency folders and preserving legacy `sdd/` unchanged.
- [x] [SPEC: SPEC-FEATURE-001] Classify references as current identity, package/repository metadata, local path or remote configuration, deployment/PM2 identity, historical evidence, or application code identifier.
- [x] [SPEC: SPEC-FEATURE-001] Update safe current project metadata from `Forma Prime` / `forma-prime` to `NORDWOLF` / `nordwolf`, including `package.json` and package-lock consistency if npm requires it.
- [x] [SPEC: SPEC-FEATURE-001] Update current documentation such as `README.md` while preserving historical references that intentionally document the legacy `Forma Prime` context.
- [x] [SPEC: SPEC-FEATURE-001] Verify `ecosystem.config.cjs` and avoid PM2 changes if it already uses the correct `nordwolf` process and log naming.
- [x] [SPEC: SPEC-FEATURE-001] Prepare the GitHub repository rename from the old repository name to the chosen slug `nordwolf`.
- [x] [SPEC: SPEC-FEATURE-001] Update the local Git remote URL after the GitHub repository rename is complete.
- [x] [SPEC: SPEC-FEATURE-001] Rename the local folder from `C:\dev\Forma Prime` to `C:\dev\NordWolf` after closing tools or processes that hold the old path.
- [x] [SPEC: SPEC-FEATURE-001] Verify Git status, Git remote configuration, SDD validation, build, and tests after the rename.
- [x] [SPEC: SPEC-FEATURE-001] Update relevant changelogs before completing the plan.

## Automated Validation

- [x] Run `npm run build`.
- [x] Run `npm run validate`.
- [x] Run `npm test` only if the project has a valid test script.
- [x] Run `npm run review:hook` if specs or Change Requests are changed during the plan.
- [x] Verify package-lock consistency after package metadata changes.
- [x] Verify `git status --short`.
- [x] Verify `git remote -v`.
- [x] Update relevant changelogs.
- [ ] Rebase the branch on latest `dev` before marking the plan Done, if a plan branch is created.
- [ ] Rerun impacted validation after rebase or conflict fixes.

## Human Verification

This migration includes external and local-path operations that require human-visible verification.

### Prerequisites

- The accepted specs `SPEC-GLOBAL-001` and `SPEC-FEATURE-001` are present in the manifest.
- The human confirms the intended GitHub repository slug is `nordwolf`.
- The human confirms the intended local folder path is `C:\dev\NordWolf`.
- Any running editor, terminal, PM2 process, or service that holds `C:\dev\Forma Prime` can be closed or restarted when the folder rename is performed.

### Steps

1. Review the naming inventory and confirm which `Forma Prime` references are current identity versus historical evidence.
2. Confirm `package.json` and any required lockfile update show the intended `nordwolf` package identity without unrelated dependency churn.
3. Confirm current documentation presents the project as NORDWOLF while preserving useful legacy context.
4. Confirm `ecosystem.config.cjs` still uses the intended PM2 process and log names.
5. Rename the GitHub repository to `nordwolf` or confirm the final chosen slug.
6. Update and verify the local Git remote URL points to the renamed repository.
7. Rename the local folder to `C:\dev\NordWolf` or confirm the final chosen local folder casing.
8. Run the automated validation checklist after reopening the repository from the new local path.
9. Launch or inspect the bot/Mini App startup path only enough to confirm no rename-related runtime breakage is visible.

### Expected Results

- Current project identity uses NORDWOLF / `nordwolf` consistently where this plan changes it.
- Historical `Forma Prime` references remain only where they are intentionally preserved as legacy context or evidence.
- Existing Telegram bot behavior, Mini App behavior, database files, environment files, PM2 behavior, and deployment assumptions are not changed by the naming cleanup.
- Git remote configuration points to the renamed repository.
- The repository validates and builds after reopening from the renamed local folder.
- No unrelated dependency, schema, application-code, or environment changes are introduced.

### Evidence

- `npm.cmd run build`: passed after local folder and GitHub repository rename.
- `npm.cmd test`: passed after local folder and GitHub repository rename, 170 tests passed.
- `npm.cmd run validate`: passed in full mode after local folder and GitHub repository rename.
- `npm.cmd run review:hook`: passed after local folder and GitHub repository rename.
- `package-lock.json`: only root package names changed from `forma-prime` to `nordwolf`; no dependency churn observed.
- `git remote -v`: points to `https://github.com/aslanzubairaev/nordwolf.git`.
- Local folder path: reopened and verified at `C:\dev\NordWolf`.
- Git branches: `dev` exists locally and on `origin/dev`; current work is on `plan-0001-chore-repository-naming-migration`.
- Preserved historical `Forma Prime` references: `fix-06-review-pack.md`, legacy `sdd/`, accepted specs that intentionally describe legacy context.

## Completion Notes

Fill this when moving the plan to `plans/done/`.

- Approval summary:
- Final validation:
- Human verification:
- Changelog updates:
- Rebase status:
- Push/PR status:
- State reversals:
