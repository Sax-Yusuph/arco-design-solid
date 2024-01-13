import { Demo } from '../wrapper'
import Result403 from './403'
import Result404 from './404'
import Result500 from './500'
import All from './all'
import Basic from './basic'
import Error from './error'
import Icon from './icon'
import Info from './info'
import Warning from './warning'

export default function ResultDemo() {
  return (
    <>
      <Demo name="Success" description="Show successful results.">
        <Basic />
      </Demo>

      <Demo name="Info" description="Show processing results.">
        <Info />
      </Demo>

      <Demo name="Warning" description="The result of the warning.">
        <Warning />
      </Demo>

      <Demo name="Error" description="Show failed results.">
        <Error />
      </Demo>

      <Demo name="403" description="You are not authorized to access this page.">
        <Result403 />
      </Demo>

      <Demo name="404" description={`The page does not exist.`}>
        <Result404 />
      </Demo>

      <Demo name="500" description="Something went wrong on server.">
        <Result500 />
      </Demo>

      <Demo name="Custom icon" description="Custom icon">
        <Icon />
      </Demo>

      <Demo
        name="All features"
        description="All features"
      >
        <All />
      </Demo>
    </>
  )
}
