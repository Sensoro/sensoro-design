import React, { FC, useEffect, useRef, CSSProperties } from 'react';
import classnames from '@pansy/classnames';
import './style/index.less';

export interface NumberRollerProps {
  value: number;
  size?: number;
  height?: number;
  style?: CSSProperties;
  format?: boolean;
  prefixCls?: string;
  className?: string;
}

const ItemNumber = (props: any) => {
  const { value = 0, height = 32, prefixCls } = props;
  return (
    <ul
      style={{ height: height }}
      className={classnames({
        [`${prefixCls}-nine`]: value == 9,
        [`${prefixCls}-eight`]: value == 8,
        [`${prefixCls}-seven`]: value == 7,
        [`${prefixCls}-six`]: value == 6,
        [`${prefixCls}-five`]: value == 5,
        [`${prefixCls}-four`]: value == 4,
        [`${prefixCls}-three`]: value == 3,
        [`${prefixCls}-two`]: value == 2,
        [`${prefixCls}-one`]: value == 1,
        [`${prefixCls}-zero`]: value == 0
      })}
    >
      <li>9</li>
      <li>8</li>
      <li>7</li>
      <li>6</li>
      <li>5</li>
      <li>4</li>
      <li>3</li>
      <li>2</li>
      <li>1</li>
      <li>0</li>
    </ul>
  );
};

const NumberRoller: FC<NumberRollerProps> = (props) => {
  const { prefixCls, className, value, size = 24, height = 32, style = {}, format = true } = props;

  const preVal: any = useRef();

  useEffect(() => {
    preVal.current = value;
  }, [value]);

  const valArr = format
    ? value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .split('')
    : value.toString().split('');

  return (
    <div
      className={classnames(className, {
        [`${prefixCls}`]: true
      })}
      style={{
        fontSize: size,
        lineHeight: `${height}px`,
        ...style
      }}
    >
      {valArr.map((i: any, idx) => {
        return i - 10 ? <ItemNumber prefixCls={prefixCls} key={idx} value={i} /> : ',';
      })}
    </div>
  );
};

NumberRoller.defaultProps = {
  prefixCls: 'sen-number-roller'
};

export default NumberRoller;
