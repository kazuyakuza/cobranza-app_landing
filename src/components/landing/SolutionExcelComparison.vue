<script setup lang="ts">
import { excelComparisonHeading, excelComparisonRows } from '@/data/solution'

const aspectHeader = 'Aspecto'
const excelHeader = 'Excel / WhatsApp'
const cobranzaHeader = 'Cobranza App'
</script>

<template>
  <div class="excel-comparison">
    <h3 class="excel-comparison-heading">{{ excelComparisonHeading }}</h3>
    <div class="table-responsive">
      <table class="table table-bordered align-middle excel-comparison-table mb-0">
        <thead>
          <tr>
            <th scope="col">{{ aspectHeader }}</th>
            <th scope="col">{{ excelHeader }}</th>
            <th scope="col">{{ cobranzaHeader }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in excelComparisonRows" :key="row.aspect">
            <th scope="row">{{ row.aspect }}</th>
            <td>{{ row.excelWhatsapp }}</td>
            <td class="excel-comparison-cobranza">{{ row.cobranzaApp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.excel-comparison-heading {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-text-on-dark);
}

.excel-comparison-table {
  --bs-table-bg: transparent;
  --bs-table-color: var(--color-text-on-dark-muted);
  --bs-table-border-color: var(--color-border);
  margin-bottom: 0;
}

.excel-comparison-table :deep(thead th) {
  background: var(--color-bg-card);
  color: var(--color-text-on-dark);
  font-weight: 600;
  border-color: var(--color-border);
}

.excel-comparison-table :deep(tbody th) {
  background: var(--color-bg-card);
  color: var(--color-text-on-dark);
  font-weight: 600;
}

.excel-comparison-table :deep(td) {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark-muted);
}

.excel-comparison-cobranza {
  color: var(--color-accent) !important;
  font-weight: 600;
}

@media (max-width: 767.98px) {
  .excel-comparison-heading {
    font-size: 1.1rem;
  }

  .excel-comparison-table :deep(th),
  .excel-comparison-table :deep(td) {
    font-size: 0.875rem;
  }
}
</style>
