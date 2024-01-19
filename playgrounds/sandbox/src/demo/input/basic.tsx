import { Input } from '@arco-design/web-solid'
import { createSignal } from 'solid-js'
const App = () => {
  const [value, setValue] = createSignal('')


  return (
    <Input
      value={value()}
      onInput={e => setValue(e)}
      style={{ width: '350px' }}
      allowClear
      placeholder="Please Enter something"
    />
  )
}

export default App
