import { Grid } from '@arco-design/web-solid'
import styles from './styles/flex-justify.module.css'
const Row = Grid.Row
const Col = Grid.Col
const rowStyle = {
  'margin-bottom': '40px',
  background: 'var(--color-fill-2)',
}
const titleStyle = {
  fontSize: 12,
  color: '#141f33',
}

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <p style={titleStyle}>
        <span class="arco-typography">容器左排列</span>
      </p>
      <Row class={styles['grid-demo']} justify="start" style={rowStyle}>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
      <p style={titleStyle}>
        <span class="arco-typography">容器居中排列</span>
      </p>
      <Row class={styles['grid-demo']} justify="center" style={rowStyle}>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
      <p style={titleStyle}>
        <span class="arco-typography">容器右排列</span>
      </p>
      <Row class={styles['grid-demo']} justify="end" style={rowStyle}>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
      <p style={titleStyle}>
        <span class="arco-typography">容器分散排列</span>
      </p>
      <Row class={styles['grid-demo']} justify="space-around" style={rowStyle}>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
      <p style={titleStyle}>
        <span class="arco-typography">容器等距排列</span>
      </p>
      <Row class={styles['grid-demo']} justify="space-between" style={rowStyle}>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
    </div>
  )
}

export default App
