import { createContextProvider } from 'packages/web/utils/context'
import { For, ParentProps, Show, createMemo, mergeProps, splitProps } from 'solid-js'
import cs from '../../utils/classNames'
import { isArray, isObject } from '../../utils/is'
import { syncValues } from '../../utils/store'
import { useConfigContext } from '../config-provider'
import type { RadioGroupContextProps, RadioGroupProps } from './interface'
import Radio from './radio'

const defaultContextValue: RadioGroupContextProps = {
  type: 'radio',
}

export const [RadioGroupProvider, useRadioGroupContext] = createContextProvider(
  (props: ParentProps<RadioGroupContextProps>) => {
    return mergeProps(defaultContextValue, props)
  },
  defaultContextValue,
)

export const ClearRadioGroupContext = (props: ParentProps<{}>) => {
  return <RadioGroupProvider {...defaultContextValue} children={props.children} />
}

const defaultProps: RadioGroupProps = {
  type: 'radio',
  mode: 'outline',
  direction: 'horizontal',
}

function Group(baseProps: ParentProps<RadioGroupProps>) {
  const ctx = useConfigContext()

  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.['Radio.Group'], baseProps)

  const [props, restProps] = splitProps(mergedProps, [
    'style',
    'class',
    'name',
    'children',
    'direction',
    'type',
    'mode',
    'options',
    'disabled',
    'size',
    'onChange',
  ])

  const size = createMemo(() => props.size || ctx.size)

  const [value, setValue] = syncValues(mergedProps, ['value', 'defaultValue'])

  const prefixCls = ctx.getPrefixCls?.('radio')

  const onChangeValue = (v: any, event: any): void => {
    if (v !== value()) {
      if (!('value' in mergedProps)) {
        setValue(v)
      }

      props.onChange?.(v, event)
    }
  }

  return (
    <RadioGroupProvider
      onChangeValue={onChangeValue}
      type={props.type!}
      value={value()}
      disabled={props.disabled}
      group={true}
      name={props.name}
    >
      <div
        {...restProps}
        class={cs(
          `${prefixCls}-group`,
          {
            [`${prefixCls}-group-type-button`]: props.type !== 'radio',
            [`${prefixCls}-size-${size()}`]: !!size(),
            [`${prefixCls}-mode-${props.mode}`]: !!props.mode,
            [`${prefixCls}-group-disabled`]: props.disabled,
            [`${prefixCls}-group-direction-vertical`]: props.direction === 'vertical',
            [`${prefixCls}-group-rtl`]: ctx.rtl,
          },
          props.class,
        )}
        role="radiogroup"
        style={props.style}
      >
        <Show when={props.options && isArray(props.options)} fallback={props.children}>
          <For each={props.options}>
            {option => {
              if (isObject(option)) {
                return (
                  <Radio disabled={props.disabled || option.disabled} value={option.value}>
                    {option.label}
                  </Radio>
                )
              }
              return (
                <Radio value={option} disabled={props.disabled}>
                  {option}
                </Radio>
              )
            }}
          </For>
        </Show>
      </div>
    </RadioGroupProvider>
  )
}

Group.displayName = 'RadioGroup'

export default Group

export { RadioGroupContextProps, RadioGroupProps }
