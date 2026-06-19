export type HowItWorksStepKind = 'empresa' | 'cliente' | 'sistema' | 'resultado'

export interface HowItWorksStep {
  number: number
  kind: HowItWorksStepKind
  icon: string
  text: string
}
