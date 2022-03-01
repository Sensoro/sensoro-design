/**
 * title: 三种大小
 * desc: 高度分为 40px、 32px、 24px 三种尺寸，默认高度为 32px。
 */
import React, { useState } from 'react';
import { Space } from 'antd';
import { Select, Radio } from '@sensoro/sensoro-design';

import type { SelectProps } from 'antd/es/select';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default () => {
  const [size, setSize] = useState<SelectProps['size']>();

  return (
    <Space direction="vertical" size={16}>
      <Radio.Group
        options={[
          { label: 'Large', value: 'large' },
          { label: 'Default', value: undefined },
          { label: 'Small', value: 'small' }
        ]}
        defaultValue={size}
        optionType="button"
        onChange={(e) => {
          setSize(e.target.value);
        }}
      />
      <Select size={size} showSearch defaultValue="a1" placeholder="请选择" style={{ width: 240 }}>
        <Option value="1">选项一</Option>
        <Option value="2">选项二</Option>
      </Select>
      <Select
        placeholder="请选择"
        size={size}
        style={{ width: 240 }}
        notFoundContent="暂无数据"
        mode="multiple"
        allowClear
        defaultValue={['a10', 'c12']}
      >
        {children}
      </Select>
    </Space>
  );
};
