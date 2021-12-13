import React from 'react';
import classNames from '@pansy/classnames';
import { isNumber, debounce, uniqueId, floor } from 'lodash';
import addEventListener from 'rc-util/es/Dom/addEventListener';
import { ConfigConsumer } from '../config-provider';
import { Track } from './common';
import { marks, MAX_TIME, MIN_TIME } from './constant';
import { Time, ResizeType, Unit, OperationType } from './interface';
import { pauseEvent } from '../common/utils';
import {
  getMousePosition,
  filterTimes,
  getExternalTime,
  transformTimes,
  getResizeBoundary,
  getCreateBoundary
} from './utils';

export interface BaseProps {
  /**
   * 额外的样式类
   */
  className?: string;
  /**
   * 额外的样式
   */
  style?: React.CSSProperties;
  /**
   * 是否只读
   */
  isReadOnly?: boolean;
  /**
   * 是否开启自动合并，如果开启，则拖动时 与前后时间段相连时，会自动合并为一个时间段
   * -静态属性-
   */
  autoMerge?: boolean;
  /**
   * 最多添加几个时间段
   */
  timesMaxLength?: number;
  /**
   * 输出的单位，支持 毫秒、秒、分钟以及数字型时间字符
   * -静态属性-
   */
  unit?: Unit;
}

export interface SliderProps extends BaseProps {
  internal?: boolean;
  /**
   *
   */
  initChange?: boolean;
  /**
   * 时间段的值
   */
  value?: Time[];
  /**
   * 时间段的值变化的回调
   */
  onChange?: (value: Time[]) => void;
}

interface SliderState {
  /**
   * 当前活动的时间段ID
   */
  activeTrackId?: string;
  /**
   * 内部的值
   */
  internalValue: Time[];
  /**
   * 改变大小时的边界
   */
  resizeBoundary?: [number, number];
}

class Slider extends React.Component<SliderProps, SliderState> {
  private root: HTMLDivElement;
  private resizeType: ResizeType | undefined;
  private createTrackIndex: number;
  private operationType: OperationType | undefined;
  private internal: boolean;
  /**
   * 拖动的偏移量
   */
  private dragOffset: number;
  private onMouseMoveListener;
  private onMouseUpListener;
  private unit: Unit;
  private autoMerge: boolean;
  private updateValueCounter: number;

  static defaultProps: SliderProps = {
    internal: false,
    initChange: true,
    unit: 'millisecond',
    autoMerge: false,
    isReadOnly: false,
    timesMaxLength: 8
  };

  constructor(props: SliderProps) {
    super(props);

    this.internal = !!props.internal;
    this.resizeType = undefined;
    this.createTrackIndex = -1;
    this.dragOffset = 0;
    this.unit = props.unit;
    this.autoMerge = !!props.autoMerge;
    this.updateValueCounter = 0;

    this.state = {
      activeTrackId: '',
      internalValue: []
    };
  }

  componentDidMount() {
    const { value, initChange } = this.props;

    // 获取默认数据
    const defaultValue = value ? transformTimes(value, this.unit) : [{ start: 0, end: MAX_TIME }];

    this.updateValueCounter = 0;
    this.formatInternalValue(defaultValue);

    if (initChange) {
      this.handleChange(defaultValue, this.unit);
    }
  }

  componentDidUpdate(prevProps: SliderProps) {
    const { value, internal } = this.props;
    if (internal) {
      if (prevProps.value !== value) {
        this.setState({
          internalValue: value
        });
      }
      return;
    }

    // 确保只响应表单设置值
    if (this.updateValueCounter !== 1) return;
    if (prevProps.value !== value) {
      const internalValue = transformTimes(value, this.unit);

      this.setState({
        internalValue
      });
    }
  }

  componentDidCatch() {
    this.removeDocumentEvents();
  }

  /**
   * 处理时间段，添加唯一ID
   * @param nextValue
   */
  formatInternalValue = (nextValue: Time[]) => {
    const times = nextValue
      .map((item) => {
        if (!item.id) {
          item.id = uniqueId('time_');
        }
        return item;
      })
      .filter((item) => isNumber(item.end));

    this.setState({
      internalValue: times
    });
  };

