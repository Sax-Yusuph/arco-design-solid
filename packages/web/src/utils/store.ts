import { createComputed, createSignal } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import { isUndefined } from './util'

export function createMergedValue<P extends Record<string, any>, K extends keyof P>(
  fallback: P[K],
  props: P,
  keys: [value: K, defaultValue: K],
) {
  const [valueKey, defaultValueKey] = keys

  const value = valueKey in props ? props[valueKey] : fallback
  const defaultValue = defaultValueKey in props ? props[defaultValueKey] : fallback

  const [get, set] = createSignal(
    !isUndefined(value) ? value : !isUndefined(defaultValue) ? defaultValue : fallback,
  )

  createComputed(() => {
    const value = valueKey in props ? props[valueKey] : fallback

    if (value) {
      set(() => value)
    } else {
      set(() => fallback)
    }
  })

  return [get, set] as const
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
