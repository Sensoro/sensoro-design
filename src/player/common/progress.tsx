import React, { useRef } from 'react';
import classNames from '@pansy/classnames';

// @ts-ignore
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  status?: boolean;
  style?: React.CSSProperties;
  onChange?: (time: number) => void;
  // 视频总时长
  duration?: number;
  // 当前播放的时间
  currentTime?: number;
}

const Progress: React.FC<ProgressProps> = (props) => {
  const { prefixCls, className, style, duration, currentTime, onChange, ...reset } = props;
  const rootRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const position = e.pageX;

    console.log(position);
    console.log(currentTime);
  };

  const handleMouseUp = () => {};

  const getCursorLeft = () => {
    const root = rootRef.current;

    if (root) {
      const { width } = root.getBoundingClientRect();

      let left = (currentTime / duration) * width;

      if (left >= width - 6) {
        left = width - 6;
      }

      return `${(left / width) * 100}%`;
    }

    return undefined;
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = e.pageX;
    const start = window.pageXOffset + rect.left;
    const width = rect.width;
    const pixelOffset = position - start;

    const time = (pixelOffset / width) * duration;

    onChange?.(time);
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
      onClick={handleClick}
      ref={rootRef}
      {...reset}
    >
      {/** 已播放进度条  */}
      <div
        className={`${prefixCls}-played`}
        style={{
          width: `${(currentTime / duration) * 100}%`
        }}
      />

      <div
        className={`${prefixCls}-cursor`}
        style={{
          right: 'auto',
          left: getCursorLeft()
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

Progress.defaultProps = {
  prefixCls: 'sen-player-progress',
  duration: 0,
  currentTime: 0
};

export default Progress;
