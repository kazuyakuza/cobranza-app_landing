<script setup lang="ts">
import { useCaseExamples } from '@/data/use-cases'

const tabsTitle = 'Seleccioná tu caso'

function paneId(tabId: string): string {
  return `useCasePane-${tabId}`
}

function tabControlId(tabId: string): string {
  return `useCaseTab-${tabId}`
}
</script>

<template>
  <div data-reveal class="use-cases-tabs">
    <h3 class="use-cases-tabs-title">{{ tabsTitle }}</h3>

    <div class="use-cases-tabs-nav">
      <ul class="nav nav-tabs" role="tablist">
        <li
          v-for="(example, index) in useCaseExamples"
          :key="example.tabId"
          class="nav-item"
          role="presentation"
        >
          <button
            :id="tabControlId(example.tabId)"
            class="nav-link"
            :class="{ active: index === 0 }"
            type="button"
            role="tab"
            data-bs-toggle="tab"
            :data-bs-target="`#${paneId(example.tabId)}`"
            :aria-controls="paneId(example.tabId)"
            :aria-selected="index === 0"
          >
            {{ example.label }}
          </button>
        </li>
      </ul>
    </div>

    <div class="tab-content">
      <div
        v-for="(example, index) in useCaseExamples"
        :id="paneId(example.tabId)"
        :key="example.tabId"
        class="tab-pane fade"
        :class="{ 'show active': index === 0 }"
        role="tabpanel"
        :aria-labelledby="tabControlId(example.tabId)"
      >
        <div class="example-blocks">
          <div class="example-block example-block--habitual">
            <h4 class="example-block-label">
              <i class="bi bi-x-circle" aria-hidden="true"></i>
              Situación habitual
            </h4>
            <p class="example-block-text">{{ example.beforeText }}</p>
          </div>
          <div class="example-block example-block--cobranza">
            <h4 class="example-block-label">
              <i class="bi bi-check-circle" aria-hidden="true"></i>
              Con Cobranza App
            </h4>
            <p class="example-block-text">{{ example.afterText }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.use-cases-tabs {
  margin-top: 1rem;
}

.use-cases-tabs-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  line-height: 1.3;
}

.use-cases-tabs-nav {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1.5rem;
}

.nav-tabs {
  --bs-nav-tabs-link-active-color: var(--color-text-on-dark);
  --bs-nav-tabs-link-active-bg: var(--color-bg-card);
  --bs-nav-tabs-link-active-border-color: var(--color-border) var(--color-border)
    var(--color-bg-card);
  border-bottom-color: var(--color-border);
  flex-wrap: nowrap;
}

.nav-link {
  color: var(--color-text-on-dark-muted);
  border-color: transparent;
  white-space: nowrap;
  font-weight: 500;
}

.nav-link:hover {
  color: var(--color-text-on-dark);
  border-color: transparent;
  background: var(--color-bg-card);
}

.nav-tabs .nav-link.active {
  font-weight: 600;
}

.nav-link:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.5);
}

.tab-content {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-top: none;
  border-radius: 0 0 12px 12px;
  padding: 1.75rem;
}

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
  .use-cases-tabs-title {
    font-size: 1.25rem;
  }

  .nav-link {
    font-size: 0.9rem;
  }

  .tab-content {
    padding: 1.25rem;
  }

  .example-blocks {
    grid-template-columns: 1fr;
  }
}
</style>
