# Implementation Plan — Task 1: Problem Section Component

**Date**: 2026-05-28  
**TODO File**: `.agent/todos/20260521/20260521-todo-1.md`  
**Task**: Create Problem Section Component (Task 1 of 4)  

---

## 1. High-Level Approach

Replace the existing `ProblemSection.vue` stub with the full implementation following patterns from `HeroSection.vue` and the style guide. The component will display a large emotional question as the title, a body paragraph explaining the problem context, a visually impactful list of pain points, and a bold closing statement — all styled per the dark-first design system.

### Design Strategy
- **Emotional contrast**: Large bold question title creates immediate impact. Pain points use Bootstrap Icons paired with a warning-style list container to visually reinforce friction/pain.
- **Content flow**: Title → context paragraph → pain point grid → closing emphasis statement. Follows a natural reading pattern: hook → context → specifics → emotional punch.
- **Visual treatment**: Background `--color-bg-dark` per alternation table. Pain point items wrapped in a `.dark-card`-pattern container with left-accented items using `--color-border` borders and `--color-text-on-dark-dim` icons.
- **Responsive**: Single-column stack on mobile, two-column pain point grid on `md+`.

---

## 2. File Changes

### 2.1 `src/components/landing/ProblemSection.vue` — Full Rewrite

**Path**: `src/components/landing/ProblemSection.vue`  
**Action**: Replace entire file content (currently 14-line stub)

#### 2.1.1 Script Block

```vue
<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

const sectionTitle =
  '¿Cuántas horas por mes dedicás a gestionar cobros y seguimiento de pagos?'

const bodyParagraph =
  'En muchos negocios (expensas, alquileres, honorarios, cuotas, etc.) el monto a cobrar varía mes a mes. Esto genera una carga constante de consultas, recordatorios y seguimientos.'

interface PainPoint {
  icon: string
  text: string
}

const painPoints: PainPoint[] = [
  {
    icon: 'bi-chat-dots',
    text: 'Buscar comprobantes entre WhatsApp, correo y chats',
  },
  {
    icon: 'bi-check2-circle',
    text: 'Verificar que las transferencias correspondan a las deudas correctas',
  },
  {
    icon: 'bi-journal-text',
    text: 'Conciliar manualmente con los extractos bancarios',
  },
  {
    icon: 'bi-person-x',
    text: 'Resolver confusiones y reclamos de clientes',
  },
]

const closingStatement =
  'Todo esto genera pérdida de tiempo, errores y estrés innecesario.'
</script>
```

#### 2.1.2 Template Block

```vue
<template>
  <section id="problem" class="problem-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="problem-title">
            {{ sectionTitle }}
          </h2>

          <p data-reveal class="problem-body">
            {{ bodyParagraph }}
          </p>

          <div data-reveal class="pain-points-wrapper">
            <ul class="pain-points-list list-unstyled row g-4">
              <li
                v-for="point in painPoints"
                :key="point.text"
                class="pain-point-item col-12 col-md-6"
              >
                <div class="pain-point-content dark-card">
                  <i
                    :class="point.icon"
                    class="pain-point-icon"
                    aria-hidden="true"
                  ></i>
                  <span class="pain-point-text">{{ point.text }}</span>
                </div>
              </li>
            </ul>
          </div>

          <p data-reveal class="problem-closing">
            {{ closingStatement }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
```

#### 2.1.3 Style Block

```vue
<style scoped>
.problem-section {
  background: var(--color-bg-dark);
  color: var(--color-text-on-dark);
}

.problem-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}

.problem-body {
  font-size: 1.125rem;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 2.5rem;
  line-height: 1.65;
}

.pain-points-wrapper {
  margin-bottom: 2.5rem;
}

.pain-points-list {
  margin-bottom: 0;
}

.pain-point-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.pain-point-icon {
  font-size: 1.4rem;
  color: var(--color-text-on-dark-dim);
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.pain-point-text {
  font-size: 1rem;
  line-height: 1.55;
}

.problem-closing {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-on-dark);
  line-height: 1.65;
}

@media (max-width: 767.98px) {
  .problem-title {
    font-size: 1.75rem;
  }

  .problem-body,
  .problem-closing {
    font-size: 1rem;
  }
}
</style>
```

---

## 3. Design Decisions & Rationale

| Decision | Rationale |
|---|---|
| Pain points as 2-column grid (`col-md-6`) | Balances readability (not too wide) with space efficiency |
| `.dark-card` pattern for each pain point | Reuses existing design token; elevated surface distinguishes pain points from body text |
| `bi-chat-dots`, `bi-check2-circle`, `bi-journal-text`, `bi-person-x` icons | Each icon semantically maps to its pain point: chat → messaging, check → verification, journal → manual work, person-x → complaints |
| Icons in `--color-text-on-dark-dim` | Muted color keeps focus on text; avoids introducing warning colors outside palette |
| Bold closing statement (`fw-bold`) | Creates emotional punch after listing pain points; emphasizes "pérdida de tiempo, errores y estrés" |
| No scroll-to-section JS — inherited from Navbar links | Navbar already has `scrollToSection('problem')` wired; component needs no routing logic |
| `useScrollReveal()` called in `<script setup>` | Enables `data-reveal` attributes on title, body, pain points, closing — each reveals once on scroll |
| Responsive title: `1.75rem` at mobile | Preserves impact while fitting smaller screens; follows same pattern as HeroSection |
| Text constants declared in `<script setup>` | Follows HeroSection pattern; self-documenting; enables future i18n |
| `PainPoint` interface inline | Small scope — no need for a separate types file yet; follows `max-arguments-per-method` and modular design rules |
| No hardcoded hex values | All colors reference CSS variables per style guide rule AI-1 |

