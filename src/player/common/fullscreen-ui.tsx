import React, { FC, memo } from 'react';
import FullscreenExitOutlined from '@sensoro-design/icons/FullscreenExitOutlined';
import FullscreenOutlined from '@sensoro-design/icons/FullscreenOutlined';

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
      {state ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    </div>
  );
};

FullscreenUI.defaultProps = {
  prefixCls: 'sen-player-fullscreen'
};

export default memo(FullscreenUI);
