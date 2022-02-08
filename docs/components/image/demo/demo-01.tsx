import React, { FC } from 'react';
import { Image } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <Image
      style={{ width: 200, height: 300 }}
      fit="contain"
      src="https://aip.bdstatic.com/portal-pc-node/dist/1588235213450/images/technology/face/detect/demo-card-1.jpg"
    />
  );
};

export default Example;
