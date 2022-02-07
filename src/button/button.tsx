import React, { useContext } from 'react';
import classNames from '@pansy/classnames';
import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps, ButtonType as AntButtonType } from 'antd/es/button';
import { ConfigContext } from '../config-provider';

export type ButtonType = AntButtonType & 'minor';

export interface ButtonProps extends Omit<AntButtonProps, 'type'> {
  type: ButtonType;
}

export const Button: React.FC<ButtonProps> = ({ className, type = 'default', ...rest }) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('button');

  return (
    <AntButton
      {...rest}
      className={classNames(prefixCls, className, {
        [`${prefixCls}-default`]: type === 'default',
        [`${prefixCls}-minor`]: type === 'minor'
      })}
      type={type as AntButtonType}
    />
  );
};

export default Button;
