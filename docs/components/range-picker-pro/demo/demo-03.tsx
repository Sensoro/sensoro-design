import React from 'react';
import moment from 'moment';
// @ts-ignore
import { RangePickerPro } from '@sensoro/sensoro-design';

const options = [
  { label: '15分钟', value: 'PT15M' },
  { label: '小时', value: 'PT1H' },
  { label: '日', value: 'P1D' },
  { label: '月', value: 'P1M' }
];

export default () => {
  return (
    <RangePickerPro
      defaultTimes={[
        //@ts-ignore
        moment().subtract(7, 'days').startOf('day'),
        //@ts-ignore
        moment().subtract(1, 'days').endOf('day')
      ]}
      onChange={(values) => {
        values.rangeTime.forEach((item) => {
          console.log(moment(item).format('YYYY-MM-DD HH:mm:ss'));
        });
      }}
    />
  );
};
