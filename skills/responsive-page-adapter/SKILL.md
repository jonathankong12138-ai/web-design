---
name: responsive-page-adapter
description: Adapt, repair, and validate responsive web pages by treating the desktop or existing canonical design as the single content and interaction baseline, then reshaping layouts across mobile, tablet, and desktop breakpoints. Use whenever a web task involves responsive adaptation, desktop-to-mobile conversion, mobile layout bugs, tablet adaptation, breakpoint problems, Figma or screenshot adaptation, carousel/tab/internal-scroll responsive modules, mobile-only DOM, duplicated responsive markup, content-system double writes, non-unified interaction state, over-rewritten mobile structure, horizontal scrolling, text overlap, CSS priority or media query conflicts, unclear breakpoint semantics, visual vs structural confusion, touch or mobile interaction bugs, viewport-specific regressions, or multi-breakpoint visual verification.
---

# Responsive Page Adapter

## Core Principle

Follow this order every time: **先同源，再重排，最后美化**.

Use the desktop implementation or existing canonical design as the only source of truth for content, behavior, data flow, validation, accessibility meaning, and interaction state. Treat the mobile view as a responsive projection of that canonical experience, not as a second page.

Do not begin by making a separate mobile UI look nice. First prove that the mobile view uses the same content and interaction contract, then rearrange the same experience for smaller space, then polish spacing, typography, and motion.

## Supported Task Modes

Use this skill for these modes:

- **Desktop to mobile adaptation**: Convert an existing desktop page into mobile and tablet layouts without changing the canonical product behavior.
- **Mobile bug repair**: Fix mobile-only overflow, overlap, clipped content, broken sticky areas, unusable controls, bad keyboard behavior, or hidden actions.
- **Tablet adaptation**: Resolve awkward mid-width states between phone and desktop, especially navigation, sidebars, tables, cards, and split panes.
- **Breakpoint debugging**: Diagnose media query collisions, unintended rule order, missing intermediate states, and component behavior at custom widths.
- **Figma or screenshot adaptation**: Use a design, screenshot, or visual target as evidence, while mapping content and behavior back to the canonical page.
- **Stateful module adaptation**: Repair carousel, tabbed, slide-based, or internal-scroll sections without confusing states for separate modules.
- **Mobile-only DOM governance**: Audit and fix duplicated mobile/desktop markup so state, events, forms, accessibility, and analytics do not drift.
- **Responsive verification**: Run or create multi-viewport checks for layout, interaction, and state parity.

## Diagnostic Gate

Diagnose before modifying code. Do not start with CSS tweaks or mobile rewrites.

First classify the issue by primary failure type:

- **Content**: Content-system double writes, mobile-only copy, missing desktop content on mobile, duplicated fields/actions, different permission visibility, or data shown from different sources.
- **Structure**: DOM hierarchy, layout wrappers, grid/flex rules, ordering, containment, sticky regions, scroll containers, over-rewritten mobile structure, or a mobile tree that no longer maps to the canonical page.
- **Interaction**: Non-unified state, breakpoint-specific handlers, form behavior, focus, keyboard flow, drawers, menus, modals, hover-only controls, disabled/loading/error states, or route/state transitions that differ by viewport.
- **Media**: Images, videos, charts, canvases, maps, tables, aspect ratios, cropping, object-fit behavior, lazy loading, or responsive asset constraints.
- **Visual**: Spacing, typography, alignment, rhythm, density, icon sizing, shadows, and polish after content, structure, interaction, media, and CSS priority are known to be sound.
- **CSS priority**: Specificity conflicts, cascade order, utility collisions, media query overlap, global style leakage, `!important` escalation, token misuse, or unclear breakpoint ownership.

Name the category in your own working notes or final summary when it matters. If a visual symptom is caused by broken structure or CSS priority, classify the root cause as structure or CSS priority rather than visual.

Explicitly check these known failure modes:

- **内容系统双写**: Mobile and desktop use separate content configs, action lists, table columns, card fields, copy, or data mapping.
- **交互状态不同源**: Mobile and desktop controls use different stores, local state, handlers, validation, URL params, or mutation paths.
- **mobile 结构重写过度**: The mobile view recreates the page tree so deeply that it no longer shares the canonical structure or component contract.
- **CSS 优先级失控**: Fixes depend on increasing specificity, `!important`, selector nesting, or accidental source order instead of clear ownership.
- **断点语义不清**: Breakpoints are named or used by device labels only, with no clear layout responsibility or transition meaning.
- **视觉问题和结构问题混在一起**: Spacing, alignment, or typography tweaks are attempted before confirming whether the root cause is layout structure, content density, media constraints, or CSS priority.
- **状态模块误分类**: Figma carousel frames are treated as independent sections, or static sections inherit carousel controls because the local DOM already contains them.

