import { Statistic, Switch } from '@arco-design/web-solid'
import { createSignal } from 'solid-js'

function App() {
  const [loading, setLoading] = createSignal(true)
  return (
    <div>
      <div style={{ 'margin-bottom': '24px' }}>
        <Switch checked={loading()} onChange={setLoading} />
        <span class="arco-typography" style={{ margin: '0 10px' }}>
          Loading
        </span>
      </div>
      <Statistic title="Downloads" value={125670} groupSeparator loading={loading()} />
    </div>
  )
}

export default App
