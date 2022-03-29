import React from 'react';
import { PermissionTreeSelect, Empty } from '@sensoro/sensoro-design';

export default () => {
  return <PermissionTreeSelect list={[]} empty={<Empty description="暂无数据" />} />;
};
