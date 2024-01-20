import {
    JSX,
    Match,
    Show,
    Switch as SolidSwitch,
    createMemo,
    mergeProps,
    splitProps
} from 'solid-js'
import { Transition } from 'solid-transition-group'
import { IconLoading } from "../../icon/arco-icons"
import cs from '../../utils/classNames'
import { isFunction } from '../../utils/is'
import { createMergedValue } from '../../utils/store'
import { useConfigContext } from '../config-provider'
import { type SwitchProps } from './interface'

export interface SwitchState {
  checked: boolean
}

const defaultProps: SwitchProps = {
  type: 'circle',
}



function Switch(baseProps: SwitchProps) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.Switch, baseProps)
  const [props, restProps] = splitProps(mergedProps, [
    'onChange',
    'checked',
    'onClick',
    'class',
    'children',
    'style',
    'disabled',
    'size',
    'loading',
    'onChange',
    'type',
    'checkedText',
    'uncheckedText',
    'checkedIcon',
    'uncheckedIcon',
    'defaultChecked',
  ])

  const prefixCls = ctx.getPrefixCls?.('switch')

  const size = createMemo(() => props.size || ctx.size)
  const [checked, setChecked] = createMergedValue(false, props, ['checked', 'defaultChecked'])

  const onHandleClick: JSX.HTMLAttributes<HTMLButtonElement>['onClick'] = event => {
    if (props.loading) return

    isFunction(props.onClick) && props.onClick(event)

    if (!('checked' in props)) {
      setChecked(p => !p)
    }

    props.onChange?.(!checked(), event)
  }

  return (
    <button
      role="switch"
      aria-checked={!!checked()}
      tabIndex={props.loading ? -1 : undefined}
      {...restProps}
      style={props.style}
      class={cs(
        prefixCls,
        {
          [`${prefixCls}-${size()}`]: size() === 'small',
          [`${prefixCls}-type-${props.type}`]: props.type,
          [`${prefixCls}-checked`]: checked(),
          [`${prefixCls}-loading`]: props.loading,
          [`${prefixCls}-rtl`]: ctx.rtl,
        },
        props.class,
      )}
      disabled={props.disabled}
      onClick={onHandleClick}
      type="button"
    >
      <div class={`${prefixCls}-dot`}>
        <Transition mode="outin" name="fadeIn">
          <Show when={!props.loading && (props.checkedIcon || props.uncheckedIcon)}>
            <span class={`${prefixCls}-dot-icon`}>
              <Show when={checked()} fallback={props.uncheckedIcon}>
                {props.checkedIcon}
              </Show>
            </span>
          </Show>
        </Transition>

        <Show when={props.loading}>
          <span class={`${prefixCls}-dot-icon`}>
            <IconLoading />
          </span>
        </Show>
      </div>

      <Show
        when={
          size() !== 'small' && props.type !== 'line' && (props.checkedText || props.uncheckedText)
        }
      >
        <>
          <div class={`${prefixCls}-text-holder`}>
            <SolidSwitch>
              <Match when={props.checkedText && checked()}>{props.checkedText}</Match>
              <Match when={props.uncheckedText && !checked()}>{props.uncheckedText}</Match>
            </SolidSwitch>
          </div>

          <Transition name="switchSlideText">
            <div class={`${prefixCls}-text`}>
              <SolidSwitch>
                <Match when={props.checkedText && checked()}>{props.checkedText}</Match>
                <Match when={props.uncheckedText && !checked()}>{props.uncheckedText}</Match>
              </SolidSwitch>
            </div>
          </Transition>
        </>
      </Show>
    </button>
  )
}

Switch.__BYTE_SWITCH = true

Switch.displayName = 'Switch'

export default Switch

export { type SwitchProps }