Before changing code, establish:

- The evidence: screenshot, viewport size, DOM/CSS inspection, failing interaction, or reproducible browser state.
- The canonical baseline: desktop implementation, existing approved design, Figma frame, screenshot, or shared component contract.
- The smallest responsible layer: content mapping, state ownership, component structure, CSS cascade, media constraints, or visual polish.
- The expected regression risk: which breakpoint or interaction could break after the change.

Only skip code changes when diagnosis shows the issue is caused by wrong expectations, stale screenshots, test setup, browser zoom, missing data, or a design ambiguity that requires product input.

## Baseline Mapping

Before editing, identify the canonical baseline:

- Locate the route, page component, shared layout wrappers, design system primitives, and styling mechanism.
- Determine whether the source of truth is the existing desktop implementation, a Figma frame, a screenshot, or an already-approved responsive design.
- Detect content-system double writes: separate mobile data mapping, duplicated config, breakpoint-specific copy, duplicated action lists, or separate column/card definitions.
- Map canonical content: headings, navigation, primary actions, secondary actions, forms, validation messages, tables, cards, media, empty states, loading states, error states, and permission states.
- Map canonical interactions: clicks, taps, keyboard flows, hover/focus behavior, filters, sorting, pagination, submission, optimistic updates, drawers, menus, modals, and route changes.
- Map canonical state: selected item, expanded item, active tab, field values, errors, pending requests, scroll position, persisted filters, and URL state.
- Identify what may change by breakpoint: spatial arrangement, density, disclosure, ordering for usability, control placement, and progressive reveal.
- Identify what must not change by breakpoint: data source, meaning, validation, enabled or disabled rules, permissions, analytics semantics, and core task flow.

For multi-section pages, produce a module mapping table before changing layout. Each module row must include: title, body/content summary, quantity/counts, canonical order, image/background requirements, interactions, state source, mobile-allowed changes, and prohibited changes. Add module type as static section, carousel section, single-state carousel design, internal scroll section, or decorative/media-only section. Use the table to prevent silent content loss, reordered business logic, mobile-only copy, and interaction drift.

For Figma or screenshot work, do not blindly copy pixels. Use the visual artifact to infer layout intent, hierarchy, density, and spacing, then reconcile it with the real product state and component system.

## Stateful Screenshot Adaptation

For multi-section Figma or screenshot corrections, map function before tuning size. For each correction, identify the module selector, active breakpoint, active slide or state, module type, target invariant, and adjacent states that must still pass after the change.

Treat a Figma carousel group as states of one module unless the product intent says they are separate sections. Treat a static design as static even when the current DOM has leftover carousel arrows, pagination, timers, or clones; fix the structure before polishing pixels.

Preserve these invariants across states:

- Use media semantics to choose fit mode: product images and UI screenshots should remain complete with `contain`; immersive backgrounds may use `cover`.
- Anchor controls to the section invariant, not to slide-specific text height, image height, or active-state content.
- Keep requested spacing measurable: record the owning `gap`, `padding`, alignment edge, or section inset before and after the patch.
- Give internal scroll sections a visible affordance when content continues below the fold, such as clipped continuation, a fade, or an established helper label.
- Do not solve stateful layout issues by compressing height first. Fix function structure, state ownership, media constraints, and control anchoring before final spacing polish.

## Non-Negotiable Rules

