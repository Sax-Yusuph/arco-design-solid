import { Demo } from '../wrapper'
import Basic from './basic'
import CustomIcon from './custom-icon'
import Delay from './delay'
import Dot from './dot'
import Size from './size'
import SpinComponent from './spin-component'
import Tip from './tip'

export default function SpinDemo() {
  return (
    <>
      <Demo name="Basic" description="A simple loading state.">
        <Basic />
      </Demo>

      <Demo
        name="Dot Indicator"
        description="The dot type indicator can be displayed by specifying the dot property."
      >
        <Dot />
      </Demo>

      <Demo
        name="As Container"
        description={`
				You can add loading status to any element. The container defaults to the inline-block layout. When you need to fill the parent container, you can set style={{ display:'block' }}.
			`}
      >
        <SpinComponent />
      </Demo>

      <Demo name="Tip" description="Use tip property to customize the tip when loading.">
        <Tip />
      </Demo>

      <Demo
        name="Delay"
        description="Use delay to delay the switch of loading status, which effectively avoids screen flicker during rapid state switching."
      >
        <Delay />
      </Demo>
      <Demo
        name="Custom Icon"
        description="By specifying icon, you can specify a custom icon as a loading component."
      >
        <CustomIcon />
      </Demo>

      <Demo name="Size" description="Set size to get different sizes of loading icons.">
        <Size />
      </Demo>
    </>
  )
}
