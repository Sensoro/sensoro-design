import React from 'react';
import moment from 'moment';
import { Live } from '@sensoro/sensoro-design';

export default () => {
  const style = {
    height: 500
  };

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
    opacity: 0.5,
    fontColor: 'red'
  };

  return (
    <Live
      style={style}
      watermark={watermarkProps}
      source="https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4"
    />
  );
};
