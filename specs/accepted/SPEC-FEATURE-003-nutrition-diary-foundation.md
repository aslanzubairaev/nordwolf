---
id: SPEC-FEATURE-003
type: FeatureSpec
status: Accepted
title: Nutrition diary foundation
parent: SPEC-GLOBAL-001
depends_on: ["SPEC-FEATURE-002", "SPEC-TECH-002"]
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

# Nutrition Diary Foundation

## User Goal

A NORDWOLF user wants to quickly log food during the day and immediately understand how that food changes their daily nutrition status.

The first nutrition diary should help the user answer practical questions:

- how many calories have I eaten today;
- how much protein, fat, and carbohydrate have I eaten today;
- how much remains against my daily targets;
- did I exceed a target;
- which meal did this food belong to;
- what should I correct if the system understood the food incorrectly.

The experience must support the strict tracker-discipline direction from `SPEC-GLOBAL-001`: factual logging, clear feedback, short copy, no shame, and no open-ended coaching.

## Functional Basis

This spec builds on:

- `SPEC-FEATURE-002`, which requires the first post-onboarding Mini App home screen to behave like a daily diary-style surface with meal sections and nutrition status;
- `SPEC-TECH-002`, which defines daily calorie, protein, fat, and carbohydrate targets that can be used for consumed and remaining counters.

This spec defines user-facing nutrition diary behavior. It does not define the low-level food parser, food database schema, AI prompt, matching algorithm, or target formula.

## Main Flow

1. The user opens the Mini App daily diary or starts a nutrition logging action from the Telegram bot.
2. The system loads today's nutrition targets when available.
3. The daily diary shows today's date, meal sections, and daily nutrition status.
4. The user chooses a meal section or starts a general add-food action.
5. The user enters food in natural practical language, such as:
   - `250 g chicken breast`;
   - `5 fried eggs`;
   - `protein shake`;
   - `buckwheat with chicken`;
   - `rice and potatoes`;
   - `bread with eggs`;
   - equivalent Russian, English, or French input when supported by the implementation slice.
6. The system converts the input into one or more food items with quantities.
7. The system calculates calories, protein, fat, and carbohydrates for the proposed entry.
8. The system shows a short review before saving when the match, quantity, or nutrient estimate needs confirmation.
9. The user confirms, edits, or cancels the entry.
10. After confirmation, the entry is saved to the selected or explicitly confirmed meal section.
11. The daily diary updates consumed totals.
12. The daily diary updates remaining totals against the accepted daily targets.
13. If a target is exceeded, the diary shows an over-target state rather than hiding or clamping the value.

## Meal Sections

The first diary structure must support these meal sections:

- breakfast;
- lunch;
- dinner;
- snack.

The UI may localize section labels, but the underlying first-version meal section set should remain stable.

The user should be able to add food to a specific meal section.

If the user logs food from the bot without choosing a meal section, the implementation must:

- ask the user to choose a meal section from breakfast, lunch, dinner, and snack before saving.

The first version must not silently infer the meal section from time of day, save to snack by default, or save as uncategorized when the user logs from the bot without a selected meal section. Later accepted specs may add faster defaulting or inference behavior.

## Diary Date And Timezone

Each saved food entry must belong to one diary date.

The default diary date is "today" in the user's effective diary timezone.

For the first nutrition diary version, the effective diary timezone is resolved in this order:

1. the user's validated profile timezone, if a later accepted onboarding or profile spec adds one;
2. the product default timezone `Europe/Paris`.

The first diary version does not require timezone collection during onboarding. Until a validated user timezone exists, `Europe/Paris` is the required product default across the bot, Mini App, persistence, and daily target lookup.

When the user logs food without mentioning a date, the entry should be saved for today's diary date.

For bot text input, the first version only needs to support these explicit diary date intents:

- today;
- yesterday.

These intents should be recognized in the user's preferred product language when food logging in that language is supported by the implementation slice.

