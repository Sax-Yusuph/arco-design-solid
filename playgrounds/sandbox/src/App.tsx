import { ConfigProvider } from '@arco-design/web-solid'
import type { Component } from 'solid-js'
import TagDemo from './demo/tag'

const App: Component = () => {
  return (
    <ConfigProvider>
      {/* <AvatarDemo /> */}
      {/* <ButtonDemo /> */}
      {/* <EmptyDemo /> */}
      {/* <CheckboxDemo /> */}
      {/* <LinkDemo /> */}
      {/* <SwitchDemo /> */}
      <TagDemo />
    </ConfigProvider>
  )
}

export default App
