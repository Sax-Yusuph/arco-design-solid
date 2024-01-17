import { Divider, Steps } from '@arco-design/web-solid'
const Step = Steps.Step

const App = () => {
  return (
    <div>
      <Steps labelPlacement="vertical" current={2} style={{ 'max-width': '780px', margin: '0 auto' }}>
        <Step title="Succeeded" description="This is a description" />
        <Step title="Processing" description="This is a description" />
        <Step title="Pending" description="This is a description" />
      </Steps>
      <Divider />
      <div
        style={{
          'line-height': '140px',
          'text-align': 'center',
          color: '#C9CDD4',
        }}
      >
        Step 2 Content
      </div>
    </div>
  )
}

export default App
