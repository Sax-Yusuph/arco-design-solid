import { onMount } from 'solid-js'
import { isFunction } from './is'

// useImperative handle
export const useHandle = <T extends Record<string, any> & { ref?: any }, H>(
  props: T,
  handle: H,
) => {
  onMount(() => {
    if ('ref' in props) {
      isFunction(props.ref) && props.ref(handle)
    }
  })
}
