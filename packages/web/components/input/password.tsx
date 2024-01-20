import { Show, mergeProps, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { IconEye, IconEyeInvisible } from "../../icon/arco-icons"
import cs from '../../utils/classNames'
import { syncValues } from '../../utils/store'
import useKeyboardEvent from '../../utils/use-keyboard'
import { useConfigContext } from '../config-provider'
import Input from './input'
import type { InputPasswordProps } from './interface'
const defaultProps = {
  defaultVisibility: false,
  visibilityToggle: true,
} as const

const Password = (baseProps: InputPasswordProps) => {
  const mergedProps = mergeProps(defaultProps, baseProps)
  const [isVisible, setVisibility] = syncValues(mergedProps, ['visibility', 'defaultVisibility'])

  const ctx = useConfigContext()
  const [props, restProps] = splitProps(mergedProps, [
    'class',
    'visibilityToggle',
    'onVisibilityChange',
    'suffix',
    'visibility',
    'defaultVisibility',
  ])

  const prefixCls = ctx.getPrefixCls?.('input-password')

  const onClickVisibility = (v: boolean) => {
    if (!('visibility' in props)) {
      setVisibility(v)
    }

    props.onVisibilityChange?.(v)
  }

  const handleClickVisibility = () => {
    //wrapping in a settimeout allows the event to bubble up before the element
    // that triggered the action is removed from dom
    setTimeout(() => onClickVisibility(!isVisible()))
  }

  const { onKeyDown } = useKeyboardEvent()({ onPressEnter: handleClickVisibility })

  return (
    <Input
      {...restProps}
      type={isVisible() ? 'text' : 'password'}
      class={cs(prefixCls, { [`${prefixCls}-visibility`]: props.visibilityToggle }, props.class)}
      suffix={
        <Show when={props.visibilityToggle} fallback={props.suffix}>
          <Show
            when={!props.suffix}
            fallback={
              <span
                onClick={handleClickVisibility}
                onMouseDown={(e: MouseEvent) => e.preventDefault()}
                onMouseUp={(e: MouseEvent) => e.preventDefault()}
                onKeyDown={onKeyDown}
              >
                {props.suffix}
              </span>
            }
          >
            <Dynamic
              component={isVisible() ? IconEye : IconEyeInvisible}
              onClick={handleClickVisibility}
              onMouseDown={(e: MouseEvent) => e.preventDefault()}
              onMouseUp={(e: MouseEvent) => e.preventDefault()}
              onKeyDown={onKeyDown}
              aria-hidden={undefined}
              tab-index={0}
              class={`${prefixCls}-visibility-icon`}
            />
          </Show>
        </Show>
      }
    />
  )
}

Password.displayName = 'Password'

export default Password

export { type InputPasswordProps }
