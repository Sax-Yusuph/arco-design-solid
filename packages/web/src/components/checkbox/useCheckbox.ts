import { createStore, reconcile } from 'solid-js/store'
import { toValue } from 'solidjs-use'
import { isArray } from '../../utils/is'

export type ResultType<T> = [
  /** 当前选中项 */
  selected: T[],
  actions: {
    /** 只选中传入参数的选项 */
    setSelected: (value: T[]) => void
    /** 设置选项的选中状态 */
    setValueSelected: (value: T | T[], selected?: boolean) => void
    /** 选中全部 */
    selectAll: () => void
    /** 取消全部选中 */
    unSelectAll: () => void
    /** 是否选项被选中 */
    isSelected: (value: T) => boolean
    /** 切换选项选中状态。不传参数时，会切换所有选项的选中状态 */
    toggle: (value?: T | T[]) => void
    /** 是否全部选项被选中 */
    isAllSelected: () => boolean
    /** 是否只有部分选项选中 */
    isPartialSelected: () => boolean
  },
]

const useCheckbox = <T>(values: T[], defaultSelected?: T[]): ResultType<T> => {
  const [selected, setSelected] = createStore<T[]>(defaultSelected || [])

  const isSelected = (value: T): boolean => {
    return toValue(selected).indexOf(value) > -1
  }


  const setValueSelected = (value: T | T[], selectStatus?: boolean) => {
    const list = isArray(value) ? value : [value]
    const s = toValue(selected)
    let newSelected

    if (selectStatus) {
      newSelected = [...s, ...list]
    } else {
      newSelected = s.filter(x => list.indexOf(x) === -1)
    }

    setSelected(reconcile(Array.from(new Set(newSelected))))
  }

  const selectAll = () => {
    setSelected(reconcile(values))
  }

  const unSelectAll = () => {
    setSelected(reconcile([]))
  }

  const toggle = (value: T | T[] = values) => {
    const list = isArray(value) ? value : [value]

    const newSelected = toValue(selected)

    list.forEach(x => {
      const index = newSelected.indexOf(x)
      if (index > -1) {
        newSelected.splice(index, 1)
      } else {
        newSelected.push(x)
      }
    })

    setSelected(reconcile(newSelected))
  }

  const isAllSelected = (): boolean => {
    return values.every(x => isSelected(x))
  }

  const isPartialSelected = (): boolean => {
    return values.some(x => isSelected(x)) && !isAllSelected()
  }

  return [
    selected,
    {
      setSelected,
      setValueSelected,
      selectAll,
      unSelectAll,
      toggle,
      isSelected,
      isAllSelected,
      isPartialSelected,
    },
  ]
}

export default useCheckbox
