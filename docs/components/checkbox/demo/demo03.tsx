/**
 * title: 不可用
 * desc: Checkbox 不可用
 */
import React from 'react';
import { Space } from 'antd';
import { useBoolean } from '@pansy/react-hooks';
import { Checkbox, Button } from '@sensoro/sensoro-design';

export default () => {
  const [disabled, disabledAction] = useBoolean(true);

  return (
    <Space direction="vertical" size={16}>
      <Checkbox.Group options={['Apple', 'Pear', 'Orange']} defaultValue={['Apple']} />
    </Space>
  );
};
