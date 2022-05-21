import React, { Component, CSSProperties, createRef } from 'react';
import moment, { Moment } from 'moment';
import groupBy from 'lodash/groupBy';
import floor from 'lodash/floor';
import ceil from 'lodash/ceil';
import classNames from '@pansy/classnames';
import Image from '../image';
import CarOutlined from '@sensoro-design/icons/CarOutlined';
import UserOutlined from '@sensoro-design/icons/UserOutlined';
import Empty from '../empty';
import { PictureInfo, PictureType, PictureMap, PictureResult } from './interface';

interface PictureAxisProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  list: PictureInfo[];
  onImageClick?: (info: PictureInfo) => void;
}

interface PictureAxisState {
  currentTime: Moment;
  personMap: PictureMap;
  carMap: PictureMap;
  containerWidth: number;
}

// 时间格式化模板
const formatString = 'HH:mm:ss';

class PictureAxis extends Component<PictureAxisProps, PictureAxisState> {
  private container = createRef<HTMLDivElement>();
  // 展示的图片宽度
  private readonly imageWidth: number;
  // 展示的图片间距
  private readonly imageInterval: number;
  private interval: NodeJS.Timeout;

  static defaultProps: Partial<PictureAxisProps> = {
    prefixCls: 'sen-picture-axis',
    list: []
  };

