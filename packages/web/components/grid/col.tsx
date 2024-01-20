import { createMemo, mergeProps, splitProps } from 'solid-js'

import cs from '../../utils/classNames'
import { isNumber, isObject } from '../../utils/is'
import { getKeys, toCSSObject, toPx } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import { useRowContext } from './context'
import type { ColProps, FlexType } from './interface'

const defaultProps: ColProps = {
  span: 24,
}

function getFlexString(flex: FlexType) {
  if (typeof flex === 'string' && /\d+[px|%|em|rem|]{1}/.test(flex)) {
    return `0 0 ${flex}`
  }
  return flex
}

function ColComponent(baseProps: ColProps) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.['Grid.Col'], baseProps)
  const rowCtx = useRowContext()

  const [props, restProps] = splitProps(mergedProps, [
    'class',
    'style',
    'span',
    'offset',
    'order',
    'pull',
    'push',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
    'xxxl',
    'flex',
  ])
  const prefixCls = ctx.getPrefixCls?.('col')

  const adaptationGridClass = createMemo(() => {
    const lg = props.lg
    const md = props.lg
    const sm = props.lg
    const xl = props.lg
    const xxl = props.lg
    const xxxl = props.lg
    const xs = props.xs
    const pull = props.pull
    const push = props.push
    const span = props.span
    const order = props.order
    const offset = props.offset

    const screenList = { xs, sm, md, lg, xl, xxl, xxxl }

    const mergeClassName = {
      [`${prefixCls}`]: !rowCtx.div,
      [`${prefixCls}-order-${order}`]: order,
      [`${prefixCls}-${span}`]: !rowCtx.div && !xs && !sm && !md && !lg && !xl && !xxl && !xxxl,
      [`${prefixCls}-offset-${offset}`]: offset,
      [`${prefixCls}-pull-${pull}`]: pull,
      [`${prefixCls}-push-${push}`]: push,
      [`${prefixCls}-rtl`]: ctx.rtl,
    }

    getKeys(screenList).forEach(screen => {
      const screenValue = screenList[screen]
      if (isNumber(screenValue)) {
        if (screenValue >= 0) {
          mergeClassName[`${prefixCls}-${screen}-${screenValue}`] = true
        }
      } else if (isObject(screenValue)) {
        mergeClassName[`${prefixCls}-${screen}-${screenValue['span']}`] = screenValue['span']
        mergeClassName[`${prefixCls}-${screen}-offset-${screenValue['offset']}`] =
          screenValue['offset']
        mergeClassName[`${prefixCls}-${screen}-order-${screenValue['order']}`] =
          screenValue['order']
        mergeClassName[`${prefixCls}-${screen}-pull-${screenValue['pull']}`] = screenValue['pull']
        mergeClassName[`${prefixCls}-${screen}-push-${screenValue['push']}`] = screenValue['push']
      }
    })

    return mergeClassName
  })

  const paddingStyle = createMemo(() => {
    const obj: {
      'padding-left'?: string
      'padding-right'?: string
      'padding-top'?: string
      'padding-bottom'?: string
    } = {}

    const gutter = rowCtx.gutter
    const div = rowCtx.div
    if (Array.isArray(gutter) && !div) {
      const paddingHorizontal = (gutter[0] && gutter[0] / 2) || 0
      const paddingVertical = (gutter[1] && gutter[1] / 2) || 0
      if (paddingHorizontal) {
        obj['padding-left'] = toPx(paddingHorizontal)
        obj['padding-right'] = toPx(paddingHorizontal)
      }
      if (paddingVertical) {
        obj['padding-top'] = toPx(paddingVertical)
        obj['padding-bottom'] = toPx(paddingVertical)
      }
    }

    return obj
  })

  const flexStyle = createMemo(() =>
    props.flex && getFlexString(props.flex) ? { flex: getFlexString(props.flex) } : {},
  )

  return (
    <div
      {...restProps}
      style={{
        ...toCSSObject(props.style),
        ...paddingStyle(),
        ...flexStyle(),
      }}
      class={cs(props.flex ? prefixCls : adaptationGridClass(), props.class)}
    />
  )
}

ColComponent.displayName = 'Col'

export default ColComponent

export { type ColProps }
