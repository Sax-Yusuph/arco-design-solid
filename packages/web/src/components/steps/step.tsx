import { Show, createMemo } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { IconCheck, IconClose } from '../../icons'
import cs from '../../utils/classNames'
import { StepProps } from './interface'

function IconNode(props: {
  currentStatus?: StepProps['status']
  type?: StepProps['type']
  index?: number
  icon?: StepProps['icon']
  prefixCls?: StepProps['icon']
}) {
  if (props.type === 'dot') {
    return null
  }

  let content: any = props.index

  if (props.icon) {
    content = props.icon
  } else if (props.currentStatus === 'finish') {
    content = IconCheck
  } else if (props.currentStatus === 'error') {
    content = IconClose
  }

  return (
    <div class={`${props.prefixCls}-icon`}>
      <Dynamic component={content} />
    </div>
  )
}

function Step(props: StepProps) {
  const current = createMemo(() => props.current || 1)
  const index = createMemo(() => props.index || 1)

  function onClickStep(e: any) {
    if (!props.disabled) {
      // Step.onChange
      props.onChange && current() !== index() && props.onChange(index(), props.id)
      // props.onClick
      props.onClick && props.onClick(index(), props.id, e)
    }
  }

  const currentStatus = createMemo(() => {
    let s

    if (status) {
      s = status
    } else {
      if (current() < index()) {
        s = 'wait'
      }
      if (current() === index()) {
        s = 'process'
      }
      if (current() > index()) {
        s = 'finish'
      }
    }

    return s as StepProps['status']
  })

  const iconNodeWrapped = (
    <div class={`${props.prefixCls}-item-icon`}>
      <IconNode
        currentStatus={currentStatus()}
        index={index()}
        type={props.type}
        icon={props.icon}
        prefixCls={props.prefixCls}
      />
    </div>
  )

  const customDotElement = (
    <Show when={props.customDot} fallback={iconNodeWrapped}>
      {props.customDot?.(iconNodeWrapped, {
        index: index(),
        status: currentStatus()!,
        title: props.title,
        description: props.description,
      })}
    </Show>
  )

  return (
    <div
      ref={props.ref}
      class={cs(
        `${props.prefixCls}-item`,
        `${props.prefixCls}-item-${currentStatus}`,
        {
          [`${props.prefixCls}-item-custom`]: !!props.icon,
          [`${props.prefixCls}-item-next-error`]: props.nextStepError,
          [`${props.prefixCls}-item-disabled`]: props.disabled,
          [`${props.prefixCls}-item-active`]: index() === current(),
        },
        props.class,
      )}
      style={props.style}
      onClick={onClickStep}
    >
      <Show
        when={
          !props.lineless && (props.labelPlacement === 'vertical' || props.direction === 'vertical')
        }
      >
        <div class={`${props.prefixCls}-item-tail`} />
      </Show>

      <Show when={props.type !== 'arrow' && customDotElement}>
        <div class={`${props.prefixCls}-item-content`}>
          <div class={`${props.prefixCls}-item-title`}>{props.title}</div>
          <Show when={props.description}>
            <div class={`${props.prefixCls}-item-description`}>{props.description}</div>
          </Show>
        </div>
      </Show>
    </div>
  )
}

Step.displayName = 'Step'

export default Step

export type { StepProps }
