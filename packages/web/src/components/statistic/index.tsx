//@ts-ignore
import BTween from 'b-tween'
import dayjs, { Dayjs } from 'dayjs'
import {
	JSXElement,
	Show,
	createEffect,
	createMemo,
	createSignal,
	mergeProps,
	onCleanup,
	splitProps,
	untrack
} from 'solid-js'
import cs from '../../utils/classNames'
import { isFunction, isNumber } from '../../utils/is'
import { useHandle } from '../../utils/use-handle'
import { useConfigContext } from '../config-provider'
import Skeleton from '../skeleton'
import Countdown from './countdown'
import type { StatisticHandle, StatisticProps } from './interface'

const EleValueWithPrefix = (props: {
  prefixCls?: string
  prefix?: string | JSXElement
  value: JSXElement
}) => (
  <>
    <Show when={props.prefix !== null && props.prefix !== undefined}>
      <span class={`${props.prefixCls}-value-prefix`}>{props.prefix}</span>
    </Show>

    {props.value}
  </>
)

const defaultProps: StatisticProps = {
  countFrom: 0,
  countDuration: 2000,
}

function Statistic(baseProps: StatisticProps) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(baseProps, defaultProps, ctx.componentConfig?.Statistic)

  let tween: BTween

  const [props, restProps] = splitProps(mergedProps, [
    'class',
    'style',
    'title',
    'extra',
    'groupSeparator',
    'precision',
    'prefix',
    'suffix',
    'format',
    'renderFormat',
    'styleValue',
    'styleDecimal',
    'loading',
    'value',
    'countUp',
    'countFrom',
    'countDuration',
    'ref',
  ])

  const [getValue, setValue] = createSignal<string | number | Dayjs | undefined>(
    'value' in props ? props.value : undefined,
  )

  const prefixCls = ctx.getPrefixCls?.('statistic')

  const countUp = (from = props.countFrom, to = props.value) => {
    const { countDuration } = props
    if (from !== to) {
      tween = new BTween({
        from: {
          value: from,
        },
        to: {
          value: to,
        },
        duration: countDuration,
        easing: 'quartOut',
        onUpdate: (keys: any) => {
          setValue(keys.value.toFixed(props.precision))
        },
        onFinish: () => {
          setValue(to)
        },
      })
      tween.start()
    }
  }

  createEffect(() => {
    if (props.countUp) {
      const v = untrack(() => getValue())

      if (tween) {
        tween.stop()
      }

      if (v !== props.value) {
        countUp(Number(v), props.value)
      } else {
        countUp()
      }
    } else {
      setValue(props.value)
    }
  })

  onCleanup(() => {
    if (tween) {
      tween.stop()
      tween = null
    }
  })

  useHandle(props, { countUp })

  const formattedNumber = createMemo(() => {
    const signalValue = getValue()
    let _value = signalValue

    if (props.format) {
      _value = dayjs(signalValue).format(props.format)
    }

    if (isNumber(props.precision) && props.precision >= 0) {
      _value = Number(signalValue).toFixed(props.precision)
    }

    let int = String(_value).split('.')[0]
    const decimal = String(_value).split('.')[1]

    if (props.groupSeparator && isNumber(Number(getValue()))) {
      int = Number(int).toLocaleString('en-US')
    }

    return {
      int,
      decimal,
    }
  })

  const valueFormatted = isFunction(props.renderFormat)
    ? props.renderFormat
    : (_: any, formattedValue: string) => formattedValue

  const isNumberValue = createMemo(() => isNumber(Number(getValue())))

  const format = createMemo(() => {
    return (isNumberValue() ? formattedNumber().int : getValue()) as string
  })

  return (
    <div
      class={cs(`${prefixCls}`, { [`${prefixCls}-rtl`]: ctx.rtl }, props.class)}
      style={props.style}
      {...restProps}
    >
      <Show when={props.title}>
        <div class={`${prefixCls}-title`}>{props.title}</div>
      </Show>

      <div class={`${prefixCls}-content`}>
        <Skeleton animation loading={!!props.loading} text={{ rows: 1, width: '100%' }}>
          <div class={`${prefixCls}-value`} style={props.styleValue}>
            <Show
              when={isNumberValue()}
              fallback={
                <EleValueWithPrefix
                  prefix={props.prefix}
                  prefixCls={prefixCls}
                  value={valueFormatted(getValue(), format())}
                />
              }
            >
              <span class={`${prefixCls}-value-int`}>
                <EleValueWithPrefix
                  prefix={props.prefix}
                  prefixCls={prefixCls}
                  value={valueFormatted(getValue(), format())}
                />
              </span>
            </Show>

            <Show when={formattedNumber().decimal !== undefined || props.suffix}>
              <span class={`${prefixCls}-value-decimal`} style={props.styleDecimal}>
                {isNumber(Number(getValue())) &&
                  formattedNumber().decimal !== undefined &&
                  `.${formattedNumber().decimal}`}

                <Show when={props.suffix !== null && props.suffix !== undefined}>
                  <span class={`${prefixCls}-value-suffix`}>{props.suffix}</span>
                </Show>
              </span>
            </Show>
          </div>
        </Skeleton>

        <Show when={props.extra}>
          <div class={`${prefixCls}-extra`}>{props.extra}</div>
        </Show>
      </div>
    </div>
  )
}

const StatisticComponent = Statistic as typeof Statistic & {
  Countdown: typeof Countdown
}

StatisticComponent.Countdown = Countdown

export default StatisticComponent

export type { StatisticHandle, StatisticProps }
