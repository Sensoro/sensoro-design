import React, { useState, useMemo, useRef, useContext } from 'react';
import classNames from '@pansy/classnames';
import Fullscreen from '../fullscreen';
import Player from '@pansy/react-aliplayer';
import { PlayerProps } from '@pansy/react-aliplayer/es';
import { PlayerConfig } from '@pansy/react-aliplayer/es/types';
import { ConfigContext } from '../config-provider';
import Watermark, { WatermarkProps } from '../watermark';
import getWatermarkProps from '../common/utils/get-watermark-props';
import Controlbar from '../player/controlbar';
import { Offline } from '../player/common';

export interface LiveProps {
  /** 额外的样式类 */
  className?: string;
  /** 额外的样式 */
  style?: React.CSSProperties;
  /** 摄像头是否离线 */
  isOffline?: boolean;
  /** 是否隐藏控制栏 */
  hideControlbar?: boolean;
  /** 是否是国标设备 */
  isGB?: boolean;
  /** 直播流地址 */
  source: string;
  watermark?: WatermarkProps | boolean;
  /** 播放器配置 */
  options?: Partial<PlayerConfig>;
  onReady?: PlayerProps['onReady'];
  /** 播放中，会触发多次 */
  onPlaying?: PlayerProps['onPlaying'];
  /** 直播流中断时触发 */
  onLiveStreamStop?: PlayerProps['onLiveStreamStop'];
  /** 播放失败 */
  onError?: PlayerProps['onError'];
}

const Live: React.FC<LiveProps> = ({
  className,
  style,
  source,
  isGB,
  watermark,
  isOffline,
  hideControlbar,
  options: playerOptions,
  onReady,
  onLiveStreamStop,
  onError,
  onPlaying,
}) => {
  const { getPrefixCls, aliplayerVersion } = useContext(ConfigContext);
  const playerRef = useRef<Player>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const prefixCls = getPrefixCls('live');
  const watermarkProps = getWatermarkProps(watermark);

  const handleChangeFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleLiveStreamStop = () => {
    onLiveStreamStop && onLiveStreamStop();
  };

  const handleError = (e) => {
    onError?.(e);
  };

  const handleChangeVolume = (val: number) => {
    const player = playerRef.current;

    if (player) {
      player.setVolume(val);
    }
  };

  const playerMome = useMemo(() => {
    const options: Partial<PlayerConfig> & { hasAudio?: boolean } = {
      autoplay: true,
      isLive: true,
      ...playerOptions,
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
        source={source}
        onReady={onReady}
        onPlaying={onPlaying}
        onLiveStreamStop={handleLiveStreamStop}
        onError={handleError}
        version={aliplayerVersion}
        options={options}
        ref={playerRef}
        hideControlbar
      />
    );
  }, [source, isGB, playerOptions]);

  const controlbarMemo = useMemo(() => {
    return (
      <Controlbar
        isLive
        className={`${prefixCls}-controlbar`}
        volume={{
          onChange: handleChangeVolume
        }}
        fullscreen={{
          state: isFullscreen,
          onChange: handleChangeFullscreen
        }}
      />
    );
  }, [isFullscreen]);

  return (
    <Fullscreen
      enabled={isFullscreen}
      style={style}
      onClose={handleCloseFullscreen}
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`hide-controlbar`]: hideControlbar
      })}
    >
      {/* 设备离线 */}
      {isOffline && <Offline />}
      {watermarkProps && <Watermark {...watermarkProps} />}
      {/** 播放器 */}
      {!isOffline && (
        <>
          {playerMome}
          {!hideControlbar && controlbarMemo}
        </>
      )}
    </Fullscreen>
  );
};

Live.defaultProps = {
  isGB: false,
  isOffline: false,
  watermark: false,
  hideControlbar: false
};

export default Live;
