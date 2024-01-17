import { Steps } from '@arco-design/web-solid'
import { createSignal } from 'solid-js'
const Step = Steps.Step

function App() {
  const [current, setCurrent] = createSignal(1)
  return (
    <div>
      <Steps
        type="arrow"
        current={current()}
        onChange={setCurrent}
        style={{ 'margin-bottom': '20px' }}
      >
        <Step title="Succeeded" description="This is a description" />
        <Step title="Processing" description="This is a description" />
        <Step title="Pending" description="This is a description" />
      </Steps>
      <Steps current={current()} onChange={setCurrent} direction="vertical">
        <Step title="Succeeded" description="This is a description" />
        <Step title="Processing" description="This is a description" />
        <Step title="Pending" description="This is a description" />
      </Steps>
    </div>
  )
}

export default App
