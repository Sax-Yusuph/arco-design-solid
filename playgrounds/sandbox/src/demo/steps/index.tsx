import { Demo } from '../wrapper'
import Arrow from './arrow'
import ArrowMini from './arrow-mini'
import Basic from './basic'
import ChangeStep from './change_step'
import Description from './description'
import Dot from './dot'
import Error from './error'
import LabelPlacement from './label-placement'
import Lineless from './lineless'
import Mini from './mini'
import Navigation from './navigation'
import OnChange from './onchange'
import Vertical from './vertical'

export default function StepsDemo() {
  return (
    <>
      <Demo name="Basic" description="Basic usage of the step bar component.">
        <Basic />
      </Demo>

      <Demo name="Small Step Bar" description="Small step bar can be displayed through size">
        <Mini />
      </Demo>

      <Demo name="Show Description" description="Use description to add description information.">
        <Description />
      </Demo>

      <Demo
        name="Label Position"
        description="Where to place the label, the default horizontal is placed on the right side of the icon, and the optional vertical is placed below the icon."
      >
        <LabelPlacement />
      </Demo>

      <Demo
        name="Steps Status"
        description="The error status is specified by the parameter status."
      >
        <Error />
      </Demo>

      <Demo name="Hidden Connection Lines" description="Set lineless to hide the connection line.">
        <Lineless />
      </Demo>

      <Demo name="Vertical Step Bar" description="Vertical step bar.">
        <Vertical />
      </Demo>

      <Demo
        name="Mini Arrow Step Bar"
        description="By specifying type:'arrow', size:'small', you can use mini-arrow type step bar. However, only horizontal step bar are supported. And description will be ignored."
      >
        <ArrowMini />
      </Demo>

      <Demo
        name="Arrow Step Bar"
        description="By specifying type:'arrow', you can use arrow type step bar. Note: Only horizontal step bar are supported."
      >
        <Arrow />
      </Demo>
      <Demo
        name="Switch Steps"
        description="You can jump to different steps by modifying the current parameter."
      >
        <ChangeStep />
      </Demo>

      <Demo
        name="Dotted Step Bar"
        description={`
				By specifying type: 'dot', you can use dotted step bar.
				Note: The label of the horizontal step bar can only be located below it, and the label of the vertical step bar can only be located to the right of it
				`}
      >
        <Dot />
      </Demo>

      <Demo
        name="Click to Switch Steps"
        description="After setting onChange, the step bar supports clicking to switch steps."
      >
        <OnChange />
      </Demo>

      <Demo name="Navigation Step Bar" description="Step bar of navigation type.">
        <Navigation />
      </Demo>
    </>
  )
}
