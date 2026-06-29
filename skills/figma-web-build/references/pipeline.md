# Figma Web Build Pipeline

Use the lightest path that fits the design risk.

## Light Mode

Use for a small page, single screenshot, few interactions, or a simple visual fix.

Stages:

```txt
design-analysis -> repo-analysis -> code-implementation -> browser-verification -> quality-finish
```

Combine implementation mapping into working notes. Do not skip repo inspection or browser verification.

## Standard Mode

Use for a normal Figma page, desktop/mobile designs, multiple sections, or a few interactions.

Stages:

```txt
design-analysis
-> repo-analysis
-> implementation-map
-> code-implementation
-> interaction-states
-> visual-alignment
-> browser-verification
-> quality-finish
```

## Strict Mode

Use for core commercial pages, high visual fidelity, complex responsive behavior, design-system work, or user requests for pixel-level alignment.

Extra evidence:

- Baseline screenshots or frame references.
- Mobile, tablet, desktop, and wide desktop screenshots.
- DOM measurements for critical spacing, typography, media fit, and overflow.
- Console/runtime notes.
- Adjacent-breakpoint regression checks after visual edits.
