# Raw project knowledge - NORDWOLF

This temporary document captures what is known about the existing client project before client-local specifications are complete.

It is not an accepted specification and must not be used as implementation authority after bootstrap mode ends.

## Confirmed Product Decisions

- The official user-facing product name is `NORDWOLF`.
- The local folder and GitHub repository were originally named `Forma Prime`; accepted SDD work now governs the migration toward NORDWOLF naming.
- Naming cleanup is now governed by accepted `SPEC-FEATURE-001` and active `PLAN-0001`.
- Application code identifiers, PM2 configuration, and user-facing text should remain unchanged unless a future accepted spec or the active migration plan explicitly covers the change.

## Verified Implemented Behavior

These points are verified from the current repository structure and source code.

- The project is a Node.js TypeScript Telegram bot using grammY.
- The bot entrypoint is `src/index.ts`; it creates the bot, seeds essential nutrition foods, starts polling, and disconnects Prisma during shutdown.
- Environment validation requires `BOT_TOKEN` and `DATABASE_URL`, supports optional `DIRECT_URL`, `OPENAI_API_KEY`, and `OPENAI_FOOD_DRAFT_MODEL`, and defaults `LOG_LEVEL` to `info`.
- Prisma is configured for PostgreSQL and stores users, profiles, nutrition targets, foods, meals, workouts, progress check-ins, reminders, and conversation state.
- English and Russian message dictionaries exist through `src/i18n/`.
- English support exists in the codebase and has partial automated coverage for selected parsing, copy, reminder, nutrition, and fallback behavior; full English end-to-end bot verification is not recorded.
- `/start` upserts the Telegram user, resumes onboarding when the profile is incomplete, or returns the main menu when onboarding is complete.
- Onboarding collects language, gender, age, height, current weight, activity level, goal type, and training days, then calculates nutrition targets.
- The main menu exposes nutrition, workout, progress, check-in, and help actions.
- Food logging accepts free-text meal messages after onboarding, parses deterministic food entries, resolves known foods, asks clarification for ambiguous items, and records meal entries.
- Food logging can use an OpenAI-backed structured fallback when deterministic parsing or matching is insufficient and `OPENAI_API_KEY` is available.
- Learned food fallback candidates are stored and reused per user when confidence and validation rules pass.
- Users can manage custom foods with `/customfood`.
- Users can view, edit, delete, and relog recent or latest meals through `/lastmeal` and `/recentfoods`.
- `/today`, `/food`, and `/meals` expose nutrition summaries or food-related command flows.
- Workout logging supports starting a workout from an active split or as a manual session, logging sets from text, resolving ambiguous exercises, finishing active sessions, and viewing today's workouts.
- Users can view, edit, and delete the latest workout log with `/lastworkout`.
- Progress features include manual weight logging, progress summary, weekly summary, and a weekly check-in flow with weight, nutrition adherence, training adherence, energy, and optional notes.
- Reminder features let users configure food-log, workout-log, and weekly-check-in reminders with local time and optional weekday for weekly check-ins.
- `src/reminders/run-reminders.ts` runs reminder delivery as a separate command using the existing bot token.
- `miniapp/` contains a static Telegram Mini App UI with onboarding, nutrition, training, and progress screens.
- `tests/` contains automated coverage for food parsing and matching, meals, learned fallback, OpenAI adapters, workouts, reminders, progress, and polish behavior.
- `package.json` already provides valid `build` and `test` scripts.

## Unfinished Or Partially Implemented Behavior

These points are observations from code and copy. They are not confirmed product requirements.

- The Mini App appears to be a static client-side prototype or V1 flow; no backend API integration was found in the inspected files.
- Some Mini App screens describe "next" or V1-style placeholder flows, especially around quick entries, last entries, focus screens, and progress check-in review.
- The repository originated as `Forma Prime`, while the confirmed official user-facing product name is `NORDWOLF`.
- Existing migration names reference earlier `spec_*` work. Official SDD-GEN accepted specs are governed by `specs/accepted/manifest.json`.
- Legacy SDD documents exist in `sdd/`, but they have not been converted into official SDD-GEN specs.

## Planned Ideas Found In Documentation

These ideas were found in legacy documentation and are not accepted requirements.

- Move or summarize useful existing SDD material from the legacy client project when it does not contain private data.
- Analyze `fix-06-review-pack.md` and extract a reusable review-pack template if useful.
- Document current module architecture for nutrition, workouts, progress, and reminders.
- Map existing migrations to the earlier spec naming that appears in migration folder names.
- Add a manual verification template for Telegram scenarios.
- Add a manual verification template for Mini App scenarios.
- Clean up naming later so repository docs, code identifiers, PM2 configuration, and user-facing text consistently reflect the confirmed product name, after an accepted spec or approved plan authorizes the work.

## Assumptions

These are inferences from code or configuration and need confirmation before becoming requirements.

- Supabase may be the intended PostgreSQL host because `.env.example` describes Supabase connection strings.
- PM2 may be used for production process management because `ecosystem.config.cjs` is present.
- The OpenAI food fallback is optional because the environment key is optional and adapters handle unavailable or failed responses.
- The initial client Global Spec should probably describe the existing product state before new feature work starts.

## Open Questions

- Which existing behavior should become the first accepted Global Spec scope?
- Which parts of the Mini App are intended to be production behavior versus prototype-only behavior?
- Should legacy `sdd/` content stay permanently as historical context, or be archived after official specs are accepted?
- Should `fix-06-review-pack.md` remain in the repository root or be classified later as non-authoritative review history?
- Which environments actually run reminder delivery, and how is the schedule triggered outside the app?
- Should Git hooks be installed immediately with `npm run hooks:install`, or kept as versioned hooks until a human enables them?
