---
id: SPEC-GLOBAL-001
type: GlobalSpec
status: Accepted
title: NORDWOLF product vision
parent: null
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

# NORDWOLF Product Vision

## Purpose

NORDWOLF exists to help a person manage fitness basics consistently without turning daily tracking into a separate job.

The product should make nutrition, training, progress, reminders, and personal guidance feel simple, direct, and connected inside the Telegram environment.

The product character should be strict tracker-discipline first. NORDWOLF should help the user record facts, stay consistent, see progress, and return to the plan without becoming a soft motivational chat or vague lifestyle coach.

NORDWOLF must be designed forward from product goals, not backward from the current repository implementation. The existing bot and Mini App are a legacy baseline, experiment history, and capability reference. They are not the source of truth for final product behavior, interaction design, architecture, data model, commands, copy, or UI.

## Client

NORDWOLF is a personal fitness companion product delivered through Telegram.

The confirmed user-facing product name is `NORDWOLF`. The local folder and repository may temporarily remain named `Forma Prime`; naming cleanup is future work and must not happen as part of this Global Spec.

The product should favor practical daily usefulness over heavy process. It should be strong enough to support future structured development through Feature Specs and Technical Specs, while staying focused on a personal product rhythm.

## Users

The first target audience is not only the project owner. NORDWOLF should be designed for a small private beta of approximately 2-5 trusted users, such as friends or gym contacts who actively train, care about nutrition, and can give practical feedback.

The first audience may include users in France from different language backgrounds. The product should not assume that every early user speaks the same language.

The initial user is a person who wants to improve or maintain body composition, training consistency, and health-related habits without managing several separate apps.

The user likely needs:

- quick food logging with useful calorie and macro feedback;
- simple workout capture that does not interrupt training;
- progress tracking that makes trends visible without overreacting to noise;
- reminders that support habits without becoming annoying;
- onboarding that creates enough context to personalize the experience;
- AI help when manual input is too tedious or ambiguous.

The product should not assume the user is a professional athlete, nutritionist, coach, or power user.

Body recomposition must be treated as a distinct user goal, not as a variant of simple weight loss. A user may want to reduce body fat, improve visual shape, and preserve or gain muscle without targeting a much lower scale weight.

For the first private beta direction, Russian, French, and English are required product languages. Other languages may be considered later.

## Usage Context

NORDWOLF is used in Telegram during normal daily life:

- before, during, or after meals;
- before, during, or after workouts;
- during weekly reflection or check-in moments;
- when the user needs a reminder or quick status snapshot;
- when the user wants to review progress without opening a complex dashboard.

The Telegram bot should be the entry point and fast interaction layer. A user should be able to discover NORDWOLF through the bot, understand what it does, start the relationship with the product, and perform quick actions.

The Telegram Mini App should become the main structured interface for onboarding, profile setup, richer tracking, review, and dashboard-like experiences. Chat should remain useful for fast capture and lightweight prompts, but the Mini App should carry the main product experience when structured interaction is needed.

## Goals

### Confirmed Target Product Goals

- Create a cleaner, stronger product definition for NORDWOLF through SDD.
- Treat the current implementation as legacy baseline material, not as product authority.
- Build around consistency, clarity, fast daily use, and practical usefulness for a small early test group.
- Establish NORDWOLF as a strict tracker-discipline product: clear logging, clear feedback, consistent habits, and limited noise.
- Connect nutrition, training, progress, reminders, onboarding, and AI-assisted features into one coherent personal system.
- Support multiple fitness goals in the product direction, including fat loss, recomposition, muscle gain, maintenance, nutrition discipline, nutrition progress, workout control, and workout progress.
- Avoid reducing all goals to target scale weight. Some goals need different success signals, especially recomposition and fat-loss-with-muscle-retention.
- Make the Mini App the main structured product surface while keeping the Telegram bot valuable as the entry point and quick-input layer.
- Treat the legacy codebase as a technical donor, not as product authority. Reusable pieces may be kept or adapted only when future accepted specs justify them.
- Keep future implementation traceable to accepted client specs.
- Preserve useful existing knowledge without blindly copying current commands, flows, UI, data structures, or copy.

### Main Product Problems To Solve

