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
        <Button icon={<PlusOutlined />} disabled={disabled} type="primary">
          Primary
        </Button>
        <Button icon={<PlusOutlined />} disabled={disabled}>
          Default
        </Button>
        <Button icon={<PlusOutlined />} disabled={disabled} />
      </Space>
    </Space>
  );
};
