import React from 'react';
import { MapDeviceSelection } from '@sensoro/sensoro-design';
import { devices } from './data-source';

export default () => {
  return (
    <MapDeviceSelection
      style={{ height: 500 }}
      deviceKey="sn"
      list={devices}
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};
