// import { ReactNode } from 'react';
// import { Omit } from '../_util/type';
// import { PaginationProps } from '../Pagination/interface';
import { AffixProps } from '../affix/interface';
import { AlertProps } from '../alert/interface';
// import { AnchorLinkProps, AnchorProps } from '../Anchor/interface';
// import { AutoCompleteProps } from '../AutoComplete/interface';
import { Locale } from '../../locale/interface';
import { AvatarGroupProps, AvatarProps } from '../avatar';
import { BackTopProps } from '../backTop/interface';
import { BadgeProps } from '../badge/interface';
// import { BreadcrumbProps } from '../Breadcrumb/interface';
import { ButtonProps } from '../button/interface';
// import { CalendarProps } from '../Calendar/interface';
import { CardProps } from '../card/interface';
// import { CarouselProps } from '../Carousel/interface';
// import { CascaderProps } from '../Cascader/interface';
import { CheckboxProps } from '../checkbox/interface';
// import { CollapseProps } from '../Collapse/interface';
// import { CommentProps } from '../Comment/interface';
// import { PickerProps as DatePickerCommonProps } from '../DatePicker/interface';
// import { DescriptionsProps } from '../Descriptions/interface';
import { DividerProps } from '../divider/interface';
// import { DrawerProps } from '../Drawer/interface';
// import { DropdownProps, DropdownButtonProps } from '../Dropdown/interface';
import { EmptyProps } from '../empty/interface';
// import { FormProps } from '../Form/interface';
import { ColProps, GridItemProps, GridProps, RowProps } from '../grid/interface';
// import { ImageProps } from '../Image/interface';
import { InputNumberProps } from '../input-number/interface';
import { InputTagProps } from '../Input-tag/interface';
import { InputProps } from '../input/interface';
// import { LayoutProps } from '../Layout/interface';
import { LinkProps } from '../link/interface';
// import { ListItemProps, ListProps } from '../List/interface';
// import { MentionsProps } from '../Mentions/interface';
// import { MenuProps } from '../Menu/interface';
// import { ModalProps } from '../Modal/interface';
// import { PageHeaderProps } from '../PageHeader/interface';
// import { PopconfirmProps } from '../Popconfirm/interface';
// import { PopoverProps } from '../Popover/interface';
// import { ProgressProps } from '../Progress/interface';
import { RadioGroupProps, RadioProps } from '../radio/interface';
import { RateProps } from '../rate/interface';
// import { ResizeBoxProps } from '../ResizeBox/interface';
import { ResultProps } from '../result/interface';
// import { SelectProps } from '../Select/interface';
import { SkeletonProps } from '../skeleton/interface';
// import { SliderProps } from '../Slider/interface';
import { SpaceProps } from '../space/interface';
import { SpinProps } from '../spin/interface';
import { StatisticProps } from '../statistic/interface';
import { StepsProps } from '../steps/interface';
import { SwitchProps } from '../switch/interface';
// import { TableProps } from '../Table/interface';
// import { TabsProps } from '../Tabs/interface';
// import { TimelineProps, TimelineItemProps } from '../Timeline/interface';
// import { PickerProps as TimePickerCommonProps } from '../TimePicker/interface';
// import { TooltipProps } from '../Tooltip/interface';
// import { TransferProps } from '../Transfer/interface';
// import { TreeProps } from '../Tree/interface';
// import { TreeSelectProps } from '../TreeSelect/interface';
// import { TriggerProps } from '../Trigger/interface';
// // import { TypographyProps } from '../Typography/interface';
// import { UploadProps } from '../Upload/interface';
import { VerificationCodeProps } from '../verification-code/interface';
// import { WatermarkProps } from '../Watermark/interface';

import { JSXElement } from 'solid-js';

import { TagProps } from '../tag';
// import { AffixProps } from '../Affix'

export type ThemeConfig = Record<string, any>

