import React from 'react';
import { Monitor } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Monitor
      style={{ height: 500 }}
      name="设备名称"
      id="device-0001"
      source={{
        flv: '//player.alicdn.com/video/aliyunmedia.mp4',
        hls: '//player.alicdn.com/video/aliyunmedia.mp4'
      }}
      isOffline
    />
  );
};
