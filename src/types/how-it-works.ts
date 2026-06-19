export type HowItWorksStepKind = 'empresa' | 'cliente' | 'sistema' | 'resultado'

export interface HowItWorksStep {
  kind: HowItWorksStepKind
  text: string
}
