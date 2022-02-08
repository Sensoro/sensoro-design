import React, { FC } from 'react';
import { Battery } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return <Battery color="red" style={{ fontSize: 40 }} value={50} />;
};

export default Example;
