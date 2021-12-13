import { icons, DeviceUsageType } from './config';
import { DeviceInfo, ServerDeviceInfo, DeviceStatus } from './interface';

/**
 * 转换国标摄像机设备数据为前端所需数据格式
 */
export function transformGBServerData({
  channels = [],
  streams,
  status,
  ...rest
}: ServerDeviceInfo): DeviceInfo {
  const channelList = channels.map((item, key) => {
    const stream = streams[key];
    return {
      channel: `${rest.id}_${item.channel}`,
      name: item.name,
      gbId: stream?.gbId || rest.gbId,
      channelSerial: stream?.channelSerial,
      isLive: stream?.isLive,
      flvUrl: stream?.flvUrl,
      m3u8Url: stream?.m3u8Url
    };
  });

  const deviceStatus = status === 'online' ? 1 : 0;

  return {
    sn: '',
    key: rest.id as string,
    title: rest.name,
    type: 'GB',
    position: {
      longitude: rest.lng,
      latitude: rest.lat
    },
    titleIcon: {
      type: rest?.type === 'dstipc' ? 'icon-dstipc' : 'icon-camera',
      style: {
        color: deviceStatus ? '#2B6DE5' : '#00000040'
      }
    },
    status: deviceStatus,
    deviceUsageType: DeviceUsageType.COMMON_NETWORK,
    selected: false,
    children: channelList.map((item) => ({
      ...item,
      key: item.channel,
      title: item.name,
      flvUrl: item.flvUrl,
      m3u8Url: item.m3u8Url || item.flvUrl,
      status: deviceStatus,
      playable: true
    }))
  };
}

/**
 * 转换灵思摄像机设备数据为前端所需数据格式
 * @param param0
 */
export function transformSenServerData(
  info: ServerDeviceInfo,
  deviceKey: string = 'cid'
): DeviceInfo {
  const { cid, channels, ...rest } = info;

  return {
    sn: rest.sn,
    key: (info[deviceKey] ?? cid) as string,
    title: rest.name,
    type: 'SENSORO',
    position: {
      longitude: rest.lng,
      latitude: rest.lat
    },
    titleIcon: {
      type: icons[rest.deviceUsageType] || 'icon-camera',
      style: {
        color: rest.status ? '#2B6DE5' : '#00000040'
      }
    },
    status: rest.status as DeviceStatus,
    deviceUsageType: rest.deviceUsageType,
    selected: false,
    children: [],
    flvUrl: rest.flvUrl,
    m3u8Url: rest.m3u8Url,
    playable: true
  };
}
