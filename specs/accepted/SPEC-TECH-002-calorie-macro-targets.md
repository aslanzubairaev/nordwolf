---
id: SPEC-TECH-002
type: TechnicalSpec
status: Accepted
title: First-version calorie and macro targets
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

# First-Version Calorie And Macro Targets

## Functional Justification

`SPEC-FEATURE-002` requires a focused TechnicalSpec before any implementation plan calculates, stores, displays, or migrates calorie and macro targets from onboarding data.

This TechnicalSpec defines the first-version calorie and macro target contract for Mini App onboarding. It covers formula choice, required inputs, validation bounds, safety limits, target availability, fallback behavior, and goal-specific mapping for fat loss, muscle gain, and recomposition.

The calculation is a product estimate for tracking and personalization. It is not medical advice and must not present NORDWOLF as a doctor, nutritionist, or clinical authority.

## Technical Scope

This spec defines:

- required input fields for target calculation;
- input validation bounds needed before target calculation;
- first-version calorie target formula;
- first-version protein, fat, and carbohydrate target formula;
- goal-specific calorie mapping;
- recomposition target behavior;
- safety limits and fallback behavior;
- target availability contract for onboarding review and the first home screen;
- storage metadata for calculated targets;
- implementation verification expectations.

This spec does not define:

- nutrition diary behavior;
- food logging calculations;
- meal planning;
- AI food estimation;
- medical, clinical, or disease-specific nutrition advice;
- paid coaching or professional review;
- imperial units;
- body measurement targets;
- final visual design of target display.

## Calculation Principle

The first version should use a deterministic formula that is simple, explainable, and stable enough for private beta.

The recommended first-version baseline is Mifflin-St Jeor BMR with an activity multiplier, then a goal adjustment.

The existing legacy implementation may be used as technical donor material, but this spec is the authority for accepted target behavior.

Targets must be stored and displayed as estimates. UI copy should use wording such as "estimated daily target" rather than exact or guaranteed language.

## Required Inputs

Calorie and macro targets may be calculated only when these validated inputs exist:

- sex or gender for formula use: `male` or `female`;
- age;
- height in centimeters;
- current weight in kilograms;
- activity level;
- primary goal: `fat_loss`, `recomposition`, or `muscle_gain`;
- target weight in kilograms for `fat_loss`;
- final target weight in kilograms for `muscle_gain`;
- recomposition main result and scale-weight direction for `recomposition`;
- onboarding model version compatible with `SPEC-FEATURE-002`;
- user preferred language for display only.

Training frequency may inform future target refinement, but it must not change the first-version target formula unless a later accepted spec adds that rule.

If any required formula input is missing or invalid, targets must be unavailable rather than guessed.

## Input Validation Bounds

The first target calculation must reject clearly invalid values before calculation.

Initial accepted bounds:

- age: 13 to 80 inclusive;
- height: 120 cm to 230 cm inclusive;
- current weight: 35 kg to 250 kg inclusive;
- target weight: 35 kg to 250 kg inclusive;
- activity level: one accepted activity enum value;
- sex or gender: `male` or `female`.

Target weight must also be coherent with the selected goal:

- for `fat_loss`, target weight should be lower than current weight;
- for `muscle_gain`, target weight should be higher than current weight;
- for `recomposition`, exact target weight is not required and must not block target calculation.

If a user enters a target weight that conflicts with the selected goal, the Mini App should ask for correction before calculating targets.

For the first-version formula, target weight is an eligibility and goal-coherence input only. It confirms that fat loss or muscle gain direction is logically valid, but it does not change the calorie or macro formula.

The first version must not calculate timeline, expected weekly weight change, target-date calories, or progressive target adjustments from target weight. A later accepted spec may add time-based or target-weight-sensitive calculations.

These bounds are product-safety and data-quality bounds, not medical claims. A later accepted spec may adjust them after beta evidence.

## Activity Multipliers

The first-version activity multipliers are:

- sedentary: `1.2`;
- light: `1.375`;
- moderate: `1.55`;
- high: `1.725`.

If the UI uses different wording or additional localized labels, those labels must map to these accepted multipliers for the first version.

The first version must not add an athlete or very-high multiplier unless a later accepted spec defines it.

## Calorie Formula

Base metabolic rate must use Mifflin-St Jeor:

- male: `10 * weightKg + 6.25 * heightCm - 5 * age + 5`;
- female: `10 * weightKg + 6.25 * heightCm - 5 * age - 161`.

Estimated maintenance calories must be:

```text
maintenanceCalories = BMR * activityMultiplier
```

The first-version calorie target must apply the selected goal adjustment to maintenance calories and round the final result to the nearest 50 kcal.

Safety floor and ceiling checks must be applied after this nearest-50 rounding step, because the rounded calorie target is the value shown to the user and stored as the active target.

## Goal Calorie Mapping

The first-version goal adjustments are:

