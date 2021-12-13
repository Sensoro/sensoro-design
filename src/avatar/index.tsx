import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import { AvatarProps as AntdAvatarProps } from 'antd/es/avatar/avatar';
import Icon from '../icon';

export interface AvatarProps extends AntdAvatarProps {
  className?: string;
  style?: React.CSSProperties;
  defaultIcon?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const {
    src,
    shape,
    style,
    icon,
    defaultIcon = <Icon type={`icon-person`} />,
    children,
    ...rest
  } = props;
  return (
    <AntdAvatar
      src={src}
      shape={shape}
      icon={icon ?? defaultIcon}
      style={{
        borderRadius: shape === 'square' && '2px',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        color: 'rgba(0, 0, 0, 0.25)',
        border: !!src && 'solid 1px rgba(0, 0, 0, 0.04)',
        ...style
      }}
      {...rest}
    >
      {children}
    </AntdAvatar>
  );
};

export default Avatar;
