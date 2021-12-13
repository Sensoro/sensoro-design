import React from 'react';
import { MapDeviceSelection } from '@sensoro/sensoro-design';
import { devices } from './data-source';

export default () => {
  return <MapDeviceSelection readonly style={{ width: 550, height: 300 }} list={devices} />;
};
