# Quality Finish Checklist

## Commands

- Run the nearest relevant lint command.
- Run typecheck when available.
- Run build or theme validation when available.
- Run focused tests touched by the change.
- Record skipped commands with exact reasons.

## Accessibility

- Semantic regions and headings are sensible.
- Controls have labels or accessible names.
- Keyboard navigation reaches important controls.
- Focus is visible.
- Text contrast has no obvious failures.
- Motion respects reduced-motion where meaningful.

## Performance

- Large images are compressed or intentionally large.
- Above-the-fold media has reasonable dimensions.
- Animation does not cause obvious jank.
- Long lists avoid unnecessary heavy rendering.
- Third-party or blocking scripts were not added casually.

## Cleanup

- Remove debug logs, temporary comments, unused imports, unused styles, and dead assets.
- Check for accidental broad selectors or `!important`.
- Review diff for unrelated edits.

## Final Summary

Include:

```txt
Changed:
Verified:
Browser Evidence:
Remaining Risks:
```
