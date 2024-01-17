import { Divider, Steps } from '@arco-design/web-solid'
const Step = Steps.Step

const App = () => {
  return (
    <div>
      <Steps current={2} style={{ 'max-width': '780px', margin: '0 auto' }}>
        <Step title="Succeeded" />
        <Step title="Processing" />
        <Step title="Pending" />
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
