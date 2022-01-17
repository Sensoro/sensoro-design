import React from 'react';
import { Watermark as BaseWatermark } from '@pansy/react-watermark';

import type { WatermarkProps as BaseWatermarkProps } from '@pansy/react-watermark';

type BaseText = string | string[];
type TextFun = () => BaseText;

export interface WatermarkProps extends Partial<Omit<BaseWatermarkProps, 'text'>> {
  /** 水印文案 */
  text?: BaseText | TextFun;
}

const Watermark: React.FC<WatermarkProps> = ({ text, children, ...rest }) => {
  const latestText: BaseText = typeof text === 'function' ? text() : text;

  return (
    <BaseWatermark
      {...rest}
      text={latestText}
    >
      {children}
    </BaseWatermark>
  )
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
};

export default Watermark;
