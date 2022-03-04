/**
 * title: 跳转
 * desc: 快速跳转到某一页。
 */
import React from 'react';
import { Pagination } from '@sensoro/sensoro-design';

export default () => {
  return <Pagination showQuickJumper showSizeChanger={false} defaultCurrent={6} total={500} />;
};
