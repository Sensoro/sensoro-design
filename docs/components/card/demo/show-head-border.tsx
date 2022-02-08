/**
 * title: 显示头部底部边框
 * desc: 包含标题、内容、操作区域
 */
import React, { FC } from 'react';
import { Card } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <div style={{ background: '#f0f2f5', padding: 20 }}>
      <Card
        headBordered
        title="Default size card"
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default Example;
