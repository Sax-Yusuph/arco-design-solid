import { Demo } from '../wrapper'
import Basic from './basic'
import Countup from './countUp'
import Countdown from './countdown'
import Loading from './loading'
import PrefixSuffix from './prefix_suffix'
import Time from './time'

export default function StatisticDemo() {
  return (
    <>
      <Demo name="Basic">
        <Basic />
      </Demo>

      <Demo name="Custom Style" description='This example shows the addition of prefix and suffix, and the style of displaying values can be customized.'>
        <PrefixSuffix />
      </Demo>

      <Demo
        name="Animation"
        description={`
			 With Statistic, you can make some interesting effects. For example, the value slowly becomes larger, making the display of the value more visual.
			 If you set countUp, the animation will be executed after the component is mounted.
			 If you want to control the animation by yourself, you can also get the instance through ref and execute ins.countUp()
		 `}
      >
        <Countup />
      </Demo>

      <Demo
        name="Countdown"
        description="Countdown component. You can use now to correct the initialization time.				"
      >
        <Countdown />
      </Demo>

      <Demo
        name="DateFormat"
        description="Time display. Use dayjs to format the time, format is the format of dayjs."
      >
        <Time />
      </Demo>

      <Demo name="Loading" description='You can control whether to display the loading status through loading.'>
        <Loading />
      </Demo>
    </>
  )
}
