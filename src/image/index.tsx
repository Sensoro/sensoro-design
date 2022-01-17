import React, { useContext } from 'react';
import classNames from '@pansy/classnames';
import { Image as AntdImage } from 'antd';
import { ImageProps as AntdImageProps } from 'antd/es/image';
import Watermark, { WatermarkProps } from '../watermark';
import { ConfigContext } from '../config-provider';
import getWatermarkProps from '../common/utils/get-watermark-props';
import './style';

export type Fit = 'auto' | 'contain' | 'cover';

export interface ImageProps extends AntdImageProps {
  fit?: Fit;
  watermark?: boolean | WatermarkProps;
}

const Image: React.FC<ImageProps> = ({ className, watermark, fit, style, ...rest }) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('image');
  const watermarkProps = getWatermarkProps(watermark);

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`${prefixCls}-fit`]: fit !== 'auto',
        [`${prefixCls}-contain`]: fit === 'contain',
        [`${prefixCls}-cover`]: fit === 'cover'
      })}
      style={{ ...style, position: 'relative' }}
    >
      <Watermark {...watermarkProps} style={{ width: '100%', height: '100%' }}>
        <AntdImage {...rest} />
      </Watermark>
    </div>
  );
};

Image.defaultProps = {
  watermark: false,
  fit: 'auto',
  preview: false
};

export default Image;
