---
name: prototype
description: "Create or refine the Web Design requirements artifact: a runnable, reviewable interactive prototype. Use when a product idea, PRD, feature request, user story, customer feedback, workflow, or vague web-app brief must become a clearer prototype before development. Use PM discovery, assumption, story, and test-scenario methods only to improve the prototype, not to output separate PRDs, discovery plans, stories, or test documents."
---

# Prototype

Turn product intent into the only requirements-stage artifact: an interactive prototype that another agent can build and test against.

## Output Contract

The only deliverable is the prototype. It may include source files, runnable app state, embedded notes, review comments, exported JSON, or a local URL if the prototype tool supports them.

Do not deliver separate PRDs, discovery plans, roadmaps, user-story documents, test plans, or strategy memos. Use those methods internally and fold the useful parts into prototype screens, flows, states, labels, comments, and acceptance notes.

## Workflow

1. Clarify only blocking gaps. Ask one focused question at a time when the prototype would otherwise encode a risky assumption.
2. Convert the request into user goals, target users, primary jobs, and non-goals. Keep this as working context, not as a separate output.
3. Stress-test the idea with discovery methods: divergent options, risky assumptions, opportunity-solution mapping, feature-request themes, job stories, and edge cases.
4. Decide what the prototype must make visible: core paths, alternate paths, empty states, loading states, errors, permissions, destructive actions, and unresolved questions.
5. Build or refine a runnable low-fidelity prototype. Prefer the existing project and conventions when one exists; otherwise create a small browser-only prototype.
6. Verify that a developer can infer behavior from the prototype without a separate PRD.
7. Final response: provide only the prototype location, run command or URL, and any essential review instruction needed to open it.

## Prototype Requirements

- Express behavior through interaction, not prose.
- Include realistic page inventory and navigation.
- Include expected state transitions and user feedback.
- Include important constraints as inline comments or review notes inside the prototype.
- Include acceptance cues where they help development and testing.
- Include unresolved questions in the prototype review surface, not in a standalone document.
- Keep the prototype low-fidelity unless the user explicitly requests visual polish.

## Method Sources

Use product-discovery methods from PM workflows to improve the prototype: ideation, assumption mapping, opportunity-solution trees, feature prioritization, user stories, job stories, and test scenarios.

Use engineering-spec methods to make the prototype buildable: explicit scope, non-goals, acceptance criteria, edge cases, and dependency assumptions.

All method outputs are intermediate reasoning. The prototype is the artifact.
