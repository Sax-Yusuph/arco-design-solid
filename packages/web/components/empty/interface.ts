import { JSX, JSXElement } from 'solid-js'
/**
 * @title Empty
 */
export interface EmptyProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * @zh 显示文案
   * @en Description of empty content
   */
  description?: JSXElement
  /**
   * @zh 自定义显示图案
   * @en Custom icon
   */
  icon?: JSXElement
  /**
   * @zh 将图标替换为图片
   * @en Replace icon with picture
   */
  imgSrc?: string
}
