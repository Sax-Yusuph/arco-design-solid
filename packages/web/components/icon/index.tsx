import { Component, JSX, mergeProps, splitProps } from 'solid-js'
import cs from '../../utils/classNames'
import { useConfigContext } from '../config-provider'
import addFromIconFontCn from './addFromIconFontCn'

export interface IconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  type?: string
  spin?: boolean
}

export interface CustomIconComponentProps {
  style?: JSX.CSSProperties
  className?: string
  width?: string | number
  height?: string | number
  fill?: string
  viewBox?: string
}

const defaultProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
}

const Icon: Component<IconProps> & { addFromIconFontCn: typeof addFromIconFontCn } = baseProps => {
  const ctx = useConfigContext()
  const iconProps = mergeProps(defaultProps, baseProps)
  const [props, restProps] = splitProps(iconProps, ['spin', 'type', 'class'])

  const prefixCls = ctx.getPrefixCls?.('icon')

  return (
    <svg
      {...restProps}
      class={cs(
        prefixCls,
        props.type,
        {
          [`${prefixCls}-loading`]: props.spin,
        },
        props.class,
      )}
    />
  )
}

Icon.addFromIconFontCn = addFromIconFontCn
export default Icon
