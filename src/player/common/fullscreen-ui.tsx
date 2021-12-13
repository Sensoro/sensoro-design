import React, { FC, memo } from 'react';
import Icon from '../../icon';

export interface FullscreenUIProps {
  prefixCls?: string;
  state?: boolean;
  onChange?: (status?: boolean) => void;
}

const FullscreenUI: FC<FullscreenUIProps> = (props) => {
  const { prefixCls, state, onChange } = props;

  const handleChangeFullscreen = () => {
    onChange?.(state);
  };

  return (
    <div className={`${prefixCls}`} onClick={handleChangeFullscreen}>
      <Icon type={`icon-${state ? 'fullscreen-exit' : 'fullscreen'}`} />
    </div>
  );
};

FullscreenUI.defaultProps = {
  prefixCls: 'sen-player-fullscreen'
};

export default memo(FullscreenUI);
