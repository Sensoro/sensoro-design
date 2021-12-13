import React, { FC } from 'react';
import { Button } from 'antd';

const TypeExample: FC = () => {
  return (
    <div>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
    </div>
  );
};

export default TypeExample;
