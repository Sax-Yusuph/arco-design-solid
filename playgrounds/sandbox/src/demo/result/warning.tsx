
import { Button, Result } from '@arco-design/web-solid';

const App = () => {
  return (
    <div>
      <Result
        status="warning"
        title="There is a problem with your operation."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  );
};

export default App;

