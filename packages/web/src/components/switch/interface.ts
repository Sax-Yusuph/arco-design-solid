import { JSX, JSXElement } from 'solid-js'

/**
 * @title Switch
 */
export interface SwitchProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean
  /**
   * @zh 点击开关的回调
   * @en Callback when click
   */
  onChange?: (value: boolean, event: Event) => void
  /**
   * @zh 开关的尺寸，有 `small` 和 `default` 可供选择。
   * @en The size of the switch
   */
  size?: 'small' | 'default'
  /**
   * @zh 三种样式类型
   * @en Three style types
   * @defaultValue circle
   */
  type?: 'circle' | 'round' | 'line'
  /**
   * @zh 开关打开时的文案，small 尺寸不生效。
   * @en The text when the switch is turned on, the small size does not work.
   */
  checkedText?: JSXElement
  /**
   * @zh 开关关闭时的文案，small 尺寸不生效。
   * @en The text when the switch is turned off, the small size does not work.
   */
  uncheckedText?: JSXElement
  /**
   * @zh 开关关闭时，按钮上显示的图标
   * @en The icon displayed on the button when the switch is off
   */
  uncheckedIcon?: JSXElement
  /**
   * @zh 开关打开时，按钮上显示的图标
   * @en The icon displayed on the button when the switch is turned on
   */
  checkedIcon?: JSXElement
  /**
   * @zh 默认是否选中
   * @en To set default checked
   */
  defaultChecked?: boolean
  /**
   * @zh 开关是否打开
   * @en To set checked
   */
  checked?: boolean
  /**
   * @zh 加载中状态
   * @en Loading state
   */
  loading?: boolean
  children?: JSXElement
}
