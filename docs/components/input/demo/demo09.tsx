/**
 * title: 带移除图标
 * desc: 点击图标删除所有内容。
 */
import React from 'react';
import { Space } from 'antd';
import { Input } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical" size={16}>
      <Input allowClear defaultValue="测试测试" />
      <Input.TextArea allowClear defaultValue="测试测试" />
    </Space>
  );
};
