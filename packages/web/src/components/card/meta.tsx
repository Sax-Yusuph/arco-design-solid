import {
	JSX,
	ParentProps,
	Show,
	children,
	createEffect,
	createSignal,
	onCleanup,
	splitProps,
} from 'solid-js'
import cs from '../../utils/classNames'
import { createInitializedContext } from '../../utils/context'
import { useConfigContext } from '../config-provider'
import type { CardMetaProps } from './interface'

export const { provider: MetaProvider, use: useMetaContext } = createInitializedContext(
  'MetaContext',
  () => {
    const [actionList, setActionList] = createSignal<JSX.Element>()
    return {
      set: setActionList,
      clear: () => setActionList(undefined),

      get actionList() {
        return actionList()
      },

      get ready() {
        return true
      },
    }
  },
)

// this allows us to magically insert actionList in a Meta component
export function MetaSlot(props: ParentProps<{ isMeta: boolean }>) {
  const ctx = useMetaContext()

  createEffect(() => {
    if (props.isMeta) {
      ctx.set(props.children)
    }
  })

  onCleanup(() => {
    ctx.clear()
  })

  return (
    <Show when={!props.isMeta} fallback={null}>
      {props.children}
    </Show>
  )
}

function Meta(baseProps: CardMetaProps) {
  const [props, restProps] = splitProps(baseProps, [
    'class',
    'title',
    'avatar',
    'description',
    'actionList',
  ])
  const ctx = useConfigContext()
  const prefixCls = ctx.getPrefixCls?.('card-meta')
  const actionList = children(() => props.actionList)

  const metaCtx = useMetaContext()

  return (
    <div {...restProps} class={cs(prefixCls, props.class)}>
      <Show when={props.title || props.description}>
        <div class={`${prefixCls}-content`}>
          <Show when={props.title}>
            <div class={`${prefixCls}-title`}>{props.title}</div>
          </Show>
          <Show when={props.description}>
            <div class={`${prefixCls}-description`}>{props.description}</div>
          </Show>
        </div>
      </Show>

      <Show when={props.avatar || props.actionList}>
        <div
          class={cs(`${prefixCls}-footer `, {
            [`${prefixCls}-footer-only-actions`]: !props.avatar,
          })}
        >
          <Show when={props.avatar}>
            <div class={`${prefixCls}-avatar`}>{props.avatar}</div>
          </Show>

          <Show when={actionList()} fallback={metaCtx.actionList}>
            {actionList()}
          </Show>
        </div>
      </Show>
    </div>
  )
}

Meta.displayName = 'CardMeta'

export default Meta

export { type CardMetaProps }
