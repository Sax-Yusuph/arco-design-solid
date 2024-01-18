import { VerificationCode } from '@arco-design/web-solid'

const App = () => {
  return (
    <VerificationCode
      style={{ width: '400px' }}
      length={9}
      separator={({ index, character }) => {
        return (index + 1) % 3 || index > 7 ? null : '-'
      }}
    />
  )
}

export default App
