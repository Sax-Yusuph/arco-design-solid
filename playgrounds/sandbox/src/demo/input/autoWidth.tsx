import { Divider, Input } from '@arco-design/web-solid'

const AutoWidth = () => {
  return (
    <div>
      <Divider>
        <pre>{JSON.stringify({ 'min-width': '0px', 'max-width': '500px' })}</pre>
      </Divider>

      <Input placeholder="Please Enter" autoWidth={{ 'max-width': '500px' }} />

      <Divider>
        <pre>{JSON.stringify({ 'min-width': '300px', 'max-width': '500px' })}</pre>
      </Divider>

      <Input autoWidth={{ 'min-width': '300px', 'max-width': '500px' }} />
      <br />
      <br />
      <Input prefix="Prefix" autoWidth={{ 'min-width': '300px', 'max-width': '500px' }} />
      <br />
      <br />
      <Input
        addBefore="Before"
        prefix="Prefix"
        autoWidth={{ 'min-width': '300px', 'max-width': '500px' }}
      />
    </div>
  )
}

export default AutoWidth
