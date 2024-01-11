import { isFunction } from 'remeda'
import { Accessor } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { createStore } from 'solid-js/store'
import { Enter } from '../../utils/keycode'
import type { InputProps, InputTriggers, TextAreaProps } from './interface'

type CompositionProps = {
  onInput: InputProps['onInput']
  onKeyDown: InputProps['onKeyDown'] | TextAreaProps['onKeyDown']
  onPressEnter: InputProps['onPressEnter']
  beforeTriggerValueChangeCallback?: (newValue: string) => void
  normalizeHandler?: (type: InputTriggers) => InputProps['normalize']
}

type CompositionReturn<T> = [
  composition: {
    isComposition: boolean
    compositionValue: string
  },
  actions: {
    triggerValueChangeCallback: T
    compositionHandler: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, CompositionEvent>

    valueChangeHandler: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, InputEvent>
    keyDownHandler: JSX.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>['onKeyDown']
  },
]

// Handle input text like Chinese
export default function useComposition(
  value: Accessor<string | undefined>,
  maxLength: Accessor<number | undefined>,
  {
    onInput,
    onKeyDown,
    onPressEnter,
    beforeTriggerValueChangeCallback,
    normalizeHandler,
  }: CompositionProps,
): CompositionReturn<typeof onInput> {
  const [state, setState] = createStore({ isComposition: false, compositionValue: '' })

  const triggerValueChangeCallback: typeof onInput = (newValue, e) => {
    beforeTriggerValueChangeCallback?.(newValue)

    if (
      onInput &&
      newValue !== value() &&
      (maxLength() === undefined || newValue.length <= (maxLength() || 0))
    ) {
      onInput(newValue, e)
    }
  }

  return [
    state,
    {
      triggerValueChangeCallback,
      compositionHandler: (e: any) => {
        setState('isComposition', e.type !== 'compositionend')

        if (!state.isComposition) {
          setState('compositionValue', '')
          triggerValueChangeCallback(e.target.value, e)
        }
      },

      valueChangeHandler: (e: any) => {
        const newValue = e.target.value
        const compositionValue = state.compositionValue

        if (!state.isComposition) {
          compositionValue && setState('compositionValue', '')
          triggerValueChangeCallback(newValue, e)
        } else {
          setState({ isComposition: false, compositionValue: newValue })
        }
      },

      keyDownHandler: (e: any) => {
        const keyCode = e.keyCode || e.which

        if (!state.isComposition) {
          isFunction(onKeyDown) && onKeyDown(e)
          if (keyCode === Enter.code) {
            onPressEnter && onPressEnter(e)
            const normalize = normalizeHandler?.('onPressEnter')
            normalize && triggerValueChangeCallback(normalize(e.target.value), e)
          }
        }
      },
    },
  ] as const
}
