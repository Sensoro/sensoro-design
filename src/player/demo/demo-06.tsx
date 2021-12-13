import React, { useState } from 'react';
import { Player, ScrollableBar } from '@sensoro/sensoro-design';
import '../../scrollable-bar/style';

export default () => {
  const [data] = useState<string[]>([
    'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4',
    'https://stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4',
    'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4'
  ]);
  const [currentSource, setCurrentSource] = useState<string>(data[0]);

  return (
    <div style={{ height: 500 }}>
      <Player
        source={currentSource}
        options={{
          autoplay: true
        }}
      />
      <ScrollableBar
        key="ScrollableBar-01"
        className="scrollable-bar-demo-01"
        onItemClick={(val) => {
          setCurrentSource(data[+val]);
        }}
        style={{
          width: 400
        }}
      >
        {data.map((item, index) => {
          return (
            <ScrollableBar.Item style={{ padding: '0 10px' }} key={index.toString()}>
              视频{index + 1}
            </ScrollableBar.Item>
          );
        })}
      </ScrollableBar>
    </div>
  );
};
