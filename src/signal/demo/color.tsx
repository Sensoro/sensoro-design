import React, { FC } from 'react';
import { Signal } from '@sensoro/sensoro-design';

const TypeExample: FC = () => {
  return (
    <div>
      <Signal color="red" style={{ fontSize: 40 }} value={0} />
      <Signal color="red" style={{ fontSize: 40 }} value={1} />
      <Signal color="red" style={{ fontSize: 40 }} value={2} />
      <Signal color="red" style={{ fontSize: 40 }} value={3} />
      <Signal color="red" style={{ fontSize: 40 }} value={4} />
      <Signal color="red" style={{ fontSize: 40 }} value={5} />
    </div>
  );
};

export default TypeExample;
