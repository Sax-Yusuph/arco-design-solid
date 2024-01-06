import { Show, children, mergeProps, splitProps } from 'solid-js'
import cs from '../../utils/classNames'
import { useConfigContext } from '../config-provider'
import { type DividerProps } from './interface'

const defaultProps: DividerProps = {
  type: 'horizontal',
  orientation: 'center',
}

function Divider(baseProps: DividerProps) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.Divider, baseProps)

  const [props, restProps] = splitProps(mergedProps, [
    'class',
    'children',
    'style',
    'type',
    'orientation',
    'children',
  ])

  const prefixCls = ctx.getPrefixCls('divider')
  const node = children(() => props.children)

  return (
    <div
      role="separator"
      {...restProps}
      class={cs(
        prefixCls,
        `${prefixCls}-${props.type}`,
        {
          [`${prefixCls}-with-text`]: node(),
          [`${prefixCls}-with-text-${props.orientation}`]: node() && props.orientation,
        },
        props.class,
      )}
    >
      <Show when={node() && props.type === 'horizontal'}>
        <span class={`${prefixCls}-text ${prefixCls}-text-${props.orientation}`}>{node()}</span>
      </Show>
    </div>
  )
}

Divider.displayName = 'Divider'

export default Divider

export { type DividerProps }
