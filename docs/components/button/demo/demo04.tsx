/**
 * title: 按钮尺寸
 * desc:
 *   按钮有大、中、小三种尺寸。<br/>
 *   通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。
 */
import React, { useState } from 'react';
import { Space, Radio } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button } from '@sensoro/sensoro-design';

import type { ButtonSize } from 'antd/es/button';

export default () => {
  const [size, setSize] = useState<ButtonSize>();

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <Space direction="vertical" size={16}>
      <Radio.Group value={size} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button>Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <Space>
        <Button size={size} type="primary">
          Primary
        </Button>
        <Button size={size} type="minor">
          Minor
        </Button>
        <Button size={size}>Default</Button>
        <Button size={size} type="dashed">
          Dashed
        </Button>
        <Button size={size} type="link">
          Link
        </Button>
      </Space>
      <Space>
        <Button size={size} type="link">
          Link
        </Button>
      </Space>
      <Space>
        <Button size={size} icon={<PlusOutlined />} type="primary" />
        <Button size={size} shape="circle" icon={<PlusOutlined />} type="primary" />
        <Button size={size} icon={<PlusOutlined />} type="primary">
          Primary
        </Button>
      </Space>
    </Space>
  );
};
