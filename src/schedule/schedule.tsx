import React from 'react';
import { Button } from 'antd';
import classNames from '@pansy/classnames';
import { debounce } from 'lodash';
import SyncOutlined from '@ant-design/icons/SyncOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { ConfigConsumer } from '../config-provider';
import { WeekCard, CopyTimes } from './common';
import Slider, { BaseProps } from './slider';
import { weekConfig, MAX_TIME, WEEK } from './constant';
import { Schedules, Time, Unit } from './interface';
import { getDefaultValue, completionValue, formatValue } from './utils';

export interface ScheduleProps extends BaseProps {
  value?: Schedules;
  onChange?: (val: Schedules) => void;
}

interface ScheduleState {
  /**
   * 当前周
   */
  currentWeek: WEEK;
  /**
   * 当前的时间段集合
   */
  currentTimes: Time[];
  /**
   * 内部的值
   */
  internalValue: Schedules;
}

class Schedule extends React.Component<ScheduleProps, ScheduleState> {
  private unit: Unit;
  private isReadOnly: boolean;
  private updateValueCounter: number;

  static Slider: typeof Slider;
  static defaultProps: ScheduleProps = {
    unit: 'millisecond',
    autoMerge: false,
    isReadOnly: false,
    timesMaxLength: 8
  };

  constructor(props: ScheduleProps) {
    super(props);

    this.unit = props.unit;
    this.isReadOnly = props.isReadOnly;
    this.updateValueCounter = 0;

    this.state = {
      currentWeek: WEEK.monday,
      currentTimes: [],
      internalValue: []
    };
  }

  componentDidMount() {
    const { value } = this.props;
    const { currentWeek } = this.state;
    // 获取默认数据
    const defaultValue = value ? completionValue(value, this.unit) : getDefaultValue();

    this.setState({
      internalValue: defaultValue,
      currentTimes: this.getTimesByWeek(defaultValue, currentWeek)
    });
    this.handleChange(defaultValue, this.unit);
  }

  componentDidUpdate(prevProps: ScheduleProps) {
    const { value } = this.props;
    const { currentWeek } = this.state;

    // 确保只响应表单设置值
    if (this.updateValueCounter !== 1 && !this.isReadOnly) return;
    if (prevProps.value !== value) {
      const internalValue = completionValue(value, this.unit);

      this.setState({
        internalValue,
        currentTimes: this.getTimesByWeek(internalValue, currentWeek)
      });
    }
  }

  /**
   * 回调优化，添加防抖以及格式化处理
   */
  handleChange = debounce(
    (value: Schedules, unit: Unit) => {
      this.updateValueCounter++;
      const copyVal = JSON.parse(JSON.stringify(value));
      this.props.onChange?.(formatValue(copyVal, unit));
    },
    400,
    { leading: true }
  );

  /**
   * 修改当前星期的时间段
   * @param times
   */
  handleCurrentTimes = (times: Time[] = []) => {
    const { internalValue, currentWeek } = this.state;

    const value = internalValue.map((item) => {
      if (item.day === currentWeek) {
        item.timeArray = times;
      }
      return item;
    });

    this.setState({
      currentTimes: times,
      internalValue: value
    });

    this.handleChange(value, this.unit);
  };

  /**
   * 切换星期
   * @param week 周几
   */
  handleWeekCardClick = (week: WEEK) => {
    const { internalValue } = this.state;

    const times = JSON.parse(JSON.stringify(this.getTimesByWeek(internalValue, week)));

    this.setState({
      currentWeek: week,
      currentTimes: times
    });
  };

  /**
   * 获取某星期的时间段
   * @param data
   * @param week
   */
  getTimesByWeek = (data: Schedules = [], week: WEEK): Time[] => {
    return data.find((item) => item.day === week)?.timeArray || [];
  };

  /**
   * 复制某星期的回调
   * @param days
   */
  handleCopyConfirm = (days: number[]) => {
    const { internalValue, currentTimes } = this.state;

    const value = internalValue.map((item) => {
      if (days.includes(item.day)) {
        item.timeArray = currentTimes;
      }
      return item;
    });

    this.setState({
      internalValue: value
    });

    this.handleChange(value, this.unit);
  };

  handleSliderChange = (times: Time[]) => {
    this.handleCurrentTimes(times);
  };

  render() {
    const { className, style, autoMerge, timesMaxLength } = this.props;
    const { internalValue, currentWeek, currentTimes } = this.state;

    return (
      <ConfigConsumer>
        {({ getPrefixCls }) => {
          const prefixCls = getPrefixCls('schedule');

          return (
            <div
              className={classNames(className, {
                [`${prefixCls}`]: true,
                [`is-read-only`]: this.isReadOnly
              })}
              style={style}
            >
              {/* 周切换区域 */}
              <div className={`${prefixCls}-weeks`}>
                {Object.keys(weekConfig).map((item) => {
                  const times = this.getTimesByWeek(internalValue, +item);

                  return (
                    <WeekCard
                      key={item}
                      isActive={+item === currentWeek}
                      value={+item}
                      times={times}
                      onClick={this.handleWeekCardClick}
                    />
                  );
                })}
              </div>

              {/* 时间段操作及展示区域 */}
              <Slider
                unit="minute"
                internal
                initChange={false}
                autoMerge={autoMerge}
                isReadOnly={this.isReadOnly}
                value={currentTimes}
                timesMaxLength={timesMaxLength}
                onChange={this.handleSliderChange}
              />

              {/** 操作区域 */}
              {!this.isReadOnly && (
                <div className={`${prefixCls}-toolbar`}>
                  <div className={`${prefixCls}-toolbar-left`}>
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        this.handleCurrentTimes([]);
                      }}
                      type="link"
                    >
                      清空此天时间
                    </Button>
                    <CopyTimes currentWeek={currentWeek} onConfirm={this.handleCopyConfirm} />
                  </div>
                  <span className={`${prefixCls}-toolbar-extra`}>
                    <Button
                      icon={<SyncOutlined />}
                      onClick={() => {
                        this.handleCurrentTimes([{ start: 0, end: MAX_TIME }]);
                      }}
                      type="link"
                    >
                      恢复默认
                    </Button>
                  </span>
                </div>
              )}
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}

export default Schedule;