- The user needs a low-friction way to record meals and understand daily nutrition.
- The user needs workout logging that is fast enough to use while training.
- The user needs progress views that show trends and useful signals, not only raw entries.
- The user needs reminders and check-ins that improve consistency.
- The user needs onboarding that personalizes the product without feeling like a form.
- The user needs AI assistance where it reduces effort or resolves ambiguity, while keeping the product trustworthy.

## Product Principles

NORDWOLF should follow these product principles across future Feature Specs and Technical Specs:

- Strict tracker-discipline first: the product should prioritize facts, consistency, progress, and action over vague motivation.
- Mini App first for structured workflows: onboarding, dashboards, profile, settings, review, and editing should primarily live in the Mini App.
- Telegram bot as entry and quick input: the bot should introduce the product, route users, capture fast actions, and deliver reminders.
- No open-ended AI chat: AI must work as a controlled resolver, classifier, estimator, or formatter inside product boundaries.
- Clarity over noise: screens, messages, reminders, and feedback should be short, direct, and understandable.
- Strict without shame: discipline-focused copy must not become insulting, humiliating, medically suggestive, or fear-based.
- User control: the user should be able to understand and adjust goals, profile data, language, and key settings.
- Legacy is not authority: current code, UI, commands, schema, and copy can inform future work but must not define final behavior automatically.
- No surprise legacy breakage: redesign work must not unexpectedly destroy useful current behavior, user data, environment configuration, or operational workflows without an accepted migration decision.
- Privacy and health boundaries first: future specs that use body metrics, nutrition estimates, AI assistance, or beta-user feedback must define health-safety, privacy, storage, and retention boundaries before implementation.

## Product Pillars

NORDWOLF's product foundation rests on these pillars:

- Onboarding and personalization: collect the minimum useful context and adapt the product to the user's goal.
- Nutrition discipline: make food logging and daily calorie/macro awareness fast and reliable.
- Training discipline: make workouts, plans, working weights, and training history easy to record and review.
- Progress visibility: show useful changes over time without reducing every goal to scale weight.
- Wolf companion: turn consistency into a visible first-beta product signal through a wolf-like companion tied to real user actions.
- Multilingual private beta: support Russian, French, and English for early users.

## First Product Direction

The first product direction should focus on a coherent Mini App-centered experience rather than copying the current legacy bot structure.

The first meaningful beta should be a complete product foundation, not a narrow demo. It should include the core loop of onboarding, daily tracking, progress visibility, reminders, and the wolf companion, while leaving advanced automation for later specs.

The first meaningful product version should include:

- Mini App onboarding with language, goal, body metrics, activity, and training context;
- goal-specific onboarding branches, especially for recomposition versus simple weight loss;
- a home dashboard with the wolf companion, today's status, nutrition summary, and quick actions;
- a nutrition diary with fast manual logging, food database matching, calories, and macros;
- workout logging with history, manual plan setup, and progress by working weights or performance;
- a progress area for weight, body measurements, nutrition consistency, training consistency, and recomposition signals;
- reminders that support consistency without becoming noisy;
- Russian, French, and English language support with clear fallback behavior;
- strict AI fallback only where deterministic matching or structured input is not enough, if AI is enabled for beta.

Photo-based food recognition, broad meal generation, visual body prediction, and open-ended AI coaching are not part of the first beta foundation unless a later accepted spec explicitly adds them.

This section is not an implementation plan. Each area still needs focused Feature Specs before implementation.

## Non-Negotiables

- The current implementation is a legacy baseline and technical donor, not the product source of truth.
- Recomposition must not be treated as simple weight loss with a lower target weight.
- AI must not behave like general ChatGPT or an open conversation surface.
- AI must produce short, structured, task-limited results and must not give medical advice or unrestricted coaching.
- The Mini App must not become a loose set of cards; it should guide the user through daily discipline.
- The wolf companion is required for the first meaningful beta and must reflect real user actions and discipline.
- Food and workout logging must stay fast enough for real daily use.
- Paid AI usage and advanced automation must be controlled by clear product rules before launch.
- Russian, French, and English must be supported for the first private beta direction.
- Current working behavior, data, environment files, deployment settings, and operational workflows must not be broken unexpectedly during redesign or migration.

