import React, { FC } from 'react';
import { Select } from '@sensoro/sensoro-design';

const { Option } = Select;

const BasicExample: FC = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Select placeholder="请选择" style={{ width: 240 }} onChange={handleChange}>
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
      </Select>
    </div>
  );
};

export default BasicExample;
