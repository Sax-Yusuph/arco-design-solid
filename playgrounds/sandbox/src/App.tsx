import { ConfigProvider } from '@arco-design/web-solid'
import type { Component } from 'solid-js'
import LinkDemo from './demo/link'

const App: Component = () => {
  return (
    <ConfigProvider>
      {/* <AvatarDemo /> */}
      {/* <ButtonDemo /> */}
      {/* <EmptyDemo /> */}
      {/* <CheckboxDemo /> */}
      <LinkDemo />
    </ConfigProvider>
  )
}

export default App