  handleChange = debounce(
    (nextValue: Time[], unit: Unit) => {
      const { onChange } = this.props;
      this.updateValueCounter++;
      if (this.internal) {
        onChange?.(nextValue);
        return;
      }
      const value = JSON.parse(JSON.stringify(nextValue)).map((item) => ({
        start: getExternalTime(item.start as number, unit),
        end: getExternalTime(item.end as number, unit)
      }));
      onChange?.(value);
    },
    400,
    { leading: true }
  );

  handleInternalValue = (times: Time[] = []) => {
    this.setState({
      internalValue: times
    });

    this.handleChange(times, this.unit);
  };

  /**
   * 操作开始
   * @param position
   * @param val
   */
  handleStart = (position: number) => {
    const { internalValue } = this.state;

    if (this.operationType === 'dragging') {
      const timeValue = this.calcValueByPos(position);

      // 过滤掉已存在的未操作的创建数据
      let times = internalValue.filter((item) => item.end !== -1);

      times.push({
        id: uniqueId('time_'),
        start: timeValue,
        end: -1
      });

      times.sort((a, b) => +a.start - +b.start);
      this.formatInternalValue(times);
    }
  };

  /**
   * 响应操作过程
   * @param position
   */
  handleMove = (position) => {
    const { internalValue, activeTrackId, resizeBoundary } = this.state;

    const value = this.calcValueByPos(position);
    const activeTrack = activeTrackId;

    // 拖动改变大小
    if (this.operationType === 'resizing') {
      const trackId = internalValue.findIndex((item) => item.id === activeTrack);
      if (trackId === -1) return;

      const time = internalValue[trackId]
        ? JSON.parse(JSON.stringify(internalValue[trackId]))
        : undefined;

      if (!time) return;

      if (this.resizeType === 'left' && value >= resizeBoundary[0] && value < time.end) {
        time.start = value;
      }

      if (this.resizeType === 'right' && value <= resizeBoundary[1] && value > time.start) {
        time.end = value;
      }

      const currentTimesCopy = JSON.parse(JSON.stringify(internalValue));

      // 如果拖动到与前后时间段相连，则应该自动合并
      if (this.autoMerge && currentTimesCopy.length >= 2) {
        // 左侧拖动合并
        if (
          this.resizeType === 'left' &&
          value <= resizeBoundary[0] &&
          resizeBoundary[0] !== MIN_TIME
        ) {
          this.leftMerge(currentTimesCopy, activeTrack);
          return;
        }

        if (
          this.resizeType === 'right' &&
          value >= resizeBoundary[1] &&
          resizeBoundary[1] !== MAX_TIME
        ) {
          this.rightMerge(currentTimesCopy, activeTrack);
          return;
        }
      }
      currentTimesCopy[trackId] = time;
      this.handleInternalValue(currentTimesCopy);
      return;
    }

    // 创建新的时间段
    if (this.operationType === 'dragging') {
      const currentTimesCopy: Time[] = JSON.parse(JSON.stringify(internalValue));

      // 获取创建时间段的索引
      let createIndex = currentTimesCopy.findIndex(
        (item) => !isNumber(item.end) || item.end === -1
      );
      if (createIndex === -1) {
        createIndex = this.createTrackIndex;
      } else {
        this.createTrackIndex = createIndex;
      }

      if (createIndex === -1) return;

      const createId = currentTimesCopy[createIndex]?.id;

      // 开启自动合并
      if (this.autoMerge && currentTimesCopy.length >= 2) {
        const boundary = getResizeBoundary(currentTimesCopy, createId);
        // 只能往右滑动
        if (value >= boundary[1] && boundary[1] !== MAX_TIME) {
          this.rightMerge(currentTimesCopy, createId);
          this.operationType = undefined;
          this.dragOffset = 0;
          this.removeDocumentEvents();
          return;
        }
      }

      const createBoundary = getCreateBoundary(currentTimesCopy, createId);

      if (!createBoundary) return;

      if (value > createBoundary[0] && value <= createBoundary[1]) {
        currentTimesCopy[createIndex].end = value;
        this.handleInternalValue(currentTimesCopy);
      }
    }
  };

