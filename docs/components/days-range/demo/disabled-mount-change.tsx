import React, { FC } from 'react';
import { DaysRange } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <div>
      <DaysRange
        isMountChange={false}
        marks={[5, 20]}
        onChange={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
};

export default Example;
