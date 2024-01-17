import { createMemo, mergeProps, splitProps } from 'solid-js'
import cs from '../../utils/classNames'
import { pickDataAttributes } from '../../utils/util'
import { useConfigContext } from '../config-provider'
import { StepProvider } from './context'
import type { StepsProps } from './interface'
import Step from './step'

const defaultProps: StepsProps = {
  current: 1,
  type: 'default',
  size: 'default',
  direction: 'horizontal',
  labelPlacement: 'horizontal',
}

function Steps(baseProps: StepsProps) {
  const ctx = useConfigContext()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.Steps, baseProps)
  const [props, restProps] = splitProps(mergedProps, [
    'class',
    'style',
    'children',
    'current',
    'status',
    'onChange',
    'type',
    'size',
    'direction',
    'labelPlacement',
    'customDot',
    'lineless',
  ])

  const prefixCls = ctx.getPrefixCls?.('steps')

  const innerLabelPlacement = createMemo(() => {
    let innerLabelPlacement = props.labelPlacement

    if (props.type === 'dot') {
      innerLabelPlacement = props.direction === 'vertical' ? 'horizontal' : 'vertical'
    }
    if (props.type === 'navigation') {
      innerLabelPlacement = 'horizontal'
    }

    return innerLabelPlacement
  })

  const innerDirection = createMemo(() => {
    let innerDirection = props.direction
    if (props.type === 'navigation' || props.type === 'arrow') {
      innerDirection = 'horizontal'
    }

    return innerDirection
  })

  return (
    <StepProvider
      customDot={props.customDot}
      onChange={props.onChange}
      lineless={props.lineless}
      direction={innerDirection()}
      labelPlacement={innerLabelPlacement()}
      type={props.type}
      prefixCls={prefixCls}
      status={props.status}
      current={props.current}
    >
      <div
        {...pickDataAttributes(restProps)}
        ref={restProps.ref}
        style={props.style}
        class={cs(
          prefixCls,
          `${prefixCls}-${innerDirection()}`,
          `${prefixCls}-label-${innerLabelPlacement()}`,
          `${prefixCls}-size-${props.size}`,
          {
            [`${prefixCls}-change-onclick`]: typeof props.onChange === 'function',
            [`${prefixCls}-mode-${props.type}`]: props.type !== 'default',
            [`${prefixCls}-lineless`]: props.lineless,
            [`${prefixCls}-rtl`]: ctx.rtl,
          },
          props.class,
        )}
      >
        {props.children}
      </div>
    </StepProvider>
  )
}

const StepsComponent = Steps as typeof Steps & {
  Step: typeof Step
}

StepsComponent.Step = Step

export default StepsComponent

export type { StepsProps }
