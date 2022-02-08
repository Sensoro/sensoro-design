import React, { useEffect, useState, useRef } from 'react';
import classNames from '@pansy/classnames';
import { floor, round } from 'lodash';
import { Tooltip, TimePicker, message } from 'antd';
import moment, { Moment } from 'moment';
import { getTimeText, getTimeValue } from '../utils';
import { ConfigContext } from '../../config-provider';
import Popmodal from '../../popmodal';
import { MAX_TIME } from '../constant';
import { Time, ResizeType } from '../interface';

export interface TrackProps {
  /**
   * 额外的样式
   */
  style?: React.CSSProperties;
  /**
   * 唯一表示
   */
  id?: string;
  /**
   * 时间段的值
   */
  value?: Time;
  /**
   * 是否属于激活状态
   */
  isActive?: boolean;
  /**
   * 是否在拖动中
   */
  isDragging?: boolean;
  resizeBoundary: [number, number];
  onSave?: (id: string, value: Time) => void;
  onClick?: (id: string) => void;
  onRemove?: (id: string) => void;
  onResize?: (type: ResizeType, id: string) => void;
}

const { RangePicker } = TimePicker;
const format = 'HH:mm';

const Track: React.FC<TrackProps> = ({
  style,
  id,
  isDragging,
  isActive,
  onClick,
  onSave,
  onRemove,
  value,
  resizeBoundary,
  onResize
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [rangePickerValue, setRangePickerValue] = useState<Moment[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('schedule-track');
  let offset = (+value.start / MAX_TIME) * 100;
  let length = ((+value.end - +value.start) / MAX_TIME) * 100;

  useEffect(() => {
    const start = getTimeText((offset / 100) * MAX_TIME);
    const end = getTimeText(((offset + length) / 100) * MAX_TIME);

    setRangePickerValue([moment(start, format), moment(end, format)]);
  }, [JSON.stringify(value)]);

  useEffect(() => {
    setVisible(isDragging);
  }, [isDragging]);

  if (length < 0) {
    length = Math.abs(length);
    offset = 100 - offset;
  }

  const positonStyle = {
    left: `${offset}%`,
    right: 'auto',
    width: `${length}%`
  };

  const elStyle = {
    ...style,
    ...positonStyle
  };

  const handleRangePickerChange = (times) => {
    setRangePickerValue(times);
  };

  const handleClick = () => {
    onClick && onClick(id);
  };

  const handleMouseOver = () => {
    setVisible(true);
  };

  const handleMouseOut = () => {
    setVisible(isDragging ? true : false);
  };

  const handleSave = () => {
    if (!rangePickerValue || rangePickerValue.length !== 2) return;

    const startValue = rangePickerValue[0].valueOf();
    const endValue = rangePickerValue[1].valueOf();

    if (startValue >= endValue) {
      message.warning('结束时间不能小于等于开始时间');
      return;
    }

    const startTimeValue = getTimeValue(resizeBoundary[0]);
    const endTimevalue = getTimeValue(resizeBoundary[1]);

    if (startTimeValue <= startValue && endTimevalue >= endValue) {
      onSave?.(id, {
        start: rangePickerValue[0].hours() * 60 + rangePickerValue[0].minutes(),
        end: rangePickerValue[1].hours() * 60 + rangePickerValue[1].minutes()
      });
    } else {
      message.warning('时间段不能重复');
    }
  };

  const handleRemove = () => {
    onRemove && onRemove(id);
  };

  const getTooltipText = () => {
    const start = (offset / 100) * MAX_TIME;
    const end = ((offset + length) / 100) * MAX_TIME;

    return `${getTimeText(start)} ~ ${getTimeText(end)}`;
  };

  const handleDisabledHours = () => {
    const start = floor(resizeBoundary[0] / 60, 0);
    const end = floor(resizeBoundary[1] / 60, 0);

    const disabledHours: number[] = [];

    for (let i = 0; i <= 23; i++) {
      if (i < start || i > end) {
        disabledHours.push(i);
      }
    }

    return disabledHours;
  };

  const handleDisabledMinutes = (hour: number) => {
    const startHour = floor(resizeBoundary[0] / 60, 0);
    const endHour = floor(resizeBoundary[1] / 60, 0);
    const startMinute = round(resizeBoundary[0] % 60, 0);
    const endMinute = round(resizeBoundary[1] % 60, 0);

    const disabledMinutes: number[] = [];

    if (startHour === hour) {
      for (let i = 0; i <= 59; i++) {
        if (i < startMinute) {
          disabledMinutes.push(i);
        }
      }
    }

    if (endHour === hour) {
      for (let i = 0; i <= 59; i++) {
        if (i > endMinute) {
          disabledMinutes.push(i);
        }
      }
    }

    return disabledMinutes;
  };

  const handleLeftMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    onResize?.('left', id);
  };

  const handleRightMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    onResize?.('right', id);
  };

  return (
    <Popmodal
      trigger="click"
      okText="保存"
      cancelText="删除"
      visible={isActive}
      onConfirm={handleSave}
      onCancel={handleRemove}
      overlayStyle={{
        width: 255,
        zIndex: 100
      }}
      getPopupContainer={() => rootRef.current}
      content={
        <RangePicker
          value={rangePickerValue as any}
          format={format}
          disabledHours={handleDisabledHours}
          disabledMinutes={handleDisabledMinutes}
          order={false}
          onChange={handleRangePickerChange}
          suffixIcon={null}
          allowClear={false}
        />
      }
    >
      <Tooltip visible={visible && !isActive} placement="top" title={getTooltipText()}>
        <div
          className={prefixCls}
          style={elStyle}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          ref={rootRef}
        >
          {isActive && (
            <>
              <div
                onMouseDown={handleLeftMouseDown}
                className={classNames(`${prefixCls}-move`, `${prefixCls}-move-left`)}
              />
              <div
                onMouseDown={handleRightMouseDown}
                className={classNames(`${prefixCls}-move`, `${prefixCls}-move-right`)}
              />
            </>
          )}
        </div>
      </Tooltip>
    </Popmodal>
  );
};

Track.defaultProps = {
  isActive: false,
  isDragging: false
};

export default Track;