The Mini App may support date navigation or a selected-date control. When the user adds food while viewing a selected diary date, the entry should belong to that selected diary date unless the user explicitly changes it before saving.

When the user explicitly logs food for a supported non-today date, such as yesterday, the entry should update that diary date rather than today's diary.

The Mini App should make the selected diary date visible when viewing or editing entries, so the user understands which day the consumed and remaining counters represent.

The first version does not need advanced natural-language date parsing, exact calendar-date parsing from bot text, or phrases such as last Monday, two days ago, this morning, or tonight. Unsupported date phrases should trigger clarification or be rejected without saving, rather than silently saving into the wrong diary date.

When daily targets are shown for a diary date, the first version should use the user's currently active accepted calorie and macro targets unless a later accepted spec defines historical target snapshots by diary date. This means previous-day remaining counters may be calculated against the current active target in the first version. The product should prioritize correct food-date assignment now and defer target-history precision to a later TechnicalSpec if needed.

## Daily Nutrition Status

When daily targets are available from `SPEC-TECH-002`, the diary must show at least:

- calorie target;
- consumed calories;
- remaining calories;
- protein target;
- consumed protein;
- remaining protein;
- fat target;
- consumed fat;
- remaining fat;
- carbohydrate target;
- consumed carbohydrates;
- remaining carbohydrates.

If targets are unavailable, the diary may still show consumed totals, but it must not fake remaining values.

Remaining counters may become negative after the user exceeds a target. This is valid diary behavior and means the user is over the target. It is different from an invalid negative target calculation.

When the user exceeds a target, the product should show a factual over-target state such as:

- over calories by a specific amount;
- over protein, fat, or carbohydrates by a specific amount when relevant.

The product must not shame the user or use fear-based language.

## Target Status Display

For each tracked daily target, the product must derive a visible status from:

```text
remaining = target - consumed
```

The first diary version must use the same status rules for calories, protein, fat, and carbohydrates:

- if `remaining` is greater than zero, show the amount remaining;
- if `remaining` equals zero, show that the target is exactly reached;
- if `remaining` is less than zero, show the over-target amount as `consumed - target`.

The product must not display negative remaining values as if the target itself were invalid.

The product must not clamp an over-target amount to zero in a way that hides the overrun.

The Mini App may use compact labels, colors, bars, or progress indicators, but the meaning must remain clear:

- remaining means the user is still below the target;
- reached means consumed equals the target;
- over target means consumed is above the target.

The Telegram bot should use the same meaning in short confirmation or summary messages when it reports daily status.

## Unavailable Targets Behavior

The first diary version must not invent calorie or macro targets when accepted targets are unavailable.

If the user has not completed onboarding, the product should route the user to onboarding or profile update before allowing full nutrition diary logging that depends on daily targets.

If consumed food entries exist but daily targets are temporarily unavailable, the diary may show:

- consumed calories;
- consumed protein;
- consumed fat;
- consumed carbohydrates;
- saved meal entries.

In this state, the diary must not show:

- remaining calories;
- remaining protein, fat, or carbohydrates;
- over-target states;
- progress bars or percentages that imply a known target.

The product should explain briefly that targets are not available yet and that remaining values will appear after targets are available.

When valid daily targets become available later, the diary should calculate remaining and over-target states from the already saved consumed entries for the selected diary date.

## Save Errors And Duplicate Protection

The diary must treat a food entry as saved only after persistence succeeds.

If a save fails, the product must not include the failed entry in persisted daily totals.

If the UI shows an optimistic pending state while saving, that state must be visually or behaviorally distinct from a confirmed saved entry.

After a save error, the product should offer a short recovery path, such as retry, edit, or cancel.

The product should reduce accidental duplicate entries when the same food submission is repeated quickly from the bot or Mini App.

The first version does not need complex duplicate detection across different meals, dates, or rewritten descriptions. It should at least guard against obvious repeated submits of the same pending entry.

If a duplicate-looking entry is still saved, the user must be able to delete or correct it through the saved-entry correction path.

