import React, { useState } from 'react';
import { Radio } from 'antd';
// @ts-ignore
import { RangePickerPro } from '@sensoro/sensoro-design';

const options = [
  { label: '15分钟', value: 'PT15M' },
  { label: '小时', value: 'PT1H' },
  { label: '日', value: 'P1D' },
  { label: '月', value: 'P1M' }
];

export default () => {
  return <RangePickerPro />;
};
