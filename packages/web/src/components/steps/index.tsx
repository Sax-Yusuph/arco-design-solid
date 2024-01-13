import { type } from 'remeda'
import { children, createMemo, mergeProps, splitProps } from 'solid-js'
import cs from '../../utils/classNames'
import { pickDataAttributes } from '../../utils/util'
import { useConfigContext } from '../config-provider'
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
      {React.Children.toArray(children)
        .filter(
          (child: ReactElement) =>
            child && child.type && (child.type as { displayName? }).displayName === 'Step',
        )
        .map((child: ReactElement, index) => {
          // step 的 index 从 1 开始
          index += 1
          if (child) {
            const childProps = {
              prefixCls,
              type,
              index,
              current,
              status: current === index ? status : undefined,
              customDot,
              labelPlacement: innerLabelPlacement,
              direction: innerDirection,
              onChange,
              lineless,
              ...child.props,
            }
            if (status === 'error' && current === index + 1) {
              childProps.nextStepError = true
            }
            return React.cloneElement(child, childProps)
          }
          return null
        })}
    </div>
  )
}

Steps.displayName = 'Steps'
Steps.Step = Step

export default Steps

export type { StepsProps }
