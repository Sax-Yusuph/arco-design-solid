
import { Steps } from '@arco-design/web-solid';
import { createSignal } from 'solid-js';
const Step = Steps.Step;

function App() {
  const [current, setCurrent] = createSignal(1);
  return (
    <div>
      <Steps
        type="navigation"
        current={current()}
        onChange={setCurrent}
        style={{ width: '780px', 'margin-bottom': '60px' }}
      >
        <Step title="Succeeded" />
        <Step title="Processing" />
        <Step title="Pending" />
      </Steps>
      <Steps
        type="navigation"
        size="small"
        current={current()}
        onChange={setCurrent}
        style={{ width: '780px', 'margin-bottom': '60px' }}
      >
        <Step title="Succeeded" />
        <Step title="Processing" />
        <Step title="Pending" />
      </Steps>
      <Steps type="navigation" current={current()} onChange={setCurrent} style={{ width: '780px' }}>
        <Step title="Succeeded" description="This is a description" />
        <Step title="Processing" description="This is a description" />
        <Step title="Pending" description="This is a description" />
      </Steps>
    </div>
  );
}

export default App;

