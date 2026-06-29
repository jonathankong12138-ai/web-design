# Philosophy

Web Design is built for senior designers who want to become independent web product builders.

The working assumption is simple: a strong designer can own more than visual direction. With AI support, the designer can own product framing, interaction structure, design handoff quality, implementation quality, QA critique, and workflow improvement.

## Handoffs Are Friction

Most web projects slow down at translation points:

- Product intent becomes a PRD.
- PRD becomes wireframes.
- Wireframes become visual design.
- Visual design becomes frontend tickets.
- Frontend output becomes QA feedback.
- QA feedback becomes another implementation pass.

Each handoff loses context. Each role has to reconstruct intent.

Web Design reduces that loss by making each stage produce the next stage's usable artifact:

```text
prototype
  -> web-design
  -> build or figma-web-build
  -> check
  -> retro
```

## Design Is A Gate, Not A Guessing Game

The design stage exists to protect development from unclear handoff material.

`web-design` prepares the handoff. `web-design-handoff-review` decides whether the design is ready, conditionally ready, or not ready for build. If the design is incomplete, the loop stays in design instead of asking development to invent missing product behavior, responsive logic, assets, or interaction states.

This keeps build work focused on code while still allowing explicit `Developer-Allowed Assumptions` when ambiguity is small enough to proceed.

## Figma-To-Web Is Development, Not Documentation

Figma and screenshots are not automatically implementation instructions. They need translation into page structure, tokens, assets, states, responsive behavior, repository patterns, and browser evidence.

That is why `figma-web-build` coordinates a chain of smaller skills:

```text
design analysis
  -> repo analysis
  -> implementation map
  -> code implementation
  -> interaction states
  -> visual alignment
  -> browser verification
  -> quality finish
```

The goal of that chain is still working code, not another design report.

## The Designer Becomes The Integrator

The designer does not need to become a full-time PM, engineer, QA, or process coach. The designer needs enough structured leverage to replace brittle handoffs with stage artifacts.

That means:

- Ask product questions only when they improve the prototype.
- Prepare design handoff only when it lets development build with less guessing.
- Write code only to make the prototype or design real.
- Test only to give development a clearer adjustment list.
- Reflect only to upgrade the next run.

The goal is not more output. The goal is less translation.

## Independent Does Not Mean Isolated

This workflow does not reject collaboration. It changes the default unit of work.

Instead of waiting for upstream clarity or downstream execution, the designer brings a complete artifact to the conversation: a prototype, design handoff, code, checklist, or skill upgrade guide.

That makes collaboration more concrete and less dependent on interpretation.
