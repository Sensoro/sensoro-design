import React, { useContext } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import classNames from '@pansy/classnames';
import Icon from '../../icon';
import { DeviceInfo } from '../interface';
import { ConfigContext } from '../../config-provider';

interface BuildingMarkerProps {
  info: DeviceInfo;
  onClick?: (info: DeviceInfo) => void;
}

const BuildingMarker: React.FC<BuildingMarkerProps> = ({ info }) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('map-device-selection-marker');

  return (
    <div
      className={classNames(prefixCls, {
        [`${prefixCls}-offline`]: info.status !== 1
      })}
    >
      <Icon type={info?.titleIcon?.type || 'icon-camera'} />

      {info.selected && (
        <div className={`${prefixCls}-selected`}>
          <CheckOutlined />
        </div>
      )}
    </div>
  );
};

export default BuildingMarker;
