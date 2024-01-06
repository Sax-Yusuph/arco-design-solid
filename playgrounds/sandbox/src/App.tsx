import { ConfigProvider } from '@arco-design/web-solid'
import type { Component } from 'solid-js'
import AvatarDemo from './demo/avatar'

const App: Component = () => {
  return (
    <ConfigProvider>
      <AvatarDemo />
    </ConfigProvider>
  )
}

export default App
