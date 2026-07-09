---
id: SPEC-FEATURE-002
type: FeatureSpec
status: Accepted
title: Mini App onboarding foundation
parent: SPEC-GLOBAL-001
depends_on: []
related_specs: []
work_area: features
---

<!-- review-resolution:start -->
review_resolution:
  agent_review_read: true
  agent_review_resolved_or_explicitly_ignored: true
  unresolved_agent_review_blocks_removed: true
  human_acceptance_confirmed: true
<!-- review-resolution:end -->

# Mini App Onboarding Foundation

## User Goal

A new NORDWOLF user wants to start from the Telegram bot, be guided into the Mini App, choose or confirm a language, define their main body-composition goal, and finish with enough profile data for the product to personalize the first daily experience without forcing the user through a long technical form.

The onboarding foundation must support the first private beta direction from `SPEC-GLOBAL-001`: Russian, French, and English users; multiple fitness goals; recomposition as a distinct goal; Mini App first for structured setup; and strict tracker-discipline behavior without shame, medical claims, or open-ended AI coaching.

## Main Flow

1. The user enters NORDWOLF through the Telegram bot.
2. The user presses Start or a similar first-run action in the bot.
3. The bot gives a short welcome and explains NORDWOLF in one or two concise messages before routing the user into the Mini App.
4. The bot must not run the full structured onboarding itself for new users when the Mini App onboarding is available.
5. The Mini App opens the onboarding flow and shows a short product start screen that identifies NORDWOLF and explains that setup personalizes nutrition, training, progress, and daily discipline.
6. The Mini App applies a language automatically when Telegram or device language confidently matches Russian, English, or French.
7. The user must still be able to confirm or change the language from Russian, English, and French.
8. The Mini App records the selected language as the user's preferred product language.
9. The user selects exactly one primary body-composition goal:
   - fat loss;
   - recomposition;
   - muscle gain.
10. After the primary goal is selected, the rest of onboarding should adapt to that selected goal. NORDWOLF should feel configured for the user's chosen direction, not like a generic questionnaire.
11. If the user selects recomposition, the flow must not treat it as simple weight loss or ask only for a lower target scale weight. It may ask optional recomposition questions that help later personalization, such as visual shape, fat loss with muscle retention, strength progress, or adherence, but these questions should be skippable until the exact first-version recomposition model is accepted.
12. If the user selects fat loss or muscle gain, the flow may collect goal-specific target context, but it must avoid unsafe body-composition pressure or medical framing.
13. The user enters the minimum required body and activity context for first-version personalization:
   - sex or gender selection needed for first-version nutrition calculations;
   - age;
   - height;
   - current weight;
   - target weight for fat loss and muscle gain, or recomposition weight direction for recomposition;
   - activity level;
   - training frequency or training context.
14. The user may enter optional context only when it directly improves the first daily experience or clearly prepares the first private beta, such as training environment, current nutrition discipline level, or optional recomposition signals.
15. The Mini App validates each required answer immediately and keeps correction local to the current step when possible.
16. After the required profile fields are filled, the system calculates first-version calories and macros only when an accepted calorie/macro TechnicalSpec defines the first-version formula, validation bounds, safety limits, target availability rules, and fallback behavior.
17. The Mini App shows a clear review step before completion, including language, goal, body/activity context, desired target weight or target direction, and the calculated calories/macros when an accepted formula is available.
18. The user confirms the setup.
19. After confirmation, the Mini App saves the onboarding profile and routes the user to the Mini App home screen.
20. The first home screen after onboarding must include the wolf companion as a primary visual signal, preferably near the top, plus the main action buttons needed for the first daily experience, a daily status area, and nutrition or meal-status information.
21. If a full dashboard is not implemented in the first slice, the post-onboarding home screen must still be honest: it may show a limited first version with clear available actions, but it must not pretend that missing nutrition, workout, progress, reminder, or wolf mechanics are complete.

## Goal Model

The first onboarding goal model is a single-choice primary goal.

The required first goal options are:

- fat loss;
- recomposition;
- muscle gain.

The onboarding flow must not allow several primary goals at the same time in the first version. The product may later add secondary focus areas, such as nutrition discipline or workout progress, but those are not first-version primary onboarding goals unless a later accepted spec changes the goal model.

Each selected goal should adapt the onboarding questions, review step, and first home experience where practical:

