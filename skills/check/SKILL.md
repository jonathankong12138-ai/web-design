---
name: check
description: "Inspect a built web app against the prototype and return the only testing-stage artifact: a developer adjustment checklist. Use after code is implemented or changed, when visual QA, responsive behavior, browser runtime evidence, intent-vs-implementation gaps, accessibility, security, or performance concerns must be converted into clear development tasks. Do not directly fix code unless the user explicitly switches to build."
---

# Check

Inspect the app and return the one testing artifact development needs next: an adjustment checklist.

## Output Contract

The only deliverable is `Adjustment Checklist`. Do not patch files, create test plans, produce shipping packets, or write broad review essays unless the user explicitly changes the task.

Every checklist item must be actionable for `build`: evidence, expected behavior, actual behavior, developer instruction, and verification.

## Workflow

1. Identify the prototype or baseline that defines intent. If no prototype is available, state that as the first checklist item.
2. Run the app when possible and inspect the real browser result. Use screenshots, DOM, console, network, accessibility, and performance evidence as applicable.
3. Check responsive behavior across representative mobile, tablet, desktop, and wide desktop viewports when the UI is browser-facing.
4. For carousel, tab, slide-based, or scroll-contained modules, verify more than the default visible state: first, middle, and last state when available; controls after state changes; text completeness; image fit or crop behavior; internal scroll affordance; and desktop unaffected state.
5. Compare intended versus implemented behavior: flows, states, permissions, empty/loading/error cases, form validation, destructive actions, and data visibility.
6. Review code only to support findings. Cite files and lines when the issue is implementation-specific.
7. Classify issues by developer impact:
   - `Blocker`: prevents the core flow or violates a critical boundary.
   - `High`: visible mismatch, broken state, accessibility failure, security risk, or test failure.
   - `Medium`: meaningful polish, responsive, performance, or maintainability issue.
   - `Low`: minor polish that should not block the next build pass.
8. Return only the checklist.

## Checklist Template

```md
# Adjustment Checklist

## Summary
[One sentence on whether development can continue or needs blocker fixes first.]

## Items

### WD-001: [Issue title]
Severity: Blocker | High | Medium | Low
Evidence: [screenshot path, viewport, console/network output, reproduction step, or file:line]
State Coverage: [which slides/states/viewports were checked, or static only]
Regression Risk: [which adjacent module/state could be affected]
Expected: [behavior from prototype or testing requirement]
Actual: [observed behavior]
Developer Instruction: [specific code or UX adjustment to make]
Verification: [how build should verify the fix]
```

## Evidence Rules

- Prefer observed evidence over opinion.
- Mark unmeasured performance as potential impact, not measured regression.
- If a finding cannot cite prototype intent or observed behavior, phrase it as a question, not a defect.
- Avoid implementation prescriptions that conflict with the repo's existing architecture unless the current architecture causes the defect.

## Scope

Check product behavior, visual fidelity, responsive layout, accessibility basics, runtime errors, data/security boundaries, performance risks, and test coverage gaps. Convert all findings into developer tasks.