- `fat_loss`: `maintenanceCalories * 0.85`;
- `muscle_gain`: `maintenanceCalories * 1.10`;
- `recomposition`: goal-specific behavior defined below.

For `fat_loss`, the product must not calculate a target below the accepted minimum calorie floor.

For `muscle_gain`, the product must not calculate a target above the accepted maximum calorie ceiling.

The first version does not calculate timeline, expected weekly weight change, or predicted completion date.

## Recomposition Behavior

Recomposition must not be treated as simple fat loss by default.

The first-version recomposition calorie target depends on desired scale-weight direction:

- stay roughly the same: `maintenanceCalories * 1.00`;
- slightly decreasing: `maintenanceCalories * 0.95`;
- slightly increasing: `maintenanceCalories * 1.05`;
- not caring about scale weight: `maintenanceCalories * 1.00`.

The recomposition main result may affect copy and future personalization, but it must not change the first-version calorie formula unless a later accepted spec defines a more detailed recomposition model.

If recomposition direction is missing, targets must be unavailable until the user chooses it.

## Macro Formula

The macro formula must be calorie-budgeted. Calories are calculated first, and protein, fat, and carbohydrates must fit inside that daily calorie target as one coherent set.

The implementation must not calculate protein and fat independently in a way that leaves impossible negative carbohydrates for an otherwise valid user profile.

Base protein target:

```text
baseProteinG = round(currentWeightKg * proteinMultiplier)
```

The first-version protein multipliers are:

- `fat_loss`: `2.0 g/kg`;
- `recomposition`: `2.0 g/kg`;
- `muscle_gain`: `1.8 g/kg`.

Protein must then be capped by the calorie budget:

```text
maxProteinG = floor((calorieTarget * 0.40) / 4)
proteinG = min(baseProteinG, maxProteinG)
```

This keeps protein personalized by body weight and goal while preventing protein alone from consuming too much of a low calorie target.

Fat target:

```text
fatG = round((calorieTarget * 0.25) / 9)
```

The first-version fat target is calorie-based rather than weight-based, so it scales down when the calorie target is low and scales up when the calorie target is high.

Carbohydrate target:

```text
carbsG = round((calorieTarget - proteinG * 4 - fatG * 9) / 4)
```

Carbohydrates receive the remaining calorie budget after protein and fat. For a valid `available` target, carbohydrate target must be zero or positive by construction.

If an implementation produces negative carbohydrates for a supposedly valid target, the target must be treated as a formula or safety failure, must not be shown, and must not be stored as active. The expected availability state is `needs_review` unless the negative value is caused by a calorie floor or ceiling violation, in which case `unavailable_safety_limit` applies.

The implementation must not silently clamp negative carbohydrates to zero while still presenting the target as valid.

## Safety Limits

The first-version target must respect calorie floors and ceilings.

Initial accepted floors:

- male: `1500 kcal`;
- female: `1200 kcal`.

Initial accepted ceiling:

- all users: `4500 kcal`.

If the formula result falls below the floor, the system must return `unavailable_safety_limit`, must not show the target as available, and must not store it as an active target.

If the formula result exceeds the ceiling, the system must return `unavailable_safety_limit`, must not show the target as available, and must not store it as an active target.

The implementation may calculate the raw formula result internally, but floor and ceiling availability must be decided from the rounded calorie target. It must not expose or persist a raw unrounded value as the active target.

The `needs_review` state is reserved for bounded cases that cannot be safely classified as missing input, invalid input, safety-limit violation, or formula-not-accepted.

The product must not present these limits as medical thresholds. They are first-version product safety limits for private beta.

## Target Availability

Target availability states are:

- `available`: all required inputs are valid and targets pass safety limits;
- `unavailable_missing_input`: required inputs are missing;
- `unavailable_invalid_input`: required inputs fail validation;
- `unavailable_safety_limit`: calculated target violates floor or ceiling;
- `unavailable_formula_not_accepted`: implementation has not yet adopted an accepted target formula;
- `needs_review`: implementation cannot safely classify the target for another bounded reason.

The onboarding review step may show targets only in `available` state.

The first home screen must show target values only in `available` state. Otherwise it should show that targets are not available yet and guide the user to correct profile data or wait for the required implementation.

## Daily Tracking Compatibility

The targets produced by this spec are daily nutrition targets intended to support later daily remaining tracking.

This spec does not define food logging, meal entry calculation, consumed nutrient totals, or diary behavior. Those belong to a later nutrition diary or food logging spec.

However, the target output must be structured so a later nutrition diary can compare consumed food totals against daily targets and show:

- calorie target, consumed calories, and remaining calories;
- protein target, consumed protein, and remaining protein;
- fat target, consumed fat, and remaining fat;
- carbohydrate target, consumed carbohydrates, and remaining carbohydrates.

The first target model must include calories, protein, fat, and carbohydrates because these are the minimum required counters for the first daily diary-style home screen.

