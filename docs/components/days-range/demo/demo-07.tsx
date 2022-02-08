import React from 'react';
import { DaysRange } from '@sensoro/sensoro-design';

export default () => {
  return (
    <DaysRange.TimeRange
      onChange={(data) => {
        console.log(data);
      }}
    />
  );
};
