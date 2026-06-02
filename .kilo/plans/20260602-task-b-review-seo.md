# Plan: Task B — Visual Review & Polish + SEO Improvements

**Date:** 2026-06-02
**TODO Reference:** `.agent/todos/20260602/20260602-todo-1.md` (Tasks 3 & 4)
**Global Plan:** `.kilo/plans/1780438189741-quiet-cabin.md`

---

## Analysis Summary

### Visual Review
All 10 landing sections + Navbar + Footer were reviewed against the style guide (`.agent/project-info/style-guide.md`) and the dark-first CSS variable system.

**Findings:**
1. **HeroSection CTA shadow uses hardcoded RGBA** instead of a CSS variable (`rgba(0, 123, 255, 0.35)`). This deviates from the project's variable system and will break if the primary color is ever changed.
2. **HeroSection secondary CTA missing `color` transition** — on hover the text color snaps to white instantly while the background fades smoothly (0.2s), creating a jarring visual effect.
3. **Navbar CTA buttons lack consistent border-radius and hover lift** — Hero and Contact CTAs use `border-radius: 8px` and `translateY(-2px)` on hover. Navbar CTAs use Bootstrap defaults (`~6px` radius, no lift), causing subtle inconsistency.
4. **Section alternation, typography, spacing, and card patterns** are otherwise consistent with the style guide. Semantic heading hierarchy (`h1` → `h2` → `h3`) is correct across all sections.

### SEO Review
**Current `index.html` status:**
- `<html lang="es">` ✅
- `<title>` present and adequate ("Cobranza App — Gestión de cobros simplificada") ✅
- `<meta name="description">` ❌ missing
- `<meta name="keywords">` ❌ missing
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:locale`) ❌ missing
- Semantic headings (`<h1>`, `<h2>`, `<h3>`) ✅ already implemented correctly in all sections
- `<main>` landmark ✅
- Images: no `<img>` tags; icons use `aria-hidden="true"` ✅
- Iframe `title` attribute ✅

**Note on `og:image`:** No OG image asset exists in the repository. The plan adds the `<meta>` tag with a placeholder path and documents this limitation for Task C.

---

## Implementation Steps

### Step 1: Fix HeroSection CTA hover styles
**File:** `src/components/landing/HeroSection.vue`

**Edit 1a — Primary CTA shadow (hardcoded rgba → CSS variable)**

Old:
```css
.hero-cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.35);
}
```

New:
```css
.hero-cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--bs-primary-rgb), 0.35);
}
```

Rationale: Aligns with the project's CSS variable system; ensures the shadow color updates automatically if the primary color changes.

**Edit 1b — Secondary CTA color transition**

Old:
```css
.hero-cta-secondary {
  border-radius: 8px;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}
```

New:
```css
.hero-cta-secondary {
  border-radius: 8px;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}
```

Rationale: Prevents text color from snapping to white on hover; matches the smooth 0.2s fade of the background.

---

### Step 2: Add Navbar CTA border-radius and hover lift
**File:** `src/components/landing/Navbar.vue`

Add the following to the bottom of `<style scoped>`:

```css
.navbar .btn-success {
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.navbar .btn-success:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(var(--bs-success-rgb), 0.35);
}
```

Rationale: Makes navbar CTA buttons visually consistent with Hero/Contact CTAs (same border-radius, subtle lift on hover) while using the accent (success) color variable for its shadow.

---

### Step 3: Add SEO meta tags to `index.html`
**File:** `index.html`

**Edit 3a — Insert meta description, keywords, and OG tags after viewport meta**

Old:
```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cobranza App — Gestión de cobros simplificada</title>
```

New:
```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Cobranza App es una plataforma web para gestionar cobros, deudas y conciliación de pagos de forma simple, ordenada y eficiente. Ideal para consorcios, inmobiliarias, profesionales y cualquier cobro recurrente." />
    <meta name="keywords" content="cobranza, gestión de cobros, deudas, pagos, conciliación bancaria, expensas, alquileres, honorarios, cuotas, SaaS, Argentina" />
    <meta property="og:title" content="Cobranza App — Gestión de cobros simplificada" />
    <meta property="og:description" content="Plataforma web para gestionar cobros, deudas y conciliación de pagos de forma simple y eficiente." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://cobranza-app.github.io/landing/" />
    <meta property="og:image" content="https://cobranza-app.github.io/landing/og-image.png" />
    <meta property="og:locale" content="es_AR" />
    <title>Cobranza App — Gestión de cobros simplificada</title>
```

Rationale: Adds essential SEO metadata and Open Graph tags for social sharing. All text is in neutral Spanish as required.

**Important note for implementer:** The `og:url` and `og:image` values above are placeholders based on the anticipated GitHub Pages deployment URL. These MUST be verified and updated during Task C (Deployment Preparation). No `og-image.png` asset currently exists — the tag will be non-functional until an image is created.

---

## Verification Checklist

- [ ] `HeroSection.vue` primary CTA hover shadow uses `rgba(var(--bs-primary-rgb), 0.35)`
- [ ] `HeroSection.vue` secondary CTA transition includes `color`
- [ ] `Navbar.vue` CTA buttons have `border-radius: 8px` and hover lift
- [ ] `index.html` contains `description`, `keywords`, `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:locale`
- [ ] No new images are added to the repository
- [ ] `npm run build` passes without errors
- [ ] Semantic heading hierarchy remains intact (no changes needed)

---

## Completeness Check against Original TODO

| TODO Requirement | Status in Plan |
|---|---|
| Review visual consistency (colors, typography, spacing) | ✅ Reviewed; 3 specific CSS fixes planned |
| Refine button styles, hover effects, and CTAs | ✅ 3 edits planned (Hero primary shadow, Hero secondary transition, Navbar CTA hover) |
| Update `index.html` with proper `<title>` | ✅ Verified adequate; no change needed |
| Meta description | ✅ Exact edit planned |
| Open Graph tags (og:title, og:description, og:image) | ✅ Exact edit planned (with limitation note) |
| Relevant keywords | ✅ Exact edit planned |
| Add semantic HTML headings (`<h1>`, `<h2>`, etc.) | ✅ Already complete across all sections; no edits needed |
| Ensure good page structure for SEO | ✅ Verified; `<main>` landmark and heading hierarchy are correct |
