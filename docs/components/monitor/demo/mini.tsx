import React from 'react';
import { Monitor } from '@sensoro/sensoro-design';

export default () => {
  const videos = [
    {
      duration: 52,
      from: 1588003208141,
      objectSignUrl:
        'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4'
    },
    {
      duration: 76,
      from: 1588004187521,
      objectSignUrl:
        'https://stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4'
    },
    {
      duration: 68,
      from: 1588005994815,
      objectSignUrl:
        'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4'
    }
  ];

  const handleHistorySearch = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(videos);
      }, 2000);
    });
  };

  const handleDownload = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('');
      }, 1000);
    });
  };

  const style = {
    height: 247,
    width: 295
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
      onHistorySearch={handleHistorySearch as any}
      onDownload={handleDownload as any}
    />
  );
};
