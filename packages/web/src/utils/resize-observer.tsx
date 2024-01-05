import { ResizeHandler, createResizeObserver } from '@solid-primitives/resize-observer'
import { ParentProps, children, onMount } from 'solid-js'

export type ResizeProps = {
  throttle?: boolean
  onResize?: ResizeHandler
}

function ResizeObserver(props: ParentProps<ResizeProps>) {
  const c = children(() => props.children)

  onMount(() => {
    const nodeList = c.toArray()

    // warning(nodeList.length > 1, 'Resize observer expects only one child')
    if (props.onResize) {
      createResizeObserver(nodeList as Element[], props.onResize)
    }
  })

  return <>{c()}</>
}

export default ResizeObserver
