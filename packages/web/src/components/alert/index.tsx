import { JSXElement, Match, Show, Switch, mergeProps, splitProps } from 'solid-js'
import { Transition } from 'solid-transition-group'
import {
	IconCheckCircleFill,
	IconClose,
	IconCloseCircleFill,
	IconExclamationCircleFill,
	IconInfoCircleFill,
} from '../../icons'
import cs from '../../utils/classNames'
import { createLocalSignal } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import { type AlertProps } from './interface'

const defaultProps: AlertProps = {
  showIcon: true,
  type: 'info',
}

function Alert(baseProps: AlertProps) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig.Alert, baseProps)
  const [props, restProps] = splitProps(mergedProps, [
    'style',
    'class',
    'action',
    'title',
    'content',
    'icon',
    'showIcon',
    'closable',
    'closeable',
    'afterClose',
    'onClose',
    'closeElement',
    'banner',
    'type',
  ])

  const prefixCls = ctx.getPrefixCls('alert')
  const isVisible = createLocalSignal(true)

  function IconElement(option: { type: string | void }): JSXElement | null {
    return (
      <Switch>
        <Match when={props.icon}>{props.icon}</Match>
        <Match when={option.type === 'info'}>
          <IconInfoCircleFill />
        </Match>
        <Match when={option.type === 'success'}>
          <IconCheckCircleFill />
        </Match>
        <Match when={option.type === 'warning'}>
          <IconExclamationCircleFill />
        </Match>
        <Match when={option.type === 'error'}>
          <IconCloseCircleFill />
        </Match>
      </Switch>
    )
  }

  function onHandleClose(e: MouseEvent) {
    isVisible.set(false)
    props.onClose?.(e)
  }

  return (
    <Transition
      name="zoomInTop"
      onAfterExit={() => {
        props.afterClose?.()
      }}
    >
      <Show when={isVisible.get()}>
        <div
          style={props.style}
          class={cs(
            prefixCls,
            `${prefixCls}-${props.type}`,
            {
              [`${prefixCls}-with-title`]: props.title,
              [`${prefixCls}-banner`]: props.banner,
              [`${prefixCls}-rtl`]: ctx.rtl,
            },
            props.class,
          )}
          role="alert"
          {...restProps}
        >
          <Show when={props.showIcon}>
            <div class={`${prefixCls}-icon-wrapper`}>
              <IconElement type={props.type} />
            </div>
          </Show>

          <div class={`${prefixCls}-content-wrapper`}>
            <Show when={props.title}>
              <div class={`${prefixCls}-title`}>{props.title}</div>
            </Show>

            <Show when={props.content}>
              <div class={`${prefixCls}-content`}>{props.content}</div>
            </Show>
          </div>
          <Show when={props.action}>
            <div class={`${prefixCls}-action`}>{props.action}</div>
          </Show>

          <Show when={'closeable' in props ? props.closeable : props.closable}>
            <button type="button" onClick={onHandleClose} class={`${prefixCls}-close-btn`}>
              {props.closeElement || <IconClose />}
            </button>
          </Show>
        </div>
      </Show>
    </Transition>
  )
}

export default Alert

export { type AlertProps }
