import React, { FC } from 'react';
import { UploadImage } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <div>
      <UploadImage
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        desc="限3张以内，PNG/JPG格式，大小不超过1M"
        value={
          [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }
          ] as any
        }
      />
    </div>
  );
};

export default Example;
