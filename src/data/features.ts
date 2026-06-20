import type { FeatureItem, FeatureGroup } from '@/types/features'

const companyFeatures: FeatureItem[] = [
  {
    icon: 'bi-building',
    text: 'Gestión centralizada de clientes y deudas',
    elaboration:
      'Todos tus clientes y sus saldos quedan en un único panel, sin repartir la información entre hojas de cálculo y mensajes sueltos.'
  },
  {
    icon: 'bi-upload',
    text: 'Carga masiva de saldos y vencimientos',
    elaboration:
      'Cargá los importes de muchos clientes a la vez y actualizá los vencimientos en segundos, ahorrando trabajo repetitivo cada mes.'
  },
  {
    icon: 'bi-bar-chart',
    text: 'Reportes claros de deudas, pagos y morosidad',
    elaboration:
      'Visualizá de un vistazo quién debe, cuánto y desde cuándo, para tomar decisiones rápidas y seguir la evolución de la cobranza.'
  },
  {
    icon: 'bi-bell',
    text: 'Notificaciones automáticas al recibir comprobantes',
    elaboration:
      'Cuando un cliente sube un comprobante, el sistema te avisa al instante para que no tengas que revisar manualmente cada canal.'
  },
  {
    icon: 'bi-check2-circle',
    text: 'Validación ágil de pagos y generación automática de recibos',
    elaboration:
      'Confirmá los pagos en pocos clics y dejá que el sistema arme el recibo correspondiente, sin trabajo manual extra.'
  },
  {
    icon: 'bi-clock-history',
    text: 'Historial completo y trazabilidad por cliente',
    elaboration:
      'Reconstruí el recorrido de cada cliente: deudas, comprobantes y validaciones, todo ordenado y disponible para consulta.'
  },
  {
    icon: 'bi-diagram-3',
    text: 'Conciliación asistida (el sistema cruza información automáticamente y permite revisión manual)',
    elaboration:
      'El sistema propone los cruces entre deudas, comprobantes y transferencias; vos solo revisás y confirmás los casos dudosos.'
  }
]

const userFeatures: FeatureItem[] = [
  {
    icon: 'bi-person-badge',
    text: 'Los clientes ingresan con un identificador (código de cliente, DNI + unidad, etc.) preconfigurado. No necesitan registrarse ni crear cuenta.',
    elaboration:
      'Sin contraseñas que olvidar ni formularios de registro. Tus clientes acceden directamente y consultan su estado al instante.'
  },
  {
    icon: 'bi-search',
    text: 'Consulta inmediata de deuda y vencimientos',
    elaboration:
      'En cualquier momento y desde el celular, tus clientes saben exactamente cuánto deben y cuándo vence cada concepto.'
  },
  {
    icon: 'bi-cloud-upload',
    text: 'Subida sencilla de comprobantes desde el celular',
    elaboration:
      'Con una foto, captura de pantalla, o bien archivo del comprobante alcanza: el cliente lo sube en segundos y queda asociado automáticamente a su deuda.'
  },
  {
    icon: 'bi-eye',
    text: 'Seguimiento en tiempo real del estado de sus pagos',
    elaboration:
      'El cliente ve si su comprobante está pendiente, validado o rechazado, sin necesidad de preguntar por mensaje.'
  },
  {
    icon: 'bi-download',
    text: 'Descarga de un recibo una vez validado',
    elaboration:
      'Cuando el pago se valida, el cliente descarga su recibo en el momento, sin tener que pedírtelo ni esperar.'
  }
]

export const featureGroups: FeatureGroup[] = [
  {
    title: 'Para la empresa o profesional',
    intro:
      'Una plataforma web donde un administrador autorizado tiene acceso a distintas funcionalidades, tales como:',
    accordionId: 'featuresCompanyAccordion',
    variant: 'company',
    features: companyFeatures
  },
  {
    title: 'Para el cliente final',
    intro: 'Un portal web simple donde el cliente puede:',
    accordionId: 'featuresUserAccordion',
    variant: 'user',
    features: userFeatures
  }
]
