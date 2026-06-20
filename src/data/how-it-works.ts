import type { HowItWorksStep, HowItWorksStepKind } from '@/types/how-it-works'

const stepTexts = [
  'Carga las deudas de tus clientes, individual o masivamente.',
  'Cada cliente accede con su identificador (código de cliente, DNI + unidad, etc.) y consulta su saldo y vencimientos.',
  'El cliente realiza la transferencia y sube el comprobante directamente en la plataforma.',
  'Sube tu extracto bancario al sistema.',
  'El sistema cruza automáticamente los comprobantes, transferencias y deudas. Genera reportes y un resumen del resultante. Notifica a los clientes sobre el estado de su deuda.',
  'Los casos que requieren atención se revisan y confirman manualmente.',
  'Se genera y descarga el recibo una vez validado el pago.'
]

const stepKinds: HowItWorksStepKind[] = [
  'empresa',
  'cliente',
  'cliente',
  'empresa',
  'sistema',
  'empresa',
  'resultado'
]

const stepIcons = ['upload', 'search', 'upload', 'upload', 'refresh-cw', 'search', 'file-text']

const steps: HowItWorksStep[] = stepTexts.map((text, index) => ({
  number: index + 1,
  kind: stepKinds[index]!,
  icon: stepIcons[index]!,
  text
}))

const actorLabels: Record<HowItWorksStepKind, string> = {
  empresa: 'Negocio',
  cliente: 'Cliente',
  sistema: 'Sistema',
  resultado: 'Cliente'
}

const kindColorMap: Record<HowItWorksStepKind, string> = {
  empresa: 'var(--color-primary)',
  cliente: 'var(--color-accent)',
  sistema: 'var(--color-primary)',
  resultado: 'var(--color-accent)'
}

const CONCILIATION_STEP_NUMBER = 5

export { steps, actorLabels, kindColorMap, CONCILIATION_STEP_NUMBER }
