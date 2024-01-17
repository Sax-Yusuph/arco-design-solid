import { Button, Steps } from '@arco-design/web-solid'
import { AiOutlineLeft, AiOutlineRight } from 'solid-icons/ai'
import { createSignal } from 'solid-js'

const Step = Steps.Step

function App() {
  const [current, setCurrent] = createSignal(1)

  return (
    <div
      style={{
        'max-width': '780px',
      }}
    >
      <Steps current={current()}>
        <Step title="Succeeded" />
        <Step title="Processing" />
        <Step title="Pending" />
      </Steps>
      <Content
        step={current()}
        current={current()}
        prev={() => setCurrent(p => p - 1)}
        next={() => setCurrent(p => p + 1)}
      />
    </div>
  )
}

export default App

function Content(props: { step: number; current: number; prev: () => void; next: () => void }) {
  return (
    <div
      style={{
        width: '100%',
        height: '200px',
        'text-align': 'center',
        background: 'var(--color-bg-2)',
        color: '#C2C7CC',
      }}
    >
      <div style={{ 'line-height': '160px' }}>Step{props.step} Content</div>

      <div>
        <Button
          type="secondary"
          disabled={props.current <= 1}
          onClick={props.prev}
          style={{ 'padding-left': '8px' }}
        >
          <AiOutlineLeft class="arco-icon" />
          Back
        </Button>
        <Button
          disabled={props.current >= 3}
          onClick={props.next}
          style={{ 'margin-left': '20px', 'padding-right': '8px' }}
          type="primary"
        >
          Next
          <AiOutlineRight class="arco-icon" />
        </Button>
      </div>
    </div>
  )
}
