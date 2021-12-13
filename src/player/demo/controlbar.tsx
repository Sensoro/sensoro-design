import React, { FC } from 'react';
import Controlbar from '../controlbar';
import '../style';

const Example: FC = () => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative', height: 150 }}>
        <Controlbar style={{ display: 'block' }} duration={66} startTime={1593687743458} />
      </div>

      <div style={{ position: 'relative', height: 150 }}>
        <Controlbar style={{ display: 'block' }} isLive />
      </div>
    </div>
  );
};

export default Example;
