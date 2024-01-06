import cs from '../../utils/classNames'
import { useConfigContext } from '../config-provider'
import { type ButtonGroupProps } from './interface'

function GroupComponent(props: ButtonGroupProps) {
  const ctx = useConfigContext()
  const prefixCls = ctx.getPrefixCls('btn-group')

  return <div {...props} class={cs(prefixCls, props.class)} />
}

GroupComponent.displayName = 'ButtonGroup'

export default GroupComponent

export { type ButtonGroupProps }
