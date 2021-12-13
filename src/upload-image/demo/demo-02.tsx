import React from 'react';
import { UploadImage } from '@sensoro/sensoro-design';

export default () => {
  return (
    <div>
      <UploadImage
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        accept=".png,.jpg,.jpeg,video/mp4"
        desc="限3张以内，PNG/JPG格式，大小不超过1M"
        videoSizeLimit={1024 * 10}
        value={
          [
            {
              uid: '001',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            },
            {
              uid: '002',
              name: 'test.mp4',
              status: 'done',
              url:
                'http://stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4'
            }
          ] as any
        }
      />
    </div>
  );
};
