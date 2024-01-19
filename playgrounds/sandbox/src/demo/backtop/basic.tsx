import { BackTop } from '@arco-design/web-solid'

const App = () => {
  return (
    <div style={{ position: 'relative', padding: '8px 12px' }}>
      <BackTop
        visibleHeight={30}
        style={{ position: 'absolute' }}
        target={() => document.getElementById('custom_backtop0')!}
      />

      <p class="arco-typography">
        The button will appear in the bottom corner of the scrolling area
      </p>
      <div id="custom_backtop0" style={{ height: '300px', overflow: 'auto' }}>
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
