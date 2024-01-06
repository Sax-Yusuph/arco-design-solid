import { ConfigProvider } from '@arco-design/web-solid'
import type { Component } from 'solid-js'
import EmptyDemo from './demo/empty'

const App: Component = () => {
  return (
    <ConfigProvider>
      {/* <AvatarDemo /> */}
      {/* <ButtonDemo /> */}
      <EmptyDemo />
    </ConfigProvider>
  )
}

export default App
