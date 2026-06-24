# Workflow

Web Design has four stages. Run them in order for a complete project, or run a single stage when the project already has the needed input.

## 1. `prototype`

Input:

- Rough idea.
- PRD.
- Feature request.
- Customer feedback.
- Existing product flow.
- Design brief.

Output:

- Interactive prototype.

The prototype should carry the product intent. It should show flows, states, edge cases, constraints, and unresolved questions through interaction and embedded review notes.

## 2. `build`

Input:

- Approved prototype.
- Existing codebase.
- Latest adjustment checklist, if one exists.

Output:

- Working code.

The code should match the prototype's behavior and the current visual/testing requirements. Tests may be added as part of the codebase, but the development artifact is still code.

## 3. `check`

Input:

- Prototype or baseline intent.
- Running app or implemented code.

Output:

- Developer adjustment checklist.

The checklist should be specific enough that another development pass can act without reinterpreting the problem.

## 4. `retro`

Input:

- Task history.
- Prototype.
- Code changes.
- Adjustment checklist.
- Verification results.
- User corrections.

Output:

- Skill upgrade guide.

The guide should contain paste-ready instructions for improving `prototype`, `build`, `check`, or `retro`.

## Operating Loop

```text
prototype
  -> build
  -> check
  -> build
  -> check
  -> retro
```

Repeat `build` and `check` until the artifact is good enough to ship or review.
