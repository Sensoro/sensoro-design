import React from 'react';
import { DaysRange } from '@sensoro/sensoro-design';

export default () => {
  return (
    <DaysRange
      marks={[1, 30, 7]}
      showCustomize="show"
      formatter={(item) => `近${item}天`}
      onChange={(data) => {
        console.log(data);
      }}
    />
  );
};
