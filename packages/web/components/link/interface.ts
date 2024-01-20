import { JSX } from 'solid-js'

/**
 * @title Link
 */
export interface LinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * @zh 显示图标，设置为 `true` 时展示默认图标。
   * @en Custom Icon, Display the default icon when set to `true`.
   */
  icon?: JSX.Element | boolean
  /**
   * @zh 不同状态
   * @en The status of `Link`
   */
  status?: 'error' | 'success' | 'warning'
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean
  /**
   * @zh 悬浮状态是否有底色
   * @en Whether to hide background when hover
   * @defaultValue true
   * @version 2.23.0
   */
  hoverable?: boolean
}