Daily consumed totals, remaining counters, and over-target states must be calculated only from entries that were actually persisted for the selected diary date.

## Cross-Surface Synchronization

The Telegram bot and Mini App must use the same persisted diary entries as the source of truth.

When food is saved through the bot, the entry must appear in the Mini App diary for the same computed diary date after the Mini App refreshes or reloads the day.

When food is saved, edited, or deleted through the Mini App, later bot summaries or confirmations must use totals derived from the updated persisted entries.

Daily consumed totals, remaining counters, and over-target states must be recalculated from persisted entries for the selected diary date instead of trusting stale client-only state.

If the Mini App detects that diary data may be stale after another surface changed entries, it should refresh the selected day or show a short reload/retry state.

The first version does not require real-time push synchronization between the bot and Mini App. Refresh, reload, or next-request consistency is sufficient.

## Quantity And Unit Interpretation

The first diary version should prefer explicit numeric quantities over vague serving words.

If the user provides a concrete quantity and supported unit, the system should use that quantity even when the text also contains a vague serving word. For example:

- `250 g rice on a plate` should be interpreted as 250 g of rice;
- `plate of rice, 250 g` should be interpreted as 250 g of rice;
- `250 g chicken breast` should be interpreted as 250 g of chicken breast.

The same rule applies to equivalent Russian, English, and French user input when food logging in that language is supported by the implementation slice.

The first version should support straightforward metric quantities when the food item can be matched:

- grams;
- kilograms converted to grams;
- milliliters for liquids or foods where volume conversion is supported;
- liters converted to milliliters for liquids or foods where volume conversion is supported.

Piece-based quantities, such as eggs or slices, may be used only when the implementation has a reliable accepted mapping for that food and unit. For example, `5 eggs` may be calculated when the food source defines nutrition per egg or a reliable average egg weight.

Vague serving words without a concrete quantity, such as plate, portion, bowl, handful, piece, or serving, must not be treated as exact grams unless a later accepted quantity spec defines reliable mappings.

When only a vague quantity is provided and no reliable mapping exists, the product should ask for a short clarification or show an estimated review before saving.

The product should not reject an otherwise clear entry only because a vague serving word appears next to a concrete numeric quantity.

## Multi-Food Input

The first diary version should support one user message containing multiple foods when the parser can separate the foods clearly.

For example, a message such as `250 g chicken breast, 150 g rice, 5 eggs` should be treated as multiple food items within one logging action.

For each detected food item, the system should resolve:

- food name;
- quantity;
- unit;
- calories;
- protein;
- fat;
- carbohydrates;
- confidence or estimate status.

The product should show both per-item nutrition and the total nutrition for the logging action when review is required.

If every detected item is high-confidence and the meal section is known, the logging action may use fast save when a clear edit, undo, or delete path exists.

If one or more items are ambiguous, missing quantity, unsupported, or estimated through AI fallback, the product should require review before saving the affected logging action.

The first version may either:

- save the clear items and ask clarification for only the unclear items; or
- hold the full multi-food logging action for review until the user confirms, edits, or cancels.

The product must not silently drop unclear items from a multi-food message.

Saved multi-food entries must remain understandable in the diary and correctable through the saved-entry editing or deletion path.

## Food Entry Review

The first diary version should support fast save only for high-confidence entries.

An entry is high-confidence only when:

- the food match is clear;
- quantity and unit are present or confidently inferred from a simple accepted unit;
- calculated calories, protein, fat, and carbohydrates are available;
- no AI fallback was required;
- no multi-food ambiguity remains;
- the selected meal section is known.

High-confidence entries may be saved immediately when the implementation provides a clear undo or edit path.

Before saving, the product should require confirmation when:

- the food match is uncertain;
- the quantity is missing or ambiguous;
- multiple foods are detected in one input and at least one item has uncertain match, missing quantity, ambiguous quantity, or unclear unit;
- the parser used an estimate;
- AI fallback was used;
- the unit is vague, such as plate, piece, portion, bowl, handful, or serving, unless a later accepted food quantity spec defines a reliable mapping;
- the resulting calories or macros look unusual for the entered quantity.

