# Plan: ContactSection Changes

## Task
Update `src/components/landing/ContactSection.vue` with two discrete modifications.

## Change A: Update CTA Button Text

**File:** `src/components/landing/ContactSection.vue`
**Line:** 12

**Current:**
```typescript
const ctaText = 'Quiero probar la Beta gratis'
```

**New:**
```typescript
const ctaText = 'Enviar Correo'
```

**Note:** `ctaHref` (line 13) remains unchanged.

## Change B: Add Pre-Text Before Google Form

**File:** `src/components/landing/ContactSection.vue`
**Insertion point:** Before the `<div data-reveal class="contact-form-wrapper">` element (currently line 44).

**Element to insert:**
```html
<p data-reveal class="contact-form-pretext">
  O bien deja tus datos y te contactamos:
</p>
```

This element should be placed immediately after the `<a>` CTA button (line 36–41) and before the `.contact-form-wrapper` div.

## Change B: Add Scoped CSS

**File:** `src/components/landing/ContactSection.vue`
**Insertion point:** After the `.contact-cta:hover` block and before the `.contact-form-wrapper` block (after line 97).

**CSS to insert:**
```css
.contact-form-pretext {
  font-size: 1rem;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 1rem;
}
```

## Verification Steps

1. Confirm `ctaText` value is `'Enviar Correo'`.
2. Confirm the new `<p>` element exists before `.contact-form-wrapper` with `data-reveal` and class `contact-form-pretext`.
3. Confirm scoped CSS rule `.contact-form-pretext` exists with appropriate styling.
4. No other modifications to the file.