- fat loss should focus on controlled weight and nutrition discipline without extreme targets;
- recomposition should focus on body-shape improvement, muscle retention or gain, strength/progress signals, and consistency without reducing success to scale weight alone;
- muscle gain should focus on gaining mass, training context, and nutrition support without unsafe pressure.

For fat loss, onboarding should ask for desired target weight.

For muscle gain, onboarding should ask for desired target weight or the amount of weight the user wants to gain.

The UI may let the user enter muscle-gain target as either a final target weight or an amount to gain. The persisted product target should be the final target weight. For example, if the user currently weighs 85 kg and chooses to gain 5 kg, the saved target weight should be 90 kg.

For recomposition, onboarding must not require an exact target weight. Instead, onboarding should ask for:

- the main recomposition result the user wants, such as losing fat while preserving muscle, improving body shape, becoming stronger, or being unsure yet;
- the desired scale-weight direction, such as staying roughly the same, slightly decreasing, slightly increasing, or not caring about scale weight.

The first recomposition onboarding version must keep this branch short. It must require only the main recomposition result and desired scale-weight direction. It may include optional skippable follow-up choices such as visual shape improvement, fat loss with muscle retention, or strength progress, but those choices must not block onboarding completion.

Body measurements must not be required during the first recomposition onboarding slice. They should be deferred to a future progress setup or progress tracking spec unless a later accepted spec makes them required.

Exact target weight may be added later as an optional advanced field, but it must not be the primary recomposition success signal.

Reminder intent must not be required during the first onboarding slice. The product may ask about reminders later, after the user has completed onboarding and performed a useful first action such as logging food, opening the daily diary, or completing a first workout-related action. A later reminder spec must define reminder types, timing, permission behavior, quiet behavior, and editing controls.

## Required Onboarding Data

The onboarding foundation must define and persist enough data for future accepted specs to personalize nutrition, training, progress, reminders, and the wolf companion.

Minimum required data:

- preferred language;
- primary goal;
- goal-specific context when needed to avoid false assumptions;
- sex or gender selection for first-version nutrition calculations;
- current weight;
- target weight for fat loss and muscle gain;
- recomposition main result and weight direction for recomposition;
- height;
- age;
- activity level;
- training frequency or training context;
- onboarding completion status and completion timestamp.

Goal-specific context must be explicit enough to distinguish:

- fat loss from recomposition;
- recomposition from simple weight loss;
- muscle gain from fat loss and recomposition.

Optional data may be collected only if it is useful immediately or clearly prepares the first beta:

- training environment, such as home, gym, or mixed;
- training days or preferred schedule;
- recomposition intent, such as visual shape improvement, strength progress, or fat loss with muscle retention;
- nutrition experience level.

Optional questions should be skippable unless a later accepted Technical Spec proves that a specific field is required for safe calculation or coherent product behavior.

The first implementation plan may choose a smaller subset of optional data, but it must not omit the required data unless the accepted plan records a narrow offspec exception.

Sex or gender selection is required in the first onboarding version because first-version nutrition target calculation needs it. The first implementation must use a simple required controlled choice:

- male;
- female;

The product must phrase this field respectfully and explain that it is used for calculation, not judgment. The first version must not include a `prefer not to say` option because the onboarding data model must be compatible with the first-version calorie and macro calculation once the required TechnicalSpec is accepted.

Age, height, current weight, and target weight should be collected as exact values, not broad ranges, because inaccurate inputs produce inaccurate calorie and macro targets.

The first onboarding version should use metric units for all languages:

- weight in kilograms;
- height in centimeters.

Imperial units are out of scope for the first onboarding version unless a later accepted spec adds them.

## Nutrition Target Behavior

After the user provides the required profile information, NORDWOLF should calculate calories and macros only when enough validated data is available and an accepted TechnicalSpec defines the first-version calculation behavior.

The review step before onboarding completion must show the calculated calories and macros when an accepted formula is available, so the user can understand what profile data produced the first target.

The calculation must be treated as a product estimate, not medical advice.

This spec requires onboarding to collect the profile data and provide the product surface needed for calorie and macro targets. It does not define the target formula and does not accept the current legacy formula as final authority.

Before any implementation plan calculates, stores, displays, or migrates calorie and macro targets from onboarding data, a focused TechnicalSpec must be accepted for:

