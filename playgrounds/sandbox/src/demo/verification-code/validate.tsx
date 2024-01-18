import { VerificationCode } from '@arco-design/web-solid'

const App = () => {
  return (
    <div>
      <div style={{ width: '200px' }}>
        <p class='arco-typography'>Only numbers can be entered: </p>
      </div>
      <VerificationCode
        style={{ width: '300px' }}
        defaultValue="123456"
        validate={({ inputValue }) => {
          return /^\d*$/.test(inputValue) ? inputValue : false
        }}
      />
      <br />
      <br />

      <div style={{ width: '200px' }}>
        <p class='arco-typography'>Only `a-z` can be entered: </p>
      </div>

      <VerificationCode
        style={{ width: '300px' }}
        defaultValue="abcdef"
        validate={({ inputValue }) => {
          return /^[a-zA-Z]*$/.test(inputValue) ? inputValue.toLowerCase() : false
        }}
      />
    </div>
  )
}

export default App
