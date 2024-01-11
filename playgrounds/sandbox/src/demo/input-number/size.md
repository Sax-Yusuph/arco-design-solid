
import { useState } from 'react';
import { InputNumber, Radio } from '@arco-design/web-react';
const RadioGroup = Radio.Group;

function App() {
  const [size, setSize] = useState('default');
  return (
    <div>
      <RadioGroup
        type="button"
        name="size"
        value={size}
        onChange={(value) => setSize(value)}
        style={{ marginBottom: 20, borderRadius: 4 }}
      >
        <Radio value="mini">mini</Radio>
        <Radio value="small">small</Radio>
        <Radio value="default">default</Radio>
        <Radio value="large">large</Radio>
      </RadioGroup>
      <div>
        <InputNumber
          defaultValue={2}
          max={20}
          size={size}
          style={{ width: 160, margin: '10px 24px 10px 0' }}
        />
        <InputNumber
          mode="button"
          defaultValue={2}
          max={20}
          size={size}
          style={{ width: 160, margin: '10px 24px 10px 0' }}
        />
      </div>
    </div>
  );
}

export default App;
```
