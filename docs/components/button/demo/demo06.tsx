/**
 * title: Block 按钮
 * desc:
 *   block 属性将使按钮适合其父宽度。
 */
import React from 'react';
import { Space } from 'antd';
import { Button } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Button
        block
        type="primary"
        onClick={() => {
          console.log('123');
        }}
      >
        Primary
      </Button>
      <Button block>Default</Button>
      <Button block type="dashed">
        Dashed
      </Button>
    </Space>
  );
};
