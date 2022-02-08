import React from 'react';
import { DoublePlayer } from '@sensoro/sensoro-design';

export default () => {
  return (
    <div style={{ height: 500 }}>
      <DoublePlayer
        sources={[
          '//stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4',
          '//stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4'
        ]}
        isLive
      />
    </div>
  );
};
