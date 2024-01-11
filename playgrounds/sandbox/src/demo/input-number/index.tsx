import { Demo } from '../wrapper'
import Basic from './basic'
import Format from './format'
import Mode from './mode'
import Precision from './precision'
import StrictMode from './strictMode'
import Suffix from './suffix'
export default function InputNumberDemo() {
  return (
    <>
      <Demo name="Basic">
        <Basic />
      </Demo>
      <Demo name="Format">
        <Format />
      </Demo>
      <Demo name="Mode">
        <Mode />
      </Demo>
      <Demo name="Precision">
        <Precision />
      </Demo>
      <Demo name="StrictMode">
        <StrictMode />
      </Demo>
      <Demo name="Suffix">
        <Suffix />
      </Demo>
    </>
  )
}
