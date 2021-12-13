import React, { FC } from 'react';
import { DaysRange } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <div>
      <DaysRange
        marks={[1, 30, 7]}
        onChange={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
};

export default Example;
