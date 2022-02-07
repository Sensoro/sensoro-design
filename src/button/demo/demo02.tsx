import React from 'react';
import { Space } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Button icon={<PlusOutlined />} type="primary">
          Primary
        </Button>
        <Button icon={<PlusOutlined />} type="minor">
          Minor
        </Button>
        <Button icon={<PlusOutlined />}>Default</Button>
        <Button icon={<PlusOutlined />} type="dashed">
          Dashed
        </Button>
        <Button icon={<PlusOutlined />} type="link">
          Link
        </Button>

        <Button type="primary" icon={<PlusOutlined />} />
        <Button shape="circle" icon={<PlusOutlined />} />
      </Space>
      <Space>
        <Button icon={<PlusOutlined />} disabled type="primary">
          Primary
        </Button>
        <Button icon={<PlusOutlined />} disabled type="minor">
          Minor
        </Button>
        <Button icon={<PlusOutlined />} disabled>
          Default
        </Button>
        <Button icon={<PlusOutlined />} disabled type="dashed">
          Dashed
        </Button>
        <Button icon={<PlusOutlined />} disabled type="link">
          Link
        </Button>
        <Button icon={<PlusOutlined />} disabled type="primary" />
        <Button icon={<PlusOutlined />} disabled shape="circle" />
      </Space>
    </Space>
  );
};
