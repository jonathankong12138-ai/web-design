# Example: Workflow Tool

## Starting Prompt

```text
Use prototype to design a browser-based tool for planning weekly content.

The user needs to collect ideas, rank them, assign channels, and export a weekly plan.
```

## Prototype Focus

The prototype should make the workflow clear:

1. Capture ideas.
2. Rank or score ideas.
3. Assign channels.
4. Review weekly plan.
5. Export or copy the plan.

It should include:

- Draft state.
- Empty board.
- Validation for missing channel/date.
- Confirmation after export.
- Recoverable error if export fails.

## Build Focus

The code should make the workflow usable:

- Persistent local state if appropriate.
- Clear editing and deletion behavior.
- No layout shift when cards change state.
- Keyboard-accessible controls.
- Responsive layout for laptop and mobile use.

## Check Focus

The adjustment checklist should prioritize:

- Broken task flow.
- Ambiguous states.
- Input validation gaps.
- Layout overflow.
- Controls that are hard to scan or operate.
