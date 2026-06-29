---
name: figma-web-interaction-states
description: Implement and verify real web interactions and states implied by Figma or screenshot designs. Use when Codex needs hover, focus, active, disabled, loading, empty, error, form, modal, drawer, popover, tabs, carousel, navigation, or motion behavior for a Figma-based page.
---

# Figma Web Interaction States

Complete the states that make a static design usable in a browser. Prefer native semantics and existing component behavior before adding custom state machinery.

## Output Contract

Deliver interaction and state code plus a short list of manually verified paths. Use `references/interaction-state-checklist.md` for control-heavy pages.

## Inputs

- Implemented page or component.
- Design analysis interaction notes, prototype behavior, or prior QA findings.
- Existing component behavior and accessibility patterns.

## Workflow

1. List the user-operable controls in the implemented page.
2. Add visible hover, focus, active, disabled, and selected states where controls need them.
3. Cover async states: loading, empty, error, permission denied, and success where the flow implies them.
4. Implement overlays and layered UI with keyboard escape, focus management, dismiss behavior, and scroll containment when relevant.
5. Implement tabs, carousel, steppers, segmented controls, or internal scroll with stable state ownership and no duplicated unsynchronized DOM.
6. Implement form input, validation, submission, success, and failure behavior using project conventions.
7. Add motion only when it clarifies the interaction, and include reduced-motion behavior.
8. Verify the main paths manually in browser when possible.

## Stage Gate

Proceed to visual alignment when core interaction paths are operable with pointer and keyboard basics, and hidden states have reasonable visible representations.

## Stop Conditions

Ask only when the business rule behind a state is unknown and a reasonable placeholder would mislead users. For common web states, infer the standard behavior and record the assumption.

## Validation

Check focus visibility, button/link semantics, escape and outside-click behavior for overlays, state persistence after resize where applicable, and console stability after interaction.
