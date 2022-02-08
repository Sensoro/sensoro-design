import React, { FC } from 'react';
import { Icon } from '@sensoro/sensoro-design';
import './icon-item.less';

export interface IconInfo {
  type: string;
  name: string;
}

interface IconItemProps {
  info: IconInfo;
}

const IconItem: FC<IconItemProps> = (props) => {
  const { info } = props;
  return (
    <div className="demo-icon-item">
      <div className="icon-twrap">
        <Icon type={info.type} />
      </div>
      <div className="icon-name">{info.name}</div>
      <div className="icon-name">{info.type}</div>
    </div>
  );
};

export default IconItem;
