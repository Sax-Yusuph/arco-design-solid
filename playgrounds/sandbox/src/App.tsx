import { ConfigProvider } from '@arco-design/web-solid'
import type { Component } from 'solid-js'
import CheckboxDemo from './demo/checkbox'

const App: Component = () => {
  return (
    <ConfigProvider>
      {/* <AvatarDemo /> */}
      {/* <ButtonDemo /> */}
      {/* <EmptyDemo /> */}
      <CheckboxDemo />
    </ConfigProvider>
  )
}

export default App
