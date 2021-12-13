import React from 'react';
import moment from 'moment';
import { padStart, round, floor, cloneDeep, isNumber, isString, uniqueId } from 'lodash';
import { MAX_TIME, MIN_TIME } from '../constant';
import { Unit, Schedules, Time, BoundaryValue } from '../interface';

/**
 * 获取事件的鼠标位置
 * @param e
 */
export function getMousePosition(e: React.MouseEvent) {
  return e.pageX;
}

export function getTimeValue(time: number) {
  return moment(`${moment().format('YYYY-MM-DD')} ${getTimeText(time)}:00`).valueOf();
}

/**
 * 获取分钟对应的时间文本
 * @param value
 */
export function getTimeText(value: number) {
  let hour = floor(value / 60, 0);
  let minute = round(value % 60, 0);

  if (minute === 60) {
    hour = hour + 1;
    minute = 0;
  }

  return `${padStart(hour.toString(), 2, '0')}:${padStart(minute.toString(), 2, '0')}`;
}

/**
 * 将时间字符串或数字转换为分钟
 * @param data
 *
 * @example
 * transformTextToMinute(111) => 1 * 60 + 11
 * transformTextToMinute('01:11') => 71
 */
export function transformTextToMinute(data: number | string): number {
  // 去除:
  let time = (data + '').replace(/:/g, '');

  // 合法性校验
  if (time.length > 4 || !isNumber(+time)) {
    new Error('数据格式不合法');
  }

  time = padStart(time, 4, '0');

  const houer = +time.substring(0, 2);
  const minute = +time.substring(2, 4);

  return houer * 60 + minute;
}

/**
 * 将分钟转换为时间字符串或数字
 * 71 => 111
 * '01:11' => 71
 * @param data
 *
 * @example
 * transformMinuteToText(71) => 111
 * transformMinuteToText(71, true) => '01:11'
 */
export function transformMinuteToText(data: number, isString: boolean = false): number | string {
  let hour = floor(data / 60, 0);
  let minute = round(data % 60, 0);

  if (minute === 60) {
    hour = hour + 1;
    minute = 0;
  }

  return isString
    ? `${padStart(hour + '', 2, '0')}:${padStart(minute + '', 2, '0')}`
    : +`${hour}${padStart(minute + '', 2, '0')}`;
}

/**
 * 将秒转换为分钟
 * @param data
 *
 * @example
 * transformSecondToMinute(60) => 1
 * transformSecondToMinute(61) => 1
 */
export function transformSecondToMinute(data: number): number {
  return round(data / 60);
}

/**
 * 将分钟转换为秒
 * @param data
 *
 * @example
 * transformSecondToMinute(1) => 60
 */
export function transformMinuteToSecond(data: number): number {
  return data * 60;
}

/**
 * 将毫秒转换为分钟
 * @param data
 *
 * @example
 * transformSecondToMinute(60 * 1000) => 1
 */
export function transformMillisecondToMinute(data: number): number {
  return round(data / (60 * 1000));
}

/**
 * 将分钟转换为毫秒
 * @param data
 *
 * @example
 * transformMinuteToMillisecond(1) => 60 * 1000
 */
export function transformMinuteToMillisecond(data: number): number {
  return data * (60 * 1000);
}

/**
 * 获取内部所需格式
 * @param value
 * @param unit
 */
export function getInternalTime(value: number | string, unit: Unit): number {
  if (isString(value)) {
    return transformTextToMinute(value);
  }

  if (unit === 'text' || unit === 'time') {
    return transformTextToMinute(value);
  }

  if (unit === 'second') {
    return transformSecondToMinute(value);
  }

  if (unit === 'millisecond') {
    return transformMillisecondToMinute(value);
  }

  return value;
}

/**
 * 获取外部所需格式
 * @param val
 * @param unit
 */
