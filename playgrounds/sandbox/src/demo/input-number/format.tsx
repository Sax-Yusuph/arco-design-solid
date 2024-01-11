import { InputNumber } from '@arco-design/web-solid'
import { createSignal } from 'solid-js'

function App() {
  const [value, setValue] = createSignal(12000)
  const [delayValue, setDelayValue] = createSignal(12000)
  return (
    <div>
      <InputNumber
        style={{ width: '160px', margin: '10px 24px 10px 0' }}
        min={0}
        max={1000000000}
        step={1000}
        value={value()}
        onInput={v => setValue(v)}
        prefix="¥"
        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/,/g, '')}
      />
      <InputNumber
        style={{ width: '160px', margin: '10px 24px 10px 0' }}
        min={0}
        max={1000000000}
        step={1000}
        value={delayValue()}
        onInput={v => setDelayValue(v)}
        prefix="¥"
        formatter={(value, { userTyping, input }) =>
          userTyping ? input : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        parser={value => value.replace(/,/g, '')}
      />
    </div>
  )
}

export default App
