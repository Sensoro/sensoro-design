/**
 * title: 更多
 * desc: 更多分页。
 */
import React from 'react';
import { Pagination } from '@sensoro/sensoro-design';

export default () => {
  return <Pagination defaultCurrent={6} total={500} />;
};