## Macro Functional Scope

### Telegram Bot

The bot is the discovery, entry, and fast interaction surface.

It should introduce the user to NORDWOLF, explain the value clearly, connect the user to the account/setup flow, and route the user into the Mini App when structured setup or review is needed.

It should also support quick capture, short confirmations, reminders, lightweight guidance, and recovery from incomplete or ambiguous input. Future Feature Specs should decide exact commands, message flows, and conversation states.

The current bot implementation demonstrates possible capabilities, but its command list, callback structure, copy, and flow sequencing are not final requirements.

### Telegram Mini App

The Mini App is the main structured product surface.

It should be used for registration/onboarding, profile setup, body metrics, goal selection, settings, visual review, structured editing, dashboards, and multi-step workflows that are better than chat messages. Future specs should decide the exact scope and sequence.

The Mini App should make onboarding feel like a guided setup, not a raw technical form. Reference material showed a clear step-by-step flow with progress indication, large option cards, simple human wording, and numeric input cards. NORDWOLF may use those ideas after redesign, without copying the reference product blindly.

The Mini App should include a gamified wolf companion experience, where a user cares for or develops a wolf-like character through consistent nutrition, training, progress, and habit actions. The wolf should primarily reflect discipline and consistency, not become a separate decorative toy or unrelated game.

The wolf companion should be introduced in the first beta experience, preferably immediately after the initial questionnaire together with the user's profile or daily status summary. Future specs must define exact mechanics, states, visuals, and which actions affect the wolf.

The current Mini App is legacy reference material. Its screens, static flow, styling, and V1 placeholders must be redesigned before being treated as final product behavior.

### Nutrition Tracking

Nutrition tracking should help the user log food quickly, understand daily totals, and compare intake against useful targets.

The product should support common real-life input, ambiguity handling, reusable foods, and simple summaries.

NORDWOLF should aim for strong food understanding before relying heavily on paid AI calls. A rich food database, aliases, common phrases, multilingual food names, and robust matching should be considered important first-version product capabilities because they can reduce user friction and control AI cost.

AI may assist with parsing, estimation, and clarification, but future specs must define trust boundaries, confirmation rules, correction flows, health-safety boundaries, privacy handling, and cost-control rules.

Photo-based food recognition and broader AI food automation are not first-priority foundation requirements. They may be explored after fast manual input, food database quality, calorie and macro feedback, and reliable matching are working well enough for beta use.

### Workout Tracking

Workout tracking should let the user record training with minimal interruption and review useful summaries afterward.

The first product direction should prioritize workout logging, workout history, simple statistics, and progress by exercise weights or performance. The user should be able to control and review working weights over time.

NORDWOLF should also allow a user to define or record a personal training plan manually, such as exercises, workout days, and what the user intends to train. Future specs should decide how structured this plan needs to be.

Future specs should define exact workout logging format, manual plan editing, progressive overload views, workout history, and coaching cues. Existing workout parsing and session behavior are reference capabilities only.

### Progress Tracking

Progress tracking should help the user understand change over time.

It may include bodyweight, weekly check-ins, nutrition consistency, training consistency, energy, notes, and trend summaries. Future specs should define the exact progress model and what signals matter.

### Reminders

Reminders should support consistency without creating noise.

They may cover food logging, workout logging, weekly check-ins, or other habit moments. Future specs should define reminder types, timing rules, quiet behavior, personalization, and delivery expectations.

### Onboarding

Onboarding should collect enough information to personalize NORDWOLF while keeping the first experience short and clear.

It may gather goals, body metrics, training context, language, preferences, and reminder intent. Future specs should decide what is mandatory, what is optional, and how onboarding continues after first use.

Onboarding should adapt follow-up questions to the selected goal. For example, a simple weight-loss goal may ask for desired target weight, while recomposition should not be treated as only a lower target weight and may need body-shape, fat-loss, strength, or visual-progress signals.

### AI-Assisted Features

AI should reduce friction and improve interpretation, not replace user control.

Potential AI-assisted areas include food parsing, food estimation, ambiguity resolution, compact summaries, and strictly bounded product hints.

