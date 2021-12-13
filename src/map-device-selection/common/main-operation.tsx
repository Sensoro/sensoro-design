import React, { FC, useContext } from 'react';
import classNames from '@pansy/classnames';
import Map from '../../map';
import Icon from '../../icon';
import { ExpansionProps } from '../../map/types';
import { ConfigContext } from '../../config-provider';

const { Theme } = Map;
const operations = [
  { type: 'circle', label: '圆形', icon: 'icon-round-selection' },
  { type: 'rectangle', label: '矩形', icon: 'icon-square-selection' },
  { type: 'polygon', label: '多边形', icon: 'icon-polygon-selected' }
];

interface ReadonlyOperationProps extends ExpansionProps {
  themeStatus?: boolean;
  operationType?: string;
  onThemeStatusChange?: (status: boolean) => void;
  onDrawTypeChange?: (status: string) => void;
}

const ReadonlyOperation: FC<ReadonlyOperationProps> = ({
  __map__,
  themeStatus,
  operationType,
  onDrawTypeChange,
  onThemeStatusChange
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('map-device-selection-operation');

  return (
    <div className={classNames(`${prefixCls}`)}>
      <Theme
        defaultStatus={themeStatus}
        __map__={__map__}
        style={{ marginRight: 8 }}
        className={classNames(`${prefixCls}-item`, {
          [`${prefixCls}-active`]: themeStatus
        })}
        onStatusChange={onThemeStatusChange}
      />

      {operations.map((item) => (
        <span
          key={item.type}
          className={classNames(`${prefixCls}-item`, {
            [`${prefixCls}-active`]: operationType === item.type
          })}
          onClick={() => {
            onDrawTypeChange?.(item.type);
          }}
        >
          <Icon type={item.icon} />
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default ReadonlyOperation;
