/**
 * title: 多选
 * desc: 多选，从已有条目中选择。
 */
import React from 'react';
import { Select } from '@sensoro/sensoro-design';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default () => {
  return (
    <div style={{ height: 100 }}>
      <Select
        placeholder="请选择"
        style={{ width: 240 }}
        notFoundContent="暂无数据"
        mode="multiple"
        allowClear
        defaultValue={['a10', 'c12']}
      >
        {children}
      </Select>
    </div>
  );
};
