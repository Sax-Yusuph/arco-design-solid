import { Accessor, createEffect, createSignal } from 'solid-js'
import { isNumber } from '../../utils/is'

export default function useSelectionRange(value: Accessor<string>, inputEl?: HTMLInputElement) {
  // Selection position from the tail (e.g. 1234|56, this value will be 2)
  const [getPosition, setPosition] = createSignal<number | null>(null)

  createEffect(() => {
    try {
      const position = getPosition()
      if (inputEl && value() && isNumber(position)) {
        const start = Math.max(0, value().length - position)
        inputEl.setSelectionRange(start, start)
      }
    } catch (err) {
      console.warn('Failed to reset input selection range position', err)
    }
  })

  return (event: any) => {
    const { selectionEnd: end, value } = event.target as HTMLInputElement
    if (isNumber(end)) {
      setPosition(value.length - end)
    }
  }
}
