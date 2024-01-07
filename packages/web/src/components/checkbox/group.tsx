import { For, ParentProps, Show, createMemo, createSignal } from 'solid-js'

import { reconcile } from 'solid-js/store'
import { toValue } from 'solidjs-use'
import cs from '../../utils/classNames'
import { createContextProvider } from '../../utils/context'
import { isArray, isObject } from '../../utils/is'
import { createMergedStore } from '../../utils/store'
import { useConfigContext } from '../config-provider'
import Checkbox from './checkbox'
import type { CheckboxGroupProps, TextString } from './interface'

const defaultContextValue = {
  isCheckboxGroup: false,
  checkboxGroupValue: [],
  onGroupChange: () => {},
  registerValue: () => {},
  unRegisterValue: () => {},
}

export const [CheckboxGroupProvider, useCheckboxGroupContext] = createContextProvider(
  (props: {
    disabled?: boolean
    isCheckboxGroup: boolean
    onGroupChange: (_optionValue: any, _checked: boolean, e: Event) => void
    checkboxGroupValue: TextString[]
    registerValue: (value: TextString) => void
    unRegisterValue: (value: TextString) => void
  }) => {
    return props
  },
  defaultContextValue,
)

export const ClearCheckboxGroupContext = (props: ParentProps) => {
  return <CheckboxGroupProvider children={props.children} {...defaultContextValue} />
}

export function Group<T extends TextString>(props: CheckboxGroupProps<T>) {
  const ctx = useConfigContext()
  const [allOptionValues, setAllOptionValues] = createSignal<TextString[]>([])

  const [values, setValues] = createMergedStore([], props, ['value', 'defaultValue'])

  const direction = createMemo(() => props.direction || 'horizontal')
  const prefixCls = ctx.getPrefixCls?.('checkbox')

  const onChange = (optionValue: any, checked: boolean, e: Event) => {
    const vv = toValue(values) || []
    const newVal = vv.slice()

    if (checked) {
      newVal.push(optionValue)
    } else {
      newVal.splice(vv.indexOf(optionValue), 1)
    }

    setValues(reconcile(newVal))

    props.onChange?.(
      newVal.filter(v => allOptionValues().indexOf(v) > -1),
      e,
    )
  }

  return (
    <span
      class={cs(
        `${prefixCls}-group`,
        {
          [`${prefixCls}-group-is-error`]: props.error,
          [`${prefixCls}-group-direction-${direction()}`]: direction(),
          [`${prefixCls}-group-rtl`]: ctx.rtl,
        },
        props.class,
      )}
      style={props.style}
    >
      <CheckboxGroupProvider
        isCheckboxGroup={true}
        checkboxGroupValue={toValue(values) ?? []}
        onGroupChange={onChange}
        disabled={props.disabled}
        registerValue={value => {
          setAllOptionValues(allOptionValues => {
            return Array.from(new Set([...allOptionValues, value]))
          })
        }}
        unRegisterValue={value => {
          setAllOptionValues(allOptionValues => {
            return allOptionValues.filter(x => x !== value)
          })
        }}
      >
        <Show when={isArray(props.options)} fallback={props.children}>
          <For each={props.options}>
            {option => {
              const label = isObject(option) ? option.label : option
              const checkValue = isObject(option) ? option.value : option
              const icon = isObject(option) ? option.icon : undefined

              const isChecked = toValue(values)?.indexOf(checkValue) !== -1

              return (
                <Checkbox
                  disabled={props.disabled || (isObject(option) && option.disabled)}
                  value={checkValue}
                  checked={isChecked}
                  icon={icon}
                >
                  {label}
                </Checkbox>
              )
            }}
          </For>
        </Show>
      </CheckboxGroupProvider>
    </span>
  )
}

Group.displayName = 'CheckboxGroup'

export default Group

export { type CheckboxGroupProps }
