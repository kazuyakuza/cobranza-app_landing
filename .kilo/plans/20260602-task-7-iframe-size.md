# Plan: Dynamic Google Form Iframe Size for Mobile

## Overview
Modify `src/components/landing/ContactSection.vue` so the embedded Google Form iframe is fully visible on mobile devices by replacing the fixed aspect-ratio layout with a minimum-height-based layout.

## Current State
- Iframe has inline attributes `width="640" height="576"`.
- Wrapper `.contact-form-wrapper` uses `padding-top: 90%` to enforce a 9:10 aspect ratio.
- Iframe is absolutely positioned (`top: 0; left: 0; width: 100%; height: 100%`).
- On narrow mobile screens (e.g., 375 px wide), the computed height is ~338 px, which is too short for typical Google Forms content (~600–800 px).

## Approach
Replace the aspect-ratio trick with an explicit `min-height` so the iframe grows tall enough on all screen sizes. Remove the misleading inline dimensions.

## Steps

1. **Remove inline iframe dimensions**
   - File: `src/components/landing/ContactSection.vue`
   - In the `<iframe>` element, delete attributes `width="640"` and `height="576"`.
   - Keep all other attributes (`:src`, `frameborder`, `marginheight`, `marginwidth`, `title`).

2. **Update `.contact-form-wrapper` base styles**
   - Remove: `padding-top: 90%;`
   - Add: `min-height: 640px;`
   - Keep existing properties:
     - `position: relative;`
     - `width: 100%;`
     - `max-width: 640px;`
     - `margin: 0 auto 1rem;`
     - `background`, `border`, `border-radius`, `overflow`

3. **Keep iframe absolute positioning**
   - `.contact-form-wrapper iframe` should remain:
     - `position: absolute;`
     - `top: 0; left: 0;`
     - `width: 100%; height: 100%;`
     - `border: 0;`

4. **Add mobile override**
   - Inside the existing `@media (max-width: 767.98px)` block, add:
     ```css
     .contact-form-wrapper {
       min-height: 720px;
     }
     ```
   - This ensures extra room on small screens where the form is most likely to be cut off.

## Verification Criteria
- On a 375 px wide viewport, the iframe height is at least 720 px.
- On desktop (≥768 px), the iframe height is at least 640 px.
- The form content is no longer clipped vertically.
- No visual regressions in surrounding contact section layout.
