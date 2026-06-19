<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { faqGroups } from '@/data/faq'

useScrollReveal()

const sectionTitle = 'Preguntas Frecuentes'

function collapseId(accordionId: string, index: number): string {
  return `${accordionId}Collapse${index}`
}
</script>

<template>
  <section id="faq" class="faq-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="faq-title">{{ sectionTitle }}</h2>

          <div class="faq-groups">
            <div
              v-for="group in faqGroups"
              :key="group.accordionId"
              :class="[`faq-group--${group.variant}`, 'faq-group']"
              data-reveal
            >
              <h3 class="faq-group-title">{{ group.title }}</h3>

              <div class="accordion">
                <div
                  v-for="(item, index) in group.faqs"
                  :key="item.question"
                  class="accordion-item"
                >
                  <h4 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="`#${collapseId(group.accordionId, index)}`"
                      aria-expanded="false"
                      :aria-controls="collapseId(group.accordionId, index)"
                    >
                      {{ item.question }}
                    </button>
                  </h4>
                  <div
                    :id="collapseId(group.accordionId, index)"
                    class="accordion-collapse collapse"
                  >
                    <div class="accordion-body">
                      <p class="faq-answer">{{ item.answer }}</p>
                      <p v-if="item.note" class="faq-note">{{ item.note }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark);
}
.faq-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
  color: var(--color-text-on-dark);
}
.faq-groups {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.faq-group {
  border-left: 4px solid var(--group-color);
  border-radius: 0 8px 8px 0;
  overflow: hidden;
}

.faq-group--general {
  --group-color: var(--color-primary);
}

.faq-group--company {
  --group-color: var(--color-accent);
}

.faq-group--user {
  --group-color: var(--color-primary);
}

.faq-group--conciliation {
  --group-color: var(--color-accent);
}

.faq-group-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
  padding-left: 1.5rem;
  color: var(--group-color);
}

.accordion-item {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.accordion-item:last-of-type {
  margin-bottom: 0;
}

.accordion-button {
  background: var(--color-bg-card);
  color: var(--color-text-on-dark);
  font-size: 1rem;
  font-weight: 600;
  padding: 1.25rem 1.5rem;
}

.accordion-button:not(.collapsed) {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark);
  box-shadow: none;
}

.accordion-button::after {
  filter: brightness(0) invert(0.85);
}

.accordion-button:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.5);
  border-color: var(--color-primary);
}

.accordion-body {
  color: var(--color-text-on-dark-muted);
  font-size: 1rem;
  line-height: 1.6;
  padding: 1.25rem 1.5rem;
}

.faq-answer {
  margin: 0;
}

.faq-note {
  margin: 1rem 0 0;
  padding-left: 1rem;
  border-left: 2px solid var(--group-color);
  font-style: italic;
  font-size: 0.9375rem;
  color: var(--color-text-on-dark-dim);
}

.accordion-collapse {
  transition: height 0.35s ease;
}

@media (max-width: 767.98px) {
  .faq-title {
    font-size: 1.75rem;
  }

  .faq-group-title {
    font-size: 1.125rem;
    padding-left: 1rem;
  }

  .accordion-button {
    font-size: 0.9375rem;
    padding: 1rem 1.25rem;
  }

  .accordion-body {
    font-size: 0.9375rem;
    padding: 1rem 1.25rem;
  }

  .faq-note {
    font-size: 0.875rem;
  }
}
</style>
