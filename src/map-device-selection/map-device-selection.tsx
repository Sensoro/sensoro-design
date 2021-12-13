import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { message } from 'antd';
import classNames from '@pansy/classnames';
import { ConfigContext } from '../config-provider';
import Map from '../map';
import { Tools, Card, Marker, ReadonlyOperation, MainOperation } from './common';
import { DeviceInfo, ServerDeviceInfo, OperationType } from './interface';
import { transformGBServerData, transformSenServerData } from './utils';

export interface MapDeviceSelectionProps {
  /**
   * 额外的样式类
   */
  className?: string;
  /**
   * 额外的样式
   */
  style?: React.CSSProperties;
  /**
   * 选中的设备集合
   */
  value?: string[];
  /**
   * 指定设备中唯一标识，只针对于灵思设备，请谨慎设置
   * @default `cid`
   */
  deviceKey?: string;
  /**
   * 是否是只读状态
   */
  readonly?: boolean;
  /**
   * 设备集合
   */
  list?: ServerDeviceInfo[] | DeviceInfo[];
  /**
   * 国标设备集合
   */
  listGB?: ServerDeviceInfo[] | DeviceInfo[];
  /**
   * 是否需要处理数据
   * 使用场景上层组件已调用utils中的转换数据的方法
   */
  transformData?: boolean;
  /**
   * 设备选择变化的回调
   */
  onChange?: (value: string[]) => void;
  /**
   * 选择设备点击回调
   */
  onSelectDeviceClick?: () => void;
}

const { Markers, MouseTool } = Map;

