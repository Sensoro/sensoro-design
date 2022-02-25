/**
 * title: 危险按钮
 * desc: 需要谨慎操作的按钮
 */
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
        <Button disabled={disabled} type="primary" danger>
          Primary
        </Button>
        <Button disabled={disabled} danger icon={<PlusOutlined />}>
          Default
        </Button>
        <Button disabled={disabled} danger type="link">
          Text
        </Button>
      </Space>
    </Space>
  );
};
