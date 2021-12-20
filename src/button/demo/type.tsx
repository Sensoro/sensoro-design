import React from 'react';
import { Space } from 'antd';
import { Button } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
    </Space>
  );
};
