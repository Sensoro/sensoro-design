import React, { useContext } from 'react';
import classnames from '@pansy/classnames';
import { Input } from 'antd';
import { PasswordProps } from 'antd/es/input';
import { ConfigContext } from '../config-provider';

const InternalPassword: React.ForwardRefRenderFunction<any, PasswordProps> = (
  { className, ...rest },
  ref
) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('input-password');

  return <Input.Password className={classnames(className, prefixCls)} {...rest} ref={ref} />;
};

export const Password = React.forwardRef<unknown, PasswordProps>(InternalPassword);
