import React from 'react';
import moment from 'moment';
import { DoublePlayer } from '@sensoro/sensoro-design';

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
      <DoublePlayer
        watermark={watermarkProps}
        sources={[
          '//stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4',
          '//stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4'
        ]}
      />
    </div>
  );
};
