---
id: SPEC-TECH-001
type: TechnicalSpec
status: Accepted
title: Bot and Mini App onboarding contract
parent: SPEC-FEATURE-002
depends_on: []
related_specs: ["SPEC-FEATURE-002", "SPEC-GLOBAL-001"]
work_area: api
---

<!-- review-resolution:start -->
review_resolution:
  agent_review_read: true
  agent_review_resolved_or_explicitly_ignored: true
  unresolved_agent_review_blocks_removed: true
  human_acceptance_confirmed: true
<!-- review-resolution:end -->

# Bot And Mini App Onboarding Contract

## Functional Justification

`SPEC-FEATURE-002` requires a focused TechnicalSpec before any implementation plan replaces full Telegram bot onboarding with Mini App onboarding or changes persisted onboarding completion behavior.

This TechnicalSpec defines the contract that lets the Telegram bot, Mini App, and server agree on onboarding identity, partial progress, completion, stale state, duplicate submits, Mini App launch failure, and legacy profile compatibility.

The goal is to make the staged transition safe:

1. Mini App onboarding may be prototyped without becoming the authoritative onboarding path.
2. After this contract is accepted and implemented through an approved plan, new users may be routed from the bot into Mini App onboarding.

## Technical Scope

This spec defines:

- the canonical onboarding state model;
- the persisted onboarding profile contract;
- the partial onboarding draft contract;
- bot routing states;
- Mini App state loading and saving behavior;
- completion and duplicate-submit behavior;
- stale-client handling;
- Mini App launch-failure behavior;
- legacy profile compatibility boundaries;
- migration and operational requirements for moving from bot onboarding to Mini App onboarding.

This spec does not define:

- Mini App visual design;
- calorie or macro target formulas;
- nutrition diary implementation;
- workout, progress, reminder, or wolf mechanics;
- final database migration code;
- final endpoint names if the implementation uses an equivalent typed interface.

## Contract Principles

The server is the authority for onboarding state.

The Telegram bot is the entry and recovery surface. It may route the user into the Mini App, show retry or blocked-state messages, and preserve existing quick-action safety checks.

The Mini App is the structured onboarding surface. It may collect answers, save partial progress, complete onboarding, and route the user to the first daily diary-style home screen after completion.

The Mini App must not decide completion from local browser state alone. It must load server state before resuming, completing, or showing the post-onboarding home surface.

The contract must be idempotent. Repeated saves, repeated completion submits, Telegram reopen events, or device changes must not create duplicate completed profiles or contradictory profile states.

## User Identity

All onboarding state must belong to one canonical server-side user record created or resolved from Telegram identity.

The bot and Mini App must resolve the same user by Telegram identity. The Mini App must not create an unrelated user record when it is opened from Telegram.

Mini App writes must be accepted only after the server verifies Telegram Mini App launch identity, such as Telegram Web App `initData`, or an equivalent authenticated server-issued session derived from it.

If identity verification fails, the Mini App must not save onboarding data. It should show a retry or blocked state and route the user back to the bot when possible.

## Onboarding State Model

The canonical onboarding status values are:

- `not_started`: no accepted onboarding profile or draft exists for the user;
- `in_progress`: a partial onboarding draft exists but completion has not been confirmed;
- `complete`: the user has a profile that satisfies the accepted onboarding model;
- `needs_profile_update`: a legacy or stale profile exists but is missing fields required by the accepted onboarding model;
- `blocked`: onboarding cannot continue automatically because identity, storage, migration, or Mini App launch recovery failed.

The server must derive the status from persisted data. The client may display status but must not be the authority.

Completion requires all fields required by `SPEC-FEATURE-002` for the selected goal, except calorie and macro targets, which remain gated by the future calorie/macro TechnicalSpec.

## Onboarding Model Version

The first accepted Mini App onboarding model version must be represented by a stable value equivalent to `mini_app_onboarding_v1`.

The model version must be stored with completed profiles and partial drafts. It is used to decide whether a saved draft or legacy profile can still be resumed, needs a profile update, or must restart onboarding.

The model version must change only when the accepted onboarding contract changes in a way that affects required fields, step order compatibility, profile completion rules, or legacy-profile classification.

Adding optional UI copy, visual design changes, or non-required optional fields must not require a model-version change by itself.

When the server sees an older model version:

- a completed profile may remain `complete` if all fields required by the current accepted onboarding model can be derived safely;
- a completed profile must become `needs_profile_update` if only specific missing fields are needed;
- a completed profile must require rerun onboarding only when the old data cannot be mapped safely;
- a partial draft may resume only when its saved step and answers are compatible with the current canonical steps and required fields;
- an incompatible partial draft must be restarted or discarded through an explicit restart path rather than silently treated as complete.

