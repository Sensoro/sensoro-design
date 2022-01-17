import React, { useState, useRef, useMemo, useCallback, useEffect, useContext } from 'react';
import { Moment } from 'moment';
import isNumber from 'lodash/isNumber';
import debounce from 'lodash/debounce';
import classNames from '@pansy/classnames';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import Player from '@pansy/react-aliplayer';
import { PlayerConfig } from '@pansy/react-aliplayer/es/types';
import SelectRangeDate from './select-range-date';
import { VideoInfo, SetMealInfo } from './types';
import Fullscreen from '../fullscreen';
import { ConfigContext, SizeType } from '../config-provider';
import Icon from '../icon';
import Watermark, { WatermarkProps } from '../watermark';
import Empty from '../empty';
import Controlbar from './controlbar';
import getWatermarkProps from '../common/utils/get-watermark-props';

export type MonitorType = 'live' | 'history';
export type StreamType = 'flv' | 'hls';

export type RangeDate = {
  startTime: number;
  endTime: number;
};

export interface MonitorProps {
  /** 额外的样式类 */
  className?: string;
  /** 额外的样式类 */
  style?: React.CSSProperties;
  /** 摄像机名称 */
  name?: string;
  /** 摄像机唯一标识 */
  id: string;
  /** 播放源 */
  source: {
    flv: string;
    hls: string;
  };
  /** 指定流类型 */
  streamType?: StreamType;
  /** 是否是国标设备 */
  isGB?: boolean;
  /** 是否离线 */
  isOffline?: boolean;
  /** 大小设置 */
  size?: SizeType;
  /** 水印设置 */
  watermark?: boolean | WatermarkProps;
  /** 需要隐藏的工具栏项 */
  hideTools?: string[];
  /** 是否轮巡中 */
  isPolling?: boolean;
  onClose?: (id: string) => void;
  onYunTai?: () => void;
  onDownload?: (val: RangeDate) => Promise<string>;
  onShowSelectRangeDate?: (id: string) => Promise<SetMealInfo>;
  onHistorySearch?: (val: RangeDate) => Promise<VideoInfo[]>;
}

