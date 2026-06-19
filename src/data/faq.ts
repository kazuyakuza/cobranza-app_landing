import type { FaqItem, FaqGroup } from '@/types/faq';

const generalFaqs: FaqItem[] = [
  {
    question: '¿Para quién está pensado Cobranza App?',
    answer:
      'Principalmente para PyMEs, profesionales, monotributistas y administradores que necesitan organizar y agilizar su proceso de cobranza.'
  },
  {
    question: '¿Es una aplicación móvil o web?',
    answer:
      'Es un sistema web responsive. Los clientes finales pueden usarlo cómodamente desde el celular. La administración es más cómoda desde computadora, aunque también es accesible desde móvil.'
  },
  {
    question: '¿Puedo solicitar funcionalidades específicas?',
    answer:
      'Sí. Estamos en etapa Beta y valoramos mucho el feedback. Si necesitás alguna funcionalidad, contáctanos.'
  }
];

const companyFaqs: FaqItem[] = [
  {
    question: '¿Hay límite de clientes?',
    answer:
      'No. No existe límite en la cantidad de clientes. El cobro depende únicamente del volumen de pagos procesados.'
  },
  {
    question: '¿Puedo tener varios usuarios administradores?',
    answer: 'Sí. Podrás invitar a otros miembros de tu equipo sin costo extra.'
  },
  {
    question: '¿Puedo exportar reportes e información?',
    answer: 'Sí, podrás exportar listados de deudas, pagos y reportes de conciliación.'
  },
  {
    question: '¿Puedo importar deudas desde Excel o CSV?',
    answer: 'Es una funcionalidad que será agregada según lo demanden nuestros usuarios.'
  },
  {
    question: '¿Los recibos tienen validez fiscal?',
    answer:
      'Generamos recibos válidos internamente. La integración con AFIP/ARCA (facturación electrónica) está planificada según necesidades de los usuarios.'
  },
  {
    question: '¿Cómo se protegen los datos y comprobantes?',
    answer:
      'La seguridad es una prioridad. Todos los datos y archivos se almacenan de forma segura, con acceso restringido y encriptado.'
  }
];

const userFaqs: FaqItem[] = [
  {
    question: '¿Mis clientes necesitan registrarse o crear una cuenta?',
    answer:
      'No. Solo necesitan ingresar su código identificatorio y/o datos definidos por la empresa.'
  },
  {
    question: '¿Cómo funcionan las notificaciones?',
    answer:
      'Actualmente mediante email (recordatorios y alertas de nuevos comprobantes). Incorporaremos WhatsApp y otros canales según demanda de nuestros usuarios.'
  },
  {
    question: '¿Qué medios de pago acepta?',
    answer:
      'El cliente paga por fuera (principalmente transferencia) y sube el comprobante. En etapas posteriores incorporaremos pasarelas de pago integradas.'
  }
];

const conciliationFaqs: FaqItem[] = [
  {
    question: '¿Cómo se realiza la conciliación?',
    answer:
      'En esta primera etapa es semi-automática: el sistema ayuda a cruzar extractos bancarios, comprobantes y deudas. No solicitamos ni guardamos credenciales bancarias.'
  },
  {
    question: '¿Cobranza App accede a mis cuentas bancarias o mueve dinero?',
    answer:
      'No. Los pagos se realizan por fuera de la plataforma (transferencias bancarias habituales). Cobranza App solo organiza y ayuda a conciliar la información.',
    note: '"Me gustaría que el sistema acceda y descarga el resumen de mi banco de forma autónoma" Contáctanos y podemos buscar una solución.'
  },
  {
    question: '¿Qué pasa si el sistema no logra cruzar automáticamente uno o más pagos?',
    answer: 'Puedes revisar y confirmar manualmente los casos excepcionales en cualquier momento.'
  },
  {
    question: '¿Funciona con pagos parciales, montos variables y cuotas?',
    answer: 'Sí. El sistema está diseñado para manejar cobros variables y recurrentes.'
  },
  {
    question: '¿Qué formatos de extracto bancario soporta?',
    answer:
      'Inicialmente soporta los formatos más comunes (PDF y CSV) de los principales bancos. Se irán agregando más según los comentarios y experiencias que nos hagan llegar.'
  }
];

export const faqGroups: FaqGroup[] = [
  {
    title: 'General',
    accordionId: 'faqGeneralAccordion',
    variant: 'general',
    faqs: generalFaqs
  },
  {
    title: 'Para la empresa o profesional',
    accordionId: 'faqCompanyAccordion',
    variant: 'company',
    faqs: companyFaqs
  },
  {
    title: 'Para tus clientes',
    accordionId: 'faqUserAccordion',
    variant: 'user',
    faqs: userFaqs
  },
  {
    title: 'Conciliación y pagos',
    accordionId: 'faqConciliationAccordion',
    variant: 'conciliation',
    faqs: conciliationFaqs
  }
];
