<!-- Nested accordion rendering a FAQ group with its collapsible question-answer items. -->
<script setup lang="ts">
import type { FaqGroup } from '@/types/faq'

const props = defineProps<{ group: FaqGroup; outerParentId: string }>()

function groupCollapseId(accordionId: string): string {
  return `${accordionId}GroupCollapse`
}

function questionCollapseId(accordionId: string, index: number): string {
  return `${accordionId}Collapse${index}`
}

function isGroupOpen(): boolean {
  return props.group.variant === 'general'
}
</script>

<template>
  <div :class="[`faq-group-item--${group.variant}`, 'accordion-item faq-group-item']">
    <h3 class="accordion-header">
      <button
        class="accordion-button faq-group-button"
        :class="{ collapsed: !isGroupOpen() }"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#${groupCollapseId(group.accordionId)}`"
        :aria-expanded="isGroupOpen()"
        :aria-controls="groupCollapseId(group.accordionId)"
      >
        {{ group.title }}
      </button>
    </h3>
    <div
      :id="groupCollapseId(group.accordionId)"
      class="accordion-collapse collapse"
      :class="{ show: isGroupOpen() }"
      :data-bs-parent="`#${outerParentId}`"
    >
      <div class="accordion-body faq-group-body">
        <div :id="group.accordionId" class="accordion">
          <div
            v-for="(item, index) in group.faqs"
            :key="item.question"
            class="accordion-item faq-question-item"
          >
            <h4 class="accordion-header">
              <button
                class="accordion-button faq-question-button"
                :class="{ collapsed: index !== 0 }"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#${questionCollapseId(group.accordionId, index)}`"
                :aria-expanded="index === 0"
                :aria-controls="questionCollapseId(group.accordionId, index)"
              >
                {{ item.question }}
              </button>
            </h4>
            <div
              :id="questionCollapseId(group.accordionId, index)"
              class="accordion-collapse collapse"
              :class="{ show: index === 0 }"
              :data-bs-parent="`#${group.accordionId}`"
            >
              <div class="accordion-body faq-answer-body">
                <p class="faq-answer">{{ item.answer }}</p>
                <p v-if="item.note" class="faq-note">{{ item.note }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-group-item {
  border-left: 4px solid var(--group-color);
  border-radius: 0 8px 8px 0;
  overflow: hidden;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  margin-bottom: 1rem;
}

.faq-group-item:last-of-type {
  margin-bottom: 0;
}

.faq-group-item--general {
  --group-color: var(--color-primary);
}
.faq-group-item--company {
  --group-color: var(--color-accent);
}
.faq-group-item--user {
  --group-color: var(--color-primary);
}
.faq-group-item--conciliation {
  --group-color: var(--color-accent);
}

.faq-group-button {
  background: var(--color-bg-card);
  color: var(--color-text-on-dark);
  font-size: 1.25rem;
  font-weight: 600;
  padding: 1.25rem 1.5rem;
}

.faq-group-button:not(.collapsed) {
  background: var(--color-bg-card-alt);
  box-shadow: none;
}

.faq-group-button::after,
.faq-question-button::after {
  filter: brightness(0) invert(0.85);
}

.faq-group-button:focus,
.faq-question-button:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.5);
  border-color: var(--color-primary);
}

.faq-group-body {
  padding: 0.5rem 1rem 1rem;
  background: var(--color-bg-card);
}

.faq-question-item {
  background: var(--color-bg-card-alt);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 0.6rem;
  overflow: hidden;
}

.faq-question-item:last-of-type {
  margin-bottom: 0;
}

.faq-question-button {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark);
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 1.25rem;
}

.faq-answer-body {
  color: var(--color-text-on-dark-muted);
  font-size: 1rem;
  line-height: 1.6;
  padding: 0.75rem 1.25rem 1rem;
}

.faq-answer {
  margin: 0;
}

.faq-note {
  margin: 1rem 0 0;
  padding: 0.75rem 1rem;
  background: var(--color-bg-card);
  border-left: 2px solid var(--group-color);
  border-radius: 6px;
  font-style: italic;
  font-size: 0.9375rem;
  color: var(--color-text-on-dark-muted);
}

@media (max-width: 767.98px) {
  .faq-group-button {
    font-size: 1.125rem;
    padding: 1rem 1.25rem;
  }

  .faq-question-button {
    font-size: 0.9375rem;
    padding: 0.875rem 1rem;
  }

  .faq-answer-body {
    font-size: 0.9375rem;
    padding: 0.625rem 1rem 0.875rem;
  }

  .faq-note {
    font-size: 0.875rem;
  }
}
</style>
