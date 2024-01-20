import { JSX } from 'solid-js'
import { isFunction } from './is'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Enter } from './keycode'

type CallBackEventType =
  | 'onPressEnter'
  | 'onArrowUp'
  | 'onArrowLeft'
  | 'onArrowRight'
  | 'onArrowDown'

export type KeyDownHandler<T> = JSX.HTMLAttributes<T>['onKeyDown']

type Callbacks<T> = {
  [key in CallBackEventType]?: KeyDownHandler<T>
}

export default function useKeyboardEvent<T extends Element>(props?: {
  onKeyDown?: KeyDownHandler<T>
}) {
  const getEventListeners = (callbacks: Callbacks<T>): { onKeyDown: KeyDownHandler<T> } => {
    return {
      onKeyDown: e => {
        const keyCode = e.keyCode || e.which

        if (keyCode === Enter.code) {
          isFunction(callbacks.onPressEnter) && callbacks.onPressEnter(e)
        }
        if (keyCode === ArrowDown.code) {
          isFunction(callbacks.onArrowDown) && callbacks.onArrowDown(e)
        }
        if (keyCode === ArrowLeft.code) {
          isFunction(callbacks.onArrowLeft) && callbacks.onArrowLeft(e)
        }
        if (keyCode === ArrowRight.code) {
          isFunction(callbacks.onArrowRight) && callbacks.onArrowRight(e)
        }
        if (keyCode === ArrowUp.code) {
          isFunction(callbacks.onArrowUp) && callbacks.onArrowUp(e)
        }

        if (isFunction(props?.onKeyDown)) {
          props.onKeyDown(e)
        }
      },
    }
  }
  return getEventListeners
}
