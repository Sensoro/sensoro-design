import React, { useRef } from 'react';
import { Button } from 'antd';
import { Player } from '@sensoro/sensoro-design';

export default () => {
  const player = useRef();

  return (
    <>
      <div style={{ height: 500 }}>
        <Player
          ref={player}
          source="//stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4"
          options={{
            autoplay: true
          }}
          onDownload={() => {
            console.log('触发下载');
          }}
        />
      </div>
      <Button
        onClick={() => {
          console.log(player.current)
        }}
      >
        点击
      </Button>
    </>
  );
};
