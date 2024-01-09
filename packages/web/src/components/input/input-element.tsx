import { createResizeObserver } from '@solid-primitives/resize-observer'
import { JSX, Match, Show, Switch, createMemo, createSignal, onMount, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { IconClose } from '../../icons'
import cs from '../../utils/classNames'
import fillNBSP from '../../utils/fillNBSP'
import { isArray, isFunction, isObject } from '../../utils/is'
import useKeyboardEvent from '../../utils/use-keyboard'
import { hasIndex, toCSSObject, toPx } from '../../utils/util'
import IconHover from '../_class/icon-hover'
import type { InputComponentProps, InputTriggers } from './interface'
import useComposition from './useComposition'

// 设置 input 元素缓冲宽度，避免 autoWidth.minWidth < padding + border 时，content 区域宽度为0，光标会看不到
// 后续可考虑是否作为 autoWidth 的一个配置项暴露
const inputContentWidth = 2

const updateInputWidth = (ref: HTMLInputElement, width: number) => {
  setTimeout(() => {
    ref.style.width = `${width + inputContentWidth}px`
  })
}

// 从 input 标签获取影响到宽度计算的"文本样式属性"和“布局”属性 https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_text
// 为什么不是直接把 input 标签的类名设置给 mirror 元素？避免用户对 input 类名自定义样式会影响到 mirror
// 仅在 mounted 的时候执行一次
const getStyleFromInput = (input: HTMLElement): JSX.CSSProperties => {
  if (!input) {
    return {}
  }

  const computeStyle = window.getComputedStyle(input)

  const cssKeys = [
    'font',
    'letterSpacing',
    'overflow',
    'tabSize',
    'textIndent',
    'textTransform',
    'whiteSpace',
    'wordBreak',
    'wordSpacing',
    'paddingLeft',
    'paddingRight',
    'borderLeft',
    'borderRight',
    'boxSizing',
  ]

  return cssKeys.reduce((t, n) => {
    //@ts-ignore
    t[n] = computeStyle[n]
    return t
  }, {})
}

const splitA = [
  'allowClear',
  'disabled',
  'placeholder',
  'class',
  'style',
  'height',
  'prefixCls',
  'hasParent',
  'size',
  'value',
  'autoFitWidth',
  'onClear',
  'onInput',
  'readOnly',
  'onChange',
  'onKeyDown',
  'onPressEnter',
  'maxLength',
  'clearIcon',
] as const

const splitB = [
  'error',
  'status',
  'showWordLimit',
  'defaultValue',
  'addBefore',
  'addAfter',
  'afterStyle',
  'beforeStyle',
  'prefix',
  'suffix',
  'normalize',
  'normalizeTrigger',
  'autoWidth',
  'onBlur',
] as const

const InputComponent = (baseProps: InputComponentProps) => {
  const [props, rest, otherProps] = splitProps(baseProps, splitA, splitB)

  const [getInputComputeStyle, setInputComputeStyle] = createSignal<JSX.CSSProperties>()

  let refInput!: HTMLInputElement
  let refInputMirror!: HTMLSpanElement

  const [getPrevInputWidth, setPrefInputWidth] = createSignal(0)

  const maxLength = createMemo(() => {
    if (isObject(props.maxLength)) {
      return props.maxLength.errorOnly ? undefined : props.maxLength.length
    }

    return props.maxLength
  })

  const normalizeHandler = (type: InputTriggers) => {
    let handler

    const normalizeTrigger = rest.normalizeTrigger || ['onBlur']
    const canNormalize =
      isArray(normalizeTrigger) && hasIndex(normalizeTrigger, type) && isFunction(rest.normalize)

    if (canNormalize) {
      handler = rest.normalize
    }

    return handler
  }

  const value = createMemo(() => props.value)
  const [getCompositionValue, composition] = useComposition(value, maxLength, {
    onInput: props.onInput,
    onKeyDown: props.onKeyDown,
    onPressEnter: props.onPressEnter,
    normalizeHandler,
  })

  // Set the initial width of <input>, and subsequent updates are triggered by ResizeObserver
  onMount(() => {
    if (props.autoFitWidth) {
      if (!isObject(props.autoFitWidth) || !props.autoFitWidth.pure) {
        setInputComputeStyle(getStyleFromInput(refInput))
      }

      updateInputWidth(refInput, refInputMirror.offsetWidth)
    }
  })

  // Here also need placeholder to trigger updateInputWidth after user-input is cleared
  const mirrorValue = createMemo(
    () => getCompositionValue() || props.value || props.placeholder || '',
  )

  const handleClear = (e: any) => {
    refInput.focus()
    composition.triggerValueChangeCallback?.('', e)
    props.onClear?.()
  }

  const { onKeyDown } = useKeyboardEvent()({ onPressEnter: handleClear })

  onMount(() => {
    createResizeObserver(refInputMirror, (_, el) => {
      const element = el as HTMLSpanElement

      if (element !== refInputMirror) {
        return
      }

      const inputWidth = element.offsetWidth

      if (isObject(props.autoFitWidth)) {
        const delay = isFunction(props.autoFitWidth.delay)
          ? props.autoFitWidth.delay(inputWidth, getPrevInputWidth() || 0)
          : props.autoFitWidth.delay

        delay ? setTimeout(updateInputWidth, delay) : updateInputWidth(refInput, inputWidth)
      } else {
        updateInputWidth(refInput, inputWidth)
      }

      setPrefInputWidth(inputWidth)
    })
  })

  const renderInput = (style?: JSX.CSSProperties) => {
    return (
      <input
        ref={refInput}
        aria-invalid={rest.status === 'error' || undefined}
        {...otherProps}
        readOnly={props.readOnly}
        maxLength={maxLength()}
        disabled={props.disabled}
        placeholder={props.placeholder}
        value={getCompositionValue() || props.value || ''}
        class={cs(
          props.prefixCls,
          props.prefixCls && {
            [`${props.prefixCls}-size-${props.size}`]: props.size,
            [`${props.prefixCls}-${rest.status}`]: rest.status,
            [`${props.prefixCls}-disabled`]: props.disabled,
            [`${props.prefixCls}-autowidth`]: props.autoFitWidth,
          },
          props.hasParent ? undefined : props.class,
        )}
        onKeyDown={composition.keyDownHandler}
        onInput={composition.valueChangeHandler}
        onCompositionStart={composition.compositionHandler}
        onCompositionUpdate={composition.compositionHandler}
        onCompositionEnd={composition.compositionHandler}
        onBlur={(e: any) => {
          isFunction(rest.onBlur) && rest.onBlur(e)
          const normalize = normalizeHandler('onBlur')

          if (normalize) {
            composition.triggerValueChangeCallback?.(normalize(e.currentTarget.value), e)
          }
        }}
        style={style}
      />
    )
  }

  return (
    <>
      <Switch>
        <Match when={props.allowClear}>
          <>
            {renderInput()}

            <Show when={!props.readOnly && !props.disabled && props.allowClear && props.value}>
              <Dynamic
                component={props.clearIcon !== undefined ? 'span' : IconHover}
                tabIndex={0}
                class={`${props.prefixCls}-clear-icon`}
                onKeyDown={onKeyDown}
                onClick={(e: MouseEvent) => {
                  e.stopPropagation()
                  handleClear(e)
                }}
                onMouseDown={(e: MouseEvent) => {
                  if (!props.clearIcon !== undefined) {
                    e.preventDefault()
                  }
                }}
              >
                <Show
                  when={props.clearIcon}
                  fallback={
                    <IconClose
                      // keep focus status
                      onMouseDown={e => {
                        e.preventDefault()
                      }}
                    />
                  }
                >
                  {props.clearIcon}
                </Show>
              </Dynamic>
            </Show>
          </>
        </Match>

        <Match when={!props.allowClear}>
          {renderInput(
            props.hasParent
              ? undefined
              : {
                  'min-width': isObject(props.autoFitWidth)
                    ? props.autoFitWidth.minWidth
                    : undefined,
                  'max-width': isObject(props.autoFitWidth)
                    ? props.autoFitWidth.maxWidth
                    : undefined,
                  ...(props.style as JSX.CSSProperties),
                  ...('height' in props ? { height: toPx(props.height) } : {}),
                },
          )}
        </Match>
      </Switch>

      <Show when={props.autoFitWidth}>
        <span
          class={cs(`${props.prefixCls}-mirror`)}
          style={
            props.hasParent
              ? getInputComputeStyle()
              : {
                  ...getInputComputeStyle(),
                  ...toCSSObject(props.style),
                  ...('height' in props ? { height: toPx(props.height) } : {}),
                }
          }
          ref={refInputMirror}
        >
          {fillNBSP(mirrorValue)}
        </span>
      </Show>
    </>
  )
}

InputComponent.displayName = 'InputComponent'

export default InputComponent
