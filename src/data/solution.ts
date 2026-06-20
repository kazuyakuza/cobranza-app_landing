import type { ComparisonRow, ExcelComparisonRow } from '@/types/solution'

const comparisonRows: ComparisonRow[] = [
  {
    before: 'Comprobantes dispersos en WhatsApp, mail y chats',
    after: 'Todos los comprobantes centralizados y organizados'
  },
  {
    before: 'Tenés que verificar manualmente cada transferencia',
    after: 'El sistema cruza automáticamente comprobantes, transferencias y deudas'
  },
  {
    before: 'Conciliación manual con extractos bancarios',
    after: 'Conciliación asistida con revisión manual solo en excepciones'
  },
  {
    before: 'Clientes preguntando constantemente cuánto deben',
    after: 'Clientes consultan su saldo por sí mismos en cualquier momento'
  },
  {
    before: 'Recordar deudas/pagos a clientes mediante WhatsApp/mail/chat/llamada',
    after: 'El sistema envía recordatorios a los clientes mediante notificaciones automáticas'
  }
]

const excelComparisonHeading = '¿Por qué no alcanza con Excel o WhatsApp?'

const excelComparisonRows: ExcelComparisonRow[] = [
  {
    aspect: 'Ubicación de comprobantes',
    excelWhatsapp: 'Dispersos',
    cobranzaApp: 'Centralizados'
  },
  {
    aspect: 'Conciliación',
    excelWhatsapp: 'Manual',
    cobranzaApp: 'Asistida + revisión manual'
  },
  {
    aspect: 'Portal para clientes',
    excelWhatsapp: 'No existe',
    cobranzaApp: 'Sí, simple y sin registro'
  },
  {
    aspect: 'Trazabilidad',
    excelWhatsapp: 'Baja',
    cobranzaApp: 'Completa'
  },
  {
    aspect: 'Tiempo administrativo',
    excelWhatsapp: 'Alto',
    cobranzaApp: 'Significativamente reducido'
  }
]

export { comparisonRows, excelComparisonHeading, excelComparisonRows }
