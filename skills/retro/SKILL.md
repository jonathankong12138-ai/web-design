---
name: retro
description: "Produce the Web Design retrospective artifact: a Codex-ready skill upgrade guide. Use after a prototype/build/check cycle, failed handoff, repeated rework, user correction, visual QA miss, implementation drift, unclear requirement, or completed web design task when lessons should upgrade the prototype, build, check, or retro skills. Do not produce a generic retrospective; output instructions that can be pasted into skill files."
---

# Retro

Convert task evidence into precise instructions for upgrading the Web Design skills.

## Output Contract

The only deliverable is `Skill Upgrade Guide`. It must be directly usable by Codex to patch one or more of these skills: `prototype`, `build`, `check`, `retro`, or a directly implicated web-design-adjacent skill such as `responsive-page-adapter`.

Do not produce a generic retrospective, team health report, sprint summary, or narrative recap unless the user explicitly asks for it.

## Workflow

1. Review the completed task: user request, prototype, code changes, checklist items, verification results, user corrections, and repeated rework.
2. Decide which skill or skills are likely upgrade targets, then read the current `SKILL.md` for each target before writing recommendations.
3. If the task concerns skill design quality, triggering, validation, or generalization, consult current authoritative skill-authoring references before recommending changes.
4. Identify the failure mode or improvement opportunity. Prefer concrete evidence over general impressions, and compare it against the current skill text.
5. Decide which skill should change. If the issue crosses stages, produce one section per target skill.
6. Write instruction changes in imperative form, ready to paste into `SKILL.md`. Recommend only changes that are missing from the current skill, or clearly strengthen weak trigger or validation wording.
7. Include trigger changes so the skill activates or behaves differently next time.
8. Include an anti-pattern that prevents recurrence.
9. Include an acceptance example that can be used to test whether the upgraded skill works.

## Template

```md
# Skill Upgrade Guide

## Target Skill
[prototype | build | check | retro | responsive-page-adapter | other named skill]

## Observed Failure
[The concrete issue observed in this task.]

## Evidence
[Conversation turn, file path, screenshot, test result, checklist item, or rework point.]

## Root Cause
[Trigger gap, workflow order issue, output contract weakness, validation gap, or unclear handoff.]

## Instruction Change
[Paste-ready instruction to add, replace, or remove in the target SKILL.md.]

## Trigger Change
[When the target skill should activate or change behavior.]

## Anti-Pattern To Prevent
[The behavior future agents must avoid.]

## Acceptance Example
[A realistic prompt or task that should pass after the skill is upgraded.]
```

## Quality Bar

- Make every recommendation patchable.
- Tie every lesson to evidence.
- Prefer one strong instruction change over broad advice.
- Preserve the single-artifact contract of each stage.
- Do not recommend adding new artifacts unless they are embedded inside the stage's existing output.
