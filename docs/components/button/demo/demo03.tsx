import React from 'react';
import { Space } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Button danger>Default</Button>
        <Button danger icon={<PlusOutlined />}>
          Icon
        </Button>
        <Button danger type="link">
          Link
        </Button>
      </Space>
      <Space>
        <Button danger disabled>
          Default
        </Button>
        <Button danger disabled icon={<PlusOutlined />}>
          Icon
        </Button>
        <Button danger disabled type="link">
          Link
        </Button>
      </Space>
    </Space>
  );
};
