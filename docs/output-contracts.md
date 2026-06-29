# Output Contracts

The central discipline of Web Design is simple: one stage, one artifact.

Each skill may use many methods internally. The final output must still match the stage contract so the next stage can continue without reinterpretation.

## `prototype`

Only artifact:

- Runnable, reviewable interactive prototype.

Allowed inside the artifact:

- Page inventory.
- Main and branch flows.
- Empty, loading, error, disabled, and success states.
- Inline comments, review notes, acceptance cues, and open questions.
- Local URL or source files needed to inspect the prototype.

Not allowed as separate outputs:

- PRD.
- Discovery plan.
- Roadmap.
- User-story document.
- Test-scenario document.

## `web-design`

Allowed artifacts:

- Designer-facing handoff guidance.
- Structured `Design Handoff Submission`.
- Decision to run `web-design-handoff-review`.
- Build entry notes when the design is ready or conditionally ready.

Build entry notes should cover:

- Design source.
- Build scope.
- Frames or screenshots.
- Responsive notes.
- States.
- Assets.
- Developer-allowed assumptions.
- Risks.
- Recommended build path.

Not allowed:

- Code changes.
- `Adjustment Checklist`.
- Aesthetic taste review with no build-readiness decision.
- Independent acceptance testing.

## `web-design-handoff-review`

Only artifact:

- `Design Handoff Checklist`.

The checklist must state:

- `Ready for build: Yes`, `Conditional`, or `No`.
- Scope and source coverage.
- Blockers, risks, assumptions, and required designer fixes.
- Whether `figma-web-build` or ordinary `build` is the expected next path.

`Conditional` means development may proceed only with explicit `Developer-Allowed Assumptions`.

Not allowed:

- Code implementation.
- Generic design critique.
- Replacement for `check`.

## `build`

Only artifact:

- Working code.

Allowed inside the artifact:

- App code.
- Styling.
- Tests.
- Fixtures.
- Configuration required by the implementation.
- Verification updates that live in the repository.

Not allowed as separate outputs:

- Implementation plan.
- Design handoff.
- Audit report.
- Coverage map.
- Shipping packet.

Final responses may summarize changed files, verification commands, and blockers, but the delivered artifact is still code.

## `figma-web-build`

Artifact:

- Working code from Figma, screenshot, design image, or visual QA evidence.
- Concise development evidence, such as local URL, screenshots, console/runtime findings, interaction checks, responsive checks, and verification commands.

Allowed stage outputs:

- Design analysis needed for implementation.
- Repo analysis needed before editing.
- Implementation map for nontrivial work.
- Interaction state fixes.
- Visual alignment code.
- Browser verification notes.
- Quality finish summary.

Not allowed:

- Independent `Adjustment Checklist`.
- Standalone design audit detached from code.
- Final acceptance signoff that should belong to `check`.

## `check`

Only artifact:

- `Adjustment Checklist`.

Each item should include:

- Evidence.
- State coverage.
- Regression risk.
- Expected behavior.
- Actual behavior.
- Developer instruction.
- Verification step.

Not allowed:

- Direct code fixes unless the user explicitly switches to `build`.
- Generic review essay.
- Test plan.
- Visual QA report with no developer action.
- Shipping packet.

## `retro`

Only artifact:

- `Skill Upgrade Guide`.

Each guide should include:

- Target skill.
- Observed failure.
- Evidence.
- Root cause.
- Instruction change.
- Trigger change.
- Anti-pattern to prevent.
- Acceptance example.

Not allowed:

- Generic retrospective.
- Team process essay.
- Narrative project recap.
- Skill changes unsupported by task evidence.

## Supporting Skill Outputs

| Skill | Expected output |
|---|---|
| `prd-to-reviewable-prototype` | Runnable, shareable low-fidelity prototype review artifact |
| `responsive-page-adapter` | Responsive code changes plus breakpoint verification |
| `frontend-visual-qa-coach` | Screenshot-based visual QA findings, repair prompt, skill logic upgrades, and next verification checklist |
| `task-retro-upgrader` | Scoped skill-maintenance brief for a specific skill |
