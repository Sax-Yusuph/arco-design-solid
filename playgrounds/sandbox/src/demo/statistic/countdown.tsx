import { Button, Space, Statistic } from '@arco-design/web-solid'
import { createMemo, createSignal } from 'solid-js'

const Countdown = Statistic.Countdown
const now = Date.now()

function App() {
  const [start, setStart] = createSignal(false)

  const _now = createMemo(() => {
    const s = start()
    return Date.now()
  })

  return (
    <Space direction="vertical" size={40}>
      <Space size={60}>
        <Countdown title="Countdown" value={now + 1000 * 60 * 60 * 2} now={now} />
        <Countdown
          value={now + 1000 * 60 * 60 * 2}
          now={now}
          renderFormat={(_diff, _value) => {
            const minutes = Math.floor(_diff / (1000 * 60))
            const seconds = Math.floor(_diff / 1000)
            let diffTimes = ''
            if (minutes) {
              diffTimes = `${minutes}min 后`
            } else {
              diffTimes = `${seconds}s 后`
            }
            return <Statistic title="Countdown renderFormat" value={_value} suffix={diffTimes} />
          }}
        />
        <Countdown
          title="Milliseconds"
          value={now + 1000 * 60 * 60 * 2}
          format="HH:mm:ss.SSS"
          now={now}
        />
      </Space>
      <Space align="start" size={40}>
        <Countdown
          title="Days"
          value={now + 1000 * 60 * 60 * 24 * 4}
          format="D 天 H 时 m 分 s 秒"
          now={now}
        />
        <div>
          <Countdown
            title="Trigger on finish"
            value={_now() + 1000 * 5}
            format="HH:mm:ss.SSS"
            start={start()}
            now={_now()}
            onFinish={() => {
              alert('Finish!')
              setStart(false)
            }}
          />
          <Button
            onClick={() => {
              setStart(true)
            }}
            style={{ display: 'block', 'margin-top': '10px' }}
            type="primary"
          >
            Start
          </Button>
        </div>
      </Space>
    </Space>
  )
}

export default App
