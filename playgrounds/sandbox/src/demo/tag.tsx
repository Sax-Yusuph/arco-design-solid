import { Space, Switch, Tag } from '@arco-design/web-solid'
import {
	AiFillCheckCircle,
	AiOutlineFacebook,
	AiOutlineGithub,
	AiOutlineGitlab,
	AiOutlineStar,
	AiOutlineTwitter,
} from 'solid-icons/ai'
import { For, createSignal } from 'solid-js'
import { Demo } from './wrapper'

export default function TagDemo() {
  return (
    <Space direction="vertical" size="large">
      {/* <Demo name="Basic" description="Basic usage of tags.">
        <Basic />
      </Demo>
      <Demo name="Bordered" description="Through the prop `bordered` to display a bordered tag.">
        <Bordered />
      </Demo>
      <Demo
        name="Checkable"
        description="Through the prop `checkable`, the effect of clicking and selecting can be achieved."
      >
        <Checkable />
      </Demo>
      <Demo
        name="CloseAsync"
        description={`
				If onClose returns a Promise, the tag can be closed asynchronously and the loading effect will be displayed when it is not closed.
			`}
      >
        <CloseAsync />
      </Demo>
      <Demo
        name="Controlled"
        description="The `closable` attribute can be set to control whether the label can be closed, and the closed label can perform some post-closing operations through the `onClose` event. You can also control the display and hide of the label through the `visible` property."
      >
        <Controlled />
      </Demo> */}
      <Demo
        name="CustomColors"
        description="We provide a variety of label styles with preset colors, and set different colors through `color`. If the preset value cannot meet your needs, you can also set a custom color value in the `color` field."
      >
        <CustomColors />
      </Demo>
      {/* <Demo name="Icons" description="An icon can be added to the label by setting `icon`.">
        <Icon />
      </Demo>
      <Demo
        name="Sizes"
        description="Labels are divided into: small, medium, large, huge, you can choose the appropriate button size in different scenarios. The recommended and default size is 'medium'"
      >
        <Size />
      </Demo> */}
    </Space>
  )
}

const Basic = () => {
  return (
    <Space size="large">
      <Tag>Default</Tag>
      <Tag>Tag 1</Tag>
      <Tag>Tag 2</Tag>
      <Tag icon={<AiFillCheckCircle class="arco-icon" />}>Complete</Tag>
    </Space>
  )
}

const COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
]

const Bordered = () => {
  return (
    <Space wrap>
      <Tag bordered>Default</Tag>
      <For each={COLORS}>
        {color => (
          <Tag color={color} bordered>
            {color}
          </Tag>
        )}
      </For>
    </Space>
  )
}

const Checkable = () => {
  return (
    <Space size="large">
      <Tag checkable>Awesome</Tag>
      <Tag checkable color="red" defaultChecked>
        Toutiao
      </Tag>
      <Tag checkable color="arcoblue" defaultChecked>
        Lark
      </Tag>
    </Space>
  )
}

const CloseAsync = () => {
  return (
    <Tag
      closable
      onClose={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() >= 0.5) {
              resolve('done')
            } else {
              alert('Close failed')
              reject()
            }
          }, 3000)
        })
      }}
    >
      Tag 1
    </Tag>
  )
}

function Controlled() {
  const [visible, setVisible] = createSignal(true)

  function onClose() {
    setVisible(p => !p)
  }

  return (
    <div>
      <Tag closable visible={visible()} onClose={onClose} style={{ margin: '0 24px' }}>
        Tag
      </Tag>

      <Tag
        icon={<AiOutlineStar class="arco-icon" />}
        closable
        visible={visible()}
        onClose={onClose}
      >
        Tag
      </Tag>

      <div style={{ 'margin-top': '24px' }}>
        <Switch style={{ margin: '0 8px' }} size="small" checked={visible()} onChange={onClose} />
        <p>Toggle</p>
      </div>
    </div>
  )
}

const _COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
]
const COLORS_CUSTOM = [
  '#f53f3f',
  '#7816ff',
  '#00b42a',
  '#165dff',
  '#ff7d00',
  '#eb0aa4',
  '#7bc616',
  '#86909c',
  '#b71de8',
  '#0fc6c2',
  '#ffb400',
  '#168cff',
  '#ff5722',
]

const CustomColors = () => {
  return (
    <div>
      <For each={_COLORS}>
        {color => (
          <Tag closable color={color} style={{ margin: '0 16px 16px 0 ' }}>
            {color}
          </Tag>
        )}
      </For>
      <h3 style={{ color: 'var(--color-text-2)' }}>Custom Color</h3>
      <For each={COLORS_CUSTOM}>
        {color => (
          <Tag closable color={color} style={{ margin: '0 16px 16px 0 ' }}>
            {color}
          </Tag>
        )}
      </For>
    </div>
  )
}

const Icon = () => {
  return (
    <Space size="large">
      <Tag color="gray" icon={<AiOutlineGithub class="arco-icon" />}>
        Github
      </Tag>
      <Tag color="orangered" icon={<AiOutlineGitlab class="arco-icon" />}>
        Gitlab
      </Tag>
      <Tag color="blue" icon={<AiOutlineTwitter class="arco-icon" />}>
        Twitter
      </Tag>
      <Tag color="arcoblue" icon={<AiOutlineFacebook class="arco-icon" />}>
        Facebook
      </Tag>
    </Space>
  )
}

const Size = () => {
  return (
    <Space size="large">
      <Tag size="large" closable>
        Large
      </Tag>
      <Tag size="medium" closable>
        Medium
      </Tag>
      <Tag size="default" closable>
        default
      </Tag>
      <Tag size="small" closable>
        small
      </Tag>
    </Space>
  )
}
