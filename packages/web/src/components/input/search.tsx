import { Show, splitProps } from 'solid-js'
import { IconLoading, IconSearch } from '../../icons'
import cs from '../../utils/classNames'
import { isObject } from '../../utils/is'
import { createMergedValue } from '../../utils/store'
import Button from '../button'
import { useConfigContext } from '../config-provider'
import Input, { formatValue } from './input'
import type { InputSearchProps } from './interface'

const Search = (baseProps: InputSearchProps) => {
  const ctx = useConfigContext()

  const [props, restProps] = splitProps(baseProps, [
    'class',
    'style',
    'placeholder',
    'disabled',
    'searchButton',
    'loading',
    'defaultValue',
    'onSearch',
  ])

  const trueMaxLength = isObject(restProps.maxLength)
    ? restProps.maxLength.length
    : restProps.maxLength

  const mergedMaxLength =
    isObject(restProps.maxLength) && restProps.maxLength.errorOnly ? undefined : trueMaxLength

  const [getValue, setValue] = createMergedValue('', baseProps, ['value', 'defaultValue'], val => {
    return formatValue(val, mergedMaxLength)
  })

  const prefixCls = ctx.getPrefixCls?.('input-search')

  const onSearch = () => {
    if (!props.disabled) {
      props.onSearch?.(getValue() || '')
    }
  }

  return (
    <Input
      {...restProps}
      disabled={props.disabled}
      class={cs(
        prefixCls,
        {
          [`${prefixCls}-button`]: props.searchButton,
        },
        props.class,
      )}
      style={props.style}
      placeholder={props.placeholder}
      addAfter={
        <Show when={props.searchButton}>
          <Button
            disabled={props.disabled}
            size={restProps.size}
            class={`${prefixCls}-btn`}
            type="primary"
            onClick={onSearch}
            loading={props.loading}
            loadingFixedWidth
            icon={props.searchButton === true && !props.loading && <IconSearch />}
          >
            {props.searchButton !== true && props.searchButton}
          </Button>
        </Show>
      }
      suffix={
        <Show when={!props.searchButton}>
          <Show when={!props.loading} fallback={<IconLoading />}>
            <IconSearch onClick={onSearch} />
          </Show>
        </Show>
      }
      onInput={(val, e) => {
        setValue(val)
        restProps.onInput?.(val, e)
      }}
      defaultValue={props.defaultValue}
      onPressEnter={e => {
        onSearch()
        restProps.onPressEnter?.(e)
      }}
    />
  )
}

Search.displayName = 'Search'

export default Search

export { type InputSearchProps }
