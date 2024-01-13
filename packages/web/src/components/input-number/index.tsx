import {
	JSXElement,
	Show,
	createEffect,
	createMemo,
	mergeProps,
	onCleanup,
	splitProps,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import { IconDown, IconMinus, IconPlus, IconUp } from '../../icons'
import cs from '../../utils/classNames'
import { isFunction, isNumber } from '../../utils/is'
import { ArrowDown, ArrowUp } from '../../utils/keycode'
import { useConfigContext } from '../config-provider'
import Input from '../input/input'
import { getDecimal, type Decimal } from './Decimal'
import type { InputNumberProps } from './interface'
import useSelectionRange from './useSelectionRange'

// Value's auto change speed when user holds on plus or minus
const AUTO_CHANGE_INTERVAL = 200

// Delay to auto change value when user holds on plus or minus
const AUTO_CHANGE_START_DELAY = 1000

type StepMethods = 'minus' | 'plus'

type StateType = {
  inputValue: string
  isOutOfRange: boolean
  isUserTyping: boolean
  autoTimer: number | null
  // Ref to keep track of whether user has taken operations since the last change of prop value
  hasOperateSincePropValueChanged: boolean
  innerValue: Decimal
}

function InputNumber(baseProps: InputNumberProps) {
  const ctx = useConfigContext()

  const defaultProps: InputNumberProps = {
    max: Infinity,
    min: -Infinity,
    step: 1,
    mode: 'embed',
    parser: input => input.replace(/[^\w\.-]+/g, '') || '',
    size: ctx.size,
  }

  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.InputNumber, baseProps)
  const [props, otherProps] = splitProps(mergedProps, [
    'value',
    'class',
    'style',
    'defaultValue',
    'disabled',
    'error',
    'readOnly',
    'strictMode',
    'placeholder',
    'hideControl',
    'suffix',
    'prefix',
    'icons',
    'mode',
    'size',
    'step',
    'precision',
    'min',
    'max',
    'parser',
    'formatter',
    'onBlur',
    'onFocus',
    'onChange',
    'onKeyDown',
    'onInput',
  ])

  const prefixCls = ctx.getPrefixCls?.('input-number')

  const mergedPrecision = createMemo(() => {
    if (isNumber(props.precision)) {
      const decimal = `${props.step}`.split('.')[1]
      const stepPrecision = (decimal && decimal.length) || 0
      return Math.max(stepPrecision, props.precision)
    }

    return undefined
  })

  const [state, setState] = createStore<StateType>({
    inputValue: '',
    isOutOfRange: false,
    isUserTyping: false,
    autoTimer: null,
    // Ref to keep track of whether user has taken operations since the last change of prop value
    hasOperateSincePropValueChanged: false,
    innerValue: getDecimal(
      'value' in props ? props.value : 'defaultValue' in props ? props.defaultValue : undefined,
    ),
  })

  let refInput!: HTMLInputElement

  const realValue = createMemo(() => {
    return 'value' in props ? getDecimal(props.value) : state.innerValue
  })

  const setValue = (newValue: Decimal) => {
    setState('innerValue', newValue)

    if (!newValue.equals(realValue()) && props.onInput) {
      const newValueStr = newValue.toString({ safe: true, precision: mergedPrecision() })
      props.onInput(
        newValue.isEmpty
          ? undefined
          : props.strictMode
          ? (newValueStr as any)
          : newValue.isNaN
          ? NaN
          : Number(newValueStr),
      )
    }
  }

  const stop = () => {
    const timer = state.autoTimer
    if (timer) {
      clearTimeout(timer)
    }

    setState('autoTimer', null)
  }

  const getLegalValue = (changedValue: Decimal) => {
    let finalValue = changedValue
    const minDecimal = getDecimal(props.min)
    const maxDecimal = getDecimal(props.max)

    if (finalValue.less(minDecimal)) {
      finalValue = minDecimal
    } else if (maxDecimal.less(finalValue)) {
      finalValue = maxDecimal
    }

    return finalValue
  }

  onCleanup(() => {
    stop()
  })

  createEffect(() => {
    const v = props.value
    setState('hasOperateSincePropValueChanged', false)
  })

  createEffect(() => {
    const minDecimal = getDecimal(props.min)
    const maxDecimal = getDecimal(props.max)

    const _isOutOfRange = realValue().less(minDecimal) || maxDecimal.less(realValue())

    // Don't correct the illegal value caused by prop value. Wait for user to take actions.
    if (_isOutOfRange && state.hasOperateSincePropValueChanged) {
      setValue(getLegalValue(realValue()))
    }

    setState('isOutOfRange', _isOutOfRange)
  })

  const handleArrowKey = (event: any, method: StepMethods, needRepeat = false) => {
    event.persist?.()
    event.preventDefault()
    setState('isUserTyping', false)

    if (props.disabled || props.readOnly) {
      return
    }

    const step = props.step || 0
    const finalValue = realValue().isInvalid
      ? getDecimal(props.min === -Infinity ? 0 : props.min)
      : realValue().add(method === 'plus' ? step : -step)

    setValue(getLegalValue(finalValue))
    refInput?.focus()

    // auto change while holding
    if (needRepeat) {
      const isFirstRepeat = state.autoTimer === null
      const id = window.setTimeout(
        () => event.nativeEvent instanceof Event && event.target.dispatchEvent(event.nativeEvent),
        isFirstRepeat ? AUTO_CHANGE_START_DELAY : AUTO_CHANGE_INTERVAL,
      )

      setState('autoTimer', id)
    }
  }

  const displayedInputValue = createMemo(() => {
    let _value: string
    const inputValue = state.inputValue
    const userTyping = state.isUserTyping
    if (userTyping) {
      _value = props.parser ? `${props.parser(inputValue)}` : inputValue
    } else if (isNumber(mergedPrecision())) {
      _value = realValue().toString({ safe: true, precision: mergedPrecision() })
    } else if (realValue().isInvalid) {
      _value = ''
    } else {
      _value = realValue().toString()
    }

    return props.formatter ? props.formatter(_value, { userTyping, input: inputValue }) : _value
  })

  const updateSelectionRangePosition = useSelectionRange(displayedInputValue, refInput)

  const getControlButtonEventsHandlers = (method: StepMethods) => {
    if (props.readOnly) {
      return {}
    }

    return {
      onMouseDown: (e: any) => handleArrowKey(e, method, true),
    }
  }

  const shouldRenderButton = () => !props.hideControl && props.mode === 'button'
  const shouldRenderLayer = () => !props.hideControl && !props.readOnly && props.mode === 'embed'

  const StepButton = (options: { method: StepMethods; icon: JSXElement }) => {
    const maxDecimal = getDecimal(props.max)
    const minDecimal = getDecimal(props.min)
    const isStepButtonValid =
      !props.disabled &&
      (realValue().isInvalid ||
        (options.method === 'plus'
          ? maxDecimal.isInvalid || realValue().less(maxDecimal)
          : minDecimal.isInvalid || minDecimal.less(realValue())))

    return (
      <div
        class={cs(`${prefixCls}-step-button`, {
          [`${prefixCls}-step-button-disabled`]: !isStepButtonValid,
        })}
        onMouseLeave={stop}
        onMouseUp={stop}
        {...(isStepButtonValid ? getControlButtonEventsHandlers(options.method) : {})}
      >
        {options.icon}
      </div>
    )
  }

  return (
    <Input
      _ignorePropsFromGlobal
      role="spinbutton"
      aria-valuemax={props.max}
      aria-valuemin={props.min}
      aria-valuenow={realValue().isEmpty ? undefined : realValue().toNumber()}
      {...otherProps}
      onInput={(rawText, event) => {
        setState('isUserTyping', true)
        rawText = rawText.trim().replace(/。/g, '.')
        const parsedValue = props.parser ? props.parser(rawText) : rawText

        if (isNumber(+parsedValue) || parsedValue === '-' || !parsedValue || parsedValue === '.') {
          setState('inputValue', rawText)

          setValue(getLegalValue(getDecimal(parsedValue)))
          updateSelectionRangePosition(event)
        }
      }}
      onKeyDown={e => {
        e.stopPropagation()

        const key = e.key
        if (key === ArrowDown.key) {
          handleArrowKey(e, 'minus')
        } else if (key === ArrowUp.key) {
          handleArrowKey(e, 'plus')
        }

        stop()
        props.onKeyDown?.(e as any)
      }}
      onFocus={e => {
        // Both tab and button click trigger focus event. This can be used to determine whether user has taken operations
        setState({ hasOperateSincePropValueChanged: true, inputValue: refInput.value })

        isFunction(props.onFocus) && props.onFocus?.(e)
      }}
      onBlur={e => {
        setValue(getLegalValue(realValue()))

        setState('isUserTyping', false)
        isFunction(props.onBlur) && props.onBlur(e)
      }}
      style={props.style}
      class={cs(
        prefixCls,
        `${prefixCls}-mode-${props.mode}`,
        `${prefixCls}-size-${props.size}`,
        {
          [`${prefixCls}-readonly`]: props.readOnly,
          [`${prefixCls}-illegal-value`]: !realValue().isEmpty && state.isOutOfRange,
        },
        props.class,
      )}
      ref={el => {
        refInput = el
      }}
      size={props.size}
      error={props.error}
      disabled={props.disabled}
      readOnly={props.readOnly}
      value={displayedInputValue()}
      placeholder={props.placeholder}
      prefix={
        <Show when={props.prefix}>
          <div class={`${prefixCls}-prefix`}>{props.prefix}</div>
        </Show>
      }
      suffix={
        <>
          <Show when={shouldRenderLayer()}>
            <div class={`${prefixCls}-step-layer`}>
              <StepButton
                method="plus"
                icon={
                  <Show when={props.icons?.up} fallback={<IconUp />}>
                    {props.icons?.up}
                  </Show>
                }
              />
              <StepButton
                method="minus"
                icon={
                  <Show when={props.icons?.down} fallback={<IconDown />}>
                    {props.icons?.down}
                  </Show>
                }
              />
            </div>
          </Show>

          <Show when={props.suffix}>
            <div class={`${prefixCls}-suffix`}>{props.suffix}</div>
          </Show>
        </>
      }
      addBefore={
        <Show when={shouldRenderButton()}>
          <StepButton
            method="minus"
            icon={
              <Show when={props.icons?.minus} fallback={<IconMinus />}>
                {props.icons?.minus}
              </Show>
            }
          />
        </Show>
      }
      addAfter={
        <Show when={shouldRenderButton()}>
          <StepButton
            method="plus"
            icon={
              <Show when={props.icons?.plus} fallback={<IconPlus />}>
                {props.icons?.plus}
              </Show>
            }
          />
        </Show>
      }
    />
  )
}

InputNumber.displayName = 'InputNumber'

export default InputNumber

export { type InputNumberProps }
