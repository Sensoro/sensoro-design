import React, { FC, useState, memo } from 'react';
import { Slider, Popover } from 'antd';
import MuteOutlined from '@sensoro-design/icons/MuteOutlined';
import SoundOutlined from '@sensoro-design/icons/SoundOutlined';
import SoundSmallOutlined from '@sensoro-design/icons/SoundSmallOutlined';

export interface VolumeProps {
  prefixCls?: string;
  onChange?: (value: number) => void;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

const volumeIcons = {
  0: <MuteOutlined />,
  1: <SoundSmallOutlined />,
  2: <SoundOutlined />
};

const Volume: FC<VolumeProps> = (props) => {
  const { prefixCls, getPopupContainer, onChange } = props;
  const [volumeValue, setVolumeValue] = useState<number>(0);
  const [volumeStatus, setVolumeStatus] = useState<number>(0);

  const handleChange = (value: number) => {
    setVolumeValue(value);

    if (value === 0) {
      setVolumeStatus(0);
    }
    if (value > 0 && value < 50) {
      setVolumeStatus(1);
    }
    if (value >= 50) {
      setVolumeStatus(2);
    }

    onChange?.(value / 100);
  };

  return (
    <Popover
      overlayClassName={`${prefixCls}-popover`}
      trigger="hover"
      getPopupContainer={getPopupContainer}
      content={
        <div className={`${prefixCls}-content`}>
          <div className={`${prefixCls}-value`}>{volumeValue}%</div>
          <div className={`${prefixCls}-slider`}>
            <Slider vertical value={volumeValue} tooltipVisible={false} onChange={handleChange} />
          </div>
        </div>
      }
    >
      <div className={`${prefixCls}`}>{volumeIcons[volumeStatus]}</div>
    </Popover>
  );
};

Volume.defaultProps = {
  prefixCls: 'sen-player-volume'
};

export default memo(Volume);
