# Output Contracts

The single most important rule in Web Design is artifact discipline.

Each stage may use many methods internally, but it must return only one kind of output.

## `prototype`

Only artifact:

- Interactive prototype.

Allowed inside the artifact:

- Flow states.
- Page states.
- Empty/loading/error states.
- Inline comments.
- Review notes.
- Acceptance cues.
- Open questions.

Not allowed as separate outputs:

- PRD.
- Discovery plan.
- Roadmap.
- User-story document.
- Test-scenario document.

## `build`

Only artifact:

- Code.

Allowed inside the artifact:

- App code.
- Styling.
- Tests.
- Fixtures.
- Configuration required by the implementation.

Not allowed as separate outputs:

- Implementation plan.
- Design handoff.
- Audit report.
- Coverage map.
- Shipping packet.

## `check`

Only artifact:

- Developer adjustment checklist.

Each item should include:

- Severity.
- Evidence.
- Expected behavior.
- Actual behavior.
- Developer instruction.
- Verification step.

Not allowed as separate outputs:

- Generic review essay.
- Test plan.
- Visual QA report with no developer action.
- Shipping packet.

## `retro`

Only artifact:

- Skill upgrade guide.

Each guide should include:

- Target skill.
- Observed failure.
- Evidence.
- Root cause.
- Instruction change.
- Trigger change.
- Anti-pattern to prevent.
- Acceptance example.

Not allowed as separate outputs:

- Generic retrospective.
- Team process essay.
- Narrative project recap.
