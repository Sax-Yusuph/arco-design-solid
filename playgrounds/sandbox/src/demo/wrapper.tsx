import { Card } from '@arco-design/web-solid';
import { ParentProps, children } from 'solid-js';

export const Demo = (props: ParentProps<{ name: string; description?: string }>) => {
  const child = children(() => props.children)
  return (
    <Card title={props.name}>
      <p>{props.description}</p>
      {child()}
    </Card>
  )
}
