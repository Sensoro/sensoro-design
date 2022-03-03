/**
 * title: 文本域
 * desc: 用于多行输入。
 */
import React from 'react';
import { Space } from 'antd';
import { Input } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical" size={16}>
      <Input.TextArea />
    </Space>
  );
};
