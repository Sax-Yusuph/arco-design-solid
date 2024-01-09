import { JSX, Match, Show, Switch, createMemo, splitProps } from 'solid-js'
import { IconClose } from '../../icons'
import cs from '../../utils/classNames'
import { isObject } from '../../utils/is'
import { createMergedValue } from '../../utils/store'
import { toCSSObject } from '../../utils/util'
import IconHover from '../_class/icon-hover'
import { useConfigContext } from '../config-provider'
import autoSizeTextAreaHeight from './autoSizeTextAreaHeight'
import { formatValue } from './input'
import type { TextAreaProps } from './interface'
import useComposition from './useComposition'

const TextArea = (baseProps: TextAreaProps) => {
  const [props, restProps] = splitProps(baseProps, [
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
  ])
  const ctx = useConfigContext()

  const prefixCls = ctx.getPrefixCls?.('textarea')

  let textareaRef!: HTMLTextAreaElement

  // Only for error judgement
  const wordLimitMaxLength = isObject(props.maxLength) ? props.maxLength.length : props.maxLength

  // The real maxLength passed to input element
  const maxLength = createMemo(() => {
    if (isObject(props.maxLength)) {
      return props.maxLength.errorOnly ? undefined : props.maxLength.length
    }

    return props.maxLength
  })

  const [getValue, setValue] = createMergedValue('', props, ['value', 'defaultValue'], value => {
    return formatValue(value, maxLength)
  })

  const [
    compositionValue,
    { compositionHandler, valueChangeHandler, keyDownHandler, triggerValueChangeCallback },
  ] = useComposition(getValue, maxLength, {
    onInput: props.onInput,
    onKeyDown: props.onKeyDown,
    onPressEnter: props.onPressEnter,
    beforeTriggerValueChangeCallback: v => {
      const mxLength = maxLength()
      if (!('value' in props) && (mxLength === undefined || v.length <= mxLength)) {
        setValue(v)
      }
    },
  })

  const textareaDisplayedText = createMemo(() => compositionValue() || getValue() || '')

  // set element focus and caret position
  const onFocus = () => {
    if (textareaRef && textareaRef.focus) {
      if (textareaRef.setSelectionRange) {
        const caretPos = textareaRef.textContent?.length ?? 0
        // reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
        textareaRef.setSelectionRange(caretPos, caretPos)
      }

      textareaRef.focus()
    }
  }

  const handleClearClick = (e: any) => {
    e.stopPropagation()
    onFocus()
    triggerValueChangeCallback?.('', e)
    props.onClear?.()
  }

  const textAreaStyle = createMemo(() => {
    const obj: JSX.CSSProperties = {}
    if (textareaDisplayedText() && textareaRef) {
      // resizeTextAreaHeight
      const textAreaStyle = autoSizeTextAreaHeight(props.autoSize, textareaRef)
      if (textAreaStyle) {
        Object.assign(obj, textAreaStyle)
      }
    }

    if (props.disabled) {
      obj.resize = 'none'
    }

    console.log(obj)
    return obj
  })

  const hasWrapper = createMemo(
    () => (wordLimitMaxLength && props.showWordLimit) || props.allowClear,
  )

  const valueLength = createMemo(() => {
    const v = getValue()
    return v?.length || 0
  })

  const lengthError = createMemo(() => {
    if (!maxLength() && wordLimitMaxLength) {
      return valueLength() > wordLimitMaxLength
    }

    return false
  })

  const inputStatus = createMemo(() => props.status || (lengthError() ? 'error' : undefined))

  const TextAreaElement = () => (
    <textarea
      {...restProps}
      maxLength={maxLength()}
      ref={textareaRef}
      style={{ ...toCSSObject(props.style), ...textAreaStyle() }}
      class={cs(
        prefixCls,
        {
          [`${prefixCls}-${inputStatus()}`]: inputStatus(),
          [`${prefixCls}-error`]: lengthError() || props.status === 'error',
          [`${prefixCls}-disabled`]: props.disabled,
          [`${prefixCls}-rtl`]: ctx.rtl,
        },
        props.class,
      )}
      placeholder={props.placeholder}
      disabled={props.disabled}
      value={textareaDisplayedText()}
      onInput={valueChangeHandler}
      onKeyDown={keyDownHandler}
      onCompositionStart={compositionHandler}
      onCompositionUpdate={compositionHandler}
      onCompositionEnd={compositionHandler}
    />
  )

  const showClearIcon = createMemo(() => !props.disabled && props.allowClear && getValue())

  const words = createMemo(() =>
    ctx.rtl
      ? { left: wordLimitMaxLength, right: valueLength() }
      : { left: valueLength(), right: wordLimitMaxLength },
  )

  return (
    <Show when={hasWrapper()} fallback={<TextAreaElement />}>
      <div
        class={cs(`${prefixCls}-wrapper`, {
          [`${prefixCls}-clear-wrapper`]: props.allowClear,
          [`${prefixCls}-wrapper-rtl`]: ctx.rtl,
        })}
        style={props.wrapperStyle}
      >
        {<TextAreaElement />}
        <Show when={showClearIcon()}>
          <Switch
            fallback={
              <IconHover class={`${prefixCls}-clear-icon`}>
                <IconClose
                  onClick={handleClearClick}
                  // keep focus status
                  onMouseDown={e => {
                    e.preventDefault()
                  }}
                />
              </IconHover>
            }
          >
            <Match when={props.clearIcon !== undefined}>
              <span
                class={`${prefixCls}-clear-icon`}
                onClick={handleClearClick}
                onMouseDown={e => {
                  e.preventDefault()
                }}
              >
                {props.clearIcon}
              </span>
            </Match>
          </Switch>
        </Show>

        {wordLimitMaxLength && props.showWordLimit && (
          <span
            class={cs(`${prefixCls}-word-limit`, {
              [`${prefixCls}-word-limit-error`]: lengthError,
            })}
          >
            {words().left}/{words().right}
          </span>
        )}
      </div>
    </Show>
  )
}

TextArea.displayName = 'TextArea'

export default TextArea
