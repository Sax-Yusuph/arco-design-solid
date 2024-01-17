import { mergeRefs } from '@solid-primitives/refs'
import { Match, Show, Switch, createMemo, createSignal, mergeProps, onMount } from 'solid-js'
import { IconCheck, IconClose } from '../../icons'
import cs from '../../utils/classNames'
import { getIndex } from '../../utils/use-index'
import { useStepContext } from './context'
import type { StepProps } from './interface'

function IconNode(props: {
  currentStatus?: StepProps['status']
  type?: StepProps['type']
  index?: number
  icon?: StepProps['icon']
  prefixCls?: StepProps['icon']
}) {
  return (
    <div class={`${props.prefixCls}-item-icon`}>
      <Show when={props.type !== 'dot'}>
        <div class={`${props.prefixCls}-icon`}>
          <Switch fallback={props.index}>
            <Match when={props.icon}>{props.icon}</Match>
            <Match when={props.currentStatus === 'finish'}>
              <IconCheck />
            </Match>
            <Match when={props.currentStatus === 'error'}>
              <IconClose />
            </Match>
          </Switch>
        </div>
      </Show>
    </div>
  )
}

function Step(baseProps: StepProps) {
  const ctx = useStepContext()
  let ref: HTMLDivElement

  const [idx, setComputedIndex] = createSignal(0)
  const props = mergeProps(ctx, baseProps)

  onMount(() => {
    if (ref) {
      const index = getIndex(ref, `.arco-steps-item`)
      setComputedIndex(index + 1)
    }
  })

  const nextStepError = createMemo(() => props.status === 'error' && props.current === idx() + 1)

  function onClickStep(e: any) {
    if (!props.disabled) {
      // Step.onChange
      props.current !== idx() && props.onChange?.(idx(), props.id)
      // props.onClick
      props.onClick?.(idx(), props.id, e)
    }
  }

  const currentStatus = createMemo(() => {
    let status = props.current === idx() ? props.status : undefined
    const current = props.current!

    if (!status) {
      if (current < idx()) {
        status = 'wait'
      }

      if (current === idx()) {
        status = 'process'
      }

      if (current > idx()) {
        status = 'finish'
      }
    }

    return status
  })

  return (
    <div
      ref={mergeRefs(props.ref, el => (ref = el))}
      class={cs(
        `${props.prefixCls}-item`,
        `${props.prefixCls}-item-${currentStatus()}`,
        {
          [`${props.prefixCls}-item-custom`]: !!props.icon,
          [`${props.prefixCls}-item-next-error`]: nextStepError(),
          [`${props.prefixCls}-item-disabled`]: props.disabled,
          [`${props.prefixCls}-item-active`]: idx() === props.current,
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

      <Show when={props.type !== 'arrow'}>
        <Show
          when={props.customDot}
          fallback={
            <IconNode
              currentStatus={currentStatus()}
              index={idx()}
              type={props.type}
              icon={props.icon}
              prefixCls={props.prefixCls}
            />
          }
        >
          {props.customDot?.(
            <IconNode
              currentStatus={currentStatus()}
              index={idx()}
              type={props.type}
              icon={props.icon}
              prefixCls={props.prefixCls}
            />,
            {
              index: idx(),
              status: currentStatus()!,
              title: props.title,
              description: props.description,
            },
          )}
        </Show>
      </Show>

      <div class={`${props.prefixCls}-item-content`}>
        <div class={`${props.prefixCls}-item-title`}>{props.title}</div>
        <Show when={props.description}>
          <div class={`${props.prefixCls}-item-description`}>{props.description}</div>
        </Show>
      </div>
    </div>
  )
}

Step.displayName = 'Step'

export default Step

export type { StepProps }
