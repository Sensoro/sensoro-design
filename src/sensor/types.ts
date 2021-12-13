export enum DEVICE_STATUS {
  ISOLATION = 'ISOLATION', //隔离
  ALARM = 'ALARM', //预警
  DANGER = 'DANGER', //隐患
  FAULT = 'FAULT', //故障
  DISCONNECT = 'DISCONNECT', //失联
  NORMAL = 'NORMAL', //正常
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  //camera的状态
  PUSHING = 'PUSHING',
  NO_PUSH = 'NO_PUSH'
}

export interface StatusConfigData {
  value: DEVICE_STATUS;
  label: string;
  color: string;
}

export const DEVICE_STATUS_CONFIG: StatusConfigData[] = [
  {
    value: DEVICE_STATUS.ISOLATION,
    label: '隔离',
    color: '#762CE5'
  },
  {
    value: DEVICE_STATUS.ALARM,
    label: '预警',
    color: '#E52C3E'
  },
  {
    value: DEVICE_STATUS.DANGER,
    label: '隐患',
    color: '#E57022'
  },
  {
    value: DEVICE_STATUS.FAULT,
    label: '故障',
    color: '#F2A516'
  },
  {
    value: DEVICE_STATUS.DISCONNECT,
    label: '失联',
    color: '#BFBFBF'
  },
  {
    value: DEVICE_STATUS.NORMAL,
    label: '正常',
    color: '#1DCCBB'
  },
  {
    value: DEVICE_STATUS.ONLINE,
    label: '在线',
    color: '#2b6de5'
  },
  {
    value: DEVICE_STATUS.OFFLINE,
    label: '离线',
    color: '#BFBFBF'
  },
  {
    value: DEVICE_STATUS.PUSHING,
    label: '推流中',
    color: '#1DCCBB'
  },
  {
    value: DEVICE_STATUS.NO_PUSH,
    label: '无推流',
    color: '#BFBFBF'
  }
];

export const DEVICE_STATUS_CONFIG_MAP: {
  [key: string]: StatusConfigData;
} = DEVICE_STATUS_CONFIG.reduce((prev, c) => {
  prev[c.value] = c;
  return prev;
}, {});