AI must not turn NORDWOLF into an open-ended chat assistant.

AI must not present itself as a doctor, nutritionist, psychologist, or general coach. It must not provide diagnosis, treatment, medical advice, eating-disorder guidance, unsafe body-composition advice, or broad life coaching.

When AI is used, it should behave like a strict internal resolver or classifier, not like a conversational personality. The user should not feel that they are chatting with a general-purpose AI model.

AI-assisted responses should be short, structured, and limited to the product task. For example, when AI helps resolve an unknown food input, the output should resemble a database-backed result: a food match, a compact clarification, a short estimate, or a failure state. It should not produce long explanations, casual conversation, unrelated advice, motivational monologues, or general chat responses.

The first beta may start without always-on AI if a deterministic food database and matching layer can handle enough real user input. If AI is enabled, it should be used as a narrow fallback or resolver, not as the main product interface. The decision to enable AI by default remains open and should consider usefulness, accuracy, privacy, safety, and operating cost.

Future specs must define when AI output is trusted, when confirmation is required, how uncertainty is shown, what data is stored, how often paid AI calls are allowed, and which strict response formats AI is allowed to return.

### Localization

NORDWOLF should support language selection and should not be designed as a single-language product.

The product should consider the Telegram user's device or Telegram language as an initial signal, then allow the user to choose or change language. France is a multilingual usage context, so future specs should define fallback behavior and translation quality rules.

Russian, French, and English are required for the first private beta direction. Future specs should define how these languages are verified end to end and whether other languages such as Arabic are needed later.

## Existing Legacy Implementation

The repository already contains a Telegram bot and Telegram Mini App implementation. This implementation is legacy baseline material.

Legacy implementation may be used as:

- reference material;
- evidence of previous experiments;
- a source of reusable ideas;
- a source for understanding the fitness tracking domain;
- a source for identifying technical risks and existing capabilities.

Legacy implementation must not be used as automatic product authority.

Current architecture, database schema, commands, handlers, UI screens, Mini App navigation, message copy, migrations, tests, and deployment configuration remain implementation facts, not target product requirements.

## Reusable Existing Capabilities

The current codebase appears to contain reusable capabilities that future specs may evaluate:

- Telegram bot interaction patterns;
- English and Russian message dictionaries, with English support requiring end-to-end verification;
- onboarding and nutrition-target calculation concepts;
- deterministic food parsing and matching;
- AI-assisted food draft and fallback experiments;
- custom and learned food concepts;
- meal history, edit, delete, and quick repeat ideas;
- workout session and set logging concepts;
- bodyweight and weekly check-in concepts;
- reminder configuration and delivery concepts;
- automated tests for many domain behaviors.

These capabilities should be reviewed before reuse. Reuse requires a future accepted Feature Spec or Technical Spec. The old codebase should be treated as a technical donor: useful implementation pieces may be reused, but old product decisions must not control the new product definition.

## Reference Research Direction

External Telegram Mini App screenshots reviewed during drafting showed product patterns that may be useful for NORDWOLF research. These patterns are reference material only and must not be copied blindly.

Useful patterns to evaluate for NORDWOLF include:

- Telegram chat as a short product introduction that routes the user into the Mini App;
- step-by-step Mini App onboarding with visible progress, large cards, simple wording, and focused numeric inputs;
- a post-onboarding home screen that combines a companion character, daily status, calories, macros, and quick actions;
- meal sections such as breakfast, lunch, dinner, and snacks with quick add actions;
- training setup with frequency selection, home/gym context, programs, and workout history;
- progress views that include bodyweight, body measurements, nutrition history, workout history, and empty states that guide the first action;
- language and theme settings inside the Mini App;
- a possible rating or competition layer for a small private beta.

Patterns that require caution before adoption:

- subscription, upgrade, referral, supplement, psychologist, and broad marketplace-style blocks may distract from the first product core;
- gamification must support tracker-discipline behavior instead of becoming decoration;
- ranking should be evaluated carefully because it can motivate a small gym group but may also create noise or pressure; personal discipline and personal progress should come first;
- AI-generated meals, visual predictions, or recommendations must follow NORDWOLF's strict AI boundaries and must not become open-ended chat.

## Behavior That Must Be Redesigned

