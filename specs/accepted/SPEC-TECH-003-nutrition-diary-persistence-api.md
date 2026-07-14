---
id: SPEC-TECH-003
type: TechnicalSpec
status: Accepted
title: Nutrition diary persistence and API contract
parent: SPEC-FEATURE-003
depends_on: ["SPEC-FEATURE-003", "SPEC-TECH-002"]
related_specs: ["SPEC-FEATURE-002", "SPEC-TECH-001"]
work_area: api
---

<!-- review-resolution:start -->
review_resolution:
  agent_review_read: true
  agent_review_resolved_or_explicitly_ignored: true
  unresolved_agent_review_blocks_removed: true
  human_acceptance_confirmed: true
<!-- review-resolution:end -->

# Nutrition Diary Persistence And API Contract

## Functional Justification

`SPEC-FEATURE-003` defines the first nutrition diary behavior: users can log food, see consumed and remaining calories/macros, correct saved entries, handle multi-food messages, and keep the Telegram bot and Mini App consistent.

`SPEC-TECH-002` defines the accepted calorie and macro targets that the diary compares consumed food against.

This TechnicalSpec defines the server-side persistence and API contract needed for the bot and Mini App to share one nutrition diary source of truth.

## Technical Scope

The first nutrition diary implementation needs a durable server-side model for food entries and daily diary reads.

The technical contract must support:

- creating a food entry from the bot or Mini App;
- creating one logging action that contains one or more food items;
- reading diary entries for a selected diary date;
- calculating consumed calories, protein, fat, and carbohydrates from persisted entries;
- comparing consumed totals with accepted active targets when targets are available;
- editing a saved entry or a food item inside a multi-food entry;
- deleting a saved entry or a food item inside a multi-food entry;
- preventing obvious duplicate submissions;
- returning clear save, edit, delete, and validation errors;
- keeping bot and Mini App behavior consistent through shared persisted data.

This spec does not define food parsing, food database search, AI prompt design, or final Mini App visual layout.

## Persistence Backend

The first nutrition diary version must use the existing server-side Prisma/PostgreSQL application data layer as the durable persistence backend for diary entries and diary items.

The PostgreSQL database accessed through the server-side data layer is the source of truth for saved nutrition diary data in the first version.

When the deployed database is hosted by Supabase, Supabase is treated as the PostgreSQL host, not as a client-side diary API authority.

The Telegram bot must not store the nutrition diary in Telegram chat state, in-memory state, or temporary session state as the durable record.

The Mini App must not store the nutrition diary only in browser local state, local storage, or a client cache as the durable record.

Bot and Mini App code should access diary data through a shared server-side service or API layer that reads and writes through the existing Prisma/PostgreSQL data layer.

The first version must not require the Mini App client to write directly to Supabase or PostgreSQL with broad client-side permissions.

Temporary client or chat state may be used only for pending entry drafts, confirmations, retries, or UI loading state before persistence succeeds.

Daily totals must be derived from saved PostgreSQL-backed diary items, not from Telegram state or Mini App local state.

## Diary Date Contract

Every persisted diary entry must have a `diary_date`.

`diary_date` is a calendar date, not a timestamp.

The server must derive `diary_date` using the effective diary timezone from `SPEC-FEATURE-003`:

1. a validated user profile timezone when a later accepted spec adds one;
2. `Europe/Paris` until user timezone exists.

The server must not rely on the client browser date, Telegram client date, UTC date, or database server-local date as the only diary-date authority.

API requests may provide an explicit selected diary date when the Mini App is viewing another day.

Bot logging may provide supported date intent metadata, such as `today` or `yesterday`, after the bot parser resolves it.

Unsupported or ambiguous date intents must not silently save into today's diary.

## Logical Data Model

The first implementation should model a saved nutrition logging action separately from its food items.

A `nutrition_diary_entry` represents one user-visible saved logging action.

It must include at least:

- stable entry identifier;
- user identifier;
- diary date;
- meal section: breakfast, lunch, dinner, or snack;
- source surface: bot or Mini App;
- entry status: pending, saved, failed, or deleted when soft deletion is used;
- idempotency key or duplicate-submit guard key when available;
- created timestamp;
- updated timestamp.

