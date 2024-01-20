import { JSX, ParentProps, splitProps } from 'solid-js'
import cs from '../../utils/classNames'
import { useConfigContext } from '../config-provider'

interface HoverProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'mini' | 'default' | 'large'
  prefix?: string
  disabled?: boolean
  onClick?: JSX.HTMLAttributes<HTMLSpanElement>['onClick']
}

export default function IconHover(props: ParentProps<HoverProps>) {
  const [local, rest] = splitProps(props, ['class', 'disabled', 'prefix', 'size'])
  const ctx = useConfigContext()
  const prefixCls = ctx.getPrefixCls?.('icon-hover')

  const size = local.size || 'default'

  return (
    <span
      {...rest}
      class={cs(
        prefixCls,
        {
          [`${local.prefix}-icon-hover`]: local.prefix,
          [`${prefixCls}-size-${local.size}`]: size && size !== 'default',
          [`${prefixCls}-disabled`]: local.disabled,
        },
        props.class,
      )}
    />
  )
}
