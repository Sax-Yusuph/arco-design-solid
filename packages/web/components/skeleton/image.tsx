import cs from '../../utils/classNames'
import type { SkeletonImageProps } from './interface'

export default function image(props: SkeletonImageProps) {
  return (
    <div
      class={cs(
        `${props.prefixCls}-image`,
        {
          [`${props.prefixCls}-image-${props.position || 'left'}`]: true,
          [`${props.prefixCls}-image-${props.shape}`]: props.shape,
          [`${props.prefixCls}-image-${props.size}`]: props.size,
        },
        props.class,
      )}
      style={props.style}
    />
  )
}
