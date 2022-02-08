import React from 'react';
import { DaysRange } from '@sensoro/sensoro-design';

export default () => {
  return (
    <DaysRange
      marks={[0, 1, 7, 30]}
      onChange={(data) => {
        console.log(data);
      }}
    />
  );
};
