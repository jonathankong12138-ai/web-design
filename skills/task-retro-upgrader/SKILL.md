---
name: task-retro-upgrader
description: Review a completed Codex task, extract durable lessons from the conversation and work artifacts, and produce a scoped upgrade brief for a specific Codex skill. Use after task completion when the user asks to retro, review context, capture lessons, improve or upgrade a skill, prepare a handoff for skill maintenance, or turn repeated friction from a task into skill instructions.
---

# Task Retro Upgrader

## Purpose

Turn the completed-task context into a focused skill-maintenance handoff. Default to producing a written upgrade brief. Only edit the target skill when the user explicitly asks to apply the upgrade.

Use this skill to prevent two failure modes:

- Losing valuable lessons after a task completes.
- Overfitting a skill to one task without evidence that the lesson is durable.

## Operating Rules

- Ground every recommendation in observable context: user requests, final deliverables, tool outputs, files changed, validation results, user corrections, failed attempts, or repeated friction.
- Do not record private chain-of-thought. Summarize decisions, evidence, tradeoffs, and outcomes instead.
- Separate one-off project details from reusable skill instructions.
- Prefer small, testable skill changes over broad rewrites.
- Treat user corrections as high-signal evidence.
- If the target skill is unclear, identify likely candidates and ask the user to choose unless one candidate is obvious from the request.
- If the target skill path is unknown, search likely locations such as `$CODEX_HOME/skills`, `~/.codex/skills`, and the workspace before asking.
- Do not modify a skill during the retro unless the user explicitly asks to implement the upgrade now.
- Before writing an upgrade brief, read the current `SKILL.md` for each likely target skill and compare the observed gap against the existing instructions.
- If the task concerns skill design quality, triggering, validation, or generalization, consult current authoritative skill-authoring references before recommending changes.
- Do not restate rules that already exist unless the lesson is that the trigger, ordering, or validation wording must be stronger.

## Workflow

1. Define the reviewed task.
   Capture the original user goal, the final outcome, and the likely target skill or skills.

2. Inspect the target skill baseline.
   Read the current `SKILL.md` for each likely target before recommending changes. If the skill target remains ambiguous after reading, ask the user to choose.

3. Gather evidence.
   Review conversation context and local artifacts when available. Look for user corrections, failed assumptions, repeated searches, tool mistakes, validation gaps, useful scripts, design decisions, and final verification.

4. Run a compact after-action review.
   Answer:
   - What was expected?
   - What actually happened?
   - What worked well?
   - What caused friction or risk?
   - What should change next time?

5. Extract durable lessons.
   Keep only lessons that are likely to improve future tasks. Discard details that are tied to a specific repo, temporary environment, one user's preference, or a single accidental failure.

6. Map lessons to skill changes.
   Classify each lesson as one of:
   - Trigger/description update
   - Workflow step
   - Validation requirement
   - Tool-use rule
   - Reference material
   - Script or asset
   - Anti-pattern or caution

7. Produce the upgrade brief.
   Use `references/upgrade-brief-template.md` when the user wants a complete handoff or when the retro will be given to another Codex instance.

8. Optional implementation.
   If the user asks to apply the upgrade, use `$skill-creator` to update the target skill. Read the target skill first, make the smallest effective edits, validate it with `quick_validate.py`, and report what changed.

## Quality Bar

An upgrade brief is useful when it answers these questions without extra context:

- Which skill should be changed?
- What evidence from the completed task supports the change?
- What exact behavior should future Codex runs adopt?
- What should the skill avoid encoding?
- How should the upgraded skill be validated?

Avoid vague recommendations such as "improve the prompt" or "be more careful." Convert them into concrete, testable instructions such as "Before calling `use_figma`, read the `figma-use` skill and pass `skillNames` in the tool call."

## Handoff Prompt Pattern

When handing the result to another Codex instance, include a short prompt like:

```text
Use $skill-creator to update the target skill based on this Skill Upgrade Brief.
Make only the scoped changes supported by the evidence, preserve existing useful behavior, run the skill validator, and summarize the diff.
```
