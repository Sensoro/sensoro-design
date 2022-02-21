/**
 * title: 加载中状态
 * desc: 添加 loading 属性即可让按钮处于加载状态。
 */
import React from 'react';
import { Space } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space>
      <Button
        loading
        type="primary"
        onClick={() => {
          console.log('123');
        }}
      >
        Loading
      </Button>
      <Button loading type="primary" icon={<PlusOutlined />}>
        Loading
      </Button>
      <Button loading type="primary" icon={<PlusOutlined />} />
    </Space>
  );
};
