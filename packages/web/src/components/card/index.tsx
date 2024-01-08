import { For, Show, children, mergeProps, splitProps } from 'solid-js'
import { createStore } from 'solid-js/store'
import cs from '../../utils/classNames'
import { useConfigContext } from '../config-provider'
import Grid from './grid'
import type { CardProps } from './interface'
import Meta, { MetaProvider, MetaSlot } from './meta'

const Spin = () => <>Spin</>
const defaultProps: CardProps = {
  size: 'default',
  bordered: true,
}

function Card(baseProps: CardProps) {
  const ctx = useConfigContext()
  const merged = mergeProps(defaultProps, ctx.componentConfig?.Card, baseProps)

  const [props, restProps] = splitProps(merged, [
    'class',
    'children',
    'bordered',
    'loading',
    'hoverable',
    'size',
    'title',
    'extra',
    'cover',
    'actions',
    'headerStyle',
    'bodyStyle',
  ])

  const prefixCls = ctx.getPrefixCls?.('card')
  const actionList = children(() => props.actions)

  const [state, setState] = createStore({
    isContainGrid: false,
    isContainMeta: false,
  })

  const nodeList = children(() => props.children)

  return (
    <div
      {...restProps}
      class={cs(
        prefixCls,
        `${prefixCls}-size-${props.size}`,
        {
          [`${prefixCls}-loading`]: props.loading,
          [`${prefixCls}-bordered`]: props.bordered,
          [`${prefixCls}-hoverable`]: props.hoverable,
          [`${prefixCls}-contain-grid`]: state.isContainGrid,
          [`${prefixCls}-rtl`]: ctx.rtl,
        },
        props.class,
      )}
    >
      <Show when={props.title || props.extra}>
        <div
          class={cs(`${prefixCls}-header`, { [`${prefixCls}-header-no-title`]: !props.title })}
          style={props.headerStyle}
        >
          {props.title && <div class={`${prefixCls}-header-title`}>{props.title}</div>}
          {props.extra && <div class={`${prefixCls}-header-extra`}>{props.extra}</div>}
        </div>
      </Show>

      <Show when={props.cover}>
        <div class={`${prefixCls}-cover`}>{props.cover}</div>
      </Show>

      <div class={`${prefixCls}-body`} style={props.bodyStyle}>
        <Show when={!props.loading} fallback={ctx.loadingElement || <Spin />}>
          {nodeList()}
        </Show>

        <Show when={actionList.toArray().length}>
          <MetaSlot isMeta={state.isContainMeta}>
            <div class={`${prefixCls}-actions`}>
              <div class={`${prefixCls}-actions-right`}>
                <For each={actionList.toArray()}>
                  {action => <span class={`${prefixCls}-actions-item`}>{action}</span>}
                </For>
              </div>
            </div>
          </MetaSlot>
        </Show>
      </div>
    </div>
  )
}

const CardComponent = (props: CardProps) => {
  return (
    <MetaProvider>
      <Card {...props} />
    </MetaProvider>
  )
}

CardComponent.Meta = Meta
CardComponent.Grid = Grid

export default CardComponent

export { type CardProps }
