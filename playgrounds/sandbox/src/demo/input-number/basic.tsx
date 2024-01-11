import { InputNumber } from '@arco-design/web-solid'

const App = () => {
  return (
    <div>
      <InputNumber
        placeholder="Please enter"
        min={0}
        max={15}
        style={{ width: '160px', margin: '10px 24px 10px 0' }}
      />
      <InputNumber
        disabled
        defaultValue={500}
        style={{ width: '160px', margin: '10px 24px 10px 0' }}
      />
    </div>
  )
}

export default App
