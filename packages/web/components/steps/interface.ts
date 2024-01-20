import { JSX, JSXElement } from 'solid-js'

/**
 * @title Steps
 */
export interface StepsProps extends Pick<JSX.HTMLAttributes<HTMLDivElement>, 'ref'> {
  style?: JSX.CSSProperties | string
  class?: string
  /**
   * @zh 节点样式类型
   * @en Type of step
   * @defaultValue default
   */
  type?: 'default' | 'arrow' | 'dot' | 'navigation'
  /**
   * @zh 步骤条的尺寸
   * @en To specify the size of the step bar
   * @defaultValue default
   */
  size?: 'default' | 'small'
  /**
   * @zh 显示方向
   * @en Direction of the step bar
   * @defaultValue horizontal
   */
  direction?: 'vertical' | 'horizontal'
  /**
   * @zh 标签描述文字放置的位置，默认 `horizontal` 水平放在图标右侧，可选 `vertical` 放在图标下方
   * @en Where to place description,the default `horizontal` is placed on the right side of the icon, optional `vertical` is placed below the icon
   * @defaultValue horizontal
   */
  labelPlacement?: 'horizontal' | 'vertical'
  /**
   * @zh 当前步数
   * @en Current step
   * @defaultValue 1
   */
  current?: number
  /**
   * @zh 当前步数的节点状态
   * @en Status of current step
   */
  status?: 'wait' | 'process' | 'finish' | 'error'
  /**
   * @zh 自定义步骤条节点 ，不支持箭头模式
   * @en Customize the step,arrow type is not supported
   */
  customDot?: (IconDot: JSXElement, stepConfig: CustomDotRecord) => JSXElement
  /**
   * @zh 点击步骤切换的回调，设置这个属性后，步骤条可点击切换。
   * @en Callback when click step, after setting this prop, the step bar will switch when clicked.
   */
  onChange?: (current: number, id: any) => void
  /**
   * @zh 无连接线模式
   * @en Hidden lines
   */
  lineless?: boolean
  children?: any
}

export type CustomDotRecord = {
  index: number
  status: string
  title: JSXElement
  description: JSXElement
}

/**
 * @title Steps.Step
 */
export interface StepProps extends Pick<JSX.HTMLAttributes<HTMLDivElement>, 'ref'> {
  /**
   * @zh 节点样式
   * @en The additional css style
   * @version 2.11.0
   */
  style?: JSX.CSSProperties | string
  /**
   * @zh 节点类名
   * @en The additiona
   * @version 2.11.0
   */
  class?: string
  prefixCls?: string
  index?: number
  current?: number
  direction?: 'horizontal' | 'vertical'
  nextStepError?: boolean
  icon?: JSXElement
  type?: 'default' | 'arrow' | 'dot' | 'navigation'
  customDot?: (IconDot: JSXElement, stepConfig: CustomDotRecord) => JSXElement
  labelPlacement?: 'horizontal' | 'vertical'
  lineless?: boolean
  /**
   * @zh 点击回调
   * @en Callback when item is clicked
   * @version `e` in `2.40.0`
   */
  onClick?: (index: number, id: any, e: any) => void
  onChange?: (index: number, id: any) => void
  /**
   * @zh 指定节点的 ID，将在 onChange 回调中作为参数。
   * @en Specify the ID of the node, which will be used as a parameter in callback onChange
   */
  id?: any
  /**
   * @zh 节点标题
   * @en Title of step
   */
  title?: string | JSXElement
  /**
   * @zh 节点描述
   * @en Description of step
   */
  description?: string | JSXElement
  /**
   * @zh 节点状态
   * @en Status of step
   */
  status?: 'wait' | 'process' | 'finish' | 'error'
  /**
   * @zh 当前步骤点击被禁用
   * @en Disable click event
   */
  disabled?: boolean
}
