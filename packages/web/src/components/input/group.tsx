import { splitProps } from 'solid-js'
import cs from '../../utils/classNames'
import { useConfigContext } from '../config-provider'
import type { InputGroupProps } from './interface'

const Group = (baseProps: InputGroupProps) => {
  const ctx = useConfigContext()

  const [props, restProps] = splitProps(baseProps, ['style', 'class', 'compact'])
  const prefixCls = ctx.getPrefixCls?.('input-group')

  return (
    <div
      {...restProps}
      class={cs(prefixCls, { [`${prefixCls}-compact`]: props.compact }, props.class)}
      style={props.style}
    />
  )
}

Group.displayName = 'InputGroup'

export default Group

export { type InputGroupProps }
