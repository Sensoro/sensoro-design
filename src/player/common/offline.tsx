import React, { FC } from 'react';
import Icon from '../../icon';

const Offline: FC = () => {
  return (
    <div className={`sen-player-offline`}>
      <Icon type="icon-offline" />
      <div>设备已离线，请检查设备或网络</div>
    </div>
  );
};

export default Offline;
