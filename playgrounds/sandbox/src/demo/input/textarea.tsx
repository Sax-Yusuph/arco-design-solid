import { Input, Space } from '@arco-design/web-solid'
const TextArea = Input.TextArea

const App = () => {
  return (
    <Space wrap>
      <TextArea placeholder="Please enter ..." style={{ 'min-height': '64px', width: '350px' }} />
      <TextArea defaultValue="Disabled" style={{ 'min-height': '64px', width: '350px' }} disabled />
    </Space>
  )
}

export default App
