/**
 * title: Radio.Group 垂直
 * desc: 垂直的 Radio.Group，配合更多输入框选项。
 */
import React, { useState } from 'react';
import { Space, Input } from 'antd';
import { Radio } from '@sensoro/sensoro-design';

export default () => {
  const [value, setValue] = useState(1);

  const handleChange = (e) => {
    console.log('radio checked', e.target.value);

    setValue(e.target.value);
  };

  return (
    <Radio.Group onChange={handleChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>Option A</Radio>
        <Radio value={2}>Option B</Radio>
        <Radio value={3}>Option C</Radio>
        <Radio value={4}>
          More...
          {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
        </Radio>
      </Space>
    </Radio.Group>
  );
};
