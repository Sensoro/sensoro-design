import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Radio, DatePicker } from 'antd';
import { isNumber, isInteger, isObject, isNil } from 'lodash';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import moment, { Moment } from 'moment';
import classNames from '@pansy/classnames';
import { TimeData, BaseProps } from './interface';
import { ConfigContext } from '../config-provider';
import { processQueryTimeRange, transformTimeRangeToDay, transformDayToTimeRange } from './utils';
import TimeRange from './time-range';

export interface DaysRangeData {
  // 间隔的天数
  day: number;
  /**
   * 是否是自定义
   */
  isCustomize: boolean | 'show';
  // 时间间隔的时间戳
  value: TimeData;
}

export interface DaysRangeProps extends BaseProps<number> {
  value?: number | TimeData;
  isMountChange?: boolean;
  /**
   * 是否支持自定义
   */
  showCustomize?: boolean | 'show';
}

export interface DaysRangeType extends React.FC<DaysRangeProps> {
  TimeRange: typeof TimeRange;
}

const { Group, Button } = Radio;
const { RangePicker } = DatePicker;

const DaysRange: DaysRangeType = ({
  className,
  style,
  value,
  onChange,
  buttonStyle,
  size,
  type,
  formatter,
  showCustomize,
  isMountChange,
  ...rest
}) => {
  let { marks = [] } = rest;
  let isCustomize: boolean = false;
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [dayType, setDayType] = useState<number>(marks[0]);
  const [timeRange, setTimeRange] = useState<Moment[]>([]);
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('days-range');

  marks = marks
    .filter((item) => item > 0)
    .filter((item) => isInteger(item))
    .sort((a, b) => a - b);

  marks.indexOf(dayType) === -1
    ? isCustomize = true
    : isCustomize = false;

  const Item = type === 'button' ? Button : Radio;

  useEffect(() => {
    handleInit(value || marks[0]);

    // 兼容表单设置转换
    if (isNumber(value) && !isFirst) {
      setValueCallback(value);
    }
  }, [JSON.stringify(value), JSON.stringify(marks)]);

  const handleInit = (val: number | TimeData) => {
    let days: number;
    let timeRange: Moment[];
    let endIsToday = true;

    if (isNumber(val)) {
      timeRange = transformDayToTimeRange(val);
      days = val;
    }

    if (isObject(val) && !isNil(val.startTime) && !isNil(val.endTime)) {
      days = transformTimeRangeToDay(val);
      timeRange = [
        moment(val.startTime),
        moment(val.endTime),
      ];
      endIsToday = moment(val.endTime).isSame(moment(), 'day');
    }

    if (isNumber(days) && days >= 1) {
      if (marks.indexOf(days) === -1) {
        isCustomize = true;
      }

      const defaultVal = days || marks[0];

      setTimeRange(timeRange);

      if (endIsToday) {
        setDayType(defaultVal);
      }

      if (isFirst) {
        isMountChange && setValueCallback(defaultVal);
        setIsFirst(false);
      }
    }
  };

  const handleChange = (e: RadioChangeEvent) => {
    setValueCallback(e.target.value);
  };

  const setValueCallback = useCallback(
    (nextValue) => {
      if (isNumber(nextValue)) {
        const range = transformDayToTimeRange(nextValue);

        setTimeRange(range);

        const result = processQueryTimeRange(range);

        onChange?.({
          startTime: result[0],
          endTime: result[1]
        });
      }

      setDayType(nextValue);
    },
    [setDayType]
  );

  const handleRangePickerChange = (dates: Moment[]) => {
    setTimeRange(dates);

    if (dates && dates.length === 2) {
      const result = processQueryTimeRange(dates);

      if (showCustomize === 'show') {
        const days = moment(result[1]).diff(moment(moment(result[0])), 'd') + 1;

        if (
          moment(dates[1]).isSame(moment(), 'day') &&
          marks.includes(days)
        ) {
          setDayType(days);
        } else {
          setDayType(undefined);
        }
      }

      onChange?.({
        startTime: result[0],
        endTime: result[1]
      });
      return;
    }
    onChange?.({});
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current >= moment().endOf('day');
  }

  return (
    <span
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <Group
        size={size}
        buttonStyle={buttonStyle}
        value={isCustomize ? 'customize' : dayType}
        onChange={handleChange}
      >
        {marks.map((item) => {
          let text;
          if (formatter && formatter(item)) {
            text = formatter(item);
          }
          text = text || (item === 1 ? '今日' : `${item}天`);

          return (
            <Item key={item} value={item}>
              {text}
            </Item>
          );
        })}
        {showCustomize === true && (
          <Item key="customize" value="customize">
            {formatter?.('customize') ? formatter?.('customize') : '自定义'}
          </Item>
        )}
      </Group>
      {(isCustomize || showCustomize === 'show') && (
        <RangePicker
          size={size}
          value={timeRange as [Moment, Moment]}
          disabledDate={disabledDate}
          onChange={handleRangePickerChange}
        />
      )}
    </span>
  );
};

DaysRange.defaultProps = {
  type: 'button',
  marks: [7, 30],
  showCustomize: true,
  isMountChange: true
};

DaysRange.TimeRange = TimeRange;

export default DaysRange;
