import { debounce } from '@solid-primitives/scheduled'
import {
    Match,
    Show,
    Switch,
    children,
    createComputed,
    createEffect,
    createMemo,
    createSignal,
    mergeProps,
    onCleanup,
    splitProps,
} from 'solid-js'
import { IconLoading } from "../../icon/arco-icons"
import cs from '../../utils/classNames'
import { addClass, addStyle, toPx } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import DotLoading from './dot-loading'
import type { SpinProps } from './interface'

const LoadingIcon = (
  props: Pick<SpinProps, 'icon' | 'element' | 'size' | 'dot'> & { prefixCls?: string },
) => {
  const icon = children(() => props.icon)
  const element = children(() => props.element)

  createEffect(() => {
    const iconNode = icon.toArray()[0]
    addClass(iconNode, cs(`${props.prefixCls?.replace('-spin', '-icon')}-loading`))
    addStyle(iconNode, 'font-size', toPx(props.size))
  })

  return (
    <span class={`${props.prefixCls}-icon`}>
      <Switch fallback={<IconLoading style={{ 'font-size': toPx(props.size) }} />}>
        <Match when={icon()}>{icon()}</Match>
        <Match when={element()}>{element()}</Match>
        <Match when={props.dot}>
          <DotLoading size={toPx(props.size)} />
        </Match>
      </Switch>
    </span>
  )
}

const splitable = [
  'class',
  'children',
  'loading',
  'size',
  'icon',
  'element',
  'tip',
  'dot',
  'delay',
  'block',
] as const

function Spin(baseProps: SpinProps) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps({ block: false }, ctx.componentConfig?.Spin, baseProps)
  const [props, restProps] = splitProps(mergedProps, splitable)

  const [delayedLoading, setDelayedLoading] = createSignal(props.delay ? false : props.loading)

  const debouncedSetLoading = debounce((v: boolean) => setDelayedLoading(v), props.delay)

  const _usedLoading = createMemo(() => (props.delay ? delayedLoading() : props.loading))
  const prefixCls = ctx.getPrefixCls?.('spin')

  createComputed(() => {
    if (props.delay) {
      debouncedSetLoading(props.loading || false)
    }
  })

  onCleanup(() => {
    debouncedSetLoading?.clear()
  })

  const childrenNodes = children(() => props.children)

  return (
    <div
      {...restProps}
      class={cs(
        prefixCls,
        {
          [`${prefixCls}-block`]: props.block,
          [`${prefixCls}-loading`]: _usedLoading(),
          [`${prefixCls}-with-tip`]: props.tip && !children,
        },
        props.class,
      )}
    >
      <Show
        when={!childrenNodes()}
        fallback={
          <>
            <div class={`${prefixCls}-children`}>{childrenNodes()}</div>
            <Show when={_usedLoading()}>
              <div class={`${prefixCls}-loading-layer`} style={{ 'font-size': toPx(props.size) }}>
                <span class={`${prefixCls}-loading-layer-inner`}>
                  <LoadingIcon
                    icon={props.icon}
                    element={props.element}
                    dot={props.dot}
                    size={props.size}
                    prefixCls={prefixCls}
                  />
                  <Show when={props.tip}>
                    <div class={`${prefixCls}-tip`}>{props.tip}</div>
                  </Show>
                </span>
              </div>
            </Show>
          </>
        }
      >
        <LoadingIcon
          icon={props.icon}
          element={props.element}
          dot={props.dot}
          size={props.size}
          prefixCls={prefixCls}
        />
        <Show when={props.tip}>
          <div class={`${prefixCls}-tip`}>{props.tip}</div>
        </Show>
      </Show>
    </div>
  )
}

Spin.displayName = 'Spin'

export default Spin

export type { SpinProps }