A `nutrition_diary_item` represents one food item inside an entry.

It must include at least:

- stable item identifier;
- parent entry identifier;
- display food name;
- quantity value;
- quantity unit;
- normalized grams when available;
- normalized milliliters when available;
- calories;
- protein grams;
- fat grams;
- carbohydrate grams;
- estimate flag;
- nutrient source type, such as food database, deterministic parser, manual entry, or AI estimate;
- source reference identifier when a matched food database item exists;
- created timestamp;
- updated timestamp.

The implementation may physically store this as separate tables, embedded item JSON, or another structure supported by the existing data layer, but the API behavior must preserve the logical entry/item relationship.

Grouped multi-food entries must retain per-item nutrition details. A grouped entry must not collapse multiple foods into only one aggregate row if that would prevent item-level display, recalculation, correction, or deletion.

## Prisma Model Shape

The existing Prisma schema already contains `MealEntry` and `MealEntryItem` models that match the diary entry/item concept.

The first implementation should extend or adapt the existing `MealEntry` and `MealEntryItem` models instead of introducing parallel `NutritionDiaryEntry` and `NutritionDiaryItem` models, unless implementation discovery proves the existing models cannot safely support the accepted diary behavior.

`MealEntry` should represent one saved diary logging action.

It should retain or add fields equivalent to:

- `id`;
- `userId`;
- `telegramUserId` when the entry originates from or is associated with a Telegram user;
- `diaryDate`;
- `consumedAt`;
- `mealSection`;
- `sourceSurface`;
- `rawText`;
- `status`;
- `idempotencyKey` or equivalent duplicate-submit key;
- `totalCalories`;
- `totalProteinG`;
- `totalFatG`;
- `totalCarbsG`;
- `createdAt`;
- `updatedAt`;
- deletion metadata.

`MealEntryItem` should represent one food item inside a saved diary entry.

It should retain or add fields equivalent to:

- `id`;
- `mealEntryId`;
- `foodId` when matched to a catalog food;
- `customFoodId` when matched to a user custom food;
- `matchedName` or display food name;
- `quantity`;
- `unit`;
- `grams` when available;
- `milliliters` when available;
- `calories`;
- `proteinG`;
- `fatG`;
- `carbsG`;
- `isEstimate`;
- `nutrientSourceType`;
- `sourceReferenceId` when needed for non-catalog sources;
- `createdAt`;
- `updatedAt`;
- deletion metadata.

The implementation should add indexes that support efficient diary reads by user and diary date.

The implementation should enforce user-owned access through the entry relationship. Item-level update and delete operations must verify ownership through the parent `MealEntry`.

Model names may remain `MealEntry` and `MealEntryItem` to preserve existing code and migrations, even though the user-facing product calls this the nutrition diary.

## Nutrition Values At Save Time

The system must persist the nutrition values accepted at save time.

Saved diary totals must be calculated from persisted entry item values, not by re-querying food database records on every diary read.

Later changes to a food database record must not silently rewrite historical diary entries unless a later accepted spec defines an explicit reprocessing workflow.

Calories and macro grams should use numeric types that avoid avoidable floating-point drift in daily totals. Implementation may use integers for calories and fixed-precision decimals for grams.

## Create Entry Contract

The create-entry operation must accept one logging action with:

- user identity from authenticated Telegram/Mini App context;
- diary date or date intent;
- meal section when known;
- one or more proposed food items;
- source surface;
- idempotency key or client request identifier when available.

The server must reject or require clarification before persistence when required data is missing:

- user identity;
- diary date;
- meal section;
- at least one food item;
- quantity for an item when no accepted mapping or estimate exists;
- calories, protein, fat, or carbohydrates for an item.

The server must treat an entry as saved only after persistence succeeds.

The response for a successful create must include:

- saved entry identifier;
- saved item identifiers;
- diary date;
- meal section;
- persisted per-item nutrition values;
- recalculated diary totals for the selected diary date;
- target comparison when targets are available.

