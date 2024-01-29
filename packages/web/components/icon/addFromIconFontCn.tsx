import { Component, Match, Switch } from 'solid-js'
import { isServer } from 'solid-js/web'
import Icon, { IconProps } from './index'

const scriptUrlCache: string[] = []

export interface IconfontOptions {
  src?: string
  extraProps?: { [key: string]: any }
}

export default function addFromIconFontCn(options: IconfontOptions = {}) {
  const { src, extraProps = {} } = options

  if (!isServer && typeof src === 'string' && src.length && scriptUrlCache.indexOf(src) === -1) {
    const script = document.createElement('script')
    script.setAttribute('src', src)
    script.setAttribute('data-namespace', src)
    scriptUrlCache.push(src)
    document.body.appendChild(script)
  }

  const Iconfont: Component<IconProps> = props => {
    return (
      <Icon {...props} {...extraProps} ref={props.ref}>
        <Switch>
          <Match when={'children' in props}>{props.children}</Match>
          <Match when={props.type}>
            <use href={`#${props.type}`} />
          </Match>
        </Switch>
      </Icon>
    )
  }

  return Iconfont
}
