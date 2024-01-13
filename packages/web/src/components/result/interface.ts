import { JSX, JSXElement } from 'solid-js'

export type ResultStatus = null | 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'

/**
 * @title Result
 */
export interface ResultProps {
  class?: string
  style?: JSX.CSSProperties
  /**
   * @zh 标题文字
   * @en The title
   */
  title?: JSXElement
  /**
   * @zh 子标题文字
   * @en The subTitle
   */
  subTitle?: JSXElement
  /**
   * @zh 不同状态，传入 null 时，需要通过 `icon` 属性设置图标，并且默认没有背景色以及图标颜色
   * @en The result status, if `null` the icon and the background color will not be displayed. [example](/react/en-US/components/result#custom-icon)
   * @defaultValue info
   */
  status?: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500' | null
  /**
   * @zh 自定义图标
   * @en Customize the icon
   */
  icon?: JSXElement
  /**
   * @zh 额外内容
   * @en The operating area
   */
  extra?: JSXElement
}
