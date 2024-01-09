import { Input, Space } from '@arco-design/web-solid'

function App() {
  return (
    <Space direction="vertical">
      <Space align="start" size={24} wrap>
        <Input
          maxLength={10}
          showWordLimit
          placeholder="Please enter no more than 10 letters"
          style={{ width: '300px' }}
        />
        <Input.TextArea
          maxLength={50}
          showWordLimit
          placeholder="Please enter no more than 50 letters"
          wrapperStyle={{ width: '300px' }}
        />
      </Space>

      <Space align="start" size={24} wrap>
        <Input
          maxLength={{ length: 10, errorOnly: true }}
          showWordLimit
          defaultValue="More than 10 letters will be error"
          style={{ width: '300px' }}
        />
        <Input.TextArea
          maxLength={{ length: 50, errorOnly: true }}
          showWordLimit
          placeholder="More than 50 letters will be error"
          wrapperStyle={{ width: '300px' }}
        />
      </Space>
    </Space>
  )
}

export default App
