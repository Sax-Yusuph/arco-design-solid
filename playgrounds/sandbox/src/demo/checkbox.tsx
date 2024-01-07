import { Button, Checkbox, Space } from '@arco-design/web-solid'
import { Show, createSignal } from 'solid-js'
import { Demo } from './wrapper'

export default function CheckboxDemo() {
  return (
    <Space direction="vertical" size="large">
      <Demo name="Basic">
        <Basic />
      </Demo>
      <Demo name="Check All">
        <CheckAll />
      </Demo>
      <Demo name="Group">
        <Group />
      </Demo>

      {/* <Demo name="Controlled">
        <Controlled />
      </Demo> */}
    </Space>
  )
}
const Basic = () => {
  return (
    <div>
      <Checkbox>Checkbox</Checkbox>
    </div>
  )
}

const CheckboxGroup = Checkbox.Group
const options = ['Option 1', 'Option 2', 'Option 3']

function CheckAll() {
  const [indeterminate, setIndeterminate] = createSignal(true)
  const [checkAll, setCheckAll] = createSignal(false)
  const [value, setValue] = createSignal([0, 1])

  function onChangeAll(checked: boolean) {
    if (checked) {
      setIndeterminate(false)
      setCheckAll(true)
      setValue([0, 1, 2])
    } else {
      setIndeterminate(false)
      setCheckAll(false)
      setValue([])
    }
  }

  function onChange(checkList: number[]) {
    setIndeterminate(!!(checkList.length && checkList.length !== options.length))
    setCheckAll(!!(checkList.length === options.length))
    setValue(checkList)
  }

  return (
    <div>
      <div style={{ 'margin-bottom': '16px' }}>
        <Checkbox onChange={onChangeAll} checked={checkAll()} indeterminate={indeterminate()}>
          <Show when={checkAll()} fallback={'Check All'}>
            unCheck All
          </Show>
        </Checkbox>
      </div>
      <CheckboxGroup
        value={value}
        options={options.map((x, i) => ({
          label: x,
          value: i,
        }))}
        onChange={onChange}
      />
    </div>
  )
}

function Controlled() {
  const [checked, setChecked] = createSignal(false)

  return (
    <div>
      <Space size={40}>
        <Checkbox checked={checked()}>Checkbox</Checkbox>
        <Checkbox checked={checked()} disabled>
          disabled Checkbox
        </Checkbox>
      </Space>
      <div style={{ 'margin-top': '30px' }}>
        <Button
          type="primary"
          onClick={() => {
            setChecked(p => !p)
          }}
        >
          {checked() ? 'unCheck' : 'Check'}
        </Button>
      </div>
    </div>
  )
}

const opts = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
    disabled: true,
  },
  {
    label: 'Option 3',
    value: '3',
  },
  {
    label: 'Option 4',
    value: '4',
  },
]

const Group = () => {
  return (
    <div>
      <CheckboxGroup
        options={['Option A', 'Option B', 'Option C']}
        style={{ display: 'block', marginBottom: 16 }}
      />

      <CheckboxGroup
        options={opts}
        defaultValue={['1', '3']}
        style={{ display: 'block', marginBottom: 20 }}
      />

      <CheckboxGroup direction="vertical" options={['Option A', 'Option B', 'Option C']} />
    </div>
  )
}
