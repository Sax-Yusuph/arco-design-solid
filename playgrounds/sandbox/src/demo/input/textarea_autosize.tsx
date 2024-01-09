import { Input, Space } from '@arco-design/web-solid'
const TextArea = Input.TextArea

const App = () => {
  return (
    <Space wrap>
      <TextArea
        placeholder="Please enter ..."
        defaultValue="This is the contents of the textarea. "
        autoSize
        style={{ width: '350px' }}
      />
      <TextArea
        placeholder="Please enter ..."
        autoSize={{ minRows: 2, maxRows: 6 }}
        style={{ width: '350px' }}
        defaultValue="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea. "
      />
    </Space>
  )
}

export default App
