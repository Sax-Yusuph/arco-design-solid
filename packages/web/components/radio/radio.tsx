import {
	Match,
	Show,
	Switch,
	children,
	createMemo,
	mergeProps,
	splitProps
} from 'solid-js'
import cs from '../../utils/classNames'
import { isFunction } from '../../utils/is'
import { syncValues } from '../../utils/store'
import { isNullOrUndefined } from '../../utils/util'
import IconHover from '../_class/icon-hover'
import { useConfigContext } from '../config-provider'
import Group, { RadioGroupProvider, useRadioGroupContext } from './group'
import type { RadioProps } from './interface'

function Radio(baseProps: RadioProps) {
  let inputRef!: HTMLInputElement
  const ctx = useConfigContext()

  const context = useRadioGroupContext()
  const mergedProps = mergeProps({ defaultChecked: false }, ctx.componentConfig?.Radio, baseProps)

  const [props, rest] = splitProps(mergedProps, [
    'style',
    'class',
    'children',
    'value',
    'disabled',
    'onChange',
    'checked',
    'children',
  ])

  const prefixCls = ctx.getPrefixCls?.('radio')

  const [getChecked, setChecked] = syncValues(mergedProps, ['checked', 'defaultChecked'])

  const checked = createMemo(() => {
    if (context.group) {
      return mergedProps.value === context.value
    }

    return getChecked() || false
  })

  const onChange = (event: any) => {
    if (props.disabled) {
      return
    }

    if (context.group) {
      context.onChangeValue?.(mergedProps.value, event)
    } else if (!('checked' in mergedProps) && !checked()) {
      setChecked(true)
    }

    !checked() && mergedProps.onChange?.(true, event)
  }

  const onLabelClick = (e: any) => {
    if (isFunction(mergedProps.children)) {
      e.preventDefault()
      inputRef?.click()
    }

    isFunction(rest.onClick) && rest.onClick(e)
  }

  const childrenNodes = children(() =>
    isFunction(props.children) ? props.children({ checked: checked() }) : props.children,
  )

  return (
    <label
      {...rest}
      onClick={onLabelClick}
      style={props.style}
      class={cs(
        `${prefixCls}${context.type === 'button' ? '-button' : ''}`,
        {
          [`${prefixCls}-checked`]: checked(),
          [`${prefixCls}-disabled`]: props.disabled,
          [`${prefixCls}-rtl`]: ctx.rtl,
        },
        mergedProps.class,
      )}
    >
      <input
        ref={inputRef}
        disabled={props.disabled}
        value={mergedProps.value || ''}
        type="radio"
        {...(context.name ? { name: context.name } : {})}
        checked={checked()}
        onChange={event => {
          onChange(event)
        }}
        onClick={e => {
          e.stopPropagation()
        }}
      />

      <Switch>
        <Match when={isFunction(props.children)}>{childrenNodes}</Match>

        <Match when={context.type === 'radio'}>
          <>
            <IconHover
              prefix={prefixCls}
              class={`${prefixCls}-mask-wrapper`}
              disabled={checked() || props.disabled}
            >
              <div class={`${prefixCls}-mask`} />
            </IconHover>

            <Show when={!isNullOrUndefined(childrenNodes)}>
              <span class={`${prefixCls}-text`}>{childrenNodes}</span>
            </Show>
          </>
        </Match>

        <Match when={context.type === 'button'}>
          <span class={`${prefixCls}-button-inner`}>{childrenNodes}</span>
        </Match>
      </Switch>
    </label>
  )
}

const RadioComponent = Radio as typeof Radio & {
  Group: typeof Group
  GroupProvider: typeof RadioGroupProvider
  useRadioGroupContext: typeof useRadioGroupContext
}

RadioComponent.Group = Group
RadioComponent.GroupProvider = RadioGroupProvider
RadioComponent.useRadioGroupContext = useRadioGroupContext

export default RadioComponent

export { type RadioProps }