## Canonical Steps

The first Mini App onboarding contract must use a canonical step model so the bot, Mini App, partial draft, validation layer, and tests refer to the same workflow points.

The canonical step identifiers are:

- `language`: confirm or choose Russian, English, or French;
- `goal`: choose `fat_loss`, `recomposition`, or `muscle_gain`;
- `goal_context`: collect goal-specific target context, such as target weight for fat loss or muscle gain, or recomposition main result and scale-weight direction;
- `body_metrics`: collect sex or gender, age, height, and current weight;
- `activity`: collect activity level;
- `training_context`: collect training frequency or first-version training context;
- `review`: show the full review surface and required plain-language data-use note;
- `complete`: server-confirmed completion state after successful final submit.

The implementation may combine adjacent steps in the UI when the user experience remains clear, but persisted draft state and validation must still map to these canonical identifiers or an equivalent typed model.

The `complete` step is not a client-entered form step. It represents the server-confirmed result after atomic completion.

## Persisted Profile Contract

A completed onboarding profile must persist at least:

- user identity reference;
- preferred language: `ru`, `en`, or `fr`;
- primary goal: `fat_loss`, `recomposition`, or `muscle_gain`;
- sex or gender value required for first-version nutrition calculations: `male` or `female`;
- age;
- height in centimeters;
- current weight in kilograms;
- activity level;
- training frequency or training context;
- onboarding status or completion marker;
- onboarding completion timestamp;
- onboarding model version.

For `fat_loss`, the profile must also persist desired target weight in kilograms.

For `muscle_gain`, the profile must persist desired final target weight in kilograms. If the UI lets the user enter an amount to gain, the server-side profile must store the resulting final target weight.

For `recomposition`, the profile must persist:

- main recomposition result;
- desired scale-weight direction.

The completed profile must not require exact recomposition target weight or body measurements in the first onboarding slice.

The profile contract must allow future profile update flows to add optional fields without forcing a full onboarding rerun for already complete users.

## Partial Draft Contract

The system must persist partial onboarding progress separately from completed profile authority, or use an equivalent structure that can clearly distinguish partial answers from a completed profile.

The implementation may use separate database tables, JSON fields, or an adapter around existing profile storage, but the data model must keep these concepts logically distinct:

- partial onboarding draft data;
- completed authoritative profile data;
- profile-update state for existing users missing required fields;
- stale or incompatible draft state;
- blocked state caused by identity, storage, migration, or Mini App launch recovery failure.

No partial draft field may by itself make the user eligible for completed-profile behavior, quick actions, or the first post-onboarding home route.

No completed profile field should be overwritten by partial draft data until final completion or an explicit profile-update save succeeds.

A partial draft must track:

- user identity reference;
- onboarding model version;
- selected or inferred language when available;
- current step or last safe resume point;
- partial answers collected so far;
- draft update timestamp;
- draft revision or equivalent concurrency marker.

Partial draft data must not make quick tracking features treat the user as fully onboarded.

If a user abandons onboarding, the next bot or Mini App entry should resume at the last safe step when the saved draft is compatible with the current onboarding model. If the draft is incompatible, the product should restart onboarding or route to a clear profile-update path.

Partial drafts should remain resumable while they are compatible with the current onboarding model. The first contract should not automatically delete a compatible draft only because time passed.

An implementation may mark a draft as stale when it has not been updated for a long period, such as 30 days or more, but stale compatible drafts should still offer a clear continue-or-restart choice rather than silently losing answers.

Partial drafts must become incompatible when:

- their onboarding model version no longer maps safely to the current accepted model;
- their saved current step does not map to a canonical step;
- their selected goal is no longer supported;
- required goal-specific answers cannot be interpreted safely;
- the server cannot verify the owning Telegram identity.

When a draft is incompatible, the server must not merge it into a completed profile. The Mini App should show a clear restart or profile-update path depending on whether a completed compatible profile already exists.

## API / Interfaces

The implementation must provide a server-side interface equivalent to these operations:

- load onboarding state for the current Telegram user;
- save or update one onboarding step;
- complete onboarding from a full validated payload;
- discard or restart an incompatible draft when allowed;
- classify an existing profile as complete, incomplete, stale, or needing profile update;
- return the first post-onboarding route after successful completion.

The exact endpoint paths, controllers, and file locations may be chosen during implementation, but the behavior must remain typed and testable.

The load-state response must include:

- current onboarding status;
- current onboarding model version;
- selected language or default language;
- resume step or first step;
- partial answers safe to show to the user;
- whether the user may access the daily diary-style home screen;
- a stale-state marker when the client must reload before saving.

The save-step request must include:

- step identifier;
- step payload;
- client-known draft revision or equivalent stale-state marker.

