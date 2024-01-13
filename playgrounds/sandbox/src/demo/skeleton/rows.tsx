import { Skeleton } from '@arco-design/web-solid'

const App = () => {
  return (
    <Skeleton
      text={{
        rows: 3,
        width: ['100%', 600, 400],
      }}
      image
    ></Skeleton>
  )
}

export default App
