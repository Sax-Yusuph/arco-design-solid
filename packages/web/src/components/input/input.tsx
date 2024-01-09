import { isFunction } from 'lodash'
import {
	Accessor,
	JSX,
	Match,
	ParentProps,
	Show,
	Switch,
	children,
	createMemo,
	createSignal,
	mergeProps,
	splitProps,
} from 'solid-js'
import { toValue } from 'solidjs-use'
import cs from '../../utils/classNames'
import { isObject, isString, isUndefined } from '../../utils/is'
import { createMergedValue } from '../../utils/store'
import { toCSSObject, toPx } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import Group from './group'
import InputComponent from './input-element'
import { InputProps } from './interface'
import Password from './password'
import Search from './search'
import TextArea from './textarea'

const keepFocus = (e: any) => {
  e.target.tagName !== 'INPUT' && e.preventDefault()
}

const InputAddon = (props: JSX.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <Show when={props.children}>
      <span style={props.style} class={props.class} onClick={props.onClick}>
        {props.children}
      </span>
    </Show>
  )
}

const SuffixElement = (
  props: ParentProps<{
    rtl?: boolean
    trueMaxLength?: number
    valueLength: number
    prefixCls?: string
    lengthError?: boolean
    showWordLimit?: boolean
  }>,
) => {
  const words = createMemo(() =>
    props.rtl ? [props.trueMaxLength, props.valueLength] : [props.valueLength, props.trueMaxLength],
  )

  const nodes = children(() => props.children)

  const showWordLimit = createMemo(() => props.trueMaxLength && props.showWordLimit)

  return (
    <Show when={showWordLimit()} fallback={nodes()}>
      <span
        class={cs(`${props.prefixCls}-word-limit`, {
          [`${props.prefixCls}-word-limit-error`]: props.lengthError,
        })}
      >
        {words()[0]}/{words()[1]}
      </span>
    </Show>
  )
}

export function formatValue(value?: any, maxLength?: number | Accessor<number | undefined>) {
  const mxLength = toValue(maxLength)
  const str =
    value !== null && !isUndefined(value) && !isString(value) ? String(value) : value || ''
  if (mxLength) {
    return str.slice(0, mxLength)
  }

  return str
}

