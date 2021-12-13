import React, { useState, useEffect, useContext } from 'react';
import classNames from '@pansy/classnames';
import Map from '../map';
import Icon from '../icon';
import { ConfigContext } from '../config-provider';
import { Tools, SelectPosition } from './common';
import { ArrayLngLat } from '../map/types';

export type MapPositionValue = {
  lnglat?: ArrayLngLat;
  location: string;
};

export interface MapPositionProps {
  className?: string;
  style?: React.CSSProperties;
  value?: MapPositionValue;
  onChange?: (value: MapPositionValue) => void;
  isReadOnly?: boolean;
  offset?: [number, number],
  icon?: React.ReactNode;
}

const { SearchAddress, Marker, Theme } = Map;

const MapPosition: React.FC<MapPositionProps> = ({
  style,
  className,
  value,
  onChange,
  isReadOnly,
  offset,
  icon
}) => {
  const { lnglat = [] } = value || {};
  const [markerPosition, setMarkerPosition] = useState<ArrayLngLat>();
  const { getPrefixCls } = useContext(ConfigContext);

  useEffect(() => {
    if (lnglat[0] && lnglat[1]) {
      setMarkerPosition(lnglat as ArrayLngLat);
    }
  }, [value]);

  const prefixCls = getPrefixCls('map-position');

  const PositionIcon = icon || <Icon className={`${prefixCls}-marker-icon`} type="icon-position" />;

  const handleSelectPositionChange = (data: MapPositionValue) => {
    setMarkerPosition(data.lnglat);
    onChange?.(data);
  };

  return (
    <Map
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      {!isReadOnly && <SearchAddress />}
      {!isReadOnly && <SelectPosition onChange={handleSelectPositionChange} />}
      {!isReadOnly && <Tools position={[116.397884, 39.899459]} />}

      <Theme className={`${prefixCls}-theme`} />

      {markerPosition?.[0] && (
        <Marker
          position={markerPosition}
          offset={offset}
          render={() => PositionIcon}
        />
      )}
    </Map>
  );
};

MapPosition.defaultProps = {
  offset: [-16, -16],
  isReadOnly: false
};

export default MapPosition;
