
import { Button, Result } from '@arco-design/web-solid';

const App = () => {
  return (
    <div>
      <Result
        title="Your operation has been performed."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  );
};

export default App;

