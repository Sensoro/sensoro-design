/**
 * title: 警告按钮
 * desc: 警告按钮，多用于模态窗的删除按钮，危险程度次于危险按钮。
 */
import React from 'react';
import { Space } from 'antd';
import { useBoolean } from '@pansy/react-hooks';
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
        <Button disabled={disabled} type="warning">
          Warning
        </Button>
      </Space>
    </Space>
  );
};
