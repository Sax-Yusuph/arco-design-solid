// import IconLoading from '../../icon/react-icon/IconLoading';
import { JSX, Show, children, createMemo, mergeProps, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { IconLoading } from '../../icons'
import cs from '../../utils/classNames'
import { useConfigContext } from '../config-provider'
import Group from './group'
import { type ButtonProps } from './interface'

const defaultProps: ButtonProps = {
  htmlType: 'button',
  type: 'default',
  shape: 'square',
}

function Button(baseProps: ButtonProps) {
  const ctx = useConfigContext()

  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.Button, baseProps)

  const [props, restProps] = splitProps(mergedProps, [
    'ref',
    'style',
    'class',
    'children',
    'htmlType',
    'type',
    'status',
    'size',
    'shape',
    'href',
    'anchorProps',
    'disabled',
    'loading',
    'loadingFixedWidth',
    'icon',
    'iconOnly',
    'onClick',
    'long',
  ])

  const prefixCls = ctx.getPrefixCls('btn')

  const handleClick: JSX.EventHandler<HTMLElement, MouseEvent> = (event): void => {
    if (props.loading || props.disabled) {
      event.preventDefault?.()
      return
    }

    props.onClick?.(event)
  }

  const finalProps = createMemo(() => {
    if (props.href) {
      const _anchorProps = props.anchorProps || {}
      if (props.disabled) {
        delete _anchorProps.href
      } else {
        _anchorProps.href = props.href
      }

      return _anchorProps
    }

    return { type: props.htmlType }
  })

  const nodes = children(() => props.children)

  return (
    <Dynamic
      ref={props.ref}
      component={props.href ? 'a' : 'button'}
      onClick={handleClick}
      style={props.style}
      class={cs(
        prefixCls,
        `${prefixCls}-${props.type === 'default' ? 'secondary' : props.type}`,
        `${prefixCls}-size-${props.size || ctx.size}`,
        `${prefixCls}-shape-${props.shape}`,
        {
          [`${prefixCls}-long`]: props.long,
          [`${prefixCls}-status-${props.status}`]: props.status,
          [`${prefixCls}-loading-fixed-width`]: props.loadingFixedWidth,
          [`${prefixCls}-loading`]: props.loading,
          [`${prefixCls}-link`]: props.href,
          [`${prefixCls}-icon-only`]:
            props.iconOnly ||
            (!props.children && props.children !== 0 && (props.icon || props.loading)),
          [`${prefixCls}-disabled`]: props.disabled,
          [`${prefixCls}-rtl`]: ctx.rtl,
          // [`${prefixCls}-two-chinese-chars`]: isTwoCNChar,
        },
        props.class,
      )}
      disabled={props.disabled}
      {...finalProps}
      {...restProps}
    >
      <Show when={props.loading} fallback={props.icon}>
        {<IconLoading />}
      </Show>

      <Show when={nodes()}>
        <Show when={typeof nodes() === 'string'} fallback={nodes()}>
          <span>{nodes()}</span>
        </Show>
      </Show>
    </Dynamic>
  )
}

const ButtonComponent = Button as typeof Button & {
  __BYTE_BUTTON: boolean
  Group: typeof Group
}

ButtonComponent.__BYTE_BUTTON = true

ButtonComponent.Group = Group

export default ButtonComponent

export { type ButtonProps }
