import { Show, createEffect, createMemo, createSignal, mergeProps, onCleanup } from 'solid-js'
import cs from '../../utils/classNames'
import { getNow, getRealTime } from '../../utils/dayjs'
import { useConfigContext } from '../config-provider'
import type { CountdownProps } from './interface'
import { getDateString } from './util'

function Countdown(baseProps: CountdownProps) {
  const ctx = useConfigContext()
  const prefixCls = ctx.getPrefixCls?.('statistic')

  const props = mergeProps({ format: 'HH:mm:ss', start: true }, baseProps)

  //intial times
  const now = getRealTime(props.now, props.format)
  const time = getRealTime(props.value, props.format)
  const [valueDiff, setValueDiff] = createSignal(time.diff(now, 'millisecond'))

  const [getDisplayedValue, setDisplayedValue] = createSignal(
    getDateString(Math.max(valueDiff(), 0), props.format),
  )

  let timerRef: number | null

  const stopTimer = () => {
    if (timerRef) {
      clearInterval(timerRef)
      timerRef = null
    }
  }

  const startTimer = () => {
    timerRef = window.setInterval(() => {
      const time = getRealTime(props.value, props.format)

      const _valueDiff = time.diff(getNow())
      const _value = time.diff(getNow(), 'millisecond')
      if (_value <= 0) {
        stopTimer()
        props.onFinish?.()
      }

      const valueShow = getDateString(Math.max(_value, 0), props.format as string)
      setDisplayedValue(valueShow)
      setValueDiff(_valueDiff)
    }, 1000 / 30)
  }

  createEffect(() => {
    if (!timerRef && props.start) {
      const time = getRealTime(props.value, props.format)
      if (time.valueOf() >= Date.now()) {
        startTimer()
      }
    }
  })

  onCleanup(() => {
    stopTimer()
  })

  const valueText = createMemo(() => {
    const displayedValue = getDisplayedValue()
    return props.renderFormat?.(valueDiff(), displayedValue) ?? displayedValue
  })

  return (
    <div
      ref={props.ref}
      class={cs(`${prefixCls}`, `${prefixCls}-countdown`, props.class)}
      style={props.style}
    >
      <Show when={'title' in props}>
        <div class={`${prefixCls}-title`}>{props.title}</div>
      </Show>

      <div class={`${prefixCls}-content`}>
        <div class={`${prefixCls}-value`} style={props.valueStyle}>
          {valueText()}
        </div>
      </div>
    </div>
  )
}

Countdown.displayName = 'StatisticCountdown'

export default Countdown

export type { CountdownProps }
