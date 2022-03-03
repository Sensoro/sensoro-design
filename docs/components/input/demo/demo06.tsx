/**
 * title: 密码框。
 * desc: 密码框。
 */
import React from 'react';
import { Space } from 'antd';
import { Input } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical" size={16}>
      <Input.Password />
    </Space>
  );
};
