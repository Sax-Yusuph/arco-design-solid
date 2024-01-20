import { createComputed, onCleanup, splitProps } from 'solid-js'
import { createStore } from 'solid-js/store'
import cs from '../../../utils/classNames'
import { DragPosition, DragStatus, DraggableItemProps } from './interface'

type StoreType = {
  draggedTimer: number | null
  dragStatus: DragStatus
  dragOver: boolean
  dragPosition: DragPosition | null
}

function Item(baseProps: DraggableItemProps) {
  const [props] = splitProps(baseProps, [
    'prefixCls',
    'style',
    'children',
    'direction',
    'disabled',
    'droppable',
    'onDrop',
    'onDragStart',
    'onDragEnd',
    'onDragOver',
    'onDragLeave',
  ])
  let refItem!: HTMLLIElement

  const [state, setState] = createStore<StoreType>({
    draggedTimer: null,
    dragStatus: 'none',
    dragOver: false,
    dragPosition: null,
  })

  onCleanup(() => {
    state.draggedTimer && clearTimeout(state.draggedTimer)
  })

  createComputed(() => {
    if (state.dragStatus === 'dragged') {
      setState(
        'draggedTimer',
        window.setTimeout(() => setState('dragStatus', 'none'), 1000),
      )
    }
  })

  return (
    <li
      draggable
      ref={refItem}
      style={props.style}
      class={cs(`${props.prefixCls}-item`, {
        [`${props.prefixCls}-item-${state.dragStatus}`]: state.dragStatus !== 'none',
        [`${props.prefixCls}-item-gap-${state.dragPosition}`]: state.dragPosition,
        [`${props.prefixCls}-item-disabled`]: props.disabled,
        [`${props.prefixCls}-item-dragover`]: state.dragOver,
      })}
      onDragStart={event => {
        event.stopPropagation()
        setState('dragStatus', 'dragging')

        try {
          // ie throw error
          // firefox-need-it
          event.dataTransfer?.setData('text/plain', '')
        } catch (error) {}

        props.onDragStart && props.onDragStart(event)
      }}
      onDragEnd={event => {
        event.stopPropagation()
        setState({ dragOver: false, dragStatus: 'dragged' })

        props.onDragEnd && props.onDragEnd(event)
      }}
      onDragOver={event => {
        if (props.droppable) {
          event.stopPropagation()
          event.preventDefault()

          const rect = refItem.getBoundingClientRect()
          let dragPosition: DragPosition | null = null

          if (props.direction === 'vertical') {
            dragPosition =
              event.pageY > window.pageYOffset + rect.top + rect.height / 2 ? 'bottom' : 'top'
          } else {
            dragPosition =
              event.pageX > window.pageXOffset + rect.left + rect.width / 2 ? 'right' : 'left'
          }
          setState({ dragPosition, dragOver: true })

          props.onDragOver && props.onDragOver(event)
        }
      }}
      onDragLeave={event => {
        if (props.droppable) {
          event.stopPropagation()
          setState({ dragOver: false })
          props.onDragLeave && props.onDragLeave(event)
        }
      }}
      onDrop={event => {
        if (props.droppable) {
          event.stopPropagation()
          event.preventDefault()
          setState({ dragOver: false, dragPosition: null, dragStatus: 'none' })
          props.onDrop && props.onDrop(event, state.dragPosition as DragPosition)
        }
      }}
    >
      {props.children}
    </li>
  )
}

export default Item
