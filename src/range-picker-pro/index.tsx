import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { DatePicker, Radio, Space } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { RadioChangeEvent } from 'antd/es/radio';
import { startOf, endOf, disabledAfterTodayDate, getRangePickerProps } from './utils';

const { RangePicker } = DatePicker;

export type PeriodType = 'month' | 'day' | 'hour' | 'minute';

export type ValueType = {
  period: PeriodType;
  rangeTime: number[];
};

export interface PeriodData {
  /**
   * 间隔类型
   */
  periodType?: PeriodType;
  /**
   * 间隔值
   */
  periodValue?: number;
}

interface OtherProps {
  /**
   * 是否禁用选择
   */
  disabledSelect?: boolean;
  /**
   * 默认的时间
   */
  defaultTimes?: RangePickerProps['value'];
  /**
   * 是否禁用今天之后的日期
   */
  disabledAfterToday?: boolean;
  /**
   * 时间框非空才可触发onChange
   */
  dateNotNullChange?: boolean;
  /**
   * 选择项配置
   */
  options?: {
    value: PeriodType;
    label: string;
  }[];
  value?: ValueType;
  onChange?: (value: ValueType) => void;
}

export type RangePickerProProps = Omit<RangePickerProps, 'value' | 'onChange'> &
  PeriodData &
  OtherProps;

const RangePickerPro: React.FC<RangePickerProProps> = ({
  periodType = 'minute',
  periodValue = 15,
  defaultTimes,
  disabledSelect = true,
  dateNotNullChange = true,
  disabledAfterToday = true,
  options = [],
  value,
  onChange,
  ...rest
}) => {
  const [period, setPeriod] = useState<PeriodType>(periodType);
  const lock = useRef<boolean>(true);
  const [rangeTime, setRangeTime] = useState<number[]>();
  const [rangePickerValue, setRangePickerValue] = useState<RangePickerProps['value']>();
  const [rangePickerOpts, setRangePickerOpts] = useState<RangePickerProps>({});

  useEffect(() => {
    if (defaultTimes && defaultTimes.length == 2) {
      const times: number[] = [startOf(defaultTimes[0], period), endOf(defaultTimes[1], period)];
      setRangeTime(times);
      setRangePickerValue(times.map((item) => moment(item)) as RangePickerProps['value']);
      onChange?.({
        period: periodType,
        rangeTime: times
      });
    }
  }, []);

  useEffect(() => {
    if (periodType && periodValue) {
      setPeriod(periodType);

      if (lock.current) {
        lock.current = false;
      } else {
        setRangeTime(undefined);
        setRangePickerValue(undefined);
      }

      setRangePickerOpts(getRangePickerProps({ periodType, periodValue }));
    }
  }, [periodType, periodValue]);

  const handlePeriodChange = (e: RadioChangeEvent) => {
    const value = e.target.value;

    setPeriod(value);

    setRangePickerOpts(
      getRangePickerProps({
        periodType: value,
        periodValue
      })
    );
    setRangeTime(undefined);
    setRangePickerValue(undefined);

    triggerChange({ period: value, rangeTime: undefined });
  };

  const handleRangePickerChange: RangePickerProps['onChange'] = (values) => {
    if (values && values.length === 2) {
      const times: number[] = [startOf(values[0], period), endOf(values[1], period)];
      setRangeTime(times);
      setRangePickerValue(values);
      triggerChange({ rangeTime: times });
    } else {
      setRangeTime(undefined);
      setRangePickerValue(undefined);
      triggerChange({ rangeTime: undefined });
    }
  };

  const triggerChange = (changedValue: Partial<ValueType>) => {
    const nextValue = {
      period,
      rangeTime,
      ...changedValue
    };
    if (dateNotNullChange) {
      if (nextValue.period && nextValue.rangeTime && nextValue.rangeTime.length === 2) {
        onChange?.(nextValue);
      }
      return;
    }
    onChange?.(nextValue);
  };

  const rangePickerOptions = {
    disabledDate: disabledAfterToday ? disabledAfterTodayDate : undefined,
    ...rest,
    value: rangePickerValue,
    onChange: handleRangePickerChange,
    ...rangePickerOpts
  } as RangePickerProps;

  if (disabledSelect) {
    <RangePicker {...rangePickerOptions} />;
  }

  return (
    <Space direction="horizontal" size={8}>
      <Radio.Group
        value={period}
        optionType="button"
        options={options}
        onChange={handlePeriodChange}
      />
      <RangePicker {...rangePickerOptions} />
    </Space>
  );
};

export default RangePickerPro;
