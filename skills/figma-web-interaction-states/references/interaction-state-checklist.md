# Interaction State Checklist

Use this for control-heavy Figma implementations.

## Controls

- Links have destination or clear placeholder behavior.
- Buttons have hover, focus, active, disabled, and loading where applicable.
- Icon-only buttons have accessible names.
- Focus rings are visible and not clipped.

## Forms

- Inputs have labels.
- Required, invalid, helper, success, and disabled states are represented when relevant.
- Submit handles loading, success, and failure.
- Keyboard submission and tab order work.

## Overlays

- Modal, drawer, popover, and menu open and close predictably.
- Escape closes dismissible overlays.
- Focus moves into modal dialogs and returns after close.
- Background scroll behavior is intentional.

## Stateful Components

- Tabs maintain selected state and keyboard basics.
- Carousels handle first, middle, and last items.
- Accordions expose expanded state.
- Steppers or segmented controls keep state source unified.

## Async And Edge States

- Loading, empty, error, permission denied, and offline states exist when users can encounter them.
- Error messages explain recovery when possible.

## Motion

- Motion has a purpose.
- Reduced-motion fallback exists for meaningful animation.
- Timers and event listeners clean up.
