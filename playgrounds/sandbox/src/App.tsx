import { ConfigProvider, Space } from '@arco-design/web-solid'
import type { Component } from 'solid-js'
import StepsDemo from './demo/steps'

const App: Component = () => {
  return (
    <div style="width:50vw; margin:auto; min-width:600px">
      <ConfigProvider>
        <Space size={'large'} direction="vertical" style="width:100%">
          {/* <AvatarDemo /> */}
          {/* <ButtonDemo /> */}
          {/* <EmptyDemo /> */}
          {/* <CheckboxDemo /> */}
          {/* <LinkDemo /> */}
          {/* <SwitchDemo /> */}
          {/* <TagDemo /> */}
          {/* <GridDemo /> */}
          {/* <CardDemo /> */}
          {/* <InputDemo /> */}
          {/* <InputNumberDemo /> */}
          {/* <SpinDemo /> */}
          {/* <ResultDemo /> */}
          {/* <SkeletonDemo /> */}
          <StepsDemo />
        </Space>
      </ConfigProvider>
    </div>
  )
}

export default App
