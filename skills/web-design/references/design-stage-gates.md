# Design Stage Gates

Use these gates before sending design work to build.

## Ready For Build: Yes

Use when:

- Source and scope are clear.
- Desktop and mobile behavior exists or is explicitly inferable.
- Main page structure and repeated components are clear.
- Core content, assets, states, and interactions are supplied.
- Prototype conflicts are resolved.
- Remaining assumptions are minor and documented.

## Ready For Build: Conditional

Use when:

- No blocker remains.
- Development can proceed with explicit assumptions.
- Missing details do not change core product behavior.
- Build entry notes carry all assumptions and risks.

Common conditional examples:

- Tablet inherits mobile navigation and desktop media ratio.
- Buttons use existing project hover/focus states.
- Placeholder copy is allowed for non-critical content.
- Existing EmptyState component may be used.

## Ready For Build: No

Use when:

- Target frames or scope are unclear.
- Only static visuals exist for a flow that requires interaction decisions.
- Mobile behavior cannot be inferred.
- Key assets are not exportable and no fallback is approved.
- Core states for forms, purchase, auth, permissions, or destructive actions are missing.
- Prototype and design conflict without a decision.

## Build Entry Notes

When ready or conditional, pass this shape to build:

```txt
Design Source:
Build Scope:
Frames:
Responsive Notes:
States:
Assets:
Developer-Allowed Assumptions:
Risks:
Recommended Build Path:
```
