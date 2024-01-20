import { Index, mergeProps } from 'solid-js'
import cs from '../../utils/classNames'
import { useConfigContext } from '../config-provider'
import InputComponent from '../input/input-element'
import type { VerificationCodeProps } from './interface'
import useVerificationCode from './use-verification-code'

const defaultProps = {
  length: 6,
}

export function VerificationCodeComponent(baseProps: VerificationCodeProps) {
  const ctx = useConfigContext()
  const props = mergeProps(defaultProps, ctx.componentConfig?.VerificationCode, baseProps)

  const { size, separator, status, masked, disabled } = props
  const [fullStringValue, filledValues, { getInputProps, setInputList }] =
    useVerificationCode(props)

  const prefix = ctx.getPrefixCls?.('verification-code')
  const prefixInput = ctx.getPrefixCls?.('input')

  return (
    <div
      class={cs(`${prefix}`, props.className, {
        [`${prefix}-rtl`]: ctx.rtl,
      })}
      style={props.style}
    >
      <Index each={filledValues}>
        {(value, index) => {
          const { onInput, onPaste, onKeyDown, onClick } = getInputProps(index)

          return (
            <>
              <InputComponent
                value={filledValues[index]}
                disabled={props.disabled}
                readOnly={props.readOnly}
                class={cs(prefixInput, `${prefix}-input`, {
                  [`${prefixInput}-size-${size}`]: size,
                  [`${prefixInput}-${status}`]: status,
                  [`${prefixInput}-disabled`]: disabled,
                  [`${prefixInput}-rtl`]: ctx.rtl,
                })}
                ref={node => {
                  setInputList(index, node)
                }}
                onClick={!props.readOnly ? onClick : undefined}
                onPaste={!props.readOnly ? onPaste : undefined}
                onKeyDown={!props.readOnly ? onKeyDown : undefined}
                onInput={
                  !props.readOnly
                    ? inputValue => {
                        if (!props.validate) {
                          return onInput(inputValue)
                        }

                        const result = props?.validate({
                          inputValue,
                          index: index,
                          value: fullStringValue()!,
                        })

                        if (result === false) return
                        onInput(typeof result === 'string' ? result : inputValue)
                      }
                    : undefined
                }
                type={masked ? 'password' : 'text'}
              />
              {separator?.({ index, character: value()! })}
            </>
          )
        }}
      </Index>
    </div>
  )
}

export default VerificationCodeComponent
