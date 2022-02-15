/**
 * title: 类型
 * desc: 支持两种种类型：图片、Icon 。
 */
import React from 'react';
import { Space } from 'antd';
import { Avatar } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space>
      <Avatar />
      <Avatar src="https://aip.bdstatic.com/portal-pc-node/dist/1588235213450/images/technology/face/detect/demo-card-1.jpg" />
    </Space>
  );
};
