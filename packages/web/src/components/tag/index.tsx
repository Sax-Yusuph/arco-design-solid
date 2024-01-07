import { Show, createMemo, createSignal, mergeProps, splitProps } from 'solid-js'
import { IconClose, IconLoading } from '../../icons'
import cs from '../../utils/classNames'
import { createMergedValue } from '../../utils/store'
import useKeyboardEvent from '../../utils/use-keyboard'
import { toCSSObject } from '../../utils/util'
import IconHover from '../_class/icon-hover'
import { useConfigContext } from '../config-provider'
import type { TagProps } from './interface'

// 色板里的 12 个颜色
const COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
]

const defaultProps: TagProps = {
  size: 'default',
}

function Tag(baseProps: TagProps) {
  const ctx = useConfigContext()
  const getKeyboardEvents = useKeyboardEvent()
  const mergedProps = mergeProps(defaultProps, ctx.componentConfig?.Tag, baseProps)
  const [props, restProps] = splitProps(mergedProps, [
    'checked',
    'class',
    'style',
    'children',
    'color',
    'closable',
    'checkable',
    'defaultChecked',
    'size',
    'onClose',
    'onCheck',
    'icon',
    'closeIcon',
    'bordered',
    '__closeIconProps',
    'visible',
  ])

  const prefixCls = ctx.getPrefixCls?.('tag')

  const [visible, setVisible] = createMergedValue(true, props, ['visible'])
  const [checked, setChecked] = createMergedValue(false, props, ['checked', 'defaultChecked'])

  const [loading, setLoading] = createSignal()

  function onHandleClose(e: any) {
    const ret = props.onClose?.(e)

    if (ret?.then) {
      setLoading(true)
      ret
        .then(() => {
          setLoading(false)
          setVisible(false)
        })
        .catch(() => {
          setLoading(false)
        })
    } else {
      setVisible(false)
    }
  }

  function onHandleCheck() {
    if (props.checkable) {
      const newChecked = !checked()
      if (!('checked' in props)) {
        setChecked(newChecked)
      }

      props.onCheck?.(newChecked)
    }
  }

  const _color = createMemo(() =>
    props.color ? (COLORS.indexOf(props.color) !== -1 ? props.color : '') : '',
  )
  const _checked = createMemo(() => (props.checkable ? checked() : true))

  const colorStyle = createMemo(() => {
    const obj = toCSSObject(props.style)
    if (props.color && !_color() && _checked()) {
      obj['background-color'] = props.color
      obj['border-color'] = props.color
    }
    return obj
  })

  return (
    <div
      {...restProps}
      onClick={onHandleCheck}
      style={colorStyle()}
      class={cs(
        prefixCls,
        {
          [`${prefixCls}-loading`]: loading,
          [`${prefixCls}-hide`]: !visible(),
          [`${prefixCls}-${_color()}`]: _color(),
          [`${prefixCls}-checkable`]: props.checkable,
          [`${prefixCls}-checked`]: _checked(),
          [`${prefixCls}-size-${props.size}`]: props.size,
          [`${prefixCls}-bordered`]: props.bordered,
          [`${prefixCls}-custom-color`]: _checked() && props.color && !_color(),
          [`${prefixCls}-rtl`]: ctx.rtl,
        },
        props.class,
      )}
    >
      <Show when={props.icon}>
        <span class={`${prefixCls}-icon`}>{props.icon}</span>
      </Show>

      <span class={`${prefixCls}-content`}>{props.children}</span>

      <Show when={props.closable && !loading() && props.closeIcon !== null}>
        <IconHover
          prefix={prefixCls}
          class={`${prefixCls}-close-btn`}
          onClick={onHandleClose}
          role="button"
          tabIndex={0}
          {...getKeyboardEvents({ onPressEnter: onHandleClose })}
          aria-label="Close"
          {...props.__closeIconProps}
        >
          {props.closeIcon !== undefined ? props.closeIcon : <IconClose />}
        </IconHover>
      </Show>

      <Show when={loading()}>
        <span class={`${prefixCls}-loading-icon`}>
          <IconLoading />
        </span>
      </Show>
    </div>
  )
}

Tag.displayName = 'Tag'

export default Tag

export { type TagProps }
