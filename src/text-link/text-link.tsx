import React, { FC } from 'react';
import classNames from '@pansy/classnames';
import { TextLinkProps } from './interface';

const TextLink: FC<TextLinkProps> = (props) => {
  const {
    prefixCls,
    className,
    style,
    href,
    target,
    onClick,
    children,
    underline,
    disabled
  } = props;

  const handleClick = (event) => {
    if (disabled) return;
    onClick && onClick(event);
  };

  return (
    <a
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`${prefixCls}-disabled`]: disabled
      })}
      style={style}
      href={href}
      target={target}
      onClick={handleClick}
    >
      {underline ? (<u>{children}</u>) : children}
    </a>
  )
};

TextLink.defaultProps = {
  prefixCls: 'sen-text-link',
  underline: false
};

export default TextLink;
