import { Button, Grid, Statistic, StatisticHandle } from '@arco-design/web-solid'
import { AiOutlineFall, AiOutlineRise } from 'solid-icons/ai'

const Row = Grid.Row
const Col = Grid.Col

export const App = () => {
  let refGrowth: StatisticHandle
  let refBugs: StatisticHandle

  return (
    <Row>
      <Col span={4}>
        <Statistic
          ref={ref => (refGrowth = ref)}
          title="User Growth Rate"
          value={50.32}
          precision={2}
          prefix={<AiOutlineRise class="arco-icon" />}
          suffix="%"
          countUp
          styleValue={{ color: '#0fbf60' }}
        />
        <Button
          onClick={() => {
            refGrowth?.countUp()
          }}
          style={{ display: 'block', 'margin-top': '10px' }}
          type="primary"
        >
          Start
        </Button>
      </Col>
      <Col span={4}>
        <Statistic
          ref={ref => (refBugs = ref)}
          title="Population Growth Rate"
          value={2.59}
          precision={2}
          prefix={<AiOutlineFall class="arco-icon" />}
          suffix="%"
          countUp
          styleValue={{ color: '#ee4d38' }}
        />
        <Button
          onClick={() => {
            refBugs.countUp()
          }}
          style={{ display: 'block', 'margin-top': '10px' }}
          type="primary"
        >
          Start
        </Button>
      </Col>
    </Row>
  )
}

export default App