- first-version calorie and macro formula;
- input validation bounds;
- health and safety limits;
- target availability rules;
- fallback behavior when targets cannot be calculated;
- mapping from each primary goal to first targets;
- recomposition handling, including users who do not care about scale weight.

Until that TechnicalSpec is accepted, an implementation slice may collect and review onboarding profile data, but it must show calorie and macro targets as not available yet instead of inventing or reusing a formula inside the implementation plan.

Onboarding must not ask the user to choose a tracking strictness mode such as strict counting, normal counting, or habit-only control in the first version. NORDWOLF should present itself as a practical tracker for nutrition, training, and progress without adding an extra mode-choice layer during onboarding.

## Language Behavior

Russian, French, and English must be first-class onboarding language options from the first onboarding version.

The product should use Telegram language or device locale as an initial hint. If the hint confidently maps to Russian, English, or French, the Mini App may start in that language automatically.

If the Telegram or device language is unsupported, missing, or ambiguous, the default language should be Russian.

Even when a language is selected automatically, the user must be able to choose or change the onboarding language explicitly.

The language selected during onboarding must control the full onboarding UI for every implemented step. This includes screen titles, explanatory text, option labels, buttons, validation messages, error states, review-step labels and values, completion messages, and first post-onboarding home labels where those surfaces are part of the implementation slice.

The first onboarding implementation must include complete Russian, French, and English onboarding copy from the start. No required onboarding step should mix languages or leave visible fallback copy in a different language after the user has selected Russian, French, or English.

The implementation may use a localization library or existing translation infrastructure, but the product requirement is language completeness, not a specific technical library.

French may be treated as private-beta copy until a competent French speaker or the project owner explicitly approves it for beta use. This does not allow missing French strings; it only marks translation quality as beta until reviewed.

French onboarding may be considered beta-ready when:

- all required onboarding and first-slice home-screen strings exist in French;
- no required French onboarding surface visibly falls back to Russian or English;
- the project owner has reviewed the French flow end to end in the UI or implementation preview;
- the project owner has checked unclear French copy with ChatGPT, another translation tool, a fluent reviewer, or another reasonable language-review method;
- the project owner explicitly accepts the result as understandable private-beta French, not final production localization.

Future localization specs may define language switching after onboarding, wider bot translation, and full end-to-end language verification outside onboarding.

## Health, Privacy, And Safety Boundaries

Onboarding collects health-adjacent personal data, so the flow must stay factual and bounded.

The onboarding flow must not:

- present NORDWOLF as a doctor, nutritionist, psychologist, or medical authority;
- diagnose, treat, or suggest medical decisions;
- encourage extreme weight loss, unsafe calorie targets, or shame-based discipline;
- imply that AI can replace professional guidance;
- collect unnecessary sensitive data for the first onboarding foundation.

The flow should explain data use in concise product terms: profile data is used to personalize tracking, daily targets, reminders, progress, and future product surfaces.

The onboarding flow must include a short plain-language data-use note before final confirmation, for example that profile data is used to calculate goals and personalize nutrition, training, progress, reminders, and future product surfaces.

This FeatureSpec does not require a separate consent checkbox for the first private-beta onboarding slice when data remains inside the local application database and no external service or external reviewer receives onboarding data.

A later privacy, storage, retention, or compliance TechnicalSpec or Change Request must decide whether explicit consent, a checkbox, retention rules, or additional user-facing policy text is required before any of the following:

- onboarding data is stored or processed outside the local application database;
- onboarding data is sent to an external provider or AI service;
- onboarding data is reviewed by external beta operators;
- the product is launched beyond the private beta;
- a legal, hosting, app-platform, or operational requirement makes explicit consent necessary.

If the implementation stores or sends onboarding data outside the local application database, a later Technical Spec or Change Request must define the privacy, storage, retention, and provider-boundary rules before implementation.

## Bot And Mini App Contract

This spec defines the product expectation that the Telegram bot routes the user into Mini App onboarding and that both surfaces agree on whether onboarding is incomplete, complete, stale, or needs profile update.

It does not define the exact persisted profile shape, API endpoints, database schema, state machine, or client/server synchronization contract.

Before any implementation plan replaces full bot onboarding with Mini App onboarding, a focused TechnicalSpec must be accepted for:

