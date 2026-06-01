# ContactSection.vue Implementation Plan

## Objective
Overwrite the stub `src/components/landing/ContactSection.vue` with a fully implemented contact section that displays a clear heading, visible email, a prominent CTA button, an embedded responsive Google Form iframe, and a notice about Google Sheets integration. The section must follow the project's dark-first design system, use CSS variables exclusively, and integrate scroll-reveal animations.

---

## 1. Component Structure

The template is organised into a single centred Bootstrap column containing four semantic groups:

1. **Header group** — section title (`<h2>`) + subtitle (`<p>`).
2. **Contact info group** — email label + clickable `mailto:` link.
3. **CTA action** — primary button styled as a `mailto:` link to the contact email.
4. **Form group** — responsive iframe wrapper with the embedded Google Form + a small notice paragraph below it.

All text is centred (`text-center`). The section retains `id="contact"` from the existing stub for navbar anchor navigation.

---

## 2. Props / Emits

None. This is a standalone presentational section component with no external inputs or events.

---

## 3. TypeScript Data Declarations

Inside `<script setup lang="ts">`:

- Import `useScrollReveal` from `@/composables/useScrollReveal` and invoke it immediately.
- Declare the following reactive constants (all `const`):

| Constant | Value | Purpose |
|---|---|---|
| `sectionTitle` | `'¿Listo para probar Cobranza App?'` | Main heading. |
| `sectionSubtitle` | `'Dejanos tu consulta o solicitud de acceso. Respondemos a la brevedad.'` | Supporting line below the title. |
| `contactEmail` | `'cobranza360pro@gmail.com'` | Visible contact address. |
| `emailLabel` | `'Email de contacto:'` | Label preceding the email link. |
| `ctaText` | `'Quiero probar la Beta gratis'` | Button text (reuses HeroSection primary CTA wording). |
| `ctaHref` | `'mailto:cobranza360pro@gmail.com?subject=Solicitud%20de%20acceso%20a%20la%20Beta'` | Mailto URI for the CTA button. |
| `googleFormUrl` | `'https://docs.google.com/forms/d/e/1FAIpQLSfrzXRY9nH9iQ6o2lyXvrZw_B8WxKGekqDzaG5JRRzTM0tGXQ/viewform?embedded=true'` | Embedded form source. |
| `formNotice` | `'Tus respuestas se guardan automáticamente en Google Sheets.'` | Disclaimer below the form. |

No interfaces or complex types are required because all data is scalar.

---

## 4. HTML Template Structure

```vue
<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 text-center">

          <h2 data-reveal class="contact-title">
            {{ sectionTitle }}
          </h2>

          <p data-reveal class="contact-subtitle">
            {{ sectionSubtitle }}
          </p>

          <div data-reveal class="contact-email-wrapper">
            <span class="contact-email-label">{{ emailLabel }}</span>
            <a :href="'mailto:' + contactEmail" class="contact-email-link">
              {{ contactEmail }}
            </a>
          </div>

          <a
            data-reveal
            :href="ctaHref"
            class="btn btn-primary btn-lg px-4 py-3 fw-semibold contact-cta"
          >
            {{ ctaText }}
          </a>

          <div data-reveal class="contact-form-wrapper">
            <iframe
              :src="googleFormUrl"
              width="640"
              height="576"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              title="Formulario de contacto"
            >
              Loading…
            </iframe>
          </div>

          <p data-reveal class="contact-form-notice">
            {{ formNotice }}
          </p>

        </div>
      </div>
    </div>
  </section>
</template>
```

**Notes on the template:**
- Every visual block carries `data-reveal` so the scroll-reveal composable animates it.
- The CTA is an `<a>` tag with Bootstrap `.btn.btn-primary.btn-lg` classes, making it a large, prominent button that triggers the user's mail client.
- The iframe preserves the exact attributes provided in the task, plus an added `title` for accessibility.

---

## 5. Scoped CSS Styles

