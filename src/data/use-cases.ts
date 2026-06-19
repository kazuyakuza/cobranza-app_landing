import type { RubroItem, UseCaseExample } from '@/types/use-cases'

const rubros: RubroItem[] = [
  {
    icon: 'bi-building',
    title: 'Administraciones de consorcios y expensas',
    subItems: [
      'Expensas ordinarias y extraordinarias',
      'Seguimiento de pagos por unidad',
      'Recepción de comprobantes',
      'Conciliación de transferencias'
    ]
  },
  {
    icon: 'bi-house-door',
    title: 'Inmobiliarias y administradores de alquileres',
    subItems: [
      'Alquileres mensuales',
      'Expensas y servicios',
      'Control de vencimientos',
      'Validación de pagos'
    ]
  },
  {
    icon: 'bi-briefcase',
    title: 'Profesionales y monotributistas',
    subItems: [
      'Honorarios',
      'Abonos mensuales',
      'Servicios recurrentes',
      'Seguimiento de cobranzas'
    ]
  },
  {
    icon: 'bi-mortarboard',
    title: 'Colegios, academias, gimnasios y clubes',
    subItems: ['Cuotas mensuales', 'Matrículas', 'Actividades especiales', 'Control de morosidad']
  },
  {
    icon: 'bi-arrow-repeat',
    title: 'Cualquier cobro recurrente o variable',
    subItems: ['Cuotas', 'Membresías', 'Servicios', 'Pagos periódicos']
  }
]

const useCaseExamples: UseCaseExample[] = [
  {
    tabId: 'consorcios',
    label: 'Administración de Consorcios',
    beforeText:
      'Cada mes las expensas cambian. Los propietarios consultan montos, envían comprobantes por WhatsApp y la conciliación se realiza manualmente.',
    afterText:
      'Se cargan las expensas del mes. Cada propietario consulta su saldo. Sube el comprobante de pago. Se carga el extracto bancario. El sistema ayuda a relacionar deudas, comprobantes y transferencias. Se valida el pago y se genera el recibo.'
  },
  {
    tabId: 'inmobiliaria',
    label: 'Inmobiliaria',
    beforeText:
      'Los inquilinos consultan alquileres, expensas y vencimientos por distintos canales. Los comprobantes llegan dispersos y el seguimiento consume tiempo administrativo.',
    afterText:
      'Se cargan alquileres y conceptos asociados. Cada inquilino consulta su deuda actual. Realiza la transferencia y sube el comprobante. El sistema centraliza la información. El administrador valida los pagos desde un único lugar.'
  },
  {
    tabId: 'profesional',
    label: 'Profesional o Estudio',
    beforeText:
      'Los clientes realizan transferencias por honorarios o abonos mensuales y luego envían comprobantes por correo o WhatsApp.',
    afterText:
      'Se generan los importes a cobrar. Los clientes consultan su saldo. Suben el comprobante directamente en la plataforma. El profesional revisa y valida los pagos. Todo queda registrado y disponible para consulta.'
  },
  {
    tabId: 'colegio',
    label: 'Colegio, Academia o Gimnasio',
    beforeText:
      'Las cuotas mensuales generan consultas frecuentes, comprobantes dispersos y seguimiento manual de morosidad.',
    afterText:
      'Se cargan las cuotas del período. Los alumnos o socios consultan sus vencimientos. Suben comprobantes desde el celular. La administración controla pagos y pendientes desde un único panel.'
  }
]

export { rubros, useCaseExamples }
