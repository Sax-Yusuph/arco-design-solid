import { Button, Result } from '@arco-design/web-solid'
import { AiFillSmile } from 'solid-icons/ai'

const App = () => {
  return (
    <div>
      <Result
        status={null}
        icon={<AiFillSmile class='arco-icon' style={{ color: 'rgb(var(--arcoblue-6))' }} />}
        title="Your operation has been performed."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  )
}

export default App
