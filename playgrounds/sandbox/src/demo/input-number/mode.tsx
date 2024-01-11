import { InputNumber } from '@arco-design/web-solid'

const App = () => {
  return (
    <div>
      <InputNumber
        mode="button"
        defaultValue={500}
        style={{ width: '160px', margin: '10px 24px 10px 0' }}
      />
      <InputNumber
        mode="button"
        disabled
        defaultValue={500}
        style={{ width: '160px', margin: '10px 24px 10px 0' }}
      />
    </div>
  )
}

export default App
