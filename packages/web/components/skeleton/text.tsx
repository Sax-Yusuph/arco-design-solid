import { For } from 'solid-js'
import cs from '../../utils/classNames'
import { isArray } from '../../utils/is'
import { toPx } from '../../utils/util'
import type { SkeletonTextProps } from './interface'

export default function text(props: SkeletonTextProps) {
  const { width = '60%', rows = 3 } = props

  function getTextWidth(index: number) {
    if (isArray(width)) {
      return width[index]
    }

    if (rows - 1 === index) {
      return width
    }

    return undefined
  }

  return (
    <ul class={cs(`${props.prefixCls}-text`, props.class)} style={props.style}>
      <For each={Array(rows).fill('')}>
        {(node, i) => (
          <li class={`${props.prefixCls}-text-row`} style={{ width: toPx(getTextWidth(i())) }} />
        )}
      </For>
    </ul>
  )
}
