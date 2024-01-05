import { JSX, JSXElement } from 'solid-js'

/**
 * @title Alert
 */
export interface AlertProps {
  style?: JSX.CSSProperties
  class?: string
  /**
   * @zh 自定义操作项
   * @en Custom action item
   */
  action?: JSXElement
  /**
   * @zh 是否可关闭
   * @en Whether Alert can be closed
   */
  closable?: boolean
  closeable?: boolean // typo
  /**
   * @zh 关闭的回调
   * @en Callback when Alert is closed
   */
  onClose?: (e: any) => void
  /**
   * @zh 关闭动画结束后执行的回调
   * @en Callback when Alert close animation is complete
   */
  afterClose?: () => void
  /**
   * @zh 警告的类型
   * @en Type of Alert
   * @defaultValue info
   */
  type?: 'info' | 'success' | 'warning' | 'error'
  /**
   * @zh 标题
   * @en Alert title
   */
  title?: JSXElement
  /**
   * @zh 内容
   * @en Alert content
   */
  content?: JSXElement
  /**
   * @zh 可以指定自定义图标，`showIcon` 为 `true` 时生效。
   * @en Custom icon, effective when `showIcon` is `true`
   */
  icon?: JSXElement
  /**
   * @zh 自定义关闭按钮
   * @en Custom close button
   */
  closeElement?: JSXElement
  /**
   * @zh 是否显示图标
   * @en Whether to show icon
   * @defaultValue true
   */
  showIcon?: boolean
  /**
   * @zh 是否用作顶部公告
   * @en Whether to show as banner
   */
  banner?: boolean
}
