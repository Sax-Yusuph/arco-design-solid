import { Accessor, JSX, JSXElement } from 'solid-js'
import { SetStoreFunction } from 'solid-js/store'
import { InputProps } from '../input'

/**
 * @title VerificationCode
 * @zh `2.55.0` 支持
 * @en 2.55.0
 */
export interface VerificationCodeProps {
  style?: JSX.CSSProperties | string
  className?: string
  /**
   * @zh 默认值
   * @en The initial input content
   */
  defaultValue?: string
  /**
   * @zh 验证码输入框的值，受控模式
   * @en The input content value
   */
  value?: string
  /**
   * @zh 验证码的长度，根据长度渲染对应个数的输入框
   * @en The length of the verification code, rendering the corresponding number of input boxes according to the length
   * @defaultValue 6
   */
  length?: number
  /**
   * @zh 尺寸
   * @en Size
   */
  size?: InputProps['size']
  /**
   * @zh 是否是密码模式
   * @en Password mode
   */
  masked?: boolean
  /**
   * @zh 禁用
   * @en disabled
   */
  disabled?: boolean
  /**
   * @zh 只读
   * @en readOnly
   */
  readOnly?: boolean
  /**
   * @zh 状态
   * @en Status
   */
  status?: 'error'
  /**
   * @zh 校验函数，用户输入值改变时触发
   * @en Verification function, triggered when the user input value changes
   *
   */
  validate?: (data: { inputValue: string; value: string; index: number }) => boolean | string
  /**
   * @zh 分隔符。可在不同索引的输入框后自定义渲染分隔符
   * @en Separator. Customizable rendering separators after input boxes with different indexes
   */
  separator?: (data: { index: number; character: string }) => JSXElement
  /**
   * @zh 输入值改变时触发的回调
   * @en Callback triggered when input value changes
   */
  onChange?: (value: string) => void
  /**
   * @zh 输入框都被填充后触发的回调
   * @en A callback triggered after the input boxes are filled in
   */
  onFinish?: (value: string) => void
}

/**
 * @title VerificationCodeOptions
 *
 */
export interface VerificationCodeOptions {
  /**
   * @zh 长度
   * @en length
   */
  length?: number
  /**
   * @zh 默认值
   * @en The initial input content
   */
  defaultValue?: string
  /**
   * @zh value
   * @en value
   */
  value?: string
  /**
   * @zh onChange
   * @en onChange
   */
  onChange?: (value: string) => void
  /**
   * @zh onFinish
   * @en onFinish
   */
  onFinish?: (value: string) => void
}

/**
 * @title VerificationCodeReturnType
 *
 */
export type VerificationCodeReturnType = [
  value: Accessor<VerificationCodeOptions['value']>,
  filledValues: VerificationCodeOptions['value'][],
  actions: {
    /**
     * @zh filledValue
     */

    /**
     * @zh 更新内部 value
     */
    setValue: (v: VerificationCodeOptions['value']) => void
    /**
     * @zh 获取 input 属性，附加到 input
     */
    getInputProps: (index: number) => {
      onClick: (e: MouseEvent) => void
      onKeyDown: (e: KeyboardEvent) => void
      onInput: (v: string) => void
      onPaste: (e: ClipboardEvent) => void
    }

    setInputList: SetStoreFunction<HTMLInputElement[]>
  },
]
