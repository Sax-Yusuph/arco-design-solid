import { ParentProps, Show, children, mergeProps, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { IconCheck, IconClose, IconExclamation, IconInfo } from "../../icon/arco-icons"
import cs from '../../utils/classNames'
import { useConfigContext } from '../config-provider'
import Image403 from './403'
import Image404 from './404'
import Image500 from './500'
import type { ResultProps } from './interface'

const defaultIcons = {
  success: IconCheck,
  info: IconInfo,
  warning: IconExclamation,
  error: IconClose,
  '404': Image404,
  '403': Image403,
  '500': Image500,
} as const

const defaultProps: ResultProps = {
  status: 'info',
}

function Result(baseProps: ParentProps<ResultProps>) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.Result, baseProps)
  const [props, restProps] = splitProps(mergedProps, [
    'class',
    'status',
    'title',
    'subTitle',
    'extra',
    'children',
    'icon',
  ])

  const prefixCls = ctx.getPrefixCls?.('result')

  const title = children(() => props.title)
  const subTitle = children(() => props.subTitle)
  const extra = children(() => props.extra)
  const child = children(() => props.children)

  return (
    <div
      {...restProps}
      class={cs(
        prefixCls,
        {
          [`${prefixCls}-is-${props.status}`]: props.status,
          [`${prefixCls}-rtl`]: ctx.rtl,
        },
        props.class,
      )}
    >
      <div class={`${prefixCls}-icon`}>
        <span
          class={cs(`${prefixCls}-icon-tip`, {
            [`${prefixCls}-icon-${props.status}`]: props.status,
            [`${prefixCls}-icon-custom`]: props.status === null,
          })}
        >
          <Show
            when={'icon' in props}
            fallback={<Dynamic component={defaultIcons[props.status || 'info']} />}
          >
            {props.icon}
          </Show>
        </span>
      </div>

      <Show when={title()}>
        <div class={`${prefixCls}-title`}>{title()}</div>
      </Show>

      <Show when={subTitle()}>
        <div class={`${prefixCls}-subtitle`}>{subTitle()}</div>
      </Show>

      <Show when={extra()}>
        <div class={`${prefixCls}-extra`}>{extra()}</div>
      </Show>

      <Show when={child()}>
        <div class={`${prefixCls}-content`}>{child()}</div>
      </Show>
    </div>
  )
}

Result.displayName = 'Result'

export default Result

export { ResultProps }