export type ComponentConfig = {
  Affix?: AffixProps
  Alert?: AlertProps
  // AutoComplete?: AutoCompleteProps;
  Avatar?: AvatarProps
  'Avatar.Group'?: AvatarGroupProps
  // Anchor?: AnchorProps;
  // 'Anchor.Link'?: AnchorLinkProps;
  BackTop?: BackTopProps;
  Badge?: BadgeProps;
  // Breadcrumb?: BreadcrumbProps;
  Button?: ButtonProps
  // Calendar?: CalendarProps;
  Card?: CardProps
  // Carousel?: CarouselProps;
  // Cascader?: CascaderProps;
  Checkbox?: CheckboxProps
  // Collapse?: CollapseProps;
  // Comment?: CommentProps;
  // DatePicker?: Omit<
  //   DatePickerCommonProps,
  //   | 'placeholder'
  //   | 'onChange'
  //   | 'onSelect'
  //   | 'onOk'
  //   | 'defaultPickerValue'
  //   | 'pickerValue'
  //   | 'onPickerValueChange'
  // >;
  // Descriptions?: DescriptionsProps;
  Divider?: DividerProps
  // Drawer?: DrawerProps;
  // Dropdown?: DropdownProps;
  // 'Dropdown.Button'?: DropdownButtonProps;
  Empty?: EmptyProps
  // Form?: FormProps;
  'Grid.Row'?: RowProps
  'Grid.Col'?: ColProps
  Grid?: GridProps
  'Grid.GridItem'?: GridItemProps
  // Image?: ImageProps;
  Input?: InputProps
  InputNumber?: InputNumberProps;
  VerificationCode?: VerificationCodeProps;
  // Watermark?: WatermarkProps;
  InputTag?: InputTagProps;
  // Layout?: LayoutProps
  Link?: LinkProps
  // List?: ListProps;
  // 'List.Item'?: ListItemProps;
  // Mentions?: MentionsProps;
  // Menu?: MenuProps;
  // Modal?: ModalProps;
  // PageHeader?: PageHeaderProps;
  // Pagination?: PaginationProps;
  // Popconfirm?: PopconfirmProps;
  // Popover?: PopoverProps;
  // Progress?: ProgressProps;
  Radio?: RadioProps;
  'Radio.Group'?: RadioGroupProps;
  Rate?: RateProps;
  // ResizeBox?: ResizeBoxProps
  Result?: ResultProps;
  // Select?: SelectProps;
  Skeleton?: SkeletonProps;
  // Slider?: SliderProps;
  Space?: SpaceProps
  Spin?: SpinProps;
  Statistic?: StatisticProps;
  Steps?: StepsProps;
  Switch?: SwitchProps
  // Table?: TableProps;
  // Tabs?: TabsProps;
  // TreeProps?: TreeProps;
  // TriggerProps?: TriggerProps;
  Tag?: TagProps
  // Timeline?: TimelineProps;
  // 'Timeline.Item'?: TimelineItemProps;
  // TimePicker?: TimePickerCommonProps;
  // Tooltip?: TooltipProps;
  // Transfer?: TransferProps;
  // Tree?: TreeProps;
  // TreeSelect?: TreeSelectProps;
  // Trigger?: TriggerProps;
  // Upload?: UploadProps;
}

/**
 * @title ConfigProvider
 */
export interface ConfigProviderProps {
  /**
   * @zh 当按钮中是两个汉字时，自动在两个汉字中添加一个空格。
   * @en When there are two Chinese characters in the button, a space is automatically added between two Chinese characters.
   * @version 2.3.0
   */
  autoInsertSpaceInButton?: boolean
  /**
   * @zh 用于全局配置所有组件的默认参数
   * @en Default parameters for global configuration of all components
   * @version 2.23.0
   */
  componentConfig?: ComponentConfig
  /**
   * @zh 设置语言包
   * @en Language package setting
   */
  locale?: Locale
  /**
   * @zh 主题配置
   * @en Theme Configuration
   */
  theme?: ThemeConfig
  /**
   * @zh 配置组件的默认尺寸，只会对支持`size`属性的组件生效。
   * @en Configure the default size of the component, which will only take effect for components that support the `size` property.
   * @defaultValue default
   */
  size?: 'mini' | 'small' | 'default' | 'large'
  /**
   * @zh 全局组件类名前缀
   * @en Global ClassName prefix
   * @defaultValue arco
   */
  prefixCls?: string
  getPrefixCls?: (componentName: string, customPrefix?: string) => string
  /**
   * @zh 全局弹出框挂载的父级节点。
   * @en The parent node of the global popup.
   * @defaultValue () => document.body
   */
  getPopupContainer?: (node: HTMLElement) => Element
  /**
   * @zh 全局的加载中图标，作用于所有组件。
   * @en Global loading icon.
   */
  loadingElement?: JSXElement
  /**
   * @zh Table 全局的分页配置。
   * @en Table Global pagination configuration.
   * @version 2.6.0
   */
  // TODO
  // tablePagination?: PaginationProps
  /**
   * @zh 全局配置组件内的空组件。
   * @en Empty component in component.
   * @version 2.10.0
   */
  renderEmpty?: (componentName?: string) => JSXElement
  /**
   * @zh 全局配置弹出框的 `focusLock`，作用于 `Modal` `Drawer` 组件。
   * @en global `focusLock`, affects component `Modal` `Drawer`.
   * @defaultValue { modal: { autoFocus: true }, drawer: { autoFocus: true }}
   * @version 2.13.0
   */
  focusLock?: {
    modal?: boolean | { autoFocus?: boolean }
    drawer?: boolean | { autoFocus?: boolean }
  }
  /**
   * @zh 视图的表现形式是从右开始向左结束。
   * @en View starts from the right and ends on the left.
   * @version 2.36.0
   */
  rtl?: boolean
  /**
   * @zh 是否全局设置所有 `Message` 和 `Notification` 的配置。如果用了 `useMessage` 的 hook 局部设置请设置为 false
   * @en Whether to update the configuration of all `Message` and `Notification` with one click. Set to false if using the hook locale of `useMessage`
   * @defaultValue true
   * @version 2.40.0
   */
  effectGlobalNotice?: boolean
  zIndex?: number
  children?: JSXElement
}
