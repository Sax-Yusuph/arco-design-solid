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
