/**
 * title: 空数据
 */
import React from 'react';
import { Select } from '@sensoro/sensoro-design';

export default () => {
  return (
    <div style={{ height: 100 }}>
      <Select placeholder="请选择" style={{ width: 240 }} notFoundContent="暂无数据" open />
    </div>
  );
};
