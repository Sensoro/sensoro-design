import React from 'react';
import { useBoolean } from '@pansy/react-hooks';
import { Space, Switch } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
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
        <Button disabled={disabled} danger>
          Primary
        </Button>
        <Button disabled={disabled} danger icon={<PlusOutlined />}>
          Default
        </Button>
        <Button disabled={disabled} danger icon={<PlusOutlined />} />
        <Button disabled={disabled} danger type="dashed">
          Dashed
        </Button>
      </Space>
    </Space>
  );
};
