import { Button, Card, Spin } from '@arco-design/web-solid'
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
      <Spin delay={500} loading={loading()}>
        <Card
          style={{ width: '360px' }}
          title="Delay 500ms"
          extra={
            <a href="#" style={{ color: '#165DFF', 'text-decoration': 'none' }}>
              More
            </a>
          }
        >
          ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around
          the world. Toutiao started out as a news recommendation engine and gradually evolved into
          a platform delivering content in various formats.
        </Card>
      </Spin>
    </>
  )
}

export default App
