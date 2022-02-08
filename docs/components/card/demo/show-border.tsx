/**
 * title: 显示边框
 * desc: 可显示在白色背景下
 */
import React, { FC } from 'react';
import { Card } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <Card bordered title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};

export default Example;
