import { ConfigProvider, Space } from '@arco-design/web-solid'
import type { Component } from 'solid-js'
import BacktopDemo from './demo/backtop'

const App: Component = () => {
  return (
    <div style="width:60vw; margin:auto; min-width:600px">
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
          {/* <StepsDemo /> */}
          {/* <StatisticDemo /> */}
          {/* <VerificationCodeDemo /> */}
          <BacktopDemo />
        </Space>
      </ConfigProvider>
    </div>
  )
}

export default App
