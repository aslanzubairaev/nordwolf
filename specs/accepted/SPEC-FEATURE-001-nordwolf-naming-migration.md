---
id: SPEC-FEATURE-001
type: FeatureSpec
status: Accepted
title: NORDWOLF naming migration
parent: SPEC-GLOBAL-001
depends_on: []
related_specs: []
work_area: specs
---

<!-- review-resolution:start -->
review_resolution:
  agent_review_read: true
  agent_review_resolved_or_explicitly_ignored: true
  unresolved_agent_review_blocks_removed: true
  human_acceptance_confirmed: true
<!-- review-resolution:end -->

# NORDWOLF Naming Migration

## User Goal

The project owner wants the repository, local project identity, and operational naming to align with the accepted product name `NORDWOLF`.

This migration should remove the temporary `Forma Prime` project identity where it is only a legacy repository name, while preserving existing application behavior, data, configuration, environment files, deployment behavior, and SDD history.

The accepted product name is `NORDWOLF`. Technical slugs should use `nordwolf` where lowercase names are required or conventional, such as package names, repository slugs, process slugs, and URLs.

## Main Flow

1. Inventory current naming references before changing anything.
2. Classify each reference as one of:
   - product/user-facing identity;
   - repository or package metadata;
   - local path or Git remote configuration;
   - deployment or PM2 process identity;
   - historical documentation or legacy evidence;
   - application code identifier.
3. Rename repository metadata from `Forma Prime` / `forma-prime` to the accepted NORDWOLF identity where safe.
4. Rename documentation that describes the current project identity, while preserving historical notes that intentionally mention `Forma Prime` as legacy context.
5. Rename the GitHub repository to the chosen slug, preferably `nordwolf`.
6. Update the local Git remote URL after the GitHub repository is renamed.
7. Rename the local project folder from `C:\dev\Forma Prime` to the chosen local folder name, preferably `C:\dev\NordWolf`.
8. Verify package metadata, lockfile consistency, Git remote configuration, SDD validation, build, and tests after the rename.

## Alternate Flows

If GitHub rename is not available immediately, the local repository may temporarily keep the old remote while local metadata and documentation are prepared.

If the local folder rename is blocked by a running terminal, editor, PM2 process, or file lock, it should be performed manually after closing active processes that hold the path.

If package metadata changes require `package-lock.json` consistency updates, the lockfile may be updated only for the root package identity and only when required by npm consistency.

If a `Forma Prime` reference is historical evidence, legacy documentation, or a preserved external reference, it may remain with clear context instead of being rewritten.

## Unfavorable Cases

The migration must avoid:

- breaking Telegram bot behavior;
- changing bot commands, Mini App flows, database schema, migrations, or runtime logic;
- deleting or rewriting environment files;
- changing secrets, database URLs, bot tokens, webhook URLs, or provider credentials;
- breaking PM2 process management or log paths;
- breaking local Git remote configuration;
- changing accepted specs without a Change Request;
- rewriting the legacy `sdd/` directory;
- hiding useful historical references that explain why the project was previously called `Forma Prime`.

## Expected System Behavior

After the migration is implemented and verified:

- the repository and local project identity should consistently present as NORDWOLF;
- package metadata should use the lowercase slug `nordwolf`;
- the local folder should use `NordWolf` unless a different local folder name is explicitly chosen;
- GitHub should use the `nordwolf` repository slug unless unavailable;
- SDD documents should continue to validate;
- existing app behavior should remain unchanged;
- current data, environment files, database files, PM2 configuration, and deployment workflows should remain preserved unless a future accepted spec explicitly changes them.

The current `ecosystem.config.cjs` already appears to use `nordwolf` for the PM2 process and log names. Future implementation should verify this before making any PM2 changes.

## Out of Scope

This spec does not authorize:

- redesigning the Telegram bot or Mini App;
- changing application behavior;
- changing database schema or migrations;
- changing nutrition, workout, progress, reminder, onboarding, AI, or localization behavior;
- creating new product copy beyond naming cleanup;
- accepting new user-facing feature requirements;
- changing secrets or environment values;
- deleting historical legacy documentation;
- committing, pushing, or opening pull requests.
