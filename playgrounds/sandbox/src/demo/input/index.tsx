import { Demo } from '../wrapper'
import Basic from './basic'
import MaxLength from './max-length'
import Password from './password'
import PrefixSufix from './prefix_suffix'
import Search from './search'
import SearchLoading from './search_loading'
import Status from './status'
import TextArea from './textarea'
import TextAreaAutoSize from './textarea_autosize'

export default function InputDemo() {
  return (
    <>
      <Demo name="Basic" description="Input content via mouse or keyboard.">
        <Basic />
      </Demo>

      <Demo name="Status" description="Different Input status.">
        <Status />
      </Demo>

      <Demo
        name="Prefix/Suffix"
        description="Add a prefix(suffix) in the input box by specifying prefix(suffix)."
      >
        <PrefixSufix />
      </Demo>

      <Demo name="Search Box" description="Input box with search button for content retrieval.">
        <Search />
      </Demo>

      <Demo
        name="Search Box with Loading"
        description="Through the loading property, you can set the search box to display loading when onSearch."
      >
        <SearchLoading />
      </Demo>

      <Demo
        name="Length Limit"
        description={`
				Set maxLength to limit the maximum number of words, and use showWordLimit to display word count statistics.

				Setting maxLength.errorOnly will not limit the number of words entered by the user, but if the maximum number of words is exceeded, an error status will be displayed.

				It is worth noting that if showWordLimit is configured, then you cannot use suffix.
			`}
      >
        <MaxLength />
      </Demo>

      <Demo name="Password" description="Used for password input.">
        <Password />
      </Demo>

      <Demo
        name="Textarea"
        description={`
				A textarea input example.
				`}
      >
        <TextArea />
      </Demo>

      <Demo
        name="Autosize Textarea"
        description={`Specify autoSize, the text field will automatically adjust the height of the text field according to the input text. If you specify autoSize={{ minRows, maxRows }}, you can also specify the minimum/maximum number of rows.					`}
      >
        <TextAreaAutoSize />
      </Demo>
    </>
  )
}
