import {
  formatValue,
  getTimeText,
  completionValue,
  getInternalTime,
  getExternalTime,
  getDefaultValue,
  getResizeBoundary,
  getCreateBoundary,
  transformTextToMinute,
  transformMinuteToText,
  transformMinuteToSecond,
  transformSecondToMinute,
  transformMillisecondToMinute,
  transformMinuteToMillisecond
} from './';
import { MAX_TIME } from '../constant';
import { Time } from '../interface';

// 时间字符串或数字与分钟互转测试用例
test('transformTextToMinute number', () => {
  // 只有分钟
  expect(transformTextToMinute(11)).toEqual(11);

  // 个位数的分钟
  expect(transformTextToMinute(111)).toEqual(71);

  // 只有分钟
  expect(transformTextToMinute(1011)).toEqual(611);
});

test('transformTextToMinute string', () => {
  // 只有分钟
  expect(transformTextToMinute('00:11')).toEqual(11);

  // 个位数的分钟
  expect(transformTextToMinute('01:11')).toEqual(71);

  // 只有分钟
  expect(transformTextToMinute('10:11')).toEqual(611);
});

test('transformMinuteToText return number', () => {
  // 只有分钟
  expect(transformMinuteToText(11)).toEqual(11);

  // 个位数的分钟
  expect(transformMinuteToText(71)).toEqual(111);

  // 只有分钟
  expect(transformMinuteToText(611)).toEqual(1011);
});

test('transformMinuteToText return string', () => {
  // 只有分钟
  expect(transformMinuteToText(11, true)).toEqual('00:11');

  // 个位数的分钟
  expect(transformMinuteToText(71, true)).toEqual('01:11');

  // 只有分钟
  expect(transformMinuteToText(611, true)).toEqual('10:11');
});

// 秒与分钟互转测试用例
test('transformMinuteToSecond', () => {
  expect(transformMinuteToSecond(1)).toEqual(60);

  expect(transformMinuteToSecond(11)).toEqual(660);
});

test('transformSecondToMinute', () => {
  expect(transformSecondToMinute(60)).toEqual(1);
  expect(transformSecondToMinute(61)).toEqual(1);
  // 基于四舍五入计算
  expect(transformSecondToMinute(90)).toEqual(2);
});

// 毫秒与分钟互转测试用例
test('transformMillisecondToMinute', () => {
  expect(transformMillisecondToMinute(1 * 60 * 1000)).toEqual(1);

  expect(transformMillisecondToMinute(60)).toEqual(0);
});

test('transformMinuteToMillisecond', () => {
  expect(transformMinuteToMillisecond(1)).toEqual(1 * 60 * 1000);
});

// 将数据转换为分钟 (内部使用)
test('getInternalTime', () => {
  // 分钟
  expect(getInternalTime(11, 'minute')).toEqual(11);
  // 秒
  expect(getInternalTime(11 * 60, 'second')).toEqual(11);
  // 毫秒
  expect(getInternalTime(11 * 60 * 1000, 'millisecond')).toEqual(11);
  // 时间文本 数字类型
  expect(getInternalTime(111, 'text')).toEqual(71);
  // 时间文本 字符串类型
  expect(getInternalTime('01:11', 'time')).toEqual(71);
});

// 将分钟转换为其他格式数据 (外部使用)
test('getExternalTime', () => {
  // 分钟
  expect(getExternalTime(11, 'minute')).toEqual(11);
  // 秒
  expect(getExternalTime(11, 'second')).toEqual(11 * 60);
  // 毫秒
  expect(getExternalTime(11, 'millisecond')).toEqual(11 * 60 * 1000);
  // 时间文本 数字类型
  expect(getExternalTime(71, 'text')).toEqual(111);
  // 时间文本 字符串类型
  expect(getExternalTime(71, 'time')).toEqual('01:11');
});

// getDefaultValue
test('getDefaultValue', () => {
  expect(getDefaultValue()).toEqual([
    { day: 1, timeArray: [{ start: 0, end: MAX_TIME }] },
    { day: 2, timeArray: [{ start: 0, end: MAX_TIME }] },
    { day: 3, timeArray: [{ start: 0, end: MAX_TIME }] },
    { day: 4, timeArray: [{ start: 0, end: MAX_TIME }] },
    { day: 5, timeArray: [{ start: 0, end: MAX_TIME }] },
    { day: 6, timeArray: [{ start: 0, end: MAX_TIME }] },
    { day: 7, timeArray: [{ start: 0, end: MAX_TIME }] }
  ]);
});

// 格式化输出数据
test('formatValue input empty array', () => {
  expect(formatValue([], 'time')).toEqual([
    { day: 1, timeArray: [] },
    { day: 2, timeArray: [] },
    { day: 3, timeArray: [] },
    { day: 4, timeArray: [] },
    { day: 5, timeArray: [] },
    { day: 6, timeArray: [] },
    { day: 7, timeArray: [] }
  ]);
});

test('formatValue input non empty array', () => {
  const initValue = [{ day: 1, timeArray: [{ start: 0, end: 60 }] }];
  expect(formatValue(initValue, 'time')).toEqual([
    { day: 1, timeArray: [{ start: '00:00', end: '01:00' }] },
    { day: 2, timeArray: [] },
    { day: 3, timeArray: [] },
    { day: 4, timeArray: [] },
    { day: 5, timeArray: [] },
    { day: 6, timeArray: [] },
    { day: 7, timeArray: [] }
  ]);
});

test('completionValue unit minute', () => {
  const initValue = [{ day: 1, timeArray: [{ start: 0, end: 60 }] }];
  expect(completionValue(initValue, 'minute')).toEqual([
    { day: 1, timeArray: [{ start: 0, end: 60 }] },
    { day: 2, timeArray: [] },
    { day: 3, timeArray: [] },
    { day: 4, timeArray: [] },
    { day: 5, timeArray: [] },
    { day: 6, timeArray: [] },
    { day: 7, timeArray: [] }
  ]);
});

test('completionValue unit time', () => {
  const initValue = [{ day: 1, timeArray: [{ start: 0, end: '01:00' }] }];
  expect(completionValue(initValue, 'time')).toEqual([
    { day: 1, timeArray: [{ start: 0, end: 60 }] },
    { day: 2, timeArray: [] },
    { day: 3, timeArray: [] },
    { day: 4, timeArray: [] },
    { day: 5, timeArray: [] },
    { day: 6, timeArray: [] },
    { day: 7, timeArray: [] }
  ]);
});

test('getResizeBoundary', () => {
  const value: Time[] = [
    { id: '001', start: 30, end: 60 },
    { id: '002', start: 300, end: 500 },
    { id: '003', start: 1000, end: 1100 }
  ];

  expect(getResizeBoundary(value, '002')).toEqual([60, 1000]);

  expect(getResizeBoundary(value, '001')).toEqual([0, 300]);

  expect(getResizeBoundary(value, '003')).toEqual([500, MAX_TIME]);
});

test('getCreateBoundary', () => {
  const value: Time[] = [
    { id: '001', start: 30, end: 60 },
    { id: '002', start: 300, end: 500 },
    { id: '003', start: 1000, end: 1100 },
    { id: '004', start: 100, end: -1 }
  ];
  expect(getCreateBoundary(value, '004')).toEqual([100, 300]);
});

test('getTimeText', () => {
  expect(getTimeText(60)).toEqual('01:00');
  expect(getTimeText(61)).toEqual('01:01');
});
