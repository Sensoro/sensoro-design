import React from 'react';
import { Monitor } from '@sensoro/sensoro-design';

export default () => {
  const handleShowSelectRangeDate = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ value: 7, isEventRecord: false });
      }, 2000);
    });
  };

  const style = {
    height: 500
  };

  return (
    <Monitor
      style={style}
      name="设备名称"
      id="device-0001"
      source={{
        flv: '//player.alicdn.com/video/aliyunmedia.mp4',
        hls: '//player.alicdn.com/video/aliyunmedia.mp4'
      }}
      onShowSelectRangeDate={handleShowSelectRangeDate as any}
    />
  );
};
