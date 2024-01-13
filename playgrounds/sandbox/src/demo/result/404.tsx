import { Button, Result } from '@arco-design/web-solid'

const App = () => {
  return (
    <div>
      <Result
        status="404"
        subTitle="Whoops, that page is gone. "
        extra={[
          <Button style={{ margin: '0 16px' }}>Again</Button>,
          <Button type="primary">Back</Button>,
        ]}
      ></Result>
    </div>
  )
}

export default App
