# Development Skill Upgrade Patterns

Use this reference when turning QA failures into reusable improvements for the user's development skill.

## Upgrade Philosophy

The development skill should prevent recurring design defects by changing its default behavior, not by memorizing one page's bug.

Good upgrade:

- Names a repeated failure pattern.
- Defines when the rule triggers.
- Gives the development Codex a required behavior.
- Defines a concrete screenshot-based verification step.

Weak upgrade:

- Mentions only one route or component.
- Says "make mobile better" without an observable check.
- Adds aesthetic preference without preventing a failure mode.

## Common Upgrade Rules

### Canonical baseline first

Add when the development skill changed hierarchy, content meaning, carousel intent, or visual language while adapting responsive layouts.

```text
When the user names a visual reference such as desktop, a screenshot, or a design, treat it as the canonical baseline. Other terminals may reflow, compress, stack, split columns, or reduce density, but they must preserve content meaning, title hierarchy, metric-label relationships, CTA function, image/carousel intent, divider/grouping semantics, background visual language, and interaction state.
```

### All-terminal screenshot completion gate

Add when the development skill verified only desktop or only mobile.

```text
Before finalizing any frontend page or complex component, capture and inspect rendered screenshots at 375x812, 390x844, 414x896, 430x932, 768x1024, 1024x768, 1440x900, and 1920x1080. If project breakpoints are known, also inspect just below and above them, such as 767/768 and 1023/1024. DOM metrics and CSS review do not replace screenshot judgment.
```

### Visual semantic QA gate

Add when screenshot-visible hierarchy issues were missed.

```text
Every responsive QA pass must check screenshot-visible semantic defects: text overlap, title/background text collision, English or long-word overflow, label-number detachment, missing dividers or grouping, invisible buttons/arrows/tabs/CTAs, abnormal empty space, media invisibility or distortion, hierarchy drift from the canonical baseline, narrow-screen compression, and wide-screen over-stretch.
```

### Breakpoint semantics and continuity

Add when tablet or compact desktop enters an awkward half-state.

```text
Define layout intent for each terminal class: phone stack, tablet hybrid, compact desktop, standard desktop, and wide desktop. Mark and fix discontinuities where adjacent breakpoints jump between unrelated structures or inherit unsuitable absolute positioning, sizing, or density. Do not solve crowding by hiding canonical content with display:none.
```

### Same content and state across breakpoints

Add when terminals render different content, actions, handlers, validation, or state paths.

```text
Treat mobile, tablet, compact desktop, standard desktop, and wide desktop as responsive layouts over one canonical content and state model. Do not create terminal-specific data maps, action lists, validation paths, ids, handlers, or analytics semantics unless explicitly requested. If duplicate DOM is unavoidable, drive it from the same props, state, handlers, and accessibility semantics.
```

### Carousel and gallery intent rule

Add when a carousel, gallery, or horizontal track shows the wrong item count or unintended neighboring images.

```text
Before accepting carousel or gallery overflow, identify the intended pattern: single image, neighbor peek, or continuous track. Verify visible item count, active state, scrollLeft, overflow-x, item width, track count, container height, and screenshot fidelity at every terminal. If the canonical baseline is single-image, do not allow adjacent images to peek in.
```

### Canvas/WebGL/video background rule

Add when dynamic backgrounds exist in DOM but disappear or become too faint in screenshots.

```text
For canvas, WebGL, shader, video background, or animated texture surfaces, verify rendered screenshots and not only element existence. Check actual render size, opacity, display, visibility, z-index, content stacking, animation state, and resemblance to the canonical baseline at all relevant terminals. Mark near-white, near-gray, blank, or missing screenshots as dynamic background visual loss.
```

### Text and container fit rule

Add when labels, headings, buttons, nav, decorative English, cards, or table cells overflow.

```text
For all fixed-format UI elements, guarantee text fits, wraps, or truncates intentionally. Preserve Chinese title semantic breaks, prevent English long-word overflow, keep labels bound to numbers, keep button text complete, and keep heading size appropriate to the container. Do not reduce font sizes below readable thresholds to hide layout problems.
```

### Media constraint and density rule

Add when images, charts, cards, sections, or wide layouts are distorted, too tall, too sparse, or over-stretched.

```text
Give media and content sections explicit responsive constraints: aspect-ratio, max-width, object-fit, content-driven height, readable line length, and wide-screen max-width. Verify that small amounts of text do not create huge empty sections, dense text does not become unreadable, and wide desktop does not over-stretch images or shift visual gravity.
```

### Evidence-based final response rule

Add when the development Codex final answer claims completion without verification details.

```text
Final frontend responses must name the canonical baseline, viewports, breakpoint edges, interactions, carousel/media states, and dynamic backgrounds actually verified. If browser screenshots could not run, say so clearly and list the residual visual risks by terminal class.
```

## Choosing Upgrades

Return only upgrades supported by the current QA evidence.

- Use page prompt for one-off defects.
- Use skill upgrade for repeated, systemic, or preventable process defects.
- If a defect comes from missing product/design input, ask for the missing baseline instead of inventing a permanent rule.
