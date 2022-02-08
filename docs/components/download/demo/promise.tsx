import React, { FC } from 'react';
import { Download, TextLink } from '@sensoro/sensoro-design';

const Example: FC = () => {
  const handleClick = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg');
      }, 2000);
    });
  };

  return (
    <div>
      <Download>
        <TextLink onClick={handleClick}>下载</TextLink>
      </Download>
    </div>
  );
};

export default Example;
