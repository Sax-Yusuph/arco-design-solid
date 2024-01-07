import {
	Accessor,
	JSX,
	Setter,
	createSignal as createSolidSignal
} from 'solid-js'
import { isObject } from './is'
export const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

export const toPx = (v?: number | string) => {
  if (!v) return v as string
  return v + 'px'
}

export function filterUndefined<T>(arr: Iterable<T | undefined>): T[] {
  const result: T[] = []
  for (const x of arr) {
    if (x !== undefined) {
      result.push(x)
    }
  }
  return result
}

export const toCSSObject = (css?: JSX.CSSProperties | string) => {
  if (isObject(css)) {
    return css
  }

  const obj: Record<string, any> = {}

  css?.split(';').forEach(str => {
    const [key, val] = str.trim().split(':')
    if (key) {
      obj[key] = val
    }
  })

  return obj as JSX.CSSProperties
}

export function createLocalSignal<T>(v?: T): {
  get: Accessor<T>
  set: Setter<T>
}
export function createLocalSignal<T>(v: T) {
  const [get, set] = createSolidSignal(v)
  return { get, set }
}


export function isValidElement(el: any) {
  return el instanceof Element
}

export function isUndefined(obj: any): obj is undefined {
  return obj === undefined
}

export function isBoolean(value: any): value is Boolean {
  return typeof value === 'boolean'
}

export function isNullOrUndefined(obj: any): boolean {
  return obj === null || obj === undefined
}
