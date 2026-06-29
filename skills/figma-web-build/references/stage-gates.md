# Figma Web Build Stage Gates

## Design Source Gate

Required:

- Figma node, screenshot, exported image, or visual QA baseline.
- Target page, section, component, or state.

Fallback:

- If Figma is inaccessible, use screenshots and mark Dev Mode tokens, hidden states, and export-only assets as unknown.

## Code Entry Gate

Required:

- Route, template, page, section, or component target.
- Styling system and asset path.
- At least one way to run or verify the result.

Fallback:

- Scan the repo first. Ask only if multiple targets would change user-facing behavior.

## Mapping Gate

Required:

- Component reuse/new component decision.
- Token and asset approach.
- Responsive strategy for supplied breakpoints and inferred transitions.
- First vertical slice.

Fallback:

- For small tasks, make a local mapping note and proceed.

## Visual Gate

Required:

- Page can render in a browser or has a clear runtime blocker.
- Main design regions are visible.

Fallback:

- Fix runtime blockers before polishing visual alignment.

## Finish Gate

Required:

- Available lint, typecheck, build, test, or equivalent checks have run.
- Browser evidence exists for UI work.
- Remaining risks are explicit.

Fallback:

- If verification cannot run, report the exact command, error, and missing requirement.
