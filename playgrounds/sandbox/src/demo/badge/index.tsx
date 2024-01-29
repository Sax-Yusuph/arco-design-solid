import { Demo } from '../wrapper'

import Animate from './animate'
import Basic from './basic'
import Color from './color'
import Dot from './dot'
import MaxCount from './max_count'
import NoChildren from './no-children'
import Status from './status'
import Text from './text'

export default function BadgeDemo() {
  return (
    <>
      <Demo name="Basic">
        <Basic />
      </Demo>

      <Demo name="Standalone">
        <NoChildren />
      </Demo>

      <Demo name="Red Badge">
        <Dot />
      </Demo>

      <Demo name="Text">
        <Text />
      </Demo>

      <Demo name="MaxCount">
        <MaxCount />
      </Demo>

      <Demo name="Status">
        <Status />
      </Demo>

      <Demo name="Color">
        <Color />
      </Demo>
      <Demo name="Animated">
        <Animate />
      </Demo>
    </>
  )
}
