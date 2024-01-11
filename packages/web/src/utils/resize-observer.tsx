import { Ref } from '@solid-primitives/refs'
import { ResizeHandler, createResizeObserver } from '@solid-primitives/resize-observer'
import { ParentProps, createSignal, onMount } from 'solid-js'
export type ResizeProps = {
  throttle?: boolean
  onResize?: ResizeHandler
}

function ResizeObserver(props: ParentProps<ResizeProps>) {
  const [ref, setRef] = createSignal<Element | undefined>()

  onMount(() => {
    if (props.onResize) {
      createResizeObserver(ref, props.onResize)
    }
  })

  return <Ref ref={setRef}>{props.children}</Ref>
}

export default ResizeObserver