When required information is missing, the product should ask a short clarification question before saving instead of inventing a precise value.

Multiple foods in one input do not require confirmation by themselves. For example, an input such as `200 g chicken breast and 150 g rice` may use the fast-save path when every item, quantity, unit, meal section, and nutrient calculation is high-confidence and the user has a clear edit or undo path.

The review should show:

- food item name;
- quantity and unit;
- calories;
- protein;
- fat;
- carbohydrates;
- meal section;
- whether the values are estimated when applicable.

The user must be able to edit or cancel before saving.

## Saved Food Entry Data

Each saved food entry must keep enough information to display the diary, recalculate daily totals, and support correction or deletion.

The first diary version must persist at least:

- user identifier;
- diary date;
- meal section;
- display food name;
- quantity value;
- quantity unit;
- calories;
- protein grams;
- fat grams;
- carbohydrate grams;
- whether the values are estimated;
- nutrient source type, such as food database, manual entry, deterministic parser, or AI estimate;
- created timestamp;
- updated timestamp.

When one user input contains multiple foods, the implementation may save them as one grouped entry or multiple item entries.

If multiple foods are saved as one grouped entry, the persisted data must still retain per-item details for each food:

- display food name;
- quantity value;
- quantity unit;
- calories;
- protein grams;
- fat grams;
- carbohydrate grams;
- whether the values are estimated;
- nutrient source type.

In either grouped or separate storage, the diary must still be able to show the foods clearly, recalculate daily totals correctly, and support correction or deletion without losing individual food meaning.

The saved entry must keep the nutrition values that were accepted at save time. Later changes to a food database item must not silently rewrite an already saved diary day unless a later accepted spec defines explicit reprocessing behavior.

Exact table names, columns, indexes, migrations, and repository design are out of scope for this FeatureSpec.

## Corrections

The user must be able to correct:

- food item;
- quantity;
- unit;
- meal section;
- saved entry after it has been persisted.

Corrections should update daily consumed and remaining totals immediately after save.

If the system cannot confidently resolve a food, it should ask a short clarification question rather than inventing a confident result.

## Saved Entry Editing And Deletion

The first nutrition diary version must allow the user to open a saved food entry and correct it.

The user must be able to edit:

- food item or matched food;
- quantity;
- unit;
- meal section.

The user must be able to delete a saved food entry.

If a saved entry contains multiple food items, the user must have a correction path for a specific item inside that saved entry.

For a multi-food saved entry, the first version must support at least one of these correction models:

- item-level editing and deletion inside the grouped entry; or
- converting the grouped entry into separately addressable saved food items before correction.

The product must not require deleting and re-entering an entire multi-food meal just to correct one item when the persisted data already retains item-level details.

After an entry is edited or deleted, the diary must recalculate consumed totals and remaining counters from persisted entries.

Fast-saved entries must still have an edit, undo, or delete path. A fast-save path is not acceptable if the user cannot correct a wrong food, quantity, unit, or meal section after save.

If a later implementation splits editing into several smaller releases, the first released nutrition diary slice must still provide at least one safe way to remove or correct an incorrect saved entry before the diary is considered usable.

## Bot And Mini App Responsibilities

The Mini App is the primary surface for daily diary review, meal sections, totals, corrections, and visual comparison against targets.

The Telegram bot may support fast food capture and short confirmations.

When food is logged through the bot, the saved entry must still appear in the Mini App diary for the same computed diary date.

Confirmed food entries must be persisted in the application's server-side storage used by the existing product data layer, not only in Telegram chat state, local browser state, or a temporary client cache. The exact table, repository, or migration design is out of scope for this FeatureSpec, but bot and Mini App diary views must read from the same persisted source of truth.

The bot must not allow food logging that requires profile targets when the user has not completed onboarding or when required targets are unavailable, unless the implementation explicitly supports consumed-only logging without targets.

