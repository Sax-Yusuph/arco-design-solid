import isEqualWith from 'lodash/isEqualWith'
import { createComputed } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import { isExist } from '../../utils/is'
import { Backspace } from '../../utils/keycode'
import { syncValues } from '../../utils/store'
import type { VerificationCodeOptions, VerificationCodeReturnType } from './interface'

// 默认长度
const defaultLength = 6

export default function useVerificationCode<T extends VerificationCodeOptions>(
  props: T,
): VerificationCodeReturnType {
  const [nodeList, setInputList] = createStore<HTMLInputElement[]>([])

  const [getFullValue, setValue] = syncValues(props, ['value', 'defaultValue'])

  const length = props.length && +props.length > 0 ? +props.length : defaultLength

  const [filledValues, setFilledValues] = createStore<string[]>([])

  const focusFirstEmptyInput = () => {
    const index = filledValues.findIndex(x => !x)

    if (index > -1) {
      const realIndex = Math.min(index, nodeList.length - 1)

      nodeList[realIndex]?.focus?.()
    }
  }

  createComputed(() => {
    const values = getFullValue() ? String(getFullValue()).split('') : []

    const arr = new Array(length).fill('')

    const newValues = arr.map((_, index) => {
      return isExist(values[index]) ? String(values[index]) : ''
    })

    setFilledValues(reconcile(newValues))
    focusFirstEmptyInput()
  })

  // createEffect(() => {
  //   const ll = getFilledValue()
  // })

  const tryUpdateValue = (newVal?: string) => {
    if (!isEqualWith(newVal, getFullValue())) {
      setValue(newVal)

      if (newVal) {
        props.onChange?.(newVal)

        if (newVal.length === length) {
          props.onFinish?.(newVal)
        }
      }
    }
  }

  const handlePaste = (e: ClipboardEvent, index: number) => {
    e.preventDefault()
    const clipboardData = e.clipboardData
    const text = clipboardData?.getData('text')

    if (text) {
      const newValues = filledValues.slice(0, index).concat(text.split('')).join('')
      tryUpdateValue(newValues)
    }
  }

  return [
    getFullValue,
    filledValues,
    {
      setValue: tryUpdateValue,
      getInputProps: index => {
        return {
          onClick: e => {
            e.preventDefault()
            if (!filledValues[index]) {
              focusFirstEmptyInput()
            }
          },
          onKeyDown: e => {
            const keyCode = e.keyCode || e.which
            if (keyCode === Backspace.code) {
              if (filledValues[index + 1]) {
                e.preventDefault()
                // 避免后面的数移位
                return
              }

              let _index = index
              if (!filledValues[index]) {
                _index -= 1
              }

              const newVal = [...filledValues]
              newVal[_index] = ''
              tryUpdateValue(newVal.join(''))
            }
          },
          onInput: v => {
            const indexVal = String(filledValues[index])
            const char = v?.trim() || ''
            const newValues = [...filledValues]
            newValues[index] = char.replace(indexVal, '').split('').pop() || ''

            tryUpdateValue(newValues.join(''))
          },
          onPaste: (e: ClipboardEvent) => {
            handlePaste(e, index)
          },
        }
      },
      setInputList,
    },
  ] as const
}
