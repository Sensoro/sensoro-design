import React, { FC, useContext } from 'react';
import classNames from '@pansy/classnames';
import { PlusOutlined } from '@ant-design/icons';
import Map from '../../map';
import { ExpansionProps } from '../../map/types';
import { ConfigContext } from '../../config-provider';

const { Theme } = Map;

interface ReadonlyOperationProps extends ExpansionProps {
  themeStatus?: boolean;
  onSelectDeviceClick?: () => void;
  onThemeStatusChange?: (status: boolean) => void;
}

const ReadonlyOperation: FC<ReadonlyOperationProps> = ({
  __map__,
  themeStatus,
  onSelectDeviceClick,
  onThemeStatusChange
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('map-device-selection-operation');

  return (
    <div className={classNames(`${prefixCls}`, `${prefixCls}-mini`)}>
      <Theme
        defaultStatus={themeStatus}
        __map__={__map__}
        className={classNames(`${prefixCls}-item`, {
          [`${prefixCls}-active`]: themeStatus
        })}
        onStatusChange={onThemeStatusChange}
      />
      <span className={`${prefixCls}-item`} onClick={onSelectDeviceClick}>
        <PlusOutlined />
        选择设备
      </span>
    </div>
  );
};

export default ReadonlyOperation;
