import { JSX, JSXElement } from 'solid-js'

export type DragStatus = 'none' | 'dragged' | 'dragging'

export type DragPosition = 'left' | 'right' | 'top' | 'bottom'

export interface DraggableItemProps extends Pick<DraggableProps, 'direction'> {
  style?: JSX.CSSProperties | string
  prefixCls: string
  children?: JSXElement
  /** Weather allow to drag  */
  disabled?: boolean
  /** Weather allow to drop on it */
  droppable?: boolean
  onDragStart?: (event: DragEvent) => void
  onDragEnd?: (event: DragEvent) => void
  onDragLeave?: (event: DragEvent) => void
  onDragOver?: (event: DragEvent) => void
  onDrop?: (event: any, dropPosition: DragPosition) => void
}

export interface DraggableProps {
  children?: JSXElement
  direction?: 'horizontal' | 'vertical'
  class?: string
  itemWrapperStyle?: JSX.CSSProperties | string
  onIndexChange?: (index: number, prevIndex: number) => void
}
