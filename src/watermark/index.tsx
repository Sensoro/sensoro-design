import React, { useEffect, useRef } from 'react';
import PansyWatermark, { WatermarkOptions } from '@pansy/watermark';

type BaseText = string | string[];
type TextFun = () => BaseText;

export interface WatermarkProps extends Partial<Omit<WatermarkOptions, 'text'>> {
  /** 是否整个页面 */
  isBody?: Boolean;
  /** 水印文案 */
  text?: BaseText | TextFun;
  /** 水印是否一段时间进行重绘，-1 表示关闭，单位毫秒 */
  updateTime?: number;
}

const Watermark: React.FC<WatermarkProps> = ({ text, updateTime, ...rest }) => {
  const root = useRef<HTMLDivElement>(null);
  const interval = useRef<NodeJS.Timeout>();
  const watermark = useRef<PansyWatermark>();

  const isBody = !!rest.isBody;
  const latestText: BaseText = typeof text === 'function' ? text() : text;

  if (!latestText || latestText.length === 0) return null;

  useEffect(() => {
    if (!watermark.current) {
      watermark.current = new PansyWatermark();
    }

    renderWatermark();

    if (updateTime !== -1 && updateTime > 0) {
      interval.current = setInterval(() => {
        renderWatermark();
      }, updateTime);
    }

    return () => {
      watermark.current?.destroy();
      interval.current && clearInterval(interval.current);
    };
  }, [rest, latestText, updateTime]);

  const renderWatermark = () => {
    if (watermark.current) {
      watermark.current.update({
        ...rest,
        container: isBody ? undefined : (root.current as HTMLElement),
        text: latestText
      });
      watermark.current.render();
    }
  };

  if (isBody) {
    return null;
  }

  return <div ref={root} />;
};

Watermark.defaultProps = {
  isBody: false,
  monitor: true,
  fontSize: 14,
  rotate: -20,
  fontColor: '#000',
  zIndex: 998,
  width: 384,
  height: 180,
  opacity: 0.09,
  textAlign: 'left',
  mode: 'interval',
  updateTime: 60 * 1000
};

export default Watermark;
