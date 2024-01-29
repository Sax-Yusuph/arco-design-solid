import { JSXElement, Match, ParentProps, Show, Switch, createEffect, createSignal } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { BadgeProps } from './interface'

export default function Count(
  props: ParentProps<{
    count: number
    style: BadgeProps['style']
    prefixCls: string
    maxCount: BadgeProps['maxCount']
    class: BadgeProps['class']
    dot: BadgeProps['dot']
  }>,
) {
  const [node, setNode] = createSignal<JSXElement>()
  let oldCount: number | null

  createEffect(() => {
    if (props.count !== oldCount) {
      oldCount = props.count

      setNode(
        <span class={`${props.prefixCls}-number-text`}>
          <Show when={props.maxCount && props.count > props.maxCount} fallback={props.count}>
            {`${props.maxCount}+`}
          </Show>
        </span>,
      )
    }
  })

  return (
    <Transition
      enterClass="badge-zoom-appear badge-zoom-enter"
      enterToClass="badge-zoom-appear-active badge-zoom-enter-active"
      enterActiveClass="-"
      exitActiveClass="badge-zoom-exit-active"
      exitToClass="badge-zoom-appear-done badge-zoom-exit-done"
      exitClass="badge-zoom-exit"
			appear

    >
      <Switch>
        <Match when={props.count > 0 && props.dot}>
          <span class={props.class} style={props.style} />
        </Match>

        <Match when={props.count > 0}>
          <span class={props.class} style={props.style}>
            {node}
          </span>
        </Match>
      </Switch>
    </Transition>
  )
}
