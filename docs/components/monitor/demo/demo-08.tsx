import React from 'react';
import { Monitor } from '@sensoro/sensoro-design';

export default () => {
  const style = {
    height: 500
  };

  return (
    <Monitor
      style={style}
      name="设备名称"
      id="device-0001"
      isPolling
      hideTools={['close', 'download', 'fullscreen', 'volume', 'yuntai', 'changeLiveSource']}
      source={{
        flv: '//player.alicdn.com/video/aliyunmedia.mp4',
        hls: '//player.alicdn.com/video/aliyunmedia.mp4'
      }}
    />
  );
};
