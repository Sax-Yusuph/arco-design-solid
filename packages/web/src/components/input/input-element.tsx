import { combineStyle } from '@solid-primitives/props'
import { mergeRefs } from '@solid-primitives/refs'
import { ResizeHandler } from '@solid-primitives/resize-observer'
import {
	JSX,
	ParentProps,
	Show,
	children,
	createMemo,
	onMount,
	splitProps,
	untrack,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import { IconClose } from '../../icons'
import cs from '../../utils/classNames'
import fillNBSP from '../../utils/fillNBSP'
import { isArray, isFunction, isObject } from '../../utils/is'
import ResizeObserver from '../../utils/resize-observer'
import useKeyboardEvent from '../../utils/use-keyboard'
import { hasIndex, toPx } from '../../utils/util'
import IconHover from '../_class/icon-hover'
import type { InputComponentProps, InputTriggers } from './interface'
import useComposition from './useComposition'
// Set the buffer width of the input element to avoid that when autoWidth.minWidth < padding + border,
// the width of the content area is 0 and the cursor will not be visible.
// this could also be added as a config prop in the future
const inputContentWidth = 2

// Get the "text style attributes" and "layout" attributes that affect width calculation from the input tag https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_text
// Why not directly set the class name of the input tag to the mirror element? Prevent users from customizing the style of the input class name from affecting the mirror
// Only executed once when mounted
const getStyleFromInput = (ref: HTMLElement): JSX.CSSProperties => {
  if (!ref) {
    return {}
  }

  const computeStyle = window.getComputedStyle(ref)

  const cssKeys: (keyof JSX.CSSProperties)[] = [
    'font',
    'letter-spacing',
    'overflow',
    'tab-size',
    'text-indent',
    'text-transform',
    'white-space',
    'word-break',
    'word-spacing',
    'padding-left',
    'padding-right',
    'border-left',
    'border-right',
    'box-sizing',
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
  'ref',
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

type StoreType = {
  inputComputedStyle?: JSX.CSSProperties
  prevInputWidth: number
}

const InputComponent = (baseProps: InputComponentProps) => {
  const [props, rest, domProps] = splitProps(baseProps, splitA, splitB)

  const [state, setState] = createStore<StoreType>({
    inputComputedStyle: undefined,
    prevInputWidth: 0,
  })

  let inputRef!: HTMLInputElement
  let inputMirrorRef!: HTMLSpanElement

  const maxLength = untrack(() => {
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
  const [comp, composition] = useComposition(value, () => maxLength, {
    onInput: props.onInput,
    onKeyDown: props.onKeyDown,
    onPressEnter: props.onPressEnter,
    normalizeHandler,
  })

  const updateInputWidth = (ref: HTMLInputElement, width: number) => {
    ref.style.width = `${width + inputContentWidth}px`
  }

  // Set the initial width of <input>, and subsequent updates are triggered by ResizeObserver
  onMount(() => {
    if (props.autoFitWidth && inputMirrorRef) {
      if (!isObject(props.autoFitWidth) || !props.autoFitWidth.pure) {
        setState('inputComputedStyle', getStyleFromInput(inputRef))
      }
    }
  })

  // Here also need placeholder to trigger updateInputWidth after user-input is cleared
  const mirrorValue = createMemo(
    () => comp.compositionValue || props.value || props.placeholder || '',
  )

  const handleClear = (e: any) => {
    inputRef.focus()
    composition.triggerValueChangeCallback?.('', e)
    props.onClear?.()
  }

  const { onKeyDown } = useKeyboardEvent()({ onPressEnter: handleClear })

  const inputStyle = createMemo(() => {
    const minWidth = isObject(props.autoFitWidth) ? props.autoFitWidth.minWidth : undefined
    const maxWidth = isObject(props.autoFitWidth) ? props.autoFitWidth.maxWidth : undefined

    if (props.allowClear || props.hasParent) {
      return
    }

    return combineStyle(
      {
        ['min-width']: toPx(minWidth),
        ['max-width']: toPx(maxWidth),

        ...('height' in props ? { height: toPx(props.height) } : {}),
      },
      props.style,
    )
  })

  const mirrorInputStyle = createMemo(() => {
    const obj = {
      ...state.inputComputedStyle,
    }

    if (props.hasParent) {
      return obj
    }

    if ('height' in props) {
      obj.height = toPx(props.height)
    }

    return combineStyle(props.style, obj)
  })

  return (
    <Wrapper
      handleClear={handleClear}
      onKeyDown={onKeyDown}
      ref={inputMirrorRef}
      mirrorValue={mirrorValue()}
      mirrorInputStyle={mirrorInputStyle() || ''}
      readOnly={props.readOnly}
      autoFitWidth={props.autoFitWidth}
      disabled={props.disabled}
      prefixCls={props.prefixCls}
      clearIcon={props.clearIcon}
      allowClear={props.allowClear}
      value={props.value}
      onResize={(_, el) => {
        const element = el as HTMLSpanElement

        if (element !== inputMirrorRef) {
          return
        }

        const inputWidth = element.offsetWidth

        if (isObject(props.autoFitWidth)) {
          const delay = isFunction(props.autoFitWidth.delay)
            ? props.autoFitWidth.delay(inputWidth, state.prevInputWidth || 0)
            : props.autoFitWidth.delay

          delay ? setTimeout(updateInputWidth, delay) : updateInputWidth(inputRef, inputWidth)
        } else {
          updateInputWidth(inputRef, inputWidth)
        }

        setState('prevInputWidth', inputWidth)
      }}
    >
      <input
        ref={mergeRefs(rest.ref, el => (inputRef = el))}
        aria-invalid={rest.status === 'error' || undefined}
        {...domProps}
        readOnly={props.readOnly}
        maxLength={maxLength}
        disabled={props.disabled}
        placeholder={props.placeholder}
        value={comp.compositionValue || props.value || ''}
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
        style={inputStyle()}
      />
    </Wrapper>
  )
}

InputComponent.displayName = 'InputComponent'

export default InputComponent

interface WrapperProps {
  handleClear(e: any): void
  onKeyDown: JSX.HTMLAttributes<HTMLSpanElement>['onKeyDown']
  onResize: ResizeHandler
  mirrorInputStyle: JSX.CSSProperties | string
  ref: HTMLSpanElement
  mirrorValue: string
  readOnly: InputComponentProps['readOnly']
  disabled: InputComponentProps['disabled']
  prefixCls: InputComponentProps['prefixCls']
  clearIcon: InputComponentProps['clearIcon']
  allowClear: InputComponentProps['allowClear']
  autoFitWidth: InputComponentProps['autoFitWidth']
  value: InputComponentProps['value']
}

const Wrapper = (props: ParentProps<WrapperProps>) => {
  const inputSlot = children(() => props.children)

  const canShowClearIcon = createMemo(
    () => !props.readOnly && !props.disabled && props.allowClear && props.value,
  )
  const prefixCls = props.prefixCls
  const onClick = (e: MouseEvent) => {
    e.stopPropagation()
    props.handleClear(e)
  }

  const onMouseDown = (e: MouseEvent) => {
    if (!props.clearIcon !== undefined) {
      e.preventDefault()
    }
  }

  return (
    <>
      <Show when={props.allowClear} fallback={inputSlot()}>
        <>
          {inputSlot()}

          <Show when={canShowClearIcon()}>
            <Show
              when={props.clearIcon}
              fallback={
                <IconHover
                  tabIndex={0}
                  class={`${prefixCls}-clear-icon`}
                  onKeyDown={props.onKeyDown}
                  onClick={onClick}
                  onMouseDown={onMouseDown}
                >
                  <IconClose
                    // keep focus status
                    onMouseDown={e => {
                      e.preventDefault()
                    }}
                  />
                </IconHover>
              }
            >
              <span
                tabIndex={0}
                class={`${prefixCls}-clear-icon`}
                onKeyDown={props.onKeyDown}
                onClick={onClick}
                onMouseDown={onMouseDown}
              >
                {props.clearIcon}
              </span>
            </Show>
          </Show>
        </>
      </Show>

      <Show when={props.autoFitWidth}>
        <ResizeObserver onResize={props.onResize}>
          <span
            class={cs(`${props.prefixCls}-mirror`)}
            style={props.mirrorInputStyle}
            ref={props.ref}
          >
            {fillNBSP(props.mirrorValue)}
          </span>
        </ResizeObserver>
      </Show>
    </>
  )
}
