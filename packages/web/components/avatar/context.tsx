import { mergeProps } from 'solid-js'
import { createContextProvider } from '../../utils/context'
import { useConfigContext } from '../config-provider'
import { AvatarGroupProps, AvatarProps } from './interface'

const defaultProps: AvatarProps = {
  shape: 'circle',
  autoFixFontSize: true,
  triggerType: 'button',
}

export const [AvatarGroupProvider, useAvatarGroupContext] = createContextProvider(
  (props: AvatarGroupProps) => {
    const ctx = useConfigContext()
    const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.['Avatar.Group'], props)

    return {
      get group() {
        return mergedProps
      },

      get avatar() {
        return {
          size: mergedProps.size,
          shape: mergedProps.shape,
          autoFixFontSize: mergedProps.autoFixFontSize,
        }
      },
      get prefixCls() {
        return ctx.getPrefixCls?.('avatar-group')
      },

      get rtl() {
        return ctx.rtl
      },

      get ready() {
        return true
      },
    }
  },
)
