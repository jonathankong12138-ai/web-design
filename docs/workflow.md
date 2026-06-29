# Workflow

Web Design is a staged Codex workflow for moving web product work from intent to shipped implementation quality without creating extra handoff documents.

Use the whole loop for a new project, or enter at the first stage that matches the artifact you already have.

```text
requirements / prototype
  -> design / web-design
  -> development / build
  -> testing / check
  -> retrospective / retro
```

When the development source is Figma, a screenshot, or a design image, `figma-web-build` coordinates a more specific development path:

```text
figma-web-build
  -> figma-web-design-analysis
  -> figma-web-repo-analysis
  -> figma-web-implementation-map
  -> figma-web-code-implementation
  -> figma-web-interaction-states
  -> figma-web-visual-alignment
  -> figma-web-browser-verification
  -> figma-web-quality-finish
```

## 1. Requirements: `prototype`

Use `prototype` when the input is a rough idea, PRD, feature request, user story, customer feedback, existing product flow, or design brief.

Output:

- Runnable, reviewable interactive prototype.
- Page inventory, flows, states, edge cases, and review notes embedded in the prototype.
- Open questions only when they help reviewers inspect the prototype.

Do not output a separate PRD, roadmap, discovery plan, story document, or test plan.

If the input is a rough PRD and the user needs a shareable review tool, use `prd-to-reviewable-prototype`.

## 2. Design: `web-design`

Use `web-design` when the work is preparing, organizing, revising, or gating design handoff materials before development.

Common inputs:

- "What should the designer submit?"
- "Organize this Figma handoff for development."
- "Can this design enter build?"
- Figma link, screenshot, prototype context, design notes, or target route.

Outputs:

- Designer-facing handoff guidance.
- Structured `Design Handoff Submission`.
- Decision to run `web-design-handoff-review`.
- Build entry notes when the design is ready or conditionally ready.

The recommended handoff structure is:

```md
# Design Handoff Submission

## Design Source
- Figma URL:
- File / page:
- Frames for build:
- Screenshot fallback:

## Scope
- In scope:
- Out of scope:
- Target route / page if known:

## Prototype / Requirement Context
- Prototype link:
- User path:
- Business rules:

## Breakpoints
- Desktop:
- Tablet:
- Mobile:
- Responsive notes:

## States
- Default:
- Hover / focus / active:
- Loading:
- Empty:
- Error:
- Disabled:
- Modal / drawer / popover:

## Content / Data
- Final copy:
- Placeholder copy:
- Example data:
- CMS / API notes:

## Tokens
- Color notes:
- Typography notes:
- Spacing notes:
- Radius / shadow / border notes:
- Design system mapping:

## Assets
- Images:
- Icons:
- Logos:
- Fonts:
- Video:
- Export notes:

## Interactions
- Click / navigation:
- Form behavior:
- Validation:
- Motion:
- Scroll / carousel / tabs:

## Developer-Allowed Assumptions
- 

## Open Questions
- 
```

## 3. Design Review: `web-design-handoff-review`

Use `web-design-handoff-review` when build readiness is unclear, when the user asks whether a design is ready for development, or before a Figma/screenshot design enters `figma-web-build`.

Output:

- `Design Handoff Checklist`.
- `Ready for build: Yes`, `Ready for build: Conditional`, or `Ready for build: No`.

`Conditional` means development may proceed only with explicit `Developer-Allowed Assumptions`.

Typical blockers:

- No clear target frame, page, or scope.
- Static visual only, while the product flow requires interaction decisions.
- Key assets are not exportable and no fallback is approved.
- Desktop and mobile behavior cannot be inferred.
- Forms, purchase, auth, permissions, destructive actions, modals, or submission flows lack states.
- Prototype intent and design intent conflict without a decision.

When designers respond to review findings, they should answer by checklist ID:

```md
# Handoff Fix Response

## Fixed Items

### DHR-001
Status: Fixed | Accepted Assumption | Won't Fix
Change:
Verification:
Owner:

## Remaining Questions
- 
```

## 4. Development: `build`

Use `build` when the source is an approved prototype, product intent, existing codebase, or `Adjustment Checklist`.

Output:

- Working code.
- Tests, fixtures, configuration, and verification changes only when they belong in the codebase.
- A final note summarizing changed files, verification commands, and remaining blockers.

Do not output a standalone implementation plan, audit report, design handoff, or test plan.

## 5. Figma Development: `figma-web-build`

Use `figma-web-build` when the source of truth is a Figma frame, screenshot, exported image, visual QA evidence, or desktop/mobile design pair.

Recommended precondition:

- The design has passed `web-design-handoff-review`; or
- A clear `Design Handoff Submission` exists; or
- The user explicitly accepts development assumptions.

Execution modes:

