import React, { useRef, useState } from 'react';
import classNames from '@pansy/classnames';
import floor from 'lodash/floor';
import isNumber from 'lodash/isNumber';
import { PrismPlay, FullscreenUI, Volume, Progress, Download } from './common';
import { PrismPlayProps } from './common/prism-play';
import { FullscreenUIProps } from './common/fullscreen-ui';
import { VolumeProps } from './common/volume';
import { ProgressProps } from './common/progress';
import { formatDuration } from './utils';
import { formatTime } from '../common/utils';

export interface ControlbarProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  download?: {
    visible?: boolean;
    onClick?: () => void;
  };
  isLive?: boolean;
  // 视频的开始时间
  startTime?: number;
  duration?: number;
  currentTime?: number;
  progress?: {
    onChange: ProgressProps['onChange'];
  };
  volume?: {
    onChange: VolumeProps['onChange'];
  };
  prismPlay?: {
    status: boolean;
    onChange: PrismPlayProps['onChange'];
  };
  fullscreen?: {
    state?: boolean;
    onChange?: FullscreenUIProps['onChange'];
  };
}

const Controlbar: React.FC<ControlbarProps> = (props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const {
    prefixCls,
    className,
    style,
    isLive,
    prismPlay,
    fullscreen,
    volume,
    duration,
    download,
    startTime,
    currentTime,
    progress
  } = props;
  const [showThumbnail, setShowThumbnail] = useState<boolean>(false);
  const [thumbnailPixelOffset, setThumbnailPixelOffset] = useState<number>(0);
  const [thumbnailText, setThumbnailText] = useState<string>('');

  const getSliderStart = (): number => {
    const rect = rootRef.current.getBoundingClientRect();
    return window.pageXOffset + rect.left;
  };

  const getThumbnailText = (offset: number) => {
    const width = rootRef.current.getBoundingClientRect().width;
    const time = floor(duration * (offset / width));

    if (startTime && isNumber(startTime)) {
      return formatTime(floor(startTime + time * 1000));
    }

    return formatDuration(time);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setShowThumbnail(true);
    // 获取偏移量
    const pixelOffset = e.pageX - getSliderStart();

    const width = rootRef.current.getBoundingClientRect().width;
    const thumbnailWidth = thumbnailRef.current.getBoundingClientRect().width;

    if (pixelOffset <= thumbnailWidth) {
      setThumbnailPixelOffset(pixelOffset);
    }

    if (pixelOffset > thumbnailWidth) {
      setThumbnailPixelOffset(pixelOffset - thumbnailWidth / 2);
    }

    if (thumbnailWidth + pixelOffset >= width) {
      setThumbnailPixelOffset(width - thumbnailWidth);
    }

    // 获取相对应的视频时间文本
    setThumbnailText(getThumbnailText(pixelOffset));
  };

  const handleMouseOut = () => {
    setShowThumbnail(false);
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
      ref={rootRef}
    >
      <div className={`${prefixCls}-bg`} />
      {!isLive && (
        <div className={`${prefixCls}-progress`}>
          <Progress
            duration={duration}
            currentTime={currentTime}
            onMouseOver={handleMouseMove}
            onMouseOut={handleMouseOut}
            onMouseMove={handleMouseMove}
            {...progress}
          />
        </div>
      )}
      {!isLive && (
        <div
          className={`${prefixCls}-thumbnail`}
          style={{
            left: thumbnailPixelOffset,
            display: showThumbnail ? 'block' : 'none'
          }}
          ref={thumbnailRef}
        >
          <span>{thumbnailText}</span>
        </div>
      )}
      <div className={`${prefixCls}-content`}>
        {!isLive && (
          <>
            <PrismPlay {...prismPlay} style={{ fontSize: 20 }} />
            {duration !== 0 && (
              <div className={`${prefixCls}-time-display`}>
                <span>{formatDuration(currentTime)}</span>
                <span> / </span>
                <span>{formatDuration(duration)}</span>
              </div>
            )}
          </>
        )}
        {isLive && <div className={`${prefixCls}-live-text`}>直播</div>}
        <div className={`${prefixCls}-extra`}>
          <Volume {...volume} getPopupContainer={() => rootRef.current} />
          {download?.visible && !isLive && <Download onClick={download.onClick} />}
          <FullscreenUI {...fullscreen} />
        </div>
      </div>
    </div>
  );
};

Controlbar.defaultProps = {
  prefixCls: 'sen-player-controlbar',
  isLive: false,
  duration: 0,
  currentTime: 0,
  download: {
    visible: true
  }
};

export default Controlbar;
