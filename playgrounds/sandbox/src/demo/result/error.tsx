import { Button, Result } from '@arco-design/web-solid'

const App = () => {
  return (
    <div>
      <Result
        status="error"
        title="Error message"
        subTitle="Something went wrong. Please try again. "
        extra={[
          <Button style="margin: 0 16px">Again</Button>,
          <Button type="primary">Back</Button>,
        ]}
      ></Result>
    </div>
  )
}

export default App