const Monitor: React.FC<MonitorProps> = ({
  className,
  style,
  id,
  name,
  size,
  isGB,
  source,
  streamType = 'flv',
  isPolling,
  isOffline,
  hideTools,
  watermark,
  onClose,
  onDownload,
  onYunTai,
  onHistorySearch,
  onShowSelectRangeDate
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const livePlayerRef = useRef<Player>(null);
  const historyPlayerRef = useRef<Player>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentSource, setCurrentSource] = useState<string>('');
  const [monitorType, setMonitorType] = useState<MonitorType>('live');
  const [narrow, setNarrow] = useState<boolean>(false);
  const [palyerRect, setPalyerRect] = useState<{ width: number; height: number }>();
  const [liveMode, setLiveMode] = useState<string>('hls');
  const [currentLiveSource, setCurrentLiveSource] = useState<string>(source[liveMode]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [historyIsPlay, setHistoryIsPlay] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isDownload, setIsDownload] = useState<boolean>(false);
  const [setMealLoading, setSetMealLoading] = useState<boolean>(false);
  const [setMeal, setSetMeal] = useState<SetMealInfo>({} as SetMealInfo);

  const { getPrefixCls, aliplayerVersion } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('monitor');

  useEffect(() => {
    if (rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect();

      setPalyerRect({
        width: rect.width,
        height: rect.height
      });
      setNarrow(rect.width <= 296);
    }
    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  useEffect(() => {
    if (streamType === 'flv' && source?.flv) {
      setLiveMode('flv');
      setCurrentLiveSource(source.flv);
    }

    if (streamType === 'hls' && source?.hls) {
      setLiveMode('hls');
      setCurrentLiveSource(source.hls);
    }
  }, [JSON.stringify(source), streamType]);

  const watermarkProps = getWatermarkProps(watermark);

  // 历史视频当前的播放速度
  const latestHistorySpeed = useRef<number>(1);
  const [, setHistorySpeed] = useState<number>(1);
  const setHistorySpeedCallback = useCallback(
    (nextVal: number) => {
      setHistorySpeed(nextVal);
      latestHistorySpeed.current = nextVal;
    },
    [setHistorySpeed]
  );

  // 历史视频集合
  const latestVideos = useRef<VideoInfo[]>([]);
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const setVideosCallback = useCallback(
    (nextVal: VideoInfo[]) => {
      setVideos(nextVal);
      latestVideos.current = nextVal;
    },
    [setVideos]
  );

  const debouncedResize = useCallback(
    debounce(() => {
      if (rootRef.current) {
        const rect = rootRef.current.getBoundingClientRect();

        setPalyerRect({
          width: rect.width,
          height: rect.height
        });

        setNarrow(rect.width <= 296);
      }
    }, 200),
    []
  );

  // 当前播放的历史视频索引
  const latestCurrentVideoIndex = useRef<number>(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const setCurrentVideoIndexCallback = useCallback(
    (nextVal: number) => {
      setCurrentVideoIndex(nextVal);
      latestCurrentVideoIndex.current = nextVal;
    },
    [setCurrentVideoIndex]
  );

  const setCurrentSourceCallback = useCallback(
    (nextVal: string) => {
      setCurrentSource(nextVal);

      setTimeout(setHistoryPlayerSpeed, 0);
    },
    [setCurrentSource]
  );

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  const setHistoryPlayerSpeed = () => {
    const player = historyPlayerRef.current;

    if (player) {
      player.setSpeed(latestHistorySpeed.current);
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleChangeType = (type: MonitorType) => {
    if (type === 'history') {
      handleSetVisible(true);
    } else {
      setMonitorType(type);
    }
  };

  const handleSetVisible = (visible: boolean) => {
    if (visible && onShowSelectRangeDate) {
      setSetMealLoading(true);
      onShowSelectRangeDate(id)
        .then((val) => {
          setSetMeal(val);
          setSetMealLoading(false);
        })
        .finally(() => {
          setSetMealLoading(false);
        });
    }

    setVisible(visible);
  };

  const handleVolumeChange = (vol: number) => {
    const player = historyPlayerRef.current || livePlayerRef.current;
    if (player) {
      player.setVolume(vol);
    }
  };

  const handleSpeedChange = (val: number) => {
    setHistorySpeedCallback(val);
    setHistoryPlayerSpeed();
  };

  const handleLiveModeChange = (val: string) => {
    setLiveMode(val);
    setCurrentLiveSource(source[val]);
  };

  const handlePalyerChange = (index: number, time: number) => {
    const player = historyPlayerRef.current;
    const videoInfo = videos[index];

    setCurrentVideoIndexCallback(index);
    setCurrentTime(time);

    player.loadByUrl(videoInfo.objectSignUrl, time);
  };

  const handlePlayStatusChange = () => {
    const player = historyPlayerRef.current;

    if (currentVideoIndex === videos.length - 1 && player?.getStatus() === 'ended') {
      setCurrentSourceCallback(videos[0].objectSignUrl);
      setCurrentTime(0);
      setCurrentVideoIndexCallback(0);
      setHistoryIsPlay(true);
      handlePalyerChange(0, 0);
      return;
    }

    setHistoryIsPlay(!historyIsPlay);

    if (historyIsPlay) {
      player?.pause();
    } else {
      player?.play();
    }
  };

  const handleEnded = () => {
    switchVideoPlay();
  };

  const handleLiveStreamStop = () => {
    setLiveMode((prev) => {
      const val = prev === 'flv' ? 'hls' : 'flv';

      if (source[val]) {
        livePlayerRef.current.loadByUrl(source[val]);
      }

      return val;
    });
  };

  const handleTimeupdate = () => {
    const player = historyPlayerRef.current;
    if (player) {
      const time = player.getCurrentTime();
      if (isNumber(time) && time > 0) {
        setCurrentTime(time);
      }
    }
  };

  const switchVideoPlay = (data?: VideoInfo[]) => {
    if (data) {
      const videoInfo: VideoInfo = data[0];
      setCurrentVideoIndexCallback(0);
      setCurrentSourceCallback(videoInfo.objectSignUrl);
      setHistoryIsPlay(true);
      return;
    }

    const latestIndex = latestCurrentVideoIndex.current;

    if (latestIndex === videos.length - 1) {
      // 最后一个视频播放结束后，修改播放按钮状态
      setHistoryIsPlay(false);
    } else {
      const nextIndex = latestIndex + 1;
      const nextVideoInfo: VideoInfo = latestVideos.current[nextIndex];

      if (!nextVideoInfo) return;
      setCurrentVideoIndexCallback(nextIndex);
      setCurrentTime(0);
      setCurrentSourceCallback(nextVideoInfo.objectSignUrl);
    }
  };

  const handleConfirm = (rangePicker: [Moment, Moment]) => {
    if (rangePicker && rangePicker.length === 2) {
      setLoading(true);
      const result = onHistorySearch?.({
        startTime: rangePicker[0].valueOf(),
        endTime: rangePicker[1].valueOf()
      });

      if (!result) return;
      if (result instanceof Promise) {
        result
          .then((val: VideoInfo[] = []) => {
            if (val.length === 0) {
              setLoading(false);
              return;
            } else {
              if (monitorType === 'live') {
                setMonitorType('history');
              }
            }

            setVideosCallback(val);
            setLoading(false);
            handleSetVisible(false);
            setSetMealLoading(false);

            if (val.length) {
              switchVideoPlay(val);
            }
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    onClose?.(id);
  };

  const handleDownloadClick = () => {
    setIsDownload(true);
    handleSetVisible(true);
  };

  const livePlayerMemo = useMemo(() => {
    const options: Partial<PlayerConfig> & { hasAudio?: boolean } = {
      autoplay: true,
      liveRetry: Infinity,
      vodRetry: Infinity
    };
    if (isGB) {
      options['flvOption'] = {
        hasAudio: false
      };
    }
    return (
      <Player
        key="live-player"
        source={currentLiveSource}
        isLive
        options={options}
        version={aliplayerVersion}
        // onLiveStreamStop={handleLiveStreamStop}
        hideControlbar
        ref={livePlayerRef}
      />
    );
  }, [currentLiveSource, isGB]);

  const historyPlayerMemo = useMemo(() => {
    return (
      <Player
        key="history-player"
        options={{
          autoplay: true
        }}
        version={aliplayerVersion}
        source={currentSource}
        onPlaying={() => {
          setHistoryPlayerSpeed();
        }}
        onEnded={handleEnded}
        onTimeupdate={handleTimeupdate}
        hideControlbar
        ref={historyPlayerRef}
      />
    );
  }, [currentSource, videos]);

  return (
    <Fullscreen
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`is-narrow`]: narrow,
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small'
      })}
      style={style}
      enabled={isFullscreen}
      onClose={handleCloseFullscreen}
      onDoubleClick={handleFullscreenChange}
    >
      <div
        className={`${prefixCls}-toolbar`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div className={`${prefixCls}-toolbar-wrapper`}>
          <div className={`${prefixCls}-toolbar-title`}>{name}</div>
          {!hideTools.includes('close') && (
            <div className={`${prefixCls}-toolbar-extra`}>
              <CloseOutlined onClick={handleClose} />
            </div>
          )}
        </div>
      </div>

      {isOffline && (
        <Empty
          center
          className={`${prefixCls}-offline`}
          description="设备已离线，请检查设备或网络"
          icon={<Icon type="icon-offline" />}
        />
      )}

      {!isOffline && (
        <div ref={rootRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Watermark {...watermarkProps} monitor={false} style={{ width: '100%', height: '100%' }}>
            {monitorType === 'live' && livePlayerMemo}
            {monitorType === 'history' && historyPlayerMemo}

            <Controlbar
              prefixCls={`${prefixCls}-controlbar`}
              type={monitorType}
              videos={videos}
              playStatus={historyIsPlay}
              currentTime={currentTime}
              isFullscreen={isFullscreen}
              currentVideoIndex={currentVideoIndex}
              onChangeType={handleChangeType}
              liveModeProps={{
                value: liveMode,
                onChange: handleLiveModeChange
              }}
              isPolling={isPolling}
              hideTools={hideTools}
              speedProps={{
                value: latestHistorySpeed.current,
                doubleRow: (palyerRect?.height || 0) <= 248,
                onChange: handleSpeedChange
              }}
              onYunTaiClick={onYunTai}
              onDownloadClick={handleDownloadClick}
              onVolumeChange={handleVolumeChange}
              onPalyerChange={handlePalyerChange}
              onPlayStatusChange={handlePlayStatusChange}
              onFullscreenChange={handleFullscreenChange}
            />
          </Watermark>
        </div>
      )}

      {/** 选择历史筛选时间 */}
      <SelectRangeDate
        name={name}
        visible={visible}
        loading={loading}
        isDownload={isDownload}
        setMeal={setMeal}
        setMealLoading={setMealLoading}
        className={`${prefixCls}-modal`}
        getContainer={() => rootRef.current}
        onConfirm={(rangePicker: [Moment, Moment], isDown) => {
          if (isDown) {
            if (rangePicker && rangePicker.length === 2) {
              setLoading(true);
              const result = onDownload?.({
                startTime: rangePicker[0].valueOf(),
                endTime: rangePicker[1].valueOf()
              });

              if (!result) return;
              if (result instanceof Promise) {
                result
                  .then(() => {
                    setLoading(false);
                    setVisible(false);
                  })
                  .catch(() => {
                    setLoading(false);
                  });
              } else {
                setLoading(false);
              }
            }
            return;
          }

          handleConfirm(rangePicker);
        }}
        onCancel={() => {
          setLoading(false);
          setVisible(false);
          setIsDownload(false);
        }}
      />
    </Fullscreen>
  );
};

Monitor.defaultProps = {
  size: 'middle',
  isGB: false,
  watermark: false,
  hideTools: []
};

export default Monitor;
