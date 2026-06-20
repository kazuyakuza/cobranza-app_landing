<script setup lang="ts">
import { useCaseExamples } from '@/data/use-cases'
import UseCaseComparison from '@/components/landing/UseCaseComparison.vue'

const tabsTitle = 'Seleccioná tu caso'
const mobileAccordionId = 'useCaseMobileAccordion'

function paneId(tabId: string): string {
  return `useCasePane-${tabId}`
}

function tabControlId(tabId: string): string {
  return `useCaseTab-${tabId}`
}

function mobileCollapseId(tabId: string): string {
  return `useCaseMobileCollapse-${tabId}`
}
</script>

<template>
  <div data-reveal class="use-cases-tabs">
    <h3 class="use-cases-tabs-title">{{ tabsTitle }}</h3>

    <div class="d-none d-md-block">
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
          <UseCaseComparison :example="example" />
        </div>
      </div>
    </div>

    <div :id="mobileAccordionId" class="accordion d-md-none">
      <div
        v-for="(example, index) in useCaseExamples"
        :key="example.tabId"
        class="accordion-item use-case-mobile-item"
      >
        <h4 class="accordion-header">
          <button
            class="accordion-button use-case-mobile-button"
            :class="{ collapsed: index !== 0 }"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#${mobileCollapseId(example.tabId)}`"
            :aria-expanded="index === 0"
            :aria-controls="mobileCollapseId(example.tabId)"
          >
            {{ example.label }}
          </button>
        </h4>
        <div
          :id="mobileCollapseId(example.tabId)"
          class="accordion-collapse collapse"
          :class="{ show: index === 0 }"
          :data-bs-parent="`#${mobileAccordionId}`"
        >
          <div class="accordion-body use-case-mobile-body">
            <UseCaseComparison :example="example" />
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

.use-case-mobile-item {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.use-case-mobile-item:last-of-type {
  margin-bottom: 0;
}

.use-case-mobile-button {
  background: var(--color-bg-card);
  color: var(--color-text-on-dark);
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 1.25rem;
}

.use-case-mobile-button:not(.collapsed) {
  background: var(--color-bg-card-alt);
  box-shadow: none;
}

.use-case-mobile-button::after {
  filter: brightness(0) invert(0.85);
}

.use-case-mobile-button:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.5);
}

.use-case-mobile-body {
  padding: 0 1.25rem 1.25rem;
  background: var(--color-bg-card);
}

@media (max-width: 767.98px) {
  .use-cases-tabs-title {
    font-size: 1.25rem;
  }

  .tab-content {
    padding: 1.25rem;
  }
}
</style>
