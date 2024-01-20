import { combineStyle } from '@solid-primitives/props'
import { mergeRefs } from '@solid-primitives/refs'
import { JSX, createEffect, createMemo, on, splitProps, untrack } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import { toValue } from 'solidjs-use'
import cs from '../../utils/classNames'
import { isObject } from '../../utils/is'
import { syncValues } from '../../utils/store'
import { useConfigContext } from '../config-provider'
import { formatValue } from '../input/input'
import type { TextAreaProps } from '../input/interface'
import useComposition from '../input/useComposition'
import autoSizeTextAreaHeight from './autoSizeTextAreaHeight'
import { WrapperElement } from './wrapper'

const splitable = [
  'ref',
  'class',
  'style',
  'wrapperStyle',
  'placeholder',
  'disabled',
  'error',
  'maxLength',
  'showWordLimit',
  'allowClear',
  'onInput',
  'onClear',
  'onKeyDown',
  'onPressEnter',
  'status',
  'clearIcon',
  'value',
  'defaultValue',
  'autoSize',
] as const

const TextArea = (baseProps: TextAreaProps) => {
  const ctx = useConfigContext()
  let ref!: HTMLTextAreaElement
  const prefixCls = ctx.getPrefixCls?.('textarea')
  const [props, domProps] = splitProps(baseProps, splitable)

  // Only for error judgement
  const wordLimit = isObject(props.maxLength) ? props.maxLength.length : props.maxLength
  const hasWrapper = (wordLimit && props.showWordLimit) || props.allowClear

  // The real maxLength passed to input element
  const maxLength = untrack(() => {
    if (isObject(props.maxLength)) {
      return props.maxLength.errorOnly ? undefined : props.maxLength.length
    }

    return props.maxLength
  })

  const [value, setValue] = syncValues(props, ['value', 'defaultValue'], value => {
    return formatValue(value, maxLength)
  })

  const valueLength = createMemo(() => {
    return value()?.length || 0
  })

  const exceedLengthError = createMemo(() => {
    if (!maxLength && wordLimit) {
      return valueLength() > wordLimit
    }

    return false
  })

  const inputStatus = createMemo(() => props.status || (exceedLengthError() ? 'error' : undefined))
  const showClearIcon = createMemo(() => !props.disabled && props.allowClear && value())
  const words = createMemo(() =>
    ctx.rtl
      ? { left: wordLimit || 0, right: valueLength() }
      : { left: valueLength(), right: wordLimit || 0 },
  )

  const [comp, handler] = useComposition(value, () => maxLength, {
    onInput: props.onInput,
    onKeyDown: props.onKeyDown,
    onPressEnter: props.onPressEnter,
    beforeTriggerValueChangeCallback: v => {
      if (!('value' in props) && (maxLength === undefined || v.length <= maxLength)) {
        setValue(v)
      }
    },
  })

  const onFocus = (ref?: HTMLTextAreaElement) => {
    if (!ref) return
    const caretPos = ref.textContent?.length ?? 0
    ref.setSelectionRange(caretPos, caretPos)

    ref.focus()
  }

  const handleClearClick = (e: any) => {
    e.stopPropagation()
    onFocus(ref)

    handler.triggerValueChangeCallback?.('', e)
    props.onClear?.()
  }

  const displayedText = createMemo(() => comp.compositionValue || value() || '')
  // const styles = useAutoResizeStyles(ref, displayedText, props)
  const [styles, setStyles] = createStore<JSX.CSSProperties>({})

  createEffect(
    on(displayedText, () => {
      if (ref) {
        const textAreaStyle = autoSizeTextAreaHeight(props.autoSize, ref)
        if (textAreaStyle) {
          setStyles(reconcile(textAreaStyle))
        }
      }
    }),
  )

  createEffect(() => {
    if (props.disabled) {
      setStyles('resize', 'none')
    }
  })

  return (
    <WrapperElement
      withWrapper={hasWrapper}
      showWordLimit={Boolean(wordLimit && props.showWordLimit)}
      words={words()}
      error={exceedLengthError()}
      prefixCls={prefixCls}
      wrapperStyle={props.wrapperStyle}
      rtl={ctx.rtl}
      allowClear={props.allowClear}
      clearIcon={props.clearIcon}
      showClearIcon={Boolean(showClearIcon())}
      handleClearClick={handleClearClick}
    >
      <textarea
        {...domProps}
        maxLength={maxLength}
        ref={mergeRefs(props.ref, el => (ref = el))}
        style={combineStyle(props.style, toValue(styles))}
        class={cs(
          prefixCls,
          {
            [`${prefixCls}-${inputStatus()}`]: inputStatus(),
            // [`${prefixCls}-error`]: exceedLengthError() || props.status === 'error',
            [`${prefixCls}-disabled`]: props.disabled,
            [`${prefixCls}-rtl`]: ctx.rtl,
          },
          props.class,
        )}
        placeholder={props.placeholder}
        disabled={props.disabled}
        value={displayedText()}
        onInput={handler.valueChangeHandler}
        onKeyDown={handler.keyDownHandler}
        onCompositionStart={handler.compositionHandler}
        onCompositionUpdate={handler.compositionHandler}
        onCompositionEnd={handler.compositionHandler}
      />
    </WrapperElement>
  )
}

TextArea.displayName = 'TextArea'

export default TextArea
