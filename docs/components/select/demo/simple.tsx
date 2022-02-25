import React from 'react';
import { Select } from '@sensoro/sensoro-design';

const { Option } = Select;

export default () => {
  return (
    <Select placeholder="请选择" style={{ width: 240 }}>
      <Option value="1">选项一</Option>
      <Option value="2">选项二</Option>
    </Select>
  );
};
