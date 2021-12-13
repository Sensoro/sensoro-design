import React from 'react';
import { MapDeviceSelection } from '@sensoro/sensoro-design';
import { devices, GBDevices } from './data-source';

export default () => {
  return <MapDeviceSelection style={{ height: 500 }} list={devices} listGB={GBDevices} />;
};
