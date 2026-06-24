# Example: Landing Page

## Starting Prompt

```text
Use prototype to turn this into a reviewable web experience:

We need a landing page for a new AI note-taking app for solo consultants.
It should explain the product, show trust, capture email signups, and feel premium but not corporate.
```

## Expected Workflow

### `prototype`

Produces an interactive landing page prototype with:

- First viewport positioning.
- Primary CTA.
- Feature proof sections.
- Signup flow.
- Empty/error states for signup.
- Mobile navigation behavior.
- Notes on unresolved product claims.

No separate PRD is produced.

### `build`

Implements the landing page as code:

- Responsive layout.
- Signup interaction.
- Visual hierarchy.
- Accessible buttons/forms.
- Realistic content structure.

No separate implementation plan is produced.

### `check`

Returns an adjustment checklist:

```md
### WD-001: CTA falls below the fold on mobile
Severity: High
Evidence: 390x844 viewport screenshot
Expected: Primary CTA visible in the first viewport.
Actual: CTA is below the fold after the hero copy.
Developer Instruction: Reduce hero copy height and move the CTA into the first visible content group on mobile.
Verification: Recheck 390x844 and 430x932 viewports.
```

### `retro`

Produces a skill upgrade guide if the run exposes a repeatable weakness, such as missing mobile-first CTA checks.