```vue
<style scoped>
.contact-section {
  background: var(--color-bg-dark);
  color: var(--color-text-on-dark);
}

.contact-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.25;
  color: var(--color-text-on-dark);
}

.contact-subtitle {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--color-text-on-dark-muted);
}

.contact-email-wrapper {
  margin-bottom: 1.5rem;
}

.contact-email-label {
  display: block;
  font-size: 1rem;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 0.25rem;
}

.contact-email-link {
  font-size: 1.125rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.contact-email-link:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

.contact-cta {
  display: inline-block;
  border-radius: 8px;
  margin-bottom: 2.5rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.contact-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.35);
}

.contact-form-wrapper {
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto 1rem;
  padding-top: 90%;           /* 576 / 640 aspect ratio */
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
}

.contact-form-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.contact-form-notice {
  font-size: 0.875rem;
  color: var(--color-text-on-dark-dim);
  margin-bottom: 0;
}

@media (max-width: 767.98px) {
  .contact-title {
    font-size: 1.75rem;
  }

  .contact-subtitle {
    font-size: 1rem;
  }
}
</style>
```

**Styling rationale:**
- Background and text colours use CSS custom properties only; no hard-coded hex values.
- Title and subtitle sizes follow the style-guide scale (`2.25rem` / `1.125rem`).
- The CTA hover effect replicates the established HeroSection pattern: `translateY(-2px)` + blue shadow.
- The iframe wrapper uses the "padding-top percentage" technique (`90%` = 576/640) to keep the form responsive while preserving its native aspect ratio. `max-width: 640px` prevents it from growing beyond the intended desktop size.
- The wrapper has `background: var(--color-bg-card)` so the reserved area is visually stable while the iframe loads; no flash of white or transparent gap.

---

## 6. Content Mapping from `landing-content.es.md`

| UI Element | Source |
|---|---|
| `sectionTitle` | TODO requirement (example text); not present in §10 Contacto because that section only contains `[completar]`. |
| `sectionSubtitle` | Derived from project context to encourage engagement; not explicitly defined in the content file. |
| `emailLabel` | §10 Contacto heading text: **"Email de contacto:"** |
| `contactEmail` | TODO requirement (`cobranza360pro@gmail.com`); replaces the `[completar]` placeholder in §10. |
| `ctaText` | Reuses the primary Hero CTA from §1: **"Quiero probar la Beta gratis"** for consistency across the page. |
| `formNotice` | TODO requirement; additional trust copy not present in the content file. Written in neutral Spanish. |

---

## 7. Edge Cases

### 7.1 Iframe Loading Fallback
- The iframe tag contains the text node `Loading…`. Browsers that do not support `<iframe>` will display this fallback text.
- The `.contact-form-wrapper` container has a solid dark card background (`--color-bg-card`) and a border, so the layout does not collapse or show a white rectangle while the iframe is fetching.

### 7.2 Mobile Responsiveness
- The Bootstrap grid (`col-12 col-md-10 col-lg-8`) ensures the content column is full-width on small screens and constrained on desktop.
- The iframe wrapper uses `width: 100%` + `max-width: 640px` + `padding-top: 90%`, which makes the form scale down proportionally on narrow viewports instead of overflowing horizontally.
- The CTA button uses Bootstrap `.btn-lg`; it will naturally wrap if the viewport is extremely narrow.
- Title size drops from `2.25rem` to `1.75rem` below `767.98px`.

### 7.3 Mailto Link Unavailability
- If the user's device lacks a default email client, the `mailto:` link may be ineffective. Mitigation: the raw email address is rendered as a visible, clickable link, and the embedded Google Form provides an alternative contact path.

---

## 8. Exact File to Modify

**File:** `src/components/landing/ContactSection.vue`

**Action:** Overwrite the entire 14-line stub with the complete component code described in sections 3–5 of this plan.

**Verification checklist for the implementer:**
1. `id="contact"` is present on the root `<section>`.
2. `useScrollReveal()` is imported and called.
3. All colours reference CSS custom properties (e.g. `--color-bg-dark`, `--color-text-on-dark`, `--color-primary`).
4. The iframe `src` matches the exact URL provided in the TODO.
5. The visible email reads `cobranza360pro@gmail.com`.
6. The Google Sheets notice is visible below the form.
7. No hard-coded hex values exist in the scoped styles.
8. Component file stays under 200 lines (estimated ~140 lines).