  /**
   * 操作完成
   */
  handleEnd = () => {
    const { internalValue } = this.state;

    this.removeDocumentEvents();
    this.dragOffset = 0;
    this.operationType = undefined;
    this.createTrackIndex = -1;

    // 处理不合法的时间段
    this.setState({
      internalValue: filterTimes(internalValue)
    });
  };

  /**
   * 合并左侧的时间段
   * @param time
   * @param times
   * @param trackId 唯一标识
   */
  leftMerge = (times: Time[], trackId: string) => {
    const trackIndex = times.findIndex((item) => item.id === trackId);
    if (trackIndex === -1 || trackIndex === 0) return undefined;

    const index = trackIndex - 1;
    // 合并上一个时间段

    const newTimes = times.map((item) => {
      if (item.id === trackId) {
        return {
          ...item,
          start: times[index].start
        };
      }

      return item;
    });

    // 删除已合并的时间段
    newTimes.splice(index, 1);

    this.setState({
      resizeBoundary: getResizeBoundary(newTimes, trackId)
    });
    this.dragOffset = 0;
    this.resizeType = undefined;
    this.handleInternalValue(newTimes);

    return newTimes;
  };

  /**
   * 合并右侧的时间段
   * @param type
   * @param options
   */
  rightMerge = (times: Time[], trackId: string) => {
    const trackIndex = times.findIndex((item) => item.id === trackId);
    if (trackIndex === -1 || trackIndex === times.length) return;

    const index = trackIndex + 1;

    // 合并下一个时间段
    if (!times[index]) return;

    const newTimes = times.map((item) => {
      if (item.id === trackId) {
        return {
          ...item,
          end: times[index].end
        };
      }

      return item;
    });

    // 删除已合并的时间段
    newTimes.splice(index, 1);

    this.setState({
      resizeBoundary: getResizeBoundary(newTimes, trackId)
    });
    this.dragOffset = 0;
    this.resizeType = undefined;
    this.handleInternalValue(newTimes);
  };

  /**
   * 鼠标按下事件，用于创建新的时间点
   */
  handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { isReadOnly, timesMaxLength } = this.props;
    const { internalValue } = this.state;
    if (e.button !== 0 || isReadOnly) return;

    // 获取点击的位置
    const position = getMousePosition(e);

    this.dragOffset = 0;
    this.operationType = 'dragging';
    this.setState({
      activeTrackId: ''
    });

    // 限制创建时间点的数量
    if (internalValue.length >= timesMaxLength) {
      this.removeDocumentEvents();
      return;
    }

