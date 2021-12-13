import React, { FC } from 'react';
import { DaysRange } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <DaysRange
      marks={[1, 30, 7]}
      type="radio"
      onChange={(data) => {
        console.log(data);
      }}
    />
  );
};

export default Example;
