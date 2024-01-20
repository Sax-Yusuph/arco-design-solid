import { Accessor } from 'solid-js'
import { toValue } from 'solidjs-use'
import { isString, isUndefined } from '../../../utils/is'

export function formatValue(value?: any, maxLength?: number | Accessor<number>) {
  const mxLength = toValue(maxLength)
  const str =
    value !== null && !isUndefined(value) && !isString(value) ? String(value) : value || ''
  if (mxLength) {
    return str.slice(0, mxLength)
  }

  return str
}
