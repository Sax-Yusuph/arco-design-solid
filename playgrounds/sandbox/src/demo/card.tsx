import { Avatar, Card, Link, Space } from '@arco-design/web-solid'
import {
	AiOutlineArrowRight,
	AiOutlineLike,
	AiOutlineMore,
	AiOutlineShareAlt,
} from 'solid-icons/ai'
import { Index, ParentProps } from 'solid-js'
import { Demo } from './wrapper'
export default function CardDemo() {
  return (
    <Space direction="vertical">
      <Demo name="Basic">
        <Basic />
      </Demo>
      <Demo name="CardGrid">
        <CardGrid />
      </Demo>
      <Demo name="Hoverable">
        <Hoverable />
      </Demo>
      <Demo name="InnerCard">
        <InnerCard />
      </Demo>
      <Demo name="CardMeta">
        <CardMeta />
      </Demo>
      <Demo name="NoBorder">
        <NoBorder />
      </Demo>
      <Demo name="WithContentOnly">
        <WithContentOnly />
      </Demo>
      <Demo name="WithActions">
        <WithActions />
      </Demo>
    </Space>
  )
}

const Basic = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Card style={{ width: '360px' }} title="Arco Card" extra={<Link>More</Link>}>
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around
        the world. Toutiao started out as a news recommendation engine and gradually evolved into a
        platform delivering content in various formats.
      </Card>
    </div>
  )
}

const Grid = Card.Grid

const CardGrid = () => {
  const arr = new Array(7).fill(null)
  const secondArr = new Array(2).fill(null)
  return (
    <Card bordered={false} style={{ width: '100%' }}>
      <Index each={arr}>
        {(_, index) => {
          const hoverable = index % 2 === 0
          return (
            <Grid
              hoverable={hoverable}
              style={{
                width: '25%',
              }}
            >
              <Card
                class="card-demo-in-grid"
                style={{ width: '100%' }}
                title="Arco Card"
                extra={<Link>More</Link>}
                bordered={false}
              >
                <Index each={secondArr}>
                  {() => (
                    <p style={{ margin: 0 }}>
                      {hoverable ? 'Card allow to hover' : 'Card content'}
                    </p>
                  )}
                </Index>
              </Card>
            </Grid>
          )
        }}
      </Index>
    </Card>
  )
}

const Hoverable = () => {
  return (
    <Space>
      <Card style={{ width: '360px' }} title="Arco Card" hoverable extra={<Link>More</Link>}>
        Card content
        <br />
        Card content
      </Card>

      <Card
        style={{ width: '360px' }}
        class="card-custom-hover-style"
        title="Custom hover style"
        hoverable
        extra={<Link>More</Link>}
      >
        Card content <br /> Card content
      </Card>
    </Space>
  )
}

const InnerCard = () => {
  return (
    <Card title="Arco Card">
      <Card style={{ 'margin-bottom': '20px' }} title="Inner Card Title" extra={<Link>More</Link>}>
        Inner Card Content
      </Card>
      <Card title="Inner Card Title" extra={<Link>More</Link>}>
        Inner Card Content
      </Card>
    </Card>
  )
}

const Meta = Card.Meta
const CardMeta = () => {
  return (
    <Card
      hoverable
      style={{ width: '360px' }}
      cover={
        <div style={{ height: '204px', overflow: 'hidden' }}>
          <img
            style={{ width: '100%', transform: 'translateY(-20px)' }}
            alt="dessert"
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </div>
      }
    >
      <Meta
        title="Card Title"
        description={
          <>
            Card content <br /> Card content
          </>
        }
      />
    </Card>
  )
}

const NoBorder = () => {
  return (
    <Space
      style={{
        padding: '40px',
        backgroundColor: 'var(--color-fill-2)',
      }}
      size="large"
    >
      <Card style={{ width: '360px' }} title="Arco Card" extra={<Link>More</Link>} bordered={false}>
        Card content
        <br />
        Card content
      </Card>
      <Card
        style={{ width: '360px' }}
        title="Hover me"
        hoverable
        extra={<Link>More</Link>}
        bordered={false}
      >
        Card content
        <br />
        Card content
      </Card>
    </Space>
  )
}

const Content = ({ children }: ParentProps) => {
  return (
    <Space
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Space>
        <Avatar
          style={{
            backgroundColor: '#165DFF',
          }}
          size={28}
        >
          A
        </Avatar>
        <p>Username</p>
      </Space>
      {children}
    </Space>
  )
}

const WithContentOnly = () => {
  return (
    <>
      <Card hoverable style={{ width: 360, marginBottom: 20 }}>
        <Content>
          <Link>More</Link>
        </Content>
      </Card>
      <Card className="card-with-icon-hover" hoverable style={{ width: 360 }}>
        <Content>
          <span class="icon-hover">
            <AiOutlineArrowRight
              style={{
                cursor: 'pointer',
              }}
            />
          </span>
        </Content>
      </Card>
    </>
  )
}

const WithActions = () => {
  return (
    <Card
      className="card-with-icon-hover"
      style={{ width: 360 }}
      cover={
        <div style={{ height: '204px', overflow: 'hidden' }}>
          <img
            style={{ width: '100%', transform: 'translateY(-20px)' }}
            alt="dessert"
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
          />
        </div>
      }
      actions={[
        <span class="icon-hover">
          <AiOutlineLike />
        </span>,
        <span class="icon-hover">
          <AiOutlineShareAlt />
        </span>,
        <span class="icon-hover">
          <AiOutlineMore />
        </span>,
      ]}
    >
      <Meta
        avatar={
          <Space>
            <Avatar size={24}>A</Avatar>
            <p>Username</p>
          </Space>
        }
        title="Card Title"
        description="This is the description"
      />
    </Card>
  )
}
