import { createContextProvider } from '../../utils/context'
import type { GridItemData } from './interface'

type RowContextType = {
  gutter?: [number, number]
  div?: boolean
}

export const [RowProvider, useRowContext] = createContextProvider((props: RowContextType) => {
  return props
}, {})

type GridContextType = {
  overflow?: boolean
  collapsed?: boolean
  displayIndexList?: number[]
  cols?: number
  colGap?: number
}

export const [GridContextProvider, useGridContext] = createContextProvider(
  (props: GridContextType) => {
    return props
  },
  {},
)

type GridDataCollectorType = Readonly<{
  collectItemData?: (index: number, itemData: GridItemData) => void
  removeItemData?: (index: number) => void
}>

export const [GridDataCollectorProvider, useGridDataCollectorContext] = createContextProvider(
  (props: GridDataCollectorType) => {
    return props
  },
  {},
)
