import React from 'react';
import moment from 'moment';
import { Watermark } from '@sensoro/sensoro-design';

export default () => {
  const profile = {
    nickname: '王幸康',
    mobile: '17710088888'
  };

  return (
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
    >
      <div style={{ position: 'relative', height: 300 }}>
        <button>123</button>
      </div>
    </Watermark>
  );
};