The response for a failed create must not include the failed entry in persisted daily totals.

## Transaction Boundaries

Create, update, and delete operations must preserve diary consistency.

Creating a diary entry and its items should happen in one database transaction or equivalent atomic persistence operation.

If any item in a multi-food create fails validation or persistence, the create operation must not leave a partially saved entry that contributes to diary totals.

Updating an entry and its affected items should happen in one transaction or equivalent atomic operation when multiple records are changed.

Deleting an entry or item and recalculating the returned diary day response should observe a consistent persisted state after the deletion has been applied.

The API should return a success response only after the durable persistence operation succeeds.

Pending or failed entries may exist only as implementation-internal state. They must not appear as saved diary records and must not contribute to consumed totals.

## Diary Day Response Contract

Create, update, delete, and read operations should return a consistent diary day response shape.

The response should include:

- diary date;
- effective diary timezone;
- meal sections;
- saved entries grouped by meal section;
- per-entry food items;
- consumed totals for calories, protein, fat, and carbohydrates;
- target values when available;
- target status for calories, protein, fat, and carbohydrates when targets are available;
- target-unavailable state when targets are unavailable;
- operation result metadata for create, update, and delete calls.

Target status should include:

- target value;
- consumed value;
- remaining amount when below target;
- reached state when consumed equals target;
- over-target amount when consumed is above target.

When targets are unavailable, the response must not include fake remaining values, fake progress percentages, or over-target states.

After create, update, or delete succeeds, the response should represent the selected diary date after the mutation has been applied.

The bot and Mini App should use this response or an equivalent shared service result instead of independently recalculating user-visible diary status from partial local state.

## Read Diary Contract

The read-diary operation must return the diary state for one user and one selected diary date.

It must include:

- diary date;
- effective diary timezone;
- meal sections;
- saved entries grouped by meal section;
- per-entry food items;
- consumed totals for calories, protein, fat, and carbohydrates;
- target values when available;
- remaining, reached, or over-target status for each tracked target when targets are available;
- target-unavailable state when targets are not available.

Consumed totals must be calculated from persisted saved entries for the selected diary date.

Deleted entries and deleted items must not contribute to consumed totals.

Pending or failed entries must not contribute to consumed totals unless they have been successfully persisted as saved entries.

## Update And Delete Contract

The update-entry operation must allow correction of:

- meal section;
- display food name;
- quantity value;
- quantity unit;
- calories;
- protein grams;
- fat grams;
- carbohydrate grams;
- estimate flag;
- nutrient source type.

For multi-food entries, the API must provide a way to update or delete one item without forcing the user to recreate the entire meal when per-item details are already persisted.

The implementation may expose item-level endpoints or an entry-level update payload that contains item-level changes.

After update or delete, the response should include recalculated diary totals for the selected diary date.

Update and delete operations should use stale-edit protection.

The client or bot should send the last seen `updatedAt` value or an equivalent version token for the entry or item being changed.

If the persisted entry or item changed after that version was read, the server should reject the mutation with `STALE_ENTRY_VERSION` instead of overwriting newer data.

After a stale-version error, the bot or Mini App should reload the selected diary date or affected entry before allowing the user to retry.

The first version should use soft delete for normal user-facing deletion of diary entries and diary items.

Soft-deleted entries and items must be excluded from:

- diary reads;
- consumed totals;
- remaining counters;
- over-target status;
- recent-food lookup;
- duplicate-submit checks;
- normal edit flows.

Soft delete should store deletion metadata equivalent to:

- deleted timestamp;
- deleted by surface or actor when available;
- deletion reason when available.

Hard delete may still be used for failed pending entries that were never visible as saved user diary records, or for maintenance operations outside normal user-facing deletion.

The first version does not need user-visible restore or deletion history. A later accepted audit or history spec may define that behavior.

## Duplicate Submission And Idempotency

The first version must guard against obvious repeated submits of the same pending entry.

The preferred contract is an idempotency key generated by the client or bot for a single logging action.

An idempotency key must represent one user save attempt, not a food identity.

The same user may intentionally log the same food more than once. A new intentional logging action must use a new idempotency key.

