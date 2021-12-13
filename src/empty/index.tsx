import React, { FC, ReactNode, CSSProperties } from 'react';
import Icon from '../icon';
import isString from 'lodash/isString';
import classNames from '@pansy/classnames';

export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  icon?: ReactNode | 'device' | 'data' | 'image';
  iconStyle?: CSSProperties;
  description?: ReactNode | string;
  center?: boolean;
}

const Empty: FC<EmptyProps> = (props) => {
  const { prefixCls, className, style, iconStyle, icon, center, description, children } = props;

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`${prefixCls}-center`]: center
      })}
      style={style}
    >
      <div className={`${prefixCls}-content`}>
        {icon && (
          <div className={`${prefixCls}-icon`} style={iconStyle}>
            {isString(icon) ? <Icon type={`icon-empty-${icon}`} /> : icon}
          </div>
        )}
        {description && <div className={`${prefixCls}-description`}>{description}</div>}
        {children && <div className={`${prefixCls}-footer`}>{children}</div>}
      </div>
    </div>
  );
};

Empty.defaultProps = {
  prefixCls: 'sen-empty',
  icon: 'data',
  description: '暂无内容',
  center: false
};

export default Empty;
