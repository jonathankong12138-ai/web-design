---
name: figma-web-browser-verification
description: Verify Figma-based web implementation in a real browser. Use when Codex needs to start or reuse a dev server, capture desktop/mobile/tablet screenshots, inspect DOM geometry, console errors, network/runtime failures, responsive behavior, or interaction paths after building from a design.
---

# Figma Web Browser Verification

Verify the implementation where users experience it: the browser. This is a development self-check, not the independent `check` adjustment checklist.

## Output Contract

Return concise evidence:

```txt
Local URL:
Screenshots:
Console / Runtime:
Interaction Checks:
Responsive Checks:
Issues Fixed or Remaining:
```

Use `references/browser-verification-template.md` for substantial pages or strict mode.

## Workflow

1. Start or reuse the local dev server using repo commands. If a port is occupied, use another available port.
2. Open the implemented route in a real browser or Playwright.
3. Capture representative screenshots: mobile, tablet, desktop, and wide desktop when relevant.
4. Check console errors, page crashes, failed assets, and important network failures.
5. Measure key elements when visual alignment depends on numeric constraints.
6. Exercise core interactions: click, type, focus, scroll, tab, open/close overlays, switch tabs/slides, and navigate.
7. Check responsive integrity: no horizontal overflow, clipped text, overlapping UI, broken media, or hidden primary actions.
8. Feed discovered implementation defects back into code or visual alignment before finishing.

## Script

Use `scripts/capture-viewports.mjs` when Playwright is available and a quick screenshot matrix is enough:

```bash
node ~/.codex/skills/figma-web-browser-verification/scripts/capture-viewports.mjs http://localhost:5173 ./tmp/figma-web-shots
```

The script writes viewport screenshots and a JSON summary. It is optional; interactive browser tools or project Playwright tests may be better for complex flows.

## Stage Gate

Proceed to quality finish when the page opens, representative viewports have evidence or a clear blocker, console has no blocking runtime errors, and core interactions have been exercised.

## Stop Conditions

Stop only when the app cannot run locally after reasonable diagnosis or required credentials/services are unavailable. Report the blocker with the command, error, and next needed input.

## Validation

Evidence beats assertion. Prefer screenshot paths, viewport sizes, console results, bounding boxes, and reproduction steps over "looks good".
