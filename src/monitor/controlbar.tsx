import React, { FC, useRef } from 'react';
import { Radio, Badge, Tooltip } from 'antd';
import Icon from '../icon';
import { Volume, FullscreenUI, PrismPlay, Download, Speed, LiveMode } from '../player/common';
import Progress from './progress';
import { MonitorType } from './monitor';
import { VideoInfo } from './types';

interface ControlbarProps {
  prefixCls?: string;
  type: MonitorType;
  videos?: VideoInfo[];
  playStatus?: boolean;
  isPolling?: boolean;
  currentTime?: number;
  isFullscreen?: boolean;
  currentVideoIndex?: number;
  /**
   * 需要隐藏的工具栏项
   */
  hideTools?: string[];
  onDownloadClick?: () => void;
  onChangeType?: (type: MonitorType) => void;
  liveModeProps?: {
    value?: string;
    onChange?: (val: string) => void;
  };
  speedProps?: {
    value?: number;
    doubleRow?: boolean;
    onChange?: (vol: number) => void;
  };
  onYunTaiClick?: () => void;
  onVolumeChange?: (vol: number) => void;
  onPalyerChange?: (index: number, time: number) => void;
  onPlayStatusChange?: () => void;
  onFullscreenChange?: () => void;
}

const Controlbar: FC<ControlbarProps> = ({
  prefixCls,
  playStatus,
  type,
  videos,
  isPolling,
  hideTools = [],
  currentVideoIndex,
  currentTime,
  isFullscreen,
  liveModeProps,
  speedProps,
  onChangeType,
  onVolumeChange,
  onPalyerChange,
  onYunTaiClick,
  onDownloadClick,
  onPlayStatusChange,
  onFullscreenChange
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`${prefixCls}`}
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={`${prefixCls}-progress`}>
        {type === 'history' && (
          <Progress
            videos={videos}
            currentIndex={currentVideoIndex}
            currentTime={currentTime}
            onPalyerChange={onPalyerChange}
          />
        )}
      </div>
      <div className={`${prefixCls}-wrapper`}>
        <div className={`${prefixCls}-content`}>
          {isPolling
            ? (<Badge className={`${prefixCls}-polling`} color="#1DCCBB" text="轮巡中" />)
            : (
              <Radio.Group value={type} size="small" buttonStyle="solid">
                <Radio.Button value="live" onClick={() => onChangeType('live')}>
                  直播
                </Radio.Button>
                {hideTools.indexOf('history') === -1 && (
                  <Radio.Button value="history" onClick={() => onChangeType('history')}>
                    历史
                  </Radio.Button>
                )}
              </Radio.Group>
            )
          }
          {type === 'history' && <PrismPlay status={playStatus} onChange={onPlayStatusChange} />}
        </div>
        <div className={`${prefixCls}-extra`}>
          {(hideTools.indexOf('changeLiveSource') === -1) && type === 'live' && (
            <LiveMode {...liveModeProps} getPopupContainer={() => rootRef.current} />
          )}
          {hideTools.indexOf('yuntai') === -1 && (
            <Tooltip title="云台">
              <div className="sen-player-download" onClick={onYunTaiClick}>
                <Icon type="icon-yuntai" />
              </div>
            </Tooltip>
          )}
          {type === 'history' && (
            <Speed {...speedProps} getPopupContainer={() => rootRef.current} />
          )}
          {hideTools.indexOf('volume') === -1 && (
            <Volume onChange={onVolumeChange} getPopupContainer={() => rootRef.current} />
          )}
          {hideTools.indexOf('download') === -1 && <Download onClick={onDownloadClick} />}
          {hideTools.indexOf('fullscreen') === -1 && (
            <FullscreenUI state={isFullscreen} onChange={onFullscreenChange} />
          )}
        </div>
      </div>
    </div>
  );
};

Controlbar.defaultProps = {
  videos: []
};

export default Controlbar;
