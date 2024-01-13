import { Button, Result } from '@arco-design/web-solid'
import { AiFillFrown } from 'solid-icons/ai'

const App = () => {
  return (
    <div>
      <Result
        status="error"
        icon={<AiFillFrown class="arco-icon" />}
        title="No internet"
        subTitle="DNS_PROBE_FINISHED_NO_INTERNET"
        extra={<Button type="primary">Refresh</Button>}
      >
        <div class="result-content" style={{ background: 'var(--color-fill-2)', padding: '24px' }}>
          <span>Try:</span>
          <ul>
            <li> Checking the network cables, modem, and router </li>
            <li> Reconnecting to Wi-Fi </li>
          </ul>
        </div>
      </Result>
    </div>
  )
}

export default App
