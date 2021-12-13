import React, { useContext, useMemo, useState, useRef, useCallback, useEffect } from 'react';
import isNumber from 'lodash/isNumber';
import classNames from '@pansy/classnames';
import Player from '@pansy/react-aliplayer';
import { PlayerConfig } from '@pansy/react-aliplayer/es/types';
import Watermark, { WatermarkProps } from '../watermark';
import getWatermarkProps from '../common/utils/get-watermark-props';
import { ConfigContext } from '../config-provider';
import Fullscreen from '../fullscreen';
import Controlbar from '../player/controlbar';
import { Offline } from '../player/common';

export interface DoublePlayerProps {
  className?: string;
  style?: React.CSSProperties;
  isLive?: boolean;
  autoplay?: boolean;
  // 摄像头是否离线
  isOffline?: boolean;
  watermark?: WatermarkProps | boolean;
  /**
   * 是否是国标设备
   */
  isGB?: boolean;
  hideController?: boolean;
  sources: [string, string];
  onDownload?: () => void;
}

const DoublePlayer: React.FC<DoublePlayerProps> = ({
  className,
  style,
  watermark,
  isLive,
  isGB,
  sources,
  autoplay,
  isOffline,
  hideController,
  onDownload
}) => {
  const leftPlayerRef = useRef<Player>(null);
  const rightPlayerRef = useRef<Player>(null);
  const controlPlayer = useRef<Player>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [durations, setDurations] = useState<[number, number]>([0, 0]);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [prismPlay, setPrismPlay] = useState<boolean>(autoplay);
  const { getPrefixCls, aliplayerVersion } = useContext(ConfigContext);

  const latestDuration = useRef<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const setDurationCallback = useCallback(
    (nextValue) => {
      latestDuration.current = nextValue;
      setDuration(nextValue);
    },
    [setDuration]
  );

  useEffect(() => {
    if (durations[0] && durations[1]) {
      const leftPlayer = leftPlayerRef.current;
      const rightPlayer = rightPlayerRef.current;

      if (autoplay) {
        leftPlayer.play();
        rightPlayer.play();
      }

      setDurationCallback(Math.min(...durations));
      let player: any = null;
      if (durations[0] > durations[1]) {
        player = rightPlayer.getPlayer();
      } else {
        player = leftPlayer.getPlayer();
      }

      controlPlayer.current = player

      player.on('timeupdate', () => {
        const time = player.getCurrentTime();
        handleTimeupdate(time);
      });

      player.on('ended', () => {
        // 设置播放结束，防止比较长的视频还在播放
        if (leftPlayer) {
          leftPlayer.pause();
        }
        if (rightPlayer) {
          rightPlayer.pause();
        }

        setPrismPlay(false);
      });
    }
  }, [durations]);

  const prefixCls = getPrefixCls('double-player');
  const watermarkProps = getWatermarkProps(watermark);

  const handleLeftReady = () => {
    const player = leftPlayerRef.current;

    const duration = player.getDuration();

    if (isNumber(duration)) {
      setDurations((prev) => [duration, prev[1]]);
    }
  };

  const handleRightReady = () => {
    const player = rightPlayerRef.current;

    const duration = player.getDuration();

    if (isNumber(duration)) {
      setDurations((prev) => [prev[0], duration]);
    }
  };

  const handleFullscreenChange = () => {
    setEnabled(!enabled);
  };

  const handleTimeupdate = (time: number) => {
    const duration = latestDuration.current;

    if (isNumber(time) && time > 0 && time <= duration) {
      setCurrentTime(time);
    }
  };

  /**
   * 调节音量回调
   */
  const handleVolumeChange = (volume: number) => {
    const leftplayer = leftPlayerRef.current;
    const rightPlayer = rightPlayerRef.current;

    leftplayer && leftplayer.setVolume(volume);
    rightPlayer && rightPlayer.setVolume(volume);
  };

  /**
   * 切换播放状态回调
   * @param status
   */
  const handlePrismPlayChange = (status: boolean) => {
    const leftplayer = leftPlayerRef.current;
    const rightPlayer = rightPlayerRef.current;
    if (controlPlayer.current?.getStatus() === 'ended') {
      leftplayer.seek(0);
      rightPlayer.seek(0);
    }

    if (leftplayer) {
      status ? leftplayer.play() : leftplayer.pause();
    }

    if (rightPlayer) {
      status ? rightPlayer.play() : rightPlayer.pause();
    }
    setPrismPlay(status);
  };

  /**
   * 点击、拖拽进度条回调
   * @param time
   */
  const handleProgressChange = (time: number) => {
    const leftplayer = leftPlayerRef.current;
    const rightPlayer = rightPlayerRef.current;

    leftplayer && leftplayer.seek(time);
    rightPlayer && rightPlayer.seek(time);

    setCurrentTime(time);
  };

  const leftPlayer = useMemo(() => {
    const options: Partial<PlayerConfig> = {
      autoplay: false,
      autoPlayDelay: 0
    };

    if (isLive) {
      options.liveRetry = Infinity;
      options.vodRetry = Infinity;
    }

    if (isGB) {
      options['flvOption'] = {
        hasAudio: false
      };
    }

    return (
      <Player
        source={sources[0]}
        style={{ width: '50%' }}
        isLive={isLive}
        options={options}
        version={aliplayerVersion}
        onReady={handleLeftReady}
        ref={leftPlayerRef}
      />
    );
  }, [sources[0], isLive]);

  const rightPlayer = useMemo(() => {
    const options: Partial<PlayerConfig> = {
      autoplay: false,
      autoPlayDelay: 0
    };

    if (isLive) {
      options.liveRetry = Infinity;
      options.vodRetry = Infinity;
    }

    if (isGB) {
      options['flvOption'] = {
        hasAudio: false
      };
    }

    return (
      <Player
        source={sources[1]}
        style={{ width: '50%' }}
        isLive={isLive}
        options={options}
        version={aliplayerVersion}
        onReady={handleRightReady}
        ref={rightPlayerRef}
      />
    );
  }, [sources[1], isLive]);

  if (isOffline) {
    return (
      <Fullscreen
        className={classNames(className, {
          [`${prefixCls}`]: true
        })}
        style={style}
        enabled={enabled}
        onClose={() => {
          setEnabled(false);
        }}
      >
        <Offline />
      </Fullscreen>
    );
  }

  return (
    <Fullscreen
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
      enabled={enabled}
      onClose={() => {
        setEnabled(false);
      }}
    >
      {watermarkProps && <Watermark {...watermarkProps} />}
      {leftPlayer}
      {rightPlayer}

      {(isLive || (!isLive && duration !== 0)) && !hideController && (
        <Controlbar
          isLive={isLive}
          duration={duration}
          currentTime={currentTime}
          download={{
            visible: true,
            onClick: onDownload
          }}
          volume={{
            onChange: handleVolumeChange
          }}
          progress={{
            onChange: handleProgressChange
          }}
          prismPlay={{
            status: prismPlay,
            onChange: handlePrismPlayChange
          }}
          fullscreen={{
            state: enabled,
            onChange: handleFullscreenChange
          }}
        />
      )}
    </Fullscreen>
  );
};

DoublePlayer.defaultProps = {
  isLive: false,
  autoplay: true,
  watermark: false,
  hideController: false,
  isOffline: false,
  sources: ['', '']
};

export default DoublePlayer;
