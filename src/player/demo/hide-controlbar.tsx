import React, { FC } from 'react';
import { Player } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <Player
      style={{ height: 500 }}
      hideControlbar
      source="//stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4"
      options={{
        autoplay: true
      }}
    />
  );
};

export default Example;
