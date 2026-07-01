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
8. Run the relevant tests, build, typecheck, lint, or browser verification available in the repo. Treat user-specified or project-specific validation commands as part of the verification contract; if they cannot run locally, report why.
9. If verification fails, debug from reproduction to root cause before expanding the change.

## Screenshot-Driven UI Refinements

Use this protocol only for screenshot-driven feedback, visual QA, responsive layout fixes, or changes to spacing, alignment, typography, media framing, section height, carousel framing, interaction state, or motion.

### Visual Fix Protocol

1. Confirm the visible runtime node: viewport, breakpoint, state class, generated DOM, clone, pseudo-element, scroll position, or animated phase.
2. Audit ownership before patching: search selector occurrences, inspect active overrides, and identify the final CSS or JS layer that controls the visible node.
3. Measure before editing: bounding boxes, visible distance, computed style, overflow, scroll dimensions, and relevant runtime state.
4. Patch the smallest responsible layer: prefer the active breakpoint, component, or state rule over broad overrides.
5. Verify after editing with the same measurement plus a rendered screenshot at the target viewport.
6. Check regressions: no horizontal overflow, no desktop/mobile regression, no hidden-DOM patch, and no reduced-motion violation.

Do not treat computed CSS values as sufficient proof. If declared values and visible geometry disagree, fix the rendered composition.

### Visual Checklists

Use the relevant checklist for the visible issue:

- Spacing: distinguish content-to-section, section-to-next-section, content-to-next-visible-element, and container-to-inner-content distances.
- Typography: verify `font-size`, `line-height`, text bounds, `scrollHeight`/`clientHeight`, and clipping.
- Media/frame: measure both container edge and visible media/content edge; inspect `object-fit`, `object-position`, intrinsic size, `max-width`, and internal track width.
- Runtime UI: reproduce JS-populated, cloned, carousel-swapped, scroll-pinned, pseudo-element, or state-swapped DOM before measuring.
- Interaction/motion: verify idle-before, active-during, and idle-after states; confirm final browser state such as `scrollY`, active slide, opacity, or selected tab.
- Section height: measure content bottom, controls, section bottom, and next section top before changing height.

### Dynamic Visual Systems

For WebGL, canvas, shader, hover heatmap, fluid mask, sticky scroll, pinned footer, selection-driven media, or scroll-triggered background effects, treat the rendered state machine as the implementation surface.

Before patching, identify:

- Runtime owner layer: canvas, pseudo-element, fixed/sticky container, generated media layer, active state class, Liquid-generated CSS, runtime CSS variable, or template config.
- State trigger: scroll progress, hover/focus, selected item, autoplay, click, visibility class, iframe/canvas mount, or reduced-motion.
- Visible target: coverage area, edge/boundary behavior, alpha mask, color intensity, z-index, animation timing, text overlap, and settled state.

After patching, verify at least three rendered states when feasible:

- Idle-before.
- Active-during at the user-reported state.
- Settled-after or next selected state.

For shader or canvas changes, do not rely on declared constants alone. Capture or inspect rendered output and check for blank canvas, invisible same-color output, hard rectangular boundaries, unintended noise, wrong alpha, wrong z-index, pointer-event blocking, media-layer conflicts, and text overlap.

### Shopify Theme And Config-Driven UI

For Shopify, Liquid, or config-driven theme work, distinguish rendered instance data from schema defaults.

Before changing visible text, media, links, colors, spacing, sticky behavior, animation, or background visibility:

1. Inspect the active template JSON or equivalent instance config.
2. Inspect the owning section/block Liquid and schema defaults.
3. Verify whether the visible value is controlled by instance settings, schema ranges, Liquid-generated CSS, runtime JavaScript, active block state, or CSS variables.
4. If a setting exceeds the schema range, do not rely on it as the fix.
5. Update both instance config and schema default only when the current page and future newly-created blocks should share the change.
6. Validate JSON after editing template files.

For repeated blocks with active states, measure the active block shown by the user and at least one non-first block when relevant. Do not assume the first block represents all titles, descriptions, media, awards, or sticky behavior.

For `position: absolute` children, measure the child's rendered box and the wrapper's rendered box separately. If spacing must follow visible text, resize or reposition the wrapper based on the active child's rendered height.

For sticky groups, apply sticky behavior to the intended group container when child elements must move together. Avoid making sibling title/description containers independently sticky unless independent motion is the desired behavior.

### Repeated Adjustment Protocol

When the same page receives repeated screenshot-based fixes, keep a compact working ledger: module, viewport/state, visible node, requested constraint, before/after measurement, owner layer, screenshot path, and regression surface.

After three or more visual fixes on one page, consolidate before the next patch. Look for repeated root causes such as wrong DOM owner, conflicting responsive overrides, fixed height/min-height, media fit drift, control anchoring issues, or state desynchronization. Prefer a scoped repair layer or shared module variable over accumulating unrelated one-off overrides.

### Preserve-Contract Ledger

When the same visual area receives repeated screenshot-based fixes, maintain a compact working ledger before further edits:

- Requested change: what the user wants now.
- Preserve contract: existing behavior, timing, reveal logic, pinning, motion, and effects that must not change.
- Active owner: the exact template, CSS rule, JS state, generated DOM, canvas, pseudo-element, or config value controlling the visible node.
- Prior changes: what was already modified in this thread.
- Verification target: viewport, scroll position, hover/focus state, selected item, sticky phase, animation phase, and expected visual result.

If the user says to preserve existing effects, treat that as a hard constraint. Revert or avoid incidental changes outside the requested property before applying the new change.

### Anti-Patterns

Avoid:

- Treating declared `gap`, `padding`, `top`, `font-size`, or `height` values as proof of visible geometry.
- Patching selectors before proving they own the visible runtime node.
- Measuring hidden, empty, placeholder, non-active, or unpopulated DOM.
- Assuming mobile content lives under the apparent mobile wrapper; confirm ancestry.
- Adding broad final `!important` overrides before finding the responsible layer.
- Changing timing, reveal logic, pinning, or motion behavior in an existing animated section when the user only requested color, spacing, copy, or visual style.
- Assuming changing a Liquid schema `default` updates the currently rendered Shopify page.
- Repeatedly tweaking numeric shader/CSS constants without naming the runtime state being fixed and verifying the rendered result.

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
