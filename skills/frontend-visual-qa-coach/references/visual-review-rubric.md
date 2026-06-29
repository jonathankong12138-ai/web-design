# Visual Review Rubric

Use this reference when auditing a rendered page for design quality, responsive behavior, and canonical-baseline fidelity.

## Canonical Baseline Gate

When the user says "same as desktop", "desktop is the only reference", "match this screenshot/design", "use this endpoint as the hierarchy", or equivalent language, set that endpoint, screenshot, or design as the canonical baseline.

Other terminals may reflow, compress, stack, split columns, or reduce density. They must not change:

- content meaning, content order, and data binding
- title hierarchy, supporting copy, metric-label relationships, and CTA hierarchy
- button, arrow, tab, and carousel interaction intent
- image, gallery, carousel, video, canvas, and chart intent
- divider, grouping, card boundary, and section relationship
- background visual language, including decorative English text, shader/canvas effects, gradients, and depth layers

If no canonical baseline is available, say so and review for internal consistency only.

## Required Terminal Matrix

Use these viewport pairings unless the product defines stronger targets:

| Terminal class | Size | Layout intent |
| --- | --- | --- |
| Narrow mobile | `375x812` | Single column, stacked, reduced density, no hidden primary content. |
| Common mobile | `390x844` | Main phone baseline for title breaks, buttons, carousels, and media. |
| Large mobile | `414x896` | Confirm spacing thresholds and active media still hold. |
| Modern large mobile | `430x932` | Confirm large-phone CTA, tabs, modals, and content rhythm. |
| Tablet portrait | `768x1024` | Avoid phone layout stretched too wide or desktop layout squeezed too early. |
| Tablet landscape / compact desktop | `1024x768` | Avoid awkward half-mobile/half-desktop states. |
| Standard desktop | `1440x900` | Usually canonical when desktop is the approved reference. |
| Wide desktop | `1920x1080` | Constrain max width, maintain rhythm, prevent over-stretch. |

If the project has custom breakpoints, also inspect just below and above them, such as `767/768`, `1023/1024`, and any project-specific cutoff.

Every terminal must be judged from the screenshot. DOM metrics, CSS inspection, and horizontal-scroll checks are supporting evidence only.

## Severity

- **S0 blocker**: Primary task is unusable, canonical content meaning diverges, key content is hidden, or navigation/CTA is unreachable.
- **S1 major**: Text/image overlap, title colliding with decorative/background text, clipping, unintended carousel exposure, missing dynamic background, unreadable type, broken sticky/fixed element, or inaccessible primary control.
- **S2 moderate**: Weak hierarchy, lost divider/grouping, awkward tablet/compact desktop state, oversized section height, wide-screen stretch, media ratio issue, or inconsistent component polish.
- **S3 minor**: Cosmetic polish that does not affect comprehension, hierarchy, or task completion.

## Failure Categories

Tag each issue with one primary category:

- **Content source**: Missing or divergent content, labels, numbers, CTA meaning, data binding, or content order.
- **Structure layout**: Grid/flex/absolute positioning, section height, card boundary, breakpoints, continuity, DOM duplication, or layout wrappers.
- **CSS priority**: Cascade, specificity, media query collision, inherited desktop/mobile rule, `display:none`, z-index, or unintended override.
- **Media constraints**: Image, carousel, gallery, canvas, WebGL, video, chart, map, aspect ratio, clipping, or visibility.
- **Interaction state**: Button, arrow, tab, CTA, carousel active state, scroll position, hover/touch/focus behavior, or breakpoint state reset.
- **Visual polish**: Hierarchy, rhythm, spacing, divider strength, typography scale, background intensity, and visual balance after the above categories are sound.

## Visual Semantic Checks

Check every terminal for:

- text overlap, including title/subtitle/body collisions
- title colliding with background English, decorative text, images, buttons, or arrows
- English or long words escaping containers
- small text and numbers becoming visually detached from their labels
- missing dividers, weak grouping, lost card boundaries, or unclear section relationships
- buttons, arrows, tabs, and CTAs being visible, clickable, and positionally faithful to the canonical intent
- abnormal empty space below content or sections that become much taller than their content
- image, canvas, video, and chart visibility plus reasonable aspect ratio
- visual hierarchy matching the canonical baseline even when layout reflows
- wide screens not over-stretching content and narrow screens not over-compressing it

## Responsive Structure Rules

- Identify what each terminal is supposed to be: phone stack, tablet hybrid, compact desktop, standard desktop, or wide desktop.
- Mark a **breakpoint semantics** issue if adjacent terminals jump discontinuously, such as `768` looking like broken desktop while `767` looks like working phone.
- Do not accept hiding key content with `display:none` as a crowding fix.
- Mobile can stack and reduce density; tablet can keep partial desktop structure; compact desktop must avoid awkward half states; standard desktop should align with the canonical baseline; wide desktop needs max-width and rhythm control.

## Carousel, Gallery, And Horizontal Content

Identify the carousel or gallery intent before judging overflow:

- **Single image**: Exactly one item should be visible. Neighboring items must not peek in, and horizontal drag should not accidentally reveal adjacent content unless there is an explicit transition.
- **Neighbor peek**: Validate peek ratio, gap, active item prominence, clipping, and alignment across terminals.
- **Continuous track**: Validate item count, track count, direction, active state, overflow behavior, container height, and whether the track exits its visual bounds.

Check:

- visible item count
- active/selected/current state
- `scrollLeft` and whether it changes unexpectedly
- `overflow-x` matching the intended interaction
- screenshot fidelity to the canonical gallery intent

Do not default to accepting horizontal scrolling as correct just because the DOM allows it.

## Canvas, WebGL, Video, And Dynamic Backgrounds

If a page contains canvas, WebGL, shader, video background, animated texture, or similar dynamic visual language, element existence is not enough.

Check every relevant terminal for:

- actual rendered element size and device-pixel size
- opacity, display, visibility, z-index, and stacking context
- content layer sitting above the dynamic background without hiding it entirely
- animation or render state causing a terminal-specific blank or overly faint background
- screenshot resemblance to the canonical baseline

If the element exists but the screenshot shows near-white, near-gray, blank, or missing dynamic background, mark it as **dynamic background visual loss**.

## Content Density And Height

- Small amounts of copy should not create huge empty modules.
- Large amounts of copy should not be compressed into unreadable blocks.
- Cards, modules, and image-text sections need content-driven height or an explicit responsive height strategy.
- Wide desktop needs max-width, comfortable line length, stable image scale, and centered visual gravity.
- Treat over-tall sections, loose metrics, and bottom whitespace as visual QA issues even when no DOM overflow exists.

## Text And Typography Stability

- Chinese title line breaks must preserve semantic groups.
- English long words, labels, and uppercase decorative text must not overflow.
- Numeric values must stay visually bound to their labels.
- Button text must remain complete.
- Heading size must fit its container and terminal role.
- Line height, spacing, and hierarchy must remain stable across terminals.
- Do not accept unreadably small type as a solution to layout pressure.

## Evidence To Capture

For every meaningful finding, capture:

- viewport size and terminal class
- screenshot path or observed browser state
- canonical baseline used
- visible symptom
- failure category
- likely root cause
- proposed fix direction
- verification step after the next development pass
