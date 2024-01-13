import { Button, Result } from '@arco-design/web-solid'

const App = () => {
  return (
    <div>
      <Result
        status="403"
        subTitle="Access to this resource on the server is denied."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  )
}

export default App
