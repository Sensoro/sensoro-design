/**
 * title: 加载中状态
 * desc: 添加 loading 属性即可让按钮处于加载状态。
 */
import React from 'react';
import { useBoolean } from '@pansy/react-hooks';
import { Space, Switch } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button } from '@sensoro/sensoro-design';

export default () => {
  const [loading, loadingAction] = useBoolean(true);

  return (
    <Space direction="vertical" size={16}>
      <Switch
        checked={loading}
        onChange={(checked) => {
          loadingAction.set(checked);
        }}
      />
      <Space>
        <Button loading={loading} type="primary">
          Primary
        </Button>
        <Button loading={loading} type="minor">
          Minor
        </Button>
        <Button loading={loading}>Default</Button>
        <Button loading={loading} type="primary" icon={<PlusOutlined />}>
          Primary Icon
        </Button>
        <Button loading={loading} type="minor" icon={<PlusOutlined />}>
          Minor Icon
        </Button>
        <Button loading={loading} icon={<PlusOutlined />}>
          Loading
        </Button>
        <Button loading type="primary" icon={<PlusOutlined />} />
      </Space>
    </Space>
  );
};
