import { JSX, Show, createRenderEffect, mergeProps, onMount, splitProps } from 'solid-js'
import { createStore } from 'solid-js/store'
import { useEventListener, usePrevious } from 'solidjs-use'
import cs from '../../utils/classNames'
import { isFunction, isWindow } from '../../utils/is'
import ResizeObserver from '../../utils/resize-observer'
import throttleByRaf from '../../utils/throttle-by-raf'
import { isUndefined, toCSSObject, toPx } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import { AffixProps } from './interface'
function getTargetRect(target: HTMLElement | Window) {
  return isWindow(target)
    ? {
        top: 0,
        bottom: window.innerHeight,
      }
    : target.getBoundingClientRect()
}

type AffixHandle = {
  updatePosition: () => void
}

const defaultProps = {
  offsetTop: 0,
  target: () => window,
}

type StoreType = {
  status: 'MEASURE_DONE' | 'MEASURE_START'
  isFixed: boolean
  sizeStyles: JSX.CSSProperties
  fixedStyles: JSX.CSSProperties
}

function Affix(baseProps: AffixProps) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.Affix, baseProps)

  const [props, restProps] = splitProps(mergedProps, [
    'class',
    'style',
    'affixClass',
    'affixStyle',
    'offsetTop',
    'offsetBottom',
    'target',
    'targetContainer',
    'children',
    'onChange',
  ])

  const [state, setState] = createStore<StoreType>({
    status: 'MEASURE_DONE',
    isFixed: false,
    sizeStyles: {},
    fixedStyles: {},
  })

  const lastIsFixed = usePrevious(state.isFixed)
  const prefixCls = ctx.getPrefixCls?.('affix')!

  let wrapperRef!: HTMLDivElement
  let targetRef!: HTMLElement | Window | null

  const updatePosition = throttleByRaf(() => {
    setState({
      status: 'MEASURE_START',
      isFixed: false,
      fixedStyles: {},
      sizeStyles: {},
    })
  })

  createRenderEffect(() => {
    if (state.status !== 'MEASURE_START' || !wrapperRef || !targetRef) return

    const offsetType = isUndefined(props.offsetBottom) ? 'top' : 'bottom'
    const wrapperRect = wrapperRef.getBoundingClientRect()
    const targetRect = getTargetRect(targetRef)

    let newIsFixed = false
    let newFixedStyles = {} as JSX.CSSProperties
    let pos: string

    if (offsetType === 'top') {
      newIsFixed = wrapperRect.top - targetRect.top < (props.offsetTop || 0)
      pos = toPx(targetRect.top + (props.offsetTop || 0))
    } else {
      newIsFixed = targetRect.bottom - wrapperRect.bottom < (props.offsetBottom || 0)
      pos = toPx(window.innerHeight - targetRect.bottom + (props.offsetBottom || 0))
    }

    if (newIsFixed) {
      newFixedStyles.position = 'fixed'
      newFixedStyles[offsetType] = pos
      newFixedStyles.width = toPx(wrapperRef.offsetWidth)
      newFixedStyles.height = toPx(wrapperRef.offsetHeight)
    }

    setState({
      status: 'MEASURE_DONE',
      isFixed: newIsFixed,
      sizeStyles: { width: newFixedStyles.width, height: newFixedStyles.height },
      fixedStyles: newFixedStyles,
    })

    if (newIsFixed !== lastIsFixed()) {
      isFunction(props.onChange) && props.onChange(newIsFixed)
    }
  })

  onMount(() => {
    if (isFunction(props.target)) {
      targetRef = props.target()
      useEventListener(targetRef, 'scroll', updatePosition)
      useEventListener(targetRef, 'resize', updatePosition)
    }

    if (isFunction(props.targetContainer)) {
      const container = props.targetContainer()
      // listen to scroll event of container if target is not window
      if (targetRef !== window && container) {
        useEventListener(container, 'scroll', updatePosition)
      }
    }
  })

  return (
    <ResizeObserver onResize={updatePosition}>
      <div {...restProps} ref={wrapperRef} class={cs(props.class)} style={props.style}>
        <Show when={state.isFixed}>
          <div style={state.sizeStyles} />
        </Show>

        <div
          class={cs(
            { [prefixCls]: state.isFixed, [`${prefixCls}-rtl`]: ctx.rtl },
            props.affixClass,
          )}
          style={{ ...state.fixedStyles, ...toCSSObject(props.affixStyle) }}
        >
          <ResizeObserver onResize={updatePosition}>{props.children || <span />}</ResizeObserver>
        </div>
      </div>
    </ResizeObserver>
  )
}

Affix.displayName = 'Affix'

export default Affix

export { type AffixProps }
