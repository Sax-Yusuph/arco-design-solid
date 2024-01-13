import { Button, Result } from '@arco-design/web-solid'

const App = () => {
  return (
    <div>
      <Result
        status="success"
        title="Success message"
        subTitle="This is a success description."
        extra={[
          <Button type="secondary" style={{ margin: '0 16px' }}>
            Again
          </Button>,
          <Button type="primary">Back</Button>,
        ]}
      ></Result>
    </div>
  )
}

export default App