    this.handleStart(position);
    this.addDocumentMouseEvents();
  };

  /**
   * 保存时间段
   */
  handleTrackSave = (id: string, time: Time) => {
    const { internalValue, resizeBoundary } = this.state;

    this.handleInternalValue(
      internalValue.map((item) => {
        if (item.id === id) {
          // 防止丢失ID
          return {
            ...item,
            ...time
          };
        }
        return item;
      })
    );

    this.setState({
      activeTrackId: ''
    });

    // 手动修改时间 考虑时间段合并问题
    if (!this.autoMerge) return;

    let leftMergeResult: Time[] = undefined;

    // 左侧合并
    if (time.start <= resizeBoundary[0]) {
      leftMergeResult = this.leftMerge(internalValue, id);
    }
    // 右侧合并
    if (time.end >= resizeBoundary[1]) {
      this.rightMerge(leftMergeResult || internalValue, id);
    }
  };

  /**
   * 删除指定的时间段
   * @param index
   */
  handleTrackRemove = (id: string) => {
    const { internalValue } = this.state;
    this.handleInternalValue(internalValue.filter((item) => item.id !== id));
  };

  /**
   * 激活指定的时间段
   * @param id
   */
  handleTrackActive = (id: string) => {
    const { isReadOnly } = this.props;
    const { internalValue } = this.state;

    if (isReadOnly) return;

    this.setState({
      activeTrackId: id,
      resizeBoundary: getResizeBoundary(internalValue, id)
    });
  };

  /**
   * 改变选中的时间段大小
   * @param type
   * @param id
   */
  handleTrackResize = (type: ResizeType, id: string) => {
    const { internalValue } = this.state;

    this.resizeType = type;
    const time = internalValue.find((item) => item.id === id);
    if (!time) return;
    const position = type === 'left' ? time.start : time.end;

    // 设置操作类型
    this.operationType = 'resizing';

    this.handleStart(+position);
    this.addDocumentMouseEvents();
  };

  /**
   * 鼠标移动事件
   * @param e
   */
  handleMouseMove = (e) => {
    pauseEvent(e);
    if (!this.root) return;

    if (this.operationType) {
      const position = getMousePosition(e);
      this.handleMove(position - this.dragOffset);
    }
  };

  /**
   * 添加事件监听
   */
  addDocumentMouseEvents = () => {
    if (!this.root) return;
    const ownerDocument = this.root.ownerDocument;
    this.onMouseMoveListener = addEventListener(ownerDocument, 'mousemove', this.handleMouseMove);
    this.onMouseUpListener = addEventListener(ownerDocument, 'mouseup', this.handleEnd);
  };

  /**
   * 删除事件监听
   */
  removeDocumentEvents = () => {
    this.onMouseUpListener && this.onMouseUpListener.remove();
    this.onMouseMoveListener && this.onMouseMoveListener.remove();
  };

  /**
   * 获取开始拖动的位置
   */
  getSliderStart = (): number => {
    const slider = this.root;
    const rect = slider.getBoundingClientRect();
    return window.pageXOffset + rect.left;
  };

  /**
   * 通过位置计算具体的时间值
   * @param position
   */
  calcValueByPos = (position: number) => {
    const pixelOffset = position - this.getSliderStart();
    const ratio = Math.abs(Math.max(pixelOffset, 0) / this.getSliderLength());
    return floor(ratio * (MAX_TIME - MIN_TIME) + MIN_TIME);
  };

  /**
   * 获取滑动条的长度
   */
  getSliderLength = () => {
    const slider = this.root;
    if (!slider) {
      return 0;
    }

    const coords = slider.getBoundingClientRect();
    return coords.width;
  };

  saveRoot = (node: HTMLDivElement) => {
    this.root = node;
  };

  render() {
    const { className, style } = this.props;
    const { internalValue, resizeBoundary, activeTrackId } = this.state;

    return (
      <ConfigConsumer>
        {({ getPrefixCls }) => {
          const prefixCls = getPrefixCls('schedule-slider');

          return (
            <div
              className={classNames(className, {
                [`${prefixCls}`]: true
              })}
              style={style}
              ref={this.saveRoot}
            >
              {/** 背景 */}
              <div className={`${prefixCls}-rail`} onMouseDown={this.handleMouseDown} />

              {/** 时间段  */}
              {filterTimes(internalValue).map((item, index) => {
                return (
                  <Track
                    id={item.id}
                    key={item.id || index}
                    value={item}
                    resizeBoundary={resizeBoundary}
                    isActive={item.id === activeTrackId}
                    isDragging={
                      this.operationType === 'dragging' && this.createTrackIndex === index
                    }
                    onSave={this.handleTrackSave}
                    onRemove={this.handleTrackRemove}
                    onClick={this.handleTrackActive}
                    onResize={this.handleTrackResize}
                  />
                );
              })}

              {/** 标记点 */}
              <div className={`${prefixCls}-mark`}>
                {marks.map((item) => (
                  <span
                    key={item}
                    className={`${prefixCls}-mark-text`}
                    style={{
                      left: `${(item / 24) * 100}%`
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}

export default Slider;
