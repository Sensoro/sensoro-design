import { ServerDeviceInfo } from '../interface';

export const devices: ServerDeviceInfo[] = [
  {
    address: '北京市朝阳区望京望花路',
    cid: '03a23361-096d-4479-adeb-d861ca5fe7d2',
    deviceUsageType: 1,
    id: 228,
    lat: 39.989461,
    lng: 116.47072,
    name: '007筒机热电堆',
    sn: '0606060606060007',
    status: 0
  },
  {
    address: '北京市朝阳区望京街道广顺南大街10号利星行中心',
    cid: '5178375b-a768-4301-aed2-597f72e5ac8e',
    deviceUsageType: 1,
    id: 10,
    lat: 39.991044,
    lng: 116.476456,
    name: '112屈新锋跟踪问题勿动',
    networkType: 0,
    orientations: 4,
    sn: '0505050505050112',
    status: 0
  },
  {
    address: '北京市朝阳区酒仙桥街道S12机场高速附近',
    cid: '9b99ef7b-93cc-44a2-8203-10fa7c0fa789',
    deviceUsageType: 1,
    id: 162,
    lat: 39.986558,
    lng: 116.486651,
    name: '19acW福利使用位置在支架上',
    sn: '03C80017C73E19AC',
    status: 1,
    streamStatus: 0
  },
  {
    address: '北京市朝阳区东湖街道望京北路望京北路1号附近',
    cid: '42503e95-d1dd-4f11-b837-bb0a4e251ee7',
    deviceUsageType: 1,
    id: 221,
    lat: 40.011885,
    lng: 116.479554,
    name: '实验室458',
    networkType: 0,
    orientations: 1,
    sn: '03C80017C71FE458',
    status: 1,
    streamStatus: 0
  }
];

export const GBDevices: ServerDeviceInfo[] = [
  {
    address: '北京市朝阳区东湖街道东湖湾东湖湾西区',
    channels: [
      {
        channel: 1,
        name: 'Camera1'
      }
    ],
    id: '5f2a9d53c4295019ca13e282',
    lat: 40.00503,
    lng: 116.45843,
    name: '灵思半球机',
    sn: '',
    status: 'offline',
    streams: [
      {
        flvUrl: 'https://play-gb-test.sensoro.com:18080/gb28181/420010549.flv',
        isLive: true
      }
    ]
  },
  {
    id: '5f213fcff71804709165a6ae',
    address: '北京市朝阳区东湖街道澳洲康都澳洲康都1期',
    channels: [
      {
        channel: 1,
        name: 'Camera 01'
      }
    ],
    lat: 40.0139,
    lng: 116.46175,
    name: '海康10.0.0.143_美好的',
    sn: '12324535465765757国防部风格发个电饭锅电饭锅 v 翻滚吧更方便改',
    status: 'offline',
    streams: [
      {
        flvUrl: 'https://play-gb-test.sensoro.com:18080/gb28181/632485411.flv',
        isLive: true
      }
    ]
  }
];
