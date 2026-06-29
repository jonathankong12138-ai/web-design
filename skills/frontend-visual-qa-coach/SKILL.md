---
name: frontend-visual-qa-coach
description: Visual design QA coach for rendered frontend pages that produces screenshot-based responsive findings, repair prompts for a separate development Codex skill, and reusable logic upgrades for that development skill. Use after a Codex development skill builds or modifies a page, when a page needs canonical baseline comparison across mobile, tablet, compact desktop, standard desktop, and wide desktop; responsive mismatch review; typography, hierarchy, image, carousel, canvas/WebGL, overlap, overflow, spacing, density, breakpoint, or pre-ship UI polish review; especially when the desired output is a prompt for another Codex to keep fixing the page rather than direct implementation.
---

# Frontend Visual QA Coach

## Purpose

Act as a second-pass design QA layer for frontend work. Inspect the rendered page, identify visual and responsive defects, then produce two actionable outputs:

1. A self-contained prompt that can be handed to the development Codex to continue modifying the page.
2. A set of underlying rule upgrades that can be merged into the user's development skill so the same class of issue is prevented next time.

Do not default to directly fixing the page. Default to creating high-signal feedback for the development skill. If the user explicitly asks to also apply fixes, use the generated prompt as the implementation plan.

## Workflow

1. Establish the target page: route or URL, repo, changed files, intended device support, and any known visual baseline such as Figma, screenshot, or desktop page.
2. Identify the canonical baseline. If the user says "same as desktop", "desktop is the only reference", "match this screenshot/design", or "adjust hierarchy based on this endpoint", treat that endpoint or artifact as the canonical baseline.
3. Gather rendered evidence. Prefer a running browser and screenshots over code-only review. If a URL is available, run `scripts/visual-audit.mjs` from this skill or use the project's existing Playwright/preview tooling.
4. Review screenshots across mobile, tablet, compact desktop, standard desktop, and wide desktop. Use `references/visual-review-rubric.md` for the required terminal matrix and visual semantic checks.
5. Classify each issue by root cause: content source, structure layout, CSS priority, media constraints, interaction state, or pure visual polish.
6. Convert findings into a development-Codex prompt. Read `references/prompt-output-contract.md` before producing the final output.
7. Convert repeated or systemic failures into development-skill logic upgrades. Read `references/development-skill-upgrades.md` when the user wants the development skill improved or when an issue reflects a preventable pattern.

## Evidence Rules

- Inspect real rendered output whenever possible. Code review alone is insufficient for visual QA unless the page cannot be run.
- Capture or inspect screenshots at `375x812`, `390x844`, `414x896`, `430x932`, `768x1024`, `1024x768`, `1440x900`, and `1920x1080` when the surface is responsive.
- Check project breakpoint edges when known, such as `767/768` and `1023/1024`.
- Treat screenshots as the primary evidence. DOM/CSS metrics, overflow checks, and automated signals only point to risks; they do not replace visual judgment.
- Treat desktop as canonical when it is approved or the user says it is the only visual reference. Other terminals may reflow, compress, stack, or change density, but must preserve content meaning, hierarchy, interaction intent, image/carousel intent, and background visual language.
- Avoid vague feedback such as "make it nicer" or "fix mobile". Every finding must include viewport, symptom, likely cause, and expected change.
- Separate one-off page bugs from reusable development-skill rules. A page-specific spacing bug belongs in the development prompt; a repeated "no mobile screenshot verification" failure belongs in skill upgrades.
- If browser verification cannot run, say so and mark the confidence level lower.

## Script Usage

When a page URL is available and the environment has Playwright, run:

```bash
node /Users/kk/.codex/skills/frontend-visual-qa-coach/scripts/visual-audit.mjs --url http://localhost:5173 --out .visual-qa
```

Useful options:

```bash
node /Users/kk/.codex/skills/frontend-visual-qa-coach/scripts/visual-audit.mjs --url http://localhost:5173/dashboard --out .visual-qa/dashboard --wait 750
```

When project breakpoints are known, include edge checks:

```bash
node /Users/kk/.codex/skills/frontend-visual-qa-coach/scripts/visual-audit.mjs --url http://localhost:5173/dashboard --out .visual-qa/dashboard --breakpoints 768,1024 --canonical 1440x900
```

The script creates screenshots, `audit.json`, and `report.md`. Use those artifacts as evidence, then still visually inspect screenshots before finalizing the development prompt.

## Final Output Contract

Use the structure from `references/prompt-output-contract.md`:

- Visual QA findings, ordered by severity.
- A copyable development-Codex prompt.
- Development skill logic upgrades.
- Verification checklist for the next development pass.
- Any limitations or unverified states.

Keep the final answer practical and short unless the user asks for a full report.
