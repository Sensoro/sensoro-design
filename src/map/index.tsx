import React, { FC, CSSProperties } from 'react';
import classNames from '@pansy/classnames';
import {
  Map as AMap,
  MapProps as AMapProps,
  Marker,
  Circle,
  Markers,
  Polygon,
  Polyline,
  MouseTool,
  InfoWindow,
  GroundImage,
  CircleEditor
} from '@sensoro/react-amap';
import { SearchAddress, Theme as MapTheme } from './common';
import { Theme } from '../config-provider/types';
import { MAP_CONFIG, MAP_STYLES } from './config';

export interface MapProps extends AMapProps<any> {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  theme?: Theme;
  // 默认的1.3.29 版本 不支持自定义图层，地图页卫星地图需要加一个遮盖层
  spareVersion?: boolean;
}

export interface MapType extends FC<MapProps> {
  Marker: typeof Marker;
  Circle: typeof Circle;
  Polygon: typeof Polygon;
  Markers: typeof Markers;
  Polyline: typeof Polyline;
  MouseTool: typeof MouseTool;
  InfoWindow: typeof InfoWindow;
  CircleEditor: typeof CircleEditor;
  GroundImage: typeof GroundImage;
  SearchAddress: typeof SearchAddress;
  Theme: typeof MapTheme;
}

const Map: MapType = (props) => {
  const { prefixCls, className, style, children, theme, spareVersion, ...rest } = props;

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <AMap
        amapkey={MAP_CONFIG.key}
        zooms={[4, 18]}
        version={MAP_CONFIG.version}
        mapStyle={MAP_STYLES.whiteSmoke}
        {...rest}
      >
        {children}
      </AMap>
    </div>
  );
};

Map.defaultProps = {
  prefixCls: 'sen-map'
};

Map.Marker = Marker;
Map.Circle = Circle;
Map.Markers = Markers;
Map.Polygon = Polygon;
Map.Polyline = Polyline;
Map.MouseTool = MouseTool;
Map.InfoWindow = InfoWindow;
Map.CircleEditor = CircleEditor;
Map.GroundImage = GroundImage;
Map.SearchAddress = SearchAddress;
Map.Theme = MapTheme;

export default Map;
