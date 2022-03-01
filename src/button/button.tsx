import React, { useContext } from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps, ButtonType as AntButtonType } from 'antd/es/button';
import { ConfigContext } from '../config-provider';
import { ButtonGroup } from './button-group';

export type ButtonType = AntButtonType | 'secondary' | 'warning';

export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> {
  __SEN_BUTTON: boolean;
  Group: typeof ButtonGroup;
}

export interface ButtonProps extends Omit<AntButtonProps, 'type'> {
  type?: ButtonType;
}

export const InternalButton: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { className, type = 'default', ...rest },
  ref
) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('button');

  return <AntButton {...rest} type={type as AntButtonType} prefixCls={prefixCls} ref={ref} />;
};

export const Button = React.forwardRef<unknown, ButtonProps>(InternalButton) as CompoundedComponent;

Button.displayName = 'Button';
Button.__SEN_BUTTON = true;
Button.Group = ButtonGroup;
