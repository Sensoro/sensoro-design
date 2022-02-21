import React from 'react';
import { useBoolean } from '@pansy/react-hooks';
import { Space, Switch } from 'antd';
import { Button } from '@sensoro/sensoro-design';

export default () => {
  const [disabled, disabledAction] = useBoolean();

  return (
    <Space direction="vertical">
      <Switch
        checked={disabled}
        onChange={(checked) => {
          disabledAction.set(checked);
        }}
      />
      <Space>
        <Button disabled={disabled} type="primary">
          Primary
        </Button>
        <Button disabled={disabled} type="minor">
          Minor
        </Button>
        <Button disabled={disabled}>Default</Button>
        <Button disabled={disabled} type="dashed">
          Dashed
        </Button>
        <Button disabled={disabled} type="link">
          Link
        </Button>
      </Space>
    </Space>
  );
};
