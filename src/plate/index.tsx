import React, { useContext } from 'react';
import classNames from '@pansy/classnames';
import { ConfigContext } from '../config-provider';

export interface PlateProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  borderColor?: string;
  text?: string;
}

const Plate: React.FC<PlateProps> = ({
  className,
  color = '#5591F2',
  borderColor = '#000',
  style,
  text
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('plate');

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={{
        background: color,
        ...style
      }}
    >
      <div className={`${prefixCls}-border`} style={{ border: `1px solid ${borderColor}` }} />
      <div
        className={classNames(`${prefixCls}-dot`, `${prefixCls}-l-t`)}
        style={{ background: borderColor }}
      />
      <div
        className={classNames(`${prefixCls}-dot`, `${prefixCls}-r-t`)}
        style={{ background: borderColor }}
      />
      <div
        className={classNames(`${prefixCls}-dot`, `${prefixCls}-l-b`)}
        style={{ background: borderColor }}
      />
      <div
        className={classNames(`${prefixCls}-dot`, `${prefixCls}-r-b`)}
        style={{ background: borderColor }}
      />
      {text}
    </div>
  );
};

export default Plate;
