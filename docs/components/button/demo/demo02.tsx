/**
 * title: 图标按钮
 * desc: 在普通按钮基础上增加icon，用于突出按钮功能。部分界面考虑排版，也可使用不带文字的图标按钮，但在icon可能表意不明的情况下，建议使用普通文字按钮。
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
