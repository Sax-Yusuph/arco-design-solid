import { Button, Card, Link, Space, Spin } from '@arco-design/web-solid'
import { createSignal } from 'solid-js'

function App() {
  const [loading, setLoading] = createSignal(true)
  return (
    <>
      <Button
        style={{ display: 'block', 'margin-bottom': '24px' }}
        onClick={() => setLoading(p => !p)}
      >
        {`Loading: ${loading()}`}
      </Button>
      <Space>
        <Spin loading={loading()}>
          <Card style={{ width: '100%' }} title="Arco Card" extra={<Link> More </Link>}>
            ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and
            around the world. Toutiao started out as a news recommendation engine and gradually
            evolved into a platform delivering content in various formats.
          </Card>
        </Spin>
        <Spin loading={loading()}>
          <Card style={{ width: '100%' }} title="Arco Card" extra={<Link> More </Link>}>
            ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and
            around the world. Toutiao started out as a news recommendation engine and gradually
            evolved into a platform delivering content in various formats.
          </Card>
        </Spin>
      </Space>
      <Spin loading={loading()} style={{ display: 'block', 'margin-top': '8px' }}>
        <Card title="Arco Card" extra={<Link> More </Link>}>
          ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around
          the world. Toutiao started out as a news recommendation engine and gradually evolved into
          a platform delivering content in various formats.
        </Card>
      </Spin>
    </>
  )
}

export default App
