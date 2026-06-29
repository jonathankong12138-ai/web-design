# Prompt Output Contract

Use this structure when returning the result of a visual QA pass. The output must be copyable into a development Codex task and must make clear which terminal screenshots were actually inspected.

## Required Final Structure

1. **Inspected Evidence**: List canonical baseline, inspected viewports, breakpoint edges, screenshot directory, and any verification gaps.
2. **Visual QA Findings**: List actionable issues ordered by severity.
3. **Development-Codex Prompt**: Provide a self-contained prompt for the next development pass.
4. **Development Skill Logic Upgrades**: Provide reusable rules for the development skill.
5. **Verification Checklist**: List the next pass checks.
6. **Limitations**: State unverified states, missing screenshots, unavailable browser, or missing canonical baseline.

## Visual QA Finding Format

Use this compact format for every issue:

```text
[S1] 390x844 - 轮播一次显示多张图
Category: 媒体约束 / 交互状态
Evidence: screenshot path
Likely cause: container uses horizontal flex/scroll-snap and item width below 100%.
Fix direction: 根据 canonical baseline 判断是单图、露邻图还是连续轨道；若为单图，则隐藏非 active 项并关闭横向滚动。
Verify: visible item count、scrollLeft、overflow-x、截图均符合设计意图。
```

Include one primary category, or two only when the issue genuinely crosses boundaries. Valid categories:

- 内容同源问题
- 结构布局问题
- CSS 优先级问题
- 媒体约束问题
- 交互状态问题
- 纯视觉 polish 问题

## Example Findings

```text
[S1] 390x844 - 轮播一次显示多张图
Category: 媒体约束问题 / 交互状态问题
Evidence: .visual-qa/screenshots/390x844.png
Likely cause: container uses horizontal flex/scroll-snap and item width below 100%.
Fix direction: 根据 canonical baseline 判断是单图、露邻图还是连续轨道；若为单图，则隐藏非 active 项并关闭横向滚动。
Verify: visible item count、scrollLeft、overflow-x、截图均符合设计意图。

[S1] 768x1024 - 平板端标题与背景英文重叠
Category: 结构布局问题 / CSS 优先级问题
Evidence: .visual-qa/screenshots/768x1024.png
Likely cause: breakpoint 仅处理手机，平板继承了不合适的桌面绝对定位。
Fix direction: 为平板定义独立层级和位置规则，保持标题可读且背景文字退后。
Verify: 768、1024、1440 三档标题均不重叠。

[S2] 1920x1080 - 宽屏内容过度拉伸
Category: 结构布局问题 / 纯视觉 polish 问题
Evidence: .visual-qa/screenshots/1920x1080.png
Likely cause: 缺少 max-width 或宽屏布局约束。
Fix direction: 增加内容最大宽度、保持图片/文本节奏，不改变 canonical 内容。
Verify: 1440 与 1920 保持同等视觉层级，不出现超长行或重心漂移。
```

## Development-Codex Prompt

The prompt must be self-contained. It should not require the next Codex to read the QA conversation.

Include:

- target page or route
- canonical baseline and why it is canonical
- repo context if known
- prioritized defects to fix
- constraints to preserve
- files or components likely involved, if known
- terminal-specific verification matrix
- instruction to visually inspect screenshots after changes

Template:

```text
Use the existing project patterns to fix the visual and responsive issues on [page/route].

Canonical baseline:
- [Desktop / screenshot / design] is the visual reference.
- Other terminals may reflow, compress, stack, or change density, but must preserve content meaning, hierarchy, CTA intent, carousel/media intent, background visual language, and interaction state.

Context:
- [What page does]
- [Relevant files/components, if known]
- [Known breakpoints or layout strategy, if known]

Fix these issues in priority order:
1. [S1/S2 issue with viewport, category, symptom, and evidence]
2. [Issue]

Constraints:
- Preserve canonical content meaning, title hierarchy, data labels, CTA function, image/carousel intent, dividers, background effects, and content order.
- Do not create a separate mobile page or divergent state path.
- Do not hide essential content with display:none to solve crowding.
- Use existing design tokens, breakpoints, and component conventions.
- For canvas/WebGL/video backgrounds, verify the rendered screenshot, not only element existence.

Verification:
- Run the app and inspect screenshots at 375x812, 390x844, 414x896, 430x932, 768x1024, 1024x768, 1440x900, and 1920x1080.
- If breakpoints exist, inspect just below and above them, such as 767/768 and 1023/1024.
- Confirm no text/background overlap, English overflow, missing dividers, unreachable buttons/arrows/tabs/CTAs, abnormal blank space, distorted media, unintended carousel exposure, dynamic background loss, wide-screen over-stretch, or canonical hierarchy drift.
- Re-test affected interactions and state changes across viewport changes.
```

## Development Skill Logic Upgrades

Write upgrades as reusable rules, not as page-specific instructions.

Use this shape:

```text
Rule: Before completing any frontend page, run a screenshot-based all-terminal visual QA pass against the canonical baseline.
Trigger: Any task that creates or significantly changes a page, layout, modal, dashboard, landing page, carousel, media section, or component-heavy screen.
Prevents: Mobile-only verification, tablet half-adaptation, compact desktop breakpoint drift, wide-screen stretch, visual hierarchy drift, carousel intent drift, and dynamic background loss.
Required behavior: Capture and inspect 375x812, 390x844, 414x896, 430x932, 768x1024, 1024x768, 1440x900, and 1920x1080 screenshots; include breakpoint edges when known; fix screenshot-visible issues before final response.
```

Prefer 3-7 rule upgrades. Merge similar rules instead of producing a huge list.

## Verification Checklist

Include a short checklist for the next pass:

- Canonical baseline named and preserved
- Viewports checked
- Breakpoint edges checked if applicable
- Visual semantic checks completed
- Carousel/gallery intent checked
- Canvas/WebGL/video background checked if present
- Text stress and long-word state checked
- Media constraints checked
- Interaction states checked
- Desktop and wide desktop regression checked

## Limitations

State what was not verified:

- app could not be run
- no canonical baseline available
- Playwright unavailable
- screenshots not captured
- breakpoint edges unknown
- dynamic background could not be sampled
- only static code review performed
