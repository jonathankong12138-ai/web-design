---
name: build
description: Implement or update web app code as the only development-stage artifact in the Web Design workflow. Use after an interactive prototype exists, or when code must be changed to match prototype behavior and visual/testing requirements. Use incremental implementation, TDD, debugging, security, performance, observability, and intent-vs-implementation checks only to produce working code, not separate plans or reports.
---

# Build

Implement the approved prototype as code. The codebase is the only development artifact.

## Output Contract

The only deliverable is working code, including tests when they are part of the codebase. Do not deliver implementation plans, design docs, audit reports, coverage maps, or separate handoff packets.

Final responses may summarize changed files, verification commands, and remaining blockers, but the artifact is the code.

## Inputs

Use these inputs in priority order:

1. The interactive prototype and its embedded behavior notes.
2. The latest adjustment checklist from `check`.
3. Existing codebase conventions, tests, and project instructions.
4. Official documentation for framework or API details when local knowledge may be stale.

## Workflow

1. Read the prototype as the source of product intent. If code and prototype conflict, the prototype wins unless the user says otherwise.
2. Inspect the existing app structure before editing. Reuse local patterns, components, state management, routing, styling, and test conventions.
3. Slice work vertically by user-visible flow. Avoid broad horizontal rewrites.
4. For behavior changes, write or update the smallest useful test first when the project has a test setup.
5. Implement the minimum coherent code needed to match the prototype and current checklist.
6. Check intent versus implementation: every core prototype path should have a corresponding code path; every permission, error, empty, loading, and destructive state should be represented when applicable.
7. Apply security, performance, and observability checks where the feature crosses user input, auth, data storage, external services, long lists, expensive rendering, or production diagnostics.
8. Run the relevant tests, build, typecheck, lint, or browser verification available in the repo.
9. If verification fails, debug from reproduction to root cause before expanding the change.

## Code Quality Bar

- Match the prototype behavior and the adjustment checklist.
- Preserve existing project conventions.
- Keep scope tight and reversible.
- Prefer clear code over clever abstractions.
- Add abstractions only when they remove real duplication or match established local patterns.
- Treat user input, model output, browser content, and external data as untrusted.
- Do not hide visual mismatches behind separate mobile-only markup unless the existing codebase already uses that pattern.

## Stop Conditions

Stop and report a blocker when the prototype is ambiguous in a way that changes product behavior, when implementation requires credentials or services not available locally, or when a high-risk operation is irreversible.
