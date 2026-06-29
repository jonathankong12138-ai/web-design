---
name: figma-web-repo-analysis
description: Inspect an existing web repository before implementing a Figma or screenshot-based design. Use when Codex needs to find the framework, package manager, routes, reusable components, styling system, assets, commands, and implementation constraints for Figma-to-web work.
---

# Figma Web Repo Analysis

Map the repository before editing so the design implementation lands in the existing architecture instead of beside it.

## Output Contract

Return the minimum facts needed by the mapping and implementation stages:

```txt
Stack:
Package Manager:
Route / Page Entry:
Reusable Components:
Styling System:
Asset Rules:
Verification Commands:
Implementation Constraints:
```

Read `references/repo-scan-patterns.md` when the entry point or styling system is not obvious.

## Workflow

1. Use `rg --files` first to identify framework files, package manifests, routes, components, styles, and assets.
2. Detect package manager from lockfiles and scripts.
3. Locate the page entry, route, layout, template, section, or component closest to the requested design.
4. Find existing components and UI patterns before creating new ones.
5. Identify styling conventions: Tailwind, CSS modules, global CSS, SCSS, theme tokens, CSS variables, Liquid settings, or component-scoped styles.
6. Identify asset conventions: static directories, Shopify assets, imported media, icon system, font loading, and naming rules.
7. Record verification commands from `package.json`, framework config, theme commands, or project docs.

## Stage Gate

Proceed when the target implementation location, styling method, asset path, and at least one verification route or command are known.

## Stop Conditions

Ask only when multiple plausible target routes or components would produce materially different user-facing results. Otherwise choose the smallest existing pattern that matches the design scope.

## Validation

Before editing, confirm the planned file locations already fit the repo's conventions. Avoid introducing a new framework, UI library, token system, or asset pipeline for a single design unless the user explicitly asks.
