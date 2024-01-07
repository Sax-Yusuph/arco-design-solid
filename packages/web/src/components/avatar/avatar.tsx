import { Show, children, createEffect, createSignal, mergeProps, splitProps } from 'solid-js'
import { toCSSObject, toPx } from '../../utils/util'

import { isNumber, isObject } from '../../utils/is'
import { useConfigContext } from '../config-provider'
import { useAvatarGroupContext } from './context'
import { AvatarProps } from './interface'

const defaultProps: AvatarProps = {
  shape: 'circle',
  autoFixFontSize: true,
  triggerType: 'button',
}

const Avatar = (baseProps: AvatarProps) => {
  const ctx = useConfigContext()

  const prefixCls = ctx.getPrefixCls?.('avatar')!
  const avatarCtx = useAvatarGroupContext()

  const mergedProps = mergeProps(
    defaultProps,
    ctx.componentConfig?.Avatar,
    avatarCtx?.avatar,
    baseProps,
  )

  const [props, restProps] = splitProps(mergedProps, [
    'style',
    'class',
    'shape',
    'size',
    'children',
    'autoFixFontSize',
    'triggerIcon',
    'triggerIconStyle',
    'triggerType',
  ])

  let textRef!: HTMLSpanElement
  let avatarRef!: HTMLDivElement
  let trigerIconRef!: HTMLDivElement

  createEffect(() => {
    // auto adjust font size
    setTimeout(() => {
      if (textRef && avatarRef) {
        const textWidth = textRef.clientWidth
        const size = props.size || avatarRef.offsetWidth
        const scale = size / (textWidth + 8)

        if (size && scale < 1) {
          textRef.style.transform = `scale(${scale}) translateX(-50%)`
        }
      }
    })
  })

  const childrenList = children(() => props.children)
  const [isImage, setIsImage] = createSignal(false)

  createEffect(() => {
    const nodeList = childrenList.toArray()
    const firstChild = nodeList[0] as HTMLDivElement
    setIsImage(
      nodeList.length === 1 && (firstChild.tagName === 'IMG' || firstChild.tagName === 'PICTURE'),
    )
  })

  createEffect(() => {
    const bg = isObject(props.style) ? props.style?.['background-color'] : ''
    if (props.triggerType === 'button' && !props.triggerIconStyle?.color && bg) {
      if (trigerIconRef) {
        trigerIconRef.style.color = bg
      }
    }
  })

  return (
    <div
      {...restProps}
      ref={avatarRef}
      style={{
        width: toPx(props.size),
        height: toPx(props.size),
        'font-size': toPx(isNumber(props.size) ? props.size / 2 : ''),
        ...toCSSObject(props.style),
      }}
      class={props.class}
      classList={{
        [prefixCls]: !!prefixCls,
        [`${prefixCls}-${props.shape}`]: !!props.shape,
        [`${prefixCls}-with-trigger-icon`]: !!props.triggerIcon,
        [`${prefixCls}-rtl`]: ctx.rtl,
      }}
    >
      <Show
        when={isImage()}
        fallback={
          <span ref={textRef} class={`${prefixCls}-text`}>
            {props.children}
          </span>
        }
      >
        {<span class={`${prefixCls}-image`}>{props.children}</span>}
      </Show>

      <Show when={props.triggerIcon}>
        <div
          ref={trigerIconRef}
          class={`${prefixCls}-trigger-icon-${props.triggerType}`}
          style={props.triggerIconStyle}
        >
          {props.triggerIcon}
        </div>
      </Show>
    </div>
  )
}

Avatar.displayName = 'Avatar'

export default Avatar
