/**
 * title: 搜索框
 * desc: 带有搜索按钮的输入框。
 */
import React from 'react';
import { Space } from 'antd';
import { Input } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical" size={16}>
      <Input.Search placeholder="请输入" />
    </Space>
  );
};