Additional nutrients such as fiber, sugar, saturated fat, sodium, or micronutrients may be added by later accepted nutrition specs, but they are not required first-version target counters in this TechnicalSpec.

Remaining-value behavior after food is logged, including whether over-target values are shown as negative remaining, warnings, colors, or status labels, must be defined by a later nutrition diary spec.

## Storage Contract

Stored target records must include:

- user identity reference;
- calorie target;
- protein target in grams;
- fat target in grams;
- carbohydrate target in grams;
- primary goal used for calculation;
- formula method identifier;
- target model version;
- source onboarding model version;
- calculation input snapshot or reference to a versioned profile snapshot used for calculation;
- calculated timestamp;
- active/inactive marker.

The calculation input snapshot must be sufficient to audit or reproduce the target later. It should include the formula inputs used at calculation time, such as sex or gender, age, height, current weight, activity level, primary goal, target weight when required, recomposition direction when required, and onboarding/profile model version.

If the implementation stores a reference instead of embedding the full snapshot, that reference must point to immutable or versioned profile data. It must not point only to the mutable current profile row if later edits would make the original calculation unreproducible.

When profile fields used by the formula change, the system should treat the active target as potentially stale and require recalculation before presenting it as current.

The first accepted formula method identifier should be equivalent to `MIFFLIN_ST_JEOR_V1`.

The first accepted target model version should be equivalent to `calorie_macro_targets_v1`.

If targets are unavailable, the system may store no active target record or may store an unavailable status separately. It must not store zero-valued active targets as if they were valid.

## API / Interfaces

The implementation must provide a typed server-side target calculation interface equivalent to:

- validate target inputs;
- calculate target result;
- return target availability state;
- persist active targets only when available;
- return a review-safe target summary for onboarding and home screen display.

The target calculation interface must be deterministic for the same inputs and accepted formula version.

## Health, Privacy, And Safety

Target copy must be short and bounded.

The product must communicate that targets are estimates for tracking.

The product must not:

- diagnose;
- treat;
- advise medical decisions;
- recommend extreme dieting;
- shame the user;
- imply guaranteed weight change;
- claim professional nutrition review.

If a user appears outside accepted calculation bounds, the product should avoid giving a target and should ask the user to review profile data.

## Migration / Operations

Legacy nutrition targets must not be automatically accepted as first-version Mini App onboarding targets unless they can be recomputed from accepted inputs using this spec.

The implementation plan applying this spec must define whether to:

- recompute targets for users who complete the new Mini App onboarding;
- leave existing legacy targets inactive until profile update;
- preserve legacy targets only as historical records.

The implementation must not overwrite existing historical nutrition, meal, workout, progress, or reminder data.

## Acceptance Test Checklist

An implementation plan that applies this TechnicalSpec must verify:

- valid `fat_loss` inputs produce available targets;
- valid `muscle_gain` inputs produce available targets;
- each recomposition scale-weight direction maps to the expected calorie adjustment;
- missing target weight for fat loss or muscle gain blocks target availability;
- changing a coherent target weight for fat loss or muscle gain does not change calorie or macro values in the first-version formula;
- missing recomposition direction blocks target availability;
- invalid age, height, weight, target weight, activity, or sex/gender blocks target availability;
- calorie floor violation returns `unavailable_safety_limit` and does not show or store an unsafe active target;
- calorie ceiling violation returns `unavailable_safety_limit` and does not show or store an extreme active target;
- negative carbohydrate calculation does not produce a negative displayed target;
- unavailable targets are shown as not available yet in onboarding review and home screen;
- target records include formula method and target model version;
- formula method identifier is equivalent to `MIFFLIN_ST_JEOR_V1`;
- target model version is equivalent to `calorie_macro_targets_v1`;
- Mifflin-St Jeor male BMR offset uses `+5`;
- Mifflin-St Jeor female BMR offset uses `-161`;
- activity multipliers match the accepted values: sedentary `1.2`, light `1.375`, moderate `1.55`, and high `1.725`;
- goal calorie adjustments match the accepted values: fat loss `0.85`, muscle gain `1.10`, recomposition same weight `1.00`, recomposition slight decrease `0.95`, recomposition slight increase `1.05`, and recomposition no scale focus `1.00`;
- calorie targets round to the nearest `50 kcal`;
- protein multipliers match the accepted values: fat loss `2.0 g/kg`, recomposition `2.0 g/kg`, and muscle gain `1.8 g/kg`;
- protein cap prevents protein calories from exceeding `40%` of calorie target;
- fat target uses `25%` of calorie target;
- carbohydrate target uses the remaining calorie budget after protein and fat;
- a high-weight, low-calorie valid-input scenario keeps carbohydrates zero or positive through the protein cap rather than clamping negative carbohydrates;
- repeated calculation with the same inputs produces the same result;
- legacy targets are not silently accepted as new Mini App onboarding targets.