export function getExternalTime(value: number, unit: Unit): number | string {
  if (unit === 'second') {
    return transformMinuteToSecond(value);
  }

  if (unit === 'millisecond') {
    return transformMinuteToMillisecond(value);
  }

  if (unit === 'text') {
    return transformMinuteToText(value);
  }

  if (unit === 'time') {
    return transformMinuteToText(value, true);
  }

  return floor(value);
}

/**
 * 获取组件默认数据
 * @param unit
 */
export function getDefaultValue(): Schedules {
  const values: Schedules = [];

  for (let i = 1; i <= 7; i++) {
    values.push({
      day: i,
      timeArray: [{ start: 0, end: MAX_TIME }]
    });
  }

  return values;
}

/**
 * 过滤不合法的时间段
 * @param data
 */
export function filterTimes(data: Time[] = []): Time[] {
  return data.filter((item) => {
    return (
      item && isNumber(item.start) && isNumber(item.end) && item.end > 0 && item.start < item.end
    );
  });
}

/**
 * 格式化输出的数据
 * @param data 单位应该为分钟
 * @param unit
 */
export function formatValue(data: Schedules, unit: Unit): Schedules {
  const values: Schedules = [];

  for (let i = 1; i <= 7; i++) {
    const schedule = data.find((item) => item.day === i);

    if (!schedule) {
      values.push({
        day: i,
        timeArray: []
      });
    } else {
      values.push({
        day: i,
        timeArray: filterTimes(schedule.timeArray || []).map((item) => {
          return {
            start: getExternalTime(item.start as number, unit),
            end: getExternalTime(item.end as number, unit)
          };
        })
      });
    }
  }
  return values;
}

/**
 * 处理时间段
 * @param data
 * @param unit
 */
export function transformTimes(data: Time[] = [], unit: Unit = 'minute'): Time[] {
  const maxValue = getExternalTime(MAX_TIME, unit);

  return data.map((item) => {
    const start = item.start < 0 ? 0 : item.start;
    const end = item.end > maxValue ? maxValue : item.end;
    const id = uniqueId('time_');
    return {
      id,
      start: getInternalTime(start, unit),
      end: getInternalTime(end, unit)
    };
  });
}

/**
 * 补全数据并转换为以分钟为单位的数据
 * @param data
 * @param unit
 */
export function completionValue(data: Schedules = [], unit: Unit = 'minute'): Schedules {
  const cloneData = cloneDeep(data);

  for (let i = 1; i <= 7; i++) {
    if (!cloneData.find((item) => item.day === i)) {
      cloneData.push({
        day: i,
        timeArray: []
      });
    }
  }

  return cloneData.map((item) => {
    item.timeArray = transformTimes(item.timeArray || [], unit);
    return item;
  });
}

/**
 * 获取Resize大小的边界
 * @param times
 * @param id
 */
export const getResizeBoundary = (times: Time[], trackId: string): BoundaryValue => {
  if (times.length <= 1) {
    return [MIN_TIME, MAX_TIME];
  }
  const trackIndex = times.findIndex((item) => item.id === trackId);
  const sortTimes = times.sort((a, b) => +a.start - +b.start);

  const prevTime = sortTimes[trackIndex - 1];
  const nextTime = sortTimes[trackIndex + 1];

  const min = prevTime ? prevTime.end : MIN_TIME;
  const max = nextTime ? nextTime.start : MAX_TIME;

  return [+min, +max];
};

/**
 * 获取创建时间段的边界
 * @param times 时间段集合
 * @param trackId 时间段的唯一ID
 */
export const getCreateBoundary = (times: Time[], trackId: string): BoundaryValue | undefined => {
  const sortTimes = (times || []).sort((a, b) => +a.start - +b.start);

  const trackIndex = times.findIndex((item) => item.id === trackId);
  if (trackIndex === -1) return undefined;
  const start = times[trackIndex].start;
  const nextTime = sortTimes[trackIndex + 1];

  const max = nextTime?.start || MAX_TIME;

  return [+start, +max];
};
