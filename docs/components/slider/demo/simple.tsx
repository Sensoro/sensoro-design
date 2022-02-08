import React, { FC } from 'react';
import { Slider } from '@sensoro/sensoro-design';

const BasicExample: FC = () => {
  return (
    <div>
      <Slider defaultValue={30} />
    </div>
  );
};

export default BasicExample;
