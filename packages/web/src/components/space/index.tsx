import { JSX, children, createEffect, createMemo, mergeProps, splitProps } from 'solid-js'
import cs from '../../utils/classNames'
import { isArray, isNumber } from '../../utils/is'
import { getKeys, toPx } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import type { SpaceProps, SpaceSize } from './interface'

const defaultProps: SpaceProps = {
  size: 'small',
  direction: 'horizontal',
}

function SpaceComponent(baseProps: SpaceProps) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.Space, baseProps)

  const [props, restProps] = splitProps(mergedProps, [
    'children',
    'class',
    'size',
    'direction',
    'align',
    'wrap',
    'split',
  ])

  const prefixCls = ctx.getPrefixCls?.('space')

  const classNames = createMemo(() => {
    const innerAlign = props.align || (props.direction === 'horizontal' ? 'center' : '')
    return cs(
      prefixCls,
      {
        [`${prefixCls}-${props.direction}`]: props.direction,
        [`${prefixCls}-align-${innerAlign}`]: innerAlign,
        [`${prefixCls}-wrap`]: props.wrap,
        [`${prefixCls}-rtl`]: ctx.rtl,
      },
      props.class,
    )
  })

  const childrenList = children(() => props.children)

  createEffect(() => {
    const nodeList = childrenList.toArray()
    const split = props.split

    nodeList.forEach((node, index) => {
      if (node instanceof Element) {
        const splitClassName = `${prefixCls}-item-split`
        const shouldRenderSplit = split && index > 0

        if (shouldRenderSplit) {
          if (split instanceof Element) {
            const _split = split.cloneNode() as HTMLDivElement

            _split.classList.add(splitClassName)
            node.parentElement?.insertBefore(_split, node)
          } else if (typeof split === 'string') {
            const div = document.createElement('div')
            div.classList.add(splitClassName)
            div.textContent = split
            node.parentElement?.insertBefore(div, node)
          }
        }

        const style = getMarginStyle(index)

        node.classList.add(`${prefixCls}-item`)

        getKeys(style).map(key => {
          // set margin styles for each node
          //@ts-expect-error Property style does not exist on type
          node.style[key] = style[key]
        })
      }
    })
  })

  function getMarginStyle(index: number) {
    const isLastChild = childrenList.toArray().length - 1 === index

    const style = {} as JSX.CSSProperties
    const MARGIN_DIR_KEY = ctx.rtl ? 'margin-left' : 'margin-right'
    const MARGIN_BOTTOM_KEY = 'margin-bottom'

    if (typeof props.size === 'string' || typeof props.size === 'number') {
      const margin = toPx(getMargin(props.size))
      if (props.wrap) {
        if (isLastChild) {
          style[MARGIN_BOTTOM_KEY] = margin
        }

        if (!isLastChild) {
          style[MARGIN_DIR_KEY] = margin
          style[MARGIN_BOTTOM_KEY] = margin
        }
      } else {
        if (!isLastChild) {
          style[props.direction === 'vertical' ? MARGIN_BOTTOM_KEY : MARGIN_DIR_KEY] = margin
        }
      }
    }

    if (isArray(props.size)) {
      const marginHorizontal = getMargin(props.size[0]) + 'px'
      const marginBottom = getMargin(props.size[1]) + 'px'

      if (props.wrap) {
        if (isLastChild) {
          style[MARGIN_BOTTOM_KEY] = marginBottom
        }

        if (!isLastChild) {
          style[MARGIN_DIR_KEY] = marginHorizontal
          style[MARGIN_BOTTOM_KEY] = marginBottom
        }
      }

      if (!props.wrap) {
        if (props.direction === 'vertical') {
          style[MARGIN_BOTTOM_KEY] = marginBottom
        }

        if (props.direction === 'horizontal') {
          style[MARGIN_DIR_KEY] = marginHorizontal
        }
      }
    }

    return style
  }

  function getMargin(size: SpaceSize = 'mini') {
    if (isNumber(size)) {
      return size
    }

    switch (size) {
      case 'mini':
        return 4
      case 'small':
        return 8
      case 'medium':
        return 16
      case 'large':
        return 24
      default:
        return 8
    }
  }

  return (
    <div {...restProps} class={classNames()}>
      {childrenList()}
    </div>
  )
}

SpaceComponent.displayName = 'Space'

export default SpaceComponent

export { type SpaceProps, type SpaceSize }
