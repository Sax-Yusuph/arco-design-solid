import {
	Show,
	children,
	createEffect,
	createMemo,
	createSignal,
	mergeProps,
	onCleanup,
	onMount,
	splitProps,
} from 'solid-js'
import cs from '../../utils/classNames'
import { isFunction } from '../../utils/is'
import { getIndex } from '../../utils/use-index'
import { toCSSObject } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import { useGridContext, useGridDataCollectorContext } from './context'
import { useResponsiveState } from './hooks/useResponsiveState'
import type { GridItemProps } from './interface'
import { resolveItemData } from './utils'

const defaultProps: GridItemProps = {
  suffix: false,
  offset: 0,
  span: 1,
}

function GridItem(baseProps: GridItemProps) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.['Grid.GridItem'], baseProps)
  let ref!: HTMLDivElement

  const [props, restProps] = splitProps(mergedProps, [
    'style',
    'class',
    'offset',
    'span',
    'suffix',
    'children',
  ])

  const gridCtx = useGridContext()
  const dataCollectorCtx = useGridDataCollectorContext()

  const offset = useResponsiveState(props, 'offset', 0)
  const span = useResponsiveState(props, 'span', 1)
  const prefixCls = ctx.getPrefixCls?.('grid-item')

  const [computedIndex, setComputedIndex] = createSignal(-1)

  onMount(() => {
    if (ref) {
      const index = getIndex(ref, `.${prefixCls}`)
      setComputedIndex(index)
    }
  })

  const isVisible = createMemo(
    () => computedIndex() && gridCtx.displayIndexList?.includes(computedIndex()),
  )

  const getItemData = createMemo(() => {
    return resolveItemData(gridCtx.cols || 1, {
      suffix: !!props.suffix,
      span: span(),
      offset: offset(),
    })
  })

  createEffect(() => {
    if (computedIndex()) {
      dataCollectorCtx.collectItemData?.(computedIndex(), getItemData())
    }
  })

  onCleanup(() => {
    dataCollectorCtx.removeItemData?.(computedIndex())
  })

  const offsetStyle = createMemo(() => {
    const { offset, span } = getItemData()

    if (offset > 0 && gridCtx.colGap) {
      const oneSpan = `(100% - ${gridCtx.colGap * (span - 1)}px) / ${span}`
      return {
        'margin-left': `calc((${oneSpan} * ${offset}) + ${gridCtx.colGap * offset}px)`,
      }
    }

    return {}
  })

  const columnStart = createMemo(() => {
    const { suffix, span } = getItemData()
    if (suffix && gridCtx.cols) {
      return `${gridCtx.cols - span + 1}`
    }

    return `span ${span}`
  })

  const visibleStyle = createMemo(() => (!isVisible() || span() === 0 ? { display: 'none' } : {}))

  // @ts-ignore because props.children may contain both JSX.ELement and ()=>JSX.Element.
  // the function part will be taken care of later
  const nodeList = children(() => props.children)

  return (
    <div
      ref={ref}
      {...restProps}
      class={cs(
        {
          [`${prefixCls}`]: true,
          [`${prefixCls}-rtl`]: ctx.rtl,
        },
        props.class,
      )}
      style={{
        'grid-column': `${columnStart()} / span ${span}`,
        ...offsetStyle(),
        ...visibleStyle(),
        ...toCSSObject(props.style),
      }}
    >
      <Show when={isFunction(nodeList())} fallback={nodeList()}>
        {/* @ts-ignore handle instances where the children of GridItem is a function*/}
        {nodeList()({ overflow: gridCtx.overflow })}
      </Show>
    </div>
  )
}

GridItem.displayName = 'GridItem'
export default GridItem

export { type GridItemProps }
