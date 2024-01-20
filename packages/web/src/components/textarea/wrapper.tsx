import { JSXElement, Match, ParentProps, Show, Switch, children } from "solid-js"
import { JSX } from "solid-js/jsx-runtime"
import cs from "../../utils/classNames"
import IconHover from "../_class/icon-hover"
import { IconClose } from "../icon"

type WrapperProps = ParentProps<{
  withWrapper?: boolean
  showWordLimit: boolean
  words: {
    left: number
    right: number
  }
  right?: number
  error?: boolean
  prefixCls?: string
  wrapperStyle?: JSX.CSSProperties | string
  rtl?: boolean
  allowClear?: boolean
  clearIcon: JSXElement
  showClearIcon?: boolean
  handleClearClick: (e: MouseEvent) => void
}>

export const WrapperElement = (props: WrapperProps) => {
  const inputSlot = children(() => props.children)
  return (
    <Show when={props.withWrapper} fallback={inputSlot()}>
      <div
        class={cs(`${props.prefixCls}-wrapper`, {
          [`${props.prefixCls}-clear-wrapper`]: props.allowClear,
          [`${props.prefixCls}-wrapper-rtl`]: props.rtl,
        })}
        style={props.wrapperStyle}
      >
        {inputSlot()}

        <Show when={props.showClearIcon}>
          <Switch
            fallback={
              <IconHover class={`${props.prefixCls}-clear-icon`}>
                <IconClose
                  onClick={props.handleClearClick}
                  // keep focus status
                  onMouseDown={e => {
                    e.preventDefault()
                  }}
                />
              </IconHover>
            }
          >
            <Match when={props.clearIcon !== undefined}>
              <span
                class={`${props.prefixCls}-clear-icon`}
                onClick={props.handleClearClick}
                onMouseDown={e => {
                  e.preventDefault()
                }}
              >
                {props.clearIcon}
              </span>
            </Match>
          </Switch>
        </Show>

        <Show when={props.showWordLimit}>
          <span
            class={cs(`${props.prefixCls}-word-limit`, {
              [`${props.prefixCls}-word-limit-error`]: props.error,
            })}
          >
            {props.words.left}/{props.words.right}
          </span>
        </Show>
      </div>
    </Show>
  )
}
