import { createStore, reconcile } from 'solid-js/store'
import { toValue } from 'solidjs-use'

// Refer to Element Plus
export function useCursor(input: HTMLInputElement | undefined): [() => void, () => void] {
  const [getSelectionRef, setSelectionRef] = createStore<{
    selectionStart?: number
    selectionEnd?: number
    value?: string
    beforeTxt?: string
    afterTxt?: string
  }>()

  function recordCursor() {
    if (!input) return

    const { selectionStart, selectionEnd, value } = input

    if (selectionStart == null || selectionEnd == null) return

    const beforeTxt = value.slice(0, Math.max(0, selectionStart))
    const afterTxt = value.slice(Math.max(0, selectionEnd))

    setSelectionRef(
      reconcile({
        selectionStart,
        selectionEnd,
        value,
        beforeTxt,
        afterTxt,
      }),
    )
  }

  function setCursor() {
    if (!input || !toValue(getSelectionRef)) return

    const value = input.value
    const beforeTxt = getSelectionRef.beforeTxt
    const afterTxt = getSelectionRef.afterTxt
    const selectionStart = getSelectionRef.selectionStart

    if (!beforeTxt || !afterTxt || !selectionStart) return
    let startPos = value.length

    if (value.endsWith(afterTxt)) {
      // get from after
      startPos = value.length - afterTxt.length
    } else if (value.startsWith(beforeTxt)) {
      // get from before
      startPos = beforeTxt.length
    } else {
      const beforeLastChar = beforeTxt[selectionStart - 1]
      if (beforeLastChar) {
        const newIndex = value.indexOf(beforeLastChar, selectionStart - 1)
        if (newIndex !== -1) {
          startPos = newIndex + 1
        }
      }
    }

    input.setSelectionRange(startPos, startPos)
  }

  return [recordCursor, setCursor]
}
