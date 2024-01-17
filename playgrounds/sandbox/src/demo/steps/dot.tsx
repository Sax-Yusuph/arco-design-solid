import { Steps } from '@arco-design/web-solid'
const Step = Steps.Step

const App = () => {
  return (
    <div>
      <Steps type="dot" current={2} style={{ 'max-width': '780px', 'margin-bottom': '40px' }}>
        <Step title="Succeeded" description="This is a description" />
        <Step title="Processing" description="This is a description" />
        <Step title="Pending" description="This is a description" />
      </Steps>
      <Steps type="dot" direction="vertical" current={2} style={{ 'max-width': '780px' }}>
        <Step title="Succeeded" description="This is a description" />
        <Step title="Processing" description="This is a description" />
        <Step title="Pending" description="This is a description" />
      </Steps>
    </div>
  )
}

export default App