- persisted onboarding profile shape;
- onboarding completion state;
- partial onboarding save and resume behavior;
- duplicate completion submit handling;
- stale Mini App state after server-side profile changes;
- network or save failure recovery;
- Mini App unavailable or repeated launch-failure behavior;
- bot routing behavior for new, incomplete, complete, and stale profiles;
- compatibility boundaries for existing legacy profiles;
- rules for when a legacy profile may continue, when missing data can be collected through profile update, and when full Mini App onboarding must rerun.

Until that TechnicalSpec is accepted, an implementation slice may prototype Mini App onboarding screens only if it does not replace the authoritative bot onboarding path or change persisted onboarding completion behavior.

The transition from current full bot onboarding to Mini App onboarding must happen in two controlled stages:

1. First, implement or prototype the Mini App onboarding flow and daily diary-style home surface without making it the authoritative onboarding path for new users and without changing persisted onboarding completion behavior.
2. After the bot and Mini App contract TechnicalSpec is accepted and the implementation plan explicitly covers profile state compatibility, route new users from the bot into Mini App onboarding and stop using the old full bot onboarding for those new users.

This staged transition is required to avoid regressions in `/start`, incomplete-profile recovery, legacy local profiles, and Mini App launch-failure recovery.

## Expected System Behavior

The Mini App onboarding must feel like a guided setup, not a raw database form.

The experience should use:

- one primary decision per step;
- visible progress through the setup;
- large selectable options for choice-based steps;
- numeric inputs with clear units for body metrics;
- short, direct copy;
- immediate validation;
- back or edit behavior before final confirmation;
- a final review screen before completion.

The onboarding tone should be calm, strict, professional, and respectful.

The product may use limited motivational language, but it must avoid cheap motivational slogans, excessive praise, shame, fear, or a soft lifestyle-coach tone. Copy should make NORDWOLF feel like a serious tracker-discipline product.

The flow should stay short enough for normal first use. A target of a few minutes is desirable, but the product must not remove essential setup questions only to make onboarding artificially short. The right tradeoff is concise steps with only useful questions.

When onboarding is complete:

- the user profile must be complete enough for first-version personalization;
- the bot and Mini App must agree that onboarding is complete;
- future quick actions should not repeatedly restart onboarding unless required profile data is missing;
- nutrition target calculation may occur only if the implementation has enough validated inputs and accepted rules;
- the user must land on the Mini App home screen;
- the home screen must expose the wolf companion as a primary visual signal;
- the home screen must show the main action buttons for the available first-version workflows;
- the home screen must show a daily status area;
- the home screen must show nutrition or meal-status information, such as meal entry state or daily nutrition progress, within the limits of implemented first-version behavior;
- unavailable future features must be shown as absent, disabled, or deferred rather than fake-complete.

When onboarding is incomplete:

- the product should resume at the last safe step or a clear restart point;
- collected answers should not be lost unnecessarily;
- the user should understand what is still missing;
- quick tracking features may remain blocked if they require a completed profile.

## Alternate Flows

If the user opens the Mini App after already completing onboarding, the system should route them away from first-run onboarding unless they explicitly chooses profile editing or reset behavior defined by a later spec.

If the user changes language during onboarding, subsequent steps must use the newly selected language. Previously entered numeric data should remain valid.

If the user abandons onboarding, the next entry from Telegram or the Mini App should continue or restart in a controlled way. The exact persistence strategy must be defined by the bot and Mini App contract TechnicalSpec before implementation changes persisted onboarding behavior.

If a value is invalid, the system should show a local correction message and keep the user on the same step.

If the user selects a goal whose full downstream product behavior is not implemented yet, onboarding may still capture the goal, but the first post-onboarding surface must not promise unsupported workflows.

If the Telegram bot opens the onboarding path but the Mini App link fails, is unavailable, or cannot be opened by the user, the bot should show a short recovery message and a button to open the Mini App again. The product must not fall back to the old full bot onboarding for new users.

If an existing local user profile is incomplete, stale, or missing fields required by the new Mini App onboarding, the user should be routed into the new Mini App onboarding or a Mini App profile-update flow that collects the missing data. A complete legacy profile may continue only when it satisfies the required fields for the accepted onboarding model; otherwise the product should ask for the missing information instead of silently treating the profile as complete.

## Unfavorable Cases

The onboarding foundation must handle:

