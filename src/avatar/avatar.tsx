import React, { useContext } from 'react';
import classNames from '@pansy/classnames';
import { Avatar as AntAvatar } from 'antd';
import { ConfigContext } from '../config-provider';
import Icon from '../icon';

import type { AvatarProps } from 'antd/es/avatar/avatar';

export type { AvatarProps };

export const InternalAvatar: React.FC<AvatarProps> = ({
  src,
  style,
  icon,
  className,
  children,
  ...rest
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('avatar');

  const defaultIcon = !children && <Icon type="icon-person-filled" />;

  return (
    <AntAvatar
      src={src}
      icon={icon ?? defaultIcon}
      style={{
        border: !!src && 'solid 1px rgba(0, 0, 0, 0.04)',
        ...style
      }}
      className={classNames(prefixCls, className)}
      {...rest}
    >
      {children}
    </AntAvatar>
  );
};
