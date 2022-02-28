/**
 * title: 按钮类型
 * desc:
 *   目前有五种类型：主要按钮、次要按钮-蓝色文字、次要按钮-灰色文字、虚线按钮、链接按钮 <br />
 *   次要按钮推荐使用灰色文字，当需要突出展示时，才使用蓝色文字
 */
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
