import { VerificationCode, } from '@arco-design/web-solid'

const App = () => {
  return (
    <div>
      <VerificationCode
        defaultValue="123"
        masked
        style={{ width: '300px' }}
        onChange={v => {
          console.log(v)
        }}
        onFinish={v => {
          alert('onFinish: ' + v)
        }}
      />
    </div>
  )
}

export default App