- Keep one canonical content model. Do not invent mobile-only copy, actions, fields, or states unless the user explicitly asks.
- Preserve one interaction contract. A task that works on desktop must work on mobile and tablet with equivalent state changes and validation.
- Avoid creating a second page for mobile. Prefer one semantic DOM and responsive CSS or component composition.
- Diagnose the failure category before modifying code. Do not mix visual polish with structural repair.
- If duplicate DOM is unavoidable, make it a thin presentation variant driven by the same props, state, handlers, schema, and analytics source.
- Never hide broken layout with broad `overflow-x: hidden` on `html`, `body`, or app roots unless the overflow is intentionally decorative and verified harmless.
- Do not use `display: none` as a fake fix for overlap, crowding, or broken structure. It is allowed only for decorative layers, fallbacks, or inactive inaccessible duplicate variants when the canonical content and task flow remain available elsewhere.
- Do not reduce content by deleting essential actions, columns, labels, or errors. Use stacking, cards, accordions, horizontal affordances, or detail views when density requires it.
- Do not rely on hover-only controls for touch breakpoints.
- Do not change desktop behavior while fixing mobile unless the desktop baseline is itself the bug.
- Do not add new breakpoint names, tokens, or design primitives before checking existing project conventions.
- For implementation tasks, do not finish without visual or browser-level verification at the required acceptance breakpoints. For planning, review, or Figma-only judgment tasks, state that browser verification was not run and base conclusions on the available artifacts.

## Unified State Rule

Treat responsive variants as different layouts over the same state machine.

- Treat interaction-state divergence as a blocker. Fix source-of-truth ownership before changing layout or styling.
- Use the same component state, store, URL params, form schema, validation resolver, server data, mutation path, and event handlers across breakpoints.
- Keep controlled inputs coherent when crossing breakpoints. Values, touched state, errors, focus intent, and pending submission must not reset unexpectedly.
- Ensure duplicated controls do not double-submit forms, double-fire analytics, or create conflicting focus targets.
- Prevent duplicate `id` attributes, duplicate labels, duplicate live regions, and duplicate landmarks when mobile and desktop markup coexist.
- Hide inactive duplicate variants from both pointer interaction and accessibility APIs using the established project pattern, such as conditional rendering, `hidden`, `aria-hidden`, or `inert`.
- Test stateful responsive surfaces: filters, tabs, carousel slides, selected rows, expanded cards, drawers, popovers, modals, pagination, sorting, toasts, optimistic updates, and error recovery.

If state diverges, fix state ownership before fixing spacing.

## CSS Governance

Audit CSS before adding CSS:

- Search local component styles, global styles, utility classes, CSS modules, CSS-in-JS, Tailwind config, theme tokens, layout wrappers, and imported design system rules.
- Prefer existing tokens for spacing, type, color, radii, elevation, and breakpoints.
- Keep specificity low. Fix source order, selector scope, or component structure before adding `!important`.
- Treat CSS priority loss as a root-cause class, not as an invitation to add stronger selectors. Identify which rule wins, why it wins, and whether the winning rule belongs to the correct breakpoint or component boundary.
- Treat `display: none` as content removal unless it is explicitly limited to decoration, fallback content, or an inactive duplicate variant hidden from interaction and accessibility.
- Use mobile-first or desktop-first rules consistently with the codebase. Do not mix directions inside one component without a clear reason.
- Prefer intrinsic layout tools: `min-width: 0`, `max-width: 100%`, `flex-wrap`, `grid-template-columns`, `minmax()`, `fit-content`, `clamp()`, aspect ratios, and container queries when supported.
- Use `overflow` intentionally. Scroll containers must be discoverable, reachable by touch, and not trap sticky elements or keyboard focus.
- Ensure media elements, charts, maps, canvases, and tables have explicit responsive constraints.
- Keep text inside its parent. Allow wrapping, avoid viewport-scaled fonts, avoid negative letter spacing, and test long words, long labels, badges, and localized strings.
- Scope responsive changes to the smallest responsible boundary unless the issue is truly systemic.

## Breakpoint Semantics

Breakpoints describe layout meaning, not device brands.

- Start from the project's configured breakpoints and naming conventions.
- Define what each active breakpoint means for the page before editing. Avoid unclear breakpoint semantics such as "mobile styles at tablet width" or unrelated components using the same cutoff for different layout responsibilities without intent.
- Required acceptance widths are: `375`, `390`, `414`, `430`, `768`, `1024`, `1440`, and `1920`. Use project-defined heights when available; otherwise use realistic pairings such as `375x812`, `390x844`, `414x896`, `430x932`, `768x1024`, `1024x768`, `1440x900`, and `1920x1080`.
- Treat breakpoints as transitions in layout responsibility: stacked phone layout, expanded phone layout, tablet layout, compact desktop, and full desktop.
- Prefer content-driven breakpoints when a component fails before or after the global viewport breakpoint.
- Use container queries when the layout depends on parent width rather than viewport width and the project supports them.
- Verify boundaries just below and just above key breakpoints, especially `767/768`, `1023/1024`, and project-specific cutoffs.
- Account for height constraints, browser chrome, safe-area insets, virtual keyboards, and orientation changes.

