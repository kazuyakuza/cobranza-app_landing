# Fix Plan: PricingSection.vue — Code Review Findings

## Issue #1: Spanish Content Deviation in exampleTitle

**Severity:** Low  
**Location:** `src/components/landing/PricingSection.vue`, line with `const exampleTitle = 'Ejemplo concreto'`  
**Rule violated:** Spanish content must match `landing-content.es.md` §7 exactly

**Current:**
```ts
const exampleTitle = 'Ejemplo concreto'
```

**Expected (per §7):**
```ts
const exampleTitle = 'Ejemplo'
```

The source content at §7 labels the example section as `"Ejemplo:"`. The implementation plan added the word "concreto" as a UX enhancement, but this deviates from the approved Spanish content. The word should be removed to match §7 exactly.

## Fix Steps

1. In `src/components/landing/PricingSection.vue`, change:
   - `const exampleTitle = 'Ejemplo concreto'` → `const exampleTitle = 'Ejemplo'`
2. Verify the `<h3>` rendering still looks correct (it will — shorter heading text is fine).
3. No other changes needed — all other content strings are exact matches.