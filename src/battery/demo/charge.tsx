import React, { FC } from 'react';
import { Battery } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <div>
      <Battery style={{ fontSize: 40 }} value={-1} />

      <Battery style={{ fontSize: 40 }} color="green" value={-1} />
    </div>
  );
};

export default Example;
