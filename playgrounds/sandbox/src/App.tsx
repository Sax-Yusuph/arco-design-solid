import { ConfigProvider } from '@arco-design/web-solid'
import type { Component } from 'solid-js'
import ButtonDemo from './demo/button'

const App: Component = () => {
  return (
    <ConfigProvider>
      {/* <AvatarDemo /> */}
      <ButtonDemo />
    </ConfigProvider>
  )
}

export default App