  constructor(props: PictureAxisProps) {
    super(props);

    this.imageWidth = 64;
    this.imageInterval = 8;

    this.state = {
      carMap: {},
      personMap: {},
      currentTime: moment(),
      containerWidth: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        currentTime: moment()
      });
    }, 1000);
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  shouldComponentUpdate(nextProps: PictureAxisProps) {
    if (nextProps.list !== this.props.list) {
      this.resolveList(nextProps.list);
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
    window.removeEventListener('resize', this.handleResize);
  }

  getContainerDims() {
    const { clientHeight, clientWidth } = this.container.current;

    return {
      containerWidth: clientWidth,
      containerHeight: clientHeight
    };
  }

  handleResize = () => {
    const { containerWidth } = this.getContainerDims();

    this.setState({
      containerWidth
    });
  };

  resolveList(list: PictureInfo[] = []) {
    const carMap = {};
    const personMap = {};

    // 将抓拍时间已时间戳(秒)为key 转换为对象
    const pictureMap = groupBy(list, (item: PictureInfo) => {
      return `${floor(item.captureTime / 1000)}`;
    });

    const pictureTimes: number[] = Object.keys(pictureMap)
      .map((item) => +item)
      .sort((a, b) => a - b);

    const resultTimes = this.resolveTimes(pictureTimes);

    resultTimes.forEach((time) => {
      if (time.length === 1 && time[0]) {
        const key = time[0];
        const infos = pictureMap[key];

        const data = groupBy(infos, (item: PictureInfo) => {
          return item.type;
        });

        carMap[key] = data.car;
        personMap[key] = data.person;
        return;
      }

      if (time.length > 1) {
        const infos = [];
        const key = time[time.length - 1];

        time.forEach((item) => {
          infos.push(...pictureMap[item]);
        });

        const data = groupBy(infos, (item: PictureInfo) => {
          return item.type;
        });

        carMap[key] = data.car;
        personMap[key] = data.person;
        return;
      }
    });

    this.setState({
      carMap,
      personMap
    });
  }

  handleImageClick = (data: PictureInfo) => {
    this.props?.onImageClick(data);
  };

  /**
   * 将相邻的时间戳(1S)合并到一个数组
   */
  resolveTimes = (list: number[] = []) => {
    if (!list.length) return [];

    if (list.length === 1) {
      return [list];
    }

    let result = [];
    let temporaryTimes = [];

    for (let i = 0; i <= list.length; i++) {
      if (
        temporaryTimes.length &&
        (!list[i] || temporaryTimes[temporaryTimes.length - 1] + 1 < list[i])
      ) {
        result.push(temporaryTimes);
        temporaryTimes = [];
      }

      if (temporaryTimes.length === 0) {
        temporaryTimes.push(list[i]);
        continue;
      }

      // 相邻的时间添加到数组里面
      if (temporaryTimes[temporaryTimes.length - 1] + 1 === list[i]) {
        temporaryTimes.push(list[i]);
      }
    }

    return result;
  };

  resolvePictureMap = (): PictureResult[] => {
    const { currentTime, carMap, personMap, containerWidth } = this.state;
    const marks = [...Object.keys({ ...personMap, ...carMap })].reverse();

    let firstInterval: number = floor(currentTime.valueOf() / 1000) - +marks[0];

    firstInterval = firstInterval <= 0 ? 0 : firstInterval + this.imageWidth;

    // 获取所需的数据格式
    const pictureList = marks.map((item, index) => {
      const persons = personMap[item] || [];
      const cars = carMap[item] || [];

      // 人脸、车辆最大的宽度为该区块最大的长度
      let length = persons.length > cars.length ? persons.length : cars.length;
      // 计算该区块的宽度
      const width = length * this.imageWidth + (length - 1) * this.imageInterval;

      // 计算与上一个区块的间隔
      let interval: number = 0;
      if (index > 0) {
        interval = Math.abs(+marks[index] - +marks[index - 1]);
      }
      const left = index === 0 ? firstInterval : interval + this.imageInterval;

      return {
        time: this.formatTime(+item * 1000),
        cars,
        persons,
        interval,
        length,
        width,
        left
      };
    });

    let widthTotal: number = 0;
    const newPictureList: PictureResult[] = [];

    if (pictureList.length && containerWidth <= pictureList[0].left) {
      return [];
    }

    for (let i = 0; i < pictureList.length; i++) {
      const result = { ...pictureList[i] };

      // 计算下一个宽度
      const nextWidth = widthTotal + result.left + result.width;

      if (nextWidth > containerWidth && result.length >= 1) {
        break;
      }

      if (nextWidth > containerWidth) {
        const removeImageNum = ceil((nextWidth - containerWidth) / this.imageWidth);
        const newLength = result.length - removeImageNum;

        if (result.persons.length > newLength) {
          result.persons.length = newLength;
        }

        if (result.cars.length > newLength) {
          result.cars.length = newLength;
        }

        result.length = newLength;

        result.width = newLength * this.imageWidth + (newLength - 1) * this.imageInterval;
      }

      widthTotal = nextWidth;

      newPictureList.push(result);
    }

    return newPictureList;
  };

  /**
   * 格式化显示的时间
   * @param time
   */
  formatTime = (time: Moment | number): string => {
    return moment.isMoment(time) ? time.format(formatString) : moment(time).format(formatString);
  };

  renderImage = (data: PictureResult[], type: PictureType) => {
    const { prefixCls } = this.props;

    const imageStyle = {
      width: this.imageWidth,
      height: this.imageWidth
    };

    return (
      <div className={`${prefixCls}-images`} style={{ marginTop: type === 'car' ? 8 : 0 }}>
        {data.map((item) => {
          const imgs = item[`${type}s`];

          return (
            <div
              key={`${item.time}-${type}`}
              className={`${prefixCls}-images-item`}
              style={{
                width: item.width,
                marginLeft: item.left
              }}
            >
              {imgs.map((info, index) => {
                return (
                  <div
                    key={info.id || `${type}_${index}`}
                    style={imageStyle}
                    className={`${prefixCls}-image`}
                  >
                    {(info.subtype === 'human' ||
                      (info.subtype === 'motovehicle' && info.plateText)) && (
                      <div
                        className={`${prefixCls}-image-mask`}
                        onClick={() => {
                          this.handleImageClick(info);
                        }}
                      >
                        {type === 'person' ? <UserOutlined /> : <CarOutlined />}
                      </div>
                    )}
                    <Image fit="contain" preview={false} src={info.url} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  getTrackWidth = (length: number): number => {
    return length * this.imageWidth + (length - 1) * this.imageInterval;
  };

  render() {
    const { prefixCls, className, style, list } = this.props;
    const { currentTime } = this.state;
    const pictureList = this.resolvePictureMap();

    return (
      <div
        className={classNames(className, {
          [`${prefixCls}`]: true
        })}
        style={style}
        ref={this.container}
      >
        {/** 图片展示区域 */}
        <div className={`${prefixCls}-content`}>
          {list.length === 0 && (
            <div className={`${prefixCls}-empty`}>
              <div>
                <Empty icon="image" description="暂无抓拍图片" />
              </div>
            </div>
          )}
          {list.length !== 0 && (
            <>
              {/** 人脸图片  */}
              {this.renderImage(pictureList, 'person')}
              {/** 机动车图片  */}
              {this.renderImage(pictureList, 'car')}
            </>
          )}
        </div>
        <div className={`${prefixCls}-axis`}>
          {/** 显示当前时间  */}
          {((pictureList.length !== 0 && pictureList[0].left !== 0) ||
            pictureList.length === 0) && (
            <>
              <div className={`${prefixCls}-time`}>
                <span>{this.formatTime(currentTime)}</span>
              </div>
              <div className={`${prefixCls}-time-scale`}>
                <div className={`${prefixCls}-time-scale-barrel`} />
                <div className={`${prefixCls}-time-scale-taper`} />
              </div>
            </>
          )}
          {/** 展示事件刻度  */}
          <div className={`${prefixCls}-marks`}>
            {pictureList.map((item) => {
              return (
                <div
                  key={`${item.time}-mark`}
                  className={`${prefixCls}-mark`}
                  style={{
                    width: item.width,
                    marginLeft: item.left
                  }}
                >
                  {item.time}
                </div>
              );
            })}
          </div>
          <div className={`${prefixCls}-rail`}>
            {pictureList.map((item, index) => {
              const { persons, cars } = item;

              return (
                <div
                  key={item.time || index}
                  className={`${prefixCls}-track-content`}
                  style={{
                    width: item.width,
                    marginLeft: item.left
                  }}
                >
                  <div className={`${prefixCls}-track-scale`} />
                  {persons.length !== 0 && (
                    <div
                      className={classNames(`${prefixCls}-track`, `${prefixCls}-track-person`)}
                      style={{
                        width: this.getTrackWidth(persons.length)
                      }}
                    />
                  )}
                  {cars.length !== 0 && (
                    <div
                      className={classNames(`${prefixCls}-track`, `${prefixCls}-track-car`)}
                      style={{
                        width: this.getTrackWidth(cars.length)
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default PictureAxis;
