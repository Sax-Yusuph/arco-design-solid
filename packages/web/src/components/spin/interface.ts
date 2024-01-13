import { JSX, JSXElement } from 'solid-js'

/**
 * @title Spin
 */
export interface SpinProps {
  style?: JSX.CSSProperties | string
  class?: string
  children?: JSXElement
  /**
   * @zh 是否为加载状态（仅在 `Spin` 有子节点时生效）
   * @en Whether is loading status (Only works when `Spin` has children))
   */
  loading?: boolean
  /**
   * @zh 加载动画的尺寸
   * @en The size of loading icon
   */
  size?: number
  /**
   * @zh 自定义图标，会自动旋转。
   * @en Customize icon which will be rotated automatically.
   */
  icon?: JSXElement
  /**
   * @zh 自定义元素，非图标，不附带旋转效果。可用于设置为 gif 图片等。
   * @en Customize element which won't be rotated automatically, such as image/gif.
   */
  element?: JSXElement
  /**
   * @zh 加载的文案
   * @en Customize description content when Spin has children
   */
  tip?: string | JSXElement
  /**
   * @zh 延迟显示加载的时间 (ms)
   * @en Specifies a delay(ms) for loading state
   */
  delay?: number
  /**
   * @zh 是否使用点类型的动画
   * @en Whether to use dot type animation
   */
  dot?: boolean

  /**
   * @zh 是否为块级元素
   * @en Whether it is a block-level element
   * @version 2.29.0
   */
  block?: boolean
}
