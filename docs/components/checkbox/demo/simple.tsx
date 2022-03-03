import React from 'react';
import { Space } from 'antd';
import { Checkbox } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical" size={16}>
      <Checkbox>Checkbox</Checkbox>

      <Checkbox indeterminate>Indeterminate</Checkbox>
    </Space>
  );
};
