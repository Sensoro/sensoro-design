import React from 'react';
import { Monitor } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Monitor
      style={{ height: 500 }}
      name="设备名称"
      id="device-0001"
      streamType="hls"
      source={{
        flv: '//player.alicdn.com/video/aliyunmedia.mp4',
        hls:
          'https://stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4'
      }}
    />
  );
};
