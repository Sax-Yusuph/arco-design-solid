import { Demo } from '../wrapper'
import Basic from './basic'
import CustomRender from './custom_render'
import Direction from './direction'
import Icon from './icon'
import RadioButton from './radio_button'
import RadioGroup from './radio_group'
import Size from './size'

export default function RadioDemo() {
  return (
    <>
      <Demo name="Basic">
        <Basic />
      </Demo>
      <Demo name="CustomRender">
        <CustomRender />
      </Demo>
      <Demo name="Direction">
        <Direction />
      </Demo>
      <Demo name="Icon">
        <Icon />
      </Demo>
      <Demo name="RadioGroup">
        <RadioGroup />
      </Demo>
      <Demo name="RadioButton">
        <RadioButton />
      </Demo>
      <Demo name="Size">
        <Size />
      </Demo>
    </>
  )
}
