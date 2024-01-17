import { Steps } from '@arco-design/web-solid'
const Step = Steps.Step

const App = () => {
  return (
    <div>
      <Steps
        type="arrow"
        size="small"
        current={2}
        style={{ 'max-width': '780px', 'margin-bottom': '20px' }}
      >
        <Step title="Succeeded" />
        <Step title="Processing" />
        <Step title="Pending" />
      </Steps>
      <Steps type="arrow" size="small" status="error" current={2} style={{ 'max-width': '780px' }}>
        <Step title="Succeeded" />
        <Step title="Processing" />
        <Step title="Pending" />
      </Steps>
    </div>
  )
}

export default App