- Light: design analysis -> repo analysis -> code implementation -> browser verification -> quality finish.
- Standard: design analysis -> repo analysis -> implementation map -> code implementation -> interaction states -> visual alignment -> browser verification -> quality finish.
- Strict: standard mode plus multi-breakpoint screenshots, DOM measurement, stricter accessibility checks, and performance review.

The Figma chain skills divide responsibility:

| Skill | Responsibility |
|---|---|
| `figma-web-design-analysis` | Convert design source into frames, breakpoints, states, page structure, content, tokens, assets, interactions, and unknowns |
| `figma-web-repo-analysis` | Find stack, package manager, route/page entry, reusable components, styling, asset rules, commands, and constraints |
| `figma-web-implementation-map` | Map design to routes, components, tokens, assets, responsive strategy, slices, and assumptions |
| `figma-web-code-implementation` | Write routes, layout, sections, components, styles, content, data, and assets |
| `figma-web-interaction-states` | Add hover, focus, active, disabled, loading, empty, error, form, modal, tab, carousel, navigation, and motion states |
| `figma-web-visual-alignment` | Align rendered spacing, typography, media crop, responsive layout, overflow, section height, and control density |
| `figma-web-browser-verification` | Capture browser evidence across viewports, console/runtime, DOM, interactions, and responsive behavior |
| `figma-web-quality-finish` | Run lint, typecheck, build, tests, accessibility basics, performance checks, cleanup, and final summary |

## 6. Testing: `check`

Use `check` after code is implemented or changed and the user needs independent acceptance against a prototype, design, or baseline intent.

Output:

- `Adjustment Checklist`.

Each item should include:

- Evidence.
- State coverage.
- Regression risk.
- Expected behavior.
- Actual behavior.
- Developer instruction.
- Verification step.

Do not directly patch code unless the user explicitly switches to `build`.

## 7. Retrospective: `retro`

Use `retro` after a prototype/build/check cycle, failed handoff, repeated rework, user correction, visual QA miss, implementation drift, unclear requirement, or completed Web Design task.

Output:

- `Skill Upgrade Guide`.

The guide should include:

- Target skill.
- Observed failure.
- Evidence.
- Root cause.
- Instruction change.
- Trigger change.
- Anti-pattern to prevent.
- Acceptance example.

Use `task-retro-upgrader` when the desired output is a scoped skill-maintenance brief for another Codex, rather than an immediate Web Design flow retro.

## Common Paths

Standard new page:

```text
prototype
  -> web-design
  -> web-design-handoff-review
  -> figma-web-build
  -> check
  -> build
  -> check
  -> retro
```

No Figma, only requirements:

```text
prototype
  -> web-design
  -> build
  -> check
  -> retro
```

Existing Figma, ready to develop:

```text
web-design-handoff-review
  -> figma-web-build
  -> check
  -> build
  -> check
  -> retro
```

Existing page with visual or responsive issues:

```text
frontend-visual-qa-coach
  -> build or responsive-page-adapter
  -> check
```

## Selection Guide

| Situation | First skill | Next step |
|---|---|---|
| Only a product idea exists | `prototype` | Generate a reviewable prototype |
| Rough PRD needs review artifact | `prd-to-reviewable-prototype` | Generate a browser prototype review folder |
| Designer needs handoff requirements | `web-design` | Produce submission format and expectations |
| Design readiness is unclear | `web-design-handoff-review` | Produce `Design Handoff Checklist` |
| Figma or screenshot should become UI | `figma-web-build` | Enter Figma-to-web development chain |
| Approved prototype should become code | `build` | Implement directly |
| `check` found issues | `build` | Fix the checklist |
| Mobile/tablet behavior is the main issue | `responsive-page-adapter` | Repair responsive structure and verify breakpoints |
| Rendered page needs independent acceptance | `check` | Produce `Adjustment Checklist` |
| Rendered page needs second-pass visual QA | `frontend-visual-qa-coach` | Produce repair prompt and skill upgrade suggestions |
| Lessons should improve the workflow | `retro` | Produce `Skill Upgrade Guide` |
| A skill maintainer needs a focused brief | `task-retro-upgrader` | Produce scoped upgrade brief |

## Operating Rules

1. Make the upstream artifact clear before moving downstream.
2. `prototype` owns product intent, `web-design` owns design handoff, `build` owns code, `check` owns acceptance, and `retro` owns skill improvement.
3. Incomplete designs should return to `web-design-handoff-review` instead of asking `build` to guess.
4. Figma or screenshot implementation should prefer `figma-web-build`; ordinary prototype implementation should use `build`.
5. Development stages may self-check, but they do not replace independent `check`.
6. Visual and responsive claims should use screenshots, viewport details, DOM evidence, console/runtime findings, or verification commands whenever possible.
7. Retro upgrades should be evidence-based, not generic advice.
