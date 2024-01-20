import { children } from 'solid-js'
import cs from '../../utils/classNames'
import { useConfigContext } from '../config-provider'
import type { CardGridProps } from './interface'

function Grid(props: CardGridProps) {
  const ctx = useConfigContext()
  const prefixCls = ctx.getPrefixCls?.('card-grid')
  const nodes = children(() => props.children)

  return (
    <div
      ref={props.ref}
      style={props.style}
      class={cs(prefixCls, { [`${prefixCls}-hoverable`]: props.hoverable }, props.class)}
    >
      {nodes()}
    </div>
  )
}

Grid.displayName = 'CardGrid'

export default Grid

export { type CardGridProps }
