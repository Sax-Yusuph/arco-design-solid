import { Grid } from '@arco-design/web-solid'
import styles from './styles/order.module.css'
const Row = Grid.Row
const Col = Grid.Col

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <Row class={styles["grid-demo"]}>
        <Col span={6} order={4}>
          <div>1 col-order-4</div>
        </Col>
        <Col span={6} order={3}>
          <div>2 col-order-3</div>
        </Col>
        <Col span={6} order={2}>
          <div>3 col-order-2</div>
        </Col>
        <Col span={6} order={1}>
          <div>4 col-order-1</div>
        </Col>
      </Row>
    </div>
  )
}

export default App
