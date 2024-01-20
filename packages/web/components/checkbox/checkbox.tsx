import {
	Show,
	children,
	createComputed,
	createEffect,
	createMemo,
	mergeProps,
	onCleanup,
	splitProps
} from 'solid-js'
import cs from '../../utils/classNames'
import { isFunction } from '../../utils/is'
import { createMergedValue } from '../../utils/store'
import Hover from '../_class/icon-hover'
import { useConfigContext } from '../config-provider'
import Group, { useCheckboxGroupContext } from './group'
import IconCheck from './icon-check'
import { type CheckboxProps } from './interface'
import useCheckbox from './useCheckbox'

function Checkbox<T extends string | number>(baseProps: CheckboxProps<T>) {
  let inputRef!: HTMLInputElement

  const ctx = useConfigContext()
  const mergedProps = mergeProps({}, ctx.componentConfig?.Checkbox, baseProps)

  const groupCtx = useCheckboxGroupContext()
  const prefixCls = ctx.getPrefixCls?.('checkbox')

  const isDisabled = createMemo(() => {
    if (groupCtx.isCheckboxGroup) {
      return 'disabled' in mergedProps ? mergedProps.disabled : groupCtx.disabled
    }

    return mergedProps.disabled
  })

  const [props, restProps] = splitProps(mergedProps, [
    'class',
    'disabled',
    'children',
    'value',
    'style',
    'indeterminate',
    'error',
    'onChange',
    'checked',
    'defaultChecked',
  ])

  const [checked, setChecked] = createMergedValue(false, props, ['checked', 'defaultChecked'])

  createComputed(() => {
    if (groupCtx.checkboxGroupValue) {
      const val = groupCtx.checkboxGroupValue?.indexOf(props.value) !== -1
      setChecked(val)
    }
  })

  createEffect(() => {
    groupCtx.registerValue(props.value)
  })

  onCleanup(() => {
    groupCtx.unRegisterValue(props.value)
  })

  const onChange: HTMLInputElement['oninput'] = e => {
    e.stopPropagation()

    const previousChecked = checked()
    setChecked(p => !p)

    if (groupCtx.isCheckboxGroup) {
      groupCtx.onGroupChange(props.value, !previousChecked, e)
    }

    props.onChange?.(!previousChecked, e)
  }

  const icon = mergedProps.icon || <IconCheck class={`${prefixCls}-mask-icon`} />

  createEffect(() => {
    if (mergedProps.icon instanceof Element) {
      mergedProps.icon.classList.add(`${prefixCls}-mask-icon`)
    }
  })

  //@ts-ignore
  const childNode = children(() => {
    return props.children
  })

  const onLabelClick = (e: MouseEvent) => {
    if (isFunction(childNode())) {
      e.preventDefault()
      inputRef.click()
    }

    restProps.onClick?.(e)
  }

  return (
    <label
      aria-disabled={isDisabled()}
      {...restProps}
      onClick={onLabelClick}
      class={cs(
        prefixCls,
        {
          [`${prefixCls}-disabled`]: isDisabled(),
          [`${prefixCls}-indeterminate`]: props.indeterminate,
          [`${prefixCls}-checked`]: checked(),
          [`${prefixCls}-rtl`]: ctx.rtl,
          error: props.error,
        },
        props.class,
      )}
      style={props.style}
    >
      <input
        value={props.value}
        disabled={!!isDisabled()}
        ref={inputRef}
        checked={!!checked()}
        onChange={onChange}
        // To avoid triggering onChange twice in Select if it's used in Select option.
        onClick={e => e.stopPropagation()}
        type="checkbox"
      />

      <Show
        when={isFunction(childNode())}
        fallback={
          <>
            <Hover
              prefix={prefixCls}
              class={`${prefixCls}-mask-wrapper`}
              disabled={checked() || isDisabled() || props.indeterminate}
            >
              <div class={`${prefixCls}-mask`}>{icon}</div>
            </Hover>

            <Show when={childNode()}>
              <span class={`${prefixCls}-text`}>{childNode()}</span>
            </Show>
          </>
        }
      >
        {/* @ts-ignore */}
        {childNode()({ checked: checked(), indeterminate: props.indeterminate })}
      </Show>
    </label>
  )
}

Checkbox.displayName = 'Checkbox'
Checkbox.Group = Group
Checkbox.useCheckbox = useCheckbox

export default Checkbox

export { type CheckboxProps }
