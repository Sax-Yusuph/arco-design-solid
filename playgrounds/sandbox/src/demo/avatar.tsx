import { Avatar, Space } from '@arco-design/web-solid'

export default function AvatarDemo() {
  return (
    <>
      <Basic />
      <Group />
      <Size />
    </>
  )
}
const Basic = () => {
  return (
    <Space size="large">
      <Avatar style={{ 'background-color': '#3370ff' }}>A</Avatar>

      <Avatar style={{ 'background-color': '#14a9f8' }}>Arco</Avatar>
      <Avatar style={{ 'background-color': '#00d0b6' }}>Design</Avatar>
      <Avatar>
        <img
          alt="avatar"
          src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
      </Avatar>
    </Space>
  )
}

const AvatarGroup = Avatar.Group

const Group = () => {
  return (
    <div>
      <AvatarGroup style={{ margin: '10px' }} maxCount={2}>
        <Avatar style={{ 'background-color': '#7BC616' }}>A</Avatar>
        <Avatar style={{ 'background-color': '#14C9C9' }}>B</Avatar>
        <Avatar style={{ 'background-color': '#168CFF' }}>C</Avatar>
        <Avatar style={{ 'background-color': '#FF7D00' }}>Arco</Avatar>
        <Avatar style={{ 'background-color': '#FFC72E' }}>Design</Avatar>
      </AvatarGroup>
      <br />
      <AvatarGroup size={48} style={{ margin: '10px' }}>
        <Avatar style={{ 'background-color': '#7BC616' }}>A</Avatar>
        <Avatar style={{ 'background-color': '#14C9C9' }}>B</Avatar>
        <Avatar style={{ 'background-color': '#168CFF' }}>C</Avatar>
        <Avatar style={{ 'background-color': '#FF7D00' }}>Arco</Avatar>
        <Avatar style={{ 'background-color': '#FFC72E' }}>Design</Avatar>
      </AvatarGroup>
    </div>
  )
}

const Size = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Avatar size={64}>Arco</Avatar>
        <Avatar size={40}>Arco</Avatar>
        <Avatar size={32}>Arco</Avatar>
        <Avatar size={24}>Arco</Avatar>
      </Space>

      <Space size="large">
        <Avatar size={64} shape="square">
          Arco
        </Avatar>
        <Avatar size={40} shape="square">
          Arco
        </Avatar>
        <Avatar size={32} shape="square">
          Arco
        </Avatar>
        <Avatar size={24} shape="square">
          Arco
        </Avatar>
      </Space>
    </Space>
  )
}
