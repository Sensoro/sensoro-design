import React from 'react';
import { Monitor } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Monitor
      id="1"
      style={{ height: 500 }}
      source={{
        flv: '//player.alicdn.com/video/aliyunmedia1.mp4',
        hls:
          'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4'
      }}
    />
  );
};
