import { Index, JSX } from 'solid-js'
import { isNumber } from '../../utils/is'
import { toPx } from '../../utils/util'
import { useConfigContext } from '../config-provider'

export interface DotProps {
  size?: JSX.CSSProperties['font-size']
}

export default function DotLoading(props: DotProps) {
  const ctx = useConfigContext()

  const prefixCls = `${ctx.getPrefixCls?.('spin')}-dot`

  const dotStyle = {
    width: props.size,
    height: props.size,
  }

  const sizeNumber = props.size ? parseInt(String(props.size)) : 0

  return (
    <div
      class={`${prefixCls}-list`}
      style={{
        height: props.size,
        width: toPx(isNumber(sizeNumber) && sizeNumber > 0 ? sizeNumber * 7 : ''),
      }}
    >
      <Index each={[...new Array(5)]}>
        {(_, index) => <div class={prefixCls} style={dotStyle} />}
      </Index>
    </div>
  )
}
