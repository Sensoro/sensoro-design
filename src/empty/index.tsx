import React, { FC, ReactNode, CSSProperties } from 'react';
import isString from 'lodash/isString';
import classNames from '@pansy/classnames';

import NoDataPurely from '@sensoro-design/icons/NoDataPurely';
import NoImagePurely from '@sensoro-design/icons/NoImagePurely';
import NoDevicePurely from '@sensoro-design/icons/NoDevicePurely';

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

  let iconDom = null;

  if (isString(icon)) {
    switch (icon) {
      case 'device':
        iconDom = <NoDevicePurely />;
        break;
      case 'data':
        iconDom = <NoDataPurely />;
        break;
      case 'image':
        iconDom = <NoImagePurely />;
        break;
    }
  }

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
            {iconDom ?? icon}
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
