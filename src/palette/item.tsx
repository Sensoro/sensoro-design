import React from 'react';
import Icon from '../icon';
import classNames from '@pansy/classnames';
import { Checkbox } from 'antd';
import './style/item.less';

const prefixCls = 'sen-palette-item';

export interface PaletteItemProps {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  value: string | number;
  color: string;
  colorStyle?: React.CSSProperties;
}

const Item: React.ForwardRefRenderFunction<any, PaletteItemProps> = (props, ref) => {
  const { className, label, value, color, children, style, colorStyle } = props;
  return (
    <div className={classNames(className, prefixCls)} style={style}>
      <Checkbox ref={ref} value={value} />
      {children ? (
        children
      ) : (
        <div
          className={`${prefixCls}-color`}
          style={{
            background: color,
            //这里是为了兼容白色
            border: `1px solid ${color}`,
            ...colorStyle
          }}
        />
      )}
      {label && <span className={`${prefixCls}-label`}>{label}</span>}
    </div>
  );
};

export default React.forwardRef(Item);
