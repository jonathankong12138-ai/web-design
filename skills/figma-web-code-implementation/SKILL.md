---
name: figma-web-code-implementation
description: Implement mapped Figma or screenshot-based web designs in an existing codebase. Use when Codex needs to write or update routes, layouts, components, styles, tokens, assets, content, and data wiring after design analysis, repo analysis, or implementation mapping.
---

# Figma Web Code Implementation

Build the page or component in code. Preserve repository conventions and implement a coherent vertical slice before widening scope.

## Output Contract

The deliverable is code and required assets. Working notes may include implemented routes, components, and pending states, but do not create a separate design or implementation document unless the user asks.

## Inputs

- Implementation map, design analysis, or a directly supplied design source for small tasks.
- Existing repository patterns from repo analysis.
- Target route, page, component, section, or template.

## Workflow

1. Open the target files and nearby examples before editing.
2. Implement tokens through the project's existing theme, variables, utilities, or style conventions.
3. Add or wire assets using the local asset pipeline and naming style.
4. Create or update the route, layout, section, or component in the smallest useful scope.
5. Build layout primitives first: containers, grid, sections, stack rhythm, media boxes, and semantic regions.
6. Implement repeated modules as components only when reuse or clarity justifies it.
7. Add visible content and representative data exactly enough to match the design and product intent.
8. Wire existing data, mocks, store state, or API contracts without inventing backend behavior.
9. Run the nearest static check or render path as soon as the first vertical slice exists.

## Stage Gate

Proceed to interaction and visual alignment when the page can render locally, or when static checks pass and the remaining runtime blocker is clearly unrelated to the design implementation.

## Stop Conditions

Stop and ask only when missing product behavior would force a durable data or navigation decision. Continue with reasonable UI assumptions for copy, spacing, and common component decomposition.

## Validation

Before handing off, check that every core design region has code, no major module is hidden behind dead markup, assets resolve, and the implementation can be verified in a browser or by the closest available project command.
