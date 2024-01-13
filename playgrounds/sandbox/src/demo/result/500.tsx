import { Button, Result } from '@arco-design/web-solid'

const App = () => {
  return (
    <div>
      <Result
        status="500"
        subTitle="This page isn’t working."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  )
}

export default App
