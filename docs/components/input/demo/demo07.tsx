/**
 * title: 带字数提示
 * desc: 展示字数提示。
 */
import React from 'react';
import { Space } from 'antd';
import { Input } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical" size={16}>
      <Input showCount maxLength={20} />
    </Space>
  );
};
