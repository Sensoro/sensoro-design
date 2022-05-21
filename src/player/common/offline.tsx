import React, { FC } from 'react';
import OfflineOutlined from '@sensoro-design/icons/OfflineOutlined';

const Offline: FC = () => {
  return (
    <div className={`sen-player-offline`}>
      <OfflineOutlined />
      <div>设备已离线，请检查设备或网络</div>
    </div>
  );
};

export default Offline;
