// import IconEmpty from '../../icon/react-icon/IconEmpty'
import { Match, Switch, mergeProps, splitProps, untrack } from 'solid-js'
import { IconEmpty } from '../../icons'
import cs from '../../utils/classNames'
import { useConfigContext } from '../config-provider'
import { type EmptyProps } from './interface'

function EmptyComponent(baseProps: EmptyProps) {
  const ctx = useConfigContext()
  const props = mergeProps({}, ctx.componentConfig?.Empty, baseProps)

  const [localProps, rest] = splitProps(props, ['description', 'icon', 'imgSrc'])

  const prefixCls = untrack(() => ctx.getPrefixCls?.('empty'))
  const noData = ctx.locale?.Empty['noData'] as string

  const alt = typeof localProps.description === 'string' ? localProps.description : 'empty'

  return (
    <div class={cs(prefixCls, baseProps.class)} {...rest}>
      <div class={`${prefixCls}-wrapper`}>
        <div class={`${prefixCls}-image`}>
          <Switch fallback={<IconEmpty />}>
            <Match when={localProps.imgSrc}>
              <img alt={alt} src={localProps.imgSrc} />
            </Match>

            <Match when={localProps.icon}>{localProps.icon}</Match>
          </Switch>
        </div>
        <div class={`${prefixCls}-description`}>{localProps.description || noData}</div>
      </div>
    </div>
  )
}

EmptyComponent.displayName = 'Empty'

export default EmptyComponent

export { type EmptyProps }
