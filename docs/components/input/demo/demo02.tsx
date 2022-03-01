/**
 * title: 三种大小
 * desc: 我们为 Input 输入框定义了三种尺寸（大、默认、小），高度分别为 40px、32px 和 24px。
 */
import React from 'react';
import { Space } from 'antd';
import { Input } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical" size={16}>
      <Input size="large" placeholder="large size" style={{ width: 360 }} />
      <Input placeholder="default size" style={{ width: 360 }} />
      <Input size="small" placeholder="small size" style={{ width: 360 }} />
    </Space>
  );
};
