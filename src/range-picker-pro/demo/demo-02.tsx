import React from 'react';
// @ts-ignore
import { RangePickerPro } from '@sensoro/sensoro-design';

const options: any[] = [
  { label: '15分钟', value: 'minute' },
  { label: '小时', value: 'hour' },
  { label: '日', value: 'day' },
  { label: '月', value: 'month' }
];

export default () => {
  return <RangePickerPro disabledSelect={false} periodValue={5} options={options} />;
};
