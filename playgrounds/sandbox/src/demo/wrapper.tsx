import { Divider } from '@arco-design/web-solid';
import { ParentProps, children } from 'solid-js';

export const Demo = (props: ParentProps<{ name: string; description?: string }>) => {
  const child = children(() => props.children)
  return (
    <div>
      <Divider orientation="left">{props.name}</Divider>
      <p>{props.description}</p>
      {child()}
    </div>
  )
}
