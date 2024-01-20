import { ParentProps, Show, mergeProps, splitProps } from 'solid-js'
import cs from '../../utils/classNames'
import { isObject } from '../../utils/is'
import { pickDataAttributes } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import Image from './image'
import type { SkeletonProps } from './interface'
import Text from './text'

function getComponentProps(prop: any) {
  return isObject(prop) ? prop : {}
}

const defaultProps: SkeletonProps = {
  text: true,
  loading: true,
}

function Skeleton(baseProps: ParentProps<SkeletonProps>) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.Skeleton, baseProps)
  const [props, restProps] = splitProps(mergedProps, [
    'style',
    'class',
    'animation',
    'loading',
    'image',
    'text',
    'children',
  ])

  const imageProps = getComponentProps(props.image)
  const textProps = getComponentProps(props.text)
  const prefixCls = ctx.getPrefixCls?.('skeleton')
  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-animate`]: props.animation,
      [`${prefixCls}-rtl`]: ctx.rtl,
    },
    props.class,
  )

  function renderImage() {
    return (
      <Show when={props.image}>
        <div class={`${prefixCls}-header`}>
          <Image prefixCls={prefixCls} {...imageProps} />
        </div>
      </Show>
    )
  }

  function renderText() {
    return (
      <Show when={props.text}>
        <div class={`${prefixCls}-content`}>
          <Text prefixCls={prefixCls} {...textProps} />
        </div>
      </Show>
    )
  }

  return (
    <Show when={props.loading} fallback={props.children}>
      <div
        {...pickDataAttributes(restProps)}
        class={classNames}
        style={props.style}
        ref={restProps.ref}
      >
        {imageProps.position !== 'right' && renderImage()}
        {renderText()}
        {imageProps.position === 'right' && renderImage()}
      </div>
    </Show>
  )
}

Skeleton.displayName = 'Skeleton'

export default Skeleton

export { type SkeletonProps }