- unsupported or missing Telegram language;
- defaulting to Russian when no supported language can be selected automatically;
- invalid numeric input;
- partial onboarding data from a previous session;
- a user reopening the Mini App from a different device or Telegram session;
- duplicated completion submits;
- network or save failure during final confirmation;
- stale local Mini App state after server-side profile changes;
- legacy bot onboarding data that may not match the new Mini App onboarding model;
- Mini App link or launch failure after the Telegram bot routes the user to onboarding;
- future schema migrations that must preserve existing user profiles.

## First Home Screen Minimum

After onboarding, the Mini App must route to a daily diary-style home screen rather than a dead-end completion page.

The first home screen should use the same broad product pattern as the reviewed Telegram Mini App references: a current-day surface that combines the companion, today's nutrition status, meal entry sections, and navigation into the next daily workflows. The references are structural inspiration only. NORDWOLF must not copy another product's exact visual design, wording, assets, or brand treatment.

The minimum first home screen must include:

- the current day or selected date;
- the wolf companion as the primary visual signal, initially allowed to be neutral and non-progressive;
- a daily nutrition summary area;
- meal entry sections for the first-version diary structure, such as breakfast, lunch, dinner, and snack;
- a clear add-food or add-meal action for each active meal section when nutrition logging is implemented in the same slice;
- primary navigation for the available first-version workflows, including diary, workout, progress, reminders, and profile when those workflows are available;
- a daily status area;
- a nutrition or meal-status area showing the most important first-version nutrition information, such as calories, protein, fat, carbohydrates, or meal completion state;
- a training-today signal when workout behavior is available;
- a progress signal when progress behavior is available;
- clear indication when a workflow is not available yet.

At minimum, the first post-onboarding home screen must have active profile access, a daily diary surface, visible meal sections, and honest nutrition status. If the calorie/macro TechnicalSpec is not yet accepted, the nutrition target area must show targets as not available yet instead of fake values.

Workout, progress, reminders, advanced wolf states, and calorie or macro targets may be shown as disabled, deferred, absent, or informational until their accepted specs and implementation slices exist. They must not appear complete or actionable when they are not implemented.

This spec does not define the final visual design, animation style, or full dashboard behavior. Reference screenshots may inform the future design, but the accepted product requirement is the functional composition above unless a later home/dashboard spec defines the exact layout.

The exact visual design for the daily diary-style home screen is deferred to a later UI, home, dashboard, or implementation-design decision. That later work may use mockups or reference screenshots for direction, but it must preserve the functional composition defined here and must not copy another product's exact design.

At first appearance, the wolf companion may start as a neutral visual character. Later specs may define progression, states, animations, and how user actions affect the wolf. The first onboarding home screen must not imply advanced wolf progression before those mechanics exist.

## Relationship To Legacy Behavior

The current bot onboarding and static Mini App screens are legacy baseline material and technical donor material only.

For the target product direction, the Telegram bot should become the entry and routing layer for onboarding. It should greet the user briefly and route the user to the Mini App instead of collecting the full onboarding data itself.

The Mini App onboarding is intended to replace the current full bot onboarding for new users once implemented and accepted.

The product is currently treated as having no real external user base beyond the project owner. However, implementation must still avoid unnecessary data loss and should define a safe behavior for existing local profiles. Existing incomplete, stale, or legacy profiles should be upgraded through the Mini App onboarding/profile-update path instead of relying on the old bot onboarding.

Reusable implementation concepts may include:

- existing profile fields;
- existing language normalization;
- existing nutrition target calculation concepts;
- existing sex or gender, age, height, weight, activity, goal, and training-days validation boundaries;
- existing completed-onboarding checks.

This spec does not accept the current command sequence, Mini App layout, copy, database schema, or nutrition-target formula as final product behavior. Reuse must be justified during implementation planning and must preserve existing data unless a later accepted migration decision authorizes a change.

## Out Of Scope

This spec does not define:

- final visual design for the full Mini App;
- the full home dashboard beyond the first post-onboarding minimum;
- full wolf companion mechanics;
- nutrition diary behavior;
- workout logging behavior;
- progress dashboard behavior;
- reminder scheduling behavior;
- AI onboarding assistance;
- exact database schema changes;
- API endpoint design;
- detailed migration from legacy bot onboarding to the new Mini App onboarding model;
- tracking strictness mode selection;
- imperial units;
- paid subscriptions, referrals, rankings, supplements, or marketplace-like features;
- final copy for every onboarding language.
