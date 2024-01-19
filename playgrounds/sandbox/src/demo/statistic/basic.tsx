import { Statistic } from '@arco-design/web-solid'

const App = () => {
  return (
    <div>
      <Statistic title="Downloads" value={125670} groupSeparator style={{ 'margin-right': '60px' }} />
      <Statistic extra="Comments" value={40509} groupSeparator precision={2} />
    </div>
  )
}

export default App
