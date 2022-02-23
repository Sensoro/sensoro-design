/**
 * title: Radio.Group 组合 - 配置方式
 * desc: 通过配置 options 参数来渲染单选框。也可通过 optionType 参数来设置 Radio 类型。
 */
import React, { useState } from 'react';
import { Space, Input } from 'antd';
import { Radio } from '@sensoro/sensoro-design';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
];

const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true }
];

export default () => {
  const [value, setValue] = useState(1);

  const handleChange = (e) => {
    console.log('radio checked', e.target.value);

    setValue(e.target.value);
  };

  return (
    <Space direction="vertical" size={16}>
      <Radio.Group options={plainOptions} />
      <Radio.Group options={optionsWithDisabled} />
    </Space>
  );
};
