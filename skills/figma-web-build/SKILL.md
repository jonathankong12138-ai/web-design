---
name: figma-web-build
description: Orchestrate web implementation from Figma frames, screenshots, design images, or design QA evidence. Use when Codex needs to build or update browser UI from design sources, including implementing a Figma frame, matching a screenshot, translating desktop/mobile designs into a responsive page, refining code against visual QA, or coordinating Figma-specific build stages.
---

# Figma Web Build

Coordinate the Figma-to-web path inside the development stage. The deliverable is working code plus concise verification evidence, not a separate design report.

## Output Contract

Implement or update the web app. In the final response, summarize changed code, local URL or screenshot evidence when available, verification commands, and remaining risk. Do not output a `check` adjustment checklist; independent acceptance still belongs to `check`.

## Inputs

Use inputs in this order:

1. Figma URL, selected frame, design screenshot, exported image, or visual QA screenshot.
2. User scope: target page, route, component, breakpoint, or state.
3. Prototype notes, prior `check` findings, or explicit behavior requirements.
4. Existing repository conventions and available verification commands.

## Mode

Choose the lightest mode that protects quality:

- Light: single screenshot, small page, low interaction. Combine mapping into implementation, but still inspect the repo and verify in browser.
- Standard: normal Figma page, desktop/mobile designs, several components, some states. Run the full stage sequence.
- Strict: core commercial page, design-system work, complex responsive behavior, or pixel-sensitive request. Keep screenshots, DOM measurements, and adjacent-breakpoint regression evidence.

For full or ambiguous tasks, read `references/pipeline.md` and `references/stage-gates.md`.

## Workflow

1. Establish the design source. If Figma cannot be accessed, use screenshots or exported images and record that limitation.
2. Analyze the design with `figma-web-design-analysis`.
3. Inspect the repository with `figma-web-repo-analysis`.
4. Map design objects to implementation strategy with `figma-web-implementation-map`, unless the task is small enough to fold the mapping into implementation notes.
5. Implement code with `figma-web-code-implementation`.
6. Complete real web states with `figma-web-interaction-states` when the design includes controls, forms, navigation, overlays, async states, or motion.
7. Refine browser-rendered visual fidelity with `figma-web-visual-alignment`.
8. Verify in a real browser with `figma-web-browser-verification`.
9. Finish lint, typecheck, build, tests, accessibility basics, cleanup, and final delivery with `figma-web-quality-finish`.

## Stage Gates

Proceed only when the current gate is satisfied:

- Design source: a Figma node, screenshot, image, or explicit visual baseline exists.
- Code entry: route, component, or target file is known from repo inspection.
- Mapping: reusable components, new components, assets, tokens, and responsive strategy are clear enough to code.
- Visual: the page can be run or otherwise rendered for evidence.
- Finish: available verification commands were run, or blockers are clearly explained.

## Stop Conditions

Ask one concise question only when no design source exists, no target implementation location can be inferred after repo inspection, or the choice would materially change product behavior. If a tool, permission, or credential is missing, continue with the best available fallback and record the limitation.
