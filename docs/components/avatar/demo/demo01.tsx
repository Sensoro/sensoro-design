/**
 * title: 基本
 * desc: 头像有三种尺寸，两种形状可选。
 */
import React from 'react';
import { Space } from 'antd';
import { Avatar } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Avatar size={64} />
        <Avatar size="large" />
        <Avatar />
        <Avatar size="small" />
      </Space>
      <Space>
        <Avatar size={64} shape="square" />
        <Avatar size="large" shape="square" />
        <Avatar shape="square" />
        <Avatar size="small" shape="square" />
      </Space>
    </Space>
  );
};
