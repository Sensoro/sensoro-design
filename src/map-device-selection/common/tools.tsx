import React, { FC, useContext } from 'react';
import classNames from '@pansy/classnames';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Icon from '../../icon';
import { ConfigContext } from '../../config-provider';
import { ExpansionProps } from '../../map/types';

interface ToolsProps extends ExpansionProps {
  showList?: ('zooms' | 'center')[];
  onGeoClick?: () => void;
}

const Tools: FC<ToolsProps> = ({ __map__, showList = [], onGeoClick }) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('map-device-selection-tools');

  const handlePlusClick = () => {
    __map__?.zoomIn();
  };

  const handleMinusClick = () => {
    __map__?.zoomOut();
  };

  return (
    <div className={prefixCls}>
      {showList.includes('center') && (
        <div className={classNames(`${prefixCls}-geo`, `${prefixCls}-item`)} onClick={onGeoClick}>
          <Icon type="icon-aim" />
        </div>
      )}
      {showList.includes('center') && (
        <div className={`${prefixCls}-zooms`}>
          <div className={`${prefixCls}-item`} onClick={handlePlusClick}>
            <PlusOutlined />
          </div>
          <div className={`${prefixCls}-item`} onClick={handleMinusClick}>
            <MinusOutlined />
          </div>
        </div>
      )}
    </div>
  );
};

Tools.defaultProps = {
  showList: ['center', 'zooms']
};

export default Tools;
