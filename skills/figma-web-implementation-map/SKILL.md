---
name: figma-web-implementation-map
description: Map Figma or screenshot design objects to a concrete web implementation strategy. Use when Codex needs to decide routes, components, tokens, assets, responsive behavior, implementation slices, assumptions, and reuse versus new code before building.
---

# Figma Web Implementation Map

Translate design analysis and repo analysis into the smallest coherent implementation strategy. Keep the map brief enough to guide coding, not become a separate project plan.

## Output Contract

Use this shape for nontrivial work:

```txt
Route Mapping:
Component Mapping:
Token Mapping:
Asset Mapping:
Responsive Strategy:
Implementation Slices:
Assumptions:
```

Use `references/mapping-template.md` when the design has multiple frames, breakpoints, or reusable modules.

## Workflow

1. Map each page or section to an existing route, layout, template, or component.
2. Decide which visible modules reuse existing components and which need new local components.
3. Map raw design tokens to existing theme values, CSS variables, utility classes, or component props before adding new values.
4. Decide the asset strategy: reuse, export, generate, compress, replace with CSS, or mark unavailable.
5. Define responsive behavior across supplied frames and inferred intermediate breakpoints.
6. Slice implementation by user-visible vertical path, not by file type.
7. Record assumptions that affect layout, content, interaction, data, or missing design states.

## Stage Gate

Proceed when the first implementation slice can be coded without guessing the target route, major components, token approach, or asset handling.

## Stop Conditions

Ask only when two or more mapping choices would change the product surface or navigation. For ordinary UI decomposition, choose the smallest pattern already present in the repo.

## Validation

Confirm the map reuses project conventions first, introduces new components only where reuse is awkward or harmful, and names the responsive rules that visual alignment must later verify.