The server should treat idempotency keys as scoped by user. The same key reused by different users must not collide across users.

When the same idempotency key is submitted again for the same user and equivalent diary entry request, the server should return the already saved result instead of creating a duplicate.

If the same idempotency key is reused by the same user with a materially different payload, the server should reject the request with an idempotency conflict instead of overwriting the original saved entry or creating a second entry.

If no idempotency key is available, the server may still use a narrow duplicate guard based on user, source surface, recent timestamp window, meal section, diary date, and normalized proposed items.

The fallback duplicate guard should be conservative. It should catch obvious immediate repeated submits, such as double-click save or a retried bot callback, but it must not block normal repeated meals across different times, meals, or deliberate new logging actions.

The duplicate guard must not block legitimate repeated foods across different meals or deliberate repeated entries.

Duplicate-looking entries that are saved must remain deletable or correctable through the normal saved-entry path.

## Totals And Target Comparison

Daily consumed totals are derived by summing saved, non-deleted diary items for the selected diary date:

```text
consumed_calories = sum(item.calories)
consumed_protein_g = sum(item.protein_g)
consumed_fat_g = sum(item.fat_g)
consumed_carbohydrate_g = sum(item.carbohydrate_g)
```

When accepted daily targets from `SPEC-TECH-002` are available, the API must return target status values using:

```text
remaining = target - consumed
```

If remaining is greater than zero, status is remaining.

If remaining equals zero, status is reached.

If remaining is less than zero, status is over target and the over amount is `consumed - target`.

When targets are unavailable, the API must return consumed totals and a target-unavailable state without fake remaining values, progress percentages, or over-target states.

For previous diary dates, the first version may compare against the user's currently active accepted targets until a later accepted spec defines historical target snapshots.

## API / Interfaces

The exact transport may follow the existing project API style, but the server must expose equivalent operations for:

- create nutrition diary entry;
- read nutrition diary day;
- update nutrition diary entry or item;
- delete nutrition diary entry or item.

Bot and Mini App code must use these shared server operations or a shared service layer with equivalent behavior.

The bot must not maintain an independent diary total in Telegram chat state.

The Mini App must not treat local browser state as the source of truth after persistence.

## Error Model

The API should return structured errors for:

- onboarding or profile update required;
- targets unavailable when the requested action depends on targets;
- missing meal section;
- unsupported diary date intent;
- ambiguous quantity;
- unsupported quantity unit;
- unknown food item;
- missing nutrient values;
- duplicate submit detected;
- stale entry or item version during edit;
- save failure;
- unauthorized user access.

Errors should include enough context for the bot or Mini App to choose retry, edit, clarification, cancel, onboarding, or reload behavior.

The first version should use stable error codes equivalent to:

- `ONBOARDING_REQUIRED`;
- `PROFILE_UPDATE_REQUIRED`;
- `TARGETS_UNAVAILABLE`;
- `MEAL_SECTION_REQUIRED`;
- `UNSUPPORTED_DATE_INTENT`;
- `AMBIGUOUS_QUANTITY`;
- `UNSUPPORTED_QUANTITY_UNIT`;
- `UNKNOWN_FOOD`;
- `MISSING_NUTRIENT_VALUES`;
- `DUPLICATE_SUBMIT_DETECTED`;
- `IDEMPOTENCY_CONFLICT`;
- `STALE_ENTRY_VERSION`;
- `SAVE_FAILED`;
- `UNAUTHORIZED`.

A structured error should include:

- `code`;
- short localized or localizable user-facing message key or message;
- `field` when the error is tied to one input field;
- `entryId` or `itemId` when the error is tied to an existing saved record;
- `nextAction`.

`nextAction` should use a bounded set equivalent to:

- `retry`;
- `edit`;
- `clarify`;
- `cancel`;
- `onboarding`;
- `profile_update`;
- `reload`;
- `none`.

The bot and Mini App should branch on `code` and `nextAction`, not on free-form error text.

## Security And Privacy

Diary entries are user-owned data.

The server must authorize every create, read, update, and delete operation against the authenticated Telegram user or accepted app user identity.

