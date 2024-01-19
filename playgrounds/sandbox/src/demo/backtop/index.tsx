import { Demo } from '../wrapper'
import Basic from './basic'
import CustomButton from './custom_button'
export default function BacktopDemo() {
  return (
    <>
      <Demo name="Basic">
        <Basic />
      </Demo>

      <Demo name="CustomButton">
        <CustomButton />
      </Demo>
    </>
  )
}