---

## 4. Content Mapping (Spanish Text → Component)

| Content Field | Spanish Text |
|---|---|
| `sectionTitle` | ¿Cuántas horas por mes dedicás a gestionar cobros y seguimiento de pagos? |
| `bodyParagraph` | En muchos negocios (expensas, alquileres, honorarios, cuotas, etc.) el monto a cobrar varía mes a mes. Esto genera una carga constante de consultas, recordatorios y seguimientos. |
| `painPoints[0]` | Buscar comprobantes entre WhatsApp, correo y chats |
| `painPoints[1]` | Verificar que las transferencias correspondan a las deudas correctas |
| `painPoints[2]` | Conciliar manualmente con los extractos bancarios |
| `painPoints[3]` | Resolver confusiones y reclamos de clientes |
| `closingStatement` | Todo esto genera pérdida de tiempo, errores y estrés innecesario. |

---

## 5. Bootstrap 5 / Bootstrap Icons Usage

| Element | Bootstrap Utility / Component |
|---|---|
| Layout container | `container` |
| Row/column grid | `row justify-content-center`, `col-12 col-md-10 col-lg-9` |
| Pain point grid | `row g-4`, `col-12 col-md-6` |
| Pain point card | `.dark-card` class (from `base.css`) |
| Unstyled list | `list-unstyled` |
| Icons | Bootstrap Icons: `bi-chat-dots`, `bi-check2-circle`, `bi-journal-text`, `bi-person-x` |

---

## 6. CSS Variables Referenced

| Variable | Where Used |
|---|---|
| `--color-bg-dark` | Section background |
| `--color-text-on-dark` | Title, pain point text, closing statement |
| `--color-text-on-dark-muted` | Body paragraph |
| `--color-text-on-dark-dim` | Pain point icons |

Variables defined in `src/assets/styles/variables.css` line 7 (`--color-bg-dark`), lines 21–23 (text variables).

---

## 7. Scroll Reveal Integration

| Element | `data-reveal` Attribute |
|---|---|
| Section title (`h2`) | Yes |
| Body paragraph (`p.problem-body`) | Yes |
| Pain points wrapper (`div.pain-points-wrapper`) | Yes — reveals entire grid at once |
| Closing statement (`p.problem-closing`) | Yes |

`useScrollReveal()` is called in `<script setup>`. The composable (from `src/composables/useScrollReveal.ts`) uses `IntersectionObserver` with `threshold: 0.15`. Each element gets `.reveal-on-scroll` class added on mount; `.is-visible` is toggled on intersection. Elements are unobserved after first reveal.

---

## 8. Responsive Design

| Breakpoint | Behavior |
|---|---|
| Desktop (`≥992px`) | Content centered in 9/12 column width. Pain points in 2-column grid. Title at `2.25rem`. |
| Tablet (`768–991px`) | Content in 10/12 column width. Pain points still 2-column. Title at `2.25rem`. |
| Mobile (`<768px`) | Full width (`col-12`). Pain points stack single-column. Title shrinks to `1.75rem`. Body/closing text to `1rem`. |

Media query pattern follows HeroSection: `@media (max-width: 767.98px)`.

---

## 9. Line Count Estimate

| Block | Lines |
|---|---|
| `<script setup>` (with blank lines) | ~26 |
| `<template>` (with blank lines) | ~38 |
| `<style scoped>` (with blank lines) | ~52 |
| **Total** | **~116 lines** |

Within the 200-line max (and ~125-line substantive code guideline).

---

## 10. Expected Section Appearance in Page Flow

```
[Navbar — fixed, dark glass-morphism]
[HeroSection — id="hero", navy gradient, full-viewport]
[ProblemSection — id="problem", --color-bg-dark]     ← THIS COMPONENT
[SolutionSection — id="solution", --color-bg-navy]    ← Task 2 (NOT in scope)
...
```

Navbar link "El Problema" → scrolls to `#problem` (already wired in Navbar.vue line 11).

---

## 11. Verification Checklist

- [ ] Component renders with correct Spanish content matching `landing-content.es.md` Section 2 exactly
- [ ] Section has `id="problem"` for navbar scroll targeting
- [ ] Background is `var(--color-bg-dark)` — no hex values
- [ ] All `data-reveal` elements animate on scroll
- [ ] Pain points use Bootstrap Icons (bi-chat-dots, bi-check2-circle, bi-journal-text, bi-person-x)
- [ ] `.dark-card` pattern applied to pain point items
- [ ] Responsive: 2-column grid on desktop, single-column on mobile
- [ ] Typography: title 2.25rem/700, body 1.125rem/400, closing 1.125rem/600, pain items 1rem/400
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Vite build succeeds
- [ ] File under 200 lines (excl. blanks/comments)

---

## 12. Out of Scope (for Task 1 only)

- SolutionSection component (Task 2)
- App.vue integration changes (Task 3) — ProblemSection already imported and placed in App.vue
- SolutionSection stub replacement
- Any other landing page sections
- Styling/polish pass (Task 4)
- Unit tests (no test suite configured in project)
