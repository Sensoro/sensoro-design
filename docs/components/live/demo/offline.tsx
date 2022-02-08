import React from 'react';
import { Live } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Live style={{ height: 500 }} isOffline source="//player.alicdn.com/video/aliyunmedia.mp4" />
  );
};
