import { Card, Space } from '@arco-design/web-solid';
import { ParentProps, children } from 'solid-js';

export const Demo = (props: ParentProps<{ name: string; description?: string }>) => {
  const description = children(() => props.description)

  return (
    <Space direction="vertical" style="width:100% !important">
      <h5 class="arco-typography">{props.name}</h5>
      {typeof description() === 'string' ? (
        <p class="arco-typography">{props.description}</p>
      ) : (
        description
      )}
      <Card bodyStyle={{ padding: '35px' }}>{props.children}</Card>
    </Space>
  )
}
