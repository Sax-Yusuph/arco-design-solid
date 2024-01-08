import { Grid } from '@arco-design/web-solid'
import styles from './styles/basic.module.css'
const Row = Grid.Row
const Col = Grid.Col

const App = () => {
  return (
    <div style={{ width: '100%' }} class={styles['grid-demo-background']}>
      <Row class={styles['grid-demo']} style={{ 'margin-bottom': '16px' }}>
        <Col span={24}>
          <div>24 - 100%</div>
        </Col>
      </Row>
      <Row class={styles['grid-demo']} style={{ 'margin-bottom': '16px' }}>
        <Col span={12}>
          <div>12 - 50%</div>
        </Col>
        <Col span={12}>
          <div>12 - 50%</div>
        </Col>
      </Row>
      <Row class={styles['grid-demo']} style={{ 'margin-bottom': '16px' }}>
        <Col span={8}>
          <div>8 - 33.33%</div>
        </Col>
        <Col span={8}>
          <div>8 - 33.33%</div>
        </Col>
        <Col span={8}>
          <div>8 - 33.33%</div>
        </Col>
      </Row>
      <Row class={styles['grid-demo']} style={{ 'margin-bottom': '16px' }}>
        <Col span={6}>
          <div>6 - 25%</div>
        </Col>
        <Col span={6}>
          <div>6 - 25%</div>
        </Col>
        <Col span={6}>
          <div>6 - 25%</div>
        </Col>
        <Col span={6}>
          <div>6 - 25%</div>
        </Col>
      </Row>
      <Row class={styles['grid-demo']}>
        <Col span={4}>
          <div>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div>4 - 16.66%</div>
        </Col>
      </Row>
    </div>
  )
}

export default App
