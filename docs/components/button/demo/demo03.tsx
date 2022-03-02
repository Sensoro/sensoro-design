/**
 * title: 危险按钮
 * desc: 需要谨慎操作的按钮
 */
import React from 'react';
import { useBoolean } from '@pansy/react-hooks';
import { Space } from 'antd';
import { Button } from '@sensoro/sensoro-design';

export default () => {
  const [disabled, disabledAction] = useBoolean();

  return (
    <Space direction="vertical">
      <Button
        onClick={() => {
          disabledAction.toggle();
        }}
      >
        Toggle disabled
      </Button>
      <Space>
        <Button disabled={disabled} type="primary" danger>
          Primary
        </Button>
        <Button disabled={disabled} danger>
          Default
        </Button>
        <Button disabled={disabled} danger type="link">
          Text
        </Button>
      </Space>
    </Space>
  );
};
