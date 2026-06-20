<!-- Before/after comparison blocks showing a use case's habitual situation vs. using Cobranza App. -->
<script setup lang="ts">
import type { UseCaseExample } from '@/types/use-cases'

defineProps<{ example: UseCaseExample }>()

const habitualLabel = 'Situación habitual'
const cobranzaLabel = 'Con Cobranza App'
</script>

<template>
  <div class="example-blocks">
    <div class="example-block example-block--habitual">
      <h4 class="example-block-label">
        <i class="bi bi-x-circle" aria-hidden="true"></i>
        {{ habitualLabel }}
      </h4>
      <p class="example-block-text">{{ example.beforeText }}</p>
    </div>
    <div class="example-block example-block--cobranza">
      <h4 class="example-block-label">
        <i class="bi bi-check-circle" aria-hidden="true"></i>
        {{ cobranzaLabel }}
      </h4>
      <p class="example-block-text">{{ example.afterText }}</p>
    </div>
  </div>
</template>

<style scoped>
.example-blocks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.example-block {
  padding: 1.25rem;
  border-radius: 8px;
  background: var(--color-bg-card-alt);
  border: 1px solid var(--color-border);
}

.example-block--habitual {
  border-left: 3px solid var(--color-pain);
}

.example-block--cobranza {
  border-left: 3px solid var(--color-accent);
}

.example-block-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.example-block--habitual .example-block-label {
  color: var(--color-pain);
}

.example-block--cobranza .example-block-label {
  color: var(--color-accent);
}

.example-block-text {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0;
  color: var(--color-text-on-dark);
}

@media (max-width: 767.98px) {
  .example-blocks {
    grid-template-columns: 1fr;
  }
}
</style>
