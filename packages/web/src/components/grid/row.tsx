import { JSX, createMemo, mergeProps, onCleanup, onMount, splitProps } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import cs from '../../utils/classNames'
import type { Breakpoint, ScreenMap } from '../../utils/responsive-observe'
import responsiveObserve, { responsiveArray } from '../../utils/responsive-observe'
import { toPx } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import { RowProvider } from './context'
import { GridRowGutter, RowProps } from './interface'

const defaultProps: RowProps = {
  gutter: 0,
  align: 'start',
  justify: 'start',
}

function RowComponent(baseProps: RowProps) {
  const ctx = useConfigContext()
  const props = mergeProps(defaultProps, ctx.componentConfig?.['Grid.Row'], baseProps)
  const [local, rest] = splitProps(props, [
    'class',
    'style',
    'children',
    'div',
    'align',
    'justify',
    'gutter',
  ])

  const [screens, setScreens] = createStore<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
    xxxl: true,
  })

  let token: string

  onMount(() => {
    token = responsiveObserve.subscribe(screens => {
      // Responsive Gutter
      if (
        (!Array.isArray(local.gutter) && typeof local.gutter === 'object') ||
        (Array.isArray(local.gutter) &&
          (typeof local.gutter[0] === 'object' || typeof local.gutter[1] === 'object'))
      ) {
        setScreens(reconcile(screens))
      }
    })

    onCleanup(() => {
      responsiveObserve.unsubscribe(token)
    })
  })

  function getGutter(gutter?: GridRowGutter): number {
    let result = 0

    if (typeof gutter === 'object') {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint = responsiveArray[i] as Breakpoint
        if (screens[breakpoint] && gutter[breakpoint] !== undefined) {
          result = gutter[breakpoint] as number
          break
        }
      }
    } else {
      result = gutter!
    }

    return result
  }

  const prefixCls = ctx.getPrefixCls?.('row')

  const gutterHorizontal = getGutter(Array.isArray(local.gutter) ? local.gutter[0] : local.gutter)
  const gutterVertical = getGutter(Array.isArray(local.gutter) ? local.gutter[1] : 0)

  const marginStyle = createMemo(() => {
    const marginStyle: {
      'margin-top'?: string
      'margin-bottom'?: string
      'margin-left'?: string
      'margin-right'?: string
    } = {}

    if ((gutterHorizontal || gutterVertical) && !local.div) {
      const marginHorizontal = -gutterHorizontal / 2
      const marginVertical = -gutterVertical / 2
      if (marginHorizontal) {
        marginStyle['margin-left'] = toPx(marginHorizontal)
        marginStyle['margin-right'] = toPx(marginHorizontal)
      }
      if (marginVertical) {
        marginStyle['margin-top'] = toPx(marginVertical)
        marginStyle['margin-bottom'] = toPx(marginVertical)
      }
    }

    return marginStyle
  })

  return (
    <div
      {...rest}
      style={{
        ...(local.style as JSX.CSSProperties),
        ...marginStyle(),
      }}
      class={cs(
        {
          [`${prefixCls}`]: !local.div,
          [`${prefixCls}-align-${local.align}`]: local.align,
          [`${prefixCls}-justify-${local.justify}`]: local.justify,
          [`${prefixCls}-rtl`]: ctx.rtl,
        },
        local.class,
      )}
    >
      <RowProvider gutter={[gutterHorizontal, gutterVertical]} div={local.div}>
        {local.children}
      </RowProvider>
    </div>
  )
}

RowComponent.displayName = 'Row'

export default RowComponent

export { type RowProps }
