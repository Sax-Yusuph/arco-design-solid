import { JSX } from 'solid-js'

/**
 * @title Skeleton
 */
export interface SkeletonProps {
  ref?: HTMLDivElement | ((el: HTMLDivElement) => void)
  style?: JSX.CSSProperties | string
  class?: string
  /**
   * @zh 是否显示动画效果
   * @en Whether to show animation
   */
  animation?: boolean
  /**
   * @zh 是否显示子组件。为 `true` 时候显示占位符
   * @en Whether to show subcomponents. Set `true` to show placeholder
   * @defaultValue true
   */
  loading?: boolean
  /**
   * @zh 是否显示图片占位
   * @en Whether to show the picture placeholder
   */
  image?: SkeletonImageProps | boolean
  /**
   * @zh 是否显示文本占位
   * @en Whether to show text placeholder
   * @defaultValue true
   */
  text?: SkeletonTextProps | boolean
}

export interface SkeletonImageProps {
  style?: JSX.CSSProperties | string
  class?: string
  /** 图片形状 */
  shape?: 'circle' | 'square'
  /** 图片尺寸 */
  size?: 'small' | 'default' | 'large'
  /** 图片位置 */
  position?: 'left' | 'right'
  prefixCls?: string
}

export interface SkeletonTextProps {
  style?: JSX.CSSProperties | string
  class?: string
  /** 文本行数 */
  rows?: number
  /** 文本行宽度 */
  width?: number | string | (string | number)[]
  prefixCls?: string
}
