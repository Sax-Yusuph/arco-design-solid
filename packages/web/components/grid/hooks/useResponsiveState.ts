import { createMemo, onCleanup, onMount } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import { isObject } from '../../../utils/is'
import responsiveObserve, {
	ScreenMap,
	responsiveArray,
} from '../../../utils/responsive-observe'
import { ResponsiveValue } from '../interface'

function isResponsiveValue(val: number | ResponsiveValue): val is ResponsiveValue {
  return isObject(val)
}

export function useResponsiveState<P extends Record<string, any>, K extends keyof P>(
  props: P,
  valueKey: K,
  defaultValue: number,
  fallbackToXs = false,
) {
  let token: string

  const [screens, setScreens] = createStore<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
    xxxl: true,
  })

  onMount(() => {
    const value = valueKey in props ? props[valueKey] : 0
    token = responsiveObserve.subscribe(screens => {
      if (isResponsiveValue(value)) {
        setScreens(reconcile(screens))
      }
    })

    onCleanup(() => {
      responsiveObserve.unsubscribe(token)
    })
  })

  const result = createMemo(() => {
    const val = valueKey in props ? props[valueKey] : 0
    let res = defaultValue
    if (isResponsiveValue(val)) {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint = responsiveArray[i]
        if (
          breakpoint &&
          (screens[breakpoint] || (breakpoint === 'xs' && fallbackToXs)) &&
          val[breakpoint] !== undefined
        ) {
          res = val[breakpoint] as number
          break
        }
      }
    } else {
      res = val
    }
    return res
  })

  return result
}
