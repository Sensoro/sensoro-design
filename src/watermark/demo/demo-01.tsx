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
            `${profile.nickname.slice(0, 5)} ${profile.mobile.slice(
              profile.mobile.length - 4,
              profile.mobile.length
            )}`,
            moment().format('YYYYMMDDHHmmss')
          ];
        }}
      />
      <button>123</button>
    </div>
  );
};
