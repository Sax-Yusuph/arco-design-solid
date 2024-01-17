import { Steps } from '@arco-design/web-solid'
import {
	AiOutlineHome,
	AiOutlineLike,
	AiOutlineLoading
} from 'solid-icons/ai'
const Step = Steps.Step

const App = () => {
  return (
    <Steps current={2}>
      <Step
        icon={<AiOutlineHome class="arco-icon" />}
        title="Succeeded"
        description="This is a description"
      />
      <Step
        icon={<AiOutlineLoading class="arco-icon" />}
        title="Processing"
        description="This is a description"
      />
      <Step
        icon={<AiOutlineLike class="arco-icon" />}
        title="Pending"
        description="This is a description"
      />
    </Steps>
  )
}

export default App
