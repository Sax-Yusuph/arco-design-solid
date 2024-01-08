import { Grid } from '@arco-design/web-solid'
import styles from './styles/flex.module.css'
const Row = Grid.Row
const Col = Grid.Col

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <Row class={styles['grid-demo']} style={{ 'margin-bottom': '16px' }}>
        <Col flex="100px">
          <div>100px</div>
        </Col>
        <Col flex="auto">
          <div>auto</div>
        </Col>
      </Row>
      <Row class={styles['grid-demo']} style={{ 'margin-bottom': '16px' }}>
        <Col flex="100px">
          <div>100px</div>
        </Col>
        <Col flex="auto">
          <div>auto</div>
        </Col>
        <Col flex="100px">
          <div>100px</div>
        </Col>
      </Row>
      <Row class={styles['grid-demo']} style={{ 'margin-bottom': '16px' }}>
        <Col flex={3}>
          <div>3 / 12</div>
        </Col>
        <Col flex={4}>
          <div>4 / 12</div>
        </Col>
        <Col flex={5}>
          <div>5 / 12</div>
        </Col>
      </Row>
    </div>
  )
}

export default App
