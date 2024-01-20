import { JSX } from 'solid-js'

/**
 * @title Card
 */
export interface CardProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
  id?: string
  /**
   * @zh 是否有边框
   * @en Whether to render the border
   * @defaultValue true
   */
  bordered?: boolean
  /**
   * @zh 是否为加载中
   * @en Whether on loading state
   */
  loading?: boolean
  /**
   * @zh 是否可悬浮
   * @en Whether the card can be hovered
   */
  hoverable?: boolean
  /**
   * @zh 卡片尺寸
   * @en Size of the card
   * @defaultValue default
   */
  size?: 'default' | 'small'
  /**
   * @zh 卡片标题
   * @en Title of the card
   */
  title?: string | JSX.Element
  /**
   * @zh 卡片右上角的操作区域
   * @en Content to render in the top-right corner of the card
   */
  extra?: string | JSX.Element
  /**
   * @zh 卡片封面
   * @en Cover of card
   */
  cover?: JSX.Element
  /**
   * @zh 卡片底部的操作组
   * @en The action list which shows at the bottom of the card
   */
  actions?: JSX.ArrayElement
  /**
   * @zh 自定义标题区域样式
   * @en The additional css style to apply to card head
   */
  headerStyle?: JSX.CSSProperties
  /**
   * @zh 内容区域自定义样式
   * @en The additional css style to apply to card content
   */
  bodyStyle?: JSX.CSSProperties
}

/**
 * @title Card.Meta
 */
export interface CardMetaProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
  style?: JSX.CSSProperties
  class?: string
  actionList?: JSX.ArrayElement[]
  /**
   * @zh 头像
   * @en Avatar of the card
   */
  avatar?: JSX.Element
  /**
   * @zh 标题
   * @en Title of the card
   */
  title?: string | JSX.Element
  /**
   * @zh 描述
   * @en Description of the card
   */
  description?: string | JSX.Element
}

/**
 * @title Card.Grid
 */
export interface CardGridProps {
  ref?: HTMLDivElement
  children?: JSX.Element
  style?: JSX.CSSProperties
  class?: string
  /**
   * @zh 是否可以悬浮
   * @en Whether can be hovered
   */
  hoverable?: boolean
}
