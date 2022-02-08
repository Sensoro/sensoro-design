import React, { FC } from 'react';
import { Image } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <Image
      watermark={{ text: '王幸康', width: 120, height: 120 }}
      style={{ width: 200, height: 300 }}
      fit="contain"
      src="https://aip.bdstatic.com/portal-pc-node/dist/1588235213450/images/technology/face/detect/demo-card-1.jpg"
    />
  );
};

export default Example;
