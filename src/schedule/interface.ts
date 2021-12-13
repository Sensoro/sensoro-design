import { WEEK } from './constant';

/**
 * 支持的单位
 * millisecond: 毫秒 >> 1 * 60 * 1000
 * second: 秒 >> 1 * 60
 * minute: 分钟 >> 1
 * text: 数字型时间格式 >> 1
 * time: 文本型时间格式 >> 00:01
 */
export type Unit = 'millisecond' | 'second' | 'minute' | 'text' | 'time';

export interface Time {
  // 索引 用于内部
  id?: string;
  end: number | string;
  start: number | string;
}

// 0: 清空状态 1: 全天状态 2: 自定义状态
export type WeekStatus = 0 | 1 | 2;

// key 代表周几 value 代表选择的时间段
export interface ScheduleValue {
  [key: number]: Time[];
}

export type ScheduleItem = {
  day: WEEK;
  timeArray: Time[];
};

export type Schedules = ScheduleItem[];

export type ResizeType = 'left' | 'right';

export type BoundaryValue = [number, number];

export type OperationType = 'resizing' | 'dragging';
export type ActiveTrack = string | undefined;
