---
name: web-design
description: Coordinate the design stage between prototype and build or figma-web-build in the Web Design workflow. Use when Codex needs to prepare designer submission guidance, organize a Design Handoff Submission, decide whether to run web-design-handoff-review, gate ready/conditional/no build readiness, or produce build entry notes with developer-allowed assumptions for Figma, screenshot, or prototype-based web work.
---

# Web Design

Manage the design stage between product intent and code. The goal is a development-ready design handoff, not a visual taste review, code implementation, or independent acceptance check.

## Position In The Flow

Use this skill after `prototype` or whenever design material appears before development:

```text
prototype
  -> web-design
  -> web-design-handoff-review when readiness is unclear
  -> build or figma-web-build
```

Prefer `figma-web-build` after this stage when the implementation source is Figma, a screenshot, a design image, or visual QA evidence. Prefer ordinary `build` when the implementation source is mainly a prototype, product requirement, or existing code task.

## Output Contract

Produce one of these development-stage inputs:

- Designer-facing handoff guidance.
- A structured `Design Handoff Submission` outline.
- A decision to run `web-design-handoff-review`.
- A build entry summary when the design is ready or conditionally ready.

Do not write code, output a `check` adjustment checklist, or judge the design's aesthetic quality.

## Inputs

Use the strongest available inputs:

1. Prototype, PRD, user path, business rules, or acceptance criteria.
2. Figma file, frame, page, screenshot, exported image, or design notes.
3. Design system, brand rules, or component library constraints.
4. Target codebase, route, platform, or known implementation constraints.

## Workflow

1. Identify whether the task is design preparation, handoff review, design revision, or build entry.
2. Establish the design scope: pages, sections, frames, states, and out-of-scope items.
3. Guide the designer to submit a structured handoff when the input is only a link or screenshot. Read `references/designer-submission-guide.md` when needed.
4. Check the design-stage gate. Read `references/design-stage-gates.md` for ambiguous or conditional cases.
5. Use `web-design-handoff-review` when the user asks whether the design is ready for development, when build readiness is unclear, or before handing a Figma/screenshot design to `figma-web-build`.
6. If the design is ready, prepare concise build entry notes: source, scope, frames, assumptions, risks, and any expected `figma-web-build` focus areas.
7. If the design is not ready, keep the work in design and give designer-facing fixes rather than implementation instructions.

## Stage Gate

Enter build only when:

- Design source and build scope are clear.
- Main responsive behavior is supplied or explicitly inferable.
- Core structure, components, content, assets, and interactions are available.
- Missing items are marked as designer follow-up or developer-allowed assumptions.
- Prototype conflicts, if any, are explained or resolved.

## Stop Conditions

Ask one concise question only when there is no design source, no target scope, or a missing decision would change product behavior. Otherwise continue with a clearly labeled assumption.

## Validation

Before handing to build, confirm that the next agent can identify what to implement, which frames to use, what assumptions are allowed, and what risks remain.
