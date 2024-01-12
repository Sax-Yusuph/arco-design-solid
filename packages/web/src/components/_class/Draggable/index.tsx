import { For, children, createSignal } from 'solid-js'
import cs from '../../../utils/classNames'
import { useConfigContext } from '../../config-provider'
import { DraggableProps } from './interface'
import Item from './item'

export default function Draggable(props: DraggableProps) {
  const ctx = useConfigContext()
  const prefixCls = ctx.getPrefixCls?.('draggable')

  const [dragItemIndex, setDragItemIndex] = createSignal<number | null>(null)
  const nodes = children(() => props.children)

  return (
    <div class={cs(prefixCls, props.class)}>
      <For each={nodes.toArray()}>
        {(child, index) => (
          <Item
            style={props.itemWrapperStyle}
            prefixCls={prefixCls!}
            direction={props.direction || 'vertical'}
            onDragStart={() => setDragItemIndex(index())}
            onDragEnd={() => setDragItemIndex(null)}
            onDrop={(_, dropPosition) => {
              const prevIndex = dragItemIndex()
              const nextIndex =
                dropPosition === 'left' || dropPosition === 'top' ? index() : index() + 1
              if (props.onIndexChange && prevIndex !== nextIndex) {
                props.onIndexChange(nextIndex, prevIndex!)
              }
            }}
          >
            {child}
          </Item>
        )}
      </For>
    </div>
  )
}
