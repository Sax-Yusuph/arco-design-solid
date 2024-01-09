import { Button, Empty, Space } from '@arco-design/web-solid'
import { AiOutlineExclamationCircle } from 'solid-icons/ai'
import { Demo } from './wrapper'

export default function EmptyDemo() {
  return (
    <Space direction="vertical" size="large">
      <Demo name="Basic">
        <Basic />
      </Demo>
      <Demo name="CustomIcon">
        <CustomIcon />
      </Demo>
      <Demo name="WithImage">
        <WithImage />
      </Demo>
    </Space>
  )
}
const Basic = () => {
  return <Empty />
}

const CustomIcon = () => {
  return (
    <Empty
      icon={
        <div
          style={{
            background: '#f2994b',
            display: 'inline-flex',
            'border-radius': '50%',
            width: '50px',
            height: '50px',
            'font-size': '30px',
            'align-items': 'center',
            color: 'white',
            'justify-content': 'center',
          }}
        >
          <AiOutlineExclamationCircle />
        </div>
      }
      description="No data, please reload!"
    />
  )
}

const WithImage = () => {
  return (
    <Empty
      imgSrc="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp"
      description={<Button type="primary">Refresh</Button>}
    />
  )
}
