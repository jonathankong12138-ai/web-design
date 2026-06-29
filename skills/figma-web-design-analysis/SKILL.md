---
name: figma-web-design-analysis
description: Analyze Figma frames, screenshots, or design images for web implementation. Use when Codex needs to convert a design source into implementable page structure, breakpoints, states, content, tokens, assets, interactions, and unknowns before coding.
---

# Figma Web Design Analysis

Turn the design source into a compact implementation brief. Capture facts that later coding stages need; avoid broad aesthetic commentary.

## Output Contract

Return working analysis in this shape when it will be consumed by later stages:

```txt
Design Source:
Frames / Breakpoints:
States:
Page Structure:
Content:
Design Tokens:
Assets:
Interactions:
Unknowns:
```

Use `references/design-analysis-template.md` for full-page work, multi-breakpoint designs, or when the analysis must persist across turns.

## Inputs

- Figma URL, selected node, frame name, screenshot, exported image, or user-provided visual baseline.
- Target page, section, component, or state.
- Prototype behavior notes or prior QA findings when available.

## Workflow

1. Identify the strongest available design source and its limits.
2. Inventory frames, breakpoints, variants, states, overlays, and related screenshots.
3. Decompose the page into semantic regions and repeated components.
4. Extract visible content: headings, body copy, buttons, labels, table fields, sample data, and empty text.
5. Capture raw design tokens that matter for implementation: color, type, spacing, radius, shadow, border, opacity, and layering.
6. Identify assets: images, logos, icons, video, fonts, background media, and export or fallback needs.
7. Identify interactions and states implied by controls even if the static design omits them.
8. Record unknowns. Do not invent hidden Figma variables, interactions, or assets when only screenshots are available.

## Stage Gate

Do not proceed to implementation until a design source and target scope are clear enough to identify the main structure and visual constraints.

## Stop Conditions

Stop only when no design source or target page can be inferred. If Figma is inaccessible but a screenshot exists, proceed from the screenshot and mark Figma-specific data as unknown.

## Validation

Check that every major visible region appears in `Page Structure`, every visible control has content and state notes, and every nontrivial image/icon/font has an asset decision for the mapping stage.
