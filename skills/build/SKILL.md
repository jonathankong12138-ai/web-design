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

## Screenshot-Driven UI Refinements

When refining UI from screenshots or visual QA, start from the visible problem, not from the first matching CSS selector. Classify the issue as spacing, alignment, size, typography, media fit, control density, motion, state synchronization, or section height before editing.

Use this sequence:

1. Identify the actually visible element in browser, including the active breakpoint, state class, slide, clone, or animated phase.
2. Determine the requested design variable, such as `gap`, `padding`, `font-size`, `line-height`, `font-weight`, `height`, `width`, `object-fit`, `object-position`, `animation-duration`, or a state transition.
3. Measure before changing: bounding boxes, computed styles, visible overflow, active media query, and current state classes.
4. Patch the latest responsible layer with the smallest useful scope, preferably the narrowest mobile, tablet, desktop, or component-state rule that owns the rendered result.
5. Verify after changing with the same measurable value in browser. Do not rely only on visual intuition.
6. Preserve adjacent constraints: no horizontal overflow, no desktop regression from mobile fixes, no reduced-motion violation, and no patch to hidden DOM mistaken for the visible element.

For repeated visual feedback on the same responsive page, maintain a small geometry constraint ledger in working notes before patching: section or module, state or slide, requested numeric constraint, CSS owner, verification viewport, and regression surface.

After three or more screenshot fixes on one page, pause and consolidate before continuing. Inspect whether the repeated fixes reveal a wrong module structure, wrong state source, wrong media fit rule, or control anchoring issue.

Map common visual requests to layout primitives:

- For spacing, measure the rendered distance between boxes and set the responsible layout variable.
- For media that is too small, cropped, or drifting, adjust the media container and `object-fit` or `object-position` together.
- For typography drift, match `font-size`, `line-height`, `font-weight`, and max-width, not size alone.
- For sparse or crowded controls, fix the control group's width, alignment, and `gap` before changing individual icons.
- For rough motion, define entering and leaving states, direction, click guards, timer cleanup, and a reduced-motion fallback.
- For state synchronization bugs, inspect the visible state source and any cloned, delayed, autoplay, or transition state before patching.
- For sections that feel too tall or empty, measure content bottom, controls, and section bottom before changing height.
- For carousel, tab, or internal-scroll sections, verify first, middle, and last state when available, and keep controls anchored to the section rather than the active content.

Avoid broad final `!important` patches until the visible element, active state, and responsible CSS layer are known.

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
