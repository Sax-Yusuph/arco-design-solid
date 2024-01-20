import {
    Accessor,
    JSXElement,
    ParentProps,
    Show,
    children,
    createMemo,
    mergeProps,
    onMount,
    splitProps,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import { Transition, TransitionGroup } from 'solid-transition-group'
import { usePrevious } from 'solidjs-use'
import { IconClose } from "../../icon/arco-icons"
import cs from '../../utils/classNames'
import fillNBSP from '../../utils/fillNBSP'
import getHotkeyHandler from '../../utils/getHotkeyHandler'
import { isArray, isFunction, isObject } from '../../utils/is'
import { Backspace } from '../../utils/keycode'
import { syncValues } from '../../utils/store'
import Draggable from '../_class/Draggable'
import IconHover from '../_class/icon-hover'
import { useConfigContext } from '../config-provider'
import InputComponent from '../input/input-element'
import Tag from '../tag'
import type { InputTagProps, ObjectValueType, ValueChangeReason } from './interface'

const CSS_TRANSITION_DURATION = 300
const REACT_KEY_FOR_INPUT = `__input_${Math.random().toFixed(10).slice(2)}`

const isEmptyNode = (node: JSXElement): boolean => {
  return node === null || node === undefined
}

const keepFocus = e => {
  e.target.tagName !== 'INPUT' && e.preventDefault()
}

const formatValue = (value: (ObjectValueType | string)[]) => {
  if (!isArray(value)) {
    return []
  }
  return value.map(item => {
    return isObject(item)
      ? {
          ...item,
          label: 'label' in item ? item.label : item.value,
          value: item.value,
          closable: item.closable,
        }
      : {
          label: item,
          value: item,
        }
  })
}

type InputTagHandle = {
  focus: () => void
  blur: () => void
}

// Deal with the delay of recomputing input width
const useComputeAutoWidthDelay = (value: Accessor<InputTagProps<any>['value']>) => {
  const prevValue = usePrevious(value)

  const delay = createMemo(() => {
    const val = value()
    const prev = prevValue() || []
    if (val) {
      return val.length === 0 && prev.length > 0 ? CSS_TRANSITION_DURATION : 0
    }

    return 0
  })

  return delay
}

const UsedTransitionGroup = (props: ParentProps<{ prefixCls?: string; animation?: boolean }>) => {
  const nodes = children(() => props.children)
  return (
    <Show when={props.animation} fallback={<div class={`${props.prefixCls}-inner`}>{nodes()}</div>}>
      <TransitionGroup name={`${props.prefixCls}-inner`}>{nodes()}</TransitionGroup>
    </Show>
  )
}

const splitabble = [
  'class',
  'style',
  'placeholder',
  'error',
  'disabled',
  'readOnly',
  'allowClear',
  'autoFocus',
  'labelInValue',
  'disableInput',
  'animation',
  'saveOnBlur',
  'dragToSort',
  'icon',
  'prefix',
  'suffix',
  'addBefore',
  'addAfter',
  'tokenSeparators',
  'validate',
  'renderTag',
  'tagClassName',
  'onInputChange',
  'onKeyDown',
  'onPaste',
  'onChange',
  'onFocus',
  'onBlur',
  'onPressEnter',
  'onRemove',
  'onClear',
  'onClick',
  'size',
  'status',
  'defaultValue',
  'value',
  'inputValue',
  'ref',
] as const

function InputTag(baseProps: InputTagProps<string | ObjectValueType>) {
  const ctx = useConfigContext()
  const defaultProps: InputTagProps = {
    animation: true,
    validate: (inputValue, values) => inputValue && values.every(item => item.value !== inputValue),
    size: ctx.size,
    defaultValue: [],
  }

  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.InputTag, baseProps)

  const [props, restProps] = splitProps(mergedProps, splitabble)

  const prefixCls = ctx.getPrefixCls?.('input-tag')

  let refInput!: HTMLInputElement

  const [state, setState] = createStore<{
    focused: boolean
    TSLastSeparateTriggered: number | null
  }>({
    focused: false,
    TSLastSeparateTriggered: null,
  })
  const [value, setValue] = syncValues(baseProps, ['value', 'defaultValue'], v => {
    return v ? formatValue(v) : undefined
  })

  const [inputValue, setInputValue] = syncValues(baseProps, ['inputValue'])

  const delay = useComputeAutoWidthDelay(value)

  const draggable = !!(props.dragToSort && !props.readOnly && !props.disabled)

  const valueChangeHandler = (value: ObjectValueType[], reason: ValueChangeReason) => {
    if (props.disabled || props.readOnly) {
      return
    }
    if (!('value' in props)) {
      setValue(value)
    }

    props.onChange && props.onChange(props.labelInValue ? value : value.map(x => x.value), reason)
  }

  const tagCloseHandler = (itemValue: ObjectValueType, index: number, event: any) => {
    props.onRemove && props.onRemove(itemValue, index, event)

    const v = (value() || []) as ObjectValueType[]
    valueChangeHandler([...v.slice(0, index), ...v.slice(index + 1)], 'remove')
  }

  const hotkeyHandler = getHotkeyHandler(
    new Map([
      [
        Backspace.code,
        (event: any) => {
          if (!event.target.value && value.length) {
            const v = (value() || []) as ObjectValueType[]

            for (let index = v.length - 1; index >= 0; index--) {
              const itemValue = v[index]
              if (itemValue?.closable !== false) {
                tagCloseHandler(itemValue, index, event)
                return
              }
            }
          }
        },
      ],
    ]),
  )

  const tryAddInputValueToTag = async () => {
    const tags = value() as ObjectValueType[]

    try {
      const validateResult = isFunction(props.validate)
        ? await props.validate(inputValue() || '', tags)
        : true

      if (validateResult) {
        valueChangeHandler(
          tags.concat({
            value: validateResult === true ? inputValue : validateResult,
            label: inputValue,
          }),
          'add',
        )
        setInputValue('')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const mergedRenderTag = (item: ObjectValueType, index: number) => {
    const { value: itemValue, label } = item
    const closable = !props.readOnly && !props.disabled && item.closable !== false

    const onClose = (event: any) => {
      tagCloseHandler(item, index, event)
    }

    if (props.renderTag) {
      return props.renderTag(
        {
          value: itemValue,
          label,
          closable,
          onClose,
        },
        index,
        value() as ObjectValueType[],
      )
    }

    return (
      <Tag
        visible
        class={cs(`${prefixCls}-tag`, {
          [props.tagClassName || '']: props.tagClassName,
        })}
        closable={closable}
        closeIcon={props.icon?.removeIcon}
        __closeIconProps={{
          onMouseDown: keepFocus,
        }}
        title={typeof label === 'string' ? label : undefined}
        onClose={onClose}
      >
        {fillNBSP(label)}
      </Tag>
    )
  }

  const handleTokenSeparators = async (str: string) => {
    // clear the timestamp, and then we can judge whether tokenSeparators has been triggered
    // according to timestamp value

    setState('TSLastSeparateTriggered', null)

    if (isArray(props.tokenSeparators) && props.tokenSeparators.length) {
      const splitTextList = str.split(new RegExp(`[${props.tokenSeparators.join('')}]`))
      const tags = value() as ObjectValueType[]

      if (splitTextList.length > 1) {
        // record the timestamp of tokenSeparators triggered
        setState('TSLastSeparateTriggered', Date.now())

        const validatedValueList: ObjectValueType[] = []

        await Promise.all(
          splitTextList.map(async text => {
            // filter empty string and validate it
            const validateResult = text
              ? isFunction(props.validate)
                ? await props.validate(text, tags)
                : true
              : false

            if (validateResult) {
              validatedValueList.push({
                value: validateResult === true ? text : validateResult,
                label: text,
              })
            }
          }),
        )

        if (validatedValueList.length) {
          valueChangeHandler(tags.concat(validatedValueList), 'add')
        }
      }
    }
  }

  const clearIcon =
    props.allowClear && !props.disabled && !props.readOnly && value.length ? (
      <IconHover
        size={props.size}
        class={`${prefixCls}-clear-icon`}
        onClick={e => {
          e.stopPropagation()
          valueChangeHandler([], 'clear')
          if (!state.focused) {
            refInput.focus()
          }
          props.onClear?.()
        }}
      >
        {props.icon?.clearIcon || <IconClose />}
      </IconHover>
    ) : null

  const disableInputComponent = props.disabled || props.disableInput

  // CSSTransition needs to be a direct child of TransitionGroup, otherwise the animation will NOT work
  // https://github.com/arco-design/arco-design/issues/622
  const childrenWithAnimation = value
    .map((x, i) => {
      // Check whether two tags have same value. If so, set different key for them to avoid only rendering one tag.
      const isRepeat = value.findIndex(item => item.value === x.value) !== i
      const eleTag = mergedRenderTag(x, i)
      return React.isValidElement(eleTag) ? (
        <CSSTransition
          key={typeof x.value === 'object' ? i : isRepeat ? `${x.value}-${i}` : x.value}
          timeout={CSS_TRANSITION_DURATION}
          classNames="zoomIn"
        >
          {eleTag}
        </CSSTransition>
      ) : (
        eleTag
      )
    })
    .concat(
      <Transition name="zoomIn">
        <InputComponent
          autoComplete="off"
          size={props.size}
          disabled={disableInputComponent}
          readOnly={props.readOnly}
          ref={refInput}
          autoFocus={props.autoFocus}
          placeholder={!value.length ? props.placeholder : ''}
          prefixCls={`${prefixCls}-input`}
          autoFitWidth={{
            delay,
            pure: true,
          }}
          onPressEnter={async e => {
            inputValue() && e.preventDefault()
            props.onPressEnter?.(e)
            await tryAddInputValueToTag()
          }}
          onFocus={e => {
            if (!disableInputComponent && !props.readOnly) {
              setState('focused', true)
              props.onFocus?.(e)
            }
          }}
          onBlur={async e => {
            setState('focused', false)
            props.onBlur?.(e)
            if (props.saveOnBlur) {
              await tryAddInputValueToTag()
            }
            setInputValue('')
          }}
          value={inputValue()}
          onInput={(value, event) => {
            // Only fire callback on user input to ensure parent component can get real input value on controlled mode.
            props.onInputChange?.(value, event)

            // Pasting in the input box will trigger onPaste first and then onChange, but the value of onChange does not contain a newline character.
            // If word segmentation has just been triggered due to pasting, onChange will no longer attempt word segmentation.
            // Do NOT use await, need to update input value right away.
            event.nativeEvent.inputType !== 'insertFromPaste' && handleTokenSeparators(value)

            if (state.TSLastSeparateTriggered) {
              setInputValue('')
            } else {
              setInputValue(value)
            }
          }}
          onKeyDown={event => {
            hotkeyHandler(event as any)
            props.onKeyDown?.(event)
          }}
          onPaste={event => {
            props.onPaste?.(event)
            const clipboardData = event.clipboardData?.getData('text') ?? ''
            handleTokenSeparators(clipboardData)
          }}
        />
      </Transition>,
    )

  const hasPrefix = !isEmptyNode(props.prefix)
  const hasSuffix = !isEmptyNode(props.suffix) || !isEmptyNode(clearIcon)
  const needAddBefore = !isEmptyNode(props.addBefore)
  const needAddAfter = !isEmptyNode(props.addAfter)
  const needWrapper = needAddBefore || needAddAfter

  const status = props.status || (props.error ? 'error' : undefined)
  const innerClassNames = cs(prefixCls, {
    [`${prefixCls}-size-${props.size}`]: props.size,
    [`${prefixCls}-disabled`]: props.disabled,
    [`${prefixCls}-${status}`]: status,
    [`${prefixCls}-focus`]: state.focused,
    [`${prefixCls}-readonly`]: props.readOnly,
    [`${prefixCls}-has-suffix`]: hasSuffix,
    [`${prefixCls}-has-placeholder`]: !value.length,
    [`${prefixCls}-rtl`]: ctx.rtl,
  })
  const propsAppliedToRoot = { style: props.style, class: props.class }

  onMount(() => {
    if ('ref' in baseProps) {
      const handle: InputTagHandle = {
        blur: refInput.blur,
        focus: refInput.focus,
      }

      isFunction(baseProps.ref) && baseProps.ref(handle)
    }
  })

  const eleInputTagCore = (
    <div
      {...restProps}
      {...(needWrapper ? {} : propsAppliedToRoot)}
      class={needWrapper ? innerClassNames : cs(innerClassNames, propsAppliedToRoot.class)}
      onMouseDown={event => {
        state.focused && keepFocus(event)
      }}
      onClick={e => {
        !state.focused && refInput.focus()
        isFunction(props.onClick) && props.onClick?.(e)
      }}
    >
      <div class={`${prefixCls}-view`}>
        {hasPrefix && (
          <div class={`${prefixCls}-prefix`} onMouseDown={keepFocus}>
            {props.prefix}
          </div>
        )}

        <Show
          when={draggable}
          fallback={
            <UsedTransitionGroup prefixCls={prefixCls} animation={props.animation}>
              {childrenWithAnimation}
            </UsedTransitionGroup>
          }
        >
          <UsedTransitionGroup prefixCls={prefixCls} animation={props.animation}>
            <Draggable
              itemWrapperStyle={{ display: 'inline-block' }}
              direction="horizontal"
              onIndexChange={(index, prevIndex) => {
                const moveItem = function (
                  arr: ObjectValueType[],
                  fromIndex: number,
                  toIndex: number,
                ) {
                  arr = arr.slice()
                  const isMoveLeft = fromIndex > toIndex
                  const [item] = arr.splice(fromIndex, 1)

                  arr.splice(isMoveLeft ? toIndex : toIndex - 1, 0, item)
                  return arr
                }

                valueChangeHandler(moveItem(value() as ObjectValueType[], prevIndex, index), 'sort')
              }}
            >
              {childrenWithAnimation}
            </Draggable>
          </UsedTransitionGroup>
        </Show>

        <Show when={hasSuffix}>
          <div class={`${prefixCls}-suffix`} onMouseDown={keepFocus}>
            {clearIcon}
            {props.suffix}
          </div>
        </Show>
      </div>
    </div>
  )

  if (!needWrapper) {
    return eleInputTagCore
  }

  return (
    <div
      {...propsAppliedToRoot}
      class={cs(
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-wrapper-rtl`]: ctx.rtl,
        },
        propsAppliedToRoot.class,
      )}
    >
      {needAddBefore && <div class={`${prefixCls}-addbefore`}>{props.addBefore}</div>}
      {eleInputTagCore}
      {needAddAfter && <div class={`${prefixCls}-addafter`}>{props.addAfter}</div>}
    </div>
  )
}

export default InputTag

export { InputTagProps }
