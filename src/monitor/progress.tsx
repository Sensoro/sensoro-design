import React, { FC, CSSProperties, useState, useEffect, memo } from 'react';
import moment from 'moment';
import classNames from '@pansy/classnames';
import { VideoInfo } from './types';

interface ProgressProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  videos?: VideoInfo[];
  startTime?: number;
  currentTime?: number;
  currentIndex?: number;
  onPalyerChange?: (index: number, time: number) => void;
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    prefixCls,
    className,
    style,
    startTime,
    videos = [],
    currentIndex,
    currentTime,
    onPalyerChange
  } = props;
  const [rangeData, setRangeData] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
  const [showTimeTooltip, setShowTimeTooltip] = useState<boolean>(false);
  const [targetCurrentTime, setTargetCurrentTime] = useState<string>('');
  const [precent, setPrecent] = useState<number>(0);

  useEffect(() => {
    if (videos.length) {
      let lastIndex = videos.length - 1;
      const start = videos[0].from;
      const end = videos[lastIndex]?.from + videos[lastIndex]?.duration * 1000;

      setRangeData({
        start,
        end
      });
    } else {
      setRangeData({ start: 0, end: 0 });
    }
  }, [props.videos]);

  const length: number = rangeData.end - rangeData.start;

  const handleTrackMouseDown = (e, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = e.pageX;
    const start = window.pageXOffset + rect.left;
    const width = rect.width;
    const pixelOffset = position - start;

    if (pixelOffset >= 0) {
      const videoInfo = videos[index];

      const time = (pixelOffset / width) * videoInfo.duration;

      onPalyerChange?.(index, time);
    }
  };

  const geTrackPlayStyle = (index: number, data: VideoInfo): CSSProperties => {
    const sty: CSSProperties = {
      width: 0
    };

    if (index < currentIndex) {
      sty.width = '100%';
    }

    if (index === currentIndex) {
      sty.width = `${(currentTime / data.duration) * 100}%`;
    }

    return sty;
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = e.pageX;
    const start = window.pageXOffset + rect.left;
    // 获取进度条宽度
    const progressWidth = e.currentTarget.offsetWidth;
    // 获取偏移量
    const pixelOffset = position - start;
    const precent: number = pixelOffset / progressWidth;

    const time: string = moment(rangeData.start + length * precent).format('YYYY-MM-DD HH:mm:ss');

    setTargetCurrentTime(time);
    setShowTimeTooltip(true);
    setPrecent(precent);
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setShowTimeTooltip(false);
      }}
      style={style}
    >
      {/** 背景 */}
      <div className={`${prefixCls}-rail`} />

      {showTimeTooltip && (
        <div
          className={`${prefixCls}-time-tooltip`}
          style={{
            left: `${precent * 100}%`
          }}
        >
          {targetCurrentTime}
        </div>
      )}

      {videos.map((item, index) => {
        const len = ((item.duration * 1000) / length) * 100;
        const offset = ((item.from - rangeData.start) / length) * 100;
        const positonStyle = {
          left: `${offset}%`,
          right: 'auto',
          width: `${len}%`
        };

        return (
          <div
            key={index}
            className={`${prefixCls}-track`}
            style={positonStyle}
            onMouseDown={(e) => {
              handleTrackMouseDown(e, index);
            }}
          >
            <b className={`${prefixCls}-track-play`} style={geTrackPlayStyle(index, item)} />
          </div>
        );
      })}
    </div>
  );
};

Progress.defaultProps = {
  prefixCls: 'sen-monitor-progress',
  videos: [],
  currentTime: 0,
  currentIndex: 0
};

export default memo(Progress);
