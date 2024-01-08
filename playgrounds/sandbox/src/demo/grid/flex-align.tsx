import { Grid } from '@arco-design/web-solid'
import styles from './styles/flex-align.module.css'

const Row = Grid.Row
const Col = Grid.Col
const rowStyle = {
  marginBottom: 40,
  backgroundColor: 'var(--color-fill-2)',
}
const titleStyle = {
  fontSize: 12,
  color: '#141f33',
}

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <p style={titleStyle}>垂直顶部对齐</p>
      <Row class={styles['grid-demo']} align="start" style={rowStyle}>
        <Col span={6} style={{ height: '90', 'line-height': '90px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '48', 'line-height': '48px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '120', 'line-height': '120px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '60', 'line-height': '60px' }}>
          <div>col - 6</div>
        </Col>
      </Row>
      <p style={titleStyle}>垂直居中对齐</p>
      <Row class={styles['grid-demo']} align="center" style={rowStyle}>
        <Col span={6} style={{ height: '90', 'line-height': '90px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '48', 'line-height': '48px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '120', 'line-height': '120px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '60', 'line-height': '60px' }}>
          <div>col - 6</div>
        </Col>
      </Row>
      <p style={titleStyle}>垂直底部对齐</p>
      <Row class={styles['grid-demo']} align="end" style={rowStyle}>
        <Col span={6} style={{ height: '90', 'line-height': '90px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '48', 'line-height': '48px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '120', 'line-height': '120px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '60', 'line-height': '60px' }}>
          <div>col - 6</div>
        </Col>
      </Row>
    </div>
  )
}

export default App
