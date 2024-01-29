import cs from '../../utils/classNames'

import { JSX, Match, Show, Switch, createMemo, mergeProps, splitProps } from 'solid-js'
import { toPx } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import Count from './count'
import type { BadgeProps } from './interface'

const InnerColors = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
]

const defaultProps: BadgeProps = {
  count: 0,
  maxCount: 99,
}

function Badge(baseProps: BadgeProps) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.Badge, baseProps)

  const [props, restProps] = splitProps(mergedProps, [
    'count',
    'text',
    'dotClassName',
    'dot',
    'maxCount',
    'color',
    'dotStyle',
    'offset',
    'status',
    'children',
    'class',
  ])

  const prefixCls = ctx.getPrefixCls?.('badge')
  const dotStyle = createMemo<JSX.CSSProperties>(() => {
    const style = props.dotStyle || {}

    const [leftOffset, topOffset] = props.offset || []

    if (leftOffset) {
      style['margin-right'] = toPx(-leftOffset)
    }

    if (topOffset) {
      style['margin-top'] = toPx(topOffset)
    }
    return style
  })

  const colorStyle = createMemo(() => {
    if (!props.color || InnerColors.indexOf(props.color) > -1) {
      return {}
    }

    return { 'background-color': props.color }
  })

  return (
    <span
      class={cs(
        prefixCls,
        {
          [`${prefixCls}-status`]: props.status,
          [`${prefixCls}-no-children`]: !('children' in props),
          [`${prefixCls}-rtl`]: ctx.rtl,
        },
        props.class,
      )}
      {...restProps}
    >
      {props.children}

      <Show
        when={typeof props.count !== 'object'}
        fallback={
          <span class={cs(`${prefixCls}-custom-dot`, props.dotClassName)} style={dotStyle()}>
            {props.count}
          </span>
        }
      >
        <Switch
          fallback={
            <Count
              prefixCls={prefixCls!}
              class={cs(
                {
                  [`${prefixCls}-number`]: !(props.dot || props.color),
                  [`${prefixCls}-dot`]: props.dot || props.color,
                  [`${prefixCls}-color-${props.color}`]: props.color,
                },
                props.dotClassName,
              )}
              style={{ ...colorStyle(), ...dotStyle() }}
              maxCount={props.maxCount}
              count={props.count as number}
              dot={props.dot || Boolean(props.color)}
            />
          }
        >
          {/* // display a red dot if color and status are NOT set */}
          <Match when={props.text && !props.color && !props.status}>
            <span class={cs(`${prefixCls}-text`, props.dotClassName)} style={dotStyle()}>
              {props.text}
            </span>
          </Match>

          <Match
            when={
              props.status || (props.color && typeof props.count === 'number' && props.count <= 0)
            }
          >
            <span class={`${prefixCls}-status-wrapper`}>
              <span
                class={cs(
                  `${prefixCls}-status-dot`,
                  {
                    [`${prefixCls}-status-${props.status}`]: props.status,
                    [`${prefixCls}-color-${props.color}`]: props.color,
                  },
                  props.dotClassName,
                )}
                style={{ ...colorStyle(), ...dotStyle() }}
              />

              <Show when={props.text}>
                <span class={`${prefixCls}-status-text`}>{props.text} </span>
              </Show>
            </span>
          </Match>
        </Switch>
      </Show>
    </span>
  )
}

Badge.displayName = 'Badge'

export default Badge

export { type BadgeProps }
