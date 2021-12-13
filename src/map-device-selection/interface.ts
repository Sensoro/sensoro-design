import { MenuData } from '../tree/tree';
import { DeviceUsageType } from './config';
import { IconFontProps } from '@ant-design/icons/es/components/IconFont';

export type DeviceStatus = 0 | 1;
export type GBDeviceStatus = 'online' | 'offline' | 'unregistered';
export type OperationType = 'circle' | 'rectangle' | 'polygon' | undefined;

export interface ChannelBaseInfo {
  // 通道编号
  channel: string | number;
  channelSerial: string;
  // 通道名称
  name: string;
}

export interface ChannelStreamInfo {
  // 是否推流
  isLive: boolean;
  flvUrl: string;
}

export interface ChannelInfo extends ChannelBaseInfo, ChannelStreamInfo {}

export interface ServerDeviceInfo {
  // 设备ID
  id: string | number;
  // 升哲设备独有
  cid?: string | number;
  /**
   * 设备SN，国标设备可能不存在
   */
  sn: string;
  /**
   * 设备名称
   */
  name: string;
  /**
   * 设备地址
   */
  address: string;
  /**
   * 设备经纬度
   */
  lng: number;
  lat: number;
  /**
   * 设备状态
   *   0: 离线、1: 在线
   * 国标设备 **需要处理**
   *   unregistered: 未注册-离线
   *   online: 注册-在线
   *   offline: 注册-离线
   */
  status: DeviceStatus | GBDeviceStatus;
  /**
   * 设备使用类型，决定显示的Icon
   * 国标设备强制使用 普通网络摄像机
   */
  deviceUsageType?: DeviceUsageType;
  flvUrl?: string;
  m3u8Url?: string;
  [key: string]: any;
}

export interface DeviceInfo {
  // 设备编号
  sn: string;
  // 唯一标识
  key: string;
  // 设备名称
  title: string;
  // 左侧操作配置
  menus?: MenuData[];
  // 设备类型
  type: 'GB' | 'SENSORO';
  // 设备经纬度 - 前端使用
  position: {
    longitude: number;
    latitude: number;
  };
  titleIcon?: IconFontProps;
  // 设备状态
  status: DeviceStatus;
  deviceUsageType: DeviceUsageType;
  // 是否已选中，前端需要
  selected: boolean;
  flvUrl?: string;
  m3u8Url?: string;
  playable?: boolean;
  // 子节点 - 通道信息
  children?: (ChannelInfo & {
    key: string | number;
    title: string;
    flvUrl?: string;
    m3u8Url?: string;
  })[];
}
