import React from 'react';
import { MapPosition, Icon } from '@sensoro/sensoro-design';

export default () => {
  return (
    <MapPosition
      style={{ width: 550, height: 300 }}
      icon={<Icon type="icon-car-outlined" style={{ fontSize: 24, color: 'red' }} />}
    />
  );
};
