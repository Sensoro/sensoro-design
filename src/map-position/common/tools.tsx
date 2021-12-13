import React, { FC } from 'react';
import classNames from '@pansy/classnames';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Icon from '../../icon';
import { ExpansionProps, ArrayLngLat } from '../../map/types';

interface ToolsProps extends ExpansionProps {
  prefixCLs?: string;
  position?: ArrayLngLat;
}

const Tools: FC<ToolsProps> = ({ prefixCLs, __map__, position }) => {
  const handlePlusClick = () => {
    __map__?.zoomIn();
  };

  const handleMinusClick = () => {
    __map__?.zoomOut();
  };

  const handleGeoClick = () => {
    if (position?.[0]) {
      __map__?.setCenter(position);
    }
  };

  return (
    <div className={prefixCLs}>
      <div className={classNames(`${prefixCLs}-geo`, `${prefixCLs}-item`)} onClick={handleGeoClick}>
        <Icon type="icon-aim" />
      </div>
      <div className={`${prefixCLs}-zooms`}>
        <div className={`${prefixCLs}-item`} onClick={handlePlusClick}>
          <PlusOutlined />
        </div>
        <div className={`${prefixCLs}-item`} onClick={handleMinusClick}>
          <MinusOutlined />
        </div>
      </div>
    </div>
  );
};

Tools.defaultProps = {
  prefixCLs: 'sen-map-position-tools'
};

export default Tools;
