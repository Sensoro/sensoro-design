import React from 'react';
import { Space } from 'antd';
import { Button } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Button type="primary">Primary</Button>
        <Button type="minor">Minor</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Space>
      <Space>
        <Button disabled type="primary">
          Primary
        </Button>
        <Button disabled type="minor">
          Minor
        </Button>
        <Button disabled>Default</Button>
        <Button disabled type="dashed">
          Dashed
        </Button>
        <Button disabled type="link">
          Link
        </Button>
      </Space>
    </Space>
  );
};
