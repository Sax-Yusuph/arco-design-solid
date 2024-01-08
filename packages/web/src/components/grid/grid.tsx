import { ReactiveMap } from '@solid-primitives/map'
import { createMemo, mergeProps, splitProps } from 'solid-js'
import { style } from 'solid-js/web'

import cs from '../../utils/classNames'
import { useConfigContext } from '../config-provider'
import { GridContextProvider, GridDataCollectorProvider } from './context'
import { useResponsiveState } from './hooks/useResponsiveState'
import type { GridItemData, GridProps } from './interface'
import { setItemVisible } from './utils'

const defaultProps: GridProps = {
  collapsed: false,
  collapsedRows: 1,
  cols: 24,
  colGap: 0,
  rowGap: 0,
}

function Grid(baseProps: GridProps) {
  const itemDataMap = new ReactiveMap<number, GridItemData>()
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.Grid, baseProps)

  const [props, restProps] = splitProps(mergedProps, [
    'children',
    'class',
    'style',
    'cols',
    'colGap',
    'collapsed',
    'collapsedRows',
    'rowGap',
  ])

  const cols = useResponsiveState(props, 'cols', 24)
  const colGap = useResponsiveState(props, 'colGap', 0)
  const rowGap = useResponsiveState(props, 'rowGap', 0)

  const prefixCls = ctx.getPrefixCls?.('grid')

  const itemDataList = createMemo(() => {
    const list: GridItemData[] = []

    for (const [index, itemData] of itemDataMap?.entries()) {
      list[index] = itemData as GridItemData
    }

    return list
  })

  const displayInfo = createMemo(() => {
    return setItemVisible({
      cols: cols(),
      collapsed: props.collapsed || false,
      collapsedRows: props.collapsedRows || 0,
      itemDataList: itemDataList(),
    })
  })

  return (
    <div
      ref={restProps.ref}
      class={cs(
        {
          [`${prefixCls}`]: true,
          [`${prefixCls}-rtl`]: ctx.rtl,
        },
        props.class,
      )}
      style={{
        gap: `${rowGap}px ${colGap}px`,
        'grid-template-columns': `repeat(${cols}, minmax(0px, 1fr))`,
        ...style,
      }}
    >
      <GridDataCollectorProvider
        collectItemData={(index, item) => itemDataMap.set(index, item)}
        removeItemData={index => itemDataMap.delete(index)}
      >
        <GridContextProvider
          cols={cols()}
          colGap={colGap()}
          collapsed={props.collapsed}
          overflow={displayInfo().overflow}
          displayIndexList={displayInfo().displayIndexList}
        >
          {props.children}
        </GridContextProvider>
      </GridDataCollectorProvider>
    </div>
  )
}

Grid.displayName = 'Grid'

export default Grid

export { type GridProps }
