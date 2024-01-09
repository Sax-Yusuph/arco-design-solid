import { Input, Space } from '@arco-design/web-solid'

const App = () => {
  return (
    <Space wrap>
      <Input.Password defaultValue="password" style={{ width: '350px' }} />
      <Input.Password
        defaultValue="password"
        defaultVisibility={true}
        placeholder="Please enter ..."
        style={{ width: '350px' }}
      />
    </Space>
  )
}

export default App
