import { Show, mergeProps, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import cs from '../../utils/classNames'
import useKeyboardEvent from '../../utils/use-keyboard'
import { useConfigContext } from '../config-provider'
import { IconLink } from '../icon'
import type { LinkProps } from './interface'

const defaultProps: LinkProps = {
  hoverable: true,
}

function Link(baseProps: LinkProps) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.Link, baseProps)
  const [props, restProps] = splitProps(mergedProps, [
    'children',
    'icon',
    'status',
    'disabled',
    'hoverable',
    'class',
  ])

  const getKeyboardEvents = useKeyboardEvent({ onKeyDown: restProps.onKeyDown })
  const prefixCls = ctx.getPrefixCls?.('link')

  const handleClick = (e: any) => {
    if (props.disabled) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      typeof restProps.onClick === 'function' && restProps.onClick(e)
    }
  }

  return (
    <Dynamic
      {...restProps}
      component={'href' in restProps ? 'a' : 'span'}
      class={cs(
        prefixCls,
        {
          [`${prefixCls}-disabled`]: props.disabled,
          [`${prefixCls}-is-${props.status}`]: props.status,
          [`${prefixCls}-with-icon`]: props.icon,
          [`${prefixCls}-hoverless`]: !props.hoverable,
          [`${prefixCls}-rtl`]: ctx.rtl,
        },
        props.class,
      )}
      tabIndex={props.disabled ? -1 : undefined}
      onClick={handleClick}
      {...getKeyboardEvents({
        onPressEnter: handleClick,
      })}
    >
      <Show when={props.icon}>
        <span class={`${prefixCls}-icon`}>
          <Show when={props.icon === true} fallback={props.icon}>
            {<IconLink />}
          </Show>
        </span>
      </Show>

      {props.children}
    </Dynamic>
  )
}

Link.displayName = 'Link'

export default Link

export { type LinkProps }
