import { Steps } from '@arco-design/web-solid'
const Step = Steps.Step

const App = () => {
  return (
    <Steps lineless current={2} style={{ 'max-width': '780px', 'margin-bottom': '40px' }}>
      <Step title="Succeeded" description="This is a description" />
      <Step title="Processing" description="This is a description" />
      <Step title="Pending" description="This is a description" />
    </Steps>
  )
}

export default App
