/**
 * title: 加载中状态
 * desc: 添加 loading 属性即可让按钮处于加载状态。
 */
import React from 'react';
import { useBoolean } from '@pansy/react-hooks';
import { Space } from 'antd';
import PlusOutlined from '@sensoro-design/icons/PlusOutlined';
import { Button } from '@sensoro/sensoro-design';

export default () => {
  const [loading, loadingAction] = useBoolean(true);

  return (
    <Space direction="vertical" size={16}>
      <Button
        onClick={() => {
          loadingAction.toggle();
        }}
      >
        Toggle loading
      </Button>
      <Space>
        <Button loading={loading} type="primary">
          Primary
        </Button>
        <Button loading={loading} type="secondary">
          Secondary
        </Button>
        <Button loading={loading}>Default</Button>
        <Button loading={loading} type="primary" icon={<PlusOutlined />}>
          Primary Icon
        </Button>
        <Button loading={loading} type="secondary" icon={<PlusOutlined />}>
          Secondary Icon
        </Button>
        <Button loading={loading} icon={<PlusOutlined />}>
          Loading
        </Button>
        <Button loading type="primary" icon={<PlusOutlined />} />
      </Space>
    </Space>
  );
};
