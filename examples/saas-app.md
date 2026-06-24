# Example: SaaS App

## Starting Prompt

```text
Use prototype to create a reviewable interaction prototype for a customer health dashboard.

Users are customer success managers. They need to see risky accounts, understand why an account is risky, and assign follow-up actions.
```

## Prototype Should Encode

- Dashboard overview.
- Risk scoring explanation.
- Account detail view.
- Task assignment flow.
- Empty state for no risky accounts.
- Error state for failed account data.
- Filter and sorting behavior.
- Permission assumptions if managers and admins differ.

## Build Should Implement

- Real navigation between overview and detail.
- Stable table/card layout.
- Responsive behavior for dense data.
- Realistic mock data.
- Interaction states for assigning tasks.
- Tests for core decision logic where practical.

## Check Should Look For

- Does the risk reason remain visible near the action?
- Can the user recover from empty/error states?
- Does the mobile layout preserve task priority?
- Are filters understandable and reversible?
- Does the implementation match the prototype's intended workflow?

## Retro Should Capture

Any repeated drift between dashboard information architecture and implementation structure.
