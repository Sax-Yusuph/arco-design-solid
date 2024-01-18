import { Demo } from '../wrapper'
import Basic from './basic'
import Mask from './mask'
import Separator from './seperator'
import Status from './status'
import Validate from './validate'

export default function VerificationCodeDemo() {
  return (
    <>
      <Demo name="Basic">
        <Basic />
      </Demo>
      <Demo name="Mask">
        <Mask />
      </Demo>
      <Demo name="Separator">
        <Separator />
      </Demo>
      <Demo name="Status">
        <Status />
      </Demo>
      <Demo name="Validate">
        <Validate />
      </Demo>
    </>
  )
}
