import { Button, Radio, Space } from '@arco-design/web-solid'
import { For } from 'solid-js'

const App = () => {
  return (
    <div>
      <div style={{ 'margin-bottom': '20px' }}>
        <Radio.Group defaultValue={'Beijing'} name="button-radio-group">
          <For each={['Beijing', 'Shanghai', 'Guangzhou']}>
            {item => {
              return (
                <Radio value={item}>
                  {({ checked }) => {
                    return (
                      <Button tabIndex={-1} shape="round" type={checked ? 'primary' : 'default'}>
                        {item}
                      </Button>
                    )
                  }}
                </Radio>
              )
            }}
          </For>
        </Radio.Group>
      </div>

      <Radio.Group name="card-radio-group">
        <For each={[1, 2]}>
          {item => {
            return (
              <Radio value={item}>
                {({ checked }) => {
                  return (
                    <Space
                      align="start"
                      class={`custom-radio-card ${checked ? 'custom-radio-card-checked' : ''}`}
                    >
                      <div class={'custom-radio-card-mask'}>
                        <div class={'custom-radio-card-mask-dot'}></div>
                      </div>
                      <div>
                        <div class={'custom-radio-card-title'}>Radio Card {item}</div>
                        <p>this is a text</p>
                      </div>
                    </Space>
                  )
                }}
              </Radio>
            )
          }}
        </For>
      </Radio.Group>
    </div>
  )
}

export default App
