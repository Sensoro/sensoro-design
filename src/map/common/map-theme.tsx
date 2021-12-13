import React, { FC, CSSProperties, useState, useEffect, useContext } from 'react';
import classNames from '@pansy/classnames';
import { MAP_STYLES, imageBase64 } from '../config';
import Icon from '../../icon';
import { ExpansionProps } from '../types';
import { ConfigContext } from '../../config-provider';

interface MapThemeProps extends ExpansionProps {
  className?: string;
  style?: CSSProperties;
  defaultStatus?: boolean;
  onStatusChange?: (status: boolean) => void;
}

const MapTheme: FC<MapThemeProps> = ({
  className,
  __map__,
  defaultStatus,
  onStatusChange,
  style
}) => {
  const [gridStatus, setGridStatus] = useState<boolean>(!!defaultStatus);
  const [sateLite, setSateLite] = useState<any>(null);
  const [markerLayer, setMarkLayer] = useState<any>(null);

  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('map-theme');

  useEffect(() => {
    try {
      __map__?.plugin(['AMap.TileLayer'], () => {
        // @ts-ignore
        const sate = new window.AMap.TileLayer.Satellite();
        // @ts-ignore
        const layer = new window.AMap.TileLayer.Flexible({
          cacheSize: 30,
          opacity: 0.9,
          //@ts-ignore
          createTile: function (x, y, z, success, fail) {
            let img = document.createElement('img');
            img.onload = function () {
              success(img);
            };
            img.crossOrigin = 'anonymous';
            img.onerror = function () {
              fail();
            };
            img.src = imageBase64;
          }
        });
        setMarkLayer(layer);
        setSateLite(sate);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleThemeChange = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (gridStatus) {
      __map__?.setMapStyle(MAP_STYLES.whiteSmoke);
      markerLayer && __map__?.remove([sateLite, markerLayer]);
      setGridStatus(false);
      onStatusChange?.(false);
    } else {
      __map__?.setMapStyle(MAP_STYLES.grid);
      markerLayer && __map__?.add([sateLite, markerLayer]);
      setGridStatus(true);
      onStatusChange?.(true);
    }
  };

  return (
    <span
      onClick={handleThemeChange}
      className={classNames(className, `${prefixCls}-operator`, {
        [`${prefixCls}-operator`]: true,
        [`${prefixCls}-active`]: gridStatus
      })}
      style={style}
    >
      <Icon type="icon-map-theme-grid" />
      实景
    </span>
  );
};

export default MapTheme;
