# Plan — Task 9: FaqSection — Allow multiple accordion items open simultaneously

## Overview
Remove the Bootstrap 5 `data-bs-parent` binding from the FAQ accordion so that clicking one item no longer auto-closes the others. This allows users to keep multiple FAQ answers expanded at the same time.

## Affected File
- `src/components/landing/FaqSection.vue`

## Change Detail

### Current code (inside `v-for` loop)
```vue
<div
  :id="'faqCollapse' + index"
  class="accordion-collapse collapse"
  :class="{ show: index === 0 }"
  :data-bs-parent="'#' + accordionId"
>
```

### New code
```vue
<div
  :id="'faqCollapse' + index"
  class="accordion-collapse collapse"
  :class="{ show: index === 0 }"
>
```

## Steps
1. Open `src/components/landing/FaqSection.vue`.
2. Locate the `.accordion-collapse` `div` inside the `v-for="(item, index) in faqItems"` loop.
3. Remove the line `:data-bs-parent="'#' + accordionId"`.
4. Ensure the `accordionId` variable declaration (`const accordionId = 'faqAccordion'`) remains, as it is still used for the parent container `:id`.
5. Save the file.

## Verification
- Build / dev server runs without errors.
- In the browser, open the FAQ section, click multiple accordion items — they should all stay open at the same time.

## Git
- Commit with message: `feat: allow multiple FAQ accordion items open simultaneously`
