/**
 * title: 简洁卡片
 * desc: 只包含内容区域。
 */
import React, { FC } from 'react';
import { Card } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <div style={{ background: '#f0f2f5', padding: 20 }}>
      <Card style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default Example;
