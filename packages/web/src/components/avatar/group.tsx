// import Popover from '../Popover'
import { JSX, ParentProps, children, createEffect, createMemo, createSignal } from 'solid-js'
import cs from '../../utils/classNames'
import { isFunction } from '../../utils/is'
import { toPx } from '../../utils/util'
import Avatar from './avatar'
import { AvatarGroupProvider, useAvatarGroupContext } from './context'
import { AvatarGroupProps } from './interface'

function Group(props: ParentProps) {
  const ctx = useAvatarGroupContext()
  if (!ctx) throw new Error(`No Avatar group context found`)

  const prefixCls = ctx.prefixCls

  const nodeList = children(() => props.children)
  const [jsxList, setJsx] = createSignal<JSX.Element>()

  const avatarJsx = createMemo(() => {
    return nodeList.toArray().slice(0, ctx.group.maxCount)
  })

  const avatarsInPopover = createMemo(() =>
    ctx.group.maxCount && ctx.group.maxCount > 0
      ? nodeList.toArray().slice(ctx.group.maxCount)
      : [],
  )

  createEffect(() => {
    const totalList = nodeList.toArray()
    const avatarsToRender = totalList.slice(0, ctx.group.maxCount)
    const avatarsInPopover =
      ctx.group.maxCount && ctx.group.maxCount > 0
        ? nodeList.toArray().slice(ctx.group.maxCount)
        : []

    if (avatarsInPopover.length) {
      avatarsToRender.push(
        (
          <Avatar style={ctx.group.maxStyle} class={`${prefixCls}-max-count-avatar`}>
            +{avatarsInPopover.length}
          </Avatar>
        ) as any,
      )
    }

    const zIndexAscend = ctx.group.zIndexAscend
    const size = ctx.group.size

    avatarsToRender.forEach((node, index) => {
      const isFirst = ctx.rtl ? index === avatarJsx().length - 1 : index === 0
      const zIndex = zIndexAscend ? index + 1 : totalList.length - index
      const marginLeft = size ? (!isFirst ? -size / 4 : 0) : ''
     //@ts-ignore
			let _node = isFunction(node) ? node() : node

      if (_node instanceof HTMLDivElement) {
        // todo double check this
        _node.style.zIndex = `${zIndex}`
        _node.style.marginLeft = toPx(marginLeft)
      }
    })

    setJsx(avatarsToRender)
  })

  // createEffect(() => {
  // setAvatarCount(childrenList.length)
  // if (isNumber(props.maxCount) && props.maxCount >= 0 && childrenList.length > props.maxCount) {
  //   const avatarsInPopover = childrenList.slice(props.maxCount)
  //   setPopoverJsx(avatarsInPopover)

  //   avatarsToRender = childrenList.slice(0, props.maxCount)
  //   avatarsToRender.push(
  //     (
  //       <Avatar style={split.maxStyle} class={`${prefixCls}-max-count-avatar`}>
  //         +{popoverJsx().length}
  //       </Avatar>
  //     ) as any,
  //   )

  /* <Avatar style={split.maxStyle} class={`${prefixCls}-max-count-avatar`}>
						<Popover
            triggerProps={maxPopoverTriggerProps}
            content={
              <AvatarContextProvider
              shape={split.shape}
              size={split.size}
              autoFixFontSize={split.autoFixFontSize}
              style={stackedStyle}
            >
                <div className={`${prefixCls}-popover`}>{avatarsInPopover}</div>
              </AvatarContext.Provider>
            }
          >
            +{popoverJsx().length}
 						</Popover>
          </Avatar> */
  // }
  // })

  return (
    <div
      style={ctx.group.style}
      class={cs(prefixCls, { [`${prefixCls}-rtl`]: ctx.rtl }, ctx.group.class)}
    >
      {jsxList()}
    </div>
  )
}

function AvatarGroup(props: AvatarGroupProps) {
  return (
    <AvatarGroupProvider {...props}>
      <Group>{props.children}</Group>
    </AvatarGroupProvider>
  )
}

AvatarGroup.displayName = 'AvatarGroup'

export default AvatarGroup

/* TODO: fix this when Popover component is available
 <Avatar style={split.maxStyle} class={`${prefixCls}-max-count-avatar`}>
						<Popover
            triggerProps={maxPopoverTriggerProps}
            content={
              <AvatarContextProvider
              shape={split.shape}
              size={split.size}
              autoFixFontSize={split.autoFixFontSize}
              style={stackedStyle}
            >
                <div className={`${prefixCls}-popover`}>{avatarsInPopover}</div>
              </AvatarContext.Provider>
            }
          >
            +{popoverJsx().length}
 						</Popover>
          </Avatar> */
