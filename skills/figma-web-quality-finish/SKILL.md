---
name: figma-web-quality-finish
description: Finish Figma-based web implementation before handoff. Use when Codex needs to run lint, typecheck, build, tests, accessibility basics, performance checks, cleanup, verification summary, and remaining-risk reporting after browser verification.
---

# Figma Web Quality Finish

Close the development pass cleanly. The goal is a handoff-ready implementation that can still go through independent `check`.

## Output Contract

Return final delivery notes only after running available verification or documenting blockers:

```txt
Changed:
Verified:
Browser Evidence:
Remaining Risks:
```

Use `references/quality-finish-checklist.md` for larger changes.

## Workflow

1. Run the relevant available commands: lint, typecheck, build, unit tests, component tests, integration tests, theme checks, or framework-specific validation.
2. Do a basic accessibility pass for semantics, labels, focus order, keyboard access, contrast risk, reduced motion, and landmark sanity.
3. Check performance risks introduced by the design: oversized media, uncompressed assets, layout shift, expensive animations, long lists, or blocking scripts.
4. Clean up temporary code, debug logs, dead styles, duplicate assets, and unused imports.
5. Review the diff for scope creep and accidental changes.
6. Summarize verification evidence and remaining risks plainly.

## Stage Gate

Finish only when available verification commands have run or each skipped command has a concrete reason, and browser evidence exists for UI-facing work unless the app cannot run.

## Stop Conditions

Do not claim completion if a blocking runtime error, broken build, missing design source, or unavailable credential prevents meaningful verification. Report the exact blocker.

## Validation

This stage does not replace `check`. It prepares the implementation for `check` by removing obvious development defects and making evidence easy to inspect.
