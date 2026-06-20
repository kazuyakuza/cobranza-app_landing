<!-- SVG diagram illustrating the conciliation flow: documents and data converge into a match that produces final validation. -->
<script setup lang="ts">
const diagramLabel =
  'Diagrama de conciliación: el Cliente emite un Comprobante; la Deuda, el Comprobante y la Transferencia del Extracto bancario confluyen en un Match central que produce la Validación final.'
</script>

<template>
  <div class="conciliation-diagram-scroll">
    <svg
      class="conciliation-diagram"
      viewBox="0 0 620 300"
      width="100%"
      role="img"
      :aria-label="diagramLabel"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="conciliationArrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 1 1 L 10 5 L 1 9 L 3.5 5 z" :fill="'var(--color-text-on-dark-dim)'" />
        </marker>
      </defs>

      <g class="conciliation-node" transform="translate(40,20)">
        <rect width="120" height="36" rx="8" />
        <text x="60" y="23" text-anchor="middle">Cliente</text>
      </g>

      <g class="conciliation-node" transform="translate(200,20)">
        <rect width="120" height="36" rx="8" />
        <text x="60" y="23" text-anchor="middle">Deuda</text>
      </g>

      <g class="conciliation-node" transform="translate(170,170)">
        <rect width="140" height="36" rx="8" />
        <text x="70" y="23" text-anchor="middle">Comprobante</text>
      </g>

      <g class="conciliation-node conciliation-node--match" transform="translate(340,170)">
        <rect width="90" height="40" rx="10" />
        <text x="45" y="26" text-anchor="middle">Match</text>
      </g>

      <g class="conciliation-node" transform="translate(470,170)">
        <rect width="130" height="36" rx="8" />
        <text x="65" y="23" text-anchor="middle">Transferencia</text>
      </g>

      <g class="conciliation-node" transform="translate(470,90)">
        <rect width="130" height="36" rx="8" />
        <text x="65" y="23" text-anchor="middle">Extracto bancario</text>
      </g>

      <g class="conciliation-node conciliation-node--result" transform="translate(320,250)">
        <rect width="130" height="36" rx="8" />
        <text x="65" y="23" text-anchor="middle">Validación final</text>
      </g>

      <line
        x1="100"
        y1="56"
        x2="240"
        y2="170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="260"
        y1="56"
        x2="385"
        y2="170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="310"
        y1="188"
        x2="340"
        y2="188"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <path
        d="M 535 126 Q 548 148 535 170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="470"
        y1="188"
        x2="430"
        y2="188"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="385"
        y1="210"
        x2="385"
        y2="250"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
    </svg>
  </div>
</template>

<style scoped>
.conciliation-diagram {
  max-width: 560px;
  margin: 1.25rem auto 0;
  display: block;
}

.conciliation-node rect {
  fill: var(--color-bg-card);
  stroke: var(--color-border);
  stroke-width: 1.5;
}

.conciliation-node text {
  fill: var(--color-text-on-dark);
  font-size: 13px;
  font-weight: 600;
}

.conciliation-node--match rect {
  fill: var(--color-bg-card-alt);
  stroke: var(--color-accent);
  stroke-width: 2;
}

.conciliation-node--match text {
  fill: var(--color-accent);
}

.conciliation-node--result rect {
  stroke: var(--color-accent);
}

.conciliation-edge {
  stroke: var(--color-text-on-dark-dim);
  stroke-width: 1.5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.conciliation-diagram-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
}

@media (max-width: 767.98px) {
  .conciliation-diagram {
    min-width: 480px;
  }

  .conciliation-node text {
    font-size: 13px;
  }
}
</style>
