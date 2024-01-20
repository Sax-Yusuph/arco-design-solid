import { combineStyle } from '@solid-primitives/props'
import { mergeRefs } from '@solid-primitives/refs'
import { isFunction } from 'lodash'
import {
	JSX,
	Match,
	ParentProps,
	Show,
	Switch,
	children,
	createMemo,
	createSignal,
	mergeProps,
} from 'solid-js'
import cs from '../../utils/classNames'
import { isObject, isString, isUndefined } from '../../utils/is'
import { syncValues } from '../../utils/store'
import { contains, toPx } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import TextArea from '../textarea'
import Group from './group'
import InputComponent from './input-element'
import type { InputProps } from './interface'
import Password from './password'
import Search from './search'
const keepFocus = (e: any) => {
  e.target.tagName !== 'INPUT' && e.preventDefault()
}

type SuffixElementProps = {
  rtl?: boolean
  trueMaxLength?: number
  valueLength: number
  prefixCls?: string
  lengthError?: boolean
  showWordLimit?: boolean
}

const SuffixElement = (props: ParentProps<SuffixElementProps>) => {
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

export const formatValue = (value?: any, maxLength?: number) => {
  const str =
    value !== null && !isUndefined(value) && !isString(value) ? String(value) : value || ''

  if (maxLength) {
    return str.slice(0, maxLength)
  }

  return str
}

function Input(baseProps: InputProps & { _ignorePropsFromGlobal?: boolean }) {
  const ctx = useConfigContext()
  const defaultProps = { size: ctx.size, defaultValue: '' }

  const props = mergeProps(
    defaultProps,
    baseProps._ignorePropsFromGlobal ? {} : ctx?.componentConfig?.Input,
    baseProps,
  )

  const maxLength = isObject(props.maxLength) ? props.maxLength.length : props.maxLength
  const isErrorOnly = isObject(props.maxLength) && props.maxLength.errorOnly

  const [inputValue, setInputValue] = syncValues(props, ['value', 'defaultValue'], v => {
    return isErrorOnly ? formatValue(v) : formatValue(v, maxLength)
  })

  const prefixCls = ctx.getPrefixCls?.('input')
  const isCustomHeight = 'height' in props
  const hasSuffix = props.showWordLimit || maxLength || 'suffix' in props

  const lengthError = createMemo(() => {
    const inputLength = inputValue()?.length
    if (maxLength && inputLength) {
      return (inputValue()?.length || 0) > maxLength
    }

    return false
  })

  const [getFocus, setFocus] = createSignal(false)

  const status = createMemo(() => props.status || (lengthError() ? 'error' : undefined))
  const needWrapper = props.addBefore || props.addAfter || hasSuffix || props.prefix

  let inputRef!: HTMLInputElement
  let inputWrapperRef!: HTMLSpanElement

  const onInput = (val: string, e: InputEvent) => {
    if (!('value' in props)) {
      setInputValue(val)
    }

    isFunction(props.onInput) && props.onInput(val, e)
  }

  const wrapperStyle = createMemo(() => {
    let autoWidth = {}

    if (props.autoWidth)
      autoWidth = {
        'min-width': 0,
        'max-width': '100%',
        width: 'auto',
        ...(isObject(props.autoWidth) ? props.autoWidth : {}),
      }

    return combineStyle(autoWidth, props.style)
  })

  return (
    <Wrapper
      ref={inputWrapperRef}
      needsWrapper={Boolean(needWrapper)}
      prefixCls={prefixCls}
      isCustomHeight={isCustomHeight}
      hasSuffix={!!hasSuffix}
      rtl={ctx.rtl}
      onWrapperClick={e => {
        if (inputWrapperRef && contains(inputWrapperRef, e.target)) {
          inputRef.focus()
        }
      }}
      wrapperStyle={combineStyle(
        wrapperStyle(),
        isCustomHeight ? { height: toPx(props.height) } : {},
      )}
      maxLength={maxLength!}
      lengthError={lengthError()}
      inputValueLength={inputValue()?.length ?? 0}
      onWrapperClickedAlt={() => {
        inputRef.focus()
      }}
      size={props.size}
      disabled={props.disabled}
      autoWidth={props.autoWidth}
      class={props.class}
      addBefore={props.addBefore}
      beforeStyle={props.beforeStyle}
      addAfter={props.addAfter}
      afterStyle={props.afterStyle}
      showWordLimit={props.showWordLimit}
      suffix={props.suffix}
      allowClear={props.allowClear}
      prefix={props.prefix}
      innerWrapperClassnames={cs(`${prefixCls}-inner-wrapper`, {
        [`${prefixCls}-inner-wrapper-${status()}`]: status(),
        [`${prefixCls}-inner-wrapper-disabled`]: props.disabled,
        [`${prefixCls}-inner-wrapper-focus`]: getFocus(),
        [`${prefixCls}-inner-wrapper-has-prefix`]: props.prefix,
        [`${prefixCls}-inner-wrapper-${props.size}`]: props.size,
        [`${prefixCls}-clear-wrapper`]: props.allowClear,
        [`${prefixCls}-inner-wrapper-rtl`]: ctx.rtl,
      })}
    >
      <InputComponent
        {...props}
        ref={mergeRefs(props.ref, el => (inputRef = el))}
        autoFitWidth={!!props.autoWidth}
        style={wrapperStyle()}
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
        value={inputValue()}
        hasParent={!!needWrapper || props.allowClear}
        size={props.size}
      />
    </Wrapper>
  )
}

Input.displayName = 'Input'

Input.Search = Search

Input.TextArea = TextArea

Input.Password = Password

Input.Group = Group

export default Input

interface WrapperProps extends ParentProps {
  needsWrapper?: boolean
  prefixCls?: string
  isCustomHeight: boolean
  hasSuffix?: boolean
  rtl?: boolean
  innerWrapperClassnames: string
  ref: HTMLSpanElement
  onWrapperClick: JSX.HTMLAttributes<HTMLSpanElement>['onClick']
  wrapperStyle: JSX.CSSProperties | string
  maxLength: number
  lengthError?: boolean
  inputValueLength: number
  onWrapperClickedAlt: JSX.HTMLAttributes<HTMLSpanElement>['onClick']
  size: InputProps['size']
  disabled: InputProps['disabled']
  autoWidth: InputProps['autoWidth']
  class: InputProps['class']
  addBefore: InputProps['addBefore']
  beforeStyle: InputProps['beforeStyle']
  addAfter: InputProps['addAfter']
  afterStyle: InputProps['afterStyle']
  showWordLimit: InputProps['showWordLimit']
  suffix: InputProps['suffix']
  allowClear: InputProps['allowClear']
  prefix: InputProps['prefix']
}

export const Wrapper = (props: WrapperProps) => {
  const inputSlot = children(() => props.children)
  const prefixCls = props.prefixCls
  let ref!: HTMLSpanElement

  return (
    <Switch fallback={inputSlot()}>
      <Match when={props.needsWrapper}>
        <div
          class={cs(
            `${prefixCls}-group-wrapper`,
            `${prefixCls}-group-wrapper-${props.size}`,
            {
              [`${prefixCls}-custom-height`]: props.isCustomHeight,
              [`${prefixCls}-has-suffix`]: props.hasSuffix,
              [`${prefixCls}-group-wrapper-disabled`]: props.disabled,
              [`${prefixCls}-group-wrapper-rtl`]: props.rtl,
              [`${prefixCls}-group-wrapper-autowidth`]: props.autoWidth,
            },
            props.class,
          )}
          style={props.wrapperStyle}
        >
          <span class={`${prefixCls}-group`}>
            <InputAddon class={`${prefixCls}-group-addbefore`} style={props.beforeStyle}>
              {props.addBefore}
            </InputAddon>

            <span
              class={props.innerWrapperClassnames}
              ref={mergeRefs(props.ref, el => (ref = el))}
              onMouseDown={e => {
                if ((e.target as HTMLElement).tagName !== 'INPUT') {
                  if (contains(ref, e.target)) {
                    e.preventDefault()
                  }
                }
              }}
              onClick={e => {
                isFunction(props.onWrapperClick) && props.onWrapperClick?.(e)
              }}
            >
              <InputAddon class={`${prefixCls}-group-prefix`}>{props.prefix}</InputAddon>

              {inputSlot()}

              <InputAddon class={`${prefixCls}-group-suffix`}>
                <SuffixElement
                  rtl={props.rtl}
                  trueMaxLength={props.maxLength}
                  lengthError={props.lengthError}
                  prefixCls={prefixCls}
                  showWordLimit={props.showWordLimit}
                  valueLength={props.inputValueLength}
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
          class={cs(props.class, props.innerWrapperClassnames)}
          style={props.wrapperStyle}
          onMouseDown={keepFocus}
          onClick={props.onWrapperClickedAlt}
        >
          {inputSlot}
        </span>
      </Match>
    </Switch>
  )
}

const InputAddon = (props: JSX.HTMLAttributes<HTMLSpanElement>) => {
  const node = children(() => props.children)

  return (
    <Show when={node()}>
      <span style={props.style} class={props.class} onClick={props.onClick}>
        {node()}
      </span>
    </Show>
  )
}