## Fix Order

Apply fixes in this order:

1. **Diagnosis**: Classify the root cause as content, structure, interaction, media, visual, or CSS priority before changing code.
2. **Canonical parity**: Confirm mobile, tablet, and desktop use the same content, data, permissions, and interaction meaning.
3. **State unification**: Remove or control duplicate state paths before changing layout. Resolve duplicated DOM drift here.
4. **Structural layout**: Fix grid, flex, wrapping, ordering, containment, sticky regions, scroll areas, and responsive navigation.
5. **Media constraints**: Fix images, charts, canvases, videos, maps, and tables that need explicit responsive sizing, aspect ratios, or overflow behavior.
6. **Content density**: Adapt tables, cards, sidebars, filters, long forms, media, and secondary actions for the available width.
7. **Interaction ergonomics**: Fix touch targets, focus, keyboard use, drawers, menus, modals, hover alternatives, and form submission.
8. **CSS priority cleanup**: Remove unnecessary specificity, resolve cascade collisions, and keep breakpoint ownership legible.
9. **Visual polish**: Tune spacing, typography, alignment, rhythm, icon sizing, shadows, and transitions only after parity and structure are stable.
10. **Regression check**: Re-check desktop and canonical views after mobile fixes.

If a later step reveals a parity or state problem, return to step 1 or 2.

## Validation Matrix

Validate both layout and behavior. For implementation tasks, use browser automation, real browser inspection, or screenshots at the required acceptance widths. For planning, review, or Figma-only judgment tasks, explain which artifacts were reviewed and explicitly state that browser verification was not run.

| Area | What to check |
| --- | --- |
| Mobile 375 | `375x812`; narrow-phone accident replay: no horizontal scroll, overlap, clipped text, hidden canonical content, or unreachable primary actions. |
| Mobile 390 | `390x844`; common narrow mobile: forms, drawers, sticky regions, and long content remain usable. |
| Mobile 414 | `414x896`; large legacy mobile: check spacing thresholds, card wrapping, media sizing, and text density. |
| Mobile 430 | `430x932`; large mobile: tap targets, modals, menus, filters, and mobile action placement still work. |
| Tablet 768 | `768x1024`; tablet portrait: navigation, sidebars, cards, tables, and filters do not sit in an awkward half-state. |
| Tablet or compact desktop 1024 | `1024x768`; tablet landscape or compact desktop layout is intentional and stable. |
| Desktop 1440 | `1440x900`; canonical desktop behavior and density remain intact. |
| Wide desktop 1920 | `1920x1080`; wide desktop does not over-stretch content, lose hierarchy, or reveal max-width/background issues. |
| Breakpoint edges | Just below and above project cutoffs; no flicker, duplicate controls, or media query collisions. |
| Stateful modules | First, middle, and last carousel or tab state; fixed controls after state changes; text completeness; media fit/crop behavior; internal scroll affordance. |
| State parity | Inputs, errors, selected items, expanded panels, filters, URL params, loading, and pending states survive breakpoint changes. |
| Interaction parity | Click, tap, keyboard, focus-visible, hover alternative, active, disabled, loading, error, and selected states work. |
| Content stress | Long labels, long words, many items, empty data, loading data, error data, missing media, and localized strings fit. |
| Accessibility | No duplicate labels, ids, landmarks, live regions, hidden interactive controls, or focus traps. |

For implementation tasks, capture or inspect final output across `375`, `390`, `414`, `430`, `768`, `1024`, `1440`, and `1920` widths. If a repo already has Playwright, Cypress, Storybook, visual regression, or component tests, use the most relevant existing path instead of inventing a separate testing stack.

## Output Style

When reporting results:

- Start with what responsive surface changed and which canonical baseline was preserved.
- Name the breakpoint behavior added or repaired.
- Mention state unification or duplicated DOM handling when relevant.
- List the viewports and interactions verified.
- For implementation tasks, list the required acceptance widths checked. For planning, review, or Figma-only tasks, state that browser verification was not run and name the artifacts reviewed.
- Call out any viewport, state, interaction, or artifact that could not be checked.
- Keep the summary practical and implementation-focused. Do not require the user to use a special prompt in the future.
