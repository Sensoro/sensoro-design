import React, { FC } from 'react';
import Speed from '../common/speed';
import '../style';

const Example: FC = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Speed doubleRow style={{ color: '#000', marginRight: 20 }} />

      <Speed style={{ color: '#000' }} />
    </div>
  );
};

export default Example;
