/**
 * title: 前置/后置标签
 * desc: 用于配置一些固定组合。
 */
import React from 'react';
import { Space } from 'antd';
import { Input } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical" size={16}>
      <Input addonBefore="http://" addonAfter=".com" placeholder="请输入" defaultValue="mysite" />
    </Space>
  );
};
