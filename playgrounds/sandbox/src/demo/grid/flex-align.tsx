import { Grid } from '@arco-design/web-solid'
import styles from './styles/flex-align.module.css'

const Row = Grid.Row
const Col = Grid.Col

const rowStyle = {
  'margin-bottom': '40px',
  'background-color': 'var(--color-fill-2)',
}
const titleStyle = {
  fontSize: 12,
  color: '#141f33',
}

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <p style={titleStyle}>
        <span class="arco-typography">垂直顶部对齐</span>
      </p>
      <Row class={styles['grid-demo']} align="start" style={rowStyle}>
        <Col span={6} style={{ height: '90px', 'line-height': '90px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '48px', 'line-height': '48px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '120px', 'line-height': '120px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '60px', 'line-height': '60px' }}>
          <div>col - 6</div>
        </Col>
      </Row>
      <p style={titleStyle}>
        <span class="arco-typography">垂直居中对齐</span>
      </p>
      <Row class={styles['grid-demo']} align="center" style={rowStyle}>
        <Col span={6} style={{ height: '90px', 'line-height': '90px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '48px', 'line-height': '48px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '120px', 'line-height': '120px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '60px', 'line-height': '60px' }}>
          <div>col - 6</div>
        </Col>
      </Row>
      <p style={titleStyle}>
        <span class="arco-typography">垂直底部对齐</span>
      </p>
      <Row class={styles['grid-demo']} align="end" style={rowStyle}>
        <Col span={6} style={{ height: '90px', 'line-height': '90px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '48px', 'line-height': '48px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '120px', 'line-height': '120px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '60px', 'line-height': '60px' }}>
          <div>col - 6</div>
        </Col>
      </Row>
    </div>
  )
}

export default App
