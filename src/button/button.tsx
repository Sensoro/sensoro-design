import React, { useContext } from 'react';
import classNames from '@pansy/classnames';
import { Button as AntButton } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { ConfigContext } from '../config-provider';

const Button: React.FC<ButtonProps> = ({ className, ...rest }) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('button');

  return (
    <AntButton
      {...rest}
      className={classNames(prefixCls, className, {
        [`${prefixCls}-default`]: !rest.type
      })}
    />
  );
};

export default Button;
