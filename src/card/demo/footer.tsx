/**
 * title: 设置 footer
 * desc: 主要用于表单的操作
 */
import React, { FC } from 'react';
import { Card } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <div style={{ background: '#f0f2f5', padding: 20 }}>
      <Card
        headBordered
        title="Default size card"
        footer={{
          onConfirm: () => {
            console.log('confirm');
          }
        }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default Example;
