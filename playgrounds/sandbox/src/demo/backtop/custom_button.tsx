import { BackTop, Button } from '@arco-design/web-solid'

const App = () => {
  return (
    <div style={{ position: 'relative', padding: '8px 12px' }}>
      <BackTop
        style={{ position: 'absolute' }}
        visibleHeight={30}
        target={() => document.getElementById('custom_backtop')!}
      >
        <Button type="primary" iconOnly style={{ width: '40px', height: '40px' }}>
          UP
        </Button>
      </BackTop>
      <div id="custom_backtop" style={{ height: '300px', overflow: 'auto' }}>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
        <p class="arco-typography">This is the content</p>
      </div>
    </div>
  )
}

export default App
