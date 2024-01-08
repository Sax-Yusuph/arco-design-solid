import Col from './col'
import OriginGrid from './grid'
import GridItem from './grid-item'
import Row from './row'

const Grid = OriginGrid as typeof OriginGrid & {
  Col: typeof Col
  Row: typeof Row
  GridItem: typeof GridItem
}

Grid.Col = Col
Grid.Row = Row
Grid.GridItem = GridItem

export default Grid

export { type ColProps, type GridProps, type ResponsiveValue, type RowProps } from './interface'

