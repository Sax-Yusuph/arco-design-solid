import { ConfigProvider } from '@arco-design/web-solid'
import type { Component } from 'solid-js'
import CardDemo from './demo/card'

const App: Component = () => {
  return (
    <ConfigProvider>
      {/* <AvatarDemo /> */}
      {/* <ButtonDemo /> */}
      {/* <EmptyDemo /> */}
      {/* <CheckboxDemo /> */}
      {/* <LinkDemo /> */}
      {/* <SwitchDemo /> */}
      {/* <TagDemo /> */}
      <CardDemo />
    </ConfigProvider>
  )
}

export default App
