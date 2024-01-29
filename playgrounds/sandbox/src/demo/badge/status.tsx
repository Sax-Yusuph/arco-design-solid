import { Badge, Space } from '@arco-design/web-solid'

const App = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Badge status="default" />
        <Badge status="processing" />
        <Badge status="success" />
        <Badge status="warning" />
        <Badge status="error" />
      </Space>
      <Space size="large">
        <Badge status="default" text="Default" />
        <Badge status="processing" text="Processing" />
        <Badge status="success" text="Success" />
        <Badge status="warning" text="Warning" />
        <Badge status="error" text="Error" />
      </Space>
    </Space>
  )
}

export default App