The save-step response must include:

- updated draft revision;
- normalized saved value;
- next recommended step;
- validation errors when the value is rejected.

The complete request must include:

- full onboarding payload;
- client-known draft revision or equivalent stale-state marker;
- client request identifier or equivalent idempotency key;
- confirmation that the Mini App showed the final review step with the required plain-language data-use note before submit.

The complete response must include:

- final onboarding status;
- persisted profile summary;
- whether calorie and macro targets are available;
- first post-onboarding route.

Before the Mini App sends a complete request, it must show a final confirmation surface that includes a short plain-language data-use note explaining that profile data is used to calculate goals and personalize nutrition, training, progress, reminders, and future product surfaces. The server contract must treat completion as invalid if the implementation bypasses this required confirmation step.

## Validation

Server-side validation is required for every saved step and for final completion.

Validation must reject:

- unsupported language;
- unsupported primary goal;
- missing required fields for the selected goal;
- non-metric first-version body inputs;
- impossible or clearly invalid numeric values;
- recomposition completion without main result and scale-weight direction;
- fat-loss or muscle-gain completion without final target weight;
- stale revision completion when the server state changed after the client loaded it.

Validation errors must be structured enough for the Mini App to show local correction messages.

Structured errors should use stable machine-readable codes. The first contract must support codes equivalent to:

- `identity_verification_failed`;
- `unsupported_language`;
- `unsupported_goal`;
- `missing_required_field`;
- `invalid_field_value`;
- `invalid_step`;
- `stale_revision`;
- `draft_not_found`;
- `already_completed`;
- `conflicting_completion_payload`;
- `profile_update_required`;
- `blocked_state`;
- `server_unavailable`.

Each structured error must include enough context for the Mini App to decide whether to keep the user on the same step, reload state, route to profile update, show a retry, or return to the bot.

The exact numeric bounds for calorie and macro calculation remain out of scope for this contract unless they are needed only to reject impossible profile inputs. Formula-specific bounds must be defined by the calorie/macro TechnicalSpec.

## Completion And Idempotency

Completion must be atomic: the product must not leave the user with a partially completed authoritative profile if the final save fails.

Repeated completion submits with the same idempotency key and same payload must return the already completed result.

Repeated completion submits with a conflicting payload after completion must not silently overwrite the completed profile. The implementation must route the user to a profile-update flow or return a conflict that the Mini App can explain.

If final completion fails because of a network, storage, or server error, the user must remain in a recoverable state. Previously saved draft answers should not be lost unnecessarily.

## Stale Client State

The Mini App must treat local state as stale when:

- the server draft revision changed after the client loaded it;
- the profile was completed or updated in another Telegram session or device;
- the onboarding model version changed;
- the user was classified as needing profile update after the client loaded an older state.

On stale state, the Mini App must reload server state before allowing another save or completion submit.

The user-facing result should be short and clear, such as asking the user to refresh, continue from the updated step, or review changed profile data.

## Bot Routing Contract

Before the staged replacement, the existing bot onboarding path may remain authoritative while Mini App onboarding is prototyped.

After the staged replacement is implemented:

- new users with `not_started` status must be routed from the bot to Mini App onboarding;
- users with `in_progress` status must be routed to resume Mini App onboarding;
- users with `complete` status must be routed to the main menu, daily diary-style Mini App home, or the requested quick action;
- users with `needs_profile_update` status must be routed to Mini App profile update or a compatible onboarding update path;
- users with `blocked` status must receive a short recovery or support message and must not be silently treated as complete.

The bot must preserve safe quick-action checks. If a quick action requires a completed profile, the bot must not allow it for `not_started`, `in_progress`, `needs_profile_update`, or `blocked` users.

## Mini App Launch Failure

When the bot attempts to route a user to Mini App onboarding and the Mini App cannot be opened, the bot must show a short recovery message and an open-Mini-App retry action when Telegram supports it.

After staged replacement, the product must not fall back to the old full bot onboarding for new users unless a later accepted spec explicitly authorizes an emergency fallback.

Repeated launch failure must be represented as a recoverable blocked state or equivalent bot-visible condition. The user should understand that setup requires the Mini App and should have a retry path.

## Legacy Profile Compatibility

Legacy profile data is compatible only when it satisfies every required field in the accepted onboarding model for the user's goal and can be mapped without ambiguity.

Known legacy profile fields that may be reused when valid include:

- preferred language when it is already `ru`, `en`, or `fr`, or when it maps through a deterministic supported-locale alias such as `ru-RU` to `ru`, `en-US` to `en`, or `fr-FR` to `fr`;
- sex or gender when it maps to `male` or `female`;
- age;
- height in centimeters;
- current weight in kilograms;
- activity level;
- primary goal when it maps to `fat_loss`, `recomposition`, or `muscle_gain`;
- training days per week or equivalent first-version training context;
- onboarding completion timestamp.

