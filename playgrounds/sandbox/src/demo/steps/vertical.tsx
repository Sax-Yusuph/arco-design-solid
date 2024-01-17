import { Button, Divider, Steps } from '@arco-design/web-solid'
import { AiOutlineLeft, AiOutlineRight } from 'solid-icons/ai'
import { createSignal } from 'solid-js'
const Step = Steps.Step

function App() {
  const [current, setCurrent] = createSignal(1)

  return (
    <div
      style={{
        display: 'flex',
        'max-width': '780px',
        padding: '40px',
        background: 'var(--color-fill-2)',
      }}
    >
      <div
        style={{
          background: 'var(--color-bg-2)',
          padding: '24px',
          height: '272px',
          'box-sizing': 'border-box',
        }}
      >
        <Steps direction="vertical" current={current()} style={{ width: '170px' }}>
          <Step title="Succeeded" description="This is a description" />
          <Step title="Processing" description="This is a description" />
          <Step title="Pending" description="This is a description" />
        </Steps>
      </div>
      <Divider type="vertical" style={{ display: 'block', height: 'auto' }} />
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
        height: '272px',
        'text-align': 'center',
        background: 'var(--color-bg-2)',
        color: '#C2C7CC',
      }}
    >
      <div style={{ 'line-height': '200px' }}>Step{props.step} Content</div>

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