const MapDeviceSelection: React.FC<MapDeviceSelectionProps> = ({
  className,
  style,
  readonly,
  deviceKey,
  transformData,
  list = [],
  listGB = [],
  value,
  onChange,
  onSelectDeviceClick
}) => {
  // 地图实例
  const mapInstance = useRef<any>(null);
  // 聚合实例
  const markersInstance = useRef<any>(null);
  // 鼠标工具插件实例
  const mouseToolInstance = useRef<any>(null);
  // 覆盖物实例
  const overlayerInstance = useRef<any>(null);
  const lock = useRef<boolean>(false);
  const timer = useRef<NodeJS.Timer>(null);
  // 地图主题
  const [themeStatus, setThemeStatus] = useState<boolean>(false);
  // 是否存在国标设备
  const [isGB, setIsGB] = useState<boolean>(false);
  // 操作类型
  const [operationType, setOperationType] = useState<OperationType>();
  // 设备源数据
  const [sourceDevices, setSourceDevices] = useState<DeviceInfo[]>([]);
  // 组件内部维护的选中的设备
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const { getPrefixCls } = useContext(ConfigContext);

  const setInternalValueCal = useCallback(
    (nextValue: string[] = []) => {
      setInternalValue(nextValue);
      onChange?.(nextValue);
    },
    [setInternalValue]
  );

  useEffect(() => {
    timer.current = setTimeout(() => {
      if (!lock.current && mapInstance.current && markersInstance.current) {
        mapInstance.current.setFitView(markersInstance.current);
        lock.current = true;
      }
    }, 200);

    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [markersInstance.current, mapInstance.current]);

  useEffect(() => {
    setIsGB(!!listGB?.length);
    setInternalValue([]);
    removeOverlayer();

    let devices = [];

    if (transformData) {
      devices = [
        ...((list || []) as ServerDeviceInfo[])?.map((item) =>
          transformSenServerData(item, deviceKey)
        ),
        ...((listGB || []) as ServerDeviceInfo[])?.map?.(transformGBServerData)
      ];
    } else {
      devices = [...list, ...listGB];
    }

    setSourceDevices(
      devices.filter((item) => {
        return item.position && item.position.latitude && item.key;
      })
    );
  }, [JSON.stringify(list), JSON.stringify(listGB)]);

  useEffect(() => {
    setInternalValue(Array.isArray(value) ? value : []);
    setSourceDevices((currentList) => {
      return currentList?.map((item) => {
        if (value?.includes(item.key)) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });
    });
  }, [value]);

  const prefixCls = getPrefixCls('map-device-selection');

  const mapEvents = {
    created: (map: any) => {
      mapInstance.current = map;
    }
  };

  const markersEvents = {
    created: (markers: any) => {
      markersInstance.current = markers;
    }
  };

  const toolEvents = {
    created: (tool) => {
      mouseToolInstance.current = tool;
    },
    draw({ obj }: any) {
      handleDrawEnd(obj);
    }
  };

  /**
   * 框选结束回调
   * @param data
   */
  const handleDrawEnd = (data: any) => {
    overlayerInstance.current = data;
    handleDrawClose();

    // 判断是否框选的标识
    let isSelected = false;

    // 处理设备的选中状态
    const newSourceDevices = sourceDevices.map((item) => {
      let selected = false;
      if (
        // @ts-ignore
        data.contains(new window.AMap.LngLat(item.position.longitude, item.position.latitude))
      ) {
        selected = true;
        isSelected = true;
      }

      if (internalValue.includes(item.key)) {
        selected = true;
      }

      return {
        ...item,
        selected
      };
    });

    setSourceDevices(newSourceDevices);
    setInternalValueCal(newSourceDevices.filter((item) => item.selected).map((item) => item.key));

    if (!isSelected) {
      message.warning('未框选到任何设备');
      setOperationType(undefined);
      removeOverlayer();
    }
  };

  const handleDrawTypeChange = (value: OperationType) => {
    const mouseTool = mouseToolInstance.current;
    setOperationType(value);
    if (!mouseTool || !value) return;

    removeOverlayer();

    /**
     * 绘制圆形
     */
    if (value === 'circle') {
      mouseTool.circle();
    }
    /**
     * 绘制矩形
     */
    if (value === 'rectangle') {
      mouseTool.rectangle();
    }
    /**
     * 绘制多边形
     */
    if (value === 'polygon') {
      mouseTool.polygon();
    }
  };

  /**
   * 关闭绘图
   */
  const handleDrawClose = () => {
    const mouseTool = mouseToolInstance.current;
    if (mouseTool) {
      mouseTool.close();
    }
  };

  const handleReset = () => {
    setSourceDevices(
      sourceDevices.map((item) => {
        return {
          ...item,
          selected: false
        };
      })
    );

    removeOverlayer();
    setInternalValueCal([]);
  };

  const handleRemove = (id: string) => {
    if (!id) return;
    const devices = sourceDevices.map((item) => {
      if (item.key === id) {
        return {
          ...item,
          selected: false
        };
      }

      return item;
    });

    const newSelectDevices = devices.filter((item) => item.selected);

    if (!newSelectDevices.length) {
      removeOverlayer();
    }

    setSourceDevices(devices);
    setInternalValueCal(newSelectDevices.map((item) => item.key));
  };

  /**
   * 删除覆盖物
   */
  const removeOverlayer = () => {
    if (mapInstance.current && overlayerInstance.current) {
      mapInstance.current.remove([overlayerInstance.current]);
      setOperationType(undefined);
    }
  };

  const handleThemeStatusChange = (status: boolean) => {
    setThemeStatus(status);
  };

  return (
    <Map
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
      events={mapEvents}
      features={themeStatus ? [] : ['bg', 'point', 'road']}
    >
      {/** 入口操作  */}
      {readonly && (
        <ReadonlyOperation
          themeStatus={themeStatus}
          onThemeStatusChange={handleThemeStatusChange}
          onSelectDeviceClick={onSelectDeviceClick}
        />
      )}

      {/** 主操作  */}
      {!readonly && (
        <MainOperation
          themeStatus={themeStatus}
          operationType={operationType}
          onDrawTypeChange={handleDrawTypeChange}
          onThemeStatusChange={handleThemeStatusChange}
        />
      )}

      <Tools
        showList={sourceDevices.length ? ['center', 'zooms'] : ['zooms']}
        onGeoClick={() => {
          if (mapInstance.current && markersInstance.current) {
            mapInstance.current.setFitView(markersInstance.current);
          }
        }}
      />

      {!readonly && (
        <Card
          useGB={isGB}
          devices={sourceDevices.filter((item) => item.selected)}
          onReset={handleReset}
          onRemove={handleRemove}
        />
      )}

      <MouseTool events={toolEvents} />

      <Markers
        markers={sourceDevices || []}
        render={(data: DeviceInfo) => {
          return <Marker info={data} />;
        }}
        events={markersEvents}
        useCluster={{
          zoomOnClick: () => {},
          renderCluserMarker: ({ count, marker, markers }: any) => {
            const list: DeviceInfo[] = markers
              .map((item: any) => {
                return item?.w?.extData || item?.Ce?.extData;
              })
              .filter((item: DeviceInfo) => item?.selected);

            if (list.length) {
              marker.setContent(
                `<div class="${prefixCls}-markers"><span class="ant-badge ant-badge-not-a-wrapper"><sup class="ant-badge-count">${list.length}</sup></span>${count}</div>`
              );
            } else {
              marker.setContent(`<div class="${prefixCls}-markers">${count}</div>`);
            }
          }
        }}
      />
    </Map>
  );
};

MapDeviceSelection.defaultProps = {
  readonly: false,
  deviceKey: 'cid',
  transformData: true
};

MapDeviceSelection.displayName = 'SenMapDeviceSelection';

export default MapDeviceSelection;
