import { VerificationCode } from '@arco-design/web-solid'

const App = () => {
  return (
    <VerificationCode
      style={{ width: '300px' }}
      onChange={v => {
        // console.log(v)
      }}
      onFinish={v => {
        alert('onFinish: ' + v)
      }}
    />
  )
}

export default App
