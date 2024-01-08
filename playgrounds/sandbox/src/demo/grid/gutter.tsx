import { Divider, Grid } from '@arco-design/web-solid'
import styles from './styles/gutter.module.css'
const Row = Grid.Row
const Col = Grid.Col

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <Divider orientation="left">Horizontal</Divider>
      <Row class={styles['grid-gutter-demo']} gutter={24}>
        <Col span={12}>
          <div>col - 12</div>
        </Col>
        <Col span={12}>
          <div>col - 12</div>
        </Col>
      </Row>
      <Divider orientation="left">Responsive</Divider>
      <Row class={styles['grid-gutter-demo']} gutter={{ md: 8, lg: 24, xl: 32 }}>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
      </Row>
      <Divider orientation="left">Horizontal and Vertical</Divider>
      <Row class={styles['grid-gutter-demo']} gutter={[24, 12]}>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
        <Col span={6}>
          <div>col - 6</div>
        </Col>
      </Row>
    </div>
  )
}

export default App
