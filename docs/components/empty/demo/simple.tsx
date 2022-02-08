import React, { FC } from 'react';
import { Divider } from 'antd';
import { Empty } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <div>
      <Empty />

      <Divider />
      <Empty icon="device" description="暂无设备" />

      <Divider />
      <Empty icon="image" description="暂无图片" />
    </div>
  );
};

export default Example;