Future specs should deliberately redesign, rather than blindly preserve:

- the overall product journey from first use to repeated daily use;
- the division of responsibility between bot and Mini App;
- onboarding content and completion criteria;
- command naming, menu structure, and conversation flow;
- Mini App screens, navigation, and visual hierarchy;
- nutrition logging correction and confirmation flows;
- workout planning versus workout logging scope;
- progress summaries and coaching signal design;
- reminder rules and user control;
- AI trust, transparency, and fallback behavior;
- naming consistency across user-facing surfaces and repository artifacts.

## Future Scope

Future Feature Specs and Technical Specs may define:

- first-run onboarding;
- goal-specific onboarding for fat loss, recomposition, muscle gain, and maintenance;
- nutrition logging v2;
- food correction and custom-food management;
- workout logging v2;
- manual workout plan setup;
- exercise weight and performance progress tracking;
- progress dashboard and weekly review;
- reminder experience;
- Mini App product shell;
- AI assistance boundaries;
- localization and language verification;
- gamified wolf companion mechanics for the Mini App;
- health, privacy, storage, and data-retention boundaries;
- migration from legacy behavior into accepted product behavior;
- naming cleanup from `Forma Prime` to `NORDWOLF` where appropriate.

Each future spec should cover one focused capability or decision area.

## Success Definition

The Global Spec direction is successful when future accepted specs can produce a beta experience where a trusted early user can:

- understand what NORDWOLF does from the Telegram entry point;
- complete onboarding without external explanation;
- see the wolf companion and understand what its state means;
- understand what to do today from the Mini App home screen;
- log food quickly enough to use it repeatedly;
- log workouts and review working-weight or performance progress;
- see useful progress signals beyond raw bodyweight;
- use Russian, French, or English without confusion;
- receive reminders that support discipline without feeling intrusive;
- return the next day because the product makes daily discipline easier.

## Out Of Scope

This Global Spec does not define:

- low-level architecture;
- database schema;
- API design;
- file structure;
- implementation steps;
- final Telegram commands;
- final Mini App screens;
- final message copy;
- final AI prompts or model choices;
- deployment configuration;
- migration plans;
- acceptance of current legacy behavior as final product behavior.

## Open Product Questions

- Which users should be included in the first private beta, and what feedback should be collected from them?
- Should the first product version support all major fitness goals equally, or should one goal be treated as the default product path?
- What exact signals should define success for recomposition: bodyweight trend, photos, measurements, strength progress, adherence, or another combination?
- Which onboarding questions should change by goal type?
- How strict should the tracker-discipline character be in daily copy, reminders, and progress feedback?
- What exact wolf companion states, visuals, and progression rules should the first beta use?
- How soon after onboarding should the wolf companion appear, and what minimum profile or daily-status information should appear beside it?
- If a wolf companion is included, which user actions should affect it: food logging, workout logging, weight/progress updates, check-ins, reminder consistency, or all of these?
- What examples from existing Telegram Mini Apps should be researched before specifying the wolf companion experience?
- Which workflows must stay in Telegram chat, and which should move to the Mini App first?
- What is the minimum onboarding required before the product becomes useful?
- How much manual confirmation should be required for AI-estimated nutrition?
- Should strict AI fallback be optional, default-on for specific cases, or disabled at launch for cost control?
- What nutrition accuracy level is acceptable for the target user?
- How large and detailed must the food database be before beta testing starts?
- What should happen when the user's Telegram language is unsupported by the first language set?
- What exact strict response formats should AI be allowed to return for food, guidance, and clarification tasks?
- How should manual workout plans be created and edited without making setup too heavy?
- What exercise performance metrics should be tracked first: working weight, reps, sets, volume, personal records, or another signal?
- What progress signals matter most beyond bodyweight?
- How should reminders avoid becoming intrusive?
- What evidence is required before Russian, French, and English support can be considered fully implemented?
- What exact privacy, storage, and retention rules should apply to body metrics, nutrition logs, workouts, AI requests, and private beta feedback?
- Which legacy behaviors are valuable enough to preserve in future specs?
- Which legacy behaviors should be discarded entirely?
- What should be the first Feature Spec after this Global Spec?
