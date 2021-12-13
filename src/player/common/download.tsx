import React, { FC, memo } from 'react';
import Icon from '../../icon';

export interface DownloadProps {
  prefixCls?: string;
  state?: boolean;
  onClick?: (status?: boolean) => void;
}

const Download: FC<DownloadProps> = (props) => {
  const { prefixCls, state, onClick } = props;

  const handleClick = () => {
    onClick?.(state);
  };

  return (
    <div className={`${prefixCls}`} onClick={handleClick}>
      <Icon type="icon-download" />
    </div>
  );
};

Download.defaultProps = {
  prefixCls: 'sen-player-download'
};

export default memo(Download);
