import { ParentProps, Show, createContext, useContext } from 'solid-js'

export function createInitializedContext<P extends {}, T extends { ready: boolean }>(
  name: string,
  cb: (p: ParentProps<P>) => T,
) {
  const ctx = createContext<T>()

  return {
    use: () => {
      const context = useContext(ctx)
      if (!context) throw new Error(`No ${name} context`)
      return context
    },

    provider: (props: ParentProps<P>) => {
      const value = cb(props)
      return (
        <Show when={value.ready}>
          <ctx.Provider value={value} {...props}>
            {props.children}
          </ctx.Provider>
        </Show>
      )
    },
  }
}
