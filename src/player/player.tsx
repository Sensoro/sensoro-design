import React, { useRef, useState, useEffect, useContext, useImperativeHandle } from 'react';
import isNumber from 'lodash/isNumber';
import AliPlayer, { PlayerProps as AliPlayerProps } from '@pansy/react-aliplayer';
import Watermark, { WatermarkProps } from '../watermark';
import { ConfigContext } from '../config-provider';
import getWatermarkProps from '../common/utils/get-watermark-props';
import Fullscreen from '../fullscreen';
import Controlbar from './controlbar';

export interface PlayerProps extends AliPlayerProps {
  // 视频的开始时间
  startTime?: number;
  watermark?: WatermarkProps | boolean;
  showDownload?: boolean;
  onDownload?: () => void;
  hideControlbar?: boolean;
}

const Player = React.forwardRef<AliPlayer, PlayerProps>(
  (
    { watermark, source, startTime, hideControlbar, showDownload = true, onDownload, ...rest },
    ref
  ) => {
    const playerRef = useRef<AliPlayer>(null);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [playStatus, setPlayStatus] = useState<boolean>(false);
    const [fullscreenStatus, setFullscreenStatus] = useState<boolean>(false);

    const { getPrefixCls, aliplayerVersion } = useContext(ConfigContext);

    const prefixCls = getPrefixCls('player');
    const watermarkProps = getWatermarkProps(watermark);

    useImperativeHandle(ref, () => playerRef.current, []);

    useEffect(() => {
      if (source) {
        setCurrentTime(0);
        setPlayStatus(false);
      }
    }, [source]);

    const handlePlayChange = (status: boolean) => {
      const player = playerRef.current;
      if (!player) return;

      if (status) {
        player.play();
      } else {
        player.pause();
      }
    };

    /**
     * 切换视频全屏
     * @param status
     */
    const handleFullscreenChange = (status: boolean) => {
      setFullscreenStatus(!status);
    };

    /**
     * 全屏关闭回调
     */
    const handleFullscreenClose = () => {
      setFullscreenStatus(false);
    };

    /**
     * 播放中，会触发多次
     */
    const handlePlaying = () => {
      setPlayStatus(true);
    };

    /**
     * 视频暂停时触发
     */
    const handlePlay = () => {
      setPlayStatus(false);
    };

    const handleTimeupdate = () => {
      const player = playerRef.current;
      if (player) {
        const time = player.getCurrentTime();
        if (isNumber(time) && time > 0) {
          setCurrentTime(time);
        }
      }
    };

    const handleReady = () => {
      const player = playerRef.current;
      if (!player) return;
      setDuration(player.getDuration());
    };

    const handleEnded = () => {
      const player = playerRef.current;
      if (!player) return;
      setPlayStatus(false);
    };

    const handleWaiting = () => {
      const player = playerRef.current;
      if (!player) return;
    };

    const handleVolumeChange = (value: number) => {
      const player = playerRef.current;
      if (!player) return;
      player.setVolume(value);
    };

    const handleProgressChange = (time: number) => {
      const player = playerRef.current;
      if (!player) return;
      player.seek(time);
    };

    return (
      <Fullscreen enabled={fullscreenStatus} className={prefixCls} onClose={handleFullscreenClose}>
        <Watermark {...watermarkProps} style={{ width: '100%', height: '100%' }}>
          <AliPlayer
            version={aliplayerVersion}
            {...rest}
            source={source}
            onReady={handleReady}
            onPlaying={handlePlaying}
            onPlay={handlePlay}
            onEnded={handleEnded}
            onWaiting={handleWaiting}
            onTimeupdate={handleTimeupdate}
            ref={playerRef}
          />

          {!hideControlbar && (
            <Controlbar
              startTime={startTime}
              duration={duration}
              currentTime={currentTime}
              volume={{
                onChange: handleVolumeChange
              }}
              download={{
                visible: showDownload,
                onClick: onDownload
              }}
              progress={{
                onChange: handleProgressChange
              }}
              prismPlay={{
                status: playStatus,
                onChange: handlePlayChange
              }}
              fullscreen={{
                state: fullscreenStatus,
                onChange: handleFullscreenChange
              }}
            />
          )}
        </Watermark>
      </Fullscreen>
    );
  }
);

Player.defaultProps = {
  hideControlbar: false
};

export default Player;
