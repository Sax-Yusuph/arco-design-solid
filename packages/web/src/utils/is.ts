const opt = Object.prototype.toString

export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === '[object Array]'
}

type DefinitelyObject<T> = Exclude<
  Extract<T, object>,
  Array<any> | Function | ReadonlyArray<any>
> extends never
  ? Record<string, unknown>
  : Exclude<Extract<T, object>, Array<any> | Function | ReadonlyArray<any>>

export function isObject<T>(obj: T | object): obj is DefinitelyObject<T> {
  return opt.call(obj) === '[object Object]'
}

type DefinitelyNumber<T> = Extract<T, number> extends never
  ? number
  : Extract<T, number> extends any
  ? number
  : Extract<T, number>

/**
 * A function that checks if the passed parameter is a number and narrows its type accordingly
 * @param data the variable to check
 * @signature
 *    R.isNumber(data)
 * @returns true if the passed input is a number, false otherwise
 * @example
 *    R.isNumber(1) //=> true
 *    R.isNumber('notANumber') //=> false
 * @category Guard
 */
export function isNumber<T>(data: T | number): data is DefinitelyNumber<T> {
  return typeof data === 'number' && !isNaN(data)
}

type DefinitelyString<T> = Extract<T, string> extends never
  ? string
  : Extract<T, string> extends any
  ? string
  : Extract<T, string>

/**
 * A function that checks if the passed parameter is a string and narrows its type accordingly
 * @param data the variable to check
 * @signature
 *    R.isString(data)
 * @returns true if the passed input is a string, false otherwise
 * @example
 *    R.isString('string') //=> true
 *    R.isString(1) //=> false
 * @category Guard
 */
export function isString<T>(data: T | string): data is DefinitelyString<T> {
  return typeof data === 'string'
}

export function isWindow(el: any): el is Window {
  return el === window
}

type DefinitelyFunction<T> = Extract<T, Function> extends never ? Function : Extract<T, Function>

export function isFunction<T>(data: T | Function): data is DefinitelyFunction<T> {
  return typeof data === 'function'
}