function Input(baseProps: InputProps & { _ignorePropsFromGlobal?: boolean }) {
  const ctx = useConfigContext()

  const mergedProps = mergeProps({ size: ctx.size }, ctx?.componentConfig?.Input, baseProps)

  const [props, restProps] = splitProps(mergedProps, [
    'status',
    'class',
    'style',
    'addBefore',
    'addAfter',
    'suffix',
    'prefix',
    'beforeStyle',
    'afterStyle',
    'height',
    'disabled',
    'maxLength',
    'showWordLimit',
    'allowClear',
    'autoWidth',
    'value',
    'defaultValue',
    'size',
    'onFocus',
    'onBlur',
    'onInput',
  ])

  const trueMaxLength = isObject(props.maxLength) ? props.maxLength.length : props.maxLength
  const mergedMaxLength =
    isObject(props.maxLength) && props.maxLength.errorOnly ? undefined : trueMaxLength

  const [getValue, setValue] = createMergedValue(undefined, props, ['value', 'defaultValue'], v => {
    return formatValue(v, mergedMaxLength)
  })

  const prefixCls = ctx.getPrefixCls?.('input')
  const isCustomHeight = 'height' in props
  const hasSuffix = props.showWordLimit || trueMaxLength || 'suffix' in props

  const getValueLength = createMemo(() => getValue()?.length ?? 0)

  const lengthError = createMemo(() => {
    if (!mergedMaxLength && trueMaxLength) {
      return getValueLength() > trueMaxLength
    }

    return false
  })

  const status = createMemo(() => props.status || (lengthError() ? 'error' : undefined))
  const needWrapper = props.addBefore || props.addAfter || hasSuffix || props.prefix

  const [getFocus, setFocus] = createSignal(false)
  let inputRef!: HTMLInputElement
  let inputWrapperRef!: HTMLSpanElement

  const onInput = (val: string, e: InputEvent) => {
    if (!('value' in props)) {
      setValue(val)
    }

    isFunction(props.onInput) && props.onInput(val, e)
  }

  const getAutoWidthStyle = createMemo(() => {
    if (!props.autoWidth) {
      return null
    }

    return {
      'min-width': 0,
      'max-width': '100%',
      width: 'auto',
      ...(isObject(props.autoWidth) ? props.autoWidth : {}),
    } as JSX.CSSProperties
  })

  const style = createMemo(() => ({
    ...getAutoWidthStyle(),
    ...toCSSObject(props.style),
  }))

  const Input = (
    <InputComponent
      ref={inputRef}
      {...mergedProps}
      autoFitWidth={!!props.autoWidth}
      style={style()}
      status={status()}
      onFocus={e => {
        setFocus(true)
        isFunction(props.onFocus) && props.onFocus(e)
      }}
      onBlur={e => {
        setFocus(false)
        isFunction(props.onBlur) && props.onBlur(e)
      }}
      onInput={onInput}
      prefixCls={prefixCls}
      value={getValue()}
      hasParent={!!needWrapper || props.allowClear}
      size={props.size}
    />
  )

  const innerWrapperClassnames = createMemo(() =>
    cs(`${prefixCls}-inner-wrapper`, {
      [`${prefixCls}-inner-wrapper-${status()}`]: status(),
      [`${prefixCls}-inner-wrapper-disabled`]: props.disabled,
      [`${prefixCls}-inner-wrapper-focus`]: getFocus(),
      [`${prefixCls}-inner-wrapper-has-prefix`]: props.prefix,
      [`${prefixCls}-inner-wrapper-${props.size}`]: props.size,
      [`${prefixCls}-clear-wrapper`]: props.allowClear,
      [`${prefixCls}-inner-wrapper-rtl`]: ctx.rtl,
    }),
  )

  return (
    <Switch fallback={Input}>
      <Match when={needWrapper}>
        <div
          class={cs(
            `${prefixCls}-group-wrapper`,
            `${prefixCls}-group-wrapper-${props.size}`,
            {
              [`${prefixCls}-custom-height`]: isCustomHeight,
              [`${prefixCls}-has-suffix`]: hasSuffix,
              [`${prefixCls}-group-wrapper-disabled`]: props.disabled,
              [`${prefixCls}-group-wrapper-rtl`]: ctx.rtl,
              [`${prefixCls}-group-wrapper-autowidth`]: props.autoWidth,
            },
            props.class,
          )}
          style={{
            ...style(),
            ...(isCustomHeight ? { height: toPx(props.height) } : {}),
          }}
        >
          <span class={`${prefixCls}-group`}>
            <InputAddon class={`${prefixCls}-group-addbefore`} style={props.beforeStyle}>
              {props.addBefore}
            </InputAddon>

            <span
              class={innerWrapperClassnames()}
              ref={inputWrapperRef}
              onMouseDown={e => {
                if ((e.target as HTMLElement).tagName !== 'INPUT') {
                  if (inputWrapperRef.contains(e.target)) {
                    e.preventDefault()
                  }
                }
              }}
              onClick={e => {
                if (inputWrapperRef.contains(e.target)) {
                  inputRef.focus()
                }
              }}
            >
              <InputAddon class={`${prefixCls}-group-prefix`}>{props.prefix}</InputAddon>

              {Input}

              <InputAddon class={`${prefixCls}-group-suffix`}>
                <SuffixElement
                  rtl={ctx.rtl}
                  trueMaxLength={trueMaxLength}
                  lengthError={lengthError()}
                  prefixCls={prefixCls}
                  showWordLimit={props.showWordLimit}
                  valueLength={getValueLength()}
                >
                  {props.suffix}
                </SuffixElement>
              </InputAddon>
            </span>

            <InputAddon class={`${prefixCls}-group-addafter`} style={props.afterStyle}>
              {props.addAfter}
            </InputAddon>
          </span>
        </div>
      </Match>

      <Match when={props.allowClear}>
        <span
          class={cs(props.class, innerWrapperClassnames())}
          style={{
            ...style(),
            ...(isCustomHeight ? { height: toPx(props.height) } : {}),
          }}
          onMouseDown={keepFocus}
          onClick={() => {
            inputRef.focus()
          }}
        >
          {Input}
        </span>
      </Match>
    </Switch>
  )
}

Input.displayName = 'Input'

Input.Search = Search

Input.TextArea = TextArea

Input.Password = Password

Input.Group = Group

export default Input
