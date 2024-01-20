import { Transition } from 'solid-transition-group'
//@ts-ignore
import BTween from 'b-tween'
import {
    ParentProps,
    Show,
    createEffect,
    createSignal,
    mergeProps,
    onCleanup
} from 'solid-js'
import { IconToTop } from "../../icon/arco-icons"
import cs from '../../utils/classNames'
import { off, on } from '../../utils/dom'
import throttleByRaf from '../../utils/throttle-by-raf'
import useKeyboardEvent from '../../utils/use-keyboard'
import { pickDataAttributes } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import type { BackTopProps } from './interface'

const defaultProps: BackTopProps = {
  visibleHeight: 400,
  easing: 'quartOut',
  duration: 400,
  target: () => window,
}

function BackTop(baseProps: ParentProps<BackTopProps>) {
  const ctx = useConfigContext()
  const getKeyboardEvents = useKeyboardEvent()
  const props = mergeProps(defaultProps, ctx.componentConfig?.BackTop, baseProps)

  const prefixCls = ctx.getPrefixCls?.('backtop')

  const [visible, setVisible] = createSignal(false)

  const getTarget = (target: HTMLElement | Window): HTMLElement => {
    return target === window ? document.documentElement : (target as HTMLElement)
  }

  createEffect(() => {
    const target = props.target?.()
    if (target) {
      const scrollHandler = throttleByRaf(() => {
        const visibleHeight = props.visibleHeight!
        const scrollTop = getTarget(target).scrollTop
        setVisible(scrollTop >= visibleHeight)
      })

      on(target, 'scroll', scrollHandler)

      scrollHandler()

      onCleanup(() => {
        scrollHandler.cancel && scrollHandler.cancel()
        off(target, 'scroll', scrollHandler)
      })
    }
  })

  const scrollToTop = () => {
    const targetDom = props.target?.()
    if (!targetDom) return

    const t = getTarget(targetDom)
    const scrollTop = t.scrollTop
    const tween = new BTween({
      from: { scrollTop },
      to: { scrollTop: 0 },
      easing: props.easing,
      duration: props.duration,
      onUpdate: (keys: any) => {
        t.scrollTop = keys.scrollTop
      },
    })

    tween.start()
    props.onClick?.()
  }

  return (
    <div
      {...pickDataAttributes(props)}
      ref={props.ref}
      class={cs(`${prefixCls}`, { [`${prefixCls}-rtl`]: ctx.rtl }, props.className)}
      style={props.style}
      onClick={scrollToTop}
      {...getKeyboardEvents({
        onPressEnter: scrollToTop,
      })}
    >
      <Transition name="fadeIn">
        <Show when={visible()}>
          <Show
            when={'children' in props}
            fallback={
              <button class={`${prefixCls}-button`}>
                <IconToTop />
              </button>
            }
          >
            {props.children}
          </Show>
        </Show>
      </Transition>
    </div>
  )
}

BackTop.displayName = 'BackTop'

export default BackTop

export type { BackTopProps }
