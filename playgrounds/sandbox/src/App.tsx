import { ConfigProvider, Space } from '@arco-design/web-solid'
import type { Component } from 'solid-js'
import GridDemo from './demo/grid'

const App: Component = () => {
  return (
    <div style="width:50vw; margin:auto">
      <ConfigProvider>
        <Space size={'large'} direction="vertical" style='width:100%' >
          {/* <AvatarDemo /> */}
          {/* <ButtonDemo /> */}
          {/* <EmptyDemo /> */}
          {/* <CheckboxDemo /> */}
          {/* <LinkDemo /> */}
          {/* <SwitchDemo /> */}
          {/* <TagDemo /> */}
          <GridDemo />
          {/* <CardDemo /> */}
        </Space>
      </ConfigProvider>
    </div>
  )
}

export default App
