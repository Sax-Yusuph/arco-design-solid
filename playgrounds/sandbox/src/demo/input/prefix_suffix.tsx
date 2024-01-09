import { Input, Space } from '@arco-design/web-solid'
import { AiOutlineInfo, AiOutlineSearch, AiOutlineUser } from 'solid-icons/ai'

const App = () => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Input style={{ width: '350px' }} prefix={<AiOutlineUser />} placeholder="Please enter" />
        <Input
          allowClear
          style={{ width: '350px' }}
          suffix={<AiOutlineInfo />}
          placeholder="Please enter"
        />
      </Space>
      <Space wrap>
        <Input
          style={{ width: '350px' }}
          prefix={<AiOutlineUser />}
          suffix={<AiOutlineInfo />}
          placeholder="Please enter"
        />
        <Input
          style={{ width: '350px' }}
          addBefore="+86"
          addAfter={<AiOutlineSearch />}
          prefix={<AiOutlineUser />}
          suffix={<AiOutlineInfo />}
          allowClear
          placeholder="Please enter"
        />
      </Space>
    </Space>
  )
}

export default App
