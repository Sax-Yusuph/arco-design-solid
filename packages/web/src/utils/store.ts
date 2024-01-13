import { createComputed, createMemo, createSignal } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import { syncSignals } from 'solidjs-use'
import { isUndefined } from './util'

export function createMergedValue<P extends Record<string, any>, K extends keyof P>(
  fallback: P[K],
  props: P,
  keys: [value: K, defaultValue?: K],
  valueFormmatter?: (value: P[K]) => P[K],
) {
  const [valueKey, defaultValueKey] = keys

  const getValue = (v: P[K]) => {
    if (valueFormmatter) {
      return valueFormmatter(v)
    }

    return v
  }

  const value = valueKey in props ? props[valueKey] : fallback

  const defaultValue =
    defaultValueKey && defaultValueKey in props ? props[defaultValueKey] : fallback

  const [get, set] = createSignal(
    !isUndefined(value)
      ? getValue(value)
      : !isUndefined(defaultValue)
      ? getValue(defaultValue)
      : getValue(fallback),
  )

  const vv = createMemo(() => {
    const value = valueKey in props ? props[valueKey] : undefined

    return isUndefined(value) ? get() : value
  })

  return [vv, set] as const
}

export function createMergedStore<P extends Record<string, any>, K extends keyof P>(
  fallback: P[K],
  props: P,
  keys: [value: K, defaultValue: K],
) {
  const [valueKey, defaultValueKey] = keys

  const value = valueKey in props ? props[valueKey] : fallback
  const defaultValue = defaultValueKey in props ? props[defaultValueKey] : fallback

  const [get, set] = createStore(
    !isUndefined(value) ? value : !isUndefined(defaultValue) ? defaultValue : fallback,
  )

  createComputed(() => {
    const value = valueKey in props ? props[valueKey] : fallback

    if (value) {
      set(reconcile(value))
    } else {
      set(reconcile(fallback))
    }
  })

  return [get, set] as const
}

export function syncValues<P extends Record<string, any>, K extends keyof P>(
  props: P,
  keys: [value: K, defaultValue?: K],
  formmater?: (value?: P[K]) => P[K],
) {
  const [valueKey, defaultValueKey] = keys

  const normalize = (v?: P[K]) => {
    return formmater ? formmater(v) : v
  }

  const initialValue = props[valueKey]
  const initialDefaultValue = defaultValueKey ? props[defaultValueKey] : undefined

  const source = createMemo(() => normalize(initialValue || initialDefaultValue))
  const [value, setValue] = createSignal(normalize(initialDefaultValue))

  syncSignals(source, setValue)

  return [value, setValue] as const
}
