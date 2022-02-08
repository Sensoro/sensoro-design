import React, { FC } from 'react';
import { Player } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <div style={{ height: 500 }}>
      <Player
        source="//stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4"
        options={{
          autoplay: true
        }}
        onDownload={() => {
          console.log('触发下载');
        }}
      />
    </div>
  );
};

export default Example;
