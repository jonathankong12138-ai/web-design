# Skill Upgrade Brief Template

Use this template when preparing a handoff for another Codex instance or when the user wants a full retrospective artifact.

## Header

Target skill:
Target skill path:
Reviewed task:
Task date:
Reviewer:
Implementation requested now: yes/no

## Outcome

Original user goal:
Final deliverable:
Validation performed:
Known gaps or unresolved issues:

## Evidence

User corrections:
- 

Failures or friction:
- 

Successful patterns:
- 

Tooling or workflow observations:
- 

Files, commands, or artifacts reviewed:
- 

## After-Action Review

Expected:

Actual:

What worked:

What did not work:

Root causes:

What should happen differently next time:

## Durable Lessons

Keep:
- 

Add:
- 

Avoid:
- 

Validate:
- 

## Proposed Skill Changes

1. Trigger or description changes:
2. Workflow changes:
3. Validation or test changes:
4. Tool-use rules:
5. References, scripts, or assets:
6. Anti-patterns or cautions:

## Overfitting Check

Do not encode:
- 

Evidence that the lesson is reusable:
- 

Assumptions:
- 

User approval needed:
- 

## Handoff Prompt

```text
Use $skill-creator to update [TARGET_SKILL_PATH] based on this Skill Upgrade Brief.

Make only changes supported by the evidence above.
Preserve existing useful behavior.
Prefer concise workflow or validation instructions over broad rewrites.
Run the skill validator after editing.
Report the changed files, validation result, and any residual risk.
```
