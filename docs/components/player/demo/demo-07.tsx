import React from 'react';
import moment from 'moment';
import { Player } from '@sensoro/sensoro-design';

export default () => {
  const profile = {
    nickname: '王幸康',
    mobile: '17710088888'
  };

  const watermarkProps = {
    text: () => {
      return [
        `${profile.nickname.substr(0, 5)} ${profile.mobile.substr(profile.mobile.length - 4, 4)}`,
        moment().format('YYYYMMDDHHmmss')
      ];
    },
    fontColor: '#fff'
  };

  return (
    <div style={{ height: 500 }}>
      <Player
        source="https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4"
        watermark={watermarkProps}
        options={{
          autoplay: true
        }}
      />
    </div>
  );
};
