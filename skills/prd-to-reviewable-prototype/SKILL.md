---
name: prd-to-reviewable-prototype
description: Turn a brief or incomplete PRD into a runnable, shareable, reviewable low-fidelity frontend prototype. Use when Codex must infer product goals, ask targeted clarification questions for important PRD gaps, page inventory, flows, page states, edge cases, interaction rules, and acceptance criteria from sparse PRD input, then build or refine a Vite + React + TypeScript + Tailwind CSS + React Flow prototype for design/dev/test review, including clickable app screens, static flow screens, scoped states, persistent comments, delete/edit/resolve review notes, localStorage, JSON export, and browser-only distribution.
---

# PRD To Reviewable Prototype

Use this skill to convert a short PRD into a practical prototype review artifact. Do not ask the user to write a complete PRD. Instead, assess whether the brief PRD has enough information to produce an industry-credible interaction prototype. Ask focused clarification questions for high-impact gaps, infer the rest, implement a runnable prototype, and make the result easy for design, development, and testing reviewers to inspect.

## Core Workflow

1. Read the provided PRD and any referenced style/product docs. Preserve the PRD as `prototype-review/src/data/prdInput.md`.
2. Infer and encode a structured spec in `prototype-review/src/data/prototypeSpec.ts`:
   - product goal
   - target reviewers and only useful user context
   - core scenarios
   - page inventory
   - primary and branch flows
   - page-specific states
   - exceptional states
   - interaction rules
   - acceptance criteria
   - explicit assumptions
3. Build or update the frontend in `prototype-review/` using Vite, React, TypeScript, Tailwind CSS, and React Flow.
4. Keep the prototype low-fidelity but usable. Prioritize real interaction, flow clarity, state inspection, annotations, and review operations over final visual polish.
5. Build and package a browser-only deliverable so reviewers with only a browser can open it.

## Clarification Loop

Use a lightweight clarification loop when the PRD is incomplete.

Ask questions before building when missing information would materially change the prototype:

- target medium or device class
- core user goal or success outcome
- main entry point and exit path
- critical pages or screens
- required actions and irreversible/destructive actions
- business rules, permissions, validation, or data dependencies
- platform constraints such as sound, haptics, offline, sharing, payments, privacy, or integrations
- visual/product language when the PRD refers to an existing app or feature family

Ask no more than 3 questions at a time. Prefer concrete, answerable questions over broad requests like “please complete the PRD.” If the user answers partially, incorporate the answers and ask one more short round only when a remaining gap would cause the prototype to fail review.

Proceed without more questions when the gaps are low-risk. Make reasonable assumptions and list them in the generated spec or PRD/rules panel.

The goal is not to exhaustively specify the product. The goal is to reach enough clarity for a basic industry-standard interaction prototype:

- clear information architecture
- complete primary flow
- sensible branch and cancellation paths
- meaningful page states
- realistic interactions and feedback
- inspectable acceptance criteria
- review comments and exportable notes

## Required Structure

Create or maintain this structure unless the user specifies otherwise:

```text
prototype-review/
  package.json
  README.md
  index.html
  vite.config.ts
  scripts/inline-dist.mjs
  src/
    App.tsx
    main.tsx
    index.css
    data/
      prdInput.md
      prototypeSpec.ts
    components/
      PrototypeView.tsx
      FlowView.tsx
      StateView.tsx
      ReviewView.tsx
      AnnotationLayer.tsx
      SpecPanel.tsx
    utils/
      parsePrd.ts
      storage.ts
      exportReview.ts
```

Use `base: './'` in Vite and an inline build step for portable `dist/index.html` when the user needs to send files to people who only have a browser.

When creating a fresh project, prefer the bundled template:

```bash
node path/to/prd-to-reviewable-prototype/scripts/scaffold-prototype.mjs prototype-review
```

The script copies `assets/prototype-template/` into the target directory. After copying, replace the placeholder spec, PRD input, screens, states, and copy with the user’s inferred product model.

## View Model

Adapt the view model to the review task instead of blindly showing every possible panel.

- `Prototype`: show only the app experience and the relevant PRD/rules panel. The prototype itself should feel like the target medium, such as a mobile app inside a phone frame.
- `Flow`: show concrete static page screens, not text-only nodes. Integrate page states and comments directly into each flow screen. Do not show PRD text inside Flow unless explicitly requested.
- `States`: include as a separate view only when it adds value. If the user asks to merge states into Flow, do that.
- `Review`: include as a separate view only when coordinate-level review is needed outside Flow. Otherwise support comments inside Flow screen cards.

