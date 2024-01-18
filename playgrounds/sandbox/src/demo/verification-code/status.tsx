import { Space, VerificationCode } from '@arco-design/web-solid'

const App = () => {
  return (
    <div>
      <Space>
        <div style={{ width: '80px' }}>
          <p class="arco-typography">Disabled</p>
        </div>
        <VerificationCode defaultValue={'123456'} disabled style={{ width: '300px' }} />
      </Space>
      <br />
      <br />
      <Space>
        <div style={{ width: '80px' }}>
          <p class="arco-typography">ReadOnly</p>
        </div>
        <VerificationCode defaultValue={'123456'} readOnly style={{ width: '300px' }} />
      </Space>
      <br />
      <br />
      <Space>
        <div style={{ width: '80px' }}>
          <p class="arco-typography">Error</p>
        </div>
        <VerificationCode status="error" style={{ width: '300px' }} />
      </Space>
    </div>
  )
}

export default App
