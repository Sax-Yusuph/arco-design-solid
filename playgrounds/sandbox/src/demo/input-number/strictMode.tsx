import { InputNumber } from '@arco-design/web-solid'
import { createSignal } from 'solid-js'

const App = () => {
  const [value, setValue] = createSignal(1e20)
  return (
    <InputNumber
      style={{ width: '480px' }}
      strictMode
      mode="button"
      value={value()}
      step={1e-20}
      onInput={value => {
        console.log('InputNumber value is ', value)
        setValue(value)
      }}
    />
  )
}

export default App