One user must not be able to read, edit, or delete another user's diary entries.

The API must not accept a user identifier from untrusted client input as the sole authority for ownership.

The server should derive the acting user from trusted Telegram bot context, verified Mini App launch/auth context, or an existing accepted server session mechanism.

Create operations must attach new entries to the authenticated user resolved by the server, not to a client-supplied owner id alone.

Read operations must filter diary data by the authenticated user and selected diary date.

Entry update and delete operations must verify that the target `MealEntry` belongs to the authenticated user before applying changes.

Item update and delete operations must verify ownership through the parent `MealEntry.userId`; an item identifier by itself is not sufficient authorization.

When create or update payloads reference user-owned records, such as `customFoodId`, the server must verify that those records belong to the authenticated user before attaching them to a diary item.

The server must not allow a user to create or update a diary item using another user's custom food, learned user-specific food record, or other user-owned nutrition reference.

Shared catalog food references may be used only when the referenced catalog food is active and available to the product according to the food data layer.

When a user tries to access an entry or item they do not own, the API should return `UNAUTHORIZED` or a safe not-found response that does not reveal whether another user's record exists.

AI-estimated nutrition values must be stored only after the user confirms the reviewed estimate.

The first version must not fast-save AI-estimated items through a high-confidence path because `SPEC-FEATURE-003` defines high-confidence entries as requiring no AI fallback.

## Performance

Reading one diary day should avoid scanning unrelated users or unrelated diary dates.

The implementation should support efficient lookup by user identifier and diary date.

Daily totals may be calculated on read from saved items for the selected date in the first version.

If cached or denormalized totals are introduced later, they must remain consistent with persisted entries and must be invalidated or recomputed after create, update, and delete.

## Migration / Operations

The implementation will require a persistence migration or equivalent data-layer setup for diary entries and items.

The first implementation should migrate by extending the existing `MealEntry` and `MealEntryItem` Prisma models when feasible.

The migration should add the required diary fields, indexes, soft-delete metadata, idempotency support, and item provenance fields needed by this spec.

Existing user profiles and accepted targets must not be rewritten by the diary migration.

Existing nutrition food catalog, custom food, learned food, workout, progress, reminder, and conversation-state data must not be rewritten by the diary migration unless a later accepted spec explicitly requires it.

The migration must preserve existing Telegram bot behavior outside the nutrition diary surface.

If existing `MealEntry` or `MealEntryItem` rows lack newly required fields, the migration must provide safe defaults, nullable transition fields, or a documented compatibility path so existing reads do not fail.

Existing rows must not be silently assigned inaccurate meal sections, diary dates, source surfaces, idempotency keys, or estimate provenance in a way that presents guessed data as known.

If legacy nutrition logs exist, importing them is out of scope for this first diary persistence contract unless a later accepted migration spec defines the mapping.

## Acceptance Checklist

This TechnicalSpec is ready for implementation planning when it defines:

- Prisma/PostgreSQL server-side source of truth;
- Supabase as PostgreSQL hosting only when applicable;
- diary-date ownership and timezone handling;
- extension of existing `MealEntry` and `MealEntryItem` Prisma models;
- logical entry and item model fields;
- per-item persistence for multi-food entries;
- create, read, update, and delete operations;
- diary day response contract;
- transaction boundaries for create, update, and delete;
- idempotency or duplicate-submit protection;
- soft-delete behavior and exclusions from reads/totals;
- stale edit and delete protection;
- daily total calculation from persisted items;
- target comparison response behavior;
- unavailable-target response behavior;
- bot and Mini App shared source-of-truth boundary;
- structured error behavior;
- authorization boundary for diary data;
- user-owned nutrition reference checks;
- migration and compatibility boundary for existing data.

## Out Of Scope

This spec does not define:

- food database schema;
- food search or matching algorithm;
- parser implementation;
- AI prompt or model;
- barcode scanning;
- photo recognition;
- custom food management;
- saved meal templates;
- meal plan generation;
- historical target snapshots;
- exact SQL table names;
- exact HTTP route names;
- final Mini App visual design.