## AI And Estimation Boundaries

AI may be used only as a bounded resolver or estimator when deterministic matching is not enough.

AI must not behave like an open-ended nutrition coach.

AI output must be short, structured, and confirmable before saving when confidence is not high.

AI responses in the nutrition diary must stay on the immediate logging task.

The product should prefer compact structured output over conversational explanations. For example, AI-assisted review should focus on:

- detected food;
- quantity;
- calories;
- protein;
- fat;
- carbohydrates;
- whether the values are estimated;
- confirm, edit, or cancel actions.

AI must not add general nutrition advice, motivational paragraphs, meal-plan suggestions, or unrelated coaching to a food logging response.

The user should not be forced to accept AI-estimated nutrients without a chance to edit or cancel.

The product must not present AI-estimated nutrition values as medically exact.

## Language Behavior

The first diary implementation should respect the user's preferred language from onboarding.

Visible diary labels, meal section labels, add-food actions, confirmation copy, correction copy, and target/remaining labels must not mix languages inside the same selected-language surface.

Food names may appear in the language used by the user or in the matched food database label when an exact localized label is unavailable, but the UI around the food must remain localized.

## Alternate Flows

If daily targets are unavailable, the diary should show consumed totals and explain that targets are not available yet.

If the user logs food for a supported previous day, the diary should update that diary date rather than today.

If the same food is logged twice by mistake, the user should be able to delete or correct the duplicate when saved-entry editing is implemented.

If a network or save error happens, the product should not show the entry as saved until persistence succeeds.

If the food database does not contain the item, the system may ask for clarification, use an estimate, or route to a custom-food flow when a later spec defines that behavior.

## Unfavorable Cases

The nutrition diary foundation must handle:

- missing completed onboarding profile;
- unavailable daily targets;
- unsupported or mixed-language food input;
- unknown food;
- ambiguous quantity;
- multiple foods in one message;
- duplicate entry attempts;
- network or save failure;
- stale diary totals after another device logs food;
- target overrun;
- AI uncertainty or failure when AI fallback is enabled.

## Expected System Behavior

The diary should make logging fast but not careless.

The product should prefer a short confirmation or correction flow over silently saving questionable entries.

The diary should update totals from persisted entries, not only from local UI state.

The user should be able to understand the daily state at a glance:

- what was eaten;
- what remains;
- what is over target;
- which meal sections still have no entries.

Daily remaining counters must be derived from accepted targets and saved consumed totals:

```text
remaining = target - consumed
```

If `remaining` is negative after food logging, the diary should show an over-target amount. It must not clamp consumed-over-target values to zero in a way that hides the overrun.

## Acceptance Checklist

This FeatureSpec is ready for implementation planning when the accepted behavior covers:

- daily diary date and effective timezone behavior;
- breakfast, lunch, dinner, and snack meal sections;
- persisted food entries shared by bot and Mini App;
- calorie, protein, fat, and carbohydrate consumed totals;
- remaining, reached, and over-target states when daily targets are available;
- consumed-only behavior when daily targets are unavailable;
- save error handling and obvious duplicate-submit protection;
- cross-surface consistency between bot and Mini App;
- explicit quantity and unit handling;
- multi-food input without losing per-item details;
- saved-entry editing and deletion, including multi-food correction;
- short, structured, on-task AI estimation boundaries;
- localized visible diary and confirmation copy for supported implementation languages.

## Out Of Scope

This spec does not define:

- exact food database schema;
- historical target snapshots by diary date;
- food matching algorithm;
- parser implementation;
- AI prompt or model;
- photo food recognition;
- barcode scanning;
- custom food management;
- saved meal templates;
- recurring meals;
- nutrition recommendations;
- meal plan generation;
- micronutrient targets;
- fiber, sugar, sodium, saturated fat, or micronutrient tracking as first-version required counters;
- exact visual design of the diary;
- detailed editing and deletion UI;
- calorie or macro target formula.
