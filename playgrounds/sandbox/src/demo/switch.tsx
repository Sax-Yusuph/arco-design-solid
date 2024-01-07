import { Space, Switch } from '@arco-design/web-solid'
import { AiOutlineCheck, AiOutlineClose } from 'solid-icons/ai'
import { Demo } from './wrapper'

export default function SwitchDemo() {
  return (
    <Space direction="vertical" size="large">
      <Demo name="Basic">
        <Basic />
      </Demo>
      <Demo name="CheckedText">
        <CheckedText />
      </Demo>
      <Demo name="Disabled">
        <Disabled />
      </Demo>
      <Demo name="Icon">
        <Icon />
      </Demo>
      <Demo name="Loading">
        <Loading />
      </Demo>
      <Demo name="Size">
        <Size />
      </Demo>
      <Demo name="Type">
        <Type />
      </Demo>
    </Space>
  )
}

const Basic = () => {
  return <Switch />
}

const CheckedText = () => {
  return (
    <Space size="large">
      <Switch checkedText="ON" uncheckedText="OFF" />
      <Switch checkedText="1" uncheckedText="0" type="round" defaultChecked />
      <Switch
        checkedText={<AiOutlineCheck class="arco-icon" />}
        uncheckedText={<AiOutlineClose class="arco-icon" />}
        defaultChecked
      />
    </Space>
  )
}

const Disabled = () => {
  return (
    <Space size="large">
      <Switch disabled />
      <Switch checked disabled />
      <Switch type="round" disabled />
      <Switch type="round" checked disabled />
      <Switch type="line" disabled />
      <Switch type="line" checked disabled />
    </Space>
  )
}

const Icon = () => {
  return (
    <Space size="large">
      <Switch
        checkedIcon={<AiOutlineCheck class="arco-icon" />}
        uncheckedIcon={<AiOutlineClose class="arco-icon" />}
        defaultChecked
      />
      <Switch
        type="round"
        checkedIcon={<AiOutlineCheck class="arco-icon" />}
        uncheckedIcon={<AiOutlineClose class="arco-icon" />}
        defaultChecked
      />
      <Switch
        type="line"
        checkedIcon={<AiOutlineCheck class="arco-icon" />}
        uncheckedIcon={<AiOutlineClose class="arco-icon" />}
        defaultChecked
      />
    </Space>
  )
}

const Loading = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Switch loading defaultChecked />
        <Switch loading />
        <Switch loading type="round" defaultChecked />
        <Switch loading type="round" />
        <Switch loading type="line" defaultChecked />
        <Switch loading type="line" />
      </Space>
      <Space size="large">
        <Switch loading size="small" defaultChecked />
        <Switch loading size="small" />
        <Switch loading size="small" type="round" defaultChecked />
        <Switch loading size="small" type="round" />
        <Switch loading size="small" type="line" defaultChecked />
        <Switch loading size="small" type="line" />
      </Space>
    </Space>
  )
}

const Size = () => {
  return (
    <Space size="large">
      <Switch />
      <Switch size="small" />
      <Switch type="round" />
      <Switch size="small" type="round" />
      <Switch type="line" />
      <Switch size="small" type="line" />
    </Space>
  )
}

const Type = () => {
  return (
    <Space size="large">
      <Switch />
      <Switch type="round" />
      <Switch type="line" />
    </Space>
  )
}
