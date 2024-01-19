import { Statistic } from '@arco-design/web-solid'
import { AiOutlineFall, AiOutlineRise } from 'solid-icons/ai'

const App = () => {
  return (
    <div>
      <Statistic
        title="New Users"
        value={192393}
        suffix={<AiOutlineRise class="arco-icon" style={{ color: '#ee4d38' }} />}
        style={{ 'margin-right': '60px', 'margin-bottom': '20px' }}
      />
      <Statistic
        title="Active Users"
        value={934230}
        suffix={<AiOutlineFall style={{ color: '#0fbf60' }} />}
        style={{ 'margin-right': '60px', 'margin-bottom': '20px' }}
      />
      <Statistic
        title="User Growth Rate"
        value={50.32}
        precision={2}
        prefix={<AiOutlineRise class="arco-icon" style={{ color: '#ee4d38' }} />}
        suffix="%"
        styleValue={{ color: '#ee4d38' }}
        style={{ 'margin-right': '60px', 'margin-bottom': '20px' }}
      />
    </div>
  )
}

export default App
