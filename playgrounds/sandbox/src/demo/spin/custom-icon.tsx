import { Card, Link, Spin } from '@arco-design/web-solid'
import { IconLoading } from '@arco-design/web-solid/icon'

function App() {
  return (
    <Spin loading={true} size={30} icon={<IconLoading />}>
      <Card style={{ width: '360px' }} title="Arco Card" extra={<Link> More </Link>}>
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around
        the world. Toutiao started out as a news recommendation engine and gradually evolved into a
        platform delivering content in various formats.
      </Card>
    </Spin>
  )
}

export default App
