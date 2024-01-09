import { isFunction } from 'remeda'
import { Accessor, createSignal } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
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
  compositionValue: Accessor<string | undefined>,
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
  const [getIsComposition, setIsComposition] = createSignal(false)
  const [getCompositionValue, setCompositionValue] = createSignal('')

  const triggerValueChangeCallback: typeof onInput = (newValue, e) => {
    beforeTriggerValueChangeCallback?.(newValue)

    if (
      onInput &&
      // https://github.com/arco-design/arco-design/issues/520
      // Avoid triggering onChange repeatedly for the same value
      // Compositionend is earlier than onchange in Firefox, different with chrome
      newValue !== value() &&
      (maxLength() === undefined || newValue.length <= (maxLength() || 0))
    ) {
      onInput(newValue, e)
    }
  }

  return [
    getCompositionValue,
    {
      triggerValueChangeCallback,
      compositionHandler: (e: any) => {
        setIsComposition(e.type !== 'compositionend')

        if (!getIsComposition()) {
          setCompositionValue('')
          triggerValueChangeCallback(e.target.value, e)
        }
      },

      valueChangeHandler: (e: any) => {
        const newValue = e.target.value
        const compositionValue = getCompositionValue()
        const isComposition = getIsComposition()

        if (!isComposition) {
          compositionValue && setCompositionValue('')
          triggerValueChangeCallback(newValue, e)
        } else {
          // https://github.com/arco-design/arco-design/issues/397
          // compositionupdate => onchange
          setIsComposition(false)
          setCompositionValue(newValue)
        }
      },

      keyDownHandler: (e: any) => {
        const keyCode = e.keyCode || e.which
        const isComposition = getIsComposition()

        if (!isComposition) {
          isFunction(onKeyDown) && onKeyDown(e)
          if (keyCode === Enter.code) {
            onPressEnter && onPressEnter(e)
            const normalize = normalizeHandler?.('onPressEnter')
            normalize && triggerValueChangeCallback(normalize(e.target.value), e)
          }
        }
      },
    },
  ]
}
