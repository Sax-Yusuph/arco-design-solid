import { Match, Switch, createEffect, mergeProps } from 'solid-js'

import defaultLocale from '../../locale/default'
// import Empty from '../Empty'
import { createInitializedContext } from '../../utils/context'
import { ConfigProviderProps } from './interface'
import { setTheme } from './theme'

const Empty = () => <>Empty</>
function renderEmpty(componentName?: string) {
  return (
    <Switch fallback={<Empty />}>
      <Match when={componentName}>
        <Empty />
      </Match>
    </Switch>
  )
}

const defaultConfig: ConfigProviderProps = {
  getPrefixCls: (componentName: string, customPrefix?: string) =>
    `${customPrefix || 'arco'}-${componentName}`,

  locale: defaultLocale,
  prefixCls: 'arco',
  getPopupContainer: () => document.body,
  size: 'default',
  renderEmpty,
  effectGlobalNotice: true,
  focusLock: {
    modal: { autoFocus: true },
    drawer: { autoFocus: true },
  },
}

export const { use: useConfigContext, provider: ConfigProvider } = createInitializedContext(
  'ArcoConfig',
  (props: ConfigProviderProps) => {
    const config = mergeProps(defaultConfig, props)

    //TODO
    // createEffect(() => {
    //   if (effectGlobalNotice) {
    //     // Message.config({ prefixCls, rtl })
    //     // Notification.config({ prefixCls, rtl })
    //   }
    // }, [prefixCls, rtl, effectGlobalNotice])

    // useEffect(() => {
    //   setConfigProviderProps({ locale, prefixCls, rtl })
    // }, [locale, prefixCls])

    createEffect(() => {
      if (props.theme) {
        setTheme(props.theme)
      }
    })

    return {
      get config() {
        return config
      },
      get componentConfig() {
        return config.componentConfig || {}
      },

      get locale() {
        return config.locale
      },

      get size() {
        return config.size
      },

      get rtl() {
        return config.rtl
      },

      get theme() {
        return config.theme
      },

      getPrefixCls: config.getPrefixCls,
      getPopupContainer: config.getPopupContainer,
      renderEmpty: config.renderEmpty,

      get ready() {
        return true
      },
    }
  },
)
export { type ConfigProviderProps }
