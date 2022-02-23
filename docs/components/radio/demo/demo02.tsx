/**
 * title: 不可用
 * desc: Radio 不可用。
 */
import React from 'react';
import { Space } from 'antd';
import { useBoolean } from '@pansy/react-hooks';
import { Radio, Button } from '@sensoro/sensoro-design';

export default () => {
  const [disabled, disabledAction] = useBoolean(true);

  return (
    <Space direction="vertical" size={16}>
      <div>
        <Radio defaultChecked disabled={disabled}>
          已选禁用
        </Radio>
        <Radio disabled={disabled}>未选禁用</Radio>
      </div>

      <Button
        type="primary"
        onClick={() => {
          disabledAction.toggle();
        }}
      >
        Toggle disabled
      </Button>
    </Space>
  );
};
