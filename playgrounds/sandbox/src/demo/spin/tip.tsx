import { Card, Link, Spin } from '@arco-design/web-solid'

function App() {
  return (
    <Spin tip="This may take a while..." loading>
      <Card style={{ width: '360px' }} title="Delay 500ms" extra={<Link> More </Link>}>
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around
        the world. Toutiao started out as a news recommendation engine and gradually evolved into a
        platform delivering content in various formats.
      </Card>
    </Spin>
  )
}

export default App
