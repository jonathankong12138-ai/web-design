# Developer Input Requirements

Review these areas. Flag only gaps that affect development clarity, implementation risk, or handoff reliability.

## Scope

- Pages, sections, and states for this build are named.
- Out-of-scope work is explicit.
- Current version is distinguishable from archive or exploration frames.

## Breakpoints

- Desktop and mobile are supplied, or the missing side has clear rules.
- Tablet behavior is supplied when it differs materially.
- Content order, column count, navigation, media crop, and sticky behavior are clear.

## Structure

- Page regions and repeated modules are identifiable.
- Navigation, forms, lists, tables, cards, overlays, and footer boundaries are clear.
- Responsive reflow does not require guesswork.

## Components And States

- Components have relevant variants.
- Controls cover default, hover, focus, active, disabled, selected, loading, empty, error, and success when users can encounter them.
- Existing design-system defaults are acceptable only when explicitly named.

## Content And Data

- Final copy or placeholder status is clear.
- Lists and tables include representative data.
- Field meaning, max length, empty values, and localization risk are noted when layout depends on content.

## Tokens

- Colors, typography, spacing, radius, border, shadow, and elevation are readable.
- Values map to existing tokens, or new/local token intent is explained.
- One-off values are identified.

## Assets

- Images, icons, logos, fonts, and video are exportable or have approved fallbacks.
- Crop, aspect ratio, focal point, and mobile treatment are specified for important media.
- Font source, license, and fallback are known when custom fonts are used.

## Interactions

- Click, navigation, submit, validate, open, close, expand, collapse, scroll, tab, carousel, and motion behavior are clear.
- Error recovery and async behavior are specified for critical flows.
- Motion includes trigger, direction, duration, end state, and reduced-motion fallback when meaningful.

## Accessibility And Constraints

- Icon-only controls have names.
- Focus, keyboard access, labels, and semantic intent can be inferred.
- Known codebase, CMS, design-system, or platform constraints are acknowledged.
