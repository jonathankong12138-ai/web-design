# Example: QA Checklist

This is the expected shape of the `check` artifact.

```md
# Adjustment Checklist

## Summary
The core flow works, but mobile layout and error-state handling need a build pass before review.

## Items

### WD-001: Mobile navigation hides the primary action
Severity: High
Evidence: 390x844 viewport; primary action is only visible after scrolling past the summary panel.
Expected: The prototype keeps the primary action visible in the first task area on mobile.
Actual: The action is pushed below secondary metadata.
Developer Instruction: Reorder the mobile layout so the primary action appears directly after the screen title and status summary.
Verification: Recheck 390x844 and 430x932 viewports.

### WD-002: Error state does not explain recovery
Severity: Medium
Evidence: Simulated failed request shows "Something went wrong" with no retry or next step.
Expected: The prototype includes a recoverable error with retry and preserved user input.
Actual: The implementation drops the input state and gives no recovery action.
Developer Instruction: Preserve the draft input and add retry plus secondary cancel action.
Verification: Trigger the failed request path and confirm draft state remains.

### WD-003: Table overflows on tablet width
Severity: Medium
Evidence: 768x1024 viewport; horizontal scroll appears on the page body.
Expected: The table adapts into a compact row layout without page-level horizontal scroll.
Actual: Fixed-width columns exceed the viewport.
Developer Instruction: Replace fixed column widths with responsive grid tracks and collapse lower-priority fields.
Verification: Confirm no page-level horizontal scroll at 768x1024.
```
