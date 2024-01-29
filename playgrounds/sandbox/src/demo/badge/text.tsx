import { Avatar, Badge, Space } from '@arco-design/web-solid'
import { IconUser } from '@arco-design/web-solid/icon'

const App = () => {
  return (
    <Space size={40}>
      <Badge text="NEW">
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
      <Badge text="HOT">
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
    </Space>
  )
}

export default App
