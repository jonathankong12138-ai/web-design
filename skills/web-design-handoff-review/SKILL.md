---
name: web-design-handoff-review
description: Review web design handoff materials for build readiness. Use when Codex needs to inspect Figma frames, screenshots, design submissions, prototype context, states, tokens, assets, breakpoints, content, and interactions to decide whether a design can enter development and produce a Design Handoff Checklist.
---

# Web Design Handoff Review

Review whether a design output is a usable development input. Focus on completeness, clarity, and build risk; do not judge visual taste or implement code.

## Output Contract

Return only `Design Handoff Checklist` unless the user explicitly asks for another format.

```md
# Design Handoff Checklist

## Summary
Ready for build: Yes | Conditional | No
Reason: [one concise sentence]

## Blocking Items

### DHR-001: [Issue title]
Severity: Blocker | High | Medium | Low
Area: Scope | Breakpoint | Structure | Component | State | Content | Token | Asset | Interaction | Accessibility | Constraint
Evidence: [Figma frame, screenshot, node, submission text, or observed gap]
Expected for Build: [what development needs]
Actual: [what is missing or unclear]
Designer Instruction: [specific design-side fix]
Developer Assumption Allowed: Yes | No
Verification: [how to confirm the fix]

## Developer-Allowed Assumptions
- [assumptions build may safely use]

## Designer Follow-Up
- [designer-owned next actions]

## Build Entry Notes
- [source, scope, assumptions, and risks if ready or conditional]
```

Use `references/handoff-checklist-template.md` when producing the full artifact.

## Inputs

- Figma URL, frame, node, page, screenshot, or exported image.
- `Design Handoff Submission`, designer notes, or Figma annotations.
- Prototype, PRD, user path, business rules, or acceptance criteria.
- Design system, brand, component, asset, or codebase constraints.

## Workflow

1. Confirm the design source and submitted scope.
2. Compare the design to prototype intent when prototype context exists.
3. Inventory pages, frames, breakpoints, states, overlays, and component variants.
4. Review against developer input requirements. Read `references/developer-input-requirements.md` for full criteria.
5. Classify gaps by area and severity.
6. Decide whether each gap must be fixed by design or can be a developer-allowed assumption.
7. Write designer-facing fixes. Read `references/designer-fix-guide.md` when the designer needs concrete modification guidance.
8. Include build entry notes only when readiness is `Yes` or `Conditional`.

## Readiness Rules

- `Yes`: No blocker or high-risk gaps remain; assumptions are minor and explicit.
- `Conditional`: No blockers remain, but medium gaps or assumptions must travel into build notes.
- `No`: A blocker exists, core behavior is unclear, key assets are unavailable, responsive rules cannot be inferred, or prototype/design conflict is unresolved.

## Severity

- `Blocker`: Development cannot start safely or may build the wrong product.
- `High`: Likely visible rework, broken interaction, responsive failure, or asset/state gap.
- `Medium`: Build can continue only with an explicit assumption or later follow-up.
- `Low`: Minor handoff polish that does not affect the main build path.

## Stop Conditions

Stop and ask only when no design source or review scope exists. If Figma is inaccessible but screenshots or submission text exist, review those and mark Figma-specific information as unavailable.

## Validation

Every checklist item must include evidence, expected build input, actual gap, designer instruction, whether developer assumption is allowed, and verification. Avoid generic advice such as "make it clearer"; say exactly what frame, state, asset, or note to add.
