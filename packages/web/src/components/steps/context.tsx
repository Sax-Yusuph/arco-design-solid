import { createContextProvider } from '@solid-primitives/context'
import { ParentProps } from 'solid-js'
import type { StepProps } from './interface'

export const [StepProvider, useStepContext] = createContextProvider(
  (props: ParentProps<StepProps>) => {
    return props
  },
)