Known legacy gaps for the accepted Mini App onboarding model include:

- no onboarding model version;
- no required French end-to-end onboarding proof;
- unsupported or ambiguous persisted language values that cannot be deterministically normalized to `ru`, `en`, or `fr`;
- no persisted fat-loss target weight when the user chose fat loss unless a later migration source proves it;
- no persisted muscle-gain final target weight unless a later migration source proves it;
- no recomposition main result;
- no recomposition scale-weight direction;
- legacy goals outside the accepted first Mini App model, such as maintenance;
- legacy gender values that do not map to `male` or `female`.

A compatible legacy profile may be marked `complete` for the new onboarding model only after the implementation verifies:

- preferred language is supported or can be deterministically normalized to `ru`, `en`, or `fr`;
- primary goal maps to an accepted goal;
- sex or gender maps to `male` or `female`;
- age, height, current weight, activity level, and training context are present and valid;
- fat-loss or muscle-gain target weight is present when required;
- recomposition main result and scale-weight direction are present when required;
- onboarding model version is recorded or can be safely backfilled.

Legacy values that cannot be mapped to the accepted first Mini App onboarding model must not be silently coerced. For example, unsupported persisted language, legacy maintenance goals, unspecified gender, other gender, missing target weight, or missing recomposition direction should route the user to profile update or rerun onboarding instead of being treated as complete.

Unsupported persisted language values must not be silently defaulted to Russian, English, or French during compatibility classification. The product may use the normal default-language behavior for display during profile update, but the profile should not be marked complete until the user explicitly confirms or selects a supported language.

If required fields are missing but the existing profile is otherwise usable, the user should be routed to a Mini App profile-update flow that collects only missing required data.

If the existing profile conflicts with the accepted model or cannot be mapped safely, the user should rerun Mini App onboarding.

Legacy nutrition targets must not be treated as accepted first-version targets for this onboarding model unless the future calorie/macro TechnicalSpec allows them.

## Security

Mini App onboarding writes must verify Telegram launch identity or an equivalent authenticated session.

The server must never trust user identity, completion status, or profile ownership sent only by client-side JavaScript.

The Mini App must not expose another user's partial draft or profile data.

The contract must avoid storing unnecessary sensitive data beyond the accepted onboarding requirements.

## Performance

Loading onboarding state should be fast enough for first Mini App render and bot routing checks.

The implementation should avoid multiple unnecessary round trips per onboarding step. A simple load-state request plus one save per step is acceptable.

## Migration / Operations

The implementation plan that applies this TechnicalSpec must define the actual database migration or compatibility adapter.

The migration must preserve existing users, existing profile data, existing nutrition data, existing workout data, existing progress data, and existing reminders unless a later accepted spec explicitly changes them.

Before switching new users from bot onboarding to Mini App onboarding, the implementation must verify:

- bot `/start` behavior for new, incomplete, complete, and stale users;
- Mini App load, resume, save, complete, and stale-state behavior;
- duplicate completion submit behavior;
- legacy profile classification;
- Mini App launch-failure recovery;
- profile-update path for missing required data;
- no accidental recalculation or acceptance of calorie/macro targets outside the calorie/macro TechnicalSpec.

## Acceptance Test Checklist

An implementation plan that applies this TechnicalSpec must include automated or manual verification for these contract scenarios:

- New Telegram user opens `/start`, is classified as `not_started`, and is routed to Mini App onboarding.
- User saves a partial draft, leaves onboarding, reopens from the bot or Mini App, and resumes at the last safe compatible step.
- User completes onboarding once and receives `complete` status plus the first post-onboarding route.
- User submits completion twice with the same idempotency key and payload, and the second submit returns the already completed result without duplicate profile changes.
- User submits a conflicting completion payload after completion, and the system returns a conflict or routes to profile update instead of silently overwriting the completed profile.
- Mini App tries to save with a stale draft revision, and the server requires state reload before another save or completion.
- Mini App identity verification fails, and no onboarding data is saved.
- Existing compatible legacy profile is classified as `complete` only when all required fields map safely.
- Existing legacy profile with missing target weight, missing recomposition details, unsupported language, or unsupported gender is routed to profile update or onboarding rerun.
- Bot quick actions that require a complete profile remain blocked for `not_started`, `in_progress`, `needs_profile_update`, and `blocked` users.
- Mini App launch failure from the bot shows a retry or recoverable blocked-state message.
- Completion cannot bypass the final review surface and required plain-language data-use note.
- Calorie and macro targets are reported as unavailable unless a later accepted calorie/macro TechnicalSpec authorizes target calculation.
