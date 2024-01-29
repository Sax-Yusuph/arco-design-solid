import { Avatar, Badge, Button, Space, Switch } from '@arco-design/web-solid'
import { IconMinus, IconPlus } from '@arco-design/web-solid/icon'
import { createSignal } from 'solid-js'

function App() {
  const [count, setCount] = createSignal(12)
  const [dot, setDot] = createSignal(true)

  return (
    <Space direction="vertical" size="large">
      <Space size="large">
        <Badge dot={dot()} count={dot() ? count() : 0}>
          <Avatar shape="square"> </Avatar>
        </Badge>
        <Switch checked={dot()} onChange={setDot}></Switch>
      </Space>

      <Space size="large">
        <Badge count={count()}>
          <Avatar shape="square"> </Avatar>
        </Badge>
        <Button.Group>
          <Button icon={<IconPlus />} onClick={() => setCount(c => c + 1)}></Button>
          <Button icon={<IconMinus />} onClick={() => setCount(c => Math.max(c - 1, 0))}></Button>
        </Button.Group>
      </Space>
    </Space>
  )
}

export default App
