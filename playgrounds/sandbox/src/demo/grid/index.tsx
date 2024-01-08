import { Demo } from '../wrapper'
import Adaptation from './adaptation'
import AdaptationObject from './adaptation_object'
import Basic from './basic'
import Flex from './flex'
import FlexAlign from './flex-align'
import FlexJustify from './flex-justify'
import GridLayout from './grid'
import GridResponsive from './grid-responsive'
import Gutter from './gutter'
import Offset from './offset'
import Order from './order'
import PushPull from './push_pull'
export default function GridDemo() {
  return (
    <>
      <Demo name="Basic" description="The basic usage of Grid.">
        <Basic />
      </Demo>

      <Demo name="Offset of Col" description="Specify offset to justify the padding of Col.">
        <Offset />
      </Demo>

      <Demo name="Push Pull" description="Specify push or pull to sort the grid.">
        <PushPull />
      </Demo>

      <Demo
        name="Interval of Grid"
        description="By specifying gutter on Row, the area interval of the grid can be changed."
      >
        <Gutter />
      </Demo>

      <Demo name="Horizontal layout" description="Use justify to customize horizontal layout.">
        <FlexJustify />
      </Demo>

      <Demo name="Vertical layout" description="Use align to customize vertical layout.">
        <FlexAlign />
      </Demo>

      <Demo name="Order" description="Sort items by order.">
        <Order />
      </Demo>

      <Demo
        name="Responsive layout"
        description="Six preset sizes are available: xs, sm, md, lg, xl and xxl."
      >
        <AdaptationObject />
      </Demo>

      <Demo
        name="Advanced responsive layout"
        description={`
				The span, offset, order, pull, push properties can be used in xs, sm, md, lg, xl, xxl objects.
        For example, xs={8} is equivalent to xs={{ span: 8 }}.
				Col
				`}
      >
        <Adaptation />
      </Demo>

      <Demo
        name="Flex"
        description="By setting the flex property of the Col component, you can configure the flex layout arbitrarily."
      >
        <Flex />
      </Demo>

      <Demo
        name="Grid Layout"
        description="A layout component implemented by CSS-based Grid layout, supports folding, and can set suffix nodes, which will always be displayed at the end of a line."
      >
        <GridLayout />
      </Demo>

      <Demo
        name="Responsive Grid Layout"
        description="The responsive configuration format of the Grid component is { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6, xxxl: 7 }."
      >
        <GridResponsive />
      </Demo>
    </>
  )
}
