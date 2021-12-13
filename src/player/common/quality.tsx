import React, { FC, memo } from 'react';
import { Popover, Menu } from 'antd';
import { MenuProps } from 'antd/es/menu';

interface QualityProps {
  prefixCls?: string;
  maxQuality?: QUALITY;
  quality?: QUALITY;
  onChange?: (value: QUALITY) => void;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

export enum QUALITY {
  FHD = 0,
  HD = 1,
  SD = 2
}

const qualityTextMap = {
  2: '标清',
  1: '高清',
  0: '超清'
};

const Quality: FC<QualityProps> = (props) => {
  const { prefixCls, maxQuality, quality, getPopupContainer, onChange } = props;

  const handleQualityChange: MenuProps['onClick'] = (e) => {
    onChange?.(e.key as QUALITY);
  };

  const menus = (
    <Menu selectedKeys={[quality + '']} onSelect={handleQualityChange}>
      {maxQuality === QUALITY.FHD && (
        <Menu.Item key={QUALITY.FHD}>{qualityTextMap[QUALITY.FHD]}</Menu.Item>
      )}
      {(maxQuality === QUALITY.HD || maxQuality === QUALITY.FHD) && (
        <Menu.Item key={QUALITY.HD}>{qualityTextMap[QUALITY.HD]}</Menu.Item>
      )}
      {(maxQuality === QUALITY.SD || maxQuality === QUALITY.HD || maxQuality === QUALITY.FHD) && (
        <Menu.Item key={QUALITY.SD}>{qualityTextMap[QUALITY.SD]}</Menu.Item>
      )}
    </Menu>
  );

  return (
    <Popover
      overlayClassName={`${prefixCls}-popover`}
      trigger="hover"
      getPopupContainer={getPopupContainer}
      content={menus}
    >
      <div className={`${prefixCls}`}>{qualityTextMap[quality]}</div>
    </Popover>
  );
};

Quality.defaultProps = {
  prefixCls: 'sen-player-quality'
};

export default memo(Quality);
