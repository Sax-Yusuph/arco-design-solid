import { ConfigProvider } from '@arco-design/web-solid'
import type { Component } from 'solid-js'
import SwitchDemo from './demo/switch'

const App: Component = () => {
  return (
    <ConfigProvider>
      {/* <AvatarDemo /> */}
      {/* <ButtonDemo /> */}
      {/* <EmptyDemo /> */}
      {/* <CheckboxDemo /> */}
      {/* <LinkDemo /> */}
      <SwitchDemo />
    </ConfigProvider>
  )
}

export default App
