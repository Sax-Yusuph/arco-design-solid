import { Link, Space } from '@arco-design/web-solid'
import { AiOutlineEdit } from 'solid-icons/ai'
import { Demo } from './wrapper'
export default function LinkDemo() {
  return (
    <>
      <Demo name="Basic">
        <Basic />
      </Demo>
      <Demo name="Disable Hover">
        <Hoverable />
      </Demo>
      <Demo name="Icon">
        <Icon />
      </Demo>
      <Demo name="Status">
        <Status />
      </Demo>
    </>
  )
}

const Basic = () => {
  return (
    <Space size={40}>
      <Link href="#"> Link </Link>
      <Link href="#" disabled>
        Link
      </Link>
    </Space>
  )
}

const Hoverable = () => {
  return (
    <Space size={40}>
      <Link hoverable={false}> Link </Link>
      <Link hoverable={false} status="error">
        Link
      </Link>
    </Space>
  )
}

const Icon = () => {
  return (
    <Space size={0} direction="vertical">
      <Space size="large">
        <Link href="#" icon>
          Hyperlinks
        </Link>
        <Link href="#" icon disabled>
          Hyperlinks
        </Link>
      </Space>
      <Space size="large">
        <Link href="#" icon={<AiOutlineEdit class="arco-icon" />}>
          Hyperlinks
        </Link>
        <Link href="#" icon={<AiOutlineEdit class="arco-icon" />} disabled>
          Hyperlinks
        </Link>
      </Space>
    </Space>
  )
}

const Status = () => {
  return (
    <div
      style={{
        display: 'grid',
        'grid-template-columns': 'repeat(2, 100px)',
        'grid-column-gap': '24px',
      }}
    >
      <Link href="#" status="error">
        Error Link
      </Link>
      <Link href="#" status="error" disabled>
        Error Link
      </Link>
      <Link href="#" status="success">
        Success Link
      </Link>
      <Link href="#" status="success" disabled>
        Success Link
      </Link>
      <Link href="#" status="warning">
        Warning Link
      </Link>
      <Link href="#" status="warning" disabled>
        Warning Link
      </Link>
    </div>
  )
}
