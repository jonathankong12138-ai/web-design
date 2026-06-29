# Visual Alignment Ledger

Use a small ledger when fixing repeated visual QA issues on the same page.

```txt
Module:
Viewport:
State / slide / breakpoint:
Baseline:
Visible issue:
Measured actual:
Expected constraint:
Responsible file / rule:
Patch:
Verification:
Regression surface checked:
Remaining difference:
```

## Common Mappings

- Spacing: measure rendered distance between boxes; adjust the responsible `gap`, `padding`, `margin`, grid track, or section rhythm.
- Typography: align `font-size`, `line-height`, `font-weight`, width, wrapping, and text transform together.
- Media fit: adjust container dimensions and `object-fit` / `object-position` together.
- Section height: measure content bottom, controls, and section bottom before changing min-height or padding.
- Controls: fix group width, alignment, gap, icon size, and hit area before patching individual labels.
- Overflow: inspect the widest child, fixed widths, transforms, offscreen controls, and viewport units.
- Responsive drift: verify the changed breakpoint and at least one adjacent breakpoint.

Avoid using hidden duplicate DOM as the primary fix unless the existing codebase already uses that approach for the same component.
