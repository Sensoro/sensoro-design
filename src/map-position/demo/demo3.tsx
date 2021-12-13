import React from 'react';
import { MapPosition } from '@sensoro/sensoro-design';

export default () => {
  return (
    <MapPosition
      style={{ width: 550, height: 300 }}
      value={{ lnglat: [116.905163, 40.006047], location: '' }}
      isReadOnly
    />
  );
};