## Mobile And Medium Fidelity

Match the PRD medium. If the product is mobile:

- Render app screens in phone frames.
- Keep the surrounding review tool desktop-friendly for design/dev/test.
- Avoid stretching phone frames to match neighboring panels; use intrinsic height (`h-fit`, `self-start`, `items-start`) so the device shell does not grow into empty space.
- Keep app copy and app controls true to the product. Put implementation notes in annotations or spec panels, not inside the app screen.

## Flow Requirements

Flow should help reviewers inspect actual screens and paths.

- Use concrete static page cards for each main page, ordered by the main user path.
- Show arrows or transitions between cards.
- Put state controls under each screen card.
- Make each state button update that screen’s rendered state.
- Put comments under the corresponding screen card.
- Persist comments with `localStorage`.
- Support add, edit if practical, delete, and resolved/unresolved.
- If comments are clicked to toggle resolved status, make delete a separate control so reviewers do not accidentally toggle while deleting.

## State Generation Rules

Do not force every page to show `default`, `loading`, `empty`, `error`, `success`, and `completed`.

Generate only states that a user or reviewer would reasonably need to see for that page:

- Data fetch/export/save pages may need loading, error, success.
- Entry or interactive toy pages may need default, new/empty surface, resource error, completed surface.
- Timer pages may need running, paused, background/return, completed.
- Settlement pages may only need result and no-data.
- Record/edit pages may need prefilled, empty text, entry error.

If a state is not meaningful from the user perspective, omit it or replace it with a concise relevant status.

## Interaction Rules

Generate annotations for meaningful actions:

- trigger and source element
- destination page or state transition
- visible feedback
- loading/error/success behavior when applicable
- sound/haptic/animation behavior only if it exists in the PRD or target platform
- branch and exception behavior

Do not invent UI controls that do not exist in the product. For example, do not add “simulate finish” buttons to a countdown prototype; implement the real countdown behavior or show the static completed state in Flow.

Separate prototype UI from review metadata:

- Product-facing UI should use product language.
- Review tool panels may use labels such as state, rule, annotation, and acceptance criteria.
- Implementation-only feedback like sound, vibration, counters, or test notes should not appear in the app screen unless the real product would show it.

## Review Data Contract

For coordinate review or Flow comments, store comments with:

- `id`
- `pageId` or `screenId`
- `elementName` when available
- `x` and `y` when coordinate-based
- `body`
- `createdAt`
- `updatedAt`
- `resolved`

Use localStorage first. Export `review-notes.json` with comments plus enough spec context to act on the feedback. Refresh must preserve comments.

## Transferable Output

When the user needs to share with people who only have a browser:

1. Build with relative asset paths.
2. Inline CSS and JS into `dist/index.html`.
3. Copy `dist/index.html` and a short open-in-browser instruction file into a transfer folder.
4. Zip the folder.
5. Tell the user the exact local paths to both `dist/index.html` and the zip.

Opening `dist/index.html` directly with a browser must not show a blank page.

## Design Guidance

Build the review tool as a quiet workbench, not a marketing page.

- Use a compact top navigation.
- Use clear visual hierarchy for Flow, Prototype, PRD/rules, states, and comments.
- Keep cards, panels, and buttons dense enough for repeated review.
- Use low-fidelity app UI, but make the review shell clean and trustworthy.
- Avoid decorative visuals that distract from flow and state review.
- For design/dev/test audiences, remove low-value end-user persona text unless it clarifies behavior.

When a reference doc is provided for product style or language, read it and adapt copy, tone, and interaction labels to match. Prefer gentle, product-appropriate text over raw technical descriptions.

## Verification

Run:

```bash
npm run build
```

Also verify:

- `dist/index.html` can open from the filesystem.
- Flow shows concrete screens, not only text.
- Each state button displays the corresponding screen state.
- Comments can be added, resolved/unresolved, deleted, and persisted after refresh.
- The transferable zip contains the latest inlined `index.html`.
- No product screen contains fake controls or implementation-only labels.

If browser automation is unavailable, report that limitation and still run the build/package checks.
