import React from 'react';
import moment from 'moment';
import { Watermark } from '@sensoro/sensoro-design';

export default () => {
  const profile = {
    nickname: '王幸康',
    mobile: '17710088888'
  };

  return (
    <div style={{ position: 'relative', height: 300 }}>
      <Watermark
        // @ts-ignore
        text={() => {
          return [
            `${profile.nickname.substr(0, 5)} ${profile.mobile.substr(
              profile.mobile.length - 4,
              4
            )}`,
            moment().format('YYYYMMDDHHmmss')
          ];
        }}
      />
      <button>123</button>
    </div>
  );
};
