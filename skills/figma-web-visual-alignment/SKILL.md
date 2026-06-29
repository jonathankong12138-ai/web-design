---
name: figma-web-visual-alignment
description: Refine browser-rendered UI to match Figma frames, screenshots, or visual QA evidence. Use when Codex needs to fix spacing, typography, alignment, media fit, section height, responsive layout, overflow, control density, or visual drift after implementation.
---

# Figma Web Visual Alignment

Tune what the browser actually renders. Work from screenshots, DOM measurements, computed styles, and visible state, not from CSS selectors alone.

## Output Contract

Deliver visual correction code and concise evidence: viewport, screenshot path or measurement, issues fixed, and remaining intentional differences. Use `references/visual-alignment-ledger.md` for repeated fixes on the same page.

## Inputs

- Running page URL or renderable local page.
- Figma frame, screenshot, image baseline, or visual QA evidence.
- Design tokens, responsive strategy, and implemented code.

## Workflow

1. Identify the visible mismatch category: spacing, alignment, size, typography, media fit, section height, control density, state sync, overflow, or responsive behavior.
2. Inspect the actual rendered element, active breakpoint, state class, selected slide, and responsible CSS layer.
3. Measure before changing: bounding boxes, computed style, viewport, visible overflow, and media query ownership.
4. Patch the narrowest responsible rule, component prop, token, or asset fit behavior.
5. Verify the same measurement or screenshot after the change.
6. Check adjacent regression surfaces: mobile after desktop, desktop after mobile, neighboring breakpoint, first/middle/last carousel state, or overlay open/closed state.
7. Consolidate after three or more related visual fixes; repeated drift usually means the module structure, state source, or media container is wrong.

## Stage Gate

Proceed to browser verification when representative viewports are visually coherent, no obvious overlap or horizontal overflow remains, and adjusted breakpoints have adjacent checks.

## Stop Conditions

Stop only when the design baseline is missing or contradictory in a way that makes visual success undefined. Otherwise state the baseline used and continue.

## Validation

Avoid broad `!important` patches, hidden duplicate responsive markup, viewport-scaled typography, text overflow inside controls, and single-breakpoint fixes that break adjacent layouts.
