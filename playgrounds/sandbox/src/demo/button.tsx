import { Button, Space } from '@arco-design/web-solid'
import {
	AiFillStar,
	AiOutlineLeft,
	AiOutlineMessage,
	AiOutlineMore,
	AiOutlinePlus,
	AiOutlineRight,
	AiOutlineSetting,
	AiTwotoneDelete,
} from 'solid-icons/ai'
import { TbChevronDown } from 'solid-icons/tb'
import { Demo } from './wrapper'

export default function ButtonDemo() {
  return (
    <Space direction="vertical">
      <Demo name="Basic">
        <Basic />
      </Demo>
      <Demo name="Group">
        <Group />
      </Demo>
      <Demo name="Disabled">
        <Disabled />
      </Demo>
      <Demo name="Icon">
        <Icon />
      </Demo>
      <Demo name="Long">
        <Long />
      </Demo>
      <Demo name="Shape">
        <Shape />
      </Demo>
      <Demo name="Size">
        <Size />
      </Demo>
      <Demo name="Status">
        <Status />
      </Demo>
    </Space>
  )
}
const Basic = () => {
  return (
    <Space size="large">
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
    </Space>
  )
}

const ButtonGroup = Button.Group
const Group = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <ButtonGroup>
          <Button>Publish</Button>
          <Button icon={<TbChevronDown class="arco-icon" />} />
        </ButtonGroup>
        <ButtonGroup>
          <Button type="secondary">Publish</Button>
          <Button type="secondary" icon={<AiOutlineMore class="arco-icon" />} />
        </ButtonGroup>
      </Space>
      <ButtonGroup>
        <Button type="primary">Publish</Button>
        <Button type="primary" icon={<TbChevronDown class="arco-icon" />} />
      </ButtonGroup>
      <Space size="large">
        <ButtonGroup>
          <Button
            type="primary"
            icon={<AiOutlineLeft class="arco-icon" />}
            shape="round"
            style={{ padding: '0 8px' }}
          >
            Prev
          </Button>
          <Button type="primary" shape="round" style={{ padding: '0 8px' }}>
            Next
            <AiOutlineRight class="arco-icon" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button type="primary" icon={<AiFillStar class="arco-icon" />} />
          <Button type="primary" icon={<AiOutlineMessage class="arco-icon" />} />
          <Button type="primary" icon={<AiOutlineSetting class="arco-icon" />} />
        </ButtonGroup>
        <ButtonGroup>
          <Button type="primary" icon={<AiFillStar class="arco-icon" />}>
            Favorite
          </Button>
          <Button type="primary" icon={<AiOutlineSetting class="arco-icon" />}>
            Setting
          </Button>
        </ButtonGroup>
      </Space>
    </Space>
  )
}

const Disabled = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Button disabled type="primary">
          Primary
        </Button>
        <Button disabled type="secondary">
          Secondary
        </Button>
        <Button disabled type="dashed">
          Dashed
        </Button>
        <Button disabled type="outline">
          Outline
        </Button>
        <Button disabled type="text">
          Text
        </Button>
      </Space>
      <Space size="large">
        <Button disabled type="primary" status="danger">
          Primary
        </Button>
        <Button disabled type="secondary" status="danger">
          Secondary
        </Button>
        <Button disabled type="dashed" status="danger">
          Dashed
        </Button>
        <Button disabled type="outline" status="danger">
          Outline
        </Button>
        <Button disabled type="text" status="danger">
          Text
        </Button>
      </Space>
      <Space size="large">
        <Button disabled type="primary" status="warning">
          Primary
        </Button>
        <Button disabled type="secondary" status="warning">
          Secondary
        </Button>
        <Button disabled type="dashed" status="warning">
          Dashed
        </Button>
        <Button disabled type="outline" status="warning">
          Outline
        </Button>
        <Button disabled type="text" status="warning">
          Text
        </Button>
      </Space>
      <Space size="large">
        <Button disabled type="primary" status="success">
          Primary
        </Button>
        <Button disabled type="secondary" status="success">
          Secondary
        </Button>
        <Button disabled type="dashed" status="success">
          Dashed
        </Button>
        <Button disabled type="outline" status="success">
          Outline
        </Button>
        <Button disabled type="text" status="success">
          Text
        </Button>
      </Space>
    </Space>
  )
}

const Icon = () => {
  return (
    <Space size="large">
      <Button type="primary" icon={<AiOutlinePlus />} />
      <Button type="primary" icon={<AiTwotoneDelete />}>
        Delete
      </Button>
    </Space>
  )
}

const Long = () => {
  return (
    <Space
      style={{
        width: '360px',
        border: '1px solid var(--color-border)',
        'border-radius': '4px',
        padding: '20px',
      }}
      direction="vertical"
      size="large"
    >
      <Button type="primary" long>
        Primary
      </Button>
      <Button type="secondary" long>
        Secondary
      </Button>
      <Button type="dashed" long>
        Dashed
      </Button>
      <Button type="default" long>
        Default
      </Button>
      <Button type="text" long>
        Text
      </Button>
    </Space>
  )
}

const Shape = () => {
  return (
    <Space size="large">
      <Button type="primary" icon={<AiOutlinePlus />} />
      <Button shape="circle" type="primary" icon={<AiOutlinePlus />} />
      <Button shape="round" type="primary">
        Primary
      </Button>
      <Button type="primary">Primary</Button>
    </Space>
  )
}

const Size = () => {
  return (
    <Space size="large">
      <Button size="mini" type="primary">
        Mini
      </Button>
      <Button size="small" type="primary">
        Small
      </Button>
      <Button size="default" type="primary">
        Default
      </Button>
      <Button size="large" type="primary">
        Large
      </Button>
    </Space>
  )
}

const Status = () => {
  return (
    <div
      style={{
        display: 'grid',
        'grid-template-columns': 'repeat(4, 100px)',
        'grid-row-gap': '24px',
        'grid-column-gap': '24px',
      }}
    >
      <Button type="primary" status="warning">
        Warning
      </Button>
      <Button status="warning">Warning</Button>
      <Button type="outline" status="warning">
        Warning
      </Button>
      <Button type="text" status="warning">
        Warning
      </Button>

      <Button type="primary" status="danger">
        Danger
      </Button>
      <Button status="danger">Danger</Button>
      <Button type="outline" status="danger">
        Danger
      </Button>
      <Button type="text" status="danger">
        Danger
      </Button>

      <Button type="primary" status="success">
        Success
      </Button>
      <Button status="success">Success</Button>
      <Button type="outline" status="success">
        Success
      </Button>
      <Button type="text" status="success">
        Success
      </Button>
    </div>
  )
}
