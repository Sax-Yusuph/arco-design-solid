import { Demo } from '../wrapper'
import Basic from './basic'
import Rows from './rows'

export default function SkeletonDemo() {
  return (
    <>
      <Demo name="Basic" description="Basic usage of skeleton screen.">
        <Basic />
      </Demo>

      <Demo name="Use in Paragraph" description="Set the number of text lines and text width.">
        <Rows />
      </Demo>
    </>
  )
}
